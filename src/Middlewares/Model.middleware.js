/* eslint-disable no-unused-vars */
const { Request, Response, NextFunction } = require("express")
const Blog = require("../Models/Blog.model")
const User = require("../Models/User.model")
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
		return next(err)
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
		return next(err)
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
		return next(err)
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
		return next(err)
	}
}
