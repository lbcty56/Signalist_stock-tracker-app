import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

declare global {
    // Augment NodeJS global to cache mongoose connection across hot-reloads in dev
    // to prevent creating multiple connections.
    var mongooseCache: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    }
}

let cached = global.mongooseCache;
if (!cached) {
    cached = global.mongooseCache = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
    if (!MONGODB_URI) throw new Error("MongoDB URI must be set within .env");

    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false});
    }

    try {
        cached.conn = await cached.promise;
    } catch (err) {
        cached.promise = null;
        throw err;
    }

    console.log(`Connected to database: ${process.env.NODE_ENV} - ${MONGODB_URI}`);
    return cached.conn;
}