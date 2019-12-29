<template>
  <div class="container">
    <div class="formWrapper">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="auto" class="demo-ruleForm"
               style="width: 50%; margin:0 auto;">
        <el-form-item label="OrderNum" prop="orderNum">
          <el-input v-model ="ruleForm.orderNum" placeholder="please input the order number"></el-input>
        </el-form-item>
        <el-form-item label="Name" prop="name">
          <el-input v-model ="ruleForm.name" placeholder="please input the product name"></el-input>
        </el-form-item>
        <el-form-item label="Inventory" prop="inventory">
          <el-input v-model.number="ruleForm.inventory" placeholder="please input the inventory amount"></el-input>
        </el-form-item>
        <el-form-item label="Expiration" prop="expiration">
          <el-input v-model.number="ruleForm.expiration" placeholder="please input the expiration limit"></el-input>
        </el-form-item>

        <el-form-item label="Production Date" prop="productionDate">
          <el-date-picker  v-model="ruleForm.productionDate" 
          value-format="yyyy-MM-dd HH:mm:ss" 
          format="yyyy-MM-dd HH:mm:ss"
          type="datetime" 
          :editable = false  
          :clearable = true  
          @change="getDate"
          placeholder="please input the production date">
            
          </el-date-picker>
       
        </el-form-item>
        <el-form-item label="Specification" prop="specification">
          <el-input v-model="ruleForm.specification" placeholder="please input the specification"></el-input>
        </el-form-item>
        <el-form-item label="QR Url" prop="qrUrl">
          <el-input v-model="ruleForm.qrUrl" placeholder="please input the QR URL"></el-input>
        </el-form-item>
        <el-form-item>
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
          orderNum: '',
          name: '',
          inventory: 1,
          expiration: 1,
          productionDate: '',
          specification: '',
          qrUrl: ''
        },
        rules: {
          orderNum: [
            {required: true, message: 'please enter the order number', trigger: 'change'}
          ],
          name: [
            {required: true, message: 'please enter the product name', trigger: 'change'}
          ],
          inventory: [
            {required: true, message: 'please input the inventory amount', trigger: 'blur'},
            {type: 'number', message: 'not a number', trigger: 'blur'}
          ],
          expiration: [
            {required: true, message: 'please input a expiration limit', trigger: 'blur'},
            {type: 'number', message: 'not a number', trigger: 'blur'}
          ],
          productionDate: [
            {required: true, message: 'please enter the productionDate', trigger: 'change'}
          ],
          specification: [
            {required: true, message: 'please enter the specification', trigger: 'change'}
          ],
          qrUrl: [
            {required: true, message: 'please enter the QR Url', trigger: 'change'}
          ]
        }
      }
    },
    methods: {
      getDate(val){
        console.log(val);
        this.ruleForm.productionDate=val;
        console.log(this.ruleForm.productionDate);
      },
      submitForm (formName) {
        let _this = this
        //ß_this.$router.replace('/pendingLeg')
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(JSON.stringify(_this.ruleForm))

            _this.$axios.post('/add-product', _this.ruleForm).then(res => {
              console.log(res)
              _this.$router.replace('/allProduct')
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
