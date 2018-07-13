<style scoped>
</style>
<template>
  <div>
    <el-input ref="elInput" v-model="filterText" :style="{width:opt.width}" :size="opt.inputSize" :disabled="opt.inputDisabled" :prefix-icon="opt.inputPrefixIcon" :suffix-icon="opt.inputSuffixIcon" :readonly="opt.inputReadonly" :clearable="opt.inputClearable" :placeholder="opt.inputPlaceholder"></el-input>
    <slot name="action"></slot>
    <el-tree ref="elTree" :style="{width:opt.width,height:opt.height}" :data="data" :empty-text="opt.emptyText" :node-key="opt.nodeKey" :props="opt.props" :load="opt.load" :highlight-current="true" :default-expand-all="opt.defaultExpandAll" :default-expanded-keys="opt.defaultExpandedKeys" :default-checked-keys="opt.defaultCheckedKeys" :filter-node-method="filterNode" :accordion="opt.accordion" :indent="opt.indent" :render-content="opt.renderContent" @check-change="checkChange" @node-contextmenu="nodeContextmenu" @check="check" @current-change="currentChange" @node-collapse="nodeCollapse" @node-expand="nodeExpand" @node-click="nodeClick"></el-tree>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        filterText: '',
        //定义url接口的返回数据参数名
        dataProp:this.opt.dataProp?this.opt.dataProp:{data:""},
      }
    },
    watch: {
      filterText(val) {
        this.$refs.elTree.filter(val);
      },
      opt(val){
        this.opt.inputSize = this.opt.inputSize?this.opt.inputSize:"mini";
        this.opt.inputPrefixIcon = this.opt.inputPrefixIcon?this.opt.inputPrefixIcon:"el-icon-search";
        this.opt.inputClearable = typeof this.opt.inputClearable === "boolean"?this.opt.inputClearable:true;
        this.opt.inputPlaceholder = this.opt.inputPlaceholder?this.opt.inputPlaceholder:"请输入进行过滤";
        this.opt.emptyText = this.opt.emptyText?this.opt.emptyText:"没有数据";
        this.opt.props = this.opt.props?this.opt.props:{children: 'children', label: 'label'};
        this.opt.nodeKey = this.opt.nodeKey?this.opt.nodeKey:"id";
        this.opt.defaultExpandAll = typeof this.opt.defaultExpandAll === "boolean"?this.opt.defaultExpandAll:true;

        this.opt.width = typeof this.opt.width === "string"?this.opt.width:typeof this.opt.width === "number"?this.opt.width+"px":"200px";
        this.opt.height = typeof this.opt.height === "string"?this.opt.height:typeof this.opt.height === "number"?this.opt.height+"px":null;
      }
    },
    props:{
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
        this.$emit('current-change',value,node);
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
      this.opt.inputSize = this.opt.inputSize?this.opt.inputSize:"small";
      this.opt.inputPrefixIcon = this.opt.inputPrefixIcon?this.opt.inputPrefixIcon:"el-icon-search";
      this.opt.inputClearable = typeof this.opt.inputClearable === "boolean"?this.opt.inputClearable:true;
      this.opt.inputPlaceholder = this.opt.inputPlaceholder?this.opt.inputPlaceholder:"请输入进行过滤";
      this.opt.emptyText = this.opt.emptyText?this.opt.emptyText:"没有数据";
      this.opt.props = this.opt.props?this.opt.props:{children: 'children', label: 'label'};
      this.opt.nodeKey = this.opt.nodeKey?this.opt.nodeKey:"id";
      this.opt.defaultExpandAll = typeof this.opt.defaultExpandAll === "boolean"?this.opt.defaultExpandAll:true;

      this.opt.width = typeof this.opt.width === "string"?this.opt.width:typeof this.opt.width === "number"?this.opt.width+"px":"200px";
      this.opt.height = typeof this.opt.height === "string"?this.opt.height:typeof this.opt.height === "number"?this.opt.height+"px":null;
    },
    mounted:function(){
      //设置url后，data会失效
      if(this.opt.url && typeof this.opt.url === "string") {
        this.reload();
      }
      //将vue对象绑定在tree控件的最外层div
      this.$el.$vueEl = this;
    },
  }
</script>
