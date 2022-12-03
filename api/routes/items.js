const router = require("express").Router();
const User = require("../models/User");
const Item = require("../models/Item");

//CREATE item
router.post("/", async (req, res) => {
  const newItem = new Item(req.body);
  try {
    const savedItem = await newItem.save();
    res.status(200).json(savedItem);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE item
router.put("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (item.username === req.body.username) {
      try {
        const updatedItem = await Item.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedItem);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your item!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE item
router.delete("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (item.username === req.body.username) {
      try {
        await item.delete();
        res.status(200).json("Item has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your item!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET item
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL items
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let items;
    if (username) {
      items = await Item.find({ username });
    } else if (catName) {
      items = await Item.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      items = await Item.find();
    }
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
