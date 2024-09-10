const express = require("express");
const router = express.Router();
const FetchUser = require("../MIddleWare/FetchUser");
const News = require("../Models/NewsSchema");
const checkAuthenticity = require("../MIddleWare/checkAuthenticity");
router.post("/postnews/:id", FetchUser, async (req, res) => {
  const { heading, Country, Content, Category, news_Image } = req.body;
  const newPost = new News({
    heading,
    Country,
    Content,
    Category,
    user: req.user._id,
    userName: req.user.name,
    UserProfileImg: req.user.profilePhoto,
    news_Image,
  });
  const saveNews = await newPost.save();
  res.status(200).json(saveNews);
});
router.put("/updatenews/:id",checkAuthenticity, async (req, res) => {
  try {
    let updatedNews = await News.findById(req.body.postid);

    if (!updatedNews) {
      return res.status(404).send("Not Found");
    }
    
    if (updatedNews.user.toString() !== req.params.id) {
      return res.status(401).send("unauthorized");
    }
    updatedNews = await News.findByIdAndUpdate(req.body.postid,
      { $set: req.body.newsData},
      { new: true }
    );
    res.status(200).json(updatedNews);
    return;
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: "Internal Server Error" });
  }
});
router.delete("/deletenews/:id", checkAuthenticity, async (req, res) => {
  
  
  try {
    let news = await News.findById(req.body.postid);

    if (!news) {
      return res.status(404).send("Not Found");
    }
    
    if (news.user.toString() !== req.params.id) {
      return res.status(401).send("unauthorized");
    }
    news = await News.findByIdAndDelete(req.body.postid);
    res.status(200).json({ sucess: "News deleted" });
    return;
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: "Internal Server Error" });
  }
});
router.put("/like", async (req, res) => {
  
  try {
    const updatedPost = await News.findByIdAndUpdate(
      req.body.postId ,
      { $push: { likes: req.body.userid } },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ errors: "Internal Server Error" });
  }
});
router.put("/dislike", async (req, res) => {
  try {
    const updatedPost = await News.findByIdAndUpdate( req.body.postId ,
      { $pull: { likes: req.body.userid } },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ errors: "Internal Server Error" });
  }
});

module.exports = router;
