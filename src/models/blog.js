const { model, Schema, SchemaTypes } = require("mongoose")

const BlogSchema = new Schema(
	{
		title: {
			type: String,
			unique: true,
			required: true,
		},
		author: {
			type: SchemaTypes.ObjectId,
			ref: "User",
		},
		body: {
			type: String,
			required: true,
		},
		likes: {
			type: Number,
			min: 0,
			default: 0,
		},
		comments: {
			type: [
				{
					author: { type: String },
					comment: { type: String },
				},
			],
			default: [],
		},
	},
	{ timestamps: true },
)

module.exports = model("Blog", BlogSchema)
