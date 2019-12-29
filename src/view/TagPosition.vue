<template>
  <div style="margin: 30px">
    <el-card>
      <el-button
        size="medium"
        @click="addNew()">Add New Reader
      </el-button>
    </el-card>
    <el-table :data="readers" style="margin: 0 auto">
      <el-table-column prop="id" label="Reader" >
        <template slot-scope="scope">
          <div >Reader {{scope.row.id}}</div>    
        </template>
      </el-table-column>
      <el-table-column  label="Location">
        <template slot-scope="scope">
          <div>( {{scope.row.loc.x}} , {{scope.row.loc.y}} )</div>    
        </template>
      </el-table-column>
      <el-table-column> 
         <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)">Edit
          </el-button>
           <el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope.row.id)">Delete
          </el-button>
        </template>
      </el-table-column>
      
    </el-table>



     <el-card>
        <div class="text" :data="slot" >{{'In Timeslot   ' +slot }}</div>
        <div class="text"> The position of Each RFID equipment</div>
      </el-card>
    <el-table :data="tags" style="margin: 0 auto">
      <el-table-column  prop="epc" label="EPC code"  >
      </el-table-column>
      <el-table-column  label="Location">
        <template slot-scope="scope">
          <div>( {{scope.row.loc.x}} , {{scope.row.loc.y}} )</div>    
        </template>
      </el-table-column>
      <el-table-column  prop="status" label="Status"  >
      </el-table-column>
    </el-table>

    <el-dialog title="edit reader" :visible.sync="editVisible" width="50%" center>
      <el-form :model="editForm" :rules="editRules" ref="editForm" label-width="auto" class="demo-editForm"
               style="width: 50%; margin:0 auto;">
        <el-form-item label="Reader id" prop="id">
          <el-input v-model.number ="editForm.id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="X position" prop="x">
          <el-input v-model.number ="editForm.loc.x" placeholder="please input the x coordinate"></el-input>
        </el-form-item>
        <el-form-item label="Y position" prop="y">
          <el-input v-model.number ="editForm.loc.y" placeholder="please input the y corrdinate"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitEdit('editForm')">submit</el-button>
          <el-button @click="resetForm('editForm')">reset</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

       <el-dialog title="addreader" :visible.sync="addVisible" width="50%" center>
      <el-form :model="addForm" :rules="addRules" ref="addForm" label-width="auto" class="demo-addForm"
               style="width: 50%; margin:0 auto;">
        <el-form-item label="X position" prop="x">
          <el-input v-model.number ="addForm.x" placeholder="please input the x coordinate"></el-input>
        </el-form-item>
        <el-form-item label="Y position" prop="y">
          <el-input v-model.number ="addForm.y" placeholder="please input the y corrdinate"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitAdd('addForm')">submit</el-button>
          <el-button @click="resetForm('editForm')">reset</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>




  </div>
</template>

<script>
  export default {
    data (){
      return {
        editVisible:false,
        addVisible:false,
        slot: 1,
        tags:[],
        readers:[],
        editForm: {
          id: 1,
          loc: {
            x:1.00,
            y:1.00
          }
        },
        addForm:{
          x:0.00,
          y:0.00
        },
        editRules: {
          id: [
          ],
          loc:{
            x: [
            {required: true, message: 'please enter the x corrdinate', trigger: 'change'},
            {type: 'number', message: 'not a number', trigger: 'blur'}
          ],
           y: [
            {required: true, message: 'please enter the y corrdinate', trigger: 'change'},
            {type: 'number', message: 'not a number', trigger: 'blur'}
            ]

          }
          
        },
        addRules: {
          x: [
            {required: true, message: 'please enter the x corrdinate', trigger: 'change'},
            {type: 'number', message: 'not a number', trigger: 'blur'}
          ],
          y: [
            {required: true, message: 'please enter the y corrdinate', trigger: 'change'},
            {type: 'number', message: 'not a number', trigger: 'blur'}
            ]
        }
          
        
      }
    },
    beforeCreate () {
      this.$nextTick(function () {
        let _this = this
        _this.$axios.get('/tag-position').then(res => {
          _this.readers=res.data.readers 
          _this.slot=res.data.slot
          _this.tags=res.data.tags
          
        })
        
      })
    },
    mounted(){
      let _this = this
      if(_this.timer){
        clearInterval(_this.timer);
      }else{
        _this.timer = setInterval(function (){
          _this.$axios.get('/tag-position').then(res => {
          _this.readers=res.data.readers 
          _this.slot=res.data.slot
          _this.tags=res.data.tags
        })
        },10000);
      }
    },
    beforeDestroy(){
      clearInterval(this.timer);
    },
    methods: {
      handleEdit (rowData) {
        let _this = this
        _this.editVisible = true
        _this.editForm = rowData
        _this.disabledController = true
      },
      submitEdit (formName) {
        let _this = this
        
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(JSON.stringify(_this.editForm))

            _this.$axios.post('/edit-reader', _this.editForm).then(res => {
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
      submitAdd (formName) {
        let _this = this
        
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(JSON.stringify(_this.addForm))

            _this.$axios.post('/add-reader', _this.addForm).then(res => {
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
      },
        addNew () {
        this.addVisible = true
        this.disabledController = false
        this.addForm={
          x:0.00,
          y:0.00
        }
      },
       handleDelete(index,id){
        let _this = this
        console.log(JSON.stringify(id))
        _this.$axios.post('/delete-reader', id)
        .then(res => {
          console.log(res)
          _this.$message.success('delete success!')
          _this.readers.splice(index,1)
        })
        .catch(function(error){
          _this.$message.error('delete failed! please check and try again')
        })
      }
    }
  }
</script>

<style type="text/css">
.text{
  color: #606266;

}
  
</style>