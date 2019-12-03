<template>
    <div class="index-app">
        <el-container>
            <el-header>
                <header-app/>
            </el-header>
            <el-container>
                    <el-aside :width="isCollapse ? '50px' :'240px'"><left-aside @select-menu="handleSelectMenu" :isCollapse="isCollapse" :defaultActive="editableTabsValue"/></el-aside>
                <el-container>
                    <el-main>
                        <div class="fold-button">
                            <el-button :icon="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" circle class="fold-icon" size="small" @click="changeIsCollapse"></el-button>
                        </div>
                        <el-tabs class="header-nav" closable v-show="editableTabs.length > 0" v-model="editableTabsValue" type="card" @edit="handleTabsEdit" @tab-click="handleMenuChange">
                            <el-tab-pane :key="item.path" v-for="(item, index) in editableTabs" :label="item.name" :name="item.path">
                            </el-tab-pane>
                        </el-tabs>
                        <div class="main-box">
                            <router-view></router-view>
                        </div>
                    </el-main>
                    <!-- <el-footer><footer-app /></el-footer> -->
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import header from './common/header.vue';
    import leftAside from './common/leftside.vue';
    //import footer from './common/footer.vue';
    export default {
        name: 'index',
        components: {
            'left-aside' : leftAside,
            //"footer-app": footer,
            "header-app": header,
        },
        data (){
            return {
                editableTabsValue: '/workBench',
                editableTabs: [{name: this.$t('message.workbench'), path: '/workBench'}],
                isCollapse: false,
            }
        },
        created() {
            
        },
        mounted() {
			this.$nextTick(function() {
                this.$router.push('/workBench')
            });
        },
        methods: {
            handleSelectMenu(data){
                this.handleTabsEdit(data.path, 'add', data);
            },
            handleTabsEdit(path, action, data) {
                if (action === 'add') {
                    let flag = true;
                    for(let i = 0; i < this.editableTabs.length; i++){
                        let item = this.editableTabs[i];
                        if(item.path === path){
                            flag = false;
                            break;
                        }
                    }
                    if(flag){
                        this.editableTabs.push({
                            name: data.name,
                            path: path
                        });
                    }
                    this.editableTabsValue = path;
                }
                if (action === 'remove') {
                    if(path == '/workBench') {
                        this.$message.error(this.$t('message.noClose'));
                        return;
                    }
                    if (this.editableTabsValue === path) {
                        this.editableTabs.forEach((tab, index) => {
                            if (tab.path === path) {
                                let nextTab = this.editableTabs[index + 1] || this.editableTabs[index - 1];
                                if (nextTab) {
                                    this.editableTabsValue = nextTab.path;
                                }
                            }
                        });
                    }
                    this.editableTabs = this.editableTabs.filter(tab => tab.path !== path);
                    this.$router.push(this.editableTabsValue);
                }
            },
            handleMenuChange(tab, event){
                let path = tab.name;
                this.$router.push(path);
            },
            changeIsCollapse(){
                this.isCollapse = !this.isCollapse;
            }
        },
        watch: {
            $route(to, from) {
                let path = to.path;
                for(let i = 0; i < this.editableTabs.length; i++){
                    let item = this.editableTabs[i];
                    if(item.path === path){
                        this.editableTabsValue = path;
                        break;
                    }
                }
			}
        }
    }
</script>

<style lang="scss" scoped>
    .index-app {
        width: 100%;
        height: 100%;
        .el-container{
            height: 100%;
            .el-main {
                background: url('../assets/img/background.png');
                background-repeat: no-repeat;
                position: relative;
                background-color: #f0f2f5;
                color: #333;
                padding: 46px 0px 10px;
                height: 100%;
                overflow: hidden;
                .fold-button{
                    display: inline-block;
                    position: absolute;
                    width: 37px;
                    height: 37px;
                    top: 0px;
                    left: 0px;
                    background: #fff;
                    .fold-icon {
                        margin-top: 1px;
                        margin-left: 1px;
                        font-size: 14px;
                    }
                }
                .header-nav{
                    display: inline-block;
                    position: absolute;
                    top: 0px;
                    left: 37px;
                    height: 36px;
                    width: 100%;
                    background-color: #fff;
                    /deep/ .el-tabs__item {
                        height: 36px;
                        line-height: 36px;
                    }
                }
                .main-box{
                    height: 100%;
                    margin: 0 10px;
                    overflow-x: hidden;
                    overflow-y: auto;
                    //background-color: #fff;
                }
            }
            /* .el-footer {
                //background-color: #fff;
                background-color: rgba(256,256,256,0.5);
                text-align: center;
                line-height: 60px;
            } */
            .el-header {
                padding: 0;
            }
        }   
    }
</style>
