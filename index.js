import express from 'express';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import {registerValidation} from './validations/auth.js';
import {validationResult} from "express-validator";
import UserModel from './models/User.js';

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

app.post("/auth/register", registerValidation, async (req, res) => {
    const errors=validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash=await bcrypt.hash(password, salt);

    const data = new UserModel({
        email: req.body.email,
        fullName: req.body.fullName,
        avatarUrl: req.body.avatarUrl,
        passwordHash
    });

    const user = await data.save();

    res.json(user);
});

app.listen(4444, (err)=>{
    if (err) {
        return console.log(err);
    }
    console.log("server ok");
});