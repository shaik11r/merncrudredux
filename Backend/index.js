const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const blogRouter = require("./routes/blogRouter");
const connectToDatabase = require("./config/dbconfig");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: "*",
    allowedHeaders: "*",
    exposedHeaders: "*",
  })
);

app.use("/api/blog", blogRouter);

app.listen(process.env.PORT, async () => {
  console.log(`stared to listen at ${process.env.PORT}`);
  await connectToDatabase();
});
