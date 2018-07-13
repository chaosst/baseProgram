<style>
  .userPop{
    background:#f5f5f5;
    width:260px;
  }
</style>
<style scoped>
  .layout{
    background: #f5f5f5;
    position: relative;
    overflow: hidden;
    width:100%;
    height:100%;
    min-height:600px;
  }
  .layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }
  .layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }
  .header{
    text-align: right; font-size: 12px;background-color: #fff;
    -webkit-transition: all .5s cubic-bezier(0, 1, 0.5, 1);
    transition: all .5s cubic-bezier(0, 1, 0.5, 1);
  }
  .meanList{
    height:calc(100% - 250px);
  }
  .meanList ul{
    list-style:none;
    padding:0;
    margin:0;
  }
  .meanList ul li{
    height:50px;
    padding:0 10px;
    color:#fff;
    line-height:50px;
  }
  .meanList ul li:hover{
    background:#fff;
    color:#010e1f;
  }
  .meanList ul li i{
    margin-right:10px;
  }
  .meanPop label{
    font-weight:bolder;
    padding:20px 0;
    width:100%;
    float:left;
    text-align:center;
  }
  .meanPop ul{
    list-style:none;
    padding:0;
    text-align:center;
  }
  .meanPop ul li{
    width:80px;
    padding:10px 10px;
    cursor:pointer;
  }
  .managePop ul li{width:auto;}
  .meanPop ul li:hover{
    color:#010e1f;
  }
  .headerBtnBox{
    height:100%;
  }
  .headerBtn{
    font-size:22px;
    padding:0;
    float: right;
  }
  .mybadge{
    float: right;
    margin-top:15px;
    margin-right:40px;
  }
  .userBox{
    display:inline-block;height:100%;cursor:pointer;float:right;
  }
  .userBox .headPic{
    width:26px;
    height:26px;
    border-radius:50%;
    margin-top:12px;
    display:inline-block;
    float:left;
  }
  .userBox .name{
    line-height:50px;
    padding:0 10px;
    display:inline-block;
    font-size:16px;
    float:left;
    max-width:50px;
    font-weight:bold;
  }
  .userBox .moreInfo{
    font-size:16px;
    height:100%;
    float: right;
  }
  .userTop{
    padding:10px 0;
    height:40px;
    float:left;
    width:100%;
  }
  .userTop .headPic{
    margin:0 0 0 20px;
    width:40px;
    height:40px;
    border-radius:50%;
    display:inline-block;
    float:left;
  }
  .userTop .right{
    width:calc(100% - 80px);
    margin-left:20px;
    float:left;
  }
  .userTop .name{
    line-height:20px;
    font-size:16px;
    float:left;
    width:100%;
    overflow:hidden;
    font-weight:bold;
  }
  .userTop .company{
    line-height:20px;
    font-size:14px;
    color:#959595;
    float:left;
    width:100%;
  }
  .userPop ul {
    padding:0;
    margin:0;
  }
  .userPop li {
    text-align: center;
    list-style:none;
    width:30%;
    display:inline-block;
    cursor:pointer;
  }
  .userPop li i{
    font-size:46px;
  }
  .userPop li span{
    width:100%;
    padding:5px 0;
    color:#959595;
    display: inline-block;
  }
  .userPop li:hover{
    background-color:#0366d6;
  }
  .userPop li:hover i,.userPop li:hover span{
    color:#fff;
  }
  .tabs{
    border-top:1px solid #ddd;
    height:35px;
    background:#fff;
  }
  .inIframe{
   
    width:calc(100% - 10px);height:calc(100% - 35px);overflow:auto;
    border:0;margin-left:10px;
  }
  .fullScreen{
    background:#3e97f3;
    width:100%;
    height:35px;
    border-radius:0;
    cursor:pointer;
    text-align:center;
    color:#267bd5;
    line-height:35px;
    font-size:14px;
  }
  .fullScreen:hover{
    background:#9ec8f5;
  }
  .tabs >>>.el-tabs__item {
    padding: 0 20px 0 20px !important;
    height: 35px;
    line-height: 35px;
    border-right:1px solid #ddd;
  }
  .tabs >>> .el-tabs__active-bar{
    display:none;
  }
  .tabs >>> .el-tabs__nav-wrap::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: #ddd;
    z-index: 1;
  }
  .tabs >>> .el-tabs__item.is-active {
    border-bottom:2px solid #409EFF;
  }
  .tabs >>> #tab-action{
    padding:0 !important;
    background:#eee;
    height:34px;
    cursor:pointer;
  }
  .tabs >>> #tab-action:hover{
    opacity:0.8;
  }
  .recommend{
    position: relative;
    height: 200px;
    text-align:left;
    color:#0a579d;
    font-size:14px;
  }
  .recommend .line{
    width:80%;
    margin-left:10%;
    height:2px;
    border-radius:50%;
    background:#0a579d;
    margin-bottom:10px;
  }
  .recommend .title{
    margin-left:10px;
    font-size:14px;
    color:#fff;
  }
  .recommend .title i{
    font-size:24px;
  }
  .recommend .content ul{
    text-align:left;
  }
  .recommend .content li{
    cursor:pointer;
    margin-top:5px;
  }
  .recommend .content li:hover{
    color:#fff;
  }
  .recommendMean ul li{
    width:calc(100% - 24px);
  }
  .shortMean li{
    text-align:center;
  }
  .shortMean li i{
    margin-right:0 !important;
  }
  .shortTitle{
    cursor:pointer;
    margin-left:0 !important;
    text-align:center;
  }
  .shortTitle:hover{
    background:#fff;
    color:#000;
  }
  .aside{
    overflow:hidden;
    -webkit-transition: width 0.5s;
    -moz-transition: width 0.5s;
    -o-transition: width 0.5s;
    transition: width 0.5s;
  }
