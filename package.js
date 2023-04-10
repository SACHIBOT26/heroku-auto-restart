{
  "name": "heroku-auto-restart",
  "version": "1.0.0",
  "description": "Script to automatically restart a Heroku dyno",
  "main": "heroku.js",

  "scripts": {
    "start": "node heroku.js"
  }

  "dependencies": {
    "heroku-client": "^5.2.2"
   "express": "^4.17.1"
  },
  "engines": {
    "node": "14.x"
  },
  "buildpacks": [
    {
      "url": "heroku/nodejs"
    }
  ]
}