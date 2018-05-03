<template>
  <div>
    <div id='maxdiv'>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="签证国家" prop="c_countryname">
          <el-select v-model="formInline.country.c_countryname" placeholder="请选择国家" id="queryCountry">
            <el-option v-for="key in formInline.country" label="" :value="key.c_countryname" :key="key.countryname"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="送签地" prop="vp_place">
          <el-select v-model="formInline.place.vp_place" placeholder="请选择送签地" id="queryPlace">
            <el-option v-for="key in formInline.place" label="" :value="key.vp_place" :key="key.vp_place"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit"><i class="el-icon-search"></i>查询</el-button>
        </el-form-item>
      </el-form>
      <div class="btnDiv">
        <el-button type="danger" @click="centerDialogVisible=true"><i class="el-icon-delete"></i>批量删除</el-button>
        <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
          <span>需要注意的是内容是默认不居中的</span>
          <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteAll" >确 定</el-button>
          </span>
        </el-dialog>
        <el-button type="primary" @click="dialogADDFormVisible=true"><i class="el-icon-plus"></i>新增</el-button>
        <el-dialog class="formDiv1" title="新增框" :visible.sync="dialogADDFormVisible">
          <el-form :model="addRow" ref="addRow" label-width="100px" class="demo-ruleForm">
              <el-form-item label="签证国家" prop="c_countryname">
                <el-select v-model="addRow.addcountry.c_countryname" placeholder="请选择国家">
                  <el-option v-for="(arr,index) in addRow.addcountry" label="" :value="arr.c_countryname" :key="index"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="价格：" prop="v_price">
                <el-input v-model="addRow.v_price"></el-input>
              </el-form-item>
              <el-form-item label="送签地" prop="vp_place" >
                <el-select v-model="addRow.addplace.vp_place" placeholder="请选择送签地">
                  <el-option v-for="(arr,index) in addRow.addplace" label="" :value="arr.vp_place" :key="index"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="有效时间：" prop="v_starttime" >
                <el-select v-model="addRow.v_starttime" placeholder="请选择有效时间">
                  <el-option value="1"></el-option>
                  <el-option value="2"></el-option>
                  <el-option value="3"></el-option>
                  <el-option value="4"></el-option>
                  <el-option value="5"></el-option>
                  <el-option value="6"></el-option>
                  <el-option value="7"></el-option>
                  <el-option value="8"></el-option>
                  <el-option value="9"></el-option>
                  <el-option value="10"></el-option>
                  <el-option value="11"></el-option>
                  <el-option value="12"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="停留时间：" prop="v_stoptime" >
                <el-select v-model="addRow.v_stoptime" placeholder="请选择停留时间">
                  <el-option value="1"></el-option>
                  <el-option value="2"></el-option>
                  <el-option value="3"></el-option>
                  <el-option value="4"></el-option>
                  <el-option value="5"></el-option>
                  <el-option value="6"></el-option>
                  <el-option value="7"></el-option>
                  <el-option value="8"></el-option>
                  <el-option value="9"></el-option>
                  <el-option value="10"></el-option>
                  <el-option value="11"></el-option>
                  <el-option value="12"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="办理时长：" prop="v_handling" >
                <el-select v-model="addRow.v_handling" placeholder="请选择办理时长">
                  <el-option value="1"></el-option>
                  <el-option value="2"></el-option>
                  <el-option value="3"></el-option>
                  <el-option value="4"></el-option>
                  <el-option value="5"></el-option>
                  <el-option value="6"></el-option>
                  <el-option value="7"></el-option>
                  <el-option value="8"></el-option>
                  <el-option value="9"></el-option>
                  <el-option value="10"></el-option>
                  <el-option value="11"></el-option>
                  <el-option value="12"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="国家图片：" prop="v_imgSrc">
                <el-upload class="avatar-uploader" action="/api/addvisaImgSrc.do" name="addimgUpload"
                           :on-change="handleChange3" :show-file-list="false" :on-success="handleAvatarSuccess3" :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl3" :src="imageUrl3" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="国旗：" prop="v_imgLogo">
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
        <el-table-column label="ID" width="80px" >
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="签证国家" width="110px">
          <template slot-scope="scope">
            <span>{{ scope.row.c_countryname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="价格" width="110px">
          <template slot-scope="scope">
            <span>{{ scope.row.v_price }}</span>
          </template>
        </el-table-column>
        <el-table-column label="送签地" width="110px">
          <template slot-scope="scope">
            <span>{{ scope.row.vp_place }}</span>
          </template>
        </el-table-column>
        <el-table-column label="国旗" width="130px">
          <template slot-scope="scope">
              <img class="imgsize" :src="'/api/'+scope.row.v_imgLogo" width="60px" height="35px">
          </template>
        </el-table-column>
        <el-table-column label="有效时间" width="110px">
          <template slot-scope="scope">
            <span>{{ scope.row.v_starttime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="停留时间" width="110px">
          <template slot-scope="scope">
            <span>{{ scope.row.v_stoptime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="办理时长" width="110px">
          <template slot-scope="scope">
            <span>{{ scope.row.v_handling }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" style="text-align: center">
          <template slot-scope="scope">
            <i class="el-icon-edit" @click="handleEdit(scope.$index, scope.row)"></i>
            <el-dialog class="formDiv" title="修改框" :visible.sync="dialogFormVisible">
              <el-form :model="editRow" ref="editRow" label-width="100px" class="demo-ruleForm">
                <el-form-item label="ID：" prop="id">
                  <el-input disabled v-model="editRow.id"></el-input>
                </el-form-item>
                <el-form-item label="签证国家：" prop="c_countryname">
                  <el-input disabled v-model="editRow.c_countryname"></el-input>
                </el-form-item>
                <el-form-item label="价格：" prop="v_price">
                  <el-input v-model="editRow.v_price"></el-input>
                </el-form-item>
                <el-form-item label="送签地：" prop="vp_place">
                    <el-select v-model="editRow.vp_place" placeholder="请选择送签地">
                      <el-option v-for="key in formInline.place" label="" :value="key.vp_place" :key="key.vp_place"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="有效时间：" prop="v_starttime">
                  <el-select v-model="editRow.v_starttime" placeholder="请选择有效时间">
                    <el-option value="1"></el-option>
                    <el-option value="2"></el-option>
                    <el-option value="3"></el-option>
                    <el-option value="4"></el-option>
                    <el-option value="5"></el-option>
                    <el-option value="6"></el-option>
                    <el-option value="7"></el-option>
                    <el-option value="8"></el-option>
                    <el-option value="9"></el-option>
                    <el-option value="10"></el-option>
                    <el-option value="11"></el-option>
                    <el-option value="12"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="停留时间：" prop="v_stoptime">
                  <el-select v-model="editRow.v_stoptime" placeholder="请选择活停留时间">
                    <el-option value="1"></el-option>
                    <el-option value="2"></el-option>
                    <el-option value="3"></el-option>
                    <el-option value="4"></el-option>
                    <el-option value="5"></el-option>
                    <el-option value="6"></el-option>
                    <el-option value="7"></el-option>
                    <el-option value="8"></el-option>
                    <el-option value="9"></el-option>
                    <el-option value="10"></el-option>
                    <el-option value="11"></el-option>
                    <el-option value="12"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="办理时长：" prop="v_handling">
                  <el-select v-model="editRow.v_handling" placeholder="请选择办理时长">
                    <el-option value="1"></el-option>
                    <el-option value="2"></el-option>
                    <el-option value="3"></el-option>
                    <el-option value="4"></el-option>
                    <el-option value="5"></el-option>
                    <el-option value="6"></el-option>
                    <el-option value="7"></el-option>
                    <el-option value="8"></el-option>
                    <el-option value="9"></el-option>
                    <el-option value="10"></el-option>
                    <el-option value="11"></el-option>
                    <el-option value="12"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="办理时长：" prop="v_handling" style="visibility: hidden"></el-form-item>
                <el-form-item label="国家图片：" prop="v_imgSrc">
                  <el-upload class="avatar-uploader" action="/api/visaImgSrc.do" name="imgUpload"
                             :on-change="handleChange" :show-file-list="false" :on-success="handleAvatarSuccess1" :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item label="国旗：" prop="v_imgLogo">
                  <el-upload class="avatar-uploader" action="/api/visaImgLogo.do" name="imgUpload"
                      :on-change="handleChange2"   :show-file-list="false" :on-success="handleAvatarSuccess2" :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="alterEdit(scope.$index, scope.row)">确 定</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
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
        tableData:[],/*总数据*/
        pageNum:5,/*每页显示多少条数据*/
        pageNumArr:[5,10,15,20],/*每页显示多少条数据*/
        currentPageData:[]  /*当前页数据*/,
        currentVal:1,
        dialogFormVisible: false,
        dialogADDFormVisible: false,
        centerDialogVisible:false,
        dialogImageUrl: '',
        dialogVisible: false,
        multipleSelection: [],
        editRow:{},
        addRow:{
          addcountry:[],
          addplace:[],
          v_price:"",
          v_starttime:"",
          v_stoptime:"",
          v_handling:"",
        },
        formInline:{
          country:[],
          place:[]
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
        var addcountry=this.addRow.addcountry.c_countryname
        var addprice=this.addRow.v_price
        var addplace=this.addRow.addplace.vp_place
        var addstart=this.addRow.v_starttime
        var addstop=this.addRow.v_stoptime
        var addhand=this.addRow.v_handling
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
        this.addRow.addcountry.c_countryname=""
        this.addRow.v_price=""
        this.addRow.addplace.vp_place=""
        this.addRow.v_starttime=""
        this.addRow.v_stoptime=""
        this.addRow.v_handling=""
        this.imageUrl3 = ""
        this.imageUrl4 =""
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
       this.centerDialogVisible=false
      },
      /*查询*/
      onSubmit() {
        var queryCountry =this.formInline.country.c_countryname;
        var queryPlace =this.formInline.place.vp_place;
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
        this.formInline.country.c_countryname=""
        this.formInline.place.vp_place=""

      },
    },
    created(){
      this.axios.get("/api/visaQuery.do").then((data)=>{
        this.tableData = data.data[0]
        for(let i=0;i<data.data[1].length;i++){
          this.formInline.country[i] = data.data[1][i]
          this.addRow.addcountry[i]= data.data[1][i]
        }
        for(let j=0;j<data.data[2].length;j++){
          this.formInline.place[j] = data.data[2][j]
          this.addRow.addplace[j]= data.data[2][j]
        }
        for(var i=0;i<parseInt(this.pageNum) && i<this.tableData.length;i++){
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
    top: 210px;
    right: 50px;
  }
</style>
