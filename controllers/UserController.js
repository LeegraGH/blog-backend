import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UserModel from '../models/User.js';

export const register = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const passHash=await bcrypt.hash(password, salt);

        const data = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: passHash
        });

        const user = await data.save();

        const token = jwt.sign({
            _id: user._id
        },
        "secret",
        {
            expiresIn: '30d'
        }
        );

        const {passwordHash, ...userData}=user._doc;

        res.json({
            ...userData,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось зарегистрироваться"
        });
    }
};

export const login = async (req, res) =>{
    try{
        const user = await UserModel.findOne({
            email: req.body.email
        });

        if(!user){
            return res.status(404).json({message: "Пользователь не найден"});
        }

        const isValidPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        if (!isValidPassword){
            return res.status(400).json({message: "Неверный логин или пароль"});
        }
        
        const token = jwt.sign({
            _id: user._id
        },
        "secret",
        {
            expiresIn: '30d'
        }
        );
        const {passwordHash, ...userData}=user._doc;

        res.json({
            ...userData,
            token
        });
    } catch(error){
        console.log(error);
        res.status(500).json({
            message: "Не удалось авторизоваться"
        });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if(!user){
            return res.status(404).json({
                message: "Пользователь не найден"
            })
        }

        const {passwordHash, ...userData}=user._doc;

        res.json(userData);
    } catch (error) {
        res.status(500).json({
            message: "Не удалось получить данные"
        });
    }
};