<template>
  <div class="container">
    <el-card>
       <el-upload
      class="upload-demo"
      ref="upload"
      accept=".xls,.xlsx"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-change="upload"
      :show-file-list="false"
      :auto-upload="false">
      <el-button size="small" type="primary">Click to upload</el-button>
    </el-upload>
      
    </el-card>
   
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
  import XLSX from 'xlsx'
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
      },
      upload(file,fileList){
        let files = {0:file.raw}
        console.log(files)
        this.readExcel(files);
      },
      readExcel(files) {//表格导入
        let that = this
        console.log("11"+files);
        if(files.length<=0){//如果没有文件名
            return false;
        }else if(!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())){
            this.$Message.error('上传格式不正确，请上传xls或者xlsx格式');
            return false;
        }
    
        const fileReader = new FileReader();
        fileReader.onload = (ev) => {
          try {
            const data = ev.target.result;
            
            const workbook = XLSX.read(data, {
              type: 'binary'
            });
            const wsname = workbook.SheetNames[0];//取第一张表
            const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);//生成json表格内容
            console.log("111"+ws);
            try{
              for (let i = 0; i < ws.length; i++) {
                let str=ws[i].保质期
                str=str.substring(0,str.length-1)

                var result = {
                  orderNum: ws[i].生产单号,
                  name: ws[i].产品名称,
                  inventory: ws[i].生产数量,
                  expiration: parseInt(str),
                  productionDate: ws[i].生产时间,
                  specification: ws[i].产品规格,
                  qrUrl: ws[i].二维码路径
                }
                
              }
              console.log(result)
              that.ruleForm=result;

            }catch(err){
              console.log(err)
            }
            this.$refs.upload.value = '';
          } catch (e) {
            console.log("errrr")
            return false;
          }
        };
        fileReader.readAsBinaryString(files[0]);
      }
    }
  }
</script>
<style>

  
  .formWrapper{
    margin-top: 50px;
  }

</style>
