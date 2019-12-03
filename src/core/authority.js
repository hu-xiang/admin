import Vue from 'vue'
// 权限过滤
Vue.prototype.$auths = (key) => {
	const resourceCodes = sessionStorage.getItem('resourceCodes'); // 登陆成功后拿到的权限列表
	return (key && resourceCodes && resourceCodes.includes(key));
};