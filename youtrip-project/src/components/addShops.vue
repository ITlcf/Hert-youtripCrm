<template>
  <div>
    <div style="width:90%">
      <el-form  :model="addRow"  ref="addRow" label-width="150px" class="demo-ruleForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <div class="grid-content bg-purple-light">
              <el-form-item label="套餐名：" style="width:100%" prop="s_name">
                <el-input v-model="addRow.s_name"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="8" :sm="8" :md="8" :lg="8">
            <div class="grid-content bg-purple">
              <el-form-item label="出发地：" style="width:100%" prop="s_go">
                <el-input v-model="addRow.s_go"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8">
            <div class="grid-content bg-purple">
              <el-form-item label="目的地：" style="width:100%" prop="s_destination">
                <el-input v-model="addRow.s_destination"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8">
            <div class="grid-content bg-purple">
              <el-form-item label="成团人数：" style="width:100%" prop="s_teamNumber">
                <el-input v-model="addRow.s_teamNumber"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="8" :sm="8" :md="8" :lg="8">
            <div class="grid-content bg-purple">
              <el-form-item label="价格：" style="width:100%" prop="s_price">
                <el-input v-model="addRow.s_price"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8">
            <div class="grid-content bg-purple">
              <el-form-item label="天数：" style="width:100%" prop="">
                <el-input v-model="addRow.s_day"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8">
            <div class="grid-content bg-purple">
              <el-form-item label="国家：" style="width:100%" prop="c_countryname">
                <el-select v-model="addRow.addcountry.c_countryname">
                  <el-option v-for="(key,index) in addRow.addcountry" label="" :value="key.c_countryname" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="8" :sm="8" :md="8" :lg="8">
            <div class="grid-content bg-purple">
              <el-form-item label="设计师：" style="width:100%" prop="d_name">
                <el-select v-model="addRow.addesignerid.d_name">
                  <el-option v-for="(key,index) in addRow.addesignerid" label="" :value="key.d_name" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8">
            <div class="grid-content bg-purple">
              <el-form-item label="是否上架：" style="width:100%" prop="or_stateName">
                <el-select v-model="addRow.addstateName.or_stateName">
                  <el-option v-for="(key,index) in addRow.addstateName" label="" :value="key.or_stateName" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8">
            <div class="grid-content bg-purple">
              <el-form-item label="是否热门：" style="width:100%" prop="h_hotName">
                <el-select v-model="addRow.addhotName.h_hotName">
                  <el-option v-for="(key,index) in addRow.addhotName" label="" :value="key.h_hotName" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <el-form-item label="经纬度：" style="width:100%" prop="s_jing">
              <el-input v-model="addRow.s_jing"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <el-form-item label="季节描述：" style="width:100%" prop="s_seasonsay">
              <el-input type="textarea" v-model="addRow.s_seasonsay"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <el-form-item label="商品描述：" style="width:100%" prop="s_productdec">
              <el-input type="textarea" v-model="addRow.s_productdec"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" >
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <el-form-item label="产品关键字：" style="width:100%" prop="s_shopkey">
              <el-input type="textarea" v-model="addRow.s_shopkey"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" >
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <el-form-item label="国家图片：" prop="si_imgSrc">
              <el-upload class="avatar-uploader" action="/api/shopImgSrc.do" name="shopUpload"
                         :on-change="handleChange" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
<!---------------------下拉选择天数----------------------->
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <router-link to="/orderManage">
      <el-button type="primary" @click="addEdit">确 定</el-button>
      </router-link>
      <router-link to="/orderManage">
      <el-button @click="dialogADDFormVisible = false">取 消</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        addRow:{
          s_name:"",
          addcountry:[],
          addstateName:[],
          addesignerid:[],
          addhotName:[],
          s_go:"",
          s_destination:"",
          s_teamNumber:"",
          s_price:"",
          s_day:"",
          s_jing:"",
          s_seasonsay:"",
          s_productdec:"",
          s_shopkey:"",
          dialogADDFormVisible:false,
        },
        imageUrl:''
      }
    },
    methods:{
      /*修改国旗函数*/
      handleChange(file){
        this.imageUrl = file.url
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
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
//-----------------------增加商品-------------------
      addEdit(){
          var sname=this.addRow.s_name
          var countryname=this.addRow.addcountry.c_countryname
          var stateName=this.addRow.addstateName.or_stateName
          var designerid=this.addRow.addesignerid.d_name
          var hotName=this.addRow.addhotName.h_hotName
          var sgo=this.addRow.s_go
          var destination=this.addRow.s_destination
          var teamNumber=this.addRow.s_teamNumber
          var price=this.addRow.s_price
          var day=this.addRow.s_day
          var jing=this.addRow.s_jing
          var seasonsay=this.addRow.s_seasonsay
          var productdec=this.addRow.s_productdec
          var shopkey=this.addRow.s_shopkey
          this.axios.post('/api/addOrderManage.do',{
            day:day,
            sname:sname,
            countryname:countryname,
            stateName:stateName,
            designerid:designerid,
            hotName:hotName,
            sgo:sgo,
            destination:destination,
            teamNumber:teamNumber,
            price:price,
            jing:jing,
            seasonsay:seasonsay,
            productdec:productdec,
            shopkey:shopkey,
          }).then((data)=>{
            console.log(data)
          })
          this.dialogADDFormVisible = false
      },
    },
    created(){
      this.axios.get("/api/orderSelect.do").then((data)=>{
        this.addRow.addcountry=data.data[0]
        this.addRow.addesignerid=data.data[1]
        this.addRow.addstateName=data.data[2]
        this.addRow.addhotName=data.data[3]
      })
    }
  }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 2px dashed #d9d9d9 !important;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF !important;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d !important;
    width: 178px;
    height: 160px;
    font-weight: 400;
    line-height: 160px;
    text-align: center;
  }
  .avatar {
    width: 778px;
    height: 350px;
    display: block;
  }
</style>

