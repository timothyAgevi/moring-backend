/* eslint-disable no-unused-vars */
const { Request, Response, NextFunction } = require("express")
const jwt = require("jsonwebtoken")
const { SECRET_KEY } = require("../config")
const User = require("../models/user")

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
module.exports.login = async (req, res, next) => {
	try {
		const { email } = req.body
		const user = await User.findOne({ email }).select("+password")
		if (!(await user?.passwordMatch(req.body.password))) {
			return res
				.status(401)
				.json({ success: false, message: "Check your login details" })
		}
		const token = jwt.sign(
			{ userId: user._id, email: user.email },
			SECRET_KEY,
			{ expiresIn: "7d" },
		)
		const { password, ...props } = user._doc
		return res.status(200).json({ success: true, user: props, token })
	} catch (err) {
		return next(err)
	}
}

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
module.exports.register = async (req, res, next) => {
	try {
		console.log("Here 2")
		const user = await User.create({ ...req.body })
		if (!user)
			return res.status(400).json({ message: "Could not create account" })
		const { password, ...props } = user._doc
		const token = jwt.sign({ userId: user._id, email: user.email }, SECRET_KEY)
		return res.status(200).json({ success: true, user: props, token })
	} catch (err) {
		return next(err)
	}
}
