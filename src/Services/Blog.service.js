/* eslint-disable no-unused-vars */
const { Request, Response, NextFunction } = require("express")
const Blog = require("../Models/Blog.model")
const User = require("../Models/User.model")

/**
 ********************* CREATE A NEW BLOG ENTRY *********************
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
module.exports.createBlog = async (req, res, next) => {
	try {
		const blog = await Blog.create({ ...req.body, author: req?.user.userId })
		if (!blog)
			return res
				.status(300)
				.json({ message: "Could not create blog", success: false })
		return res
			.status(200)
			.json({ message: "Blog creation sucessful", success: true, blog })
	} catch (error) {
		return res.status(500).json({ success: false, message: error.message })
	}
}
/**
 ********************  QUERY A SINGLE BLOG *************************
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
module.exports.getSingleBlog = async (req, res, next) => {
	try {
		const blog = await Blog.findById(req.params.blogId)
		if (!blog)
			return res.status(300).json({ message: "Blog not found", success: false })
		return res
			.status(200)
			.json({ message: "Query succesful", success: true, blog })
	} catch (error) {
		return res.status(500).json({ success: false, message: error.message })
	}
}
/**
 ********************    LIKE A BLOG POST ***************************
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
module.exports.likeBlog = async (req, res, next) => {
	try {
		const user = await User.findOne({
			likedBlogs: { $in: [req.params.blogId] },
		})
		if (user) {
			const newBlog = await Blog.findByIdAndUpdate(
				req.params.blogId,
				{ $inc: { likes: -1 } },
				{ new: true },
			)
			await user.updateOne(
				{ $pull: { likedBlogs: req.params.blogId } },
				{ new: true },
			)
			const updatedBlogs = await Blog.find()
				.populate("author")
				.sort({ createdAt: -1 })
			return res
				.status(200)
				.json({ message: "Unliked blog", success: false, blogs: updatedBlogs })
		}
		const updatedBlog = await Blog.findByIdAndUpdate(
			req.params.blogId,
			{ $inc: { likes: 1 } },
			{ new: true },
		)
		await User.findByIdAndUpdate(
			req?.user.userId,
			{ $push: { likedBlogs: req.params.blogId } },
			{ new: true },
		)
		const updatedBlogs = await Blog.find()
			.populate("author")
			.sort({ createdAt: -1 })
		return res
			.status(200)
			.json({ message: "Liked a blog", success: true, blogs: updatedBlogs })
	} catch (error) {
		return next(error)
	}
}
/**
 ********************* COMMENT ON A BLOG POST *************************
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
module.exports.commentOnBlog = async (req, res, next) => {
	return res.status(200).json({ message: "Commenting on blog post" })
}

/**
 **********************   GET ALL BLOG POSTS ******************************
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
module.exports.getBlogs = async (req, res, next) => {
	try {
		const blogs = await Blog.find().populate("author").sort({ createdAt: -1 })
		if (blogs.length < 1) {
			return res.status(404).json({ success: false, message: "No blog posts" })
		}
		return res
			.status(200)
			.json({ success: true, message: "Query succesful", blogs })
	} catch (err) {
		return next(err)
	}
}
/**
 ********************* UPDATE A SINGLE BLOG POST ***************************
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
module.exports.updateBlog = async (req, res, next) => {
	try {
		const updatedBlogs = await Blog.findByIdAndUpdate(
			req.user.blogId,
			{ ...req.body },
			{ new: true },
		)
			.populate("author")
			.sort({ updatedAt: -1 }) //.select("+author._id +author.firstName +")
		return res.status(200).json({
			success: true,
			message: "Successfully updated the post",
			blogs: updatedBlogs,
		})
	} catch (error) {
		return next(error)
	}
}

/**
 ********************* DELETE A SINGLE OWNED BLOG POST ***********************
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
module.exports.deleteBlog = async (req, res, next) => {
	try {
		const blog = await Blog.findByIdAndDelete(req.params.blogId)
		const updatedBlogs = await Blog.find()
			.populate("author")
			.sort({ updatedAt: -1 })
		return res
			.status(301)
			.json({ message: "Deleted blog ", blogs: updatedBlogs, success: true })
	} catch (err) {
		return next(err)
	}
}
