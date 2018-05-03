<template>
  <div>
    <div style="width:90%">
      <el-form  :model="msgRow"  ref="msgRow" label-width="150px" class="demo-ruleForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <div class="grid-content bg-purple-light">
              <el-form-item label="套餐名：" style="width:100%" prop="s_name">
                <el-input v-model="msgRow.s_name"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="8" :sm="8" :md="8" :lg="8">
            <div class="grid-content bg-purple">
              <el-form-item label="出发地：" style="width:100%" prop="s_go">
                <el-input v-model="msgRow.s_go"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8">
            <div class="grid-content bg-purple">
              <el-form-item label="目的地：" style="width:100%" prop="s_destination">
                <el-input v-model="msgRow.s_destination"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8">
            <div class="grid-content bg-purple">
              <el-form-item label="成团人数：" style="width:100%" prop="s_teamNumber">
                <el-input v-model="msgRow.s_teamNumber"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="8" :sm="8" :md="8" :lg="8">
            <div class="grid-content bg-purple">
              <el-form-item label="价格：" style="width:100%" prop="s_price">
                <el-input v-model="msgRow.s_price"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8">
            <div class="grid-content bg-purple">
              <el-form-item label="天数：" style="width:100%" prop="">
                <el-input v-model="msgRow.s_day"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8">
            <div class="grid-content bg-purple">
              <el-form-item label="国家：" style="width:100%" prop="c_countryname">
                <el-select v-model="msgRow.addcountry.c_countryname">
                  <el-option v-for="(key,index) in msgRow.addcountry" label="" :value="key.c_countryname" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="8" :sm="8" :md="8" :lg="8">
            <div class="grid-content bg-purple">
              <el-form-item label="设计师：" style="width:100%" prop="d_name">
                <el-select v-model="msgRow.addesignerid.d_name">
                  <el-option v-for="(key,index) in msgRow.addesignerid" label="" :value="key.d_name" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8">
            <div class="grid-content bg-purple">
              <el-form-item label="是否上架：" style="width:100%" prop="or_stateName">
                <el-select v-model="msgRow.addstateName.or_stateName">
                  <el-option v-for="(key,index) in msgRow.addstateName" label="" :value="key.or_stateName" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8">
            <div class="grid-content bg-purple">
              <el-form-item label="是否热门：" style="width:100%" prop="h_hotName">
                <el-select v-model="msgRow.addhotName.h_hotName">
                  <el-option v-for="(key,index) in msgRow.addhotName" label="" :value="key.h_hotName" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <el-form-item label="经纬度：" style="width:100%" prop="s_jing">
              <el-input v-model="msgRow.s_jing"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <el-form-item label="季节描述：" style="width:100%" prop="s_seasonsay">
              <el-input type="textarea" v-model="msgRow.s_seasonsay"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <el-form-item label="商品描述：" style="width:100%" prop="s_productdec">
              <el-input type="textarea" v-model="msgRow.s_productdec"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" >
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <el-form-item label="产品关键字：" style="width:100%" prop="s_shopkey">
              <el-input type="textarea" v-model="msgRow.s_shopkey"></el-input>
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
        <el-button type="primary" @click="alterEdit">确 定</el-button>
      </router-link>
      <router-link to="/orderManage">
        <el-button>取 消</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msgRow:{
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
      /*修改商品*/
      alterEdit(){
        var sname=this.msgRow.s_name
        var countryname=this.msgRow.addcountry.c_countryname
        var stateName=this.msgRow.addstateName.or_stateName
        var designerid=this.msgRow.addesignerid.d_name
        var hotName=this.msgRow.addhotName.h_hotName
        var sgo=this.msgRow.s_go
        var destination=this.msgRow.s_destination
        var teamNumber=this.msgRow.s_teamNumber
        var price=this.msgRow.s_price
        var day=this.msgRow.s_day
        var jing=this.msgRow.s_jing
        var seasonsay=this.msgRow.s_seasonsay
        var productdec=this.msgRow.s_productdec
        var shopkey=this.msgRow.s_shopkey
        this.axios.post('/api/alterOrderManage.do',{
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
      },

    },
    created(){
      this.axios.get("/api/orderSelect.do").then((data)=>{
        this.msgRow.addcountry=data.data[0]
        this.msgRow.addesignerid=data.data[1]
        this.msgRow.addstateName=data.data[2]
        this.msgRow.addhotName=data.data[3]
      })
      // 取到路由带过来的参数
      var lineData=this.$router.history.current.params.dataObj
      // 将数据放在当前组件的数据内
      this.msgRow = lineData
//      this.msgRow.addcountry.c_countryname=lineData.c_countryname
//      this.msgRow.addstateName.or_stateName=lineData.or_stateName
//      this.msgRow.addesignerid.d_name=lineData.d_name
//      this.msgRow.addhotName.h_hotName=lineData.h_hotName

      console.log(this.msgRow)
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


