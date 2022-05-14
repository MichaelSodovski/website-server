const http = require("http");
const express = require("express");
const cors = require('cors')

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
    const corsOptions = {
        // Make sure origin contains the url your frontend is running on
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

server.listen(app.get("port"), () => {
    console.log("Express server listening on port " + app.get("port"));
});
