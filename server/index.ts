import express from 'express'
import logger from 'morgan'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 9090

app.use(cors())
app.use(logger('dev'))
app.use(express.json())

/* tslint:disable:no-console */
app.listen(port, () => {
  console.log(`SERVER IS RUNNING ON PORT ${port}`)
})
