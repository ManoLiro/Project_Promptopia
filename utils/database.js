import mongoose from "mongoose";

let isConnected = false; //track connection status

export const connectToDatabase = async () => {
    mongoose.set('strictQuery', true);
    if (isConnected) {
        console.log("MongoDB is already connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB is connected");
    } catch (error) {
        console.log("Error connecting to MongoDB: ", error);
        return;
    }
}