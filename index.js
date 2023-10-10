import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://leegra:jAcvtnnWF2qmBTdK@cluster0.o97bigy.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp").then(()=>{
    console.log("DB ok");
}).catch((err)=>{
    console.log("DB error: " + err);
})

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hey");
});

app.post('/auth/login', (req, res) => {

    const token = jwt.sign({
        login: req.body.login,
        password: req.body.password
    }, 'secret');

    res.json({
        success: true,
        token: token
    });
});

app.listen(4444, (err)=>{
    if (err) {
        return console.log(err);
    }
    console.log("server ok");
})