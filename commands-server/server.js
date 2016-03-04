// Server accepts command requests in form of an array. It pipes the command to a specified server (ssh2 or process.spawn). It returns the text to the client

require("babel-register")

const express = require('express')

const app = express()
const port = 8081

app.listen(port, () => console.log(`Listening on port ${port}`))
