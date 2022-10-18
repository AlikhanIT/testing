const express = require("express");
const { Worker } = require("worker_threads");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(express.static("public"));

app.use(cors());

app.use('/', routes);

app.use(async (err, req, res, _next) => {
  
    console.error(req, err);
  
    if (err instanceof Error) {
        return res.status(400).send({success: false, data: err.message});
    } else {
        return res.status(400).send({success: false, data: err});
    }
   })

app.get("/", (req, res) => {
    res.send('ok')
});

const worker = new Worker("./worker.js", { workerData: 1 });

worker.on("message", (msg) => {
    console.log("Message from worker", msg);
});

worker.postMessage(process.env.PORT);

app.listen(process.env.PORT, () => {
	console.log(`[Express] Started on ${process.env.PORT}`);
});
