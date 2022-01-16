const {
	getUser,
	getUsers,
	updateAccount,
	getUserBlogs,
} = require("../controllers/user")
const { Authorize } = require("../middleware/authorize")

const router = require("express").Router()

router.route("/single/:userId").get(getUser)
router.route("/all").get(getUsers)
router.route("/update/:userId").put(Authorize, updateAccount)
router.route("/blogs").get(Authorize, getUserBlogs)

module.exports = router
