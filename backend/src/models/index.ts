import path from "path";
import fs from "fs";
import mongoose from "mongoose";

export const init = async () => {
    //connect to mongodb
    await mongoose.connect(process.env.MONGO_DB_URI as string).then(db => {
        console.log("Connected to mongodb");
    });

    //reverify models
    const schemaDir = path.resolve(path.join(__dirname, "schemas"));
    const schemas = fs.readdirSync(schemaDir);
    await Promise.all(schemas.map(async (schema) => {
        const sPath = path.join(schemaDir, schema);
        const model = await import(sPath);
        return model.default;
    }));
}