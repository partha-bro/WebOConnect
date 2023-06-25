import mongoose from 'mongoose'

const connectDB = async (url,db) => {
    return await mongoose.connect(url+db)
}

export default connectDB