const mongoose = require('mongoose');
const path = require('path');

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
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: path.join(__dirname, '../public/images/defaultImage.png'),
    },
    content: {
      type: String,
      required: true,
    },
    position: {
      type: [String, String],
      required: true,
      default: [],
    },
    userId: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'Maps',
    timestamps: true,
  },
);

const Map = mongoose.model('Maps', MapSchema);

module.exports = Map;
