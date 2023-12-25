const mongoose = require("mongoose");
const path = require("path");

const weightSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const medicalSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    hospital: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
const foodSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const memoSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
const dogSchema = new mongoose.Schema(
	{
		imageUrl: {
			type: String,
			default: path.join(__dirname, "../public/images/defaultImage.png"),
		},
		name: {
			type: String,
			required: true,
		},
		birthday: {
			type: String,
			required: true,
		},
		sex: {
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
		userId: {
			type: String,
		},
		weights: [weightSchema],
		medicals: [medicalSchema],
		foods: [foodSchema],
		memos: [memoSchema],
	},
	{
		collection: "Dogs",
		timestamps: true,
	}
);

const Dog = mongoose.model('Dogs', dogSchema);

module.exports = Dog;
