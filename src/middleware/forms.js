// eslint-disable-next-line no-unused-vars
const express = require("express")
const ErrorResponse = require("../error/ErrorResponse")
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns
 */
module.exports.passwordRegex = async (req, res, next) => {
	try {
		const { passOK, errors } = passRegex({ ...req.body })
		// console.log(`Pass OK ${passOK}`)
		if (!passOK) return next(new ErrorResponse(errors, 400))
		else return next()
	} catch (e) {
		return next(e)
	}
}
//Validate passwordRegex
/**
 *
 * @param {{username:string, firstName:string, middleName:string, lastName:string, password:string}} param0
 * @returns
 */
const passRegex = function ({ password }) {
	let errors = ""
	try {
		if (password.search(new RegExp(/[a-z]+/)) < 0) {
			errors += "Password must contain a Lowercase letter\n"
		}
		if (password.search(new RegExp(/[A-Z]+/)) < 0) {
			errors += "Password must contain a Uppercase letter\n"
		}
		if (password.search(new RegExp(/[0-9]+/)) < 0) {
			errors += "Password must contain a number\n"
		}
		if (password.length < 8) {
			errors += "Password must be at least 8 characters\n	"
		}
		if (errors !== "") {
			return { passOK: false, errors }
		}
		return { passOK: true, errors }
	} catch (err) {
		return new ErrorResponse(err, 500)
	}
}
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns
 */
module.exports.passwordLength = async (req, res, next) => {
	try {
		const { password } = req.body
		if (typeof password === "string") {
			if (password.length < 8) {
				return res.status(401).json({
					success: false,
					message: "Password length must be at least 8 characters",
				})
			}
			return next()
		}
	} catch (err) {
		return next(err)
	}
}
