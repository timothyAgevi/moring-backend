/* eslint-disable no-unused-vars */
const { Request, Response, NextFunction } = require("express")
const capitalize = require("./../utils/capitalize")
const ErrorResponse = require("./ErrorResponse")
/**
 *
 * @param {ErrorResponse} err
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns
 */
module.exports = function (err, req, res, next) {
	let error = { ...err }
	error.message = err.message
	// console.log(err)
	if (err.code === 11000) {
		const message = Object.keys(err.keyValue).map((k) =>
			capitalize(`${k} already exist`),
		)
		error = new ErrorResponse(String(message), 400)
	}
	if (err.name === "ValidationError") {
		const message = Object.values(err.errors).map(function (value) {
		})
		console.log("Parsing ", message)

		error = new ErrorResponse(String(message), 400)
	}

	if (error.message.split(/\n/).length > 1) {
		return res.status(error.statusCode || 500).json({
			success: false,
			message:
				error.message
					.replace(/\t/, "")
					.split("\n")
					.filter((e) => e !== "") || "Internal server error",
		})
	}
	return res.status(error.statusCode || 500).json({
		success: false,
		message: error.message || "Internal server error",
	})
}
