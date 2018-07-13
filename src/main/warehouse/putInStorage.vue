<style scoped>

</style>
<template>
  <div class="erpBox" v-cloak>
    <el-row class="actionHeader">
      <el-col :span="24" class="actionBox">
        <fant-form ref="loginForm" class="fant-form" :model="formData" :opt="formOpt1" v-enter>
          <fant-form-item class="inputItem" :opt="{prop:'code'}">
            <el-input v-model="formData.code" placeholder="请输入单号进行搜索" id="validateCode" name="validateCode" style="width:200px;">
            </el-input>
          </fant-form-item>
          <fant-form-item class="inputItem" :opt="{prop:'billDate'}">
              <datebox
                v-model="formData.billDate"
                :opt="dateOpt"
                @change="myclose"
                style="width:300px;">
              </datebox>
          </fant-form-item>
          <el-button type="info" size="small" class="fant-action-btn" icon="el-icon-fant-manage" @click="searchShow = 1;">高级搜索</el-button>
          <el-button type="primary" size="small" class="fant-action-btn" icon="el-icon-fant-search">查询</el-button>
        </fant-form>
      </el-col>
    </el-row>
    <el-row class="actionHeader-more">
      <el-col :span="6">
        <el-button type="text" icon="el-icon-fant-setup" class="col-set">
          列设置
        </el-button>
      </el-col>
      <el-col :span="18">
        <div class="action">
          <el-button type="primary" size="small" class="fant-action-btn" icon="el-icon-fant-add" @click="addBox">新增</el-button>
          <el-button type="info" size="small" class="fant-action-btn" icon="el-icon-fant-manage">导入</el-button>
          <el-button type="info" size="small" class="fant-action-btn" icon="el-icon-fant-search">打印</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row class="tableBox">
      <el-col :span="24" style="height:100%;">
        <fant-table
          ref="aaa"
          :data="mydata"
          :opt="tableOpt"
          :page="pageOpt"
          :columns="columns"
        >
          <template slot="fid" slot-scope="scope">
            <el-button v-show="scope.recordStatus == 0" type="text" class="actionBtn" icon="el-icon-delete" @click="delRow" title="删除"></el-button>
            <el-button type="text" class="actionBtn" icon="el-icon-document" @click="delRow" title="复制"></el-button>
            <el-button v-show="scope.recordStatus == 0" type="text" class="actionBtn" icon="el-icon-check" @click="auditRow" title="审核"></el-button>
            <el-button v-show="scope.recordStatus !=2" type="text" class="actionBtn" icon="el-icon-close" @click="cancelRow" title="作废"></el-button>
          </template>
          <template slot="code" slot-scope="scope">
            <a style="color:#66b1ff;cursor:pointer;" @click="editRow(scope.row)">{{scope.row.code}}</a>
          </template>
        </fant-table>
      </el-col>
    </el-row>
    <win ref="searchBar" class="searchBar" :show.sync="searchShow" :opt="searchWinOpt">
      <fant-form ref="loginForm" style="padding:20px 10px;" :model="formData" :opt="formOpt2" v-enter>
        <el-row>
          <el-col :span="12">
            <fant-form-item class="inputItem" :opt="{label:'采购员：',prop:'inMemberId'}">
              <fant-select :opt="selectOpt" :data="adata" v-model="formData.inMemberId" @visible-change="myclose"></fant-select>
            </fant-form-item>
          </el-col>
          <el-col :span="12">
            <fant-form-item class="inputItem" :opt="{label:'单据日期：',prop:'billDate'}">
              <datebox
                v-model="formData.billDate"
                :opt="dateOpt"
                style="width:100%;">
              </datebox>
            </fant-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <fant-form-item class="inputItem" :opt="{label:'备注：',prop:'describe'}">
              <el-input v-model="formData.describe" placeholder="请输入备注"></el-input>
            </fant-form-item>
          </el-col>
          <el-col :span="12">
            <fant-form-item class="inputItem" :opt="{label:'关联单据：',prop:'relation'}">
              <el-input v-model="formData.relation" placeholder="请输入单据号"></el-input>
            </fant-form-item>
          </el-col>
        </el-row>
        <el-row>
          <fant-form-item class="inputItem" :opt="{label:'状态：',prop:'recordStatus'}">
            <el-radio-group v-model="formData.recordStatus">
              <el-radio label="0">未审核</el-radio>
              <el-radio label="1">已审核</el-radio>
              <el-radio label="2">已作废</el-radio>
            </el-radio-group>
          </fant-form-item>
        </el-row>
      </fant-form>
      <div class="footer">
        <span style="float:right;">
          <el-button size="small" type="primary" class="fant-action-btn" @click="searchTable">查询</el-button>
          <el-button size="small" class="fant-action-btn" @click="clearForm('loginForm')">清空</el-button>
        </span>
      </div>
    </win>
    <win :show.sync="winShow" :opt="winOpt">
        <router-view style="width:100%;height:100%;"></router-view>
    </win>
  </div>
