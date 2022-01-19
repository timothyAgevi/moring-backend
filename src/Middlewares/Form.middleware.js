// eslint-disable-next-line no-unused-vars
const express = require("express")
const ErrorResponse = require("../ErrorHandler/ErrorResponse")
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
 * @param {{password:string}} param0
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

/**
 ********************* CHECK IF EMAIL FIELD IS PROVIDED *********************
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
module.exports.emptyEmailField = async (req, res, next) => {
	try {
		const { email } = req.body
		if (!email)
			return res
				.status(400)
				.json({ succcess: false, message: "Email field required" })
		return next()
	} catch (err) {
		return next(err)
	}
}

/**
 ********************* CHECK IF PASSWORD IS PROVIDED *********************
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
module.exports.emptyPasswordField = async (req, res, next) => {
	try {
		const { password } = req.body
		if (!password)
			return res
				.status(400)
				.json({ succcess: false, message: "Password field required" })
		return next()
	} catch (err) {
		return next(err)
	}
}

/**
 ********************* CHECK IF FIRST NAME IS GIVEN *********************
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
module.exports.emptyFirstName = async (req, res, next) => {
	try {
		const { firstName } = req.body
		if (!firstName)
			return res
				.status(400)
				.json({ succcess: false, message: "First name field required" })
		return next()
	} catch (err) {
		return next(err)
	}
}
/**
 ********************* CHECK IF USERNAME IS GIVEN *********************
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
module.exports.emptyUsername = async (req, res, next) => {
	try {
		const { username } = req.body
		if (!username)
			return res
				.status(400)
				.json({ succcess: false, message: "username field required" })
		return next()
	} catch (err) {
		return next(err)
	}
}
/**
 ********************* CHECK IF LAST NAME IS GIVEN *********************
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
module.exports.emptyLastName = async (req, res, next) => {
	try {
		const { lastName } = req.body
		if (!lastName)
			return res
				.status(400)
				.json({ succcess: false, message: "Last name field required" })
		return next()
	} catch (err) {
		return next(err)
	}
}

/**
 ********************* CHECK IF PASSWORD MATCH *********************
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
module.exports.passwordMatch = async (req, res, next) => {
	try {
		const { password, confirmPassword } = req.body
		console.log("Here 1I")
		if (!(password === confirmPassword))
			return res
				.status(400)
				.json({ succcess: false, message: "Passwords do not match" })
		console.log("Nrxt")
		return next()
	} catch (err) {
		console.log("Err")
		return next(err)
	}
}

/************************************ BLOG************************************** */
/**
 ********************* CHECK IF BLOG TITLE IS GIVEN *********************
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
module.exports.emptyBlogTitle = async (req, res, next) => {
	try {
		const { title } = req.body
		if (!title)
			return res
				.status(400)
				.json({ succcess: false, message: "Title field required" })
		return next()
	} catch (err) {
		return next(err)
	}
}

/**
 ********************* CHECK IF BLOG BODY IS GIVEN *********************
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
module.exports.emptyBlogBody = async (req, res, next) => {
	try {
		const { body } = req.body
		if (!body)
			return res
				.status(400)
				.json({ succcess: false, message: "Body field required" })
		return next()
	} catch (err) {
		return next(err)
	}
}
