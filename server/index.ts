import mongoose from 'mongoose'

const config = useRuntimeConfig()

export default async () => {
  try {
    await mongoose.connect(config.mongoUrl)
    console.log('DB connect Successfully')
  } catch (error) {
    console.error()
  }
}
