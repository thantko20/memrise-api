import express from "express";

const app = express();
const logger = require("pino-http");

app.use(logger());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const server = app.listen(3000, () => {
  console.log("Server running on port 3000");
});

["SIGTERM", "SIGINT"].forEach((signal) => {
  process.on(signal, () => {
    server.close((err) => {
      console.log("Shutdown gracefully");
      console.log({ err });
    });
  });
});
