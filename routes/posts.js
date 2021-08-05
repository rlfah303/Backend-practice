const express = require('express') 
const router = express.Router()
const models = require('../models')
const Post = models.Post

router.use( (req, res, next)=>{
    //do loggingin
    console.log("A request came in ...")
    next();
})

//test API
router.get("/testAPI", (req,res)=>{
    const resObject ={
        message:"Test API is working",
    }
    res.send(resObject)
});

//Creating one
router.post('/posts',async (req,res) => {
    console.log('creaing one')
    if (!req.body.title || !req.body.content){
        req.status(400)
        res.json({succuss: false, error:"Missing title or content"})
    }
    
    const post = new Post({
        title:req.body.title,
        content:req.body.content,
        //author: req.user._id 
    })
    post.save()
    .then(
        res.json(post)
    )
    .catch(function(err) {
        res.status(500)
        res.json({success: false, error: err})
    })
})
//Getting all
router.get('/posts',async (req,res) => {
   try{
       console.log('get all')
       const posts = await Post.find()
       res.json(posts)
   }catch(err){
    res.status(500).json({message: err.message}) 
   }
})

/* 

//Getting one
router.get('/:id', getPost,(req,res) => {
    res.json(res.post)
})
*/

//Getting one post
router.get('posts/:id', getPost, (req, res) => {
    Post.findOne({ _id: req.params.id })
    .populate('author')
    .then(function(post) {
      if (post) {
            res.json(post)
      } else {
            res.status(404)
            res.json({ error: "Post doesn't exist!"})
      }
    })
    .catch(function(err) {
        console.log(err)
         res.status(500)
        res.json({message: "Error", error: err})
    })
  })
  

//Updating for only authorized users
router.patch('/posts/:id',getPost,async (req,res) => {
    if (req.user._id.equals(res.post.author) || req.user.isAdmin) {
        if(req.body.title != null){
            res.post.title =req.body.title
            
        }
        if(req.body.content != null){
            res.post.content =req.body.content
        
        }
        try{
            const updatedPost = await res.post.save()
            res.json(updatedPost)
            
        }catch(err){
            res.status(400).json({message: err.message})
            console.log('error')
        } 

    } else {
        res.status(403).json({success: false, message: "Forbidden"})
    }
})

//Deleting one
router.delete('/posts/:id',getPost,async (req,res) => {
    if (req.user._id.equals(res.post.author) || req.user.isAdmin) {
        try{
            await res.post.remove()
            res.json({message: 'Deleted Post'})
        }catch(err){
            res.status(500).json({message: err.message}) 
        }
    }else {
        res.status(403).json({success: false, message: "Forbidden"})
    }
})



async function getPost(req,res,next){
 let post
 try{
    post= await Post.findById(req.params.id)
    if(post ==null){
        return res.status(404).json({message:'Cannot find post'})
    } 
 } catch(err){
    return res.status(500).json({message: err.message}) 
 }
 res.post = post
 next()
}
module.exports = router

