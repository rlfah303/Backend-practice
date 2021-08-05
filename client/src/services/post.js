import axios from "axios";

const API_URL = "http://localhost:3000/api/posts";

class PostService {
    static getPosts(token) {
        return new Promise((resolve, reject) =>{
            axios
            .get(API_URL, { headers: { authorization: token } })
            .then((res)=>{
                console.log("Service returned success");
                resolve(res.data);
            })
            .catch((err)=>{
                console.log("failed")
                reject(err);
            });
        });
    }
    static createPosts(token){
        return new Promise ((resolve, reject) => {
            console.log("token is" + token)
            axios
                .post(API_URL, {
                    headers: { authorization: token },
                    data:{
                        title:token.title,
                        content:token.content,
                    }   
                })
                .then((res)=>{
                    console.log("Service return success");
                    resolve(res.data);
                })
                .catch((err) => {
                    console.log("Service returned failure");
                    reject(err);
                });
        });
    }

}

export default PostService;