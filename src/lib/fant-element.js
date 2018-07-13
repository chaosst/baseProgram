import Vue from 'vue';
import tree from "@/components/tree";
import treebox from "@/components/treebox";
import easyConfirm from "@/components/easyConfirm";

var keyHandler = function(target){
  if(!target){
    return false;
  }
  var selected="";
  var row="";
  var index="";
  var field="";
  var panel="";
  var id=target.id;
  panel=target;
  var item = panel.getElementsByTagName("input")[0];
  if(item.focusEvent){
    item.removeEventListener("focus",item.focusEvent)
  }
  item.addEventListener("focus",item.focusEvent = function(e){
    selected=this;
    row=this.closest("tr");
  });
  if(panel.keydownEvent){
    panel.removeEventListener("keydown",panel.keydownEvent);
  }
  panel.addEventListener("keydown",panel.keydownEvent = function(e){
    switch (e.keyCode) {
      case 37: // left
        if(selected){
          var ed="";
          ed=getLastField(row,target,selected);
          if(ed){
            var form = ed.getElementsByClassName("fant-table-form");
            var clickDiv="",input="";
            if(ed.getElementsByTagName("input").length > 0){
              input = ed.getElementsByTagName("input")[0];
            }else if(form.length > 0){
              clickDiv = form[0].getElementsByClassName("el-form-item__content")[0].childNodes[0];
            }else{
              clickDiv = ed.getElementsByClassName("cell")[0].childNodes[0];
            }
            //延迟聚焦下一个input，修复选择组件回车不聚焦下一个input的问题
            setTimeout(function(){
              if(selected.vueEl){
                if(selected.vueEl.$el.className.indexOf("el-date-editor")!= -1){//修复日期控件切换焦点后不选择下拉框不消失的问题
                  var today = Vue.fromArray(Vue.getEl(".today"));
                  for(let item of today.values()){
                    var a = item.closest(".el-date-picker");
                    if(a.isHidden()){
                      continue;
                    }
                    item.click();
                    break;
                  }
                }
                selected.vueEl.$children[0].blur();
                selected.blur();
              }
              if(input != ""){
                if(input.vueEl){
                  input.vueEl.$children[0].focus();
                }else{
                  input.focus();
                }
              }else{
                clickDiv.click();
              }
            },100);
          }
        }
        break;

      case 38: // up
        if(selected){
          var ed="";
          ed=getUpField(row,target,selected);
          if(ed){
            var form = ed.getElementsByClassName("fant-table-form");
            var clickDiv="",input="";
            if(ed.getElementsByTagName("input").length > 0){
              input = ed.getElementsByTagName("input")[0];
            }else if(form.length > 0){
              clickDiv = form[0].getElementsByClassName("el-form-item__content")[0].childNodes[0];
            }else{
              clickDiv = ed.getElementsByClassName("cell")[0].childNodes[0];
            }
            //延迟聚焦下一个input，修复选择组件回车不聚焦下一个input的问题
            setTimeout(function(){
              if(selected.vueEl){
                if(selected.vueEl.$el.className.indexOf("el-select")!= -1 || selected.vueEl.$el.className.indexOf("el-cascader")!= -1 || selected.vueEl.$el.className.indexOf("el-date-editor")!= -1){
                  return false;
                }
                selected.vueEl.$children[0].blur();
                selected.blur();
              }
              if(input != ""){
                if(input.vueEl){
                  input.vueEl.$children[0].focus();
                }else{
                  input.focus();
                }
              }else{
                clickDiv.click();
              }
            },100);
          }
        }
        break;

      case 39: // right
        if(selected){
          var ed="";
          ed=getNextField(row,target,selected);
          if(ed){
            var form = ed.getElementsByClassName("fant-table-form");
            var clickDiv="",input="";
            if(ed.getElementsByTagName("input").length > 0){
              input = ed.getElementsByTagName("input")[0];
            }else if(form.length > 0){
              clickDiv = form[0].getElementsByClassName("el-form-item__content")[0].childNodes[0];
            }else{
              clickDiv = ed.getElementsByClassName("cell")[0].childNodes[0];
            }
            //延迟聚焦下一个input，修复选择组件回车不聚焦下一个input的问题
            setTimeout(function(){
              if(selected.vueEl){
                if(selected.vueEl.$el.className.indexOf("el-date-editor")!= -1){//修复日期控件切换焦点后不选择下拉框不消失的问题
                  var today = Vue.fromArray(Vue.getEl(".today"));
                  for(let item of today.values()){
                    var a = item.closest(".el-date-picker");
                    if(a.isHidden()){
                      continue;
                    }
                    item.click();
                    break;
                  }
                }
                selected.vueEl.$children[0].blur();
                selected.blur();
              }
              if(input != ""){
                if(input.vueEl){
                  input.vueEl.$children[0].focus();
                }else{
                  input.focus();
                }
              }else{
                clickDiv.click();
              }

            },100);
          }
        }
        break;
      case 40: // down
        if(selected){
          var ed="";
          ed=getDownField(row,target,selected);
          if(ed){
            var form = ed.getElementsByClassName("fant-table-form");
            var clickDiv="",input="";
            if(ed.getElementsByTagName("input").length > 0){
              input = ed.getElementsByTagName("input")[0];
            }else if(form.length > 0){
              clickDiv = form[0].getElementsByClassName("el-form-item__content")[0].childNodes[0];
            }else{
              clickDiv = ed.getElementsByClassName("cell")[0].childNodes[0];
            }
            //延迟聚焦下一个input，修复选择组件回车不聚焦下一个input的问题
            setTimeout(function(){
              if(selected.vueEl){
                if(selected.vueEl.$el.className.indexOf("el-select")!= -1 || selected.vueEl.$el.className.indexOf("el-cascader")!= -1 || selected.vueEl.$el.className.indexOf("el-date-editor")!= -1){
                  return false;
                }
                selected.vueEl.$children[0].blur();
                selected.blur();
              }
              if(input != ""){
                if(input.vueEl){
                  input.vueEl.$children[0].focus();
                }else{
                  input.focus();
                }
              }else{
                clickDiv.click();
              }
            },100);
          }
        }
        break;
      case 13: // enter 需求变更
        if(selected){
          var ed="";
          ed=getNextField(row,target,selected);
          if(ed){
            var form = ed.getElementsByClassName("fant-table-form");
            var clickDiv="",input="";
            if(ed.getElementsByTagName("input").length > 0){
              input = ed.getElementsByTagName("input")[0];
            }else if(form.length > 0){
              clickDiv = form[0].getElementsByClassName("el-form-item__content")[0].childNodes[0];
            }else{
              clickDiv = ed.getElementsByClassName("cell")[0].childNodes[0];
            }
            //延迟聚焦下一个input，修复选择组件回车不聚焦下一个input的问题
            setTimeout(function(){
              if(selected.vueEl){
                if(selected.vueEl.$el.className.indexOf("el-date-editor")!= -1){//修复日期控件切换焦点后不选择下拉框不消失的问题
                  var today = Vue.fromArray(Vue.getEl(".today"));
                  for(let item of today.values()){
                    var a = item.closest(".el-date-picker");
                    if(a.isHidden()){
                      continue;
                    }
                    item.click();
                    break;
                  }
                }
                selected.vueEl.$children[0].blur();
                selected.blur();
              }
              if(input != ""){
                if(input.vueEl){
                  input.vueEl.$children[0].focus();
                }else{
                  input.focus();
                }
              }else{
                clickDiv.click();
              }
            },100);
          }
        }
        break;
    }
  });
}

