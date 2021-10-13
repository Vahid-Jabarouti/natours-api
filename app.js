const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    msg: "hello and welcome to main page!",
  })
})

app.post('/', (req, res) => {
  res.status(404).send("You are not allowed to post on this page!")
})

const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}` + 
  ' Press Ctrl-C to terminate...')
})

