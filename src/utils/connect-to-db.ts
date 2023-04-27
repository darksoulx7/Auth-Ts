import mongoose from "mongoose";
import config from "config";
import log from "./logger";

async function connectToDb() {

    const mongo_url = config.get<string>('mongoUrl')

    try {
        await mongoose.connect(mongo_url);
        log.info("mongodb connected!!");
    } catch (error) {
        process.exit(1);
    }
}

export default connectToDb;