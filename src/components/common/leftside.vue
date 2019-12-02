<template>
    <el-menu
      :collapse="isCollapse"
      @select="handleSelectMenu"
      router
      unique-opened
      :default-active="defaultActive"
      class="el-menu-vertical-demo leftside-app">
      <el-submenu :index="item.path" v-for="item in routerList" v-if="item.children&&$auths(item.path)" :key="item.path">
        <template slot="title">
          <i :class="item.icon" style="color: #f45d2f"></i>
          <span>{{item.name}}</span>
        </template>
        <el-menu-item :index="i.path" v-for="i in item.children" v-if="$auths(i.path)" :key="i.path">{{i.name}}</el-menu-item>
      </el-submenu>
      <el-menu-item :index="item.path" v-else-if="$auths(item.path)">
        <i :class="item.icon" style="color: #f45d2f"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
    </el-menu>
</template>

<script>

    export default {
        name: 'leftside',
        props: {
            defaultActive: {
                type: String,
                default: '/workBench',
            },
            isCollapse: {
                type: Boolean,
                default: false,
            }
        },
        data (){
            return {
            }
        },
        mounted() {
			this.$nextTick(function() {
            });
        },
        methods: {
            handleSelectMenu(index, indexPath){
                let indexMenu = {};
                this.routerList.forEach(element => {
					if(element.path == index && !element.children) {
                        indexMenu = element;
					} else if(element.children && element.children.length > 0) {
						element.children.forEach(e => {
							if(e.path == index) {
                                indexMenu = e;
							}
						});
					}
                });
                this.$emit('select-menu', indexMenu);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .leftside-app {
        height: 100%;
        .tooltip {
            overflow: hidden;
        }
    }
</style>
