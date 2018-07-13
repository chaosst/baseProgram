/**
 * 验证规则定义
 */
var $valid = {};
$valid = {
		//验证金额，小数点后两位
		amount:function(rule, value, callback){
			var valid = (/^(([1-9]\d*)|\d)(\.\d{1,2})?$/).test(value);
	        if (!valid) {
	          callback(new Error('金额必须大于等于0，并最多2位小数，请输入正确的金额'));
	        } else {
	          callback();
	        }
	    },
	    //验证数字，小数点后四位
	    opsNum:function(rule, value, callback){
			var valid = (/^(\-?)(([1-9]\d*)|\d)(\.\d{1,4})?$/).test(value);
	        if (!valid) {
	          callback(new Error('最多4位小数，请重新输入'));
	        } else {
	          callback();
	        }
	    },
	    //验证数字，必须正数，小数点后四位
	    posNum:function(rule, value, callback){
			var valid = (/^(([1-9]\d*)|\d)(\.\d{1,4})?$/).test(value);
	        if (!valid) {
	          callback(new Error('必须大于等于0，并且最多4位小数，请重新输入'));
	        } else {
	          callback();
	        }
	    },
	    //验证负数，小数点后两位
	    minus:function(rule, value, callback){
			var valid = (/^([-][0-9]\d*)(\.\d{1,2})?$/).test(value);
	        if (!valid) {
	          callback(new Error('金额必须小于0，并最多2位小数，请输入正确的金额'));
	        } else {
	          callback();
	        }
	    },
	    //正整数
	    nteger:function(rule, value, callback){
			var valid = (/^(([1-9]\d*)|\d)?$/).test(value);
	        if (!valid) {
	          callback(new Error('请输入大于等于0的整数'));
	        } else {
	          callback();
	        }
	    },
	    intOrFloat:function(rule, value, callback){
			var valid = (/^\d+(\.\d+)?$/i).test(value);
	        if (!valid || parseFloat(value)<=0) {
	          callback(new Error('请输入数字，并确保大于0'));
	        } else {
	          callback();
	        }
	    },
	    //手机验证
	    phone:function(rule, value, callback){
			var valid = /^(?:1(3|5|7|8)\d)-?\d{5}(\d{3}|\*{3})$/.test(value);
	        if (!valid) {
	          callback(new Error('请输入11位数的手机号码'));
	        } else {
	          callback();
	        }
	    },
	    //电话验证
	    tel:function(rule, value, callback){
			var valid = /^[0-9]+-{0,1}[0-9]+$/.test(value);
			var a = (value.length>=6)&&(value.length<=20);
	        if (!(valid && a)) {
	          callback(new Error('请输入6-20个字符且不包含非法字符'));
	        } else {
	          callback();
	        }
	    },
	    //传真验证
	    fax:function(rule, value, callback){
	    	var valid = /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-|0\d{2,3})?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value);
	        if (!valid) {
	          callback(new Error('请输入正确的传真格式如：0751-5870829'));
	        } else {
	          callback();
	        }
	    },
	    //名称验证
	    name:function(rule, value, callback){
	    	var valid = /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/i.test(value);
	        if (!valid) {
	          callback(new Error('用户名不合法（字母开头，允许6-16字节，允许字母数字下划线）！'));
	        } else {
	          callback();
	        }
	    },
	    //验证年龄
	    age:function(rule, value, callback){
	    	var valid = /^(?:[1-9][0-9]?|1[01][0-9]|120)$/i.test(value);
	        if (!valid) {
	          callback(new Error('年龄必须在1-120之间！'));
	        } else {
	          callback();
	        }
	    },
	    //验证是否为空或者含有非法字符
	    normalChar:function(rule, value, callback){
	    	var valid = /^[a-zA-Z0-9\u4E00-\u9FA5]+$/.test(value);
	        if (!valid) {
	          callback(new Error('输入值不能为空和包含其他非法字符！'));
	        } else {
	          callback();
	        }
	    },
	    //验证是否为空或者含有非法字符括号除外
	    norma:function(rule, value, callback){
	    	var valid = !/[@#\$%\^&……\￥*\！!\。，\.,\；;\‘“\'"\~·\~`\-_\——、\：:\?？\/\\=+]+/g.test(value);
	        if (!valid) {
	          callback(new Error('输入值不能包含其他非法字符！'));
	        } else {
	          callback();
	        }
	    },
	    //验证货币
	    currency:function(rule, value, callback){
	    	var valid = /^\d+(\.\d+)?$/i.test(value);
	        if (!valid) {
	          callback(new Error('货币格式错误！'));
	        } else {
	          callback();
	        }
	    },
	    //描述
	    describe:function(rule, value, callback){
	    	var valid = "^\\d{6,80}$".test(value);
	        if (!valid) {
	          callback(new Error('请输入6-50个字符！'));
	        } else {
	          callback();
	        }
	    },
	    // 验证身份证
	    idcard:function(rule, value, callback){
	    	var valid = /^\d{15}(\d{2}[A-Za-z0-9])?$/i.test(value);
	        if (!valid) {
	          callback(new Error('身份证号码格式不正确'));
	        } else {
	          callback();
	        }
	    },
	    // 验证邮政编码
	    zip:function(rule, value, callback){
	    	var valid = /^[1-9]\d{5}$/i.test(value);
	        if (!valid) {
	          callback(new Error('邮政编码格式不正确,请输入不以零开头的六位数字。'));
	        } else {
	          callback();
	        }
	    },
	    notEmpty:function(rule, value, callback){
	    	var valid = $.trim(value) != '';
	        if (!valid) {
	          callback(new Error('不能为空，也不能全为空格'));
	        } else {
	          callback();
	        }
	    },
	    // 验证整数 可正负数
	    integer:function(rule, value, callback){
	    	var valid = /^([+]?[0-9])|([-]?[0-9])+\d*$/i.test(value);
	        if (!valid) {
	          callback(new Error('请输入整数'));
	        } else {
	          callback();
	        }
	    },
	    accessory:function(rule, value, callback){
	    	var valid = /^([+]?[1-9])+\d*$/i.test(value);
	        if (!valid) {
	          callback(new Error('请输入大于0的整数'));
	        } else {
	          callback();
	        }
	    },
	    assetValue:function(rule, value, callback){
	    	var valid = /^\d+(\.\d{1,2})*$/i.test(value);
	        if (!valid) {
	          callback(new Error('请输入大于等于0的数，且小数位最多2位'));
	        } else {
	          callback();
	        }
	    },
	    //登录账号验证
	    account:function(rule, value, callback){
	    	var valid = /^[A-Za-z0-9]{1}(_|[A-Za-z0-9]){0,19}?$/i.test(value);
	        if (!valid) {
	          callback(new Error('登录账号只能使用数字，字母，下划线，不能以下划线开头，并且不超过20个字符'));
	        } else {
	          callback();
	        }
	    },
	    noNum:function(rule, value, callback){
	    	var valid = /^[a-zA-Z\u4E00-\u9FA5]+?$/i.test(value);
	        if (!valid) {
	          callback(new Error('名称不能包含数字和其他非法字符，请重新输入'));
	        } else {
	          callback();
	        }
	    },
	    pointNum:function(rule, value, callback){
	    	var valid = /^(-)?\d+(\.\d{1,6})*$/i.test(value);
	        if (!valid) {
	          callback(new Error('请输入数字，且小数位最多6位'));
	        } else {
	          callback();
	        }
	    },
	    itemNum:function(rule, value, callback){
	    	var valid = /^([0-9]*[a-zA-Z\u4E00-\u9FA5]+[0-9]*)+$/i.test(value);
	        if (!valid) {
	          callback(new Error('不能为非法字符或全是数字'));
	        } else {
	          callback();
	        }
	    },
	    percentage:function(rule, value, callback){
	    	var valid = (/^(([1-9]\d*)|\d)(\.\d{1,2})?$/).test(value);
	        if (!valid || !(value>=0&&value<=100)) {
	          callback(new Error('请输入0-100之间的数字,最多两位小数。'));
	        } else {
	          callback();
	        }
	    },
      email:function(rule, value, callback){
        var valid = (/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/).test(value);
        if (!valid) {
          callback(new Error('请输入正确的邮箱格式,例：abc@ef.com'));
        } else {
          callback();
        }
      }
}
export default $valid;
