<template>
    <nav id="nav">
        <p class ="logo">Simple Express/ Vue Blog</p>
        <ul class = "nav-links">
            <li>
                <router-link :to="{name: 'Home'}" class="links"> Home</router-link>
            </li>
            <li>
                <router-link :to="{name: 'About'}" class="links"> About</router-link>
            </li>
            <li v-if ="$store.getters.loggedIn">
                <router-link :to="{name: 'Posts'}" class="links" > Posts</router-link>
            </li>
            <li v-if ="!$store.getters.loggedIn">
                <router-link :to="{name: 'SignUp'}" class="links" > Sign Up</router-link>
            </li>
            <li v-if ="!$store.getters.loggedIn">
                <router-link :to="{name: 'Login'}" class="links" > Login</router-link>
            </li>
            <li v-if ="$store.getters.loggedIn">
              <a @click ="logout()" class ="links">Logout</a>
            </li>
            <li v-if ="$store.getters.loggedIn">
                <router-link :to="{name: 'CreatePosts'}" class="links" > CreatePosts</router-link>
            </li>
        </ul>
    </nav>
</template>
<script>
export default {
  methods: {
    logout(){
      this.$store.dispatch("logout");
      this.$router.push("/");
    },
  },
};
</script>
<style scoped>

#nav {
  display: flex;
  align-items: center;
  position: sticky;
  top:0;
  background-color: white;
  border: solid gray;
  z-index: 1;
}

#nav ul {
  list-style-type: none;
}
#nav a {
  color: #2c7fd2;
  text-decoration: none;
  font-weight: bold;
}

#nav a.router-link-exact-active {
  color: blue;
}
.nav-links {
  display: flex;
}
.links {
  padding-right: 20px;
  list-style: none;
}
.links:hover {
  text-decoration: underline;
}
.logo{
    font-size: 20px;
    color: blue;
    font-weight: bold;
}
</style>