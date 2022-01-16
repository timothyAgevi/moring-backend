/* eslint-disable no-unused-vars */
const { Request, Response, NextFunction } = require("express")
const Blog = require("../models/blog")
const User = require("./../models/user")
/**
 ********************* CHECK IF CONFLICTING EMAIL ALREADY REGISTERED *********************
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
module.exports.emailConflict = async (req, res, next) => {
	try {
		const { email } = req.body
		const user = await User.findOne({ email })
		if (user)
			return res
				.status(409)
				.json({ succcess: false, message: "Email already registered" })
		return next()
	} catch (err) {
		return res.status(500).json({ succcess: false, message: err.message })
	}
}
/**
 ********************* CHECK IF THE EMAIL IS ALREADY REGISTERED *********************
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
module.exports.accountEmailExist = async (req, res, next) => {
	try {
		const { email } = req.body
		const user = await User.findOne({ email })
		if (!user)
			return res
				.status(404)
				.json({ succcess: false, message: "Account does not exist" })
		return next()
	} catch (err) {
		return res.status(500).json({ succcess: false, message: err.message })
	}
}

/**
 ********************* CHECK IF BLOG TITLE EXIST *********************
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
module.exports.blogTitleExist = async (req, res, next) => {
	try {
		const { title } = req.body
		const blog = await Blog.findOne({ title })
		if (blog)
			return res
				.status(409)
				.json({ succcess: false, message: "Blog title already exist" })
		return next()
	} catch (err) {
		return res.status(500).json({ succcess: false, message: err.message })
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
		return res.status(500).json({ succcess: false, message: err.message })
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
		return res.status(500).json({ succcess: false, message: err.message })
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
		return res.status(500).json({ succcess: false, message: err.message })
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
		return res.status(500).json({ succcess: false, message: err.message })
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
		return res.status(500).json({ succcess: false, message: err.message })
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
		return res.status(500).json({ succcess: false, message: err.message })
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
		return res.status(500).json({ succcess: false, message: err.message })
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
		return res.status(500).json({ succcess: false, message: err.message })
	}
}
/**
 ********************* CHECK IF CONFLICTING BLOG TITLE ALREADY REGISTERED *********************
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
module.exports.blogTitleConflict = async (req, res, next) => {
	try {
		const { title } = req.body
		const blog = await Blog.findOne({ title })
		if (blog)
			return res
				.status(409)
				.json({ succcess: false, message: "Blog title already exists" })
		return next()
	} catch (err) {
		return res.status(500).json({ succcess: false, message: err.message })
	}
}
