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


## :hammer_and_wrench: 사용된 기술
> + Vue.js https://vuejs.org/
> + Express https://expressjs.com/
> + MongoDB https://www.mongodb.com/
> + Axios https://axios-http.com/

<br/>
