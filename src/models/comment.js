const { model, Schema } = require("mongoose")

const CommentSchema = new Schema(
	{
		author: {
			type: String,
			required: true,
		},
		comment: {
			type: String,
			required: String,
		},
	},
	{ timestamps: true },
)

module.exports = model("Comment", CommentSchema)
