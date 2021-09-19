const router = require("express").Router();
const User = require("../modules/User");
const bcrypt = require("bcryptjs");

// Update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        return res.status(500).json(error);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
});

//get a user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get friends
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});

// Follow user
// @/api/users/(followers id)/follow
router.put("/:id/follow", async (req, res) => {
  // check my id and user id same or not
  // * user id = that id i want to follow
  if (req.body.userId !== req.params.id) {
    // if two id are not same
    try {
      // finding user account by use her id
      const user = await User.findById(req.params.id);
      // finding my account by use my id
      const currentUser = await User.findById(req.body.userId);

      // check i already follow that account are not
      if (!user.followers.includes(req.body.userId)) {
        // if i not followed that account
        // inserting my id to user id's followers section
        await user.updateOne({ $push: { followers: req.body.userId } });
        // inserting user id to my id's followings section
        await currentUser.updateOne({
          $push: { followings: req.params.id },
        });
        res.status(200).json("user has been followed");
      } else {
        // if i already followed that account
        res.status(403).json("you already followed this user");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    // if two id are same
    res.status(403).json("you can't follow yourself");
  }
});

// UnFollow user
// @/api/users/(followers id)/follow
router.put("/:id/unfollow", async (req, res) => {
  // check my id and user id same or not
  // * user id = that id i want to follow
  if (req.body.userId !== req.params.id) {
    // if two id are not same
    try {
      // finding user account by use her id
      const user = await User.findById(req.params.id);
      // finding my account by use my id
      const currentUser = await User.findById(req.body.userId);

      // check i already follow that account are not
      if (user.followers.includes(req.body.userId)) {
        // if i not followed that account
        // inserting my id to user id's followers section
        await user.updateOne({ $pull: { followers: req.body.userId } });
        // inserting user id to my id's followings section
        await currentUser.updateOne({
          $pull: { followings: req.params.id },
        });
        res.status(200).json("user has been unfollowed");
      } else {
        // if i already followed that account
        res.status(403).json("you already unfollowed this user");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    // if two id are same
    res.status(403).json("you can't unfollow yourself");
  }
});

module.exports = router;
