<template>
    <div class="workbench">
        <div class="workbench-top">
            <el-row type="flex" class="row-bg">
                <el-col :span="16">
                    <div class="grid-content bg-purple">
                        <div class="personInfo">
                            <img src="../../../assets/img/man.png" class="personImg" v-if="isSex == '1'" />
                            <img src="../../../assets/img/women.png" class="personImg" v-else />
                            <span>{{time}}，<span class="userName">{{userName}}</span>，{{blessing}}</span>
                        </div>

                    </div>
                </el-col>
                <el-col class="right" :span="8">
                    <div class="grid-content bg-purple-light">
                        <span class="myApplication">{{$t('message.myApplication')}}：<span
                                class="account">0</span></span>
                        <span>{{$t('message.myApproval')}}：<span class="account">0</span></span>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="workbench-content">
            <div class="workbench-content-item first">
                {{$t('message.myApplication')}}
            </div>
            <div class="workbench-content-item">
                {{$t('message.myApproval')}}
            </div>
        </div>
        <div class="workbench-content">
                <div class="workbench-content-item first">
                    {{$t('message.approvalQuery')}}
                </div>
                <div class="workbench-content-item">
                    {{$t('message.newsAnnouncement')}}
                </div>
            </div>
    </div>
</template>

<script>
    export default {
        name: 'workbench',
        data() {
            return {
                time: '',
                blessing: '',
                isSex: '',
                userName: '',
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.time = this.$api.timeFix();
                this.blessing = this.$api.welcome();
                this.isSex = JSON.parse(sessionStorage.getItem('userInfo')).sex;
                this.userName = this.$i18n.locale == 'cn' ? JSON.parse(sessionStorage.getItem('userInfo')).realname : JSON.parse(sessionStorage.getItem('userInfo')).username;
            });
        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped>
    .workbench {
        .workbench-top {
            background-color: #ffffff;
            border-radius: 10px;
            padding: 12px 12px 5px;
            height: 80px;

            .personInfo {
                display: flex;
                align-items: center;

                .personImg {
                    width: 60px;
                    height: 60px;
                }

                .userName {
                    color: #f45d2f;
                }
            }

            .right {
                display: flex;
                align-items: center;

                .myApplication {
                    padding-right: 30px;
                }

                .account {
                    color: #f45d2f;
                }
            }
        }

        .workbench-content {
            display: flex;
            //background-color: #ffffff;
            //border-radius: 10px;
            //padding: 12px 12px 5px;
            margin-top: 5px;
            justify-content: space-between;
            .workbench-content-item {
                background-color: #ffffff;
                padding: 12px 12px 5px;
                border-radius: 10px;
                min-height: 350px;
                flex: 0.5;
            }
            .first {
                margin-right: 5px;
            }
        }
    }
</style>