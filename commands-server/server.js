// Server accepts command requests in form of an array. It pipes the command to a specified server (ssh2 or process.spawn). It returns the text to the client

require("babel-register")

const childProcess = require('child_process')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const port = 8081


// RESULT UTILS
const Result = {};
Result.fromStdout = function(buffer) {
  return {
    result: buffer.toString()
  }
}


const app = express()
app.use(cors())
app.use(bodyParser.json())

const execCommand = (params) => {
  const c = childProcess.spawn(params[0], params.slice(1))

  return new Promise((resolve) => {
    c.stdout.on('data', resolve)
  })
}

app.post('*', (req, res) => execCommand(req.body.command).then(buf => res.json(Result.fromStdout(buf))))

app.listen(port, () => console.log(`Listening on port ${port}`))
