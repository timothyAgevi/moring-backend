const express = require("express")
const logger = require("morgan")
const cors = require("cors")
const helmet = require("helmet")
const db = require("../db")
const { DATABASE_URL } = require("../config")
const userRouter = require("./../routes/user.routes")
const authRouter = require("./../routes/auth.routes")
const blogRouter = require("./../routes/blog.routes")

/**
 *
 * @param {express.Application} app
 */
module.exports = async (app) => {
	app.use(express.json({ limit: "100mb" }))
	app.use(express.urlencoded({ extended: true }))
	app.use(cors({ origin: "*" }))
	app.use(helmet())
	app.use(logger("combined"))
	//Database
	db({ databaseUrl: DATABASE_URL })
	// Views
	app.use("/user", userRouter)
	app.use("/blog", blogRouter)
	app.use("/auth", authRouter)
}
