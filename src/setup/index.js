const express = require("express")
const logger = require("morgan")
const cors = require("cors")
const helmet = require("helmet")
const db = require("../db")
const { DATABASE_URL } = require("../config")
const router = require("../route/Router.routes")

/**
 *
 * @param {{app:Application}} param0
 */
module.exports = async ({ app }) => {
	app.use(express.json({ limit: "100mb" }))
	app.use(express.urlencoded({ extended: true }))
	app.use(cors({ origin: "*" }))
	app.use(helmet())
	app.use(logger("combined"))
	/**
	 * Setting up the database
	 */
	db({ databaseUrl: DATABASE_URL })
	/**
	 * Passing controllers as a middleware
	 */
	router({ app })
}
