<style scoped>
  .elInput.el-input--prefix >>> .el-input__inner {
    padding-left: 85px;
  }
  .treebox{
    display: inline-block;
    position: relative;
  }
</style>
<template>
  <div>
      <el-popover
        placement="bottom"
        @show="show"
        @hide="hide"
        :width="opt.panelWidth"
        trigger="click">
        <el-tree ref="elTree" :check-strictly="true" :expand-on-click-node="true" :check-on-click-node="true" :style="{width:'100%',height:opt.panelHeight}" :data="data" :empty-text="opt.emptyText" :node-key="opt.nodeKey" :props="opt.props" :load="opt.load" :highlight-current="opt.highlightCurrent" :show-checkbox="opt.showCheckbox" :default-expand-all="opt.defaultExpandAll" :default-expanded-keys="opt.defaultExpandedKeys" :default-checked-keys="opt.defaultCheckedKeys" :filter-node-method="opt.filterNodeMethod?opt.filterNodeMethod:filterNode" :accordion="opt.accordion" :indent="opt.indent" :render-content="opt.renderContent" @check-change="checkChange" @node-contextmenu="nodeContextmenu" @check="check" @current-change="currentChange" @node-collapse="nodeCollapse" @node-expand="nodeExpand" @node-click="nodeClick"></el-tree>
        <el-input slot="reference" class="elInput" @change="change" @blur="blur" @focus="focus" @clear="clear" ref="elInput" v-model="text" :style="{width:opt.width}" :size="opt.size" :disabled="opt.disabled" :suffix-icon="opt.suffixIcon" :readonly="opt.readonly" :clearable="opt.clearable" :placeholder="opt.placeholder">
          <div slot="prefix" v-if="!multiple&&myvalue!=''&&label!=''" style="margin-top:4px;"><el-tag style="width:80px;overflow:hidden;" size="mini" :key="myvalue">{{label}}</el-tag></div>
        </el-input>
      </el-popover>
  </div>
</template>

