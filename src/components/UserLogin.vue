<template>

  <div class="login-container">
    <el-form  status-icon  ref="ruleForm" label-width="100px"  class="register-form">
      <h2 class="title-zc">登录</h2>
  <el-form-item label="用户名" prop="username">
    <el-input  placeholder="请输入账号"  v-model="username"  clearable></el-input>
  </el-form-item>
  <el-form-item label="密码:" prop="password">
    <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" plain @click="Login">登录</el-button>
    <el-button type="primary" plain @click="ToRegister">去注册</el-button>
  </el-form-item>
  </el-form>
  </div>
  
</template>
  
<script>
// import store from "../store/index";
   export default {
    name:'UserLogin',
    data() {
      return {
        username:'',
        password:'',
      };
    },   
    methods: {
      Login(){
        if(this.username == "" || this.password == ""){
          alert("输入用户名或者密码")
        }
        else{
          this.$axios({
            url:'/api/user/login',
            method:'post',
            data:{
              "username":this.username,
              "password":this.password
            }
          }).then(res=>{
            this.$store.state.token=res.data.token
            this.$router.replace({name:'mainpage'})
            },err=>{
              console.log(err);
            })
        }
      },
      ToRegister(){
        this.$router.replace({name:'register'})
      }
    },
  }
</script>

<style>
.login-container{
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-image: url("../assets/1.webp");
  background-image: 100%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.register-form {
  width: 350px;
  margin: 150px auto;
  background-color: rgba(171, 194, 198, 0.7);
  padding: 30px;
  border-radius: 20px;
}
.title-zc {
  text-align: center;
}

</style>