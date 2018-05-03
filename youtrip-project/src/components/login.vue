<template>
  <div id="LoginBack">
    <div id="tLeft" class="tCenter">
      <el-row>
        <el-col :xs="14" :sm="14" :md="14" :lg="14" :xl="14">
          <!--<span>-->
            <img src="../assets/logo1.png">
          <!--</span>-->
        </el-col>
        <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
          <span>后台管理系统</span>
        </el-col>
      </el-row>
    </div>
    <div id="tRight" class="tCenter">
      <p style="font-size: 22px;color: rgb(181, 143, 20);">后台管理员登录</p>
      <el-input class="inputTyp" v-model="user" prefix-icon="el-icon-service" placeholder="请输入用户名" clearable></el-input>
      <el-input  class="inputTyp inputTyp1" v-model="password" id="password" prefix-icon="el-icon-goods" placeholder="请输入密码"></el-input>
      <p>
        <el-button class="inputBtn" v-on:click="goApp">登录</el-button>
      </p>
    </div>
  </div>
</template>
<style scoped>
  .el-row {
    color: #333;
  }

  span{
    padding: 30px 0;
    color: rgb(181, 143, 20);
    font-size: 18px;
    display: inline-block;
  }

  body {
    margin: 0;
    /*background: url("../assets/newimg.jpg") no-repeat!important;*/
  }

  #LoginBack {
    width: 802px;
    height: 400px;
    margin-left: 21%;
    margin-top: 9%;
  }
  #tLeft {
    width: 400px;
    height: 100px;
    padding: 150px 0;
    text-align: right;
  }

  #tRight {
    width: 400px;
    height: 140px;
    padding: 30px 0 150px 0;
    text-align: center;
    border: 1px solid rgba(51, 3, 0, .3);
  }

  .tCenter {
    float: left;
  }

  .inputTyp{
    width: 300px;
    background-color: inherit;
    margin: 50px 10px 10px 10px;
  }
  .inputTyp1{
    margin-top: 10px;
  }
  .inputBtn {
    width: 300px;
    background-color: rgb(181, 143, 20) !important;
    color: white;
  }

</style>

<script>
  export default {
    data() {
      return {
        user: '',
        password: '',
        mydata: [{username: 'liuchengfeng', password: '123456'},
          {username: 'maryhuang', password: 'huang123'},
          {username: 'blackli', password: 'li123'}]
      }
    },
    methods: {
      goApp() {
        document.getElementById("password").type="password"
        for (var i = 0; i < this.mydata.length; i++) {
          if (this.mydata[i].username == this.user && this.mydata[i].password == this.password) {
            this.$parent.relogin = true;
            this.$emit("login",[this.$parent.relogin,this.mydata[i].username])
          }
        }
      }
    },
  }
</script>

