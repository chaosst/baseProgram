<style scoped>
.el-col{position: relative;}

.el-card >>>.el-card__header{
	padding: 10px 15px;font-size: 16px;
}

.icon-add-module{
	font-size: 50px;color: #409EFF;text-align: center;height: 100px;
	width: 100px;position: absolute;left: 0;right: 0;top: 0;bottom: 0;margin: auto;
}
.icon-add-module .text{
	font-size: 18px;color: #409EFF;text-align: center;margin: auto;
}
</style>
<template>
	<el-col :span="8">
		<el-card shadow="hover" :body-style="{padding: '10px 15px',height: '192px'}">
		 	<div class="icon-add-module">
		 		<i class="el-icon-circle-plus-outline"></i>
		 		<p class="text">添加模板</p>
		 	</div>
		</el-card>
	</el-col>
</template>

<script>
export default {
	name: 'addModule',
	data() {
		return {
			
		}
	},
	methods: {

	},
}
</script>