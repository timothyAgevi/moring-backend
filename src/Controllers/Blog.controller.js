const {
	createBlog,
	updateBlog,
	deleteBlog,
	likeBlog,
	getBlogs,
	getSingleBlog,
} = require("../Services/Blog.service")
const { blogTitleConflict } = require("../Middlewares/Model.middleware")
const {
	Authorize,
	AuthorizeBlogOwner,
} = require("../Middlewares/Auth.middleware")
const {
	emptyBlogTitle,
	emptyBlogBody,
} = require("../Middlewares/Form.middleware")
// const { Authorize, AuthorizeBlogOwner } = require("../Middlewares/Auth.middleware")

const router = require("express").Router()

router
	.route("/new")
	.post(Authorize, emptyBlogTitle, blogTitleConflict, emptyBlogBody, createBlog)
router
	.route("/update/:blogId")
	.put(AuthorizeBlogOwner, emptyBlogTitle, updateBlog)
router.route("/delete/:blogId/").delete(AuthorizeBlogOwner, deleteBlog)
router.route("/like/:blogId/").put(Authorize, likeBlog)
router.route("/comment/:blogId/").put(createBlog)
router.route("/single/:blogId/").get(getSingleBlog)
router.route("/").get(getBlogs)

module.exports = router
