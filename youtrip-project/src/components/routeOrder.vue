<template>
  <div id="maxDiv">
    <el-form :inline="true" :model="formInline" id="myfrom" class="demo-form-inline">
      <el-form-item label="状态" prop="orderstate">
        <el-select  v-model="formInline.orderstate" placeholder="请选择订单状态">
          <el-option label="全部" value="0"></el-option>
          <el-option label="审核中" value="1"></el-option>
          <el-option label="未支付" value="2"></el-option>
          <el-option label="待出行" value="3"></el-option>
          <el-option label="已出行" value="4"></el-option>
          <el-option label="退款中" value="5"></el-option>
          <el-option label="已退款" value="6"></el-option>
          <el-option label="已取消" value="7"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSelectOrder"><i class="el-icon-search"></i>查询</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="20" style="margin-left: 0px;margin-right: 0">
      <el-col :span="2"><div class="grid-content bg-purple">显示:</div></el-col>
      <el-col :span="4" :offset="2"><div class="grid-content bg-purple">条</div></el-col>
    </el-row>

    <el-table :data="currentPageData" border style="width: 100%;" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column label="订单编号" width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.or_num}}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" width="300px" height="50px" :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.s_name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.t_name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="下单日期" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.or_orderDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="出行日期" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.or_startDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" width="100px">
        <template slot-scope="scope">
          <span v-if="scope.row.or_state==1" class="shengHe">{{ scope.row.or_stateName}}</span>
          <span v-else-if="scope.row.or_state==2" class="weiZhiFu">{{ scope.row.or_stateName}}</span>
          <span v-else-if="scope.row.or_state==3" class="daiChuXing">{{ scope.row.or_stateName}}</span>
          <span v-else-if="scope.row.or_state==4" class="yiChuXing">{{ scope.row.or_stateName}}</span>
          <span v-else-if="scope.row.or_state==5" class="tuiKuanZhong">{{ scope.row.or_stateName}}</span>
          <span v-else-if="scope.row.or_state==6" class="yiTuiKuan">{{ scope.row.or_stateName}}</span>
          <span v-else-if="scope.row.or_state==7" class="yiQuXiao">{{ scope.row.or_stateName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" style="text-align: center">
        <template slot-scope="scope">
          <i class="el-icon-view" @click="handleEdit(scope.$index, scope.row)"></i>
          <el-dialog class="formDiv" title="修改框" :visible.sync="dialogFormVisible">
            <el-form :model="editRow" ref="editRow" label-width="100px" id="alterfrom" class="demo-ruleForm">
              <el-form-item style="width:84%" label="商品名称：" prop="or_num">
                <el-input disabled type="textarea" v-model="editRow.s_name"></el-input>
              </el-form-item>
              <el-form-item label="订单编号:" prop="or_num">
                <el-input disabled v-model="editRow.or_num"></el-input>
              </el-form-item>
              <el-form-item label="下单日期：" prop="or_startDate">
                <el-input disabled v-model="editRow.or_startDate"></el-input>
              </el-form-item>
              <el-form-item label="价格：" prop="s_price">
                <el-input disabled v-model="editRow.s_price"></el-input>
              </el-form-item>
              <el-form-item label="姓名：" prop="or_orderName">
                <el-input disabled v-model="editRow.or_orderName"></el-input>
              </el-form-item>
              <el-form-item label="联系电话：" prop="or_tel">
                <el-input disabled v-model="editRow.or_tel"></el-input>
              </el-form-item>
              <el-form-item label="电子邮件：" prop="or_tel">
                <el-input disabled v-model="editRow.or_email"></el-input>
              </el-form-item>
              <el-form-item label="出发日期：" prop="or_startDate">
                <el-input disabled v-model="editRow.or_startDate"></el-input>
              </el-form-item>
              <el-form-item label="出游人数：" prop="or_peopleTotal">
                <el-input disabled v-model="editRow.or_peopleTotal"></el-input>
              </el-form-item>
              <el-form-item style="width:84%" label="订单状态：" prop="or_stateName">
                <el-input v-model="editRow.or_stateName">
                  <!--<el-option v-model="editRow.zhuangtai"></el-option>-->
                </el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="alterEdit(scope.$index, scope.row)">确 定</el-button>
              <el-button @click="dialogFormVisible = false">取 消</el-button>
            </div>
          </el-dialog>
          <i class="el-icon-delete" @click="centerDialogVisible = true"></i>
          <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
            <span>需要注意的是内容是默认不居中的</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="centerDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="handleDelete(scope.$index, scope.row)">确 定</el-button>
            </span>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="changeNumber" :current-page='currentVal ' :page-sizes='pageNumArr'
                     :page-size='pageNum' background layout="sizes,total, prev, pager, next, jumper" :total="tableData.length" >
      </el-pagination>
    </div>
    <!--total:表格数据的长度 :page-size：表示显示条数  :page-sizes：每页分别显示的条数（下拉框） prev：上一页
    pager：一共有多少页 next： 下一页 jumper：调到第几页 当前页：@current-change 每页显示多少条：handleSizeChange-->

  </div>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [],/*总数据*/
        pageNum:5,/*每页显示多少条数据*/
        pageNumArr:[5,10,15,20],/*每页显示多少条数据*/
        currentPageData:[]  /*当前页数据*/,
        currentVal:1,
        centerDialogVisible: false,
        dialogFormVisible: false,
        multipleSelection: [],
        editRow:{
          zhuangtai:''
        },
        value1:'',
        value2:'',
        formInline: {
          orderstate: '',
        },
        value5: '100'
      }
    },
    methods: {
      onSelectOrder(){
        this.currentPageData=[]
        this.axios.get("/api/customerOrder.do",{
          params:{
            orderstate:this.formInline.orderstate
          }

        }).then((data)=>{
            this.currentPageData=[]
            this.tableData = data.data
            for(var j=0;j<this.tableData.length;j++){
              this.tableData[j].or_orderDate=this.tableData[j].or_orderDate.split('T')[0]
              this.tableData[j]. or_startDate=this.tableData[j]. or_startDate.split('T')[0]
            }
            for(var i=0;i<parseInt(this.pageNum) && i<this.tableData.length;i++){
              this.currentPageData.push(this.tableData[i])
            }
        })
      },/*筛选所有数据*/
      handleEdit(index, row) {
        console.log(index, row);
        this.editRow=row;
        this.dialogFormVisible=true;
      },
      alterEdit(index, row) {
        this.dialogFormVisible=false;
      },
      handleDelete(index, row) {
        /*index数组下标*/
        /*第一步id将这个id传到服务器
        * 第二步将渲染数组tabledata修改
        * */
        this.centerDialogVisible =false
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
      }
    },
    created(){
      this.axios.get("/api/customerOrder.do").then((data)=>{
        this.tableData = data.data
        this.dataAll=this.tabledata
        for(var j=0;j<this.tableData.length;j++){
          this.tableData[j].or_orderDate=this.tableData[j].or_orderDate.split('T')[0]
          this.tableData[j]. or_startDate=this.tableData[j]. or_startDate.split('T')[0]
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
    top: 145px !important;
    left: 280px;
    width: 150px !important;
    height: 40px;
  }
  .el-pagination__total{
    position: absolute;
    top: 145px !important;
    right: 50px;
  }
  /*!*----------------订单状态框样式----------------------*!*/
  .shengHe{
    font-weight: bolder;
    color:#DA4453;
  }
  #myfrom .el-form-item:first-child{
    margin-left: 28%;
  }
  #myfrom .el-select{
    position: relative;
    top: 0!important;
    left: 0;
    width: 240px !important;
    height: 40px;
    border-radius: 3px;
    /*border: 1px solid black;*/
  }
  #alterfrom .el-select{
    position: relative;
    top: 0!important;
  }

  .el-icon-view{
    color:#409EFF;
    font-weight: bolder;
  }
  .daiChuXing{
    font-weight: bolder;
    color:#4FC1E9;
  }
  .yiChuXing{
    font-weight: bolder;
    color:#AC92EC;
  }
  .tuiKuanZhong{
    font-weight: bolder;
    color:#EC87C0;
  }
  .yiTuiKuan{
    font-weight: bolder;
    color:#b6bec9;
  }
  .yiQuXiao{
    font-weight: bolder;
    color:#b6bec9;
  }
</style>
