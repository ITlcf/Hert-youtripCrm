<!--社区人员分享管理列表-->

<!--<style>-->
  <!--@import "../assets/table.css";-->
  <!--.source{-->
    <!--margin: 0 24px;-->
    <!--padding: 24px;-->
    <!--background-color: white;-->
    <!--border:1px solid #cccccc;-->
    <!--box-shadow: 1px 1px 2px #cccccc;-->
  <!--}-->
  <!--.tableMa{-->
    <!--padding: 24px;-->
    <!--margin: 0 24px;-->
    <!--border:1px solid #cccccc;-->
    <!--box-shadow: 1px 1px 2px #cccccc;-->
  <!--}-->
  <!--.myimg{-->
    <!--width: 30px;-->
    <!--height: 30px;-->
    <!--border-radius: 30px;-->
  <!--}-->
  <!--.myimg1{-->
    <!--width: 50px;-->
    <!--height: 50px;-->
    <!--text-align: left !important;-->
  <!--}-->
  <!--.el-table th>.cell{-->
    <!--text-align: center;-->
  <!--}-->
  <!--.marigen{-->
    <!--margin-left: 20px;-->
  <!--}-->
  <!--i{-->
    <!--cursor: pointer;-->
  <!--}-->
  <!--/*上传的样式*/-->
  <!--.avatar-uploader .el-upload {-->
    <!--border: 1px dashed #d9d9d9;-->
    <!--border-radius: 6px;-->
    <!--cursor: pointer;-->
    <!--position: relative;-->
    <!--overflow: hidden;-->
  <!--}-->
  <!--.avatar-uploader .el-upload:hover {-->
    <!--border-color: #409EFF;-->
  <!--}-->
  <!--.avatar-uploader-icon {-->
    <!--font-size: 28px;-->
    <!--color: #8c939d;-->
    <!--width: 178px;-->
    <!--height: 178px;-->
    <!--line-height: 178px;-->
    <!--text-align: center;-->
  <!--}-->
  <!--.avatar {-->
    <!--width: 178px;-->
    <!--height: 178px;-->
    <!--display: block;-->
  <!--}-->
  <!--.search{-->
    <!--width: 400px;-->
    <!--height: 30px;-->
    <!--margin: 24px;-->
  <!--}-->
  <!--.search>input{-->
    <!--width: 40%;-->
    <!--height: 100%;-->
    <!--color:#cccccc;-->
    <!--float: left;-->
  <!--}-->

  <!--/*.searchbotton{*/-->
    <!--/*width: 20%;*/-->
    <!--/*margin-left: 5%;*/-->
    <!--/*margin-top: -2px;*/-->
    <!--/*float: left;*/-->
  <!--/*}*/-->
