import express from 'express';
import mongoose from 'mongoose';

import { postRouter, userRouter } from './routes/index.js';
import {upload, checkAuth} from './middlewares/index.js';

mongoose.connect("mongodb+srv://leegra:jAcvtnnWF2qmBTdK@cluster0.o97bigy.mongodb.net/blog").then(()=>{
    console.log("DB ok");
}).catch((err)=>{
    console.log("DB error: " + err);
})

const app = express();
app.use(express.json()); // преобразование входящих данных из JSON формата в JS объект

app.use("/auth",userRouter);
app.use("/posts",postRouter);
app.use("/uploads",express.static('uploads'));
app.post("/upload",checkAuth, upload.single("image"), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
});

app.listen(3000, (err)=>{
    if (err) {
        return console.log(err);
    }
    console.log("server ok");
});