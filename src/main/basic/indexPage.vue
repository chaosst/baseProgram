<style scoped>
.indexPage {
	font-size: 14px;width:calc(100% - 10px);
}
.el-row{
	margin: auto !important;padding-top: 20px;position: relative;
}

</style>
<template>
	<div class="indexPage" v-cloak>
		<el-row :gutter="20">
			<panel-money></panel-money>
		</el-row>
		<el-row :gutter="20">
			<panel-bill></panel-bill>
		</el-row>	
		<el-row :gutter="20">
			<to-do></to-do>
			<teller-manage></teller-manage>
			<add-module></add-module>
		</el-row>		
	</div>
</template>

<script>
import panelMoney from '@/components/panel/panelMoney'
import panelBill from '@/components/panel/panelBill'
import toDo from '@/components/panel/toDo'
import tellerManage from '@/components/panel/tellerManage'
import addModule from '@/components/panel/addModule'
export default {
	name: 'indexPage',
	components: {
		panelMoney,
		panelBill,
		toDo,
		tellerManage,
		addModule
	},
	data() {
		return {
			
		}
	},
	methods: {

	},
}
</script>