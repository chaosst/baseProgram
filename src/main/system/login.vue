<style scoped>
  .box-card{
    width:70%;
    min-width:350px;
  }
  #loginBox{
    background:url(~assets/images/login.jpeg) center center no-repeat;
    background-size:100%;
    width:100%;
    height:100%;
  }
  #loginBox:before{
    content:"";
    background-color:grey;
    opacity: 0.3;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
  }
  .validCode {
    font-family:Arial;
    font-style:italic;
    font-weight:bold;
    height:26px;
    border:0;
    letter-spacing:2px;
    color:blue;
  }
  .btnBox{
    width:100%;
    margin:10px 0;
  }
</style>
<template>
  <div id="loginBox">
    <el-container>
      <el-header></el-header>
      <el-main>
        <div>
          <el-row style="margin-top:10%;">
            <el-col :span="16">
              &nbsp;
            </el-col>
            <el-col :span="8">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>登录</span>
                  <el-button style="float: right; padding: 3px 0" type="text" @click="signUp">注册</el-button>
                </div>
                <div>
                  <fant-form :model="fdata" :opt="formOpt" ref="loginForm" id="loginForm" v-enter style="float:left;">
                    <fant-form-item :opt="{prop:'username'}" class="inputItem">
                      <el-input placeholder="请输入用户名" id="userCode" v-model="fdata.username" name="username" prefix-icon="el-icon-fant-people"></el-input>
                    </fant-form-item>
                    <fant-form-item :opt="{prop:'password'}" class="inputItem">
                      <el-input placeholder="请输入密码" type="password" id="password" v-model="fdata.password" name="password" prefix-icon="el-icon-fant-unlock"></el-input>
                    </fant-form-item>
                    <fant-form-item :opt="{prop:'validateCode'}" class="inputItem">
                      <el-input placeholder="请输入验证码" id="validateCode" name="validateCode" v-enter="{btn:'#submitForm'}" v-model="fdata.validateCode" prefix-icon="el-icon-fant-label">
                        <input slot="append" type = "button" class="validCode" @click="createCode" :value="validCode"/>
                      </el-input>
                    </fant-form-item>
                    <div class="btnBox">
                      <el-button style="float: right; padding: 3px 0" type="text" @click="forgetPw">忘记密码</el-button>
                      <el-button id="submitForm" type="primary" style="width:100%;margin-left:0;" :loading="loading" @click="submit">登录</el-button>
                    </div>
                  </fant-form>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        validImg:"",
        fdata:{
          username:"",
          password:"",
          validateCode:""
        },
        loading:false,
        formOpt:{
          labelWidth:"0px",
          rules:{
            username: [
              { required: true, message: '请输入账号名', trigger: 'change' }
            ],
            password: [
              { required: true, message: '请输入密码', trigger: 'change' }
            ],
            validateCode: [
              { required: true, message: '请输入验证码', trigger: 'change' }
            ]
          }
        },
        validCode:""
      }
    },
    methods:{
      submit(e){
        var vm = this;
        this.$refs["loginForm"].$children[0].validate(function(valid){
          if (valid) {
            vm.loading = true;
//            Vue.set(vm.fdata, 'password', Vue.encode(vm.fdata.password));
            console.log(vm.$store )
            vm.$store.dispatch('Login', vm.fdata).then(() => {
              vm.loading = false;
              vm.$router.push({path: '/'});
            }).catch((e) => {
              vm.loading = false
            })
          } else {
            return false;
          }
        });
      },
      forgetPw(){
        this.$router.push("/forgetPwd");
      },
      signUp(){
        this.$router.push("/register");
      },
      createCode(){
        var code = "";
        var codeLength = 4;//验证码的长度
        var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',
          'S','T','U','V','W','X','Y','Z');//随机数
        for(var i = 0; i < codeLength; i++) {//循环操作
          var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）
          code += random[index];//根据索引取得随机数加到code上
        }
        this.validCode = code;//把code值赋给验证码
      }
  },
  mounted:function(){
    this.createCode();
  }
  }
</script>
