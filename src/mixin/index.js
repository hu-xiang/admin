import Vue from 'vue';

Vue.mixin({
  data() {
    return {
    };
  },
  computed: {
    routerList() {
      return [
        {
          path: "/workBench",
          name: this.$t('message.workbench'),
          icon: "el-icon-menu"
        },
        {
          path: "/budgetManage",
          name: this.$t('message.budgetManagement'),
          icon: "el-icon-s-data",
          children: [
            {
              path: "/budgetEntry",
              name: this.$t('message.budgetEntry')
            },
            {
              path: "/budgetChange",
              name: this.$t('message.budgetAdjustment')
            },
            {
              path: "/budgetApproval",
              name: this.$t('message.budgetApproval')
            },
            {
              path: "/rightSetting",
              name: this.$t('message.approveAndSignRights')
            },
            {
              path: "/transSetting",
              name: this.$t('message.travelExpenses')
            },
            {
              path: "/subsidySetting",
              name: this.$t('message.travelAllowance')
            },
            {
              path: "/liveSetting",
              name: this.$t('message.travelAccommodation')
            },
            {
              path: "/classMaintenance",
              name: this.$t('message.budgetCategoryMaintenance')
            }
          ]
        },
        {
          path: "/travelApply",
          name: this.$t('message.travelApplication'),
          icon: "el-icon-s-promotion",
          children: [
            {
              path: "/travelEntry",
              name: this.$t('message.travelApplicationEntry')
            },
            {
              path: "/travelQuery",
              name: this.$t('message.TravelApplicationInquiry')
            }
          ]
        },
        {
          path: "/reimbursement",
          name: this.$t('message.reimbursement'),
          icon: "el-icon-s-shop",
          children: [
            {
              path: "/feeEntry",
              name: this.$t('message.reimbursementEntry')
            },
            {
              path: "/feeQuery",
              name: this.$t('message.reimbursementInquiry')
            }
          ]
        },
        {
          path: "/reportAnalysis",
          name: this.$t('message.reportAnalysis'),
          icon: "el-icon-s-finance",
          children: [
            {
              path: "/budget",
              name: this.$t('message.budgetPerformance')
            },
            {
              path: "/fee",
              name: this.$t('message.reimbursementDetails')
            },
            {
              path: "/travel",
              name: this.$t('message.travelApplicationDetails')
            }
          ]
        },
        {
          path: "/personInfo",
          name: this.$t('message.personnelInformation'),
          icon: "el-icon-s-custom",
          children: [
            {
              path: "/userInfo",
              name: this.$t('message.employeeInformation')
            },
            {
              path: "/depart",
              name: this.$t('message.departmentalOrganizationalStructure')
            },
            {
              path: "/rank",
              name: this.$t('message.rankMaintenance')
            },
            {
              path: "/position",
              name: this.$t('message.postMaintenance')
            },
            {
              path: "/role",
              name: this.$t('message.roleManagement'),
              children: [
                {
                  path: "/role",
                  name: this.$t('message.roleList')
                },
                {
                  path: "/roleAdd",
                  name: this.$t('message.addRole')
                },
                {
                  path: "/roleEdit",
                  name: this.$t('message.editRole')
                },
                {
                  path: "/roleDelete",
                  name: this.$t('message.deleteRole')
                }
              ]
            }
          ]
        },
        {
          path: "/sysManage",
          name: this.$t('message.systemManagement'),
          icon: "el-icon-s-management",
          children: [
            {
              path: "/globalData",
              name: this.$t('message.systemGlobalParameters')
            },
            {
              path: "/comCode",
              name: this.$t('message.companyCodeMaintenance')
            },
            {
              path: "/accountSubject",
              name: this.$t('message.accoauntingSuSbjeacts')
            },
            {
              path: "/costCenter",
              name: this.$t('message.costCenterMaintenance')
            },
            {
              path: "/zone",
              name: this.$t('message.districtMaintenance')
            }
          ]
        }
      ]
    },
    tipsTitle() { return this.$t('message.tipsTitle') },
    tips() { return this.$t('message.tips') },
    okBtn() { return this.$t('message.okBtn') },
    cancelBtn() { return this.$t('message.cancelBtn') },
    cancelledTips() { return this.$t('message.cancelledTips') },
    noClose() { return this.$t('message.noClose') }
  },
  created() {
  },
  // 路由渲染前动作
  beforeRouteLeave(to, from, next) {
    // 判断是否有token，验证是否已登录
    if (sessionStorage.getItem('token')) {

      if (to.path === '/index') { // 由于白名单没有包含/index,但是进入系统必须通过/index,所以遇到index在已登录后放行
        return next();
      } else if (sessionStorage.getItem('resourceCodes').includes(to.path)) { // // 白名单放行
        return next();
      } else { // 黑名单禁止并给出提示
        ElementUI.Message.error({
          message: '您没有权限访问',
          duration: 3000,
          showClose: true
        });
      }

    } else { // 没有token，直接跳到登录页
      if (to.path === '/') {
        next();
      } else {
        ElementUI.Message.error({
          message: '您还没登陆',
          duration: 3000,
          showClose: true
        });
        next({ path: '/' });
      }
    }
    const pathName = window.location.origin + window.location.pathname; // 项目路径地址
    //判断版本是否更新(打包时执行)
    if (process.env.NODE_ENV !== 'development') { // 发布环境
      $.ajax({
        url: pathName + 'static/version.json?_=' + Math.random(), //json文件位置
        type: "GET",
        dataType: "json",
        success: function (data) {
          if (process.env.VERSION !== data.version) {
            Vue.prototype.$alert('系统版本有更新，点击确定加载最新，或按【CTRL + F5】！', '系统提示', {
              type: 'warning',
              showClose: false,
              callback(action, instance) {
                window.location.reload(true); // 强制刷新
              }
            });
            return;
          }
          next();
        },
        error: function (err) {
          next();
        }
      });
    }
  },
});