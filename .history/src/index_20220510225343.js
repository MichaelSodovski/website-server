const http = require("http");
const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("port", process.env.PORT || 3100);
// app.use(express.static("src"));

const server = http.createServer(app);
const routes = require("./routes/main.route");
app.use("/", routes);

server.listen(app.get("port"), () => {
  console.log("Express server listening on port " + app.get("port"));
});
