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
  <br/>
  
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
   
2. Axios와 Vue를 연동한 서버와 통신
3. Passport와 JWT를 이용한 Authentication


## :hammer_and_wrench: 사용된 기술
> + Vue.js https://vuejs.org/
> + Express https://expressjs.com/
> + MongoDB https://www.mongodb.com/
> + Axios https://axios-http.com/

<br/>
