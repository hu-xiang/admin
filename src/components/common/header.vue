<template>
    <div class="header-app">
        <div class="header-left">
            <img src="../../assets/img/logo.gif"/>
            <!-- <span>闻泰科技</span>
            <span class="shu">|</span>
            <span>报账系统</span> -->
        </div>
        <el-dropdown class="header-center" trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
                {{$t('message.personalCenter')}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="changePsd">{{$t('message.changePassword')}}</el-dropdown-item>
                <el-dropdown-item command="longinOut">{{$t('message.signOut')}}</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    export default {
        name: 'headerApp',
        data (){
            return {
            }
        },
        mounted() {
        },
        methods: {
            handleCommand(val){
                if(val == 'longinOut'){  // 退出登录
                    this.$confirm(this.$t('message.tipsTitle'), this.$t('message.tips'), {
                        confirmButtonText: this.$t('message.okBtn'),
                        cancelButtonText: this.$t('message.cancelBtn'),
                        type: 'warning'
                    }).then(() => {
                        this.$router.push("/");
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: this.$t('message.cancelledTips'),
                        });          
                    });
                }else if(val == 'changePsd'){  // 修改密码

                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .header-app {
        width: 100%;
        height:60px;
        //background-color: #303133;
        background-image: url('../../assets/img/header.jpg');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        // padding: 0 40px;
        overflow: hidden;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        justify-content: space-between;
        .header-left {
            width: 240px;
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            /* .shu {
                display: inline-block;
                margin: 0 5px;
            }
            > span {
                font-family: MicrosoftYaHei-Bold;
                font-size: 20px;
                font-weight: bold;
                font-stretch: normal;
                letter-spacing: 0px;
                color: rgb(255, 208, 75);
            } */
        }
        .header-center{
            margin-right: 40px;
            //margin-left: 50px;
            color: #fff;
            font-size: 14px;
            justify-content: flex-end;
        }
    }
</style>