</template>

<script>
  import "@/my-theme/warehouse.scss";
  import {Condition,Exp,Logic,Order} from '@/lib/fant-sql';
  import valid from '@/lib/fant-validate';
  var adata = [{"auditTime":"2018-03-06 23:59:30","auditorId":"402881255a12894d015a12af35410009","auditorName":"杨兆明","billDate":"2018-03-06 00:00:00","billType":11,"billextendDetailList":[],"bindingAmount":0E-8,"cancelTime":"","code":"CGRK201803060015","createId":"402881255a12894d015a12af35410009","createTime":"2018-03-06 23:59:14","creatorName":"杨兆明","csvId":"402881835fa060e201602626e46b5a30","csvName":"乌兰矿","csvType":2,"deptId":"402881255a12894d015a12adfacd0005","deptName":"采购部","describe":"","detailList":[],"detal":"1","endDate":"2018-03-08 00:00:00","expenseAmount":"0","fid":"2c92e07e61fb09620161fc09c41f0135","freeAmount":"0","inMemberId":"402881835d05dff2015d30777ff53e5f","inMemberName":"杨兆明","inWareHouseId":"402881835fa060e20160262743675a32","inWareHouseName":"乌兰矿","ischeck":0,"otherCharges":"0","productionStatus":0,"recordStatus":1,"stockPeriodDetail":"201803","stockPeriodId":"5e5d857c60c6969a0160ddc8bfec2528","supplierAddress":"","supplierCode":"62","supplierContact":"","supplierId":"402881835fa060e201602626e46b5a30","supplierName":"乌兰矿","supplierPhone":"","totalAmount":"76345.8","totalPayAmount":"0","transportBilldetailList":[],"unCheckAmount":76345.80000000,"updateTime":"2018-03-06 23:59:22","voucherCode":"","warehouseBillSerialDetail":[]},{"auditTime":"2018-03-06 23:40:21","auditorId":"402881255a12894d015a12af35410009","auditorName":"杨兆明","billDate":"2018-03-06 00:00:00","billType":11,"billextendDetailList":[],"bindingAmount":0E-8,"cancelTime":"","code":"CGRK201803060014","createId":"402881255a12894d015a12af35410009","createTime":"2018-03-06 23:38:25","creatorName":"杨兆明","csvId":"402881835f6bd14d015f7082f44d0e93","csvName":"霍洛湾煤矿","csvType":2,"deptId":"402881255a12894d015a12adfacd0005","deptName":"采购部","describe":"","detailList":[],"detal":"1","endDate":"2018-03-08 00:00:00","expenseAmount":"0","fid":"2c92e07e61fb09620161fbf6b49d0108","freeAmount":"0","inMemberId":"402881835d05dff2015d30777ff53e5f","inMemberName":"杨兆明","inWareHouseId":"402881835f6bd14d015f707a8fa40d1d","inWareHouseName":"霍洛湾煤矿","ischeck":0,"otherCharges":"0","productionStatus":0,"recordStatus":1,"stockPeriodDetail":"201803","stockPeriodId":"5e5d857c60c6969a0160ddc8bfec2528","supplierAddress":"","supplierCode":"57","supplierContact":"","supplierId":"402881835f6bd14d015f7082f44d0e93","supplierName":"霍洛湾煤矿","supplierPhone":"","totalAmount":"254865","totalPayAmount":"0","transportBilldetailList":[],"unCheckAmount":254865.00000000,"updateTime":"2018-03-06 23:39:50","voucherCode":"","warehouseBillSerialDetail":[]},{"auditTime":"2018-03-06 23:59:30","auditorId":"402881255a12894d015a12af35410009","auditorName":"杨兆明","billDate":"2018-03-06 00:00:00","billType":11,"billextendDetailList":[],"bindingAmount":0E-8,"cancelTime":"","code":"CGRK201803060015","createId":"402881255a12894d015a12af35410009","createTime":"2018-03-06 23:59:14","creatorName":"杨兆明","csvId":"402881835fa060e201602626e46b5a30","csvName":"乌兰矿","csvType":2,"deptId":"402881255a12894d015a12adfacd0005","deptName":"采购部","describe":"","detailList":[],"detal":"1","endDate":"2018-03-08 00:00:00","expenseAmount":"0","fid":"2c92e07e61fb09620161fc09c41f0135","freeAmount":"0","inMemberId":"402881835d05dff2015d30777ff53e5f","inMemberName":"杨兆明","inWareHouseId":"402881835fa060e20160262743675a32","inWareHouseName":"乌兰矿","ischeck":0,"otherCharges":"0","productionStatus":0,"recordStatus":1,"stockPeriodDetail":"201803","stockPeriodId":"5e5d857c60c6969a0160ddc8bfec2528","supplierAddress":"","supplierCode":"62","supplierContact":"","supplierId":"402881835fa060e201602626e46b5a30","supplierName":"乌兰矿","supplierPhone":"","totalAmount":"76345.8","totalPayAmount":"0","transportBilldetailList":[],"unCheckAmount":76345.80000000,"updateTime":"2018-03-06 23:59:22","voucherCode":"","warehouseBillSerialDetail":[]},{"auditTime":"2018-03-06 23:40:21","auditorId":"402881255a12894d015a12af35410009","auditorName":"杨兆明","billDate":"2018-03-06 00:00:00","billType":11,"billextendDetailList":[],"bindingAmount":0E-8,"cancelTime":"","code":"CGRK201803060014","createId":"402881255a12894d015a12af35410009","createTime":"2018-03-06 23:38:25","creatorName":"杨兆明","csvId":"402881835f6bd14d015f7082f44d0e93","csvName":"霍洛湾煤矿","csvType":2,"deptId":"402881255a12894d015a12adfacd0005","deptName":"采购部","describe":"","detailList":[],"detal":"1","endDate":"2018-03-08 00:00:00","expenseAmount":"0","fid":"2c92e07e61fb09620161fbf6b49d0108","freeAmount":"0","inMemberId":"402881835d05dff2015d30777ff53e5f","inMemberName":"杨兆明","inWareHouseId":"402881835f6bd14d015f707a8fa40d1d","inWareHouseName":"霍洛湾煤矿","ischeck":0,"otherCharges":"0","productionStatus":0,"recordStatus":1,"stockPeriodDetail":"201803","stockPeriodId":"5e5d857c60c6969a0160ddc8bfec2528","supplierAddress":"","supplierCode":"57","supplierContact":"","supplierId":"402881835f6bd14d015f7082f44d0e93","supplierName":"霍洛湾煤矿","supplierPhone":"","totalAmount":"254865","totalPayAmount":"0","transportBilldetailList":[],"unCheckAmount":254865.00000000,"updateTime":"2018-03-06 23:39:50","voucherCode":"","warehouseBillSerialDetail":[]},{"auditTime":"2018-03-06 23:59:30","auditorId":"402881255a12894d015a12af35410009","auditorName":"杨兆明","billDate":"2018-03-06 00:00:00","billType":11,"billextendDetailList":[],"bindingAmount":0E-8,"cancelTime":"","code":"CGRK201803060015","createId":"402881255a12894d015a12af35410009","createTime":"2018-03-06 23:59:14","creatorName":"杨兆明","csvId":"402881835fa060e201602626e46b5a30","csvName":"乌兰矿","csvType":2,"deptId":"402881255a12894d015a12adfacd0005","deptName":"采购部","describe":"","detailList":[],"detal":"1","endDate":"2018-03-08 00:00:00","expenseAmount":"0","fid":"2c92e07e61fb09620161fc09c41f0135","freeAmount":"0","inMemberId":"402881835d05dff2015d30777ff53e5f","inMemberName":"杨兆明","inWareHouseId":"402881835fa060e20160262743675a32","inWareHouseName":"乌兰矿","ischeck":0,"otherCharges":"0","productionStatus":0,"recordStatus":1,"stockPeriodDetail":"201803","stockPeriodId":"5e5d857c60c6969a0160ddc8bfec2528","supplierAddress":"","supplierCode":"62","supplierContact":"","supplierId":"402881835fa060e201602626e46b5a30","supplierName":"乌兰矿","supplierPhone":"","totalAmount":"76345.8","totalPayAmount":"0","transportBilldetailList":[],"unCheckAmount":76345.80000000,"updateTime":"2018-03-06 23:59:22","voucherCode":"","warehouseBillSerialDetail":[]},{"auditTime":"2018-03-06 23:40:21","auditorId":"402881255a12894d015a12af35410009","auditorName":"杨兆明","billDate":"2018-03-06 00:00:00","billType":11,"billextendDetailList":[],"bindingAmount":0E-8,"cancelTime":"","code":"CGRK201803060014","createId":"402881255a12894d015a12af35410009","createTime":"2018-03-06 23:38:25","creatorName":"杨兆明","csvId":"402881835f6bd14d015f7082f44d0e93","csvName":"霍洛湾煤矿","csvType":2,"deptId":"402881255a12894d015a12adfacd0005","deptName":"采购部","describe":"","detailList":[],"detal":"1","endDate":"2018-03-08 00:00:00","expenseAmount":"0","fid":"2c92e07e61fb09620161fbf6b49d0108","freeAmount":"0","inMemberId":"402881835d05dff2015d30777ff53e5f","inMemberName":"杨兆明","inWareHouseId":"402881835f6bd14d015f707a8fa40d1d","inWareHouseName":"霍洛湾煤矿","ischeck":0,"otherCharges":"0","productionStatus":0,"recordStatus":1,"stockPeriodDetail":"201803","stockPeriodId":"5e5d857c60c6969a0160ddc8bfec2528","supplierAddress":"","supplierCode":"57","supplierContact":"","supplierId":"402881835f6bd14d015f7082f44d0e93","supplierName":"霍洛湾煤矿","supplierPhone":"","totalAmount":"254865","totalPayAmount":"0","transportBilldetailList":[],"unCheckAmount":254865.00000000,"updateTime":"2018-03-06 23:39:50","voucherCode":"","warehouseBillSerialDetail":[]},{"auditTime":"2018-03-06 23:59:30","auditorId":"402881255a12894d015a12af35410009","auditorName":"杨兆明","billDate":"2018-03-06 00:00:00","billType":11,"billextendDetailList":[],"bindingAmount":0E-8,"cancelTime":"","code":"CGRK201803060015","createId":"402881255a12894d015a12af35410009","createTime":"2018-03-06 23:59:14","creatorName":"杨兆明","csvId":"402881835fa060e201602626e46b5a30","csvName":"乌兰矿","csvType":2,"deptId":"402881255a12894d015a12adfacd0005","deptName":"采购部","describe":"","detailList":[],"detal":"1","endDate":"2018-03-08 00:00:00","expenseAmount":"0","fid":"2c92e07e61fb09620161fc09c41f0135","freeAmount":"0","inMemberId":"402881835d05dff2015d30777ff53e5f","inMemberName":"杨兆明","inWareHouseId":"402881835fa060e20160262743675a32","inWareHouseName":"乌兰矿","ischeck":0,"otherCharges":"0","productionStatus":0,"recordStatus":1,"stockPeriodDetail":"201803","stockPeriodId":"5e5d857c60c6969a0160ddc8bfec2528","supplierAddress":"","supplierCode":"62","supplierContact":"","supplierId":"402881835fa060e201602626e46b5a30","supplierName":"乌兰矿","supplierPhone":"","totalAmount":"76345.8","totalPayAmount":"0","transportBilldetailList":[],"unCheckAmount":76345.80000000,"updateTime":"2018-03-06 23:59:22","voucherCode":"","warehouseBillSerialDetail":[]},{"auditTime":"2018-03-06 23:40:21","auditorId":"402881255a12894d015a12af35410009","auditorName":"杨兆明","billDate":"2018-03-06 00:00:00","billType":11,"billextendDetailList":[],"bindingAmount":0E-8,"cancelTime":"","code":"CGRK201803060014","createId":"402881255a12894d015a12af35410009","createTime":"2018-03-06 23:38:25","creatorName":"杨兆明","csvId":"402881835f6bd14d015f7082f44d0e93","csvName":"霍洛湾煤矿","csvType":2,"deptId":"402881255a12894d015a12adfacd0005","deptName":"采购部","describe":"","detailList":[],"detal":"1","endDate":"2018-03-08 00:00:00","expenseAmount":"0","fid":"2c92e07e61fb09620161fbf6b49d0108","freeAmount":"0","inMemberId":"402881835d05dff2015d30777ff53e5f","inMemberName":"杨兆明","inWareHouseId":"402881835f6bd14d015f707a8fa40d1d","inWareHouseName":"霍洛湾煤矿","ischeck":0,"otherCharges":"0","productionStatus":0,"recordStatus":1,"stockPeriodDetail":"201803","stockPeriodId":"5e5d857c60c6969a0160ddc8bfec2528","supplierAddress":"","supplierCode":"57","supplierContact":"","supplierId":"402881835f6bd14d015f7082f44d0e93","supplierName":"霍洛湾煤矿","supplierPhone":"","totalAmount":"254865","totalPayAmount":"0","transportBilldetailList":[],"unCheckAmount":254865.00000000,"updateTime":"2018-03-06 23:39:50","voucherCode":"","warehouseBillSerialDetail":[]},{"auditTime":"2018-03-06 23:59:30","auditorId":"402881255a12894d015a12af35410009","auditorName":"杨兆明","billDate":"2018-03-06 00:00:00","billType":11,"billextendDetailList":[],"bindingAmount":0E-8,"cancelTime":"","code":"CGRK201803060015","createId":"402881255a12894d015a12af35410009","createTime":"2018-03-06 23:59:14","creatorName":"杨兆明","csvId":"402881835fa060e201602626e46b5a30","csvName":"乌兰矿","csvType":2,"deptId":"402881255a12894d015a12adfacd0005","deptName":"采购部","describe":"","detailList":[],"detal":"1","endDate":"2018-03-08 00:00:00","expenseAmount":"0","fid":"2c92e07e61fb09620161fc09c41f0135","freeAmount":"0","inMemberId":"402881835d05dff2015d30777ff53e5f","inMemberName":"杨兆明","inWareHouseId":"402881835fa060e20160262743675a32","inWareHouseName":"乌兰矿","ischeck":0,"otherCharges":"0","productionStatus":0,"recordStatus":1,"stockPeriodDetail":"201803","stockPeriodId":"5e5d857c60c6969a0160ddc8bfec2528","supplierAddress":"","supplierCode":"62","supplierContact":"","supplierId":"402881835fa060e201602626e46b5a30","supplierName":"乌兰矿","supplierPhone":"","totalAmount":"76345.8","totalPayAmount":"0","transportBilldetailList":[],"unCheckAmount":76345.80000000,"updateTime":"2018-03-06 23:59:22","voucherCode":"","warehouseBillSerialDetail":[]},{"auditTime":"2018-03-06 23:40:21","auditorId":"402881255a12894d015a12af35410009","auditorName":"杨兆明","billDate":"2018-03-06 00:00:00","billType":11,"billextendDetailList":[],"bindingAmount":0E-8,"cancelTime":"","code":"CGRK201803060014","createId":"402881255a12894d015a12af35410009","createTime":"2018-03-06 23:38:25","creatorName":"杨兆明","csvId":"402881835f6bd14d015f7082f44d0e93","csvName":"霍洛湾煤矿","csvType":2,"deptId":"402881255a12894d015a12adfacd0005","deptName":"采购部","describe":"","detailList":[],"detal":"1","endDate":"2018-03-08 00:00:00","expenseAmount":"0","fid":"2c92e07e61fb09620161fbf6b49d0108","freeAmount":"0","inMemberId":"402881835d05dff2015d30777ff53e5f","inMemberName":"杨兆明","inWareHouseId":"402881835f6bd14d015f707a8fa40d1d","inWareHouseName":"霍洛湾煤矿","ischeck":0,"otherCharges":"0","productionStatus":0,"recordStatus":1,"stockPeriodDetail":"201803","stockPeriodId":"5e5d857c60c6969a0160ddc8bfec2528","supplierAddress":"","supplierCode":"57","supplierContact":"","supplierId":"402881835f6bd14d015f7082f44d0e93","supplierName":"霍洛湾煤矿","supplierPhone":"","totalAmount":"254865","totalPayAmount":"0","transportBilldetailList":[],"unCheckAmount":254865.00000000,"updateTime":"2018-03-06 23:39:50","voucherCode":"","warehouseBillSerialDetail":[]},{"auditTime":"2018-03-06 23:59:30","auditorId":"402881255a12894d015a12af35410009","auditorName":"杨兆明","billDate":"2018-03-06 00:00:00","billType":11,"billextendDetailList":[],"bindingAmount":0E-8,"cancelTime":"","code":"CGRK201803060015","createId":"402881255a12894d015a12af35410009","createTime":"2018-03-06 23:59:14","creatorName":"杨兆明","csvId":"402881835fa060e201602626e46b5a30","csvName":"乌兰矿","csvType":2,"deptId":"402881255a12894d015a12adfacd0005","deptName":"采购部","describe":"","detailList":[],"detal":"1","endDate":"2018-03-08 00:00:00","expenseAmount":"0","fid":"2c92e07e61fb09620161fc09c41f0135","freeAmount":"0","inMemberId":"402881835d05dff2015d30777ff53e5f","inMemberName":"杨兆明","inWareHouseId":"402881835fa060e20160262743675a32","inWareHouseName":"乌兰矿","ischeck":0,"otherCharges":"0","productionStatus":0,"recordStatus":1,"stockPeriodDetail":"201803","stockPeriodId":"5e5d857c60c6969a0160ddc8bfec2528","supplierAddress":"","supplierCode":"62","supplierContact":"","supplierId":"402881835fa060e201602626e46b5a30","supplierName":"乌兰矿","supplierPhone":"","totalAmount":"76345.8","totalPayAmount":"0","transportBilldetailList":[],"unCheckAmount":76345.80000000,"updateTime":"2018-03-06 23:59:22","voucherCode":"","warehouseBillSerialDetail":[]},{"auditTime":"2018-03-06 23:40:21","auditorId":"402881255a12894d015a12af35410009","auditorName":"杨兆明","billDate":"2018-03-06 00:00:00","billType":11,"billextendDetailList":[],"bindingAmount":0E-8,"cancelTime":"","code":"CGRK201803060014","createId":"402881255a12894d015a12af35410009","createTime":"2018-03-06 23:38:25","creatorName":"杨兆明","csvId":"402881835f6bd14d015f7082f44d0e93","csvName":"霍洛湾煤矿","csvType":2,"deptId":"402881255a12894d015a12adfacd0005","deptName":"采购部","describe":"","detailList":[],"detal":"1","endDate":"2018-03-08 00:00:00","expenseAmount":"0","fid":"2c92e07e61fb09620161fbf6b49d0108","freeAmount":"0","inMemberId":"402881835d05dff2015d30777ff53e5f","inMemberName":"杨兆明","inWareHouseId":"402881835f6bd14d015f707a8fa40d1d","inWareHouseName":"霍洛湾煤矿","ischeck":0,"otherCharges":"0","productionStatus":0,"recordStatus":1,"stockPeriodDetail":"201803","stockPeriodId":"5e5d857c60c6969a0160ddc8bfec2528","supplierAddress":"","supplierCode":"57","supplierContact":"","supplierId":"402881835f6bd14d015f7082f44d0e93","supplierName":"霍洛湾煤矿","supplierPhone":"","totalAmount":"254865","totalPayAmount":"0","transportBilldetailList":[],"unCheckAmount":254865.00000000,"updateTime":"2018-03-06 23:39:50","voucherCode":"","warehouseBillSerialDetail":[]},{"auditTime":"2018-03-06 23:59:30","auditorId":"402881255a12894d015a12af35410009","auditorName":"杨兆明","billDate":"2018-03-06 00:00:00","billType":11,"billextendDetailList":[],"bindingAmount":0E-8,"cancelTime":"","code":"CGRK201803060015","createId":"402881255a12894d015a12af35410009","createTime":"2018-03-06 23:59:14","creatorName":"杨兆明","csvId":"402881835fa060e201602626e46b5a30","csvName":"乌兰矿","csvType":2,"deptId":"402881255a12894d015a12adfacd0005","deptName":"采购部","describe":"","detailList":[],"detal":"1","endDate":"2018-03-08 00:00:00","expenseAmount":"0","fid":"2c92e07e61fb09620161fc09c41f0135","freeAmount":"0","inMemberId":"402881835d05dff2015d30777ff53e5f","inMemberName":"杨兆明","inWareHouseId":"402881835fa060e20160262743675a32","inWareHouseName":"乌兰矿","ischeck":0,"otherCharges":"0","productionStatus":0,"recordStatus":1,"stockPeriodDetail":"201803","stockPeriodId":"5e5d857c60c6969a0160ddc8bfec2528","supplierAddress":"","supplierCode":"62","supplierContact":"","supplierId":"402881835fa060e201602626e46b5a30","supplierName":"乌兰矿","supplierPhone":"","totalAmount":"76345.8","totalPayAmount":"0","transportBilldetailList":[],"unCheckAmount":76345.80000000,"updateTime":"2018-03-06 23:59:22","voucherCode":"","warehouseBillSerialDetail":[]},{"auditTime":"2018-03-06 23:40:21","auditorId":"402881255a12894d015a12af35410009","auditorName":"杨兆明","billDate":"2018-03-06 00:00:00","billType":11,"billextendDetailList":[],"bindingAmount":0E-8,"cancelTime":"","code":"CGRK201803060014","createId":"402881255a12894d015a12af35410009","createTime":"2018-03-06 23:38:25","creatorName":"杨兆明","csvId":"402881835f6bd14d015f7082f44d0e93","csvName":"霍洛湾煤矿","csvType":2,"deptId":"402881255a12894d015a12adfacd0005","deptName":"采购部","describe":"","detailList":[],"detal":"1","endDate":"2018-03-08 00:00:00","expenseAmount":"0","fid":"2c92e07e61fb09620161fbf6b49d0108","freeAmount":"0","inMemberId":"402881835d05dff2015d30777ff53e5f","inMemberName":"杨兆明","inWareHouseId":"402881835f6bd14d015f707a8fa40d1d","inWareHouseName":"霍洛湾煤矿","ischeck":0,"otherCharges":"0","productionStatus":0,"recordStatus":1,"stockPeriodDetail":"201803","stockPeriodId":"5e5d857c60c6969a0160ddc8bfec2528","supplierAddress":"","supplierCode":"57","supplierContact":"","supplierId":"402881835f6bd14d015f7082f44d0e93","supplierName":"霍洛湾煤矿","supplierPhone":"","totalAmount":"254865","totalPayAmount":"0","transportBilldetailList":[],"unCheckAmount":254865.00000000,"updateTime":"2018-03-06 23:39:50","voucherCode":"","warehouseBillSerialDetail":[]},{"auditTime":"2018-03-06 23:59:30","auditorId":"402881255a12894d015a12af35410009","auditorName":"杨兆明","billDate":"2018-03-06 00:00:00","billType":11,"billextendDetailList":[],"bindingAmount":0E-8,"cancelTime":"","code":"CGRK201803060015","createId":"402881255a12894d015a12af35410009","createTime":"2018-03-06 23:59:14","creatorName":"杨兆明","csvId":"402881835fa060e201602626e46b5a30","csvName":"乌兰矿","csvType":2,"deptId":"402881255a12894d015a12adfacd0005","deptName":"采购部","describe":"","detailList":[],"detal":"1","endDate":"2018-03-08 00:00:00","expenseAmount":"0","fid":"2c92e07e61fb09620161fc09c41f0135","freeAmount":"0","inMemberId":"402881835d05dff2015d30777ff53e5f","inMemberName":"杨兆明","inWareHouseId":"402881835fa060e20160262743675a32","inWareHouseName":"乌兰矿","ischeck":0,"otherCharges":"0","productionStatus":0,"recordStatus":1,"stockPeriodDetail":"201803","stockPeriodId":"5e5d857c60c6969a0160ddc8bfec2528","supplierAddress":"","supplierCode":"62","supplierContact":"","supplierId":"402881835fa060e201602626e46b5a30","supplierName":"乌兰矿","supplierPhone":"","totalAmount":"76345.8","totalPayAmount":"0","transportBilldetailList":[],"unCheckAmount":76345.80000000,"updateTime":"2018-03-06 23:59:22","voucherCode":"","warehouseBillSerialDetail":[]},{"auditTime":"2018-03-06 23:40:21","auditorId":"402881255a12894d015a12af35410009","auditorName":"杨兆明","billDate":"2018-03-06 00:00:00","billType":11,"billextendDetailList":[],"bindingAmount":0E-8,"cancelTime":"","code":"CGRK201803060014","createId":"402881255a12894d015a12af35410009","createTime":"2018-03-06 23:38:25","creatorName":"杨兆明","csvId":"402881835f6bd14d015f7082f44d0e93","csvName":"霍洛湾煤矿","csvType":2,"deptId":"402881255a12894d015a12adfacd0005","deptName":"采购部","describe":"","detailList":[],"detal":"1","endDate":"2018-03-08 00:00:00","expenseAmount":"0","fid":"2c92e07e61fb09620161fbf6b49d0108","freeAmount":"0","inMemberId":"402881835d05dff2015d30777ff53e5f","inMemberName":"杨兆明","inWareHouseId":"402881835f6bd14d015f707a8fa40d1d","inWareHouseName":"霍洛湾煤矿","ischeck":0,"otherCharges":"0","productionStatus":0,"recordStatus":1,"stockPeriodDetail":"201803","stockPeriodId":"5e5d857c60c6969a0160ddc8bfec2528","supplierAddress":"","supplierCode":"57","supplierContact":"","supplierId":"402881835f6bd14d015f7082f44d0e93","supplierName":"霍洛湾煤矿","supplierPhone":"","totalAmount":"254865","totalPayAmount":"0","transportBilldetailList":[],"unCheckAmount":254865.00000000,"updateTime":"2018-03-06 23:39:50","voucherCode":"","warehouseBillSerialDetail":[]}];
  export default {
    name:"putInStorage",
    data () {
      var vm = this;
      return {
        adata:adata,
        formOpt1:{
          labelPosition:"right",
          labelWidth:"0px",
          inline:true
        },
        formOpt2:{
          labelPosition:"right",
          labelWidth:"100px",
        },
        dateOpt:{
          prompt:"请选择日期",
          type:"daterange"
        },
        selectFid:"",
        mydata:adata,
        formData:{
          code:"",
          inMemberId:"",
          billDate:""
        },
        tableOpt:{
          height:"100%",
          size:"small",
          page:true,
          showSummary:true,
          url:""
        },
        pageOpt:{
          pageSize:10,
          total:50,
        },
        columns:[
          {prop:"fid",label:"操作",minWidth:"150"},
          {prop:"code",label:"单号",minWidth:"150"},
          {prop:"billDate",label:"单据日期",minWidth:"150",formatter:function(row, column, cellValue){
            return vm.formatDate(row, column, cellValue);
          }},
          {prop:"supplierName",label:"供应商",minWidth:"100"},
          {prop:"inMemberName",label:"采购员",minWidth:"80"},
          {prop:"totalAmount",label:"金额",minWidth:"100",money:true},
          {prop:"totalPayAmount",label:"付款金额",minWidth:"100",money:true},
          {prop:"freeAmount",label:"优惠金额",minWidth:"100",money:true},
          {prop:"creatorName",label:"制单人",minWidth:"100"},
          {prop:"recordStatus",label:"状态",minWidth:"80",formatter:function(row, column, cellValue){
            return vm.recordFormat(row, column, cellValue);
          }}
        ],
        selectOpt:{
          width:200,
          textField:"username",
          idField:"fid",
          prompt:"请选择采购员",
//          url:"member/vagueSearch",
          columns:[
            {name:"人员",width:20,key:"username"},
            {name:"编号",width:20,key:"userCode"},
          ],
          remote:true,
          filterable:true
        },
        oldData:[],
        pageSize:10,
        dataCount:0,
        fid:"",
        selectFid:"123",
        winOpt:{
          title:"弹窗标题",
          size:"large",
          modalAppendToBody:false,
          header:false,
        },
        searchWinOpt:{
          title:"高级搜索",
          size:"small",
          modalAppendToBody:false
        },
        winShow:false,
        searchShow:false,
      }
    },
    methods:{
      myclose:function(a){
        //window.parent.vm
        console.log(a)
      },

      changepage(index){
        this.$http.post("warehouse/cgrk/list",{page:index}).then(function(re){
          if(re.body.rows){
            this.mydata = re.body.rows;
            this.dataCount = re.body.total;
          }
        });
      },
      editRow(row){
        this.selectFid = row.fid;
        this.winShow = true;
      },
      delRow(){
        var vm = this;
        this.$http.post("warehouse/cgrk/delete",{id:this.fid}).then(function(re){
          if(re.body.returnCode == 0){
            vm.alert({msg:"删除成功！"});
            vm.$http.get("warehouse/cgrk/list").then(function(re){
              if(re.body.rows){
                vm.mydata = re.body.rows;
                vm.dataCount = re.body.total;
              }
            });
          }
        });
      },
      auditRow:function(){
        var vm = this;
        this.$http.post("warehouse/cgrk/passAudit",{id:this.fid}).then(function(re){
          if(re.body.returnCode == 0){
            vm.alert({msg:"审核成功！"});
            vm.$http.get("warehouse/cgrk/list").then(function(re){
              if(re.body.rows){
                vm.mydata = re.body.rows;
                vm.dataCount = re.body.total;
              }
            });
          }else{
            this.alert({msg:"审核失败！"});
          }
        });
      },
      cancelRow:function(){
        var vm = this;
        this.$http.post("warehouse/cgrk/cancel",{id:this.fid}).then(function(re){
          if(re.body.returnCode == 0){
            vm.alert({msg:"作废成功！"});
            vm.$http.get("warehouse/cgrk/list").then(function(re){
              if(re.body.rows){
                vm.mydata = re.body.rows;
                vm.dataCount = re.body.total;
              }
            });
          }else{
            this.alert({msg:"作废失败！"});
          }
        });
      },
      clearForm:function(){
        this.$refs["loginForm"].$children[0].resetFields();
      },
      searchTable:function(){
        var vm = this;
        this.$refs["loginForm"].$children[0].validate(function(valid){
          if (valid) {
            vm.$refs["aaa"].reloadGrid(vm.formData);
          } else {
            return false;
          }
        });

      },
      recordFormat(row, column, cellValue){
        if(row.recordStatus == 0){
          return "未审核";
        }else if(row.recordStatus == 1){
          return "已审核";
        }else{
          return "已作废";
        }
      },
      addBox:function(){
        this.selectFid = "";
        this.$router.push("/main/putInStorage/edit");
        this.winShow = true;
      }
    },
    mounted:function(){
      window.$vueParentEl = this;
      var a = Condition([Exp("EQ","name","测试"),Logic("OR",[Exp("LIKE","phone","135"),Exp("EQ","phone","")])],[Order("name")]).toString();
      console.log(a)
        console.log(this.$getEl("input"))
    },
    updated(){
    }
  }
</script>
