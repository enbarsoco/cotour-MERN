import mongoose from "mongoose";

const tourSchema = mongoose.Schema({
  title: String,
  description: String,
  name: { type: String, required: true },
  creator: String,
  tags: [String],
  imageFile: String,
  createdAt: { type: Date, default: new Date() },
  likes: { type: [String], default: [] },
});

const TourModel = mongoose.model("Tour", tourSchema);

export default TourModel;
