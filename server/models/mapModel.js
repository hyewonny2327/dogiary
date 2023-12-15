const mongoose = require("mongoose");

const MapSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			require: true,
		},
		toggle: {
			type: String,
			required: true,
		},
		tag: {
			type: Array,
			required: true,
			default: [],
		},
		imageUrl: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			// required: true,
		},
		position: {
			type: Array,
			required: true,
			default: [],
		},
	},
	{
		collection: "Maps",
		timestamps: true,
	}
);

const Map = mongoose.model("Maps", MapSchema);

module.exports = Map;
