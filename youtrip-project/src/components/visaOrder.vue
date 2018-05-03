<template>
  <div>
    <div id='maxdiv'>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="联系人：" prop="vr_name">
          <el-input v-model="formInline.vr_name"></el-input>
        </el-form-item>
        <el-form-item label="签证国家" prop="c_countryname">
          <el-select v-model="formInline.country.c_countryname" placeholder="请选择国家" id="queryCountry">
            <el-option v-for="key in formInline.country" label="" :value="key.c_countryname" :key="key.c_countryname"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单编号" prop="orderNum">
          <el-select v-model="formInline.orderNum.vr_num" placeholder="请选择订单编号" id="queryNum">
            <el-option v-for="key in formInline.orderNum" label="" :value="key.vr_num" :key="key.vr_num"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryOrder"><i class="el-icon-search"></i>查询</el-button>
        </el-form-item>
      </el-form>
      <div class="btnDiv">
        <el-button type="danger" @click="centerDialogVisible = true"><i class="el-icon-delete"></i>批量删除</el-button>
        <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
          <span>需要注意的是内容是默认不居中的</span>
          <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteOrderAll" >确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <el-row :gutter="20" style="margin-left: 0px;margin-right: 0">
        <el-col :span="2"><div class="grid-content bg-purple">显示:</div></el-col>
        <el-col :span="4" :offset="2"><div class="grid-content bg-purple">条</div></el-col>
      </el-row>
      <el-table :data="currentPageData" border style="width: 100%;" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column label="ID" width="50px">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单编号" width="90px" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.vr_num }}</span>
          </template>
        </el-table-column>
        <el-table-column label="签证国家" width="80px">
          <template slot-scope="scope">
            <span>{{ scope.row.c_countryname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="价格" width="80px">
          <template slot-scope="scope">
            <span>{{ scope.row.vr_sumprice }}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系人" width="90px">
          <template slot-scope="scope">
            <span>{{ scope.row.vr_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系电话" width="120px">
          <template slot-scope="scope">
            <span>{{scope.row.vr_tel}}</span>
          </template>
        </el-table-column>
        <el-table-column label="出发时间" width="100px">
          <template slot-scope="scope">
            <span>{{ scope.row.vr_goDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="收货地址" width="80px" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.vr_streetaddress }}</span>
          </template>
        </el-table-column>
        <el-table-column label="下单时间" width="100px">
          <template slot-scope="scope">
            <span>{{ scope.row.vr_orderDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="出游人数" width="90px">
          <template slot-scope="scope">
            <span>{{ scope.row.vr_count }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单状态" width="90px">
          <template slot-scope="scope">
            <span>{{ scope.row.or_stateName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" style="text-align: center">
          <template slot-scope="scope">
            <i class="el-icon-edit" @click="orderEdit(scope.$index, scope.row)"></i>
            <el-dialog class="formDiv" title="修改框" :visible.sync="dialogFormVisible">
              <el-form :model="editRow" ref="editRow" label-width="100px" class="demo-ruleForm">
                <el-form-item label="ID：" prop="id">
                  <el-input disabled v-model="editRow.id"></el-input>
                </el-form-item>
                <el-form-item label="订单编号：" prop="vr_num">
                  <el-input disabled v-model="editRow.vr_num"></el-input>
                </el-form-item>
                <el-form-item label="签证国家：" prop="c_countryname">
                  <el-input disabled v-model="editRow.c_countryname"></el-input>
                </el-form-item>
                <el-form-item label="下单时间：" prop="vr_orderDate">
                  <el-input disabled v-model="editRow.vr_orderDate"></el-input>
                </el-form-item>
                <el-form-item label="联系人：" prop="vr_name">
                  <el-input v-model="editRow.vr_name"></el-input>
                </el-form-item>
                <el-form-item label="邮箱：" prop="vr_mail">
                  <el-input v-model="editRow.vr_mail"></el-input>
                </el-form-item>
                <el-form-item label="联系电话：" prop="vr_tel">
                  <el-input v-model="editRow.vr_tel"></el-input>
                </el-form-item>
                <el-form-item label="出发日期：" prop="vr_goDate">
                  <el-date-picker v-model="editRow.vr_goDate" value-format="yyyy-MM-dd" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
                </el-form-item>
                <el-form-item label="省份：" prop="vr_provinces">
                  <el-select v-model="editRow.vr_provinces" placeholder="请输入省份" @change="queryProvinces">
                    <el-option v-for="(key,index) in provinceRow" label="" :value="key.p_name" :key="index"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="市：" prop="vr_city">
                  <el-select v-model="editRow.vr_city" placeholder="请输入市" @change="queryTown">
                    <el-option v-for="(key,index) in cityRow" label="" :value="key.c_name" :key="index"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="区/县：" prop="vr_area">
                  <el-select v-model="editRow.vr_area" placeholder="请输入区/县">
                    <el-option v-for="(key,index) in townRow" label="" :value="key.t_name" :key="index"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="详细地址：" prop="vr_streetaddress">
                  <el-input v-model="editRow.vr_streetaddress"></el-input>
                </el-form-item>

                <el-form-item :label="lableNum+(index+1)" prop="editRow" v-for="(key,index) in excursionRow" :key="index">
                  <el-input v-model="excursionRow[index].e_name" placeholder="请输入姓名"></el-input>
                  <el-select class="excursion" v-model="excursionRow[index].e_typename" placeholder="请选择类型">
                    <el-option value="在职人员"></el-option>
                    <el-option value="自由职业者"></el-option>
                    <el-option value="退休人员"></el-option>
                    <el-option value="在校学生"></el-option>
                    <el-option value="学龄前儿童"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="alterEdit">确 定</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
              </div>
            </el-dialog>
            <i class="el-icon-delete" @click="orderDelete(scope.$index, scope.row)"></i>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="pageSizeChange" @current-change="changeNum" :current-page='currentVal ' :page-sizes='pageNumArr' :page-size='pageNum' background layout="sizes,total, prev, pager, next, jumper" :total="tableData.length" ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
//  import ElInput from "../../node_modules/element-ui/packages/input/src/input.vue";
export default {
//  components: {ElInput},
  data() {
      return {
        tableData: [], /*总数据*/
        pageNum: 5, /*每页显示多少条数据*/
        pageNumArr: [5, 10, 15, 20], /*每页显示多少条数据*/
        currentPageData: []  /*当前页数据*/,
        currentVal: 1,
        centerDialogVisible: false,
        dialogFormVisible: false,
        dialogADDFormVisible: false,
        dialogImageUrl: '',
        dialogVisible: false,
        multipleSelection: [],
        editRow: [],/*push修改数据*/
        excursionRow: [],/*出游人数据*/
        provinceRow:[],/*省*/
        cityRow:[],/*市*/
        townRow: [],/*县*/
        formInline: {
          orderNum: [],
          country: [],
          vr_name: ''
        },
        lableNum:'出游人',

        /*日期*/
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value1: '',
        value2: '',
      }
    },
    methods: {
      /*修改函数*/
      orderEdit(index, row) {
        this.dialogFormVisible=true
        this.editRow = row;
        this.axios.get("/api/queryVisaexcursion.do",{
          params:{
            queryid:this.editRow.id,
          }
        }).then((data)=>{
          console.log(data)
          this.excursionRow = data.data
        })
      },
      /*提交修改函数*/
      alterEdit(){
        var orderName = this.editRow.vr_name;
        var orderMail = this.editRow.vr_mail;
        var telName = this.editRow.vr_tel;
        var goDateName = this.editRow.vr_goDate;
        var provincesName = this.editRow.vr_provinces;
        var cityName = this.editRow.vr_city;
        var areaName = this.editRow.vr_area;
        var streetName = this.editRow.vr_streetaddress;

        this.axios.post('/api/visaOrderAlter.do',{
          orderName:orderName,
          orderMail:orderMail,
          telName:telName,
          goDateName:goDateName,
          provincesName:provincesName,
          cityName:cityName,
          areaName:areaName,
          streetName:streetName,
          orderId:this.editRow.id,
        }).then((data)=>{
          console.log(data)
        })
        this.alterEdit2()
        this.dialogFormVisible = false
      },
      alterEdit2(){
        var excursionRow = this.excursionRow;
        for(let i=0;i<excursionRow.length;i++){
            this.axios.post('/api/visaExcursionAlter.do',{
              eName:excursionRow[i].e_name,
              typeName:excursionRow[i].e_typename,
              orderId:excursionRow[i].id,
            }).then((data)=>{
              console.log(data)
            })
        }
      },

      /*删除单条数据*/
      orderDelete(index, row) {
        this.axios.post('/api/visaOrderDel.do',{
          orderId:row.id
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
      /*批量删除*/
      deleteOrderAll(){
        var _this = this
        var oridArr=[]
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
          oridArr.push(mulp[j].id)
        }
        this.axios.post('/api/visaOrderDelALL.do',{
          oridArr:oridArr
        }).then((data)=>{
          console.log(data)
        })
        centerDialogVisible = false
      },
      /*查询*/
      queryOrder() {
        var queryCountry =this.formInline.country.c_countryname;
        var queryNum =this.formInline.orderNum.vr_num;
        var queryContact =this.formInline.vr_name;
        this.axios.get("/api/visaOrderQuery.do",{
          params:{
            queryContact:queryContact,
            queryCountry:queryCountry,
            queryNum:queryNum
          }
        }).then((data)=>{
          this.currentPageData=[]
          this.tableData = data.data[0]
          for(var i=0;i<parseInt(this.pageNum) && i<this.tableData.length;i++){
            this.currentPageData.push(this.tableData[i])
            this.tableData[i].vr_orderDate=this.tableData[i].vr_orderDate.split('T')[0]
            this.tableData[i].vr_goDate=this.tableData[i].vr_goDate.split('T')[0]
          }
        })
      },
      pageSizeChange(val) {
        this.currentPageData=[]
        this.pageNum = val
        for(var i=0;i<parseInt(this.pageNum) && i<this.tableData.length;i++){
          this.currentPageData.push(this.tableData[i])
        }
      },
      changeNum(val){  /*当前点击的是那一页*/
        this.currentPageData=[]
        this.currentVal=val
        for(var i=(val-1)*parseInt(this.pageNum);i<val*parseInt(this.pageNum);i++){
          if(i<this.tableData.length){
            this.currentPageData.push(this.tableData[i])
            this.tableData[i].vr_orderDate=this.tableData[i].vr_orderDate.split('T')[0]
            this.tableData[i].vr_goDate=this.tableData[i].vr_goDate.split('T')[0]
          }
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      /*地址查询：市*/
      queryProvinces() {
        var provinceSel =this.editRow.vr_provinces;
        console.log(provinceSel)
        this.cityRow=''
        this.editRow.vr_city=''
        this.editRow.vr_area=''
        this.axios.get("/api/queryAddress.do",{
          params:{
            provinceSel:provinceSel,
          }
        }).then((data)=>{
          this.cityRow=data.data[0]
          console.log("dddd",this.cityRow)
        })
      },
      /*查询县*/
      queryTown() {
        var provinceSel =this.editRow.vr_provinces;
        var citySel =this.editRow.vr_city;
        this.townRow=''
        this.editRow.vr_area=''
        this.axios.get("/api/queryAddress.do",{
          params:{
            provinceSel:provinceSel,
            citySel:citySel,
          }
        }).then((data)=>{
          this.townRow=data.data[1]
        })
      },

    },
    created(){
      this.axios.get("/api/visaOrderQuery.do").then((data)=>{
        this.tableData = data.data[0]
        this.formInline.country =data.data[1]
        this.formInline.orderNum = data.data[0]
        this.provinceRow=data.data[2]
        for(var i=0;i<this.tableData.length;i++){
          this.tableData[i].vr_orderDate=this.tableData[i].vr_orderDate.split('T')[0]
          this.tableData[i].vr_goDate=this.tableData[i].vr_goDate.split('T')[0]
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
  .btnDiv {
    padding: 0;
    width: 130px;
    height: 40px;
    margin-top: 2.5%;
  }
  form .el-form-item{
    float: left;
    margin-left: 1%;
  }
  form .el-form-item:first-child{
    margin-left: 7%;
  }
  /*修改日期样式*/
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 184px;
  }
  .el-picker-panel [slot=sidebar], .el-picker-panel__sidebar{
    width: 60px;
    padding-top: 10px;
  }
  .el-picker-panel__body-wrapper{
    height: 320px;
    width: 350px;
  }
  .el-picker-panel [slot=sidebar]+.el-picker-panel__body, .el-picker-panel__sidebar+.el-picker-panel__body{
    margin-left: 60px;
  }
  .el-picker-panel__content{
    height: 280px;
    width: 220px;
  }
  .el-date-picker.has-sidebar{
    width: 350px;
  }
  .el-date-picker table{
    width: 90%;
  }
  .el-picker-panel__body .el-picker-panel__content table tbody tr{
    height: 30px !important;
    line-height: 30px !important;
  }
  .excursion{
    margin-top: 5%;
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
