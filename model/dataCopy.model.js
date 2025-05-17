import mongoose from "mongoose";
const { Schema } = mongoose;

const dataCopySchema = new Schema({
  code: { type: String, required: true },
  title: { type: String, required: true },
  updateCount: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("dataCopy", dataCopySchema);