<!--</style>-->
<!--<script>-->
  <!--const delay = (function() {-->
    <!--let timer = 0;-->
    <!--return function(callback, ms) {-->
      <!--clearTimeout(timer);-->
      <!--timer = setTimeout(callback, ms);-->
    <!--};-->
  <!--})();-->
  <!--export default {-->
    <!--name: 'search',-->
    <!--data() {-->
      <!--return {-->
        <!--tableData:[],/*总数据*/-->
        <!--pageNum:3,/*每页显示多少条数据*/-->
        <!--pageNumArr:[3,6,9,12],/*每页显示多少条数据*/-->
        <!--currentPageData:[]  /*当前页数据*/,-->
        <!--currentVal:1,-->
        <!--dialogFormVisible: false,-->
        <!--imageUrl: '',/**/-->
        <!--title: '',-->
        <!--search:[],-->
        <!--c:'',-->
        <!--form: {-->
          <!--newimg:'',-->
          <!--id:'',-->
          <!--name: '',-->
          <!--t_nackname: '',-->
          <!--imgs: '',-->
          <!--title: '',-->
          <!--delivery: false,-->
          <!--type: [],-->
          <!--resource: '',-->
          <!--desc: ''-->
        <!--},-->
        <!--formLabelWidth: '100px'-->
      <!--}-->
    <!--},-->
    <!--watch: {-->
      <!--//watch title change-->
      <!--title() {-->
        <!--delay(() => {-->
          <!--this.fetchData();-->
        <!--}, 300);-->
      <!--}-->
    <!--},-->
    <!--methods: {-->
        <!--/*查询*/-->
      <!--fetchData(val){-->
        <!--this.currentPageData=[];-->
        <!--this.axios.post('/api/mysearch',{-->
          <!--title:this.title-->
        <!--}).then((data)=>{-->
          <!--this.tableData=data.data;-->
          <!--for(var i=0;i<parseInt(this.pageNum) && i<this.tableData.length;i++){-->
            <!--this.currentPageData.push(this.tableData[i])-->
          <!--}-->
        <!--});-->
      <!--},-->
        <!--/*编辑*/-->
      <!--handleEdit(index, row) {-->
        <!--this.dialogFormVisible=true;-->
        <!--this.form.id=row.id;-->
        <!--this.form.name=row.t_name;-->
        <!--this.form.t_nackname=row.t_nickname;-->
        <!--this.form.imgs=row.t_imgsrc;-->
        <!--console.log(this.form)-->
        <!--this.form.title=row.t_title;-->
<!--//        this.form.newimg=this.form.a+row.t_imgsrc;-->
      <!--},-->
      <!--handleAvatarSuccess(res, file) {-->
        <!--this.imageUrl = URL.createObjectURL(file.raw);-->
        <!--this.form.newimg=this.imageUrl-->
      <!--},-->

      <!--setnewuser(res,file){-->
       <!--this. dialogFormVisible = false-->
       <!--this.axios.post('/api/uploadimg',{-->
          <!--myid:this.form.id,-->
        <!--}).then((data)=>{-->

        <!--});-->
        <!--this.shuaxin()-->
      <!--},-->
      <!--/*刷新的函数*/-->
      <!--shuaxin(){-->
        <!--this.tableData=[],-->
          <!--this.currentPageData=[],-->
          <!--this.axios.get('/api/getallUser').then((data)=>{-->
            <!--console.log(data.data.t_imgsrc);-->
            <!--this.tableData=data.data;-->
            <!--for(var i=0;i<parseInt(this.pageNum) && i<this.tableData.length;i++){-->
              <!--this.currentPageData.push(this.tableData[i])-->
            <!--}-->
          <!--});-->
      <!--},-->
      <!--beforeAvatarUpload(file) {-->
        <!--const isJPG = file.type === 'image/jpeg';-->
        <!--const isLt2M = file.size / 1024 / 1024 < 2;-->

        <!--if (!isJPG) {-->
          <!--this.$message.error('上传头像图片只能是 JPG 格式!');-->
        <!--}-->
        <!--if (!isLt2M) {-->
          <!--this.$message.error('上传头像图片大小不能超过 2MB!');-->
        <!--}-->
        <!--return isJPG && isLt2M;-->
      <!--},-->

      <!--//删除-->
      <!--handleDelete(index, row) {-->
        <!--this.currentPageData=[];-->
        <!--this.axios.post('/api/deletePeople',{-->
            <!--myid:row.id-->
        <!--}).then((data)=>{-->
            <!--console.log(data)-->
        <!--});-->
        <!--var _this = this-->
        <!--_this.currentPageData=[]-->
        <!--for(var i=(_this.currentVal-1)*parseInt(_this.pageNum);i<(_this.currentVal)*parseInt(_this.pageNum);i++){-->
          <!--if(row.id==_this.tableData[i].id){-->
            <!--_this.tableData.splice(i,1)-->
            <!--break-->
          <!--}-->
        <!--}-->
        <!--for(var i=(_this.currentVal-1)*parseInt(_this.pageNum);i<(_this.currentVal)*parseInt(_this.pageNum) && i<this.tableData.length;i++){-->
          <!--_this.currentPageData.push(_this.tableData[i])-->
        <!--}-->
      <!--},-->
      <!--/*改变每一页的数据条数*/-->
      <!--handleSizeChange(val) {-->
        <!--this.currentPageData=[]-->
        <!--this.pageNum = val-->
        <!--for(var i=0;i<parseInt(this.pageNum) && i<this.tableData.length;i++){-->
          <!--this.currentPageData.push(this.tableData[i])-->
        <!--}-->
      <!--},-->
      <!--changeNumber(val){  /*当前点击的是那一页*/-->
        <!--this.currentPageData=[]-->
        <!--this.currentVal=val-->
        <!--for(var i=(val-1)*parseInt(this.pageNum);i<val*parseInt(this.pageNum);i++){-->
          <!--if(i<this.tableData.length){-->
            <!--this.currentPageData.push(this.tableData[i])-->
          <!--}-->
        <!--}-->
      <!--},-->
    <!--},-->
    <!--created(){-->
      <!--this.axios.get('/api/getallUser').then((data)=>{-->
<!--//        console.log(data.data);-->
        <!--this.tableData=data.data;-->
        <!--for(var i=0;i<parseInt(this.pageNum) && i<this.tableData.length;i++){-->
          <!--this.currentPageData.push(this.tableData[i])-->
        <!--}-->
      <!--});-->
    <!--}-->
  <!--}-->
<!--</script>-->



