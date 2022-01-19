const {
	getUser,
	getUsers,
	updateAccount,
	getUserBlogs,
} = require("../Services/User.service")
const { Authorize } = require("../Middlewares/Auth.middleware")

const router = require("express").Router()

router.route("/single/:userId").get(getUser)
router.route("/all").get(getUsers)
router.route("/update/:userId").put(Authorize, updateAccount)
router.route("/blogs").get(Authorize, getUserBlogs)

module.exports = router
