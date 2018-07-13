<style scoped>
.el-col{position: relative;}
.el-col-20{width: 20% !important;}
.el-card{border-radius: 10px;}

.panel-bill{
	padding: 35px 20px 25px;background: #fff;height: 160px;position: relative;
	margin: 0 10px;
}
.panel-title{
	position: absolute;top: 8px;left: 30px;color: #409EFF;
}
.grid-content {
	background: #fff;height: 130px;position: relative;
	padding: 6%;color: #FFFDEF;font-size: 15px;
}
.grid-content p{
	margin: 0;height: 33px;line-height: 33px;
	overflow: hidden;text-overflow: ellipsis;white-space: nowrap;
}
.grid-content .grid-number{
	line-height: 40px;height: 40px;
}
.grid-content .grid-number span{
	font-size: 35px;
}
.grid-content .grid-detailed{
	position: absolute;background-color: rgba(80,80,80,0.3);
	bottom: 0;width: 94%;left: 0;right: 0;margin: auto;
	padding-left: 6%;font-size: 12px;
}
.el-icon-back{
	font-size: 10px;border: 1px solid #fff;border-radius: 50%;
	padding: 2px;position: absolute;right: 6%;top: 8px;
	transform: rotate(180deg);-ms-transform: rotate(180deg);
	-webkit-transform: rotate(180deg);-o-transform: rotate(180deg);
	-moz-transform: rotate(180deg);
}
</style>
<template>

	<div class="panel-bill">
		<span class="panel-title">图表模块</span>
	  <el-col class="el-col-20" v-for="(item,index) in billList" :key="item.id">
	    <el-card shadow="hover" :body-style="{ padding: '0px' }">
	      <div class="grid-content" :class="bgColor[index]">
	      	<p class="grid-title">{{ item.title }}</p>
	      	<p class="grid-number">
	      		<span>{{ item.number }}</span>个
	      	</p>
	      	<p class="grid-money">
	      		金额：<span>{{ item.money }}</span>元
	      	</p>
	      	<p class="grid-detailed">
	      		<span>数据明细</span>
	      		<i class="el-icon-back grid-icon-back"></i>
	      	</p>
	      </div>
	    </el-card>
	  </el-col>
	</div> 

</template>

<script>
export default {
	name: 'panelBill',
	data() {
		return {
			bgColor: ['bg-orange','bg-doderBlue','bg-deepSkyBlue','bg-hotPink','bg-blueViolet'],
			billList: [
				{
					id: 1,
					title: '收入款管理待录入单据',
					number: 10,
					money: 1658
				},
				{
					id: 2,
					title: '财务管理待录入单据',
					number: 20,
					money: 2225
				},
				{
					id: 3,
					title: '代放款单据',
					number: 30,
					money: 6880
				},
				{
					id: 4,
					title: '代审核单据',
					number: 40,
					money: 5445
				},
				{
					id: 5,
					title: '代收款单据',
					number: 50,
					money: 7555
				},
			]
		}
	},
	methods: {

	}
}
</script>