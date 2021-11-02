# <p align="center"> Backed Practice</p>

<p>
본 저장소에는 Node.js와 Vue를 기반으로한 간단한 홈페이지입니다. 백엔드 서버를 프론트엔드의 데이터 연결, REST API를 이용한 CRUD 기능등을 구현해 보았습니다. 
</p>
<br/>


### <p align="center" style="text-decoration:underline">About Developer</p>

**<p align="center" style="font-size:15pt">김길모</p>**
<p align="center">:palm_tree: https://www.linkedin.com/in/gilmogim/ </p>
<p align="center">
Brigham Young University - Hawaii<br/>
Software Engineer<br/>
</p>
<br/>

## :computer: Code

1. Vue를 활용한 SPA 구성
  
  - 컴포넌트 생성후 App.vue 파일에 렌더링  
  
  App.vue
  ```javascript
     <template>
       <div id="app">
          <div id="nav">
            <TheNavigation />
          </div>
        <router-view :key="$route.fullPath" />
      </div>
    </template>
    <script>
    import TheNavigation from "@/components/TheNavigation";
    export default {
      components:{
        TheNavigation
      }
    }
   ```
   - Vue router에 각각의 컴포넌트의 endpoint 를 지정
  
   index.js
   
   ```javascript
      import Vue from "vue";
      import VueRouter from "vue-router";
      import Home from "../views/Home.vue";

      Vue.use(VueRouter);
      const routes = [
      {
        path: "/",
        name: "Home",
        component: Home
      },
      {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue")
      },
      ....
      ....
      ....
      const router = new VueRouter({
        mode:"history",
        routes:routes,
      });

      export default router;
   ```
   
<br/>
2. Axios와 Vue를 연동한 서버와 통신
  - axios를 통해 비동기로 get,post 기능구현
 
  post.js
  ```javascript
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
       }
  ```
<br/>
3. Passport와 JWT를 이용한 Authentication

  - Authentication에 따른 user_id verify
  
  passport.js
  
  ```javascript
      const JwtStrategy = require('passport-jwt').Strategy
      const ExtractJwt = require('passport-jwt').ExtractJwt
      const User = require('../models/User')
      const config = require('./config')

      const secret = config.secret

      module.exports =(passport) => {
          var opts = {}
          opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
          opts.secretOrKey =secret
          passport.use(new JwtStrategy(opts, function(jwt_payload,done){
              User.findOne({_id: jwt_payload._id}, (err,user) => {
                  if (err){
                      return done(err, false)
                  }
                  if (user){
                      done(null,user)
                  } else {
                      done(null,false)
                  }
              })    
          }))
      }
  ```
  
   - 비밀번호 확인후 JWT를 이용한 login
   
   auth.js
   
   ```javascript
     router.post('/login', (req,res) => {
        User.findOne({email: req.body.email}, function(err,user){
          if (err) throw err;
          if (!user){
              res.status(401).send({succuss: false, message: "User not found."})
          }else{
              user.comparePassword(req.body.password, function(err, isMatch){
                  if (isMatch){
                      const tokenObj = { _id: user._id, email: user.email }
                      const token = jwt.sign(tokenObj, config.secret)
                      res.send({succuss:true, token: 'JWT '+token})
                  }else{
                      res.status(401).send({succuss: false, message: 'Wrong Password'})
                  }
              })
          }
        })
      })
   ```
   

## :hammer_and_wrench: 사용된 기술
> + Vue.js https://vuejs.org/
> + Express https://expressjs.com/
> + MongoDB https://www.mongodb.com/
> + Axios https://axios-http.com/

<br/>
