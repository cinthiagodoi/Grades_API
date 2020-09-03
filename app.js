import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { gradeRouter } from "./routes/gradeRouter.js";

import { db } from "./models/index.js";

(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("connectado");
  } catch (error) {
    process.exit();
  }
})();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://calm-sands-55441.herokuapp.com",
  })
);

app.get("/", (req, res) => {
  res.send("API em execucao");
});

app.use(gradeRouter);

app.listen(process.env.PORT || 8081, () => {});
