const express = require("express");
const router = express.Router();
const News = require("../Models/NewsSchema");
const FetchUser = require("../MIddleWare/FetchUser");

router.get("/fetchAllNews/:country/:Category/:pageNumber", async (req, res) => {
  if (req.params.Category !== "none") {
    try {
      const news = await News.find({
        Country: req.params.country,
        Category: req.params.Category,
      })
        .sort({ date: -1 })
        .skip(req.params.pageNumber * 15)
        .limit(15);
        const totalNews= await News.countDocuments({
        Country: req.params.country,
        Category: req.params.Category,
      })
      res.status(200).json({news, totalNews});
      return;
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ errors: "Internal Server Error" });
    }
  }
  if (req.params.country === "World") {
    try {
      const news = await News.find()
        .sort({ date: -1 })
        .skip(req.params.pageNumber * 15)
        .limit(15);
        const totalNews= await News.countDocuments({})
        console.log(totalNews)
      res.status(200).json({news, totalNews});
      return;
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ errors: "Internal Server Error" });
    }
    c;
  }
  try {
    const news = await News.find({ Country: req.params.country })
      .sort({ date: -1 })
      .skip(req.params.pageNumber * 15)
      .limit(15);
      const totalNews= await News.countDocuments({
        Country: req.params.country
      })
      console.log(totalNews)
    res.status(200).json({news, totalNews});
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: "Internal Server Error" });
  }
});

router.get("/ForYou/:id", FetchUser, async (req, res) => {
  const two_dimension_news = await Promise.all(
    req.user.following.map(async (_id) => {
      return await News.find({ user: _id });
    })
  );
  const NewsForYou = two_dimension_news.flat();
  res.status(200).json(NewsForYou);
});
router.get("/query", (req, res) => {
  console.log(req.params);
  res.send("your query");
});

module.exports = router;
