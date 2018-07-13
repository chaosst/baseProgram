<style scoped>

</style>
<template>
  <div class="iframeBox warehouseBox">
    <fant-form ref="eidtForm" :model="editData" class="editForm" v-enter :opt="{inline:true,labelPosition:'right',labelWidth:'110px',size:'small'}">
    <el-row class="actionHeader">
      <span style="float:left;line-height: 30px;margin-right:10px;">
        <el-button circle icon="el-icon-fant-return" class="miniBtn" type="primary" size="mini" @click="close"></el-button>
      </span>
      <el-col :span="6">
        <fant-form-item class="inputItem" :opt="{label:'供应商：',prop:'supplierId',labelWidth:'70px'}">
          <fant-select :opt="supOpt" v-model="editData.supplierId" style="width:100%;"></fant-select>
        </fant-form-item>
      </el-col>
      <el-col :span="6">
        <fant-form-item class="inputItem" :opt="{label:'采购员：',prop:'inMemberId',labelWidth:'70px'}">
          <fant-select :opt="memOpt" v-model="editData.inMemberId" @visible-change="myclose" style="width:100%;"></fant-select>
        </fant-form-item>
      </el-col>
      <el-col :span="3">
        <fant-form-item :opt="{prop:'billDate',labelWidth:'0px'}">
          <datebox v-model="editData.billDate" :opt="editDateOpt" style="width:100%;"></datebox>
        </fant-form-item>
      </el-col>
      <el-col :span="3">
        <fant-form-item :opt="{prop:'billDate',labelWidth:'0px'}">
          <datebox v-model="editData.billDate" :opt="editDateOpt" style="width:100%;"></datebox>
        </fant-form-item>
      </el-col>
      <el-col :span="5">
        <fant-form-item :opt="{label:'单号：',prop:'code',labelWidth:'70px'}" style="float:right">
          <span>{{editData.code}}</span>
        </fant-form-item>
      </el-col>
    </el-row>
  <div class="warehouseMain">
    <!--<el-row>-->
        <fant-table
          ref="editTable"
          :data="mydata"
          :opt="tableOpt"
          :columns="columns"
          @cell-mouse-enter="hoverRow"
          @cell-mouse-leave="leaveRow"
            >
            <template slot="fid" slot-scope="scope">
              <div v-show="selectIndex !== scope.$index">{{scope.$index+1}}</div>
              <div v-show="selectIndex === scope.$index">
                <el-button type="text" class="tableActionBtn el-icon-fant-addition_fill" @click="e=>addRow(e,scope.$index)"></el-button>
                <confirm msg="是否删除该项记录？" @call-back="delRow(scope.$index)">
                    <el-button type="text" class="tableActionBtn el-icon-fant-delete_fill" style="color:red;"></el-button>
                </confirm>
              </div>
            </template>
            <template slot="goodsCode" slot-scope="scope">
            <table-form :scope="scope" prop="goodsId">
              <div class="fant-td" v-if="!scope.row.editKey['goodsId']" @click="e=>editCell(e,'goodsId',scope.$index)">{{scope.row.goodsCode || '&nbsp;'}}</div>
              <fant-select v-if="scope.row.editKey['goodsId']" placeholder="选择货品" :data="[]" :opt="rowOpt.goodsCode" @blur="saveCell('goodsId',scope.$index)" v-model="scope.row.goodsId"></fant-select>
            </table-form>
          </template>
          <template slot="inWareHouseName" slot-scope="scope">
            <table-form :scope="scope" prop="inWareHouseId">
              <div class="fant-td" v-if="!scope.row.editKey['inWareHouseId']" @click="e=>editCell(e,'inWareHouseId',scope.$index)">{{scope.row.inWareHouseName || '&nbsp;'}}</div>
              <cascader v-if="scope.row.editKey['inWareHouseId']" placeholder="选择仓库" :data="[]" :opt="rowOpt.warehouse" @blur="saveCell('inWareHouseId',scope.$index)" v-model="scope.row.inWareHouseId"></cascader>
            </table-form>
          </template>
          <template slot="goodsSpecName" slot-scope="scope">
            <table-form :scope="scope" prop="goodsSpecId">
              <div class="fant-td" v-if="!scope.row.editKey['goodsSpecId']" @click="e=>editCell(e,'goodsSpecId',scope.$index)">{{scope.row.goodsSpecName || '&nbsp;'}}</div>
              <fant-select v-if="scope.row.editKey['goodsSpecId']" placeholder="选择属性" @blur="saveCell('goodsSpecId',scope.$index)" :data="[]" :opt="rowOpt.spec" v-model="scope.row.goodsSpecId"></fant-select>
            </table-form>
          </template>
          <template slot="unitName" slot-scope="scope">
            <table-form :scope="scope" prop="unitId">
              <div class="fant-td" v-if="!scope.row.editKey['unitId']" @click="e=>editCell(e,'unitId',scope.$index)">{{scope.row.unitName || '&nbsp;'}}</div>
              <fant-select v-if="scope.row.editKey['unitId']" placeholder="选择单位" :data="[]" @blur="saveCell('unitId',scope.$index)" :opt="rowOpt.unit" v-model="scope.row.unitId"></fant-select>
            </table-form>
          </template>
          <template slot="quentity" slot-scope="scope">
            <table-form :scope="scope" prop="quentity">
              <div class="fant-td" v-if="!scope.row.editKey['quentity']" @click="e=>editCell(e,'quentity',scope.$index)">{{scope.row.quentity || '&nbsp;'}}</div>
              <el-input-number v-if="scope.row.editKey['quentity']" @blur="saveCell('quentity',scope.$index)" size="mini" :controls="false" v-model="scope.row.quentity" style="width:80%;"></el-input-number>
            </table-form>
          </template>
          <template slot="unitPrice" slot-scope="scope">
            <table-form :scope="scope" prop="unitPrice">
              <div class="fant-td" v-if="!scope.row.editKey['unitPrice']" @click="e=>editCell(e,'unitPrice',scope.$index)">{{scope.row.unitPrice || '&nbsp;'}}</div>
              <el-input-number v-if="scope.row.editKey['unitPrice']" size="mini" @blur="saveCell('unitPrice',scope.$index)" :controls="false" v-model="scope.row.unitPrice" style="width:80%;"></el-input-number>
            </table-form>
          </template>
          <template slot="type" slot-scope="scope">
            <table-form :scope="scope" prop="type">
              <div class="fant-td" v-if="!scope.row.editKey['type']" @click="e=>editCell(e,'type',scope.$index)">{{scope.row.type || '&nbsp;'}}</div>
              <div v-if="scope.row.editKey['type']"><el-input-number size="mini" @blur="saveCell('type',scope.$index)" :controls="false" v-model="scope.row.type" style="width:80%;"></el-input-number></div>
            </table-form>
          </template>
          <template slot="describe" slot-scope="scope">
            <div class="fant-td" v-if="!scope.row.editKey['describe']" @click="e=>editCell(e,'describe',scope.$index)">{{scope.row.describe || '&nbsp;'}}</div>
            <div v-if="scope.row.editKey['describe']"><el-input size="mini" @blur="saveCell('describe',scope.$index)" placeholder="输入备注" v-model="scope.row.describe"></el-input></div>
          </template>
          <div slot="append" style="padding:0 20px;border-bottom:1px solid #ddd;">
            <el-button type="text" icon="el-icon-fant-add" @click="addRow"></el-button>
          </div>
        </fant-table>
    <!--</el-row>-->
    <el-row style="margin-top:10px;">
      <fant-form-item :opt="{prop:'describe',labelWidth:'0px'}" style="width:100%;">
        <el-input type="textarea" :rows="2" :resize="'none'" v-model="editData.describe" placeHolder="备注" style="width:100%;"></el-input>
      </fant-form-item>
    </el-row>
    <el-row>
      <el-col :span="6">
      <fant-form-item class="inputItem" :opt="{label:'原始单号：',prop:'voucherCode'}">
      <el-input v-model="editData.voucherCode" placeHolder="原始单号" style="width:100%;"></el-input>
      </fant-form-item>
      </el-col>
      <el-col :span="6">
      <fant-form-item class="inputItem" :opt="{label:'计划入仓日期：',prop:'endDate'}">
      <datebox v-model="editData.endDate" :opt="endDateOpt" style="width:100%;"></datebox>
      </fant-form-item>
      </el-col>
      <el-col :span="6">
      <fant-form-item class="inputItem" :opt="{label:'入仓仓库：',prop:'inWareHouseId'}">
      <cascader
      :opt="casOpt"
      @change="myclose"
      v-model="editData.inWareHouseId" style="width:100%;">
      </cascader>
      </fant-form-item>
      </el-col>
      <el-col :span="6">
      <fant-form-item class="inputItem" :opt="{label:'部门：'}">
      {{editData.deptName}}
      </fant-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <fant-form-item class="inputItem" :opt="{label:'供应商编号：'}">
          {{editData.supplierCode}}
        </fant-form-item>
      </el-col>
      <el-col :span="6">
        <fant-form-item class="inputItem" :opt="{label:'合计金额：'}">
          {{editData.totalAmount}}
        </fant-form-item>
      </el-col>
    </el-row>
    <el-row class="warehouseFooter">
      <div class="footer">
        <el-button type="primary" class="fant-action-btn">保存</el-button>
        <el-button type="primary" class="fant-action-btn">付款</el-button>
        <el-button type="info" class="fant-action-btn">费用详情</el-button>
        <el-button type="warning" class="fant-action-btn">复制</el-button>
      </div>
    </el-row>
  </div>
  </fant-form>
  </div>
