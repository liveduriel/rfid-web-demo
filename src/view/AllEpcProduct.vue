<template>
  <div>
    <el-card>
      <el-button
        size="medium"
        @click="addNew()">Add New EPC code
      </el-button>
    </el-card>
    <el-table :data="allProduct" >
      <el-table-column fixed="left" prop="epc" label="EPC code" width="150" >
      </el-table-column>
      <el-table-column prop="id" label="Son Product Id" width="150">
      </el-table-column>
      <el-table-column prop="parent.orderNum" label="order number" width="120">
      </el-table-column>
      <el-table-column prop="parent.expiration" label="Expiration Limit" width="150">
      </el-table-column>
      <el-table-column prop="parent.productionDate" label="Production Date" width="200">
      </el-table-column>
      <el-table-column prop="parent.specification" label="Specification" width="120">
      </el-table-column>
      <el-table-column prop="parent.qrUrl" label="QR URL"width="300">
      </el-table-column>
      <el-table-column fixed="right" label="option" width="120">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleEdit(scope.row)">Bind/Edit </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="edit EPC Bind" :visible.sync="editVisible" width="50%" center>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="auto" class="demo-ruleForm" style="width: 80%; margin:0 auto;">
        <el-form-item label="EPC code" prop="epc">
          <el-input v-model ="ruleForm.epc" placeholder="please input the order number" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="Product ID" prop="id">
          <el-select v-model="ruleForm.id" placeholder="choose the product id" value="" :clearable="true" style="width: 100%">
            <el-option
              v-for="item in allSonId"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item> 
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">submit</el-button>
          <el-button @click="resetForm('ruleForm')">reset</el-button>
        </el-form-item>             
      </el-form>     
    </el-dialog>


  </div>
</template>

<script>
  export default {
    data (){
      return {
        editVisible: false,
        allProduct: [],
        allSonId:[],
        ruleForm:{
          epc:'',
          id:''
        },
        rules:{
          epc:[],
          id:[
          {required: true, message: 'please choose the product id', trigger: 'change'}
          ]
        }
      }
    },
    beforeCreate () {
      this.$nextTick(function () {
        let _this = this
        this.$http.get('/all-son-id').then(res => {
          _this.allSonId = res.data
          
        })
        this.$http.get('/all-epc-product').then(res => {
          _this.allProduct = res.data
          console.log(_this.allProduct)
        })
      })
    },
    methods: {
      handleEdit (rowData) {
        let _this = this
        _this.editVisible = true
        _this.ruleForm = rowData
        _this.disabledController = true
      },
      addNew () {
       this.$router.replace("/addEpc")
        
      },
       submitForm (formName) {
        let _this = this
        
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(JSON.stringify(_this.ruleForm))

            _this.$axios.post('/write-epc', _this.ruleForm).then(res => {
              console.log(res)
              location.reload()
              _this.$message.success('submit success!')
            })
          } else {
            _this.$message.error('error submit!!')
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