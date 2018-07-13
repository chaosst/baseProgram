<style scoped>
  #userInfoBox{
  }
  .left{
    display:inline-block;
    float:left;
    width:120px;
    height: 100%;
  }
  .right{
    display:inline-block;
    float:left;
    width:calc(100% - 120px);
  }
  .mean{
    margin:10px 5px;
    border:1px solid #e1e4e8;
    background:#fff;
    font-size:13px;
    border-radius:5px;
    height:50%;
  }
  .meanTitle {
    font-weight:600;
    background:#f3f5f8;
    width:calc(100% - 10px);
    border-bottom:1px solid #e1e4e8;
    color:#586069;
    padding:5px;
    border-top-left-radius:5px;
    border-top-right-radius:5px;
  }
  .mean a{
    width:calc(100% - 10px);
    display:inline-block;
    border-bottom:1px solid #e1e4e8;
    padding:5px;
    cursor:pointer;
  }
  .select{
    font-weight:600;
  }
  .title{
    padding:10px 10px 5px;
    font-size:18px;
    border-bottom:1px solid #e1e4e8;
  }
  .headPic{
    padding:10px 40px;
    text-align:center;
  }
  .headPic img{
    border-radius:10px;
    width:100%;
  }
  .setting{
    padding:10px;
  }
</style>
<template>
  <div id="userInfoBox" v-cloak class="iframeBox">
    <div class="left">
      <nav class="mean">
        <div class="meanTitle">个人设置</div>
        <a :class="linkTips == 1?'select':''" @click="linkTips = 1">基础资料</a>
        <a :class="linkTips == 2?'select':''" @click="linkTips = 2">修改密码</a>
        <a :class="linkTips == 3?'select':''" @click="linkTips = 3">帮助文档</a>
      </nav>
    </div>
    <div class="right">
      <div v-if="linkTips == 1">
      <el-row class="title">基础资料</el-row>
      <el-row>
        <el-col :span="19" class="setting">
          <fant-form ref="userForm" :model="userData" :opt="formOpt">
            <el-row>
              <el-col :span="12">
                <fant-form-item :opt="{label:'姓名：',prop:'username'}">
                  <el-input v-model="userData.username"></el-input>
                </fant-form-item>
              </el-col>
              <el-col :span="12">
                <fant-form-item :opt="{label:'性别：',prop:'sex'}">
                  <el-radio-group v-model="userData.sex">
                    <el-radio label="1">男</el-radio>
                    <el-radio label="2">女</el-radio>
                  </el-radio-group>
                </fant-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <fant-form-item :opt="{label:'手机：',prop:'phone'}">
                  <el-input v-model="userData.phone"></el-input>
                </fant-form-item>
              </el-col>
              <el-col :span="12">
                <fant-form-item :opt="{label:'邮箱：',prop:'email'}">
                  <el-input v-model="userData.email"></el-input>
                </fant-form-item>
              </el-col>
            </el-row>
            <el-row>
                <fant-form-item :opt="{label:'地址：',prop:'address'}">
                  <el-input v-model="userData.address"></el-input>
                </fant-form-item>
            </el-row>
            <el-row style="text-align:center;padding:20px 0;">
              <el-button type="primary" @click="saveUserInfo" size="mini">保存</el-button>
              <el-button type="info" @click="reset" size="mini">重置</el-button>
            </el-row>
          </fant-form>
        </el-col>
        <el-col :span="5">
          <div class="headPic">
            <img src="~assets/images/pic.jpg" />
            <el-button type="primary" size="mini">修改头像</el-button>
          </div>
        </el-col>
      </el-row>
      </div>
      <div v-if="linkTips==2">
        <el-row class="title">修改密码</el-row>
        <fant-form :model="pwdData" :opt="pwdFormOpt" style="width:500px;display: inline-block;margin-top:10px;margin-left: calc(50% - 250px);">
          <el-row>
            <fant-form-item :opt="{label:'原始密码：',prop:'oldPassword'}">
              <el-input v-model="pwdData.oldPassword" type="password"></el-input>
            </fant-form-item>
          </el-row>
          <el-row>
            <fant-form-item :opt="{label:'新密码：',prop:'password'}">
              <el-input v-model="pwdData.password" type="password"></el-input>
            </fant-form-item>
          </el-row>
          <el-row>
            <fant-form-item :opt="{label:'重新输入密码：',prop:'validPassword'}">
              <el-input v-model="pwdData.validPassword" type="password"></el-input>
            </fant-form-item>
          </el-row>
          <el-row style="text-align:center;padding:20px 0;">
            <el-button type="primary" @click="savePwd" size="mini">保存修改</el-button>
          </el-row>
        </fant-form>
      </div>
      <div v-if="linkTips==3">
        <el-row class="title">帮助文档</el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import valid from '@/lib/fant-validate';
  export default {
    name:"userInfo",
    data () {
      var vm = this;
      var validatePass = (rule, value, callback) => {
        if (value !== vm.pwdData.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        linkTips:this.$route.query.tips?this.$route.query.tips:"1",
        oldUserData:{},
        userData:{
          username:"",
          sex:"1",
          phone:"",
          email:"",
          address:""
        },
        formOpt:{
          rules:{
            username: [
              { required: true, message: '请输入账号名', trigger: 'change' }
            ],
            sex: [
              { required: true, message: '请选择性别', trigger: 'change' }
            ]
          }
        },
        pwdData:{
          oldPassword:"",
          password:"",
          validPassword:""
        },
        pwdFormOpt:{
          labelWidth:"150px",
          rules:{
            oldPassword: [
              { required: true, message: '请输入原始密码', trigger: 'change' }
            ],
            password: [
              { required: true, message: '请输入新密码', trigger: 'change' }
            ],
            validPassword: [
              { required: true, message: '请重新输入密码', trigger: 'change' },
              { validator: validatePass , trigger: 'change' }
            ]
          }
        },
      }
    },
    methods:{
      saveUserInfo(){
        var vm = this;
        this.$refs["userForm"].$children[0].validate(function(valid){
          if (valid) {
            //Todo:ajax
          } else {
            return false;
          }
        });
      },
      reset(){
        this.userData = this.$deepCopy(this.oldUserData);
      },
      savePwd(){
        var vm = this;
        this.$refs["pwdForm"].$children[0].validate(function(valid){
          if (valid) {
            //Todo:ajax
          } else {
            return false;
          }
        });
      }
    },
    mounted(){
      this.oldUserData = this.$deepCopy(this.userData);
    }
  }
</script>
