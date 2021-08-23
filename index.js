const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config()


// setup express server

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:3000", "http://localhost:3001", "https://testwebrtcfrontend1.netlify.app", "http://localhost", "https://www.testwebrtc-demo.com", "http://localhost:8080", "http://172.20.10.4:8080"],
        credentials: true,
    })
);
app.use(cookieParser());


const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
// setup routers

app.use("/snippet", require("./routers/snippetRouter"));
app.use("/auth", require("./routers/userRouter"));

// connect to mongoDB 

mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("connected to DB"))
    .catch(err => console.error(err));
