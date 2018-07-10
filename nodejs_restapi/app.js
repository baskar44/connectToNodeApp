// Load our app server using express

const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(morgan('short'))

app.get("/", (req, res) => {
  console.log("Responding to root route")
  res.send("Hello from root.")
})

app.get("/users", (req, res) => {
  const dom = {firstName: "Dom", lastName: "Cobb"}
  const joseph = {firstName: "Joseph", lastName: "Gordon-Levitt"}
  const ellen = {firstName: "Ellen", lastName: "Page"}
  res.json([dom, joseph, ellen])
  //res.send("Nodemon auto updates when I save this file")
})

// localhost:3003
app.listen(3003, () => {
  console.log("Server is up and listening on 3003...")
})
