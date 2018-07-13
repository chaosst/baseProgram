<style>
  .tableBox{height:calc(100% - 42px);}
  .routerView{height:100%;width:100%;}
  .edita{color:#66b1ff;cursor:pointer;}
</style>
<template>
  <div class="erpBox" v-cloak>
    <el-row class="actionHeader-more">
      <el-col :span="6">
        <el-button type="text" icon="el-icon-fant-setup" class="col-set">
          列设置
        </el-button>
      </el-col>
      <el-col :span="18">
        <div class="action">
          <el-button type="primary" size="small" class="fant-action-btn" icon="el-icon-fant-add" @click="addBox">
            新增
          </el-button>
        </div>
      </el-col>
    </el-row>
    <el-row class="tableBox">
      <el-col :span="24" style="height:100%;">
        <fant-table ref="aaa" :data="mydata" :opt="tableOpt" :page="pageOpt" :columns="columns" @page-change="pageChange">
          <template slot="fid" slot-scope="scope">
            <el-button type="text" v-show="scope.row.recordStatus==0" class="actionBtn" icon="el-icon-delete" @click="delRow" title="删除"></el-button>
            <el-button type="text" v-show="scope.row.recordStatus==0" class="actionBtn" icon="el-icon-check" @click="enable" title="启用"></el-button>
            <el-button type="text" v-show="scope.row.recordStatus!=0" class="actionBtn" icon="el-icon-close" @click="disable" title="停用"></el-button>
          </template>
          <template slot="code" slot-scope="scope">
            <a class="edita" @click="editRow(scope.row)">{{scope.row.code}}</a>
          </template>
        </fant-table>
      </el-col>
    </el-row>
    <win :show.sync="winShow" :opt="winOpt">
        <router-view class="routerView"></router-view>
    </win>
  </div>
</template>

<script>
  import "@/my-theme/warehouse.scss";
  import {Condition,Exp,Logic,Order} from '@/lib/fant-sql';
  import valid from '@/lib/fant-validate';
  var adata = [{
    "auditTime":"2018-03-06 23:59:30",
    "auditorId":"402881255a12894d015a12af35410009",
    "auditorName":"杨兆明","billDate":"2018-03-06 00:00:00","billType":11,
    "billextendDetailList":[],"bindingAmount":0E-8,"cancelTime":"","code":"CGRK201803060015",
    "createId":"402881255a12894d015a12af35410009","createTime":"2018-03-06 23:59:14",
    "creatorName":"杨兆明","csvId":"402881835fa060e201602626e46b5a30",
    "csvName":"乌兰矿","csvType":2,"deptId":"402881255a12894d015a12adfacd0005",
    "deptName":"采购部","describe":"","detailList":[],"detal":"1",
    "endDate":"2018-03-08 00:00:00","expenseAmount":"0",
    "fid":"2c92e07e61fb09620161fc09c41f0135","freeAmount":"0",
    "inMemberId":"402881835d05dff2015d30777ff53e5f","inMemberName":"杨兆明",
    "inWareHouseId":"402881835fa060e20160262743675a32","inWareHouseName":"乌兰矿",
    "ischeck":0,"otherCharges":"0","productionStatus":0,"recordStatus":1,
    "stockPeriodDetail":"201803","stockPeriodId":"5e5d857c60c6969a0160ddc8bfec2528",
    "supplierAddress":"","supplierCode":"62","supplierContact":"",
    "supplierId":"402881835fa060e201602626e46b5a30","supplierName":"乌兰矿",
    "supplierPhone":"","totalAmount":"76345.8","totalPayAmount":"0",
    "transportBilldetailList":[],"unCheckAmount":76345.80000000,
    "updateTime":"2018-03-06 23:59:22","voucherCode":"","warehouseBillSerialDetail":[]
  }];
  export default {
    name:"service",
    data () {
      var vm = this;
      return {
        adata:adata,
        mydata:adata,
        tableOpt:{
          height:"100%",
          size:"small",
          page:true,
          showSummary:true,
          url:""
        },
        pageOpt:{
          pageSize:10,
          total:100,
        },
        columns:[
          {prop:"fid",label:"操作",minWidth:"150"},
          {prop:"code",label:"中文名称",minWidth:"150"},
          {prop:"billDate",label:"英文名称",minWidth:"150",
            formatter:function(row, column, cellValue){
                return vm.formatDate(row, column, cellValue);
          }},
          {prop:"supplierName",label:"版本号",minWidth:"100"},
          {prop:"inMemberName",label:"销售价",minWidth:"80"},
          {prop:"totalAmount",label:"优惠价",minWidth:"100",money:true},
          {prop:"totalPayAmount",label:"描述",minWidth:"100",money:true},
          {prop:"recordStatus",label:"状态",minWidth:"80",formatter:function(row, column, cellValue){
            return vm.recordFormat(row, column, cellValue);
          }}
        ],
        winOpt:{
          title:"弹窗标题",
          size:"large",
          modalAppendToBody:false,
          header:false,
        },
        winShow:false,
      }
    },
    methods:{
      pageChange(index){
        this.$http.post("admin/module/page",{page:index,pageSize:this.pageOpt.pageSize}).then(function(re){
          console.log(re)
          if(re.body.rows){
            this.mydata = re.body.rows;
            this.dataCount = re.body.total;
          }
        });
      },
      editRow(row){
        //this.selectFid = row.fid;
        this.$router.push("/main/platformManage/edit");
        this.winShow = true;
      },
      delRow(){

      },
      enable:function(){

      },
      disable:function(){

      },
      recordFormat(row, column, cellValue){
        if(row.recordStatus == 0) return "无效";
         else return "有效";
      },
      addBox:function(){
        this.$router.push("/main/platformManage/edit");
        this.winShow = true;
      }
    },
    mounted:function(){
      window.$vueParentEl = this;
    },
    updated(){
    }
  }
</script>
