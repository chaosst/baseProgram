<style scoped>
.el-row{
	margin: auto !important;padding-top: 20px;position: relative;
}
.el-col{position: relative;}

.el-card >>>.el-card__header{
	padding: 10px 15px;font-size: 16px;
}

.manage-item{
	text-align: center;padding-bottom: 10px;padding-top: 3px;
}
.manage-item img{
	width: 60%;
}
.manage-item p{
	margin: 0;font-size: 12px;color: #666;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;
}

</style>
<template>
	<el-col :span="8">
		<el-card shadow="hover" :body-style="{padding: '10px 15px',height: '150px'}">
		  <div slot="header" class="clearfix">
		    <span>出纳管理</span>
		  </div>
		  <el-row :gutter="20" style="padding-top: 0;">
	  	 	<el-col :span="6" v-for="item in manageList" :key="item.id" class="manage-item">
					<img :src="item.src"/>
	  			<p>{{ item.title }}</p>
	  	 	</el-col>
		  </el-row>
		</el-card>
	</el-col>
</template>

<script>
export default {
	name: 'tellerManage',
	data() {
		return {
			manageList: [{
					id:1,
					title: '银行初试化',
					src: 'https://cdn-img.easyicon.net/png/12115/1211569.gif',
				},
				{
					id:2,
					title: '银行日记账',
					src: 'https://cdn-img.easyicon.net/png/12115/1211545.gif',
				},
				{
					id:3,
					title: '银行对账单',
					src: 'https://cdn-img.easyicon.net/png/12115/1211549.gif',
				}, 
				{
					id:4,
					title: '银行存款对账',
					src: 'https://cdn-img.easyicon.net/png/12115/1211513.gif',
				},
				{
					id:5,
					title: '余额调节表',
					src: 'https://cdn-img.easyicon.net/png/12115/1211531.gif',
				},
				{
					id:6,
					title: '现金日记账',
					src: 'https://cdn-img.easyicon.net/png/12115/1211537.gif',
				},
				{
					id:7,
					title: '现金盘点单',
					src: 'https://cdn-img.easyicon.net/png/12115/1211515.gif',
				},
				{
					id:8,
					title: '出纳对账',
					src: 'https://cdn-img.easyicon.net/png/12115/1211541.gif',
				},
			]
		}
	},
	methods: {

	},
}
</script>