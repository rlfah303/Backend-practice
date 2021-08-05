<template>
  <div class="post">
    <h2>Createposts</h2>
    <form name="createForm" @submit.prevent="handleCreate">
      <div v-if="message" id ="message">{{message}}</div>
        <div class ="form_row">
            <label for ="title">Title</label>
            <input type ="title" name ="title" v-model="title" />
        </div>
        <div class ="form_row">
            <label for ="content">Content</label>
            <input type ="content" name ="content" v-model="content" />
        </div>
        <div class ="form_row">
            <button :disabled="submitted">
                <span>Create</span>
            </button>
        </div>
    </form>
  </div>
</template>

<script>

import PostService from "@/services/post";

export default {
    name: "post",
    data(){
        return {
            submitted: false,
            message: "",
            title: "",
            content:"",
            
        };
    },
    methods:{
        handleCreate() {
            console.log("Create Pressed");
            this.submitted = true;
            if (this.title != "" && this.content != ""){
                const token = this.$store.getters.token;
                PostService.createPosts(token,{
                    title: this.title,
                    content: this.content,
                })
                    .then((post) => {
                        console.log(post);
                        this.$router.push("/posts");
                        this.message ="Post Created";
                        
                    })
                    .catch((err) => {
                        console.log(err);
                        this.message ="Error";
                        this.submitted = false;
                    });
            } else{
                this.message ="Email and Password required";
                this.submitted = false;
            }
        },

    },
};
</script>