<script>
  function getIndex(i,arr,prev,hidden){
    if(prev) {
      if (i < 0) {
        return 0;
      }
      var parent = arr[i].closest(".el-tree-node");
      if (parent.hasClass("is-hidden")) {
        return getIndex(i-1,arr,true);
      } else {
        return i;
      }
    }else{
      if (i >= arr.length && !hidden) {
        return arr.length-1;
      }else if(i >= arr.length && hidden){
        return -1;
      }
      var parent = arr[i].closest(".el-tree-node");
      if (parent.hasClass("is-hidden")) {
        if(hidden){
          return getIndex(i+1,arr,false,true);
        }else{
          return getIndex(i+1,arr);
        }
      } else {
        return i;
      }
    }
  }
  export default {
    data () {
      return {
        text: "",
        node:[],
        label:"",
        myvalue:this.value,
        multiple:typeof this.opt.multiple === "boolean" && this.opt.multiple,
        //定义url接口的返回数据参数名
        dataProp:this.opt.dataProp?this.opt.dataProp:{data:""},
      }
    },
    watch:{
      node(val){
        if(this.multiple){
          var arr = [];
          val.map(item => arr.push(item[this.opt.props.label]));
          this.text = arr.join(",");
        }else{
          this.label = val[0]?val[0][this.opt.props.label]:"";
        }
      },
      value:function(val){
        this.myvalue = this.value;
      },
      myvalue(val){
        if(this.multiple){
          if(val === ""){
            this.node = [];
          }else{
            this.node = this.$refs.elTree.getCheckedNodes();
          }
        }else{
          if(val === ""){
            this.$refs.elTree.setCurrentKey(null);
            this.node = [];
          }else{
            this.$refs.elTree.setCurrentKey(val);
            this.node = [this.$refs.elTree.getCurrentNode()];
          }
        }
      },
      text(val) {
        if(!this.multiple){
          this.$refs.elTree.filter(val);
        }
      }
    },
    model: {
      prop: 'value',
      event: 'current-change'
    },
    props:{
      value:{
        default:""
      },
      opt:{
        type:Object,
        default:function(){
          return {};
        }
      },
      data:{
        type:Array,
        default:function(){
          return [];
        }
      }
    },
    methods:{
      show(){
        var treePanel = this.$refs.elTree.$el;
        var options = treePanel.getElementsByClassName("el-tree-node__content");
        var arr = this.$fromArray(options);
        if(options.length>0){
          var s = treePanel.getElementsByClassName("treebox-selected");
          if(s.length>0){
            s[0].removeClass("treebox-selected");
          }
          var i = getIndex(0,arr,false,true);
          if(i != -1){
            options[i].addClass("treebox-selected");
          }
        }
        this.$emit('show');
      },
      hide(){
        this.$emit('hide');
      },
      change(value) {
        this.$emit('change',value);
      },
      focus(e) {
        this.$emit('focus',e);
      },
      blur(e) {
        this.$emit('blur',e);
      },
      clear() {
        if(this.multiple){
          this.myvalue = "";
          this.$refs.elTree.setCheckedKeys([]);
        }
        this.$emit('clear');
      },
      nodeClick(value,node,component){
        this.$emit('node-click',value,node,component);
      },
      nodeContextmenu(e,value,node,component){
        this.$emit('node-contextmenu',e,value,node,component);
      },
      checkChange(value,selected,subSelected){
        this.$emit('check-change',value,selected,subSelected);
      },
      check(value,selectedStatus){
        this.$emit('check',value,selectedStatus);
      },
      currentChange(value,node){
        if(this.multiple){
          var arr = this.$refs.elTree.getCheckedKeys();
          arr.push(value[this.opt.nodeKey]);
          this.myvalue = arr.join(",");
        }else{
          this.myvalue = value[this.opt.nodeKey];
        }
        var val = this.myvalue;
        this.$emit('current-change',val,value,node);
      },
      nodeExpand(value,node,component){
        this.$emit('node-expand',value,node,component);
      },
      nodeCollapse(value,node,component){
        this.$emit('node-collapse',value,node,component);
      },
      filterNode(value, data) {
        if (!value) return true;
        return data[this.opt.props.label].indexOf(value) !== -1;
      },
      findIndex(arr,obj){
        for(var i in arr){
          if(arr[i] === obj){
            return parseInt(i);
          }
        }
      },
      reload:function(data){
        if(!this.opt.url){
          return false;
        }
        data = data || {};
        var vm = this;
        this.$ajax({
          url:this.opt.url,
          method:this.opt.method?this.opt.method:"post",
          data:data,
          success:function(re){
            if(vm.dataProp.data == ""){
              vm.$set(vm,"data",re);
            }else{
              vm.$set(vm,"data",re[vm.dataProp.data]);
            }
          }
        });
      }
    },
    created(){
      this.opt.size = this.opt.size?this.opt.size:"small";
      this.opt.clearable = typeof this.opt.clearable === "boolean"?this.opt.clearable:true;
      this.opt.emptyText = this.opt.emptyText?this.opt.emptyText:"没有数据";
      this.opt.props = this.opt.props?this.opt.props:{children: 'children', label: 'label'};
      this.opt.nodeKey = this.opt.nodeKey?this.opt.nodeKey:"id";
      this.opt.defaultExpandAll = typeof this.opt.defaultExpandAll === "boolean"?this.opt.defaultExpandAll:true;

      this.opt.width = typeof this.opt.width === "string"?this.opt.width:typeof this.opt.width === "number"?this.opt.width+"px":null;
      this.opt.panelWidth = typeof this.opt.panelWidth === "string"?this.opt.panelWidth:typeof this.opt.panelWidth === "number"?this.opt.panelWidth+"px":null;
      this.opt.panelHeight = typeof this.opt.panelHeight === "string"?this.opt.panelHeight:typeof this.opt.panelHeight === "number"?this.opt.panelHeight+"px":null;
      this.opt.highlightCurrent = true;
      if(this.multiple){
        this.opt.highlightCurrent = false;
        this.opt.showCheckbox = true;
        this.opt.readonly = true;
      }
    },
    updated(){
      if(!this.multiple) {
        var treePanel = this.$refs.elTree.$el;
        var options = treePanel.getElementsByClassName("el-tree-node__content");
        var arr = this.$fromArray(options);
        if (options.length > 0) {
          var s = treePanel.getElementsByClassName("treebox-selected");
          if (s.length > 0) {
            s[0].removeClass("treebox-selected");
          }
          var i = getIndex(0, arr, false, true);
          if (i != -1) {
            options[i].addClass("treebox-selected");
          }
        }
      }
    },
    mounted(){
      //根据初始值选中节点
      if(this.multiple){
        var arr = this.value.split(",");
        this.$refs.elTree.setCheckedKeys(arr);
        this.node = this.$refs.elTree.getCheckedNodes();
      }else {
        this.$refs.elTree.setCurrentKey(this.value);
        this.node = [this.$refs.elTree.getCurrentNode()];
      }
      //由于控件原生的快捷键功能有缺陷，所以自定义了上下快捷键功能
      var vm = this;
      var $input = this.$refs.elInput.$el;
      var treePanel = this.$refs.elTree.$el;
      var options = treePanel.getElementsByClassName("el-tree-node__content");
      var arr = this.$fromArray(options);
      $input.addEventListener("keydown",function(e){
        var s = treePanel.getElementsByClassName("treebox-selected");
        if(s.length==0){
          return false;
        }
        var $current = s[0];
        var index = vm.findIndex(arr,$current);
        if(e.keyCode == 38){
          if(index > 0){
            var i = getIndex(index-1,arr,true);
            arr[i].addClass("treebox-selected");
            $current.removeClass("treebox-selected");
          }
        }else if(e.keyCode == 40){
          if(index < (options.length-1)){
            var i = getIndex(index+1,arr);
            arr[i].addClass("treebox-selected");
            $current.removeClass("treebox-selected");
          }
        }else if(e.keyCode == 13){
          $current.click();
        }else if(e.keyCode == 8){
          if(vm.text === ""){
            vm.value = "";
          }
        }
      });
      //设置url后，data会失效
      if(this.opt.url && typeof this.opt.url === "string") {
        this.reload();
      }
      //将vue对象绑定在tree控件的最外层div
      this.$el.$vueEl = this;
    }
  }
</script>
