const http = require("http");
const express = require("express");
const cors = require('cors');
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // TAKES ALL THE URL ENCODED DATA AND PASSES IN OBJECT THAT WE CAN USE ON THE REQUEST OBJECT 
app.set("port", process.env.PORT || 3100);
app.use(express.static("src"));

const server = http.createServer(app);
const routes = require("../routes/main.routes");
app.use("/", routes);

if (process.env.NODE_ENV === 'production') {
    // Express serve static files on production environment
    app.use(express.static(path.resolve(__dirname, 'src')))
} else {
    // Configuring CORS
    app.use(cors({
        // Make sure origin contains the url your frontend is running on
        origin: ['*'],
        credentials: true,
        methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
    }))
}

server.listen(app.get("port"), () => {
    console.log("Express server listening on port " + app.get("port"));
});

