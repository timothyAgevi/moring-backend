const {
	createBlog,
	updateBlog,
	deleteBlog,
	likeBlog,
	getBlogs,
	getSingleBlog,
} = require("../controllers/blog")
const {
	emptyBlogTitle,
	emptyBlogBody,
	blogTitleConflict,
} = require("../middleware/model")
const { Authorize, AuthorizeBlogOwner } = require("../middleware/authorize")

const router = require("express").Router()

router
	.route("/new")
	.post(Authorize, emptyBlogTitle, blogTitleConflict, emptyBlogBody, createBlog)
router.route("/update/:blogId").put(AuthorizeBlogOwner, updateBlog)
router.route("/delete/:blogId/").delete(AuthorizeBlogOwner, deleteBlog)
router.route("/like/:blogId/").put(Authorize, likeBlog)
router.route("/comment/:blogId/").put(createBlog)
router.route("/single/:blogId/").get(getSingleBlog)
router.route("/").get(getBlogs)

module.exports = router
