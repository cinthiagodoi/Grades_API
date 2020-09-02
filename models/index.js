import mongoose from "mongoose";

import GradesSchema from "./gradesModel.js";

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB;
db.grade = GradesSchema;

export { db };
