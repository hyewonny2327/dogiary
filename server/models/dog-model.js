const mongoose = require("mongoose");

const dogSchema = new mongoose.Schema(
	{
		image_url: {
			type: String,
			require: true,
		},
		name: {
			type: String,
			required: true,
		},
		birthday: {
			type: String,
			required: true,
		},
		gender: {
			type: String,
			required: true,
		},
		date: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
	},
	{
		collection: "Dogs",
		timestamps: true,
	}
);

const Dog = mongoose.model("Dogs", dogSchema);

module.exports = Dog;
