/* eslint-disable no-unused-vars */
const { Request, Response, NextFunction } = require("express")
const User = require("../models/user")
const Blog = require("../models/blog")

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
module.exports.getUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id)
		if (!user)
			return res.status(404).json({ success: false, message: "User not found" })
		return res.status(200).json({ success: true, user })
	} catch (error) {
		return res.status(500).json({ success: false, message: error.message })
	}
}

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
module.exports.getUsers = async (req, res, next) => {
	try {
		const users = await User.find().limit(20)
		if (!users)
			return res
				.status(404)
				.json({ success: false, message: "Users not found" })
		return res.status(200).json({ success: true, users })
	} catch (error) {
		return res.status(500).json({ success: false, message: error.message })
	}
}
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
module.exports.updateAccount = async (req, res, next) => {
	try {
		if (req.user.userId !== req.params.userId)
			return res.json({
				success: false,
				message: "You can only update your account",
			})
		const user = await User.findByIdAndUpdate(
			req?.user.userId,
			{ ...req.body },
			{ new: true },
		)
		return res.status(200).json({ success: true, user })
	} catch (error) {
		return res.status(500).json({ success: false, message: error.message })
	}
}

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
module.exports.getUserBlogs = async (req, res, next) => {
	try {
		const blogs = await Blog.find({ author: req.user.userId })
		if (blogs.length < 1) {
			return res.json({ success: false, message: "No blog posts" })
		}
		return res.status(200).json({ success: true, blogs })
	} catch (error) {
		return res.status(500).json({ success: false, message: error.message })
	}
}
