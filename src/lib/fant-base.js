import Vue from 'vue';
import axios from '@/utils/request'
let permissions = {
    "get,/resources":true,
    "delete,/resources":true,
    "post,/resources":true,
    "put,/resources":true,
}
let has = function(permission){
    if(!permissions[permission]){
        return false;
    }
    return true;
}
var commonTemp = {
  //页面帮助步骤显示
  helpDom : {
    data:function() {
      return {
        visible: this.show
      };
    },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      photoOpt: {
        type: Array,
        required:true
      }
    },
    watch: {
      show:function () {
        this.visible = this.show;
      }
    },
    methods:{
      next:function(i){
        this.$set(this.photoOpt[i], "show", 0);
        this.$set(this.photoOpt[i+1], "show", 1);
      },
      prev:function(i){
        this.$set(this.photoOpt[i], "show", 0);
        this.$set(this.photoOpt[i-1], "show", 1);
      },
      close:function(){
        this.visible = 0;
      }
    },
    created:function(){
      this.photoOpt[0].show = true;
    },
    template:'<div v-if="visible"><div v-show="opt.show" v-for="(opt,index) in photoOpt" class="v-modal" style="z-index: 2243;"><img :src="opt.src" :class="opt.class" :style="{position:\'absolute\',top:typeof opt.top === \'number\'?opt.top+\'px\':opt.top,left:typeof opt.left === \'number\'?opt.left+\'px\':opt.left}" /><div class="fant-help-btn"><el-button type="primary" v-if="index!=0" @click="prev(index)" class="fant-help-prev">上一步</el-button><el-button type="primary" v-if="index!=(photoOpt.length-1)" @click="next(index)" class="fant-help-next">下一步</el-button><el-button type="warning" @click="close" class="fant-help-close">关闭</el-button></div></div></div>',
  }
}

