<template>
  <div class="orderout">
    <el-row type="flex" class="row-bg" justify="space-around">
      <el-col :span="4">
        <div class="grid-content bg-purple mybg1">
          <div class="topWord1">
             <span class="rightWord1">待审核</span><br>
             <span class="rightBotWord">10笔</span>
          </div>
          <router-link to="/routeOrder">
            <div class="bottomWord1 ">
              <span>查看详情</span>
            </div>
           </router-link>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light mybg2">
          <div class="topWord2">
            <span class="rightWord2">待支付</span><br>
            <span class="rightBotWord">5笔</span>
          </div>
          <router-link to="/routeOrder">
            <div class="bottomWord2">
              <span>查看详情</span>
            </div>
          </router-link>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple mybg3">
          <div class="topWord3">
            <span class="rightWord3">待出行</span><br>
            <span class="rightBotWord">25笔</span>
          </div>
          <router-link to="/routeOrder">
            <div class="bottomWord3">
              <span>查看详情</span>
            </div>
          </router-link>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple mybg4">
          <div class="topWord4">
            <span class="rightWord4">已完成</span><br>
            <span class="rightBotWord">26笔</span>
          </div>
          <router-link to="/routeOrder">
            <div class="bottomWord3">
              <span>查看详情</span>
            </div>
          </router-link>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple mybg5">
          <div class="topWord5">
            <span class="rightWord5">退款中</span><br>
            <span class="rightBotWord">5笔</span>
          </div>
          <router-link to="/routeOrder">
            <div class="bottomWord5">
              <span>查看详情</span>
            </div>
          </router-link>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="10">
        <div style="padding:5px 10px;width:100%;height:40px;background:#f4f4f4">
          <span style="line-height:40px;font-weight:bolder;font-size:1.2em">热门国家排行</span>
        </div>
        <el-table :data="tableData"  style="width: 100%">
          <el-table-column prop="no" label="排名" width="60"></el-table-column>
          <el-table-column prop="flag" label="国旗" width="80">
            <template slot-scope="scope">
              <img height="20px" width="30px" :src="'/api/'+scope.row.flag">
            </template>
          </el-table-column>
          <el-table-column prop="country" label="国家" width="80"></el-table-column>
          <el-table-column text-align="center" prop="num" label="订单量"></el-table-column>
        </el-table>
      </el-col>
      <el-col :span="14">
        <div style="line-height:50px;font-weight:bolder;font-size:1.2em;background:#f4f4f4">大洲套餐销量排行</div>
        <myEchart></myEchart>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped>
  .el-table td, .el-table th {
    padding:0;
  }
  .el-table tr{
    height:20px;
  }
  .el-table td, .el-table th {
    padding:0 !important;
  }
  .el-main {
    text-align: left !important;
  }
  .el-table-column{
    text-align:left;
  }
  .el-row {
    margin-bottom: 20px;
  }
  .has-gutter tr th{
    text-align: center!important;
  }
  /*.el-row:last-child{*/
    /*margin-bottom: 0;*/
  /*}*/
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  /*-----------------------消息框样式-------------------*/
  .orderout{
    width:100%;
  }
  .rightBotWord{
    line-height:10px;
  }
  .rightWord1,
  .rightWord2,
  .rightWord3,
  .rightWord4,
  .rightWord5{
    font-size:1.8em;
  }
  .mybg1,
  .mybg2,
  .mybg3,
  .mybg4,
  .mybg5{
    line-height:30px;
    height:100px;
    background:white;
  }
  .mybg1{
    border:2px solid #DA4453;
  }
  .mybg2{
    border:2px solid #5EB95E;
  }
  .mybg3{
    border:2px solid #4FC1E9;
  }
  .mybg4{
    border:2px solid #AC92EC;
  }
  .mybg5{
    border:2px solid #EC87C0;
  }
  .mybg1:hover,
  .mybg2:hover,
  .mybg3:hover,
  .mybg4:hover,
  .mybg5:hover{
    box-shadow:3px 3px 3px 0 #cfcfcf;
    margin-left:-1px;
    margin-top:-1px;
    transition:.3s all linear;
  }
  .topWord1,
  .topWord2,
  .topWord3,
  .topWord4,
  .topWord5{
    height:70%;
    width:100%;
  }
  .topWord1{
    color:#DA4453;
  }
  .topWord2{
    color:#5EB95E;
  }
  .topWord3{
    color:#4FC1E9;
  }
  .topWord4{
    color:#AC92EC;
  }
  .topWord5{
    color:#EC87C0;
  }
  .bottomWord1,
  .bottomWord2,
  .bottomWord3,
  .bottomWord4,
  .bottomWord5{
    text-align:center;
    color:white;
    line-height:26px;
    height:30%;
    width:100%;
  }
  .bottomWord1:hover,
  .bottomWord2:hover,
  .bottomWord3:hover,
  .bottomWord4:hover,
  .bottomWord5:hover{
    color:#ffd04b;
    cursor:pointer;
  }
  .bottomWord1{
    background:#DA4453;
  }
  .bottomWord2{
    background:#5EB95E;
  }
  .bottomWord3{
    background:#4FC1E9;
  }
  .bottomWord4{
    background:#AC92EC;
  }
  .bottomWord5{
    background:#EC87C0;
  }
  .rightWord3{
    height:100%
  }
</style>
<script>

  import myecharts from './myEchart.vue'
  export default {
    components:{
      myEchart:myecharts
    },
    data() {
      return {
        tableData:[]
      }
    },
    created(){
      this.axios.get("/api/homeData.do").then((data)=>{
        this.tableData=data.data
        for(var i=0;i<this.tableData.length;i++){
          this.tableData[i].no=i+1
          this.tableData[i].flag=this.tableData[i].v_imgLogo
          this.tableData[i].country=this.tableData[i].c_countryname
          this.tableData[i].num=this.tableData[i].total
        }
      })
    }
  }
</script>
