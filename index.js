// create a app
const app = require('express')();
// create a server using app
const server = require('http').createServer(app);
// implement a middleware for cors origin
const cors = require('cors');

// implement socket.io
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        method: ["GET", "POST"]
    }
});

// app using cors
app.use(cors());

// port

 const PORT = process.env.PORT || 5000;

// for run the server
app.get('/', (req, res) => {
    res.send("Running server..");
});


server.listen(PORT, () => console.log(`listening on port${PORT}`));

