import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import postRouter from './routes/postRouter.js';

mongoose.connect("mongodb+srv://leegra:jAcvtnnWF2qmBTdK@cluster0.o97bigy.mongodb.net/blog").then(()=>{
    console.log("DB ok");
}).catch((err)=>{
    console.log("DB error: " + err);
})

const app = express();
app.use(express.json()); // преобразование входящих данных из JSON формата в JS объект

app.use("/auth",userRouter);
app.use("/posts",postRouter);

app.listen(3000, (err)=>{
    if (err) {
        return console.log(err);
    }
    console.log("server ok");
});