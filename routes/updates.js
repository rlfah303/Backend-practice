const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const models = require('../models')
const bcrypt = require("bcrypt")
const router = express.Router()
const User = models.User



//Updating
router.patch("/:id", getUser, async (req, res) => {
  if (req.user._id.equals(res.user._id)) {
      bcrypt.compare(req.body.password, res.user.password, async function(err, isMatch) {
          if (!isMatch) {
              res.status(401).send({success: false, message: "Check the password"})
          } else {
              if (req.body.email != null) {
                  res.user.email = req.body.email
              }
              
              if (req.body.password != null) {
                  res.user.password = req.body.password
              }
              /* 
              if (req.body.gender != null) {
                  res.user.gender = req.body.gender
              }
              */
              try {
                  const updatedUser = await res.user.save()
                  res.status(200)
                  res.json(updatedUser)
              } catch(err) {
                return res.json({succuss: false, message:"error!"})
              }
          } 
      })
  } else {
      res.status(5).send({message:"Unauthorized User"})
  }
})

//Deleting the user
router.delete('/:id', getUser, async (req, res) => {
  if (req.user._id.equals(res.user._id)) {
      bcrypt.compare(req.body.password, res.user.password, async function(err, isMatch) {
          if (!isMatch) {
              res.status(6).send({ message: "Check the password" })
          } else {
              try {
                  await res.user.remove()
                  res.status(200)
                  res.json({ message: 'User Deleted' })
              } catch(err) {
                  res.status(500).json({ message: err.message })
              }
                } 
      })
  } else {
      res.status(7).send({ message: "Unauthorized User" })
  }
})



async function getUser(req, res, next) {
  let user
  try {
    user = await User.findById(req.params.id)
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' })
    }
  } catch (err) {
      return res.status(500).json({ message: err.message })
  }
  res.user = user
  next()
}

module.exports = router