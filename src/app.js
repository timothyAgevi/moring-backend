const express = require("express")
const server = require("./Http.Server")
const setup = require("./setup")
/**
 * express app instance that runs the whole application
 */
const app = express()
/**
 * Setup the app with required settings and middlewares
 */
setup({ app })
/**
 * Pass the app instance to be served by nodejs http server
 */
server({ app })
