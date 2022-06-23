const http = require("http");
const express = require("express");
const cors = require('cors'); // for cors handling.
const app = express(); // calling the express. 
app.use(express.json()); // this is to accept data in json format.
app.use(express.urlencoded({ extended: true })); // TAKES ALL THE URL ENCODED DATA AND PASSES IN OBJECT THAT WE CAN USE ON THE REQUEST OBJECT.
app.set("port", process.env.PORT || 3100); // setting the server to run on a specific port. 
app.use(express.static("src"));

app.use((req, res, next) => {
    const allowedOrigins = ['http://localhost:3000',];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
});

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
        origin: ['http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

server.listen(app.get("port"), () => {
    console.log("Express server listening on port " + app.get("port"));
});

