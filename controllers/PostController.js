import PostModel from "../models/Post.js";

export const create = async (req, res) => {
    try {
        const data = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId
        })

        const post = await data.save();

        res.json(post);
    } catch (error) {
        res.status(500).json({
            message: "Не удалось создать статью"
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find({user: req.userId}).populate({path: "user", select:["fullName","avatarUrl"]}).exec();
        res.json(posts);
    } catch (error) {
        res.status(500).json({
            message: "Не удалось получить статьи"
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const postId=req.params.id;
        const post = await PostModel.findOneAndUpdate(
            {_id: postId},
            {$inc:{viewsCount:1}},
            {new: true}).populate({path:"user",select:["fullName","avatarUrl"]}).exec();
        if (!post){
            return res.status(404).json({message: "Статья не найдена"});
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({
            message: "Не удалось получить статью"
        })
    }
}

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await PostModel.findOneAndDelete({_id: postId});
        if (!post){
            return res.status(404).json({message: "Статья не найдена"});
        }
        res.json({
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: "Не удалось удалить статью"
        })
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await PostModel.updateOne({_id: postId},{
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId
        });
        if (!post.modifiedCount){
            return res.status(404).json({message: "Статья не найдена"});
        }
        res.json({
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: "Не удалось обновить статью"
        })
    }
}