<template>
  <div>
    <div id='maxdiv'>
      <el-form :inline="true" :model="formInline" id="myfrom"  class="demo-form-inline">
        <el-form-item label="用户名" prop="or_stateName">
          <el-input placeholder="请输入用户名" id="queryPlace"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit"><i class="el-icon-search"></i>查询</el-button>
        </el-form-item>
      </el-form>
      <div class="btnDiv">
        <el-button type="danger" @click="deleteAll"><i class="el-icon-delete"></i>批量删除</el-button>
      </div>
      <el-row :gutter="20" style="margin-left: 0px;margin-right: 0">
        <el-col :span="2"><div class="grid-content bg-purple">显示:</div></el-col>
        <el-col :span="4" :offset="2"><div class="grid-content bg-purple">条</div></el-col>
      </el-row>
      <el-table :data="currentPageData" border style="width: 100%;" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column label="ID" width="90px" >
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户名" width="130px" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.t_name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户昵称" width="130px" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.t_nickname}}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户头像" width="150px">
          <template slot-scope="scope">
            <img  :src="'/api/'+scope.row.t_imgsrc" class="myimg">
          </template>
        </el-table-column>
        <el-table-column label="分享内容" width="300px">
          <template slot-scope="scope">
            <span>{{ scope.row.t_title}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" style="text-align: center">
          <template slot-scope="scope">
            <i class="el-icon-edit" @click="handleEdit(scope.$index, scope.row)"></i>
            <i class="el-icon-delete" @click="handleDelete(scope.$index, scope.row)"></i>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="changeNumber" :current-page='currentVal ' :page-sizes='pageNumArr' :page-size='pageNum' background layout="sizes,total, prev, pager, next, jumper" :total="tableData.length" ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData:[],/*总数据*/
        pageNum:5,/*每页显示多少条数据*/
        pageNumArr:[5,10,15,20],/*每页显示多少条数据*/
        currentPageData:[]  /*当前页数据*/,
        currentVal:1,
        multipleSelection: [],
        editRow:{},
        formInline:{},
      }
    },
    methods: {
      handleEdit(index, row) {
        this.editRow = row;
        console.log(this.editRow)
        this.$router.push({name:'updateShops',
          params: {
            dataObj: this.editRow
          }
        })
      },
      handleDelete(index, row) {
        this.axios.post('/api/shopsDel.do',{
          shopId:row.id
        }).then((data)=>{
          console.log(row.id)
        })
        var _this = this
        _this.currentPageData=[]
        for(var i=(_this.currentVal-1)*parseInt(_this.pageNum);i<(_this.currentVal)*parseInt(_this.pageNum);i++){
          if(row.id==_this.tableData[i].id){
            _this.tableData.splice(i,1)
            break
          }
        }
        for(var i=(_this.currentVal-1)*parseInt(_this.pageNum);i<(_this.currentVal)*parseInt(_this.pageNum) && i<this.tableData.length;i++){
          _this.currentPageData.push(_this.tableData[i])
        }
      },
      handleSizeChange(val) {
        this.currentPageData=[]
        this.pageNum = val
        for(var i=0;i<parseInt(this.pageNum) && i<this.tableData.length;i++){
          this.currentPageData.push(this.tableData[i])
        }
      },
      changeNumber(val){  /*当前点击的是那一页*/
        this.currentPageData=[]
        this.currentVal=val
        for(var i=(val-1)*parseInt(this.pageNum);i<val*parseInt(this.pageNum);i++){
          if(i<this.tableData.length){
            this.currentPageData.push(this.tableData[i])
          }
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection )
      },
      /*批量删除*/
      deleteAll(){
        var _this = this
        var idArr=[]
        var mulp = _this.multipleSelection; // 选中的item
        for(var j=0;j<mulp.length;j++) {
          for (var i = 0; i < _this.tableData.length; i++){
            if (mulp[j].id == _this.tableData[i].id) {
              _this.tableData.splice(i, 1)
              break
            }
          }
          if(_this.currentVal!=null){
            _this.currentPageData = []
            for (var i = (_this.currentVal - 1) * parseInt(_this.pageNum); i < (_this.currentVal) * parseInt(_this.pageNum) && i < this.tableData.length; i++) {
              _this.currentPageData.push(_this.tableData[i])
            }
          }
          idArr.push(mulp[j].id)
        }
        this.axios.post('/api/shopsDelAll.do',{
          idArr:idArr
        }).then((data)=>{
          console.log(data)
        })
      },
      onSubmit() {
        console.log('submit!');
        var queryCountry =document.getElementById('queryCountry').value;
        var queryPlace =document.getElementById('queryPlace').value
        console.log(queryCountry)
        console.log(queryPlace)
        this.axios.get("/api/visaQuery.do",{
          params:{
            queryCountry:queryCountry,
            queryPlace:queryPlace
          }
        }).then((data)=>{
          this.currentPageData=[]
          this.tableData = data.data[0]
          for(var i=0;i<parseInt(this.pageNum) && i<this.tableData.length;i++){
            this.currentPageData.push(this.tableData[i])
          }
        })
      },
    },
    created(){
      this.axios.get('/api/getallUser').then((data)=>{
        this.tableData=data.data;
        for(var i=0;i<parseInt(this.pageNum) && i<this.tableData.length;i++){
          this.currentPageData.push(this.tableData[i])
        }
      });
    }
  }
</script>

<style>
  @import "../assets/table.css";
  #myfrom .el-form-item:first-child{
    margin-left: 28%;
  }

  .myimg{
    width: 30px;
    height: 30px;
    border-radius: 30px;
  }
  #myfrom .el-select{
    position: relative;
    top: 0;
    left: 0;
    width: 340px !important;
    height: 40px;
    border-radius: 3px;
  }
  .el-select{
    position: absolute;
    top: 210px;
    left: 280px;
    width: 150px !important;
    height: 40px;
  }
  .el-pagination__total{
    position: absolute;
    top: 210px;
    right: 50px;
  }
</style>

