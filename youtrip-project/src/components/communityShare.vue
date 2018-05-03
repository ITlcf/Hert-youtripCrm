<template>
  <div>
    <div class="source">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>社区管理</el-breadcrumb-item>
        <el-breadcrumb-item>社区人员分享管理列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div :data="currentPageData" class="background">
      <div v-for="(val,key,index) in ahh" class="btn">
        <div class="card">
          <div class="put">
            <div class="top">
              <div class="topNum">#{{currentPageData[key].id}}</div>
              <div class="myicon">
                <i class="el-icon-delete iconcolor" @click="handleDelete(currentPageData[key])"></i>
                <i class="el-icon-edit iconcolor" @click="handleEdit(currentPageData[key])"></i>
                <i class="el-icon-arrow-up iconcolor arrowup" @click="arrowup(currentPageData[key].id)"></i>
                <i class="el-icon-setting iconcolor" ></i>
              </div>
            </div>
            <div  class="middle">
              <img :src="'/api/images/fz-imge/'+val">
              <div class="all"><div class="title">title(标题)：</div><div class="main boder1">{{currentPageData[key].t_title}}</div></div>
              <div class="all1"><div class="title">text(文章)：</div><div class="main boder">{{currentPageData[key].t_text}}</div></div>
              <div class="all"><div class="title">date(时间)：</div><div class="main">{{currentPageData[key].t_date}}</div></div>
              <div class="all"><div class="title">评价星级编号：</div><div class="main">{{currentPageData[key].t_starleveid}}</div></div>
              <div class="all"><div class="title">推荐编号：</div><div class="main">{{currentPageData[key].t_orderlist}}</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="changeNumber" :current-page='currentVal ' :page-sizes='pageNumArr' :page-size='pageNum' background layout="sizes,total, prev, pager, next, jumper" :total="tableData.length" ></el-pagination>
    </div>
    <!--<div class="block1">-->
      <!--<el-pagination @current-change="changeNum" :page-size="pageNum" layout="prev, pager, next" :total="shareData.length/tm" >-->
      <!--</el-pagination>-->
    <!--</div>-->
    <el-dialog title="编辑分享" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分享编号：" :label-width="formLabelWidth">
          <el-input v-model="form.id" auto-complete="off" class="myinput" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="标题：" :label-width="formLabelWidth">
          <el-input v-model="form.t_title" auto-complete="off"  class="myinput"></el-input>
        </el-form-item>
        <el-form-item label="分享内容：" :label-width="formLabelWidth">
          <el-input v-model="form.t_text" auto-complete="off"  class="myinput"></el-input>
        </el-form-item>
        <el-form-item label="分享时间：" :label-width="formLabelWidth">
          <el-input v-model="form.t_date" auto-complete="off"  class="myinput" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="分享星级编号：" :label-width="formLabelWidth">
          <el-input v-model="form.t_starleveid" auto-complete="off"  class="myinput" ></el-input>
        </el-form-item>
        <el-form-item label="推荐编号：" :label-width="formLabelWidth">
          <el-input v-model="form.t_orderlist" auto-complete="off"  class="myinput"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendEdit">确 定</el-button>
      </div>
    </el-dialog>
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
  .card{
    padding: 0 2%;
    width: 45%;
    float: left;
  }
  .put{
    width: 100%;
    outline: 1px solid #cccccc;
  }
  .middle{
    height: 530px;
    overflow: hidden;
    transition: all .3s linear;
  }
  .put>div>img{
    width: 100%;
    height:200px;
  }
  .block1{
    margin: 0 24px;
    clear: both;
    background-color: white;
    border:1px solid #cccccc;
    box-shadow: 1px 1px 2px #cccccc;
  }
  .boder1{
    height: 30px;
    line-height: 30px;
    border:1px solid #cccccc;
  }
  .boder{
    border:1px solid #cccccc;
  }
  .background{
    padding: 24px;
    background-color: white;
    border:1px solid #cccccc;
    box-shadow: 1px 1px 2px #cccccc;
    height: 580px;
    margin: 24px;
    transition: all .3s linear;
  }
  .btn{
    width: 100%;
  }
  .top{
    background-color: #7266BA;
    height: 50px;
    border-radius: 5px 5px 0 0;
  }
  .top>div{
    float: left;
    line-height: 50px;
  }
  .top>div>i{
    display: block;
    float: right;
    padding: 1%;
  }
  .topNum{
     width: 15%;
     color: white;
     font-size:18px;
  }
  .myicon{
    width: 80%;
  }
  .iconcolor{
    color: white;
    line-height: 40px;
  }
  .all{
    height: 45px;
  }
  .all1{
    height: 145px;
  }
  .all>div{
    float: left;
  }
  .all1>div{
    height: 145px;
    float: left;
  }
  .title{
    width: 30%;
    text-align: right;
    font-size: 16px;
    color: #666666;
  }
  .main{
    width: 60%;
    padding: 0 10px;
    text-align: left;
  }
