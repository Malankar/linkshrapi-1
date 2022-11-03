import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
if (!process.env.MONGO_URL) {
  throw new Error("Please add the MONGO_URL environment variable");
}

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const database = mongoose.connection;

database.on(
  "error",
  console.error.bind(console, "❌ mongodb connection error")
);
database.once("open", () => console.log("✅ mongodb connected successfully"));
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.Promise = Promise;
