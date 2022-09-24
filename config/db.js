const mongoose= require ('mongoose')
 const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://localhost/game-store')
    console.log('MongoDB connected.')
  } catch (error) {
    console.error(`Error:${error.message}`)
    process.exit(1)
  }
}

  module.exports=connectDB
