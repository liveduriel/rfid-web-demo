<template>
  <div >
    <el-card>
      <el-button
        size="medium"
        @click="addNew()">Add New Product
      </el-button>
    </el-card>
    <el-table :data="allProduct" >
      <el-table-column fixed="left" prop="orderNum" label="Order Number" width="150" >
      </el-table-column>
      <el-table-column prop="name" label="Product Name" width="120">
      </el-table-column>
      <el-table-column prop="inventory" label="Inventory"width="100" >
      </el-table-column>
      <el-table-column prop="expiration" label="Expiration Limit" width="150">
      </el-table-column>
      <el-table-column prop="productionDate" label="Production Date" width="200">
      </el-table-column>
      <el-table-column prop="specification" label="Specification" width="120">
      </el-table-column>
      <el-table-column prop="qrUrl" label="QR URL"width="200">
      </el-table-column>
      <el-table-column fixed="right" label="option" width="300">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)">Edit
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope.row.orderNum)">Delete
          </el-button>
          <el-button size="mini" type="info" @click="handleShowQrCode(scope.$index, scope.row)">Show QR code
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    

    <el-dialog title="edit product" :visible.sync="editVisible" width="50%" center>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="auto" class="demo-ruleForm"
               style="width: 50%; margin:0 auto;">
        <el-form-item label="OrderNum" prop="orderNum">
          <el-input v-model ="ruleForm.orderNum" placeholder="please input the order number" :disabled="true"></el-input>
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
    </el-dialog>
  </div>
</template>



<script>
  export default {
    data () {
      return {
        editVisible: false,
        disabledController: false,
        allProduct: [],
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
          ],
          name: [
            {required: true, message: 'please enter the product name', trigger: 'change'}
          ],
          inventory: [
            {type: 'number', message: 'not a number', trigger: 'blur'}
          ],
          expiration: [
            {type: 'number', message: 'not a number', trigger: 'blur'}
          ],
          productionDate: [
            {type: 'date', message: 'not a date', trigger: 'blur'}
          ],
          specification: [     
          ],
          qrUrl: [
          ]
        }
      }
    },
    beforeCreate () {
      this.$nextTick(function () {
        let _this = this
        this.$http.get('/all-product').then(res => {
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
       this.$router.replace("/addProduct")
        
      },
      handleDelete(index,orderNum){
        let _this = this
        _this.$axios.post('/delete-product', orderNum)
        .then(res => {
          console.log(res)
         // _this.$router.replace('/allProduct')
          _this.$message.success('delete success!')
          _this.allProduct.splice(index,1)
        })
        .catch(function(error){
          _this.$message.error('delete failed! please check and try again')
        })
      },
      getDate(val){
        console.log(val);
        this.ruleForm.productionDate=val;
        console.log(this.ruleForm.productionDate);
      },
      submitForm (formName) {
        let _this = this
        
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(JSON.stringify(_this.ruleForm))

            _this.$axios.post('/update-product', _this.ruleForm).then(res => {
              console.log(res)
              _this.$router.replace('/allProduct')
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
<style>


</style>