</template>

<script>
  import Vue from "vue";
  import valid from '@/lib/fant-validate';
  export default {
    name:"putInStorageEdit",
    watch:{
      show:function(){
        this.editShow = this.show;
      }
    },
    data(){
      return{
        selectIndex:"",
        rowRules:{
          goodsId: [
            { required: true, message: '请选择货品', trigger: 'change' }
          ],
          inWareHouseId: [
            { required: true, message: '请选择仓库', trigger: 'change' }
          ]
        },
        rowOpt:{
          goodsCode:{
          },
          warehouse:{
          },
          spec:{
          },
          unit:{
          }
        },
        inputHeight:"30px",
        editShow:this.show,
        mydata:[],
        editData:{
          billDate:"",
          inMemberId:"",
          inWareHouseId:[]
        },
        tableOpt:{
          height:"calc(100% - 230px)",
          showSummary:true
        },
        casOpt:{
//          url:"storehouses/getTreeOfEnable",
          changeOnSelect:true
        },
        columns:[
          {prop:"fid",label:" ",minWidth:"40",renderHeader:function(h, { column, $index }){
            return h("i",{
              'class': {
                 'el-icon-fant-setup': true
              },
              style:{
                'font-size':'20px',
                cursor:"pointer"
              },
              on: {
                click: this.clickSetting
              }
            })
          }},
          {prop:"goodsCode",label:"编号",minWidth:"100",rules:[
            { required: true, message: '请选择货品', trigger: 'change' }
          ]},
          {prop:"goodsName",label:"货品名称",minWidth:"150"},
          {prop:"inWareHouseName",label:"仓库",minWidth:"100",rules:[
            { required: true, message: '请选择仓库', trigger: 'change' }
          ]},
          {prop:"goodsSpecName",label:"属性",minWidth:"100"},
          {prop:"unitName",label:"单位",minWidth:"100"},
          {prop:"quentity",label:"数量",minWidth:"100"},
          {prop:"unitPrice",label:"单价",minWidth:"100",money:true},
          {prop:"type",label:"金额",minWidth:"100",money:true},
          {prop:"describe",label:"备注",minWidth:"120"}
        ],
        editDateOpt:{
          prompt:"单据日期"
        },
        endDateOpt:{
          prompt:"计划入仓日期"
        },
        infoBtnClass:"el-icon-fant-unfold rotate0 hideBtn miniBtn",
        boxHide:0,
        supOpt:{
          width:"90%",
          textField:"name",
          idField:"fid",
          prompt:"供应商",
//          url:"supplier/vagueSearch?showDisable=0&searchSize=8",
          columns:[
            {name:"编号",width:20,key:"code"},
            {name:"供应商",width:20,key:"name"},
          ],
          remote:true,
          filterable:true
        },
        memOpt:{
          width:"90%",
          textField:"username",
          idField:"fid",
          prompt:"采购员",
//          url:"member/vagueSearch",
          columns:[
            {name:"人员",width:20,key:"username"},
            {name:"编号",width:20,key:"userCode"},
          ],
          remote:true,
          filterable:true
        },
        wareData:[]
      }
    },
    mounted:function(){
      var vm = this;
//      this.$http.get("storehouses/getTreeOfEnable").then(function(re){
//        vm.wareData = re.body.length>0?re.body[0].children:[];
//      });
    },
    updated:function(){
      console.log("传入的FID："+this.fid);
    },
    methods:{
      myclose:function(val){
        console.log(val);
      },
      close:function(){
        window.$vueParentEl.winShow=false;
        this.$router.push("/main/putInStorage");
      },
      addRow(e,index){
        if(typeof index === "undefined"){
            this.mydata.push({action:"",goodsId:"",goodsCode:"",inWarehouseId:"",editKey:{}});
        }else{
            this.mydata.splice(index+1,0,{action:"",goodsId:"",goodsCode:"",inWarehouseId:"",editKey:{}})
        }
      },
      editCell(e,name,index){
        this.$set(this.mydata[index].editKey,name,true);
        var parent = e.target.parentNode;
        this.$nextTick(()=>{
          this.$keyHandler(parent);
          if(this.$getEl(".row"+index+"-"+name).length > 0) {
            this.$getEl(".row" + index + "-" + name)[0].getElementsByTagName("input")[0].focus();
          }else{
            parent.getElementsByTagName("input")[0].focus();
          }
        });
      },
      delRow(index){
        this.mydata.splice(index,1);
//          console.log(this.mydata)
      },
      cancelRow(){

      },
      saveCell(name,index){
        var vm = this;
        if(this.$getEl(".row"+index+"-"+name).length == 0){
          this.$set(vm.mydata[index].editKey,name,false);
          return false;
        }
        var el = this.$getEl(".row"+index+"-"+name)[0].$vueEl;
        el.$children[0].validate(function(valid) {
          if (valid) {
            vm.$set(vm.mydata[index].editKey,name,false);
          } else {
            return false;
          }
        });
      },
      hoverRow(row, column, cell, event){
        var parent = cell.parentNode;
        var parents = parent.parentNode.getElementsByTagName("tr");
        var index = Vue.fromArray(parents).indexOf(parent);
        this.selectIndex = index;
      },
      leaveRow(row, column, cell, event){
        this.selectIndex = "";
      },
      save(){
        var a = this.$fromArray(this.$getEl(".fant-table-form"));
        a.map(function(i){
          var el = i.$vueEl;
          el.$children[0].validate(function(valid) {
            if (valid) {
              //todo
            } else {
              var content = i.getElementsByClassName("el-form-item__content");
              if(content.length !=0 && content[0].getElementsByTagName("input").length === 0){
                content[0].childNodes[0].click();
              }
              return false;
            }
          });
        });

      }
    }
  }
</script>
