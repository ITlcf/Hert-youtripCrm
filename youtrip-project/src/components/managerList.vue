<template>
  <div>
    <div id='maxdiv'>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="账号状态" prop="userState">
          <el-select v-on:change="selectUser" v-model="formInline.userState" placeholder="请选择账号状态" id="queryCountry">
            <el-option  value="已启用"></el-option>
            <el-option  value="未启用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit"><i class="el-icon-search"></i>查询</el-button>
        </el-form-item>
      </el-form>
      <div class="btnDiv">
        <el-button type="danger" @click="deleteAll"><i class="el-icon-delete"></i>批量删除</el-button>
        <el-button type="primary" @click="dialogADDFormVisible=true"><i class="el-icon-plus"></i>新增</el-button>
        <el-dialog class="formDiv1" title="新增框" :visible.sync="dialogADDFormVisible">
          <el-form :model="addRow" ref="addRow" label-width="100px" class="demo-ruleForm">
            <el-form-item label="姓名：" prop="v_price">
              <el-input disabled id="id"></el-input>
            </el-form-item>
            <el-form-item label="联系电话：" prop="v_price">
              <el-input id="addprice"></el-input>
            </el-form-item>
            <el-form-item label="加入时间：" prop="v_price">
              <el-input id="date"></el-input>
            </el-form-item>
            <el-form-item label="角色名：" prop="v_price">
              <el-input id="name"></el-input>
            </el-form-item>

            <el-form-item label="头像图片：" prop="v_imgSrc">
              <el-upload class="avatar-uploader" action="/api/addvisaImgSrc.do" name="addimgUpload"
                         :on-change="handleChange3" :show-file-list="false" :on-success="handleAvatarSuccess3" :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl3" :src="imageUrl3" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="" prop="v_imgLogo">
              <el-upload class="avatar-uploader" action="/api/addvisaImgLogo.do" name="addimgUpload"
                         :on-change="handleChange4"   :show-file-list="false" :on-success="handleAvatarSuccess4" :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl4" :src="imageUrl4" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addEdit()">确 定</el-button>
            <el-button @click="dialogADDFormVisible = false">取 消</el-button>
          </div>
        </el-dialog>
      </div>
      <el-row :gutter="20" style="margin-left: 0px;margin-right: 0">
        <el-col :span="2"><div class="grid-content bg-purple">显示:</div></el-col>
        <el-col :span="4" :offset="2"><div class="grid-content bg-purple">条</div></el-col>
      </el-row>
      <el-table :data="currentPageData" border style="width: 100%;" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column label="ID" width="50px" >
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="头像" width="100px">
          <template slot-scope="scope">
            <img class="imgsize" width="40" height="40" style="border-radius:40px" :src="'/api/'+scope.row.a_imgSrc">
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="100px" >
          <template slot-scope="scope">
            <span>{{ scope.row. a_name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系电话" width="180px" >
          <template slot-scope="scope">
            <span>{{ scope.row.a_tel}}</span>
          </template>
        </el-table-column>
        <el-table-column label="加入时间" width="180px" >
          <template slot-scope="scope">
            <span>{{ scope.row. a_joinTime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="角色名" width="180px" >
          <template slot-scope="scope">
            <span>{{ scope.row. a_joinTime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="账号状态" width="100px" >
          <template slot-scope="scope">
            <span v-if="scope.row.a_useState==12" style="color:#5EB95E">{{ scope.row.or_stateName}}</span>
            <span v-else-if="scope.row.a_useState==13" style="color:#b6bec9">{{ scope.row.or_stateName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" style="text-align: center">
          <template slot-scope="scope">
            <i class="el-icon-edit" @click="handleEdit(scope.$index, scope.row)"></i>
            <el-dialog class="formDiv" title="修改框" :visible.sync="dialogFormVisible">
              <el-form :model="addRow" ref="addRow" label-width="100px" class="demo-ruleForm">
                <el-form-item label="姓名：" prop="v_price">
                  <el-input disabled id="id"></el-input>
                </el-form-item>
                <el-form-item label="联系电话：" prop="v_price">
                  <el-input id="addprice"></el-input>
                </el-form-item>
                <el-form-item label="加入时间：" prop="v_price">
                  <el-input id="date"></el-input>
                </el-form-item>
                <el-form-item label="角色名：" prop="v_price">
                  <el-input id="name"></el-input>
                </el-form-item>

                <el-form-item label="头像图片：" prop="v_imgSrc">
                  <el-upload class="avatar-uploader" action="/api/addvisaImgSrc.do" name="addimgUpload"
                             :on-change="handleChange3" :show-file-list="false" :on-success="handleAvatarSuccess3" :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl3" :src="imageUrl3" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item label="" prop="v_imgLogo">
                  <el-upload class="avatar-uploader" action="/api/addvisaImgLogo.do" name="addimgUpload"
                             :on-change="handleChange4"   :show-file-list="false" :on-success="handleAvatarSuccess4" :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl4" :src="imageUrl4" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addEdit()">确 定</el-button>
                <el-button @click="dialogADDFormVisible = false">取 消</el-button>
              </div>
            </el-dialog>
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
        userState:'',
        tableData:[],/*总数据*/
        pageNum:5,/*每页显示多少条数据*/
        pageNumArr:[5,10,15,20],/*每页显示多少条数据*/
        currentPageData:[]  /*当前页数据*/,
        currentVal:1,
        dialogFormVisible: false,
        dialogADDFormVisible: false,
        dialogImageUrl: '',
        dialogVisible: false,
        multipleSelection: [],
        editRow:{},
        addRow:{
          addcountry:[],
          addplace:[]
        },
        formInline:{
          userState:'',
        },
        /*修改框图片路劲*/
        imageUrl: '',
        imageUrl2:'',
        /*新增框图片路劲*/
        imageUrl3: '',
        imageUrl4:''
      }
    },
    methods: {
      selectUser(){
        var userState=this.formInline.userState;
       if(userState=='已启用'){
         userState=12
        }else if(userState=='未启用'){
         userState=13
        }
        this.axios.get("/api/selectState.do",{
          params:{
            userState:userState}
        })
          .then((data)=>{
          this.tableData = data.data
          for(var i=0;i<parseInt(this.pageNum) && i<this.tableData.length;i++){
            this.tableData[i]. a_joinTime=this.tableData[i]. a_joinTime.split('T')[0]
            this.currentPageData.push(this.tableData[i])
          }
        })
      },
      /*修改国家图片函数*/
      handleChange(file){
        this.imageUrl = file.url
      },
      /*修改国旗函数*/
      handleChange2(file){
        this.imageUrl2 = file.url
      },
      handleAvatarSuccess1(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      handleAvatarSuccess2(res, file) {
        this.imageUrl2 = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPEG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isGIF = file.type === 'image/gif';
        const isJPG = file.type === 'image/jpg';
        const isLt2M = file.size / 1024 / 1024 < 20;

        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 5MB!');
        }
        if (isJPG) {
          console.log('jpg')
//          this.$message.error('上传头像图片只能是 JPG 格式!');
          return (isJPG && isLt2M)
        }else if(isGIF){
          console.log('gif')
//          this.$message.error('上传头像图片只能是 GIF 格式!');
          return (isGIF && isLt2M)
        }else if(isJPEG){
          console.log('jpeg')
//          this.$message.error('上传头像图片只能是 JPEG 格式!');
          return (isJPEG && isLt2M)
        }else if(isPNG){
          console.log('png')
          return (isPNG && isLt2M)
//          this.$message.error('上传头像图片只能是 PNG 格式!');
        }else{
          this.$message.error('上传头像图片格式有误!');
        }
      },
      handleEdit(index, row) {
        this.dialogFormVisible=true
        this.editRow = row;
        this.imageUrl = "/api/"+row.v_imgSrc
        this.imageUrl2 ="/api/"+row.v_imgLogo
      },
      /*提交修改函数*/
      alterEdit(index, row){
        this.axios.post('/api/visaAlter.do',{
          visaCountry:this.editRow.c_countryname,
          visaPrice:this.editRow.v_price,
          visaPlace:this.editRow.vp_place,
          visaStart:this.editRow.v_starttime,
          visaStop:this.editRow.v_stoptime,
          visaHand:this.editRow.v_handling,
          visaId:this.editRow.id,
        }).then((data)=>{
//          console.log(row.id)
        })
        this.dialogFormVisible = false
      },

      /*新增函数*/
      handleChange3(file){
        this.imageUrl3 = file.url
      },
      handleChange4(file){
        this.imageUrl4 = file.url
      },
      handleAvatarSuccess3(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      handleAvatarSuccess4(res, file) {
        this.imageUrl2 = URL.createObjectURL(file.raw);
      },
      addEdit(){
        var addcountry = document.getElementById('addcountry').value
        var addprice = document.getElementById('addprice').value
        var addplace = document.getElementById('addplace').value
        var addstart = document.getElementById('addstart').value
        var addstop = document.getElementById('addstop').value
        var addhand = document.getElementById('addhand').value
        this.axios.post('/api/visaAdd.do',{
          addcountry:addcountry,
          addprice:addprice,
          addplace:addplace,
          addstart:addstart,
          addstop:addstop,
          addhand:addhand,
        }).then((data)=>{
          console.log(data)
        })
        this.dialogADDFormVisible = false
      },
      handleDelete(index, row) {
        this.axios.post('/api/visaDel.do',{
          visaId:row.id
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
//        console.log(_this.currentPageData[i].id==mulp[i].id)  // 当前页的所有数据
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
        this.axios.post('/api/visaDelALL.do',{
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
      this.axios.get("/api/adminManage.do").then((data)=>{
        this.tableData = data.data
        for(var i=0;i<parseInt(this.pageNum) && i<this.tableData.length;i++){
          this.tableData[i]. a_joinTime=this.tableData[i]. a_joinTime.split('T')[0]
          this.currentPageData.push(this.tableData[i])
        }
      })
    }
  }
</script>

<style>
  @import "../assets/table.css";
  .el-select{
    position: absolute;
    top: 210px;
    left: 280px;
    width: 150px !important;
    height: 40px;
  }
  .el-pagination__total{
    position: absolute;
    top: 215px;
    right: 50px;
  }
</style>

