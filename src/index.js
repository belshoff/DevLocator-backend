/**
 * Imports
 */
const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
const dotenv = require('dotenv')

const app = express()

/**
 * Variáveis de Ambiente
 */
dotenv.config()

/**
 * Conexão com o Banco de Dados
 */
mongoose.connect(
  `${process.env.DB_CONNECT_STRING}`,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
)

app.use(express.json())
app.use(routes)

app.listen(5000)