</style>
<script>
  export default {
    data() {
      return {
        tableData:[],/*总数据*/
        pageNum:2,/*每页显示多少条数据*/
        pageNumArr:[2,4,6,8],/*每页显示多少条数据*/
        currentVal:1,
        ahh:[],
        setimg:0,
        pageNumber:1,
        tm:2,
        currentPageData: [],
        shareData: [],
        imgslength:[],
        dialogFormVisible: false,
        form: {
          a:'/api/images/fz-imge/',
          id:'',
          t_title: '',
          t_nackname: '',
          t_text: '',
          t_starleveid: '',
          t_orderlist: '',
          t_date:'',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '100px'
      }
    },
    methods:{
      changeNumber(val){
        this.currentPageData = []
        this.ahh=[]
        console.log(val);
        for (var i = (val - 1) * this.tm; i < val * this.tm; i++) {
          if (i < this.tableData.length) {
            this.currentPageData.push(this.tableData[i])
          }
        }
        for(var i=0;i<this.currentPageData.length;i++){
          this.imgslength.push(this.currentPageData[i].t_shareimgs.split(',')[0])
        }
        this.ahh=this.imgslength.slice((val - 1) * this.tm,val*this.tm);
        console.log(this.ahh)
      },
      /*改变每一页的数据条数*/
      handleSizeChange(val) {
        this.currentPageData=[]
        this.pageNum = val
        for(var i=0;i<parseInt(this.pageNum) && i<this.tableData.length;i++){
          this.currentPageData.push(this.tableData[i])
        }
      },
      changeNumber(val){  /*当前点击的是那一页*/
        this.currentPageData=[]
        this.ahh=[]
        this.imgslength=[]
        console.log(this.tableData)
        for(var i=(val-1)*parseInt(this.pageNum);i<val*parseInt(this.pageNum);i++){
          if(i<this.tableData.length){
            this.currentPageData.push(this.tableData[i])
          }
        }
        for(var i=0;i<this.currentPageData.length;i++){
          this.imgslength.push(this.currentPageData[i].t_shareimgs.split(',')[0])
        }
        this.ahh=this.imgslength.slice(0,2);
      },
      /*下拉*/
      arrowup(obj){
        var middle=document.getElementsByClassName('middle')
        /*var d=Math.ceil(obj/2)*/
        var bg=document.getElementsByClassName('background')[0]
        if(middle[obj-1].style.height=="530px"||middle[obj-1].style.height==""){
          middle[obj-1].style.height="0px"
        }else if(middle[obj-1].style.height=="0px"){
          middle[obj-1].style.height="530px"
        }
        var c=obj-2
        if(c<0){
          c=1
        }else {
            c=obj-2
        }
        if((middle[obj-1].style.height=="0px"&&middle[c].style.height=="0px")){
            bg.style.height="50px"
        }else {
            bg.style.height="580px"
        }
      },
      //编辑
      handleEdit(row) {
        this.dialogFormVisible=true;
        this.form.id=row.id;
        this.form.t_title=row.t_title;
        this.form.t_text=row.t_text;
        this.form.t_date=row.t_date;
        this.form.t_starleveid=row.t_starleveid;
        this.form.t_orderlist=row.t_orderlist;
      },
      sendEdit(){
        this.dialogFormVisible = false;
        var myinput=document.getElementsByClassName('myinput');
        this.axios.post('/api/setshare',{
          id:myinput[0].children[0].value,
          t_title:myinput[1].children[0].value,
          t_text:myinput[2].children[0].value,
          t_starleveid:myinput[4].children[0].value,
          t_orderlist:myinput[5].children[0].value,
        }).then((data)=>{
//          location.reload()
        })
        this.getall()
      },
      //删除
      handleDelete(row) {
        this.currentPageData=[];
        this.axios.post('/api/deleteShare',{
          myid:row.id
        }).then((data)=>{
          console.log(data)
        });
        var _this = this
        _this.currentPageData=[]
        for(var i=(_this.currentVal-1)*parseInt(_this.pageNumber);i<(_this.currentVal)*parseInt(_this.pageNumber);i++){
          if(row.id==_this.tableData[i].id){
            _this.tableData.splice(i,1)
            break
          }
        }
        for(var i=(_this.currentVal-1)*parseInt(_this.pageNumber);i<(_this.currentVal)*parseInt(_this.pageNumber) && i<this.tableData.length;i++){
          _this.currentPageData.push(_this.tableData[i])
        }
//        location.reload()
        this.getall()
      },
      getall(){
        this.tableData=[]
        this.currentPageData=[]
        this.axios.get('/api/getallshare').then((data)=>{
          console.log(data.data);
          this.tableData=data.data;
          for(var i=0;i<this.tm;i++){
            this.currentPageData.push(this.tableData[i])
          }
        });
      }
    },
    created(){
      this.axios.get('/api/getallshare').then((data)=>{
        console.log(data.data);
        this.tableData=data.data;
        for(var i=0;i<this.tm;i++){
          this.currentPageData.push(this.tableData[i])
        }
        for(var i=0;i<this.currentPageData.length;i++){
          this.imgslength.push(this.currentPageData[i].t_shareimgs.split(',')[0])
        }
        this.ahh=this.imgslength.slice(0,2);
      });
    }
  }
</script>
