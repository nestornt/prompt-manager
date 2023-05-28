import mongoose, { ConnectOptions } from "mongoose";

let isConnected = false; // track connection status

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('DB is already connected')
    return;
  }

  const options: ConnectOptions = {
    dbName: 'share_prompt',
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI as string, options)
    isConnected = true;
    console.log('MongoDB is connected');
  } catch (error) {
    console.log(error);
  }
}