//获取指定行的编辑列
function getEdFields(row){
  if(row){
    var tds=row.getElementsByTagName("td");
    var edFields=[];
    Vue.fromArray(tds).forEach(function(item, index){
      if(item.getElementsByClassName("cell")[0].childNodes.length>0 && item.getElementsByClassName("cell")[0].innerHTML!=""){
        edFields.push(item);
      }
    });
    return edFields;
  }
}
//获取下一个编辑框
//参数 target:列表对象
function getNextField(row,target,selected){
  var result="";
  var listTarget="";
  if(!target){
    return false;
  }
  listTarget=target;
  var edFields=getEdFields(row);
  var selected_ = selected.closest("td");
  for(var i in edFields){
    var item = edFields[i];
    var index = parseInt(i);
    if(item === selected_ && index+1<edFields.length){
      result=edFields[index+1];
      if(!result){
        return false;
      }
      if(result.getAttribute("disabled") && (result.getAttribute("disabled")=='disabled'|| result.getAttribute("disabled")==true)){
        result=getLastField(row,result);
      }
      return result;
    }else if(item === selected_ && i+1>=edFields.length){
      var nextRow=row.nextSibling.length!=0?row.nextSibling:null;
      var fields="";
      if(nextRow){
        fields=getEdFields(nextRow);
        result=fields[0];
        if(result.getAttribute("disabled") && (result.getAttribute("disabled")=='disabled'|| result.getAttribute("disabled")==true)){
          result=getLastField(nextRow,result);
        }
        return result;
      }
    }
  }
}
//获取上一个编辑框
//参数 target:列表对象
function getLastField(row,target,selected){
  var edFields=getEdFields(row);
  var result="";
  var listTarget="";
  if(!target){
    return false;
  }
  listTarget=target;
  var selected_ = selected.closest("td");
  for(var i in edFields){
    var item = edFields[i];
    var index = parseInt(i);
    if(item === selected_ && index-1>=0){
      result=edFields[index-1];
      if(result.getAttribute("disabled") && (result.getAttribute("disabled")=='disabled'|| result.getAttribute("disabled")==true)){
        result=getLastField(row,result);
      }
      return result;
    }else if(item === selected_ && index-1<0){
      var lastRow=row.previousSibling;
      var fields="";
      if(lastRow){
        fields=getEdFields(lastRow);
        result=fields[fields.length-1];
        if(result.getAttribute("disabled") && (result.getAttribute("disabled")=='disabled'|| result.getAttribute("disabled")==true)){
          result=getLastField(lastRow,result);
        }
        return result;
      }
    }
  }
}
//获取上一行编辑框
//参数 target:列表对象
function getUpField(row,target,selected){
  var edFields=getEdFields(row);
  var selected_ = selected.closest("td");
  var oindex = Vue.indexOfArray(edFields,selected_);
  var lastRow="";
  var fields="";
  var listTarget="";
  if(!target){
    return false;
  }
  listTarget=target;
  lastRow = row;
  while(lastRow.previousSibling){
    lastRow = lastRow.previousSibling;
    // if(lastRow.getElementsByTagName("input").length==0){
    //   lastRow.getElementsByClassName("editBtn")[0].click();
    // }
    fields=getEdFields(lastRow);
    if(fields&&fields.length>0){
      return fields[oindex];
    }
  }
}
//获取下一行编辑框
//参数 target:列表对象
function getDownField(row,target,selected){
  var edFields=getEdFields(row);
  var selected_ = selected.closest("td");
  var oindex = Vue.indexOfArray(edFields,selected_);
  var listTarget="";
  if(!target){
    return false;
  }
  listTarget=target;
  var nextRow="";
  var fields="";
  nextRow = row;
  while(nextRow.nextSibling.length != 0){
    nextRow = nextRow.nextSibling;
    // if(nextRow.getElementsByTagName("input").length==0){
    //   nextRow.getElementsByClassName("editBtn")[0].click();
    // }
    fields=getEdFields(nextRow);
    if(fields&&fields.length>0){
      return fields[oindex];
    }
  }
}
/*
 * element框架的封装js
 */
