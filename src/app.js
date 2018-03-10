#!/usr/bin/env node

// IMPORTS
const $ = require("jquery")
const cmd = require("commander")
const inquire = require('inquirer')
const req = require("request")

// CLASSES
class Request {
  constructor(answers) {
    try {
      for (const key in answers) {
        if (answers.hasOwnProperty(key)) {
          const element = answers[key];
          if (!element) {
            throw "An inquery contained a falsey value";
          }
        }
      }
      this._rawAnswers = answers;
      this._urlString = `https://api.github.com/repos/${answers.owner}/${answers.repo}/contents/${answers.path}`;
    } catch (err) {
      console.error(err);
    }
  }
  _getRequest(url) {
    try {
      $.getJSON(url, data => {
        if (!data) {
          throw "Server response was not truthy";
        }
        return data;
      })
    } catch (err) {
      console.error(err)
    }
  }

  _filterDataForFile(data) {
    try {
      if (data.type != file) {
        throw "Data was not a file"
      }
      if (!data.contents) {
        console.warn("File contents not found in server response, trying https download")
        return getUrl(data.download_url)
      } else {
        return data.contents;
      }
    } catch (err) {
      console.error(err);
    }
  }

  get file() {
    let url = this._urlString;
    let rawResponse = this._getRequest(url);
    let file = this._filterDataForFile(rawResponse);
    return file;
  }
  get rawData() {
    let result = {
      url: this._urlString,
      answers: this._rawAnswers,
    }
    return result;
  }
  get response() {
    return this._getRequest(this._urlString);
  }
}

class Settings {
    constructor(commanderArguments) {
      this.verbose = commanderArguments.verbose;
      this.destination = commanderArguments.destination;
      this.mode = commanderArguments.mode;
    }

    get settings() {
      return {
        verbose: this.verbose,
        destination: this.destination,
      }
    }
    get mode() {
      switch (this.mode) {
        case "interogate":
          return true;
          break;
        case "command line":
          return false;
        default:  true
          break;
      }
    }
  }

// MAIN
console.log("Running distributer program");
let answers = interogate();
console.log(answers)
let request = new Request(answers);
//let prefs = new Settings( /* commander arguments */ )
//distribute(answers, prefs)

// FUNCTIONS
function getUrl(url) {
  req(url, function (err, response, body) {
    if (err) {
      throw err
    }
    console.info('statusCode:', response && response.statusCode); // Print response status code
    return body;
  });
}

function distribute(requestObject, settings) {
  console.log(requestObject)
}



function interogate() {
  const questions = {
    long: [{
        type: "input",
        name: "owner",
        message: "What is the username of the owner of the repository you are trying to get a file from?"
      },
      {
        type: "input",
        name: "repository",
        message: "What is the name of the repository you are trying to get a file from?"
      },
      {
        type: "input",
        name: "filepath",
        message: "What is the file path under the repository name?"
      }
    ],
    short: [{
        type: "input",
        name: "owner",
        message: "Owner name: "
      },
      {
        type: "input",
        name: "repo",
        message: "Repo name: "
      },
      {
        type: "input",
        name: "filepath",
        message: "File path: "
      }
    ]
  };
  if (true) {
    inquire.prompt(questions.long).then(answers => {
      return answers;
    });
  } else {
    inquire.prompt(questions.short).then(answers => {
      return answers;
    });
  }
}