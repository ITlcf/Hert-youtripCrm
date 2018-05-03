<template>
  <div class="bg">
    <div class="source">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>社区管理</el-breadcrumb-item>
        <el-breadcrumb-item>社区人员评论管理表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="tableMa">
      <el-table :data="currentPageData" style="width: 100%">
        <el-table-column label="评论编号" width="100">
          <template slot-scope="scope">
            {{scope.row.id}}
          </template>
        </el-table-column>
        <el-table-column label="评论人" width="100">
          <template slot-scope="scope">
            {{ scope.row.t_nickname}}
          </template>
        </el-table-column>
        <el-table-column label="评论内容的标题" width="250">
          <template slot-scope="scope">
            {{ scope.row.t_title}}
          </template>
        </el-table-column>
        <el-table-column label="评论的内容" width="150">
          <template slot-scope="scope">
            {{ scope.row.t_content}}
          </template>
        </el-table-column>
        <el-table-column label="评论的时间" width="200">
          <template slot-scope="scope">
            {{ scope.row.t_cdate}}
          </template>
        </el-table-column>

        <el-table-column label="操作" >
          <template slot-scope="scope">
            <i class="el-icon-edit " @click="handleEdit(scope.$index, scope.row)"></i>
            <i class="el-icon-delete marigen" @click="handleEdit(scope.$index, scope.row)"></i>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @current-change="changeNum" :page-size="pageNum" layout="prev, pager, next" :total="tableData.length/tm" >
        </el-pagination>
      </div>
    </div>
  </div>

</template>
<style>
  .source{
    margin: 0 24px;
    padding: 24px;
    background-color: white;
    border:1px solid #cccccc;
    box-shadow: 1px 1px 2px #cccccc;
  }
  .tableMa{
    padding: 24px;
    margin: 0 24px;
    margin-top: 60px;
    border:1px solid #cccccc;
    box-shadow: 1px 1px 2px #cccccc;
  }
  .myimg{
    width: 30px;
    height: 30px;
    border-radius: 30px;
  }
  .el-table th>.cell{
    text-align: center;
  }
  .marigen{
    margin-left: 20px;
  }
</style>
<script>
  export default {
    data() {
      return {
        pageNum:1,
        tm:3,
        currentPageData:[],
        tableData:[]
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
//        this.axios.get('/api/delete.do',{
//          params:{
//            myid:row.s_id
//          }
//        }).then((data)=>{
//          console.log(data.data)
//        });
//        this.tableData.splice(index,1)
      },
      changeNum(val){
        this.currentPageData=[]
        console.log(val);
        for(var i=(val-1)*this.tm;i<val*this.tm;i++){
          if(i<this.tableData.length){
            this.currentPageData.push(this.tableData[i])
          }
        }
      }
    },
    created(){
      this.axios.get('/api/getallComment').then((data)=>{
        console.log(data.data);
        this.tableData=data.data;
        for(var i=0;i<this.tm;i++){
          this.currentPageData.push(this.tableData[i])
        }
      });
    }
  }
</script>

