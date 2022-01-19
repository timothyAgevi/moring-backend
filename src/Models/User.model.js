const { model, Schema, SchemaTypes } = require("mongoose")
const bcrypt = require("bcryptjs")

const UserSchema = new Schema(
	{
		username: {
			type: String,
			unique: true,
			required: [true, "Username cannot be empty"],
		},
		firstName: {
			type: String,
			required: [true, "First name cannot be empty"],
		},
		lastName: {
			type: String,
			required: [true, "Last name cannot be empty"],
		},
		email: {
			type: String,
			min: 0,
			default: 0,
			unique: true,
			required: [true, "Email cannot be empty"],
		},
		password: {
			type: String,
			required: true,
			minlength: 8,
			select: false,
		},
		blogs: {
			type: [
				{
					type: SchemaTypes.ObjectId,
					ref: "Blog",
				},
			],
			default: [],
		},
		likedBlogs: {
			type: [{ type: SchemaTypes.ObjectId, ref: "Blog" }],
			default: [],
		},
	},
	{ timestamps: true },
)

UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next()
	}
	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
	return next()
})

/**
 *
 * @param {string} password
 * @returns
 */
UserSchema.methods.passwordMatch = async function (password) {
	return await bcrypt.compare(password, this.password)
}

module.exports = model("User", UserSchema)
