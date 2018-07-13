<style scoped>
  #messageBox{
  }
  .toolsBar{
    border:1px #ebeef5 solid;
    background:#fff;
    padding:5px 20px;
    margin-bottom:10px;
  }
  .messageMain {
    border:1px solid #ebeef5;
    background:#fff;
    height:calc(100% - 100px);
    overflow:hidden;
  }
  .messageMain >>> .el-scrollbar__wrap{
    overflow-x:hidden;
  }
  .collapse{
    margin:10px;
  }
  .header-icon{
    font-size:20px;
    margin-top: 15px;
    float: left;
  }
  .msgBox .el-col div{
    margin-left:10px;
    display:inline-block;
  }
  .msgBox .info{
    text-align:center;
  }
  .msgBtn{
    float:right;
    margin-right:20px;
    padding:10px;
  }
  .moreInfo{
    width:100%;
    text-align:center;
    padding:10px 0;
    cursor:pointer;
  }
  .moreInfo i:before{
    color:#00BFFF;
    font-size:16px;
  }
</style>
<template>
  <div id="messageBox" v-cloak class="iframeBox">
    <el-row class="toolsBar">
      <el-col span="16">
          <el-button type="primary" plain size="small" @click="allMsg">全部</el-button>
          <el-button type="info" plain size="small" @click="task">事务</el-button>
          <el-button type="success" plain size="small" @click="message">消息</el-button>
          <el-button type="warning" plain size="small" @click="warning">预警</el-button>
      </el-col>
      <el-col span="8">
        <el-input placeholder="请搜索内容" style="width:60%;float:right;" size="small" suffix-icon="el-icon-fant-search"></el-input>
      </el-col>
    </el-row>
    <el-scrollbar class="messageMain">
      <el-collapse accordion class="collapse">
        <el-collapse-item>
          <template slot="title">
            <el-row class="msgBox">
              <el-col span="14">
                <i class="header-icon el-icon-fant-mail_fill"></i>
                <div>计划【123】中事件【A-1】已延迟办理，请及时处理。</div>
              </el-col>
              <el-col span="4" class="info">
                2018-05-02
              </el-col>
              <el-col span="4" class="info">
                chao
              </el-col>

            </el-row>
          </template>
          <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
          <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
          <div class="msgBtn">
            <el-button type="primary" size="small">完成</el-button>
            <el-button type="info" size="small">查看事件</el-button>
            <el-button type="warning" size="small">延迟</el-button>
          </div>
        </el-collapse-item>
        <el-collapse-item title="反馈 Feedback">
          <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
          <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
        </el-collapse-item>
        <el-collapse-item title="效率 Efficiency">
          <div>简化流程：设计简洁直观的操作流程；</div>
          <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
          <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
        </el-collapse-item>
        <div class="moreInfo"><i class="el-icon-fant-unfold">显示更多消息</i></div>
      </el-collapse>
    </el-scrollbar>
    <el-row>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </el-row>
    <el-button type="success" @click="show = true">help</el-button>
    <help :show="show" :photoOpt="picArr"></help>
  </div>
</template>

<script>
  import valid from '@/lib/fant-validate';
  export default {
    name:"message",
    data () {
      return {
        show:false,
        picArr:[
          {src:"aa.jpg"},
          {src:"bb.jpg"}
        ],
        data2: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
      }
    },
    methods:{
      task(e){
        //todo
      },
      allMsg(e){
        //todo
      },
      message(e){
        //todo
      },
      warning(e){
        //todo
      }
  }
  }
</script>