</style>
<template>
  <div class="layout" id="indexBox">
    <el-container style="height:100%;">
      <el-header class="header" :style="{'max-height':headerHeight+'px'}">
        <el-collapse-transition>
          <el-row style="height:100%;" v-show="nofullscreen">
            <el-col :span="6" style="text-align:left;color:#fff;font-size:30px;height:100%;line-height:100%;">
              logo
            </el-col>
            <el-col :span="18" style="text-align:right;height:100%;">
              <div class="headerBtnBox">
                <div class="userBox" v-popover:userInfo>
                  <img src="~assets/images/pic.jpg" class="headPic" /><span class="name">chao</span>
                  <el-button type="text" icon="el-icon-fant-unfold" class="moreInfo" title="更多信息"></el-button>
                </div>
                <!--<el-button type="text" class="headerBtn" style="margin-top:15px;margin-right:40px;" icon="el-icon-fant-offline" @click="signOut" title="退出系统"></el-button>-->
                <el-badge :value="102" :max="99" class="mybadge">
                  <el-button type="text" class="headerBtn" icon="el-icon-fant-remind" @click="tabOpen('消息','/main/message')" title="信息"></el-button>
                </el-badge>
                <el-button type="text" class="headerBtn" style="margin-top:15px;margin-right:40px;" icon="el-icon-fant-customerservice" title="客服信息"></el-button>
              </div>
            </el-col>
          </el-row>
        </el-collapse-transition>
      </el-header>
      <el-popover ref="userInfo" placement="bottom" popper-class="userPop" trigger="click" style="background:#f5f5f5;">
        <div class="userTop">
          <img src="~assets/images/pic.jpg" class="headPic" />
          <div class="right">
            <div class="name">{{user.name}}</div>
            <div class="company">佛山市蠢材科技</div>
          </div>
        </div>
        <ul>
          <li @click="userLink(1)"><i class="el-icon-fant-mine"></i><span>个人设置</span></li>
          <li @click="userLink(2)"><i class="el-icon-fant-lock"></i><span>修改密码</span></li>
          <li @click="userLink(3)"><i class="el-icon-fant-createtask"></i><span>帮助文档</span></li>
          <li><i class="el-icon-fant-barrage"></i><span>切换账套</span></li>
        </ul>
      </el-popover>
      <el-container>
        <el-aside class="aside" :width="nofullscreen?'150px':'50px'" style="background-color: #2f94fe">
          <div class="fullScreen" @click="fullScreen">|&nbsp;&nbsp;|&nbsp;&nbsp;|</div>
          <div :class="nofullscreen?'meanList':'meanList shortMean'">
            <ul>
              <li v-popover:popover1><i class="el-icon-fant-order"></i><span v-show="nofullscreen">进销存</span></li>
              <li><i class="el-icon-fant-setup"></i><span v-show="nofullscreen">设置</span></li>
              <li v-popover:managePop><i class="el-icon-fant-order"></i><span v-show="nofullscreen">平台</span></li>
            </ul>
          </div>
          <div class="recommend" :style="{width:nofullscreen?'150px':'50px'}">
            <div class="line"></div>
            <div class="title" v-show="nofullscreen"><i class="el-icon-fant-praise flipx" style=""></i><span>为你推荐</span></div>
            <div class="title shortTitle" v-popover:recommend v-show="!nofullscreen"><i class="el-icon-fant-praise flipx" style=""></i></div>
            <div class="content" v-show="nofullscreen">
              <ul>
                <li>采购入库</li>
                <li>采购订单</li>
                <li>采购出库</li>
                <li>采购退货</li>
              </ul>
            </div>
          </div>
          <el-popover ref="recommend" placement="right-start" popper-class="meanPop recommendMean" trigger="hover">
            <el-row>
                <ul>
                  <li>采购入库</li>
                  <li>采购订单</li>
                  <li>采购出库</li>
                  <li>采购退货</li>
                </ul>
            </el-row>
          </el-popover>
          <el-popover ref="popover1" placement="right-start" popper-class="meanPop" trigger="hover">
            <el-row>
              <el-col :span="8">
                <label>采购</label>
                <ul>
                  <li @click="tabOpen('采购入库','/main/putInStorage')">采购入库</li>
                  <li>采购订单</li>
                  <li>采购出库</li>
                  <li>采购退货</li>
                </ul>
              </el-col>
              <el-col :span="8">
                <label>销售</label>
                <ul>
                  <li>销售报价</li>
                  <li>销售订单</li>
                  <li>销售出货</li>
                  <li>销售退货</li>
                </ul>
              </el-col>
              <el-col :span="8">
                <label>仓库</label>
                <ul>
                  <li>调仓单</li>
                  <li>盘点单</li>
                  <li>报损单</li>
                </ul>
              </el-col>
            </el-row>
          </el-popover>
          <el-popover ref="managePop" placement="right-start" popper-class="meanPop managePop" trigger="hover">
            <el-row>
              <el-col>
                <label>平台管理</label>
                <ul>
                  <li @click="tabOpen('服务管理','/main/platformManage')">服务管理</li>
                  <li>资源管理</li>
                  <li>平台设置</li>
                  <li>平台日志</li>
                  <li>通用角色管理</li>
                </ul>
              </el-col>
            </el-row>
          </el-popover>
        </el-aside>
        <el-main class="mainBox" style="padding:0;overflow:hidden;">
          <el-tabs v-model="tabsValue" @tab-remove="removeTab" @tab-click="tabClick" class="tabs">
            <el-tab-pane :key="key" v-for="(item, key) in tabs" :label="item.title" :name="key" :closable="item.closable" :src="item.path">
              <span slot="label" v-if="key==='index'"><i class="el-icon-fant-homepage"></i> 首页</span>
            </el-tab-pane>
            <el-tab-pane key="action" name="action" disabled style="padding:0;">
                <span slot="label">
                  <el-dropdown trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                      <i class="el-icon-fant-unfold" style="padding:10px 6px;"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="1">关闭</el-dropdown-item>
                      <el-dropdown-item command="2">关闭其他</el-dropdown-item>
                      <el-dropdown-item command="3">关闭全部</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </span>
            </el-tab-pane>
          </el-tabs>
          <iframe name="inIframe" class="inIframe" src="/main"></iframe>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        tabs:{
          index:{
            title: '首页',
            path:"/main/index"
          }
        },
        user:{
          name:"chao",
        },
        tabsValue:"index",
        tabHeight:0,
        a:[
          {src:"ss.jpg",top:"100px",left:"200px"},
          {src:"ss.jpg",top:"100px",left:"200px"}
        ],
        oldTabVal:"index",
        headerHeight:50,
        nofullscreen:true
      }
    },
    methods:{
      $child:function(){
        return window.frames["inIframe"].$vueEl.$children[0];
      },
      tabClick(tab, e){
        this.$child().$router.push(tab.$attrs.src);
      },
      handleCommand(command){
        if(command == 1){
          this.removeTab(this.tabsValue);
        }else if(command == 2){
          this.removeAll(false);
        }else if(command == 3){
          this.removeAll(true);
        }
      },
      removeTab(targetName) {
        var vm = this,activeName = vm.tabsValue;
        if (targetName !== "index" && activeName === targetName) {
          var tabsArr = Object.entries(vm.tabs);
          tabsArr.forEach(function(tab, index){
            if (tab[0] === targetName) {
              var nextTab = tabsArr[index + 1] || tabsArr[index - 1];
              if (nextTab) {
                activeName = nextTab[0];
                vm.$child().$router.push( nextTab[1].path);
              }
            }
          });
        }
        vm.tabsValue = activeName;
        delete vm.tabs[targetName];
        vm.$arrayRemove(vm.$child().mytabs,targetName);
      },
      removeAll(bool){
        var activeName = this.tabsValue;
        if(bool){
          this.tabs = {
            index:{
              title: '首页',
              path:"/main/index"
            }
          };
          this.$child().mytabs = ["index"];
          this.tabsValue = "index";
          this.$child().$router.push("/main/index");
        }else{
          var currentTab = this.tabs[activeName];
          this.tabs = {
            index:{
              title: '首页',
              path:"/main/index"
            }
          };
          this.tabs[activeName] = currentTab;
          this.$child().mytabs = ["index",activeName];
        }
      },
      tabOpen:function(title,url,param){
        var vm = this,name='';
        if(!param) param=null;
        vm.$child().$router.push({path:url,query:param},function(router){
          name = router.matched[router.matched.length-1].components.default.name;
          vm.$child().mytabs.push(name);
          vm.tabsValue = name;
          vm.tabs[name] = {
            title: title,
            closable:true,
            path:url
          };
        });
        var $pop = vm.$getEl(".meanPop")
        for(var i=0; i<$pop.length; i++){
          $pop[i].style["display"] = "none";
        }
      },
      userLink(tips){
        this.tabOpen('个人信息','/main/userInfo',{tips:tips});
      },
      fullScreen(){
        this.nofullscreen = !this.nofullscreen;
        this.headerHeight = Math.abs(this.headerHeight-50);
      }
    },
    mounted:function(){
    }
  }
</script>

