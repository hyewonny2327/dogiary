const mongoose = require("mongoose");

const MapSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			require: true,
		},
		toggle: {
			type: Boolean,
			required: true,
		},
		tag: {
            type: [String], 
            default: [],
            required: true,
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
