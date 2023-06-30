import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    price: String,
    imageUrl: String
  },
  { timestamps: true, strict: true, strictQuery: true }
)

export default mongoose.model('Product', schema)
