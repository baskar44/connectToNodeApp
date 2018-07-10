// Load our app server using express

const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

app.use(morgan('short'))

app.get('/users/:id', (req, res) => {
  console.log("Fetching user with id: " + req.params.id)

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'connectToNodeApp'
  })

  const queryString = "SELECT * FROM user WHERE id = ?"

  connection.query(queryString, [req.params.id], (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for users: " + err)
      res.sendStatus(500)
      res.end()
      return
    }
    console.log("I think we fetched users successfully")

    const users = rows.map((row) => {
      return {
        firstName: row.firstName,
        lastName: row.lastName
      }
    })

    res.json(users)

    
  })
})



app.get("/", (req, res) => {
  console.log("Responding to root route")
  res.send("Hello from root.")
})

app.get("/users", (req, res) => {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'connectToNodeApp'
  })

  connection.query("SELECT * FROM USER", (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for users: " + err)
      res.sendStatus(500)
      res.end()
      return
    }

    console.log("I think we fetched users successfully")
    res.json(rows)
  })
})

// localhost:3003
app.listen(3003, () => {
  console.log("Server is up and listening on 3003...")
})

