<style scoped>
.el-col{position: relative;}
.el-card >>>.el-card__header{padding: 10px 15px;font-size: 16px;}

.item{
	width: 94%;position: relative;height: 30px;line-height: 30px;padding-left: 5%;
}
.item-point{
	width: 8px;height: 8px;background: #aaa;border-radius: 50%;
	position: absolute;left: 0;margin: auto;bottom: 0;top: 0;
}
.item-title{
	width: 65%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;
	float: left;margin: auto;text-align: left;
}
.item-time{
	font-size: 10px;color: #aaa;width: 35%;float: right;margin: auto;
	overflow: hidden;text-overflow: ellipsis;white-space: nowrap;text-align: right;
}
.item .pointActive{
	background: #409EFF;
}

</style>
<template>	
	<el-col :span="8">
		<el-card shadow="hover" :body-style="{padding: '10px 15px',height: '150px'}">
			  <div slot="header" class="clearfix">
			    <span>代办事项</span>
			  </div>
			  <div v-for="(item,index) in todoList" :key="index" class="item">
			  	<i class="item-point" :class="{pointActive: !item.status}"></i>
			  	<p class="item-title">{{ item.title }}</p>
			    <p class="item-time">{{ item.time }}</p>
			  </div>
		</el-card>
	</el-col>
</template>

<script>
export default {
	name: 'toDo',
	data() {
		return {
			todoList: [{
					title: '你有一条代办任务1',
					status: false,
					time: '2018-6-15 08:20:20'
				},
				{
					title: '你有一条代办任务2',
					status: false,
					time: '2018-6-18 04:20:10'
				},
				{
					title: '你有一条代办任务3',
					status: true,
					time: '2018-6-20 05:00:50'
				}, {
					title: '你有一条代办任务4',
					status: true,
					time: '2018-6-25 15:20:10'
				},
				{
					title: '你有一条代办任务5',
					status: true,
					time: '2018-6-30 18:20:00'
				}
			]
		}
	},
	methods: {

	},
}
</script>