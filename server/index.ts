import express from 'express'
import logger from 'morgan'
import cors from 'cors'

import mysql from 'mysql'

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password123'
})

con.connect((err) => {
  if (err) throw err

  console.log('MYSQL CONNECTED')
})

const app = express()
const port = process.env.PORT || 9090

app.use(cors())
app.use(logger('dev'))
app.use(express.json())

app.post('/save', (req, res) => {
  console.log(req.body)
  res.sendStatus(200)
})

app.listen(port, () => {
  /* tslint:disable:no-console */
  console.log(`SERVER IS RUNNING ON PORT ${port}`)
})
