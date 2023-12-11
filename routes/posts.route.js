const express = require("express");
const jwt = require("jsonwebtoken");
const {PostModel} = require("../model/posts.model")
const postRouter = express.Router();

postRouter.get("/", async (req,res) => {
    const {device} = req.query;
    const {userID} = req.body;
    const query = {};
    if(device) {
        query.device = device
    }
    // console.log(device)
    try {
        const allPosts = await PostModel.find(query);
        // console.log(allPosts);
        if(allPosts.length ==0) {

            res.status(200).send({"msg" : "No posts" })
        }else{
            res.status(200).send({"AllPosts" : allPosts })

        }
    } catch (error) {
        res.status(400).send({"error": error})
    }
})

postRouter.post("/add", async(req,res) => {
    const {title,body,device} = req.body
    try {
        const newPost = new PostModel({title,body,device,userID: req.body.userID});
        await newPost.save();
        res.status(200).send({"msg" : "New post has beed added"})
    } catch (error) {
        res.status(400).send({"error": error})
        
    }
})

postRouter.patch("/update/:postID", async(req,res) => {
    const {postID} = req.params;
    const {userID} = req.body
    try {
        const post = await PostModel.findByIdAndUpdate({_id: postID, userID}, req.body);
        res.status(200).send({"msg" : `Post has been updated`})
    } catch (error) {
        res.status(400).send({"error": error})    
    }
})

postRouter.delete("/delete/:postID", async(req,res) => {
    const {postID} = req.params;
    const {userID} = req.body
    try {
        const post = await PostModel.findByIdAndDelete({_id: postID, userID});
        res.status(200).send({"msg" : `Post has been deleted`})
    } catch (error) {
        res.status(400).send({"error": error})    
    }
})

postRouter

module.exports={
    postRouter
}