<template>
<div class="register-container">
    <!-- 根标签 -->
    <el-form
      :model="form"
      status-icon
      :rules="rules"
      ref="form"
      label-width="100px"
      class="register-form"
    >
    <h2 class="title-zc">注册</h2>

       <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
 
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="form.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          v-model="form.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
     
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')"
          >提交</el-button
        >
        <el-button @click="ToLogin">去登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
 
<script>
export default {
  name:'UserRegister',
  ToLogin(){
        this.$router.replace({name:'login'})
      },
  data() {
    var validatePass = (rule, value, callback) => {
      //rule:password的详细信息，value：password的值，callback:如果都不满足，则正常提交
      if (value === "") {
        callback(new Error("请输入密码"));//输入为空的提示信息
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");//如果确认密码不为空，则去validatePass2这个函数
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        username:"",
        password:"",
        checkPass:"",
      },
      rules: {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],//校验规则：必填、信息提示、失去焦点
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };    
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/api/user/register',{
              "username":this.form.username,
              "password":this.form.password,   
            }
          ).then(res=>{
              alert("提交成功!");
              this.$router.replace({name:'login'})
              console.log(res.data);
            },err=>{
              console.log(err);
            })
          console.log(valid);
        } else {
          console.log("提交失败!!");
          return false;
        }
      });
    },
    ToLogin(){
        this.$router.replace({name:'login'})
      }
  },
};
</script>
 
<style scoped>
.register-container {
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