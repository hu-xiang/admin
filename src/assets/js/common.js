export default {
	timeFix: function () {
		const time = new Date();
		const hour = time.getHours();
		if (!sessionStorage.getItem('lang') || sessionStorage.getItem('lang') == 'cn') {
			return hour < 9 ? '早上好' : (hour <= 11 ? '上午好' : (hour <= 13 ? '中午好' : (hour < 20 ? '下午好' : '晚上好')))
		} else {
			return hour < 9 ? 'good morning' : (hour <= 11 ? 'good morning' : (hour <= 13 ? 'good afternoon' : (hour < 20 ? 'good afternoon' : 'good evening')))
		}

	},
	welcome: function () {
		if (!sessionStorage.getItem('lang') || sessionStorage.getItem('lang') == 'cn') {
			const arr = ['您是一位有恒心有毅力的人，我很佩服您！', '我很荣幸，认识你这样有内涵的漂亮朋友！', '愿你三冬暖，愿你春不寒！', '加油，你是最棒的！'];
			let index = Math.floor((Math.random() * arr.length));
			return arr[index]
		} else {
			const arr = ['you are a person with perseverance and perseverance, and I admire you！', 'I ’m honored to meet a beautiful friend like you', 'may your winter be warm, and you may not be cold in spring', 'come on, you are the best'];
			let index = Math.floor((Math.random() * arr.length));
			return arr[index]
		}
	},
	dateFormat: function (time, fmt) { // 日期格式化
		if (!time) {
			return "";
		}
		var d = new Date(time);
		var o = {
			"M+": d.getMonth() + 1, //月份
			"d+": d.getDate(), //日
			"z+": d.getDate() - 1, //昨日
			"h+": d.getHours(), //小时
			"m+": d.getMinutes(), //分
			"s+": d.getSeconds(), //秒
			"q+": Math.floor((d.getMonth() + 3) / 3), //季度
			"S": d.getMilliseconds() //毫秒
		};
		if (/(y+)/.test(fmt))
			fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt))
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	},
	dateFormatSecond(time) { // 精确到秒
		return this.dateFormat(time, 'yyyy-MM-dd hh:mm:ss');
	},
	dateFormatDay(time) { // 精确到天
		return this.dateFormat(time, 'yyyy-MM-dd');
	},
	changeValueByKeyInObj(key, obj, value) { // 改变对象中某个值
		for (var i in obj) {
			if (i == key) {
				obj[i] = value;
				break;
			}
		}
	},
	getCheckItemVal(item, arr, val, key) { // 值、数组、已知key值、需要的key值
		var str = '';
		for (var i in arr) {
			if (arr[i][val] == item) {
				str = arr[i][key];
				break;
			}
		}
		return str;
	},
	clone(obj) { // 深度clone
		return JSON.parse(JSON.stringify(obj));
	},
	getRandomID(length) {  // 生成可控长度的随机数
		let len = length ? parseInt(length) : 16;
		return Number(Math.random().toString().substr(3, len) + Date.now()).toString(36);
	},
	autoLoad(blob, name = 'data.xls') {
		const n = `${name}`;
		if (window.navigator.msSaveOrOpenBlob) {
			window.navigator.msSaveOrOpenBlob(blob, n);
		} else {
			const urlObject = window.URL || window.webkitURL || window;
			const sl = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
			sl.href = urlObject.createObjectURL(blob);
			sl.download = n;
			if (document.all) {
				sl.click();
			} else {
				const ev = document.createEvent('MouseEvents');
				ev.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				sl.dispatchEvent(ev);
			}
		}
	},
	upload: (fileType = 'excel') => new Promise((resolve) => {
		let elm = document.createElement('input');
		elm.setAttribute('type', 'file');
		// 根据文件类型设置可接收文件类别
		switch (fileType) {
			case 'image':
				elm.setAttribute('accept', 'image/gif,image/jpeg,image/jpg,image/png,image/svg');
				break;
			case 'excel':
				elm.setAttribute('accept', '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel');
				break;
		}
		elm.style.display = 'none';
		elm.addEventListener('change', async (e) => {
			const file = e.target.files[0] || e.dataTransfer.files[0];
			document.body.removeChild(elm);
			elm = null;
			resolve(file);
		});
		document.body.appendChild(elm);
		elm.click();
	}),
}