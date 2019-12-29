<template>
  <div class="container">
    <div class="formWrapper">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="auto" class="demo-ruleForm"
               style="width: 50%; margin:0 auto;">
        <el-form-item label="OrderNum" prop="epc">
          <el-input v-model ="ruleForm.epc" placeholder="please input the epc number"></el-input>
        </el-form-item>
        <el-form-item label="password">
          <el-input  v-model ="ruleForm.password" placeholder="please input the password"></el-input>
        </el-form-item>
        <el-form-item label="the Code Length">
          <el-input v-model ="ruleForm.length" placeholder="please input the code Length"></el-input>
        </el-form-item>
        <el-form-item label="Start position of the code">
          <el-input v-model ="ruleForm.start" placeholder="please input the start position"></el-input>
        </el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">submit</el-button>
          <el-button @click="resetForm('ruleForm')">reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        ruleForm: {
          epc: '',
          password:'',
          length:'',
          start:''
        },
        rules: {
          epc: [
            {required: true, message: 'please enter the epc code', trigger: 'change'}
          ],
          password:[],
          length:[],
          start:[]
        }
      }
    },
    methods: {
      submitForm (formName) {
        let _this = this
        //ß_this.$router.replace('/pendingLeg')
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(JSON.stringify(_this.ruleForm))

            _this.$axios.post('/add-epc', _this.ruleForm).then(res => {
              console.log(res)
              _this.$router.replace('/epcProduct')
              _this.$message.success('submit success!')
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }

    }
  }
</script>

<style>
 .formWrapper{
    margin-top: 50px;
  }
 
</style>