var fantVueCommon = {};
fantVueCommon.install = function (Vue, options) {
  Vue.http = axios;
  Vue.prototype.$http = axios;
  Vue.arrayRemove = function(arr, val){
    var index = arr.indexOf(val);
    if (index > -1) {
      arr.splice(index, 1);
    }
  }
  Vue.prototype.$arrayRemove = Vue.arrayRemove;
  Vue.indexOfArray = function(arr, val) {
    var index = null;
    if(typeof val === "object") {
      var key = Object.keys(val)[0];
      arr.every(function (value, i) {
        if (value[key] === val[key]) {
          index = i;
          return false;
        }
        return true;
      });
    }else if(typeof val === "string"){
      index = arr.indexOf(val);
    }
    return index;
  }
  Vue.prototype.$indexOfArray = Vue.indexOfArray;
  Vue.encode=function (input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    input = Vue._utf8_encode(input);

    while (i < input.length) {

      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }

      output = output +
        this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
        this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

    }

    return output;
  }
  Vue.prototype.$encode = Vue.encode;

  // public method for decoding
  Vue.decode=function (input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    while (i < input.length) {

      enc1 = this._keyStr.indexOf(input.charAt(i++));
      enc2 = this._keyStr.indexOf(input.charAt(i++));
      enc3 = this._keyStr.indexOf(input.charAt(i++));
      enc4 = this._keyStr.indexOf(input.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      output = output + String.fromCharCode(chr1);

      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }

    }

    output = Vue._utf8_decode(output);

    return output;

  }
  Vue.prototype.$decode = Vue.decode;

  // private method for UTF-8 encoding
  Vue._utf8_encode=function (string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";

    for (var n = 0; n < string.length; n++) {

      var c = string.charCodeAt(n);

      if (c < 128) {
        utftext += String.fromCharCode(c);
      }
      else if((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      }
      else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }

    }

    return utftext;
  }
  Vue.prototype.$_utf8_encode = Vue._utf8_encode;

  // private method for UTF-8 decoding
  Vue._utf8_decode=function (utftext) {
    var string = "";
    var i = 0;
    var c = c1 = c2 = 0;

    while ( i < utftext.length ) {

      c = utftext.charCodeAt(i);

      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      }
      else if((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i+1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      }
      else {
        c2 = utftext.charCodeAt(i+1);
        c3 = utftext.charCodeAt(i+2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }

    }

    return string;
  }
  Vue.prototype.$_utf8_decode = Vue._utf8_decode;
  /**
   * 通过class或者id获取对象
   * @param el
   * @returns
   */
   Vue.getEl = function(el){
    var myel = el.substr(1);
    var key = el.split('')[0];
    if(key == "#"){
      return document.getElementById(myel);
    }else if(key == "."){
      return document.getElementsByClassName(myel);
    }
  }
  Vue.prototype.$getEl = Vue.getEl;
  /**
   * 同步ajax，原生js
   */
  Vue.ajax = function(obj){
    if(typeof obj !== "object"){
      return false;
    }
    if(typeof obj.method === "undefined"){
      obj.method="post";
    }else if(typeof obj.method !== "string"){
      return false;
    }
    if(typeof obj.url !== "string")return false;
    obj.emulateJSON = typeof obj.emulateJSON === "boolean"?obj.emulateJSON:true; //默认json格式传值
    var Root = "";
    let request = new XMLHttpRequest();
    request.open(obj.method, Root+obj.url, false) // 第三个参数 false 代表设置同步请求
    request.setRequestHeader('Accept', 'application/json');
    if(!obj.emulateJSON && typeof obj.data === "object"){
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      request.send(Vue.serialize(obj.data));
    }else if(obj.emulateJSON && typeof obj.data === "object"){
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(JSON.stringify(obj.data));
    }else{
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(JSON.stringify({}))
    }
    if(typeof obj.success === "function"){
      if (request.status === 200) {
        try {
          JSON.parse(request.response);
          var re = JSON.parse(request.response);
        } catch(e) {
          var re = request.response;
        }
        eval(obj.success(re));
      }
    }
    if(typeof obj.error === "function"){
      if (request.status !== 200) {
        var err = request.response;
        eval(obj.error(err));
      }
    }
  }
  Vue.prototype.$ajax = Vue.ajax;

  Vue.serialize = function(obj){
    if(typeof obj !== "object"){
      return false;
    }
    var ser = "";
    for(var en of Object.entries(obj)){
      ser += (en[0]+"="+en[1]+"&");
    }
    return ser;
  }
  Vue.prototype.$serialize = Vue.serialize;
  /**
   * 深拷贝函数
   */
  Vue.deepCopy = function (source) {
    var jsonStr = JSON.stringify(source);
    return JSON.parse(jsonStr);
  }
  Vue.prototype.$deepCopy = Vue.deepCopy;
  /**
   * 对象合并函数，浅拷贝
   */
  Vue.assign = function (source) {
    for (var _len = arguments.length, obj = Array(_len), _key = 0; _key < _len; _key++) {
      obj[_key] = arguments[_key];
    }
    return Object.assign.apply(Object, [source].concat(obj));
  }
  Vue.prototype.$assign = Vue.assign;
  /**
   * 将一组值转为数组
   */
  Vue.toArray = function () {
    return Array.of.apply(Array, arguments);
  }
  Vue.prototype.$toArray = Vue.toArray;
  /**
   * 将类数组转为数组
   */
  Vue.fromArray = function () {
    return Array.from.apply(Array, arguments);
  }
  Vue.prototype.$fromArray = Vue.fromArray;
  /**
   * 判断数字是否整数
   */
  Vue.isInteger = function (num) {
    return Number.isInteger(num);
  }
  Vue.prototype.$isInteger = Vue.isInteger;
  //添加全局资源
  /**
   * v-enter，自动focus标签下的第一个input，回车自动搜寻下一个的input
   */
  Vue.directive('enter', {
    inserted: function (el,binding,vnode) {
      var firstFocus = false;
      var btn = "";
      if(typeof binding.value == "object"){
        firstFocus = typeof binding.value.firstFocus == "boolean"?!binding.value.firstFocus:false;
        btn = typeof binding.value.btn == "string"?binding.value.btn:btn;
      }
      if(btn == ""){
        var inputs = el.getElementsByTagName("input");
        //ES6:Array.from,将类数组inputs转换为数组
        var inputs_ = Array.from(inputs);
        inputs_.map(function(item,index){
          if(item.getAttribute("disabled") && (item.getAttribute("disabled") == "disabled" || item.getAttribute("disabled") == true)){
            return ;
          }
          if(!firstFocus){
            item.focus();
          }
          firstFocus = true;
          item.addEventListener("keydown",function(e){
            if(e.keyCode == 13){
              var next = 0;
              for(next=index+1; next<inputs_.length; next++){
                if(!inputs_[next].getAttribute("disabled") || inputs_[next].getAttribute("disabled") == false){
                  if(inputs[next]){
                    //延迟聚焦下一个input，修复选择组件回车不聚焦下一个input的问题
                    setTimeout(function(){
                      if(item.vueEl){
                        if(item.vueEl.$el.className.indexOf("el-date-editor")!= -1){//修复日期控件回车后不选择下拉框不消失的问题
                          var today = Vue.fromArray(Vue.getEl(".today"));
                          for(let item of today.values()){
                            var a = item.closest(".el-date-picker");
                            if(a.isHidden()){
                              continue;
                            }
                            item.click();
                            break;
                          }
                        }
                        item.vueEl.$children[0].blur();
                        item.blur();
                      }
                      if(inputs[next].vueEl){
                        inputs[next].vueEl.$children[0].focus();
                      }else{
                        inputs[next].focus();
                        inputs[next].click();
                      }
                    },100);
                  }
                  break;
                }
              }

            }
          });
        });
      }else{
        el.addEventListener("keydown",function(e){
          if(e.keyCode == 13){
            Vue.getEl(btn).click();
          }
        });

      }
    }
  });
    /**
     * v-has，判断是否有权限
     */
  Vue.directive('has', {
      bind: function (el, binding) {
          if(!has(binding.value)){
              el.parentNode.removeChild(el);
          }
      }
  });

  //注入组件
  Vue.mixin({
    methods:{
      formatDate(row, column, cellValue){
        var formatStr = "yyyy-MM-dd"; //默认格式
        var dateReg = /^([0-9]{4})[-/\.年]([0-1]?[0-9]{1})[-/\.月]([0-3]?[0-9]{1})[日]?.?([0-2]?[0-9](:[0-6][0-9]){2})?/;
        var arr = dateReg.exec(cellValue);
        if (arr && arr[0]) {
          if (formatStr) {
            var subReg = /y+(.)M+(.)d+(.)?/i;
            var subArr = subReg.exec(formatStr);
            if (subArr) {
              var resStr = arr[1] + subArr[1];
              resStr += arr[2] + subArr[2];
              resStr += arr[3] + (subArr[3] || "");
              return resStr;
            }
          }
          return arr[0];
        }
        return "";
      },
      unFormatMoney:function(value){
        if(String(value).indexOf(",")!=-1){
          value = String(value).replace(/,/g, '');
        }
        return value;
      },
      formatMoney:function(value, places){
        if(!value){
          if(!places||typeof places!='number'){
            return '0.00';//如果返回0.00,显示结果是0,所以改成0.00字符串形式，默认保留两位小数
          }
          return parseFloat(0).toFixed(places)+'';
        }
        var myvalue = value;
        if(String(myvalue).indexOf("-")!=-1){
          value = Math.abs(parseFloat(value));
        }
        if(!places||typeof places!='number')
          value = parseFloat(value).toFixed(2);//默认取2位小数
        else
          value = parseFloat(value).toFixed(places);
        var decimal = String(value).split('.')[1] || '';//小数部分
        var tempArr = [];
        var revNumArr = String(value).split('.')[0].split("").reverse();//倒序
        for (var [i, val] of revNumArr.entries()){
          tempArr.push(val);
          if((i+1)%3 === 0 && i != revNumArr.length-1){
            tempArr.push(',');
          }
        }
        var zs = tempArr.reverse().join('');//整数部分
        if(String(myvalue).indexOf("-")!=-1){
          zs = "-"+zs;
        }
        var type = decimal?zs+'.'+decimal:zs;
        return type;
      }
    }
  })
  /**
   * 调用自定义组件
   */
  Vue.component("help",commonTemp.helpDom);
}

export default fantVueCommon;
