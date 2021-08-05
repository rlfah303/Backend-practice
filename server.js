//require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require('passport');
const routes = require('./routes');


require ('./config/passport')(passport);


mongoose.connect("mongodb://mongo:27017/acemdb", {useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => {
        const app = express()
        const db = mongoose.connection
        db.on('error',(error) => console.error(error))
        db.once('open', () => console.log('Connected to Database'))
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())
        app.use(cors());
        app.use('/api/auth',routes.auth)
        app.use("/api", passport.authenticate('jwt', { session: false }), routes.posts)
        app.use("/api/updates", passport.authenticate('jwt', { session: false }), routes.updates)
        

        app.listen(3000, () => {
            console.log('Server Started')
    })
})
