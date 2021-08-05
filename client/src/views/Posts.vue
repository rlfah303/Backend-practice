<template>
    <div class="posts">
        <h2>Posts</h2>
        <div class="messages" v-if ="this.message">
            {{this.message}}
        </div>
        <div id="posts">
            <div class="post" v-for ="post in this.posts" :key ="post._id">
                Title: {{post.title}}
                <p class="class">
                </p>
            </div>
        </div>
        <button>
                <router-link to ="/CreatePosts">New Post</router-link>
        </button>
    </div>
</template> 
<script>

import PostService from "@/services/post";

export default {
    data(){
        return {
            posts: [],
            message: "Loading Posts",
        };
    },
    mounted (){
        console.log("Load Posts Here");
        if (this.$store.getters.loggedIn){
            const token = this.$store.getters.token;
            console.log(token);
            PostService.getPosts(token)
             .then((data) =>{
                this.posts = data;
                this.message =null;
            })
             .catch((err)=> {
                console.log("Error getting posts: ", err);
                this.message ="Error getting posts"
            })
        }else {
            this.message ="You must login first"
        }
    },
    methods:{
        
    },
};
</script>