<template>
  <div>
    <div class="containerWrapper">
      <div class="sidebarWrapper">
        <el-menu default-active="1-4-1"  background-color="#324057" text-color="#FFFFFF" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="collapseStatus">
          <el-menu-item index="0">
            <i class="el-icon-menu"></i>
            <span slot="title">RFID WorkStation</span>
          </el-menu-item>

          <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-goods"></i>
            <span slot="title">Product Detail</span>
          </template>
          <el-menu-item-group title="Product Management">          
            <el-menu-item index="/allProduct"  @click="goTo('/allProduct')">Product List</el-menu-item>
            <el-menu-item index="/addProduct" @click="goTo('/addProduct')">Add Product</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

          <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-price-tag"></i>
            <span slot="title">EPC Management</span>
          </template>
          <el-menu-item-group title="EPC Management">          
            <el-menu-item index="/epcProduct"  @click="goTo('/epcProduct')">EPC List</el-menu-item>
            <el-menu-item index="/addEpc" @click="goTo('/addEpc')">Add EPC</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        
        <el-menu-item index="/tagStatus" @click="goTo('/tagStatus')">
            <template slot="title">
              <i class="el-icon-s-marketing"></i>
              <span slot="title">EPC Monitoring</span>
            </template>
        </el-menu-item>
         <el-menu-item index="/tagPosition" @click="goTo('/tagPosition')">
            <template slot="title">
              <i class="el-icon-video-camera"></i>
              <span slot="title">EPC Managment</span>
            </template>
        </el-menu-item>
        </el-menu>
      </div>
      <div class="contentWrapper"  style="max-width: 85%">
        <div class="mainHeader"  style="background-color: #EFF2F7">
          <!--nav collapse control-->
          <span><i class="el-icon-s-fold" @click="handleFold()"></i></span>
          <div class="userCenter">
              <el-link :underline="false" >
                <span class="username">Hello, User &nbsp;&nbsp;&nbsp;</span>
                <el-avatar :size="40" :src="avaUrl"></el-avatar>
              </el-link>
          </div>
        </div>
        <div class="mainContent">
          <router-view />
        </div>
      </div>
    </div>

  </div>

</template>



<script>
  export default {
    name: 'MavMenu',
    data () {
      return {
        isCollapse: false,
        collapseStatus: false,
        avaUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      }
    },
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      },
      handleFold () {
        this.collapseStatus = !this.collapseStatus
      },
      goTo (path) {
        this.$router.replace(path)
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .containerWrapper{
    display: flex;
    flex-direction: row;
  }
  .sidebarWrapper{
    min-height: 100vh;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    margin: 10 auto;
    width: 250;
    height: 100%;
  }
  .el-menu--collapse{
    height: 100%;
  }
  .contentWrapper{
    flex: 1;
    min-height: 100vh;
  }
  .mainHeader{
    height: 56px;
    padding: 0 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .mainContent{
    padding: 0 2px;
    background: #ffffff;
    height: 100%;
  }
  .userCenter{
    display: flex;
    align-items: center;
  }
  .userCenter .username{
    margin-right: 15px;
    bottom: 10px;
    position:relative;

  }
  .citiLogo{
    position: center;
  }
</style>






