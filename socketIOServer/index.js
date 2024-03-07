import { Server } from "socket.io"
import dotenv from "dotenv"
dotenv.config()

const port = process.env.PORT || 8000
const io = new Server(port, {
    cors:{
        origin: '*',
    },
})

var sessions = []

const addSession = (socketId, productId) => {
    if(!productId) {
        return
    }
    sessions.push({ socketId, productId })
}

const removeSession = socketId => { 
    sessions = sessions.filter(session => session.socketId !== socketId)
}

const sendDataToProduct = (productId, data) => {
    sessions.forEach(session => {
        if(session.productId === productId)
            io.to(session.socketId).emit("receive-data-device", data)
    })
}


io.on("connection", socket => {
    //  when connect
    console.log('a product connected.')

    socket.on("add-session", (productId) => {
        console.log(productId, "is connecting...")
        addSession(socket.id, productId)
    })

    socket.on('send-data-device', (productId, data) => {
        console.log("run")
        sendDataToProduct(productId, data)
    })

    //  when disconnect
    socket.on("disconnect", () => {
        console.log("a product disconnected.")
        removeSession(socket.id)
    })
})