<template>
  <div style="margin: 30px">
    <el-card>
      <div class="text" :data="slot" >{{'In Timeslot   ' +slot }}</div>
    </el-card>
    <el-table :data="tags"style="margin: 0 auto">
      
      <el-table-column  prop="epc" label="EPC code"  >
      </el-table-column>
      <el-table-column prop="status" label="Binding Case" >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status|statusFilter">{{scope.row.status|formatStatus}}</el-tag>    
        </template>
      </el-table-column>
      <el-table-column prop="exist" label="Monitoring Case" >
        <template slot-scope="scope1">
          <el-tag :type="scope1.row.exist|statusFilter">{{scope1.row.exist|formatExist}}</el-tag>    
        </template>
      </el-table-column>
    </el-table>

    <el-card>
      <div class="text" :data="number" >{{'The Total Number of EPC: ' + number.number  }}</div>
      <div class="text" :data="number" >{{number.exist +"  of which are under survillence, "+number.out+" are out of survillence" }}</div>
    </el-card>



  </div>
</template>

<script>
  export default {
    data (){
      return {
        number:{
          number: 1,
          exist: 1,
          out: 1
        },
        slot: 1,
        tags:[]
      }
    },
    beforeCreate () {
      this.$nextTick(function () {
        let _this = this
        _this.$axios.get('/tag-status').then(res => {
          _this.number=res.data.number 
          _this.slot=res.data.slot
          _this.tags=res.data.tag
          
        })
        
      })
    },
    mounted(){
      let _this = this
      if(_this.timer){
        clearInterval(_this.timer);
      }else{
        _this.timer = setInterval(function (){
          _this.$axios.get('/tag-status').then(res => {
          _this.totalNum = res.data.number
          _this.boundNum =res.data.exist
          _this.unboundNum = _this.totalNum - _this.boundNum 
          _this.slot=res.data.slot
          _this.tags=res.data.tag
        })
        },10000);
      }
    },
    beforeDestroy(){
      clearInterval(this.timer);
    },
    filters:{
      statusFilter(status){
        const statusMap ={
          0: 'info',
          1: 'success'
        }
        return statusMap[status]
      },
      formatStatus(status){
        const statusMap ={
          0: 'product unbound',
          1: 'product bound'
        }
        return statusMap[status]
      },
      formatExist(status){
        const statusMap ={
          0: 'out of survillence',
          1: 'under survillence'
        }
        return statusMap[status]
      }

    }
  }
</script>

<style type="text/css">
.text{
  color: #606266;

}
  
</style>