<template>
  <div>
    <el-row class="tac myNav">
      <el-col :span="24">
        <el-menu :router="true" default-active="$router.path" class="el-menu-vertical-demo" @open="handleOpen"
                 @close="handleClose">
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-ump-guanliyuan"></i>
              <span>管理员管理</span>
            </template>
            <el-menu-item index="/roleManage" style="padding-left:60px;">
              <span>角色管理</span>
            </el-menu-item>
            <el-menu-item index="/managerList" style="padding-left:60px;">
              <span>管理员列表</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="/customerCenter">
            <i class="el-icon-ump-huiyuan1"></i>
            <span slot="title">会员管理</span>
          </el-menu-item>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-ump-lvyou"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="/orderManage" style="padding-left:60px;">
              <span>旅游套餐管理</span>
            </el-menu-item>
            <el-menu-item index="/visaManage" style="padding-left:60px;">
              <span>签证管理</span>
            </el-menu-item>
            <el-menu-item index="/insurance" style="padding-left:60px;">
              <span>保险管理</span>
            </el-menu-item>
            <el-menu-item index="/orderDesigner" style="padding-left:60px;">
              <span>定制师管理</span>
            </el-menu-item>
            <el-menu-item index="/country" style="padding-left:60px;">
              <span>国家管理</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="/customerCase">
            <i class="el-icon-ump-toubaoanli"></i>
            <span slot="title">客户案例</span>
          </el-menu-item>
          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="/routeOrder" style="padding-left:60px;">
              <span>套餐订单</span>
            </el-menu-item>
            <el-menu-item index="/visaOrder" style="padding-left:60px;">
              <span>签证订单</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="/customerDesign">
            <i class="el-icon-ump-chakanwodedingzhijilu"></i>
            <span slot="title">定制管理</span>
          </el-menu-item>
          <el-submenu index="9">
            <template slot="title">
              <i class="el-icon-ump-shequ"></i>
              <span>社区管理</span>
            </template>
            <el-menu-item index="/communityPeople" style="padding-left:60px;">
              <span>人员管理</span>
            </el-menu-item>
            <el-menu-item index="/communityRecommend" style="padding-left:60px;">
              <span>推荐管理</span>
            </el-menu-item>
            <el-menu-item index="/communityShare" style="padding-left:60px;">
              <span>分享管理</span>
            </el-menu-item>
            <el-menu-item index="/communityComment" style="padding-left:60px;">
              <span>评论管理</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<style>
  @import "../assets/icon/iconfont.css";
  .myNav{
    margin-top:3px;
  }
  .el-menu-item,
  .el-submenu__title{
    height:40px;
    line-height:40px;
  }
  .el-menu-item:hover,
  .el-submenu__title:hover{
    background-color:#f68888;
  }
  .el-menu-item.is-active{
    background-color: #f68888;
    color:white;
  }
  .el-menu-item.is-active span,i{
    color:white;
  }
</style>
<script>
  import ElAlert from "../../node_modules/element-ui/packages/alert/src/main.vue";
  import ElSubmenu from "../../node_modules/element-ui/packages/menu/src/submenu.vue";

  export default {
    data () {
      return {
        msg: 'holle vue'
      }
    },
    components:{
      ElSubmenu,
      ElAlert
    },
    methods:{
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
