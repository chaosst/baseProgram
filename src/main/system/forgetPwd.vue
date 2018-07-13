<style scoped>
  #forgetPwdBox{
    width:100%;
    height:100%;
    min-width:800px;
  }
  .header{
    background:url(~assets/images/register.jpeg) top center no-repeat;
    background-size:100%;
    height:100px !important;
  }
  .successInfo{
   font-size:26px;
    color:#228B22;
  }
</style>
<template>
  <div id="forgetPwdBox">
    <el-container>
      <el-header class="header"></el-header>
      <el-main>
        <div>
          <el-row style="margin-top:30px;">
            <el-steps :active="step" align-center>
              <el-step title="步骤1" description="验证邮箱"></el-step>
              <el-step title="步骤2" description="修改密码"></el-step>
              <el-step title="步骤3" description="修改成功！"></el-step>
            </el-steps>
          </el-row>
          <el-row style="margin-top:30px;text-align:center;" v-show="step == 1">
            <el-col span="8">
              &nbsp;
            </el-col>
            <el-col span="8">
            <fant-form :model="adata" :opt="aformOpt" ref="aForm" id="aForm" v-enter style="width:90%;">
              <fant-form-item :opt="{prop:'email',label:'邮箱'}" class="inputItem">
                <el-input placeholder="请输入邮箱" id="email" name="email" v-model="adata.email">
                </el-input>
              </fant-form-item>
              <fant-form-item :opt="{prop:'validCode',label:'验证码'}" class="inputItem">
                <el-input placeholder="请输入验证码" id="validCode" v-model="adata.validCode" name="validCode"></el-input>
              </fant-form-item>
            </fant-form>
            </el-col>
            <el-col span="8">
              &nbsp;
            </el-col>
          </el-row>
          <el-row style="margin-top:30px;text-align:center;" v-show="step == 2">
            <el-col span="8">
              &nbsp;
            </el-col>
            <el-col span="8">
              <fant-form :model="bdata" :opt="bformOpt" ref="bForm" id="bForm" v-enter style="width:90%;">
                <fant-form-item :opt="{prop:'password',label:'密码'}" class="inputItem">
                  <el-input placeholder="请输入密码" type="password" id="password" v-model="bdata.password" name="password"></el-input>
                </fant-form-item>
                <fant-form-item :opt="{prop:'confirmPassword',label:'确认密码'}" class="inputItem">
                  <el-input placeholder="请重新输入密码" type="password" id="confirmPassword" v-model="bdata.confirmPassword" name="confirmPassword"></el-input>
                </fant-form-item>
              </fant-form>
            </el-col>
            <el-col span="8">
              &nbsp;
            </el-col>
          </el-row>
          <el-row v-show="step == 3" style="margin:10% 0;text-align:center;">
            <i class="el-icon-fant-success_fill successInfo">恭喜你，密码修改成功</i>
          </el-row>
          <el-row style="margin-top:30px;text-align:center;">
            <el-col span="10">
              &nbsp;
            </el-col>
            <el-col span="4">
              <div class="btnBox">
                <el-button id="submitForm" type="primary" style="width:100%;margin-left:0;" v-show="step == 2" @click="prevStep">上一步</el-button>
                <el-button id="submitForm" type="primary" style="width:100%;margin-left:0; margin-top:10px;" v-show="step != 3" @click="nextStep">下一步</el-button>
              </div>
            </el-col>
            <el-col span="10">
              &nbsp;
            </el-col>
          </el-row>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import valid from '@/lib/fant-validate';
  export default {
    data () {
      var confirmPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.fdata.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        step:1,
        adata:{
          email:"",validCode:""
        },
        bdata:{
          password:"",confirmPassword:""
        },
        aformOpt: {
          rules: {
            email: [
              {required: true, message: '请输入邮箱地址', trigger: 'change'},
              {validator: valid.email, trigger: 'change'},
            ],
            validCode: [
              {required: true, message: '请输入验证码', trigger: 'change'}
            ],
          }
        },
        bformOpt: {
          rules: {
            password: [
              {required: true, message: '请输入密码', trigger: 'change'}
            ],
            confirmPassword: [
              {required: true, message: '请重新输入密码', trigger: 'change'},
              {validator: confirmPass, trigger: 'change'},
            ]
          }
        }
      }
    },
    methods:{
      nextStep(e){
        this.step++;
        var vm = this;
        var formRef = this.step == 1?"aForm":"bForm";
        this.$refs[formRef].$children[0].validate(function(valid){
          if (valid) {
            //Todo:ajax
          } else {
            return false;
          }
        });
      },
      prevStep(e){
        this.step--;
      }
  }
  }
</script>
