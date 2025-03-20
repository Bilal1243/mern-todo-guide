import mongoose from 'mongoose'

const connectDb = async () => {
    try {
        const connect = await mongoose.connect('mongodb+srv://merntodoMorning:f9CYJfkfFRUip6Pn@cluster0.z5hll.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log('mongodb connected successfully')
    } catch (error) {
        console.log(error)
    }
}

export default connectDb