var elementTemp = {
  //弹窗封装
  windowDom : {
    data:function() {
      return {
        visible: this.show,
      };
    },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      opt: {
        type: Object,
        required:true
      },
      beforeClose:{
        type: Object
      }
    },
    watch: {
      show:function () {
        this.visible = this.show;
      },
    },
    methods:{
      handleClose:function(done){
        this.$emit('update:show', false);
        if(typeof this.beforeClose == "function"){
          this.beforeClose(done);
        }else{
          done();
        }
      },
      open:function(){
        this.$emit('open');
      },
      close:function(){
        this.$emit('close');
      }
    },
    created:function(){
      var s = this.opt;
      if(s.size){
        if(s.size === "large"){
          s.width = "100%";s.fullscreen = true;
        }else if(s.size === "small"){
          s.width = "50%";s.fullscreen = false;
        }else if(s.size === "middle"){
          s.width = "70%";s.fullscreen = false;
        }
      }
      var opt_ = {
        title:s.title?s.title:"提示",
        width:s.width?s.width:"50%",
        modalAppendToBody:typeof s.modalAppendToBody === "boolean"?s.modalAppendToBody:true,
        closeonclickmodal:false,
        closeonpressescape:false
      };
      Object.assign(this.opt, this.opt, opt_);
    },
    mounted:function(){
      var height = !this.opt.height?"50%":this.opt.height;
      if(this.opt.size && this.opt.size === "small"){
        height = "50%";
      }else if(this.opt.size && this.opt.size === "middle"){
        height = "70%";
      }else if(this.opt.size && this.opt.size === "large"){
        height = "100%";
      }
      var elDialog = this.$el.getElementsByClassName("el-dialog")[0];
      elDialog.style.height = height;
      if(typeof this.opt.header === "boolean" && !this.opt.header){
        elDialog.getElementsByClassName("el-dialog__header")[0].style.display = "none";
      }
      setTimeout(function(){
        var header = elDialog.getElementsByClassName("el-dialog__header")[0].clientHeight;
        var $f = elDialog.getElementsByClassName("el-dialog__header");
        var footer = $f.length == 0?0:$f[0].clientHeight;
        if(elDialog.getElementsByClassName("el-dialog__body").length!=0) {
          elDialog.getElementsByClassName("el-dialog__body")[0].style.height = "calc(100% - " + (header + footer + 60) + "px)";
          elDialog.getElementsByClassName("el-dialog__body")[0].style.overflow = "auto";
        }
      },300);
    },
    template:'<el-dialog ref="elWin" @open="open" @close="close" :modal-append-to-body="opt.modalAppendToBody" :close-on-click-modal="opt.closeonclickmodal" :close-on-press-escape="opt.closeonpressescape" :visible.sync="visible" :fullscreen="opt.fullscreen" :width="opt.width" :before-close="handleClose"><span slot="title" class="dialog-title"><slot name="title">{{opt.title}}</slot></span><slot></slot><span v-if="opt.footer" slot="footer" class="dialog-footer"><slot name="footer"></slot></span></el-dialog>',
  }	,
  //日期下拉选择框封装
  dateDom : {
    data:function(){
      return {
        mytime:this.value,
        rangeCuts: [{
          text: '最近一周',
          onClick:function(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick:function(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick:function(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }],
        pickerCuts: [{
          text: '今天',
          onClick:function(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick:function(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick:function(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      }
    },
    props: {
      opt: {
        type: Object,
        required:true
      },
      value:{
        type: String,
        default:""
      }
    },
    watch:{
      value:function(){
        this.mytime = this.value;
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    methods:{
      updateValue: function (value) {
        this.$emit('change',value);
      },
      focus: function (e) {
        this.$emit('focus',e);
      },
      blur: function (e) {
        this.$emit('blur',e);
      }
    },
    created:function(){
      this.opt.type = this.opt.type?this.opt.type:"date";
      this.opt.valueFormat = this.opt.valueFormat?this.opt.valueFormat:"yyyy-MM-dd";
      var shortcuts = (this.opt.type === "date" || this.opt.type === "datetime")?this.pickerCuts:(this.opt.type === "daterange" || this.opt.type === "datetimerange")?this.rangeCuts:[];
      if(!this.opt.pickerOptions){
        this.opt.pickerOptions={};
        this.opt.pickerOptions.shortcuts=shortcuts;
      }else if(typeof this.opt.pickerOptions === "object" && !this.opt.pickerOptions.shortcuts){
        this.opt.pickerOptions.shortcuts=shortcuts;
      }
    },
    mounted:function(){
      var $input = this.$el.getElementsByTagName("input")[0];
      //将vue对象绑定在input里面
      $input.vueEl = this;
    },
    template:'<el-date-picker :style="{width:opt.width,height:opt.height}" v-model="mytime" @blur="blur" @focus="focus" @change="updateValue" :readonly="opt.readonly" :disabled="opt.disabled" :editable="opt.editable" :type="opt.type" :placeholder="opt.prompt" :clearable="opt.clearable" :size="opt.size?opt.size:\'small\'" :format="opt.format" :popper-class="opt.popperClass" :picker-options="opt.pickerOptions" :default-value="opt.defaultValue" :clear-icon="opt.clearIcon" :prefix-icon="opt.prefixIcon" :value-format="opt.valueFormat" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>'
  },
  //级联下拉选择框封装
  cascaderDom : {
    data:function(){
      return {
        myvalue:this.value,
        //定义url接口的返回数据参数名,data为空时，直接取返回对象,为next的时候，直接取树的下一级数据
        dataProp:this.opt.dataProp?this.opt.dataProp:{data:""},
      }
    },
    props: {
      opt: {
        type: Object,
        required:true
      },
      data:{
        type:Array,
        default:function(){
          return [];
        }
      },
      beforeFilter:{
        type: Function
      },
      value:{
        type: Array,
        default:function(){
          return [];
        }
      }
    },
    watch:{
      value:function(){
        this.myvalue = this.value;
      }
    },
    methods:{
      change: function (value) {
        this.$emit('change',value);
      },
      focus: function (e) {
        this.$emit('focus',e);
      },
      blur: function (e) {
        this.$emit('blur',e);
      },
      activeItemChange:function(arr){
        this.$emit('active-item-change',arr);
      },
      reload:function(data){
        if(!this.opt.url){
          return false;
        }
        data = data || {};
        var vm = this;
        Vue.ajax({
          url:this.opt.url,
          method:this.opt.method?this.opt.method:"post",
          data:data,
          success:function(re){
            if(vm.dataProp.data == ""){
              Vue.set(vm,"data",re);
            }else{
              Vue.set(vm,"data",re[vm.dataProp.data]);
            }
          }
        });
      }
    },
    created:function(){
      this.opt.props = typeof this.opt.props === "object"?this.opt.props:{value:"id",label:"text"};
      this.opt.width = typeof this.opt.width === "string"?this.opt.width:typeof this.opt.width === "number"?this.opt.width+"px":"200px";
      this.opt.height = typeof this.opt.height === "string"?this.opt.height:typeof this.opt.height === "number"?this.opt.height+"px":null;
      //设置url后，data会失效
      if(this.opt.url && typeof this.opt.url === "string") {
        this.reload();
      }
    },
    template:'<el-cascader :style="{width:opt.width,height:opt.height}" :options="data" v-model="myvalue" :props="opt.props" :popper-class="opt.popperClass" :placeholder="opt.prompt" :disabled="opt.disabled" :clearable="opt.clearable" :expand-trigger="opt.expandTrigger?opt.expandTrigger:\'click\'" :show-all-levels="opt.showAllLevels" :filterable="opt.filterable" :change-on-select="opt.changeOnSelect" :size="opt.size?opt.size:\'small\'" :before-filter="beforeFilter" @change="change" @active-item-change="activeItemChange" @blur="blur" @focus="focus"></el-cascader>'
  },
  //下拉选择框封装
  selectDom : {
    data:function(){
      return {
        //定义url接口的返回数据参数名,data为空时，直接取返回对象
        dataProp:this.opt.dataProp?this.opt.dataProp:{data:""},
        oldVal:"",
      }
    },
    props: {
      opt: {
        type: Object,
        default:function(){
          return {};
        }
      },
      data:{
        type:Array,
        default:function(){
          return [];
        }
      },
      localSearch:{
        type: Function
      },
      value:{
        type: String,
        default:""
      }
    },
    methods:{
      updateValue: function (value) {
        this.$emit('input',value);
      },
      change: function (value) {
        this.$emit('change',value);
      },
      focus: function (e) {
        this.$emit('focus',e);
      },
      blur: function (e) {
        this.$emit('blur',e);
      },
      clear: function () {
        this.$emit('clear');
      },
      visibleChange: function (bool) {
        this.$emit('visible-change',bool);
      },
      removeTag: function (value) {
        this.$emit('remove-tag',value);
      },
      remoteSearch:function(query){
        var vm = this;
        if(this.opt.remote && this.oldVal != query){
          var key = "searchKey";
          if(typeof this.searchKey === "string"){
            key = this.searchKey;
          }
          var data={};
          this.oldVal = query;
          data[key] = query;
          this.reload(data);
        }
      },
      reload:function(data){
        if(!this.opt.url){
          return false;
        }
        data = data || {};
        var vm = this;
        Vue.ajax({
          url:this.opt.url,
          method:this.opt.method?this.opt.method:"post",
          data:data,
          success:function(re){
            if(vm.dataProp.data == ""){
              Vue.set(vm,"data",re);
            }else{
              Vue.set(vm,"data",re[vm.dataProp.data]);
            }
          }
        });
      }
    },
    created:function(){
      var s = this.opt;
      if(typeof s.columns == "object"){
        this.opt.panelWidth = typeof this.opt.panelWidth == "string"?this.opt.panelWidth:typeof this.opt.panelWidth == "number"?this.opt.panelWidth+"px":"500px";
        var sum = 0;
        for(var i in s.columns){
          s.columns[i].width = s.columns[i].width?s.columns[i].width:10;
          sum += s.columns[i].width;
        }
        for(var i in this.opt.columns){
          this.opt.columns[i].width = s.columns[i].width/sum*100;
        }
      }
      var opt_ = {
        width:typeof s.width == "string"?s.width:typeof s.width == "number"?s.width+"px":null,
        filterable:typeof s.filterable != "undefined"?s.filterable:true,
      };
      Object.assign(this.opt, this.opt, opt_);
    },
    mounted:function(){
      var panel = this.$el.getElementsByClassName("el-popper")[0];
      panel.style.width = this.opt.panelWidth;
      //设置url后，data会失效
      if(this.opt.url && typeof this.opt.url === "string") {
        this.reload();
      }
      var $input = this.$el.getElementsByTagName("input")[0];
      //将vue对象绑定在input里面
      $input.vueEl = this;
    },
    template:'<el-select :disabled="opt.disabled" :style="{width:opt.width,height:opt.height}" :name="opt.name" :remote="opt.remote" :clearable="opt.clearable" :size="opt.size?opt.size:\'small\'" :value="value" @change="change" @focus="focus" @blur="blur"  @visible-change="visibleChange" @remove-tag="removeTag" @clear="clear" @input="updateValue" :multiple="opt.multiple" popper-class="selectMain" :filterable="opt.filterable" :filter-method="localSearch" :remote-method="remoteSearch" :placeholder="opt.prompt"><el-option :disabled="true" value="0" v-if="opt.columns"><span v-for="val in opt.columns" :style="{ display: \'inline-block\',width: val.width + \'%\' }">{{val.name}}</span></el-option><el-option :disabled="item.disabled" v-for="item in data" :label="item[opt.textField]" :value="item[opt.idField]"><span :style="{ display: \'inline-block\',width: val.width + \'%\' }" v-for="val in opt.columns">{{item[val.key]}}</span></el-option></el-select>',
  },
  //form封装
  formDom : {
    props: {
      opt: {
        type: Object,
        default:function(){
          return {};
        }
      },
      model:{
        type: Object
      }
    },
    methods:{
      validate: function (prop, valid) {
        this.$emit('validate', prop, valid);
      }
    },
    created:function(){
      if(typeof this.opt === "object"){
        this.opt.labelPosition = this.opt.labelPosition?this.opt.labelPosition:"right";
        this.opt.labelWidth = this.opt.labelWidth?this.opt.labelWidth:"120px";
      }
    },
    mounted(){
      this.$el.$vueEl = this;
    },
    template:'<el-form :model="model" :label-position="opt.labelPosition" :label-width="opt.labelWidth" :rules="opt.rules" :inline="opt.inline" :label-suffix="opt.labelSuffix" :show-aaa="opt.showMessage" :inline-message="opt.inlineMessage" :status-icon="opt.statusIcon" :size="opt.size?opt.size:\'small\'" @validate="validate"><slot></slot></el-form>'
  },
  //formItem封装
  formItemDom : {
    props: {
      opt: {
        type: Object,
        default: function () {
          return {};
        }
      },
    },
    created:function(){
      if(typeof this.opt === "object"){
        this.opt.label = this.opt.label?this.opt.label:"";
      }
    },
    mounted(){
      this.$el.getElementsByClassName("el-form-item__content")[0].style.width = this.$el.style.width;
    },
    template:'<el-form-item :label="opt.label" :prop="opt.prop" :label-width="opt.labelWidth" :required="opt.required" :rules="opt.rules" :error="opt.error" :show-aaa="opt.showMessage" :inline-aaa="opt.inlineMessage" :size="opt.size?opt.size:\'small\'"><slot></slot></el-form-item>'
  },
  //用于表格的编辑行
  tableFormDom : {
    data:function(){
      var vm = this;
      var columns = this.$parent.$parent.$parent.columns;
      var rules_={};
      columns.map(function(i){
        if(i.prop == vm.scope.column.property){
          rules_[vm.prop] = i.rules?i.rules:[];
        }
      });
      return {
        rules: rules_
      }
    },
    props: {
      scope: {
        type: Object,
        required:true
      },
      prop:{
        type:String,
        required:true
      }
    },
    template:'<fant-form :model="scope.row" :class="\'row\'+scope.$index+\'-\'+prop+\' fant-table-form\'" :opt="{rules:rules,inlineMessage:true}"><el-form-item :prop="prop"><slot></slot></el-form-item></fant-form>'
  },
  //table封装
  tableDom : {
    data:function(){
      return {
        mydata:this.data,
        //定义url接口的分页参数名
        pageProp:this.opt.page && this.page.pageProp?this.page.pageProp:{pageSize:"rows",currentPage:"page"},
        //定义url接口的返回数据参数名
        dataProp:this.opt.dataProp?this.opt.dataProp:{data:"rows",total:"total"},
      }
    },
    props: {
      opt: {
        type: Object,
        default:function(){
          return {};
        }
      },
      columns: {
        type: Array,
        required:true
      },
      page: {
        type: Object,
        default:function(){
          return {};
        }
      },
      data:{
        type: Array,
        default:function(){
          return [];
        }
      }
    },
    methods:{
      currentChange: function (currentRow, oldCurrentRow) {
        this.$emit('current-change', currentRow, oldCurrentRow);
      },
      select:function(selection, row){
        this.$emit('select', selection, row);
      },
      selectAll:function(selection){
        this.$emit('select-all', selection);
      },
      selectionChange:function(selection){
        this.$emit('selection-change', selection);
      },
      cellMouseEnter:function(row, column, cell, event){
        this.$emit('cell-mouse-enter', row, column, cell, event);
      },
      cellMouseLeave:function(row, column, cell, event){
        this.$emit('cell-mouse-leave', row, column, cell, event);
      },
      cellClick:function(row, column, cell, event){
        this.$emit('cell-click', row, column, cell, event);
      },
      cellDblclick:function(row, column, cell, event){
        this.$emit('cell-dblclick', row, column, cell, event);
      },
      rowClick:function(row, event, column){
        this.$emit('row-click', row, event, column);
      },
      rowContextmenu:function(row, event){
        this.$emit('row-contextmenu', row, event);
      },
      rowDblclick:function(row, event){
        this.$emit('row-dblclick', row, event);
      },
      sortChange:function(opt){
        this.$emit('sort-change', opt);
      },
      headerDragend:function(newWidth, oldWidth, column, event){
        this.$emit('header-dragend', newWidth, oldWidth, column, event);
      },
      nextClick:function(page){
        this.$emit('next-click', page);
      },
      prevClick:function(page){
        this.$emit('prev-click', page);
      },
      sizeChange:function (pagesize) {
        Vue.set(this.page,"pageSize",pagesize);
        Vue.set(this.page,"currentPage",1);
        if(this.opt.url){
          var page_ = {};
          page_[this.pageProp.currentPage] = 1;
          page_[this.pageProp.pageSize] = pagesize;
          this.reload(page_);
        }
        this.$emit('size-change', pagesize);
      },
      pageChange:function (page) {
        Vue.set(this.page,"currentPage",page);
        if(this.opt.url){
          var page_ = {};
          page_[this.pageProp.currentPage] = page;
          page_[this.pageProp.pageSize] = this.page.pageSize;
          this.reload(page_);
        }
        this.$emit('page-change', page);
      },
      getSummaries:function(param) {
//	  	          const { columns, data } = param;
        const vm = this;
        const columns = param.columns,data = param.data;
        const sums = [];
        columns.forEach(function(column, index){
          if (index === 0) {
            sums[index] = '总计';
            return;
          }
//	  	              const values = data.map(item => Number(item[column.property]));
          const values = data.map(function(item){
            return Number(item[column.property]);
          });
          if (!values.every(function(value){return isNaN(value)})) {
            sums[index] = values.reduce(function(prev, curr){
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            if(vm.columns[index].money && vm.columns[index].money===true){
              sums[index]=vm.formatMoney(sums[index]);
            }
            //状态特例
            if(column.property == "recordStatus"){
              sums[index] = "";
            }
          } else {
            sums[index] = '';
          }
        });
        return sums;
      },
      refresh:function(){
        var page_ = {};
        page_[this.pageProp.currentPage] = this.page.currentPage;
        page_[this.pageProp.pageSize] = this.page.pageSize;
        this.reload(page_);
      },
      reload:function(data){
        if(!this.opt.url){
          return false;
        }
        data = data || {};
        var vm = this;
        Vue.ajax({
          url:this.opt.url,
          method:this.opt.method?this.opt.method:"post",
          data:data,
          success:function(re){
            if(vm.dataProp.data == ""){
              Vue.set(vm,"mydata",re);
            }else{
              Vue.set(vm,"mydata",re[vm.dataProp.data]);
            }
            Vue.set(vm.page,"total",re[vm.dataProp.total]);
          }
        });
      }
    },
    created:function(){
      if(typeof this.page == "object"){
        this.page.pageSize = typeof this.page.pageSize === "string" || typeof this.page.pageSize === "number"?this.page.pageSize:10;
        this.page.total = typeof this.page.total === "string" || typeof this.page.total === "number"?this.page.total:0;
        this.page.currentPage = typeof this.page.currentPage === "string" || typeof this.page.currentPage === "number"?this.page.currentPage:1;
        this.page.ref = typeof this.page.ref === "boolean"?this.page.ref:true;
        //若不设置url，则分页的刷新按钮不显示
        if(typeof this.opt.url === "undefined"){
          this.page.ref = false;
        }
      }
      if(typeof this.opt == "object"){
        this.opt.width = typeof this.opt.width === "string" || typeof this.opt.width === "number"?this.opt.width:"100%";
        // this.opt.height = typeof this.opt.height === "string" || typeof this.opt.height === "number"?this.opt.height:"500px";
        typeof this.opt.height === "number"?this.opt.height=this.opt.height+"px":null;
        typeof this.opt.cellStyle === "object"?(this.opt.cellStyle = Vue.assign({overflow:'hidden'},this.opt.cellStyle)):null;
        this.opt.stripe = typeof this.opt.stripe === "boolean"?this.opt.stripe:true;
        this.opt.rowClassName = this.opt.rowClassName?this.opt.rowClassName:"";
        this.opt.cellClassName = this.opt.cellClassName?this.opt.cellClassName:"";
        this.opt.headerRowClassName = this.opt.headerRowClassName?this.opt.headerRowClassName:"";
        this.opt.headerCellClassName = this.opt.headerCellClassName?this.opt.headerCellClassName:"";
        this.opt.border = typeof this.opt.border === "boolean"?this.opt.border:true;
      }
    },
    mounted:function(){
      //设置url后，data会失效
      if(this.opt.url && typeof this.opt.url === "string"){
        this.reload();
      }
      if(this.$slots.append){
        this.$el.getElementsByClassName("el-table__empty-block")[0].style.display="none";
      }
    },
    updated(){
        if(this.$slots.append){
            this.$el.getElementsByClassName("el-table__empty-block")[0].style.display="none";
        }
    },
    template:'<div class="fantTable" :style="{height:opt.height,width:opt.width,position:\'relative\'}"><el-table ref="elTable" :sum-text="opt.sumText" tooltip-effect="dark" :cell-style="opt.cellStyle" :row-class-name="\'fant-table-row \'+opt.rowClassName" :cell-class-name="\'fant-table-cell \'+opt.cellClassName" :header-row-class-name="\'fant-table-header-row \'+opt.headerRowClassName" :header-cell-class-name="\'fant-table-header-cell \'+opt.headerCellClassName" @select="select" @select-all="selectAll" @selection-change="selectionChange" @cell-mouse-enter="cellMouseEnter" @cell-mouse-leave="cellMouseLeave" @cell-click="cellClick" @cell-dblclick="cellDblclick" @row-click="rowClick" @row-contextmenu="rowContextmenu" @row-dblclick="rowDblclick" @sort-change="sortChange" @header-dragend="headerDragend" :data="mydata" :size="opt.size?opt.size:\'small\'" :show-summary="opt.showSummary" :summary-method="getSummaries" :highlight-current-row="true" :border="opt.border" :stripe="opt.stripe" :height="opt.page?\'calc(100% - 40px)\':\'100%\'" :style="{width: opt.width}" @current-change="currentChange"><el-table-column v-if="opt.multiple" type="selection" width="55"></el-table-column><el-table-column v-for="(col, i) of columns" :type="col.type" :index="col.index" :resizable="col.resizable" align="center" header-align="center" :show-overflow-tooltip="true" :selectable="col.selectable" :reserve-selection="col.reserveSelection" :sort-by="col.sortBy" :render-header="col.renderHeader" :prop="col.prop" :label="col.label" :fixed="col.fixed" :sortable="col.sortable" :min-width="col.minWidth" :width="col.width"><template slot-scope="scope"><slot :name="col.prop" :row="scope.row" :column="scope.column" :$index="scope.$index">{{col.formatter?col.formatter(scope.row, scope.column, scope.row[col.prop]):typeof col.money === "boolean"&&col.money?formatMoney(scope.row[col.prop]):scope.row[col.prop]}}</slot></template></el-table-column><div slot="append" v-if="$slots.append"><slot name="append"></slot></div></el-table><el-pagination ref="elPagination" v-if="opt.page" background layout="total, sizes, prev, pager, next, jumper, slot" @size-change="sizeChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="page.pageSize" :total="page.total" @next-click="nextClick" @prev-click="prevClick" @current-change="pageChange"><div slot style="display:inline-block;"><el-button v-if="page.ref" type="primary" @click="refresh" plain icon="el-icon-fant-refresh"><slot name="pageSlot"></slot></el-button></div></el-pagination></div>'
  },
  //tooltip封装
  tipsDom : {
    props: {
      value: {
        type: String,
        required:true
      },
      theme:{
        type: String,
        default:"dark"
      }
    },
    template:'<el-tooltip class="item" :effect="theme" :content="value" placement="top"><slot></slot></el-tooltip>',
  }
}
var fantVueElement = {};
fantVueElement.install = function (Vue, options) {
  Vue.keyHandler = keyHandler;
  Vue.prototype.$keyHandler = keyHandler;
  //注入组件
  Vue.mixin({
    methods:{
      /**
       * 调用提示信息组件
       * @param s
       * title  -- 标题
       * msg -- 提示信息
       * buttonText -- 确认按钮文本
       * timeout -- 可设置自动消失的时间
       * fn -- 参数action，返回状态，回调函数
       * 其他属性继承element UI的MessageBox组件
       * @returns
       */
      alert:function(s){
        if(!s){
          return false;
        }
        s.dangerouslyUseHTMLString=true; //默认使用HTML片段
        var opt = {
          title:"提示",
          msg:"",
          confirmButtonText:s.buttonText?s.buttonText:'知道了',
          callback:function(action){
            typeof s.fn == "function"?eval(s.fn(action)):null;
            clearInterval(t1);
          }
        };

        Object.assign(opt,opt,s);
        if(typeof opt.timeout == "number"){
          var second = opt.timeout/1000;
          opt.msg = opt.msg+"<span class='opsTimeout' ref='opsTimeout'>"+second+"秒后关闭</span>";
          var t = second-1;
          var t1 =setInterval(function(){Vue.getEl(".opsTimeout")[0].innerHTML = (t--)+"秒后关闭";},1000);
          setTimeout(function(){
            clearInterval(t1);
            Vue.getEl(".el-aaa-box__wrapper")[0].getElementsByClassName('el-aaa-box__headerbtn')[0].click();
          },opt.timeout);
        }
        this.$alert(opt.msg, opt.title, opt);
      },
      /**
       * 调用确认提示信息组件
       * @param s
       * title  -- 标题
       * msg -- 提示信息
       * buttonText -- 确认按钮文本
       * cancelText -- 取消按钮文本
       * fn -- 参数action，返回状态，回调函数
       * 其他属性继承element UI的MessageBox组件
       * @returns
       */
      confirm:function(s){
        if(!s){
          return false;
        }
        s.dangerouslyUseHTMLString=true; //默认使用HTML片段
        var opt = {
          title:"提示",
          msg:"",
          confirmButtonText:s.buttonText?s.buttonText:'确认',
          cancelButtonText:s.cancelText?s.cancelText:'取消',
          callback:function(action){
            var a = action === "confirm"?1:0;
            typeof s.fn == "function"?eval(s.fn(a)):null;
          }
        };

        Object.assign(opt,opt,s);
        this.$confirm(opt.msg, opt.title, opt);
      },
      /**
       * 调用输入框提交提示信息组件
       * @param s
       * title  -- 标题
       * msg -- 提示信息
       * buttonText -- 确认按钮文本
       * cancelText -- 取消按钮文本
       * then -- 参数value，返回填写的数据，确认后的回调函数
       * cancel -- 参数 status,返回状态,取消后的回调函数
       * loadTime -- 毫秒，按确认后窗口关闭前显示loading图标等待关闭的时间
       * htmlUse -- boolean,msg是否使用html片段
       * 其他属性继承element UI的MessageBox组件
       * @returns
       */
      prompt:function(s){
        if(!s){
          return false;
        }
        var opt = {
          title:"提示",
          msg:"",
          confirmButtonText:s.buttonText?s.buttonText:'确认',
          dangerouslyUseHTMLString:typeof s.htmlUse == "boolean"?s.htmlUse:false,
          cancelButtonText:s.cancelText?s.cancelText:'取消',
          beforeClose: function(action, instance, done){
            if(typeof s.loadTime == "number"){
              if (action === 'confirm') {
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = '执行中...';
                setTimeout(function(){
                  if(typeof s.beforeClose == "function"){
                    eval(s.beforeClose(action, instance, done))
                  }else{
                    done();
                  }
                  setTimeout(function(){
                    instance.confirmButtonLoading = false;
                  }, 300);
                }, s.loadTime);
              }else {
                if(typeof s.beforeClose == "function"){
                  eval(s.beforeClose(action, instance, done))
                }else{
                  done();
                }
              }
            }else{
              if(typeof s.beforeClose == "function"){
                eval(s.beforeClose(action, instance, done))
              }else{
                done();
              }
            }
          }
        };
        if(s.beforeClose)delete s.beforeClose;
        Object.assign(opt,opt,s);
        this.$prompt(opt.msg, opt.title, opt).then(function(a){
          typeof s.then == "function"?eval(s.then(a.value)):null;
        }).catch(function(status){
          typeof s.cancel == "function"?eval(s.cancel(status)):null;
        });
      },
      /**
       * 调用自定义提示信息组件
       * @param s
       * title  -- 标题
       * msg -- 提示信息，可以是函数，返回显示内容，可以编写VNode,可以是html代码
       * buttonText -- 确认按钮文本
       * cancelText -- 取消按钮文本
       * then -- 参数status，返回状态，确认后的回调函数
       * cancel -- 参数 status,返回状态,取消后的回调函数
       * htmlUse -- boolean,msg是否使用html片段
       * loadTime -- 毫秒，按确认后窗口关闭前显示loading图标等待关闭的时间
       * 其他属性继承element UI的MessageBox组件
       * @returns
       */
      msgbox:function(s){
        if(!s){
          return false;
        }
        const h = this.$createElement; //引入vue的渲染组件
        var opt = {
          title:"消息",
          message:s.msg?typeof s.msg =="function"?eval(s.msg(h)):s.msg:'',
          confirmButtonText:s.buttonText?s.buttonText:'确认',
          showCancelButton: true,
          dangerouslyUseHTMLString:typeof s.htmlUse == "boolean"?s.htmlUse:false,
          cancelButtonText:s.cancelText?s.cancelText:'取消',
          beforeClose: function(action, instance, done){
            if(typeof s.loadTime == "number"){
              if (action === 'confirm') {
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = '执行中...';
                setTimeout(function(){
                  if(typeof s.beforeClose == "function"){
                    eval(s.beforeClose(action, instance, done))
                  }else{
                    done();
                  }
                  setTimeout(function(){
                    instance.confirmButtonLoading = false;
                  }, 300);
                }, s.loadTime);
              }else {
                if(typeof s.beforeClose == "function"){
                  eval(s.beforeClose(action, instance, done))
                }else{
                  done();
                }
              }
            }else{
              if(typeof s.beforeClose == "function"){
                eval(s.beforeClose(action, instance, done))
              }else{
                done();
              }
            }
          }
        };
        if(s.beforeClose)delete s.beforeClose;
        Object.assign(opt,opt,s);
        this.$msgbox(opt).then(function(a){
          typeof s.then == "function"?eval(s.then(a)):null;
        }).catch(function(status){
          typeof s.cancel == "function"?eval(s.cancel(status)):null;
        });
      },
      /**
       * 调用状态简略信息提示组件
       * @param s
       * msg -- 提示信息，可以是函数，返回显示内容，可以编写VNode,可以是html代码
       * timeout -- 毫秒，自动消失的时间，设置为0时不会消失
       * type -- 消息类型，success/warning/info/error
       * htmlUse -- boolean,msg是否使用html片段
       * close() -- 实例本身的方法，关闭提示框
       * 其他属性继承element UI的message组件
       * @returns
       */
      message:function(s){
        if(!s){
          return false;
        }
        if(typeof s == "string"){
          return this.$message(s);
        }else{
          const h = this.$createElement; //引入vue的渲染组件
          var opt = {
            message:s.msg?typeof s.msg =="function"?eval(s.msg(h)):s.msg:'',
            dangerouslyUseHTMLString:typeof s.htmlUse == "boolean"?s.htmlUse:false,
            duration:typeof s.timeout == "number"?s.timeout:3000,
          };
          Object.assign(opt,opt,s);
          return this.$message(opt);
        }
      }
    }
  })
  /**
   * 调用自定义组件
   */
  Vue.component("win",elementTemp.windowDom);
  Vue.component("datebox",elementTemp.dateDom);
  Vue.component("fantSelect",elementTemp.selectDom);
  Vue.component("cascader",elementTemp.cascaderDom);
  Vue.component("tips",elementTemp.tipsDom);
  Vue.component("fantTable",elementTemp.tableDom);
  Vue.component("fantForm",elementTemp.formDom);
  Vue.component("fantFormItem",elementTemp.formItemDom);
  Vue.component("tableForm",elementTemp.tableFormDom);
  Vue.component("tree",tree);
  Vue.component("treebox",treebox);
  Vue.component("confirm",easyConfirm);

  /**
   * 调用全局信息提示组件
   * @param s
   * title -- 提示信息的标题
   * msg -- 提示信息，可以是函数，返回显示内容，可以编写VNode,可以是html代码
   * timeout -- 毫秒，自动消失的时间，设置为0时不会消失，默认为0
   * type -- 消息类型，success/warning/info/error，默认为空
   * htmlUse -- boolean,msg是否使用html片段
   * onClose() -- 实例本身的方法，关闭提示框时的回调函数
   * onClick() -- 实例本身的方法，点击 Notification 时的回调函数
   * 其他属性继承element UI的Notification组件
   * @returns
   */
  Vue.prototype.$gobalMsg=function(s){
    if(!s){
      return false;
    }
    const h = this.$createElement; //引入vue的渲染组件
    var opt = {
      title:s.title?s.title:"系统提示",
      message:s.msg?typeof s.msg =="function"?eval(s.msg(h)):s.msg:'',
      dangerouslyUseHTMLString:typeof s.htmlUse == "boolean"?s.htmlUse:false,
      duration:typeof s.timeout == "number"?s.timeout:0,
    };
    Object.assign(opt,opt,s);
    return this.$notify(opt);
  }
}
export default fantVueElement;
