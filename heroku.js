const Heroku = require('heroku-client');
const heroku = new Heroku({ token: 'your-heroku-api-key' });
const { APP_NAME , PROCESS_TYPE , HEROKU_API_KEY } = require('./app.json');


// Replace with the app name and process type for the target Heroku app
const appName = APP_NAME ;
const processType = PROCESS_TYPE ;

// Function to check the app's processes and restart the target process if it's not running
const checkProcessStatus = async () => {
  try {
    const processes = await heroku.get(`/apps/${appName}/ps`);
    const targetProcess = processes.find(process => process.type === processType);
    if (!targetProcess || targetProcess.state === 'crashed') {
      await restartProcess();
    }
  } catch (error) {
    console.error(`Failed to check process status for Heroku app ${appName}: ${error}`);
  }
};

// Function to restart the target process
const restartProcess = async () => {
  try {
    const response = await heroku.post(`/apps/${appName}/dynos`, { body: { command: processType } });
    console.log(`Heroku app ${appName} process ${processType} restarted with status ${response.statusCode}`);
  } catch (error) {
    console.error(`Failed to restart Heroku app ${appName} process ${processType}: ${error}`);
  }
};

// Set up a setInterval to check the process status every 5 minutes (300,000 ms)
setInterval(checkProcessStatus, 300000);
