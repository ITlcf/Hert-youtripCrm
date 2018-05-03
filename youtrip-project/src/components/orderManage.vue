<template>
  <div>
    <div id='maxdiv'>
      <el-form :inline="true" :model="formInline" id="myfrom"  class="demo-form-inline">
        <el-form-item label="状态" prop="or_stateName">
          <el-select v-model="formInline.or_stateName" placeholder="请选择状态" id="queryPlace">
            <el-option value="上架"></el-option>
            <el-option value="下架"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit"><i class="el-icon-search"></i>查询</el-button>
        </el-form-item>
      </el-form>
      <div class="btnDiv">
        <el-button type="danger" @click="deleteAll"><i class="el-icon-delete"></i>批量删除</el-button>
        <router-link to="/addShops">
          <el-button type="primary"><i class="el-icon-plus"></i>新增</el-button>
        </router-link>
      </div>
      <el-row :gutter="20" style="margin-left: 0px;margin-right: 0">
        <el-col :span="2"><div class="grid-content bg-purple">显示:</div></el-col>
        <el-col :span="4" :offset="2"><div class="grid-content bg-purple">条</div></el-col>
      </el-row>
      <el-table :data="currentPageData" border style="width: 100%;" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column label="ID" width="80px" >
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="套餐名" width="200px" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.s_name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="描述" width="300px" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.s_productdec}}</span>
          </template>
        </el-table-column>
        <el-table-column label="国家" width="100px">
          <template slot-scope="scope">
            <span>{{ scope.row.c_countryname}}</span>
          </template>
        </el-table-column>
        <el-table-column label="定制师" width="100px">
          <template slot-scope="scope">
            <span>{{ scope.row.d_name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100px">
          <template slot-scope="scope">
            <span v-if="scope.row.s_true==8" style="color:#5EB95E">{{ scope.row.or_stateName}}</span>
            <span v-else-if="scope.row.s_true==9" style="color:#b6bec9">{{ scope.row.or_stateName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" style="text-align: center">
          <template slot-scope="scope">
            <router-link to="/updateShops">
              <i class="el-icon-edit" @click="handleEdit(scope.$index, scope.row)"></i>
            </router-link>
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
      this.axios.get("/api/orderManage.do").then((data)=>{
        this.tableData = data.data
        for(var i=0;i<parseInt(this.pageNum) && i<this.tableData.length;i++){
          this.currentPageData.push(this.tableData[i])
        }
      })
    }
  }
</script>

<style>
  @import "../assets/table.css";
  #myfrom .el-form-item:first-child{
    margin-left: 28%;
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
