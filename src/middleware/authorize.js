/* eslint-disable no-unused-vars */
const { Request, Response, NextFunction } = require("express")
const jwt = require("jsonwebtoken")
const { SECRET_KEY } = require("./../config")
const User = require("./../models/user")
/**
 ********************* CHECK IS THE EMAIL IS ALREADY REGISTERED *********************
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const Authorize = async (req, res, next) => {
	try {
		const HeaderToken = req.headers.authorization

		if (!HeaderToken)
			return res.json({
				success: false,
				message: "Authorization token not provided",
			})
		const token = HeaderToken.split(" ")[1]
		return jwt.verify(token, SECRET_KEY, async (err, payload) => {
			if (err) {
				// console.log(err)
				return res
					.status(401)
					.json({ success: false, message: "Not authenticated" })
			}
			req.user = payload
			return next()
		})
	} catch (err) {
		return res.status(401).json({ success: false })
	}
}

/**
 ********************* CHECK IS THE BLOG OWNER *********************
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const AuthorizeBlogOwner = async (req, res, next) => {
	try {
		Authorize(req, res, async () => {
			const { userId } = req.user
			const blogId = req.params.blogId
			const user = await User.findOne({
				$and: [{ _id: userId }, { $in: [{ blogs: blogId }] }],
			})
			if (!user)
				return res.status(403).json({ success: false, message: "Forbidden" })
			return next()
		})
	} catch (err) {
		return res.json({ success: false })
	}
}

module.exports = { Authorize, AuthorizeBlogOwner }
