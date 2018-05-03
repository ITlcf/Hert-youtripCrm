<template>
  <div>
    <el-container v-if="relogin">
      <el-header style="height:40px">
        <router-link to="/youTripHome">
          <span style="color: white">You Trip 后台管理系统</span>
          <span class="el-icon-ump-shouye" style="color:white;"></span>
        </router-link>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!--在这里写导航-->
          <div class="person">
            <span>&nbsp;</span>
            <div class="personOut">
              <div class="portrait">
                <img width="100px" height="100px" :src="'/api/'+personpic" alt="">
              </div>
            </div>
            <div class="personWordOut">
              <div class="personWord">
                <span>姓名：{{personname}}</span>
                &nbsp;&nbsp;
                <span style="font-size:8px;color:blue">[退出]</span>
              </div>
            </div>
          </div>
          <mynav></mynav>
        </el-aside>
        <el-container>
          <el-main>
            <!--<transition mode="out-in" enter-active-class="animated slideInUp" leave-active-class="animated slideInDown">-->
              <!--<keep-alive>-->
              <router-view></router-view>
              <!--</keep-alive>-->
            <!--</transition>-->
          </el-main>
        </el-container>
      </el-container>
    </el-container>
    <el-container v-else>
      <el-container>
        <login ref="login" v-on:login="childLogin"></login>
      </el-container>
    </el-container>
  </div>

</template>
<script>
  import MyNav from './components/MyNav.vue'
  import login from './components/login.vue'
  import ElInput from "../node_modules/element-ui/packages/input/src/input.vue";

  export default {
    name: 'App',
    components:{
      mynav : MyNav,
    },
    data () {
      return {
        personname:'',
        personpic:'',
        relogin:false,
        username:''
      }
    },
    components: {
      ElInput,
      mynav: MyNav,
      login: login
    },
    methods: {
      childLogin(msg){
        this.relogin = msg[0];
        this.username = msg[1];
//        console.log(this.username)
      },
    },
    created(){
      this.axios.get("/api/getProtrait.do").then((data)=>{
        this.personname=data.data[0].a_name
        this.personpic=data.data[0].a_imgSrc
        console.log(this.personpic)
      })
    }
  }
</script>

<style>
  @import "assets/animate.css";
  @import "assets/icon/iconfont.css";
  *{
    margin:0;
    padding:0;
    font-size: 14px;
    font-family:  "微软雅黑";
  }
  body{
    background-color: #f5f5f5;
    color: #333;
  }
  .el-container{
    flex-wrap: wrap;
  }
  .el-header{
    width: 100%;
    background-color: #252525;
    text-align:left;
    line-height: 40px;
  }
  .el-aside {
    text-align: left;
  }
  /*关于个人资料的设置*/
  .person{
    height:160px;
    background:white;
    margin-top:10px;
  }
  .personOut{
    width:100%;
    height:100px;
    margin-top:-10px;
  }
  .portrait{
    width:100px;
    height:100px;
    background:pink;
    border-radius:100px;
    margin:0 auto;
    overflow: hidden;
  }
  .personWordOut{
    width:100%;
    margin-top:10px;
    height:40px;
  }
  .personWord{
    width:100%;
    margin:0 auto;
    text-align: center;
  }
  /*关于个人资料的设置end*/
  .el-main {
    text-align: center!important;
    background-color:white;
    margin-top:3px;
    margin-left:10px;
    margin-right:10px;
    padding: 10px;
  }
  .breadHead{
    margin-top:10px;
    margin-left:10px;
    margin-right:10px;
    background-color:white;
    color:#333;
  }
  a:-webkit-any-link {
    color:white;
    cursor:pointer;
    text-decoration:none;
  }
  a:hover{
    color:#ffd04b;
  }
</style>
