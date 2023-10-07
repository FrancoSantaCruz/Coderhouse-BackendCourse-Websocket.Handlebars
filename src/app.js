import express from 'express';
import { engine } from 'express-handlebars'
import { Server } from 'socket.io';

import { __dirname } from './utils.js';
import viewsRouter from './routes/views.router.js'
import productsRouter from './routes/products.router.js'

const app = express();
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname+'/views')

const httpServer = app.listen(PORT, () => {
    console.log(`Listening PORT ${PORT}. \nhttp://localhost:8080/`)
})
const socketServer = new Server(httpServer)

// Routes

app.use('/', viewsRouter)
app.use('/api/products', productsRouter);

const products = []
socketServer.on("connection", (socket) =>{
    socket.on("products", (product) => {
        products.push(product)
        socketServer.emit("productList", products)
    }) 
})