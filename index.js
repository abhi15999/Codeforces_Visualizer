//Globals
const express = require('express')
const app = express()

const handleRoutes = {
    userHandle: require('./routes/userHandle')
}

class initServer{ 
    setUpServer(){
        app.listen(5000,()=>console.log('Server running on 5000'))
    }
    setUpMiddlewares(){
        app.use(express.json())
        app.use('/',handleRoutes.userHandle) 
    }
}


const server = new initServer()
server.setUpMiddlewares()
server.setUpServer()
