<template>
  <el-menu router>
    <el-submenu v-for="item in menus" :index="item.index" :key="item.index">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span v-text="item.name"></span>
      </template>
      <el-menu-item-group>
        <el-menu-item v-for="subitem in item.sub" :index="subitem.index" :key="item.index+'-'+subitem.index">
          {{subitem.name}}
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import menus from '@/config/menuConfig'

export default {
  data () {
    return {
      isCollapse: true,
      menus
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style>
</style>
