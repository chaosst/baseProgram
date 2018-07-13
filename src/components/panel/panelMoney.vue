<style scoped>
.el-col{position: relative;}
.el-col-20{width: 20% !important;}

.panel-money{position: relative;}
.grid-content {
	background: #fff;height: 110px;border-radius: 5px;position: relative;padding: 3% 6%;
}
.grid-title{
	height: 25px;line-height: 25px;margin: auto;
	color: #409EFF;width: 100%;position: relative;
}
.grid-title .icon-point{
	background: #409EFF;position: absolute;right: 0;top: 0;bottom: 0;
	width: 9px;height: 9px;border-radius: 50%;margin: auto;
}
.grid-eye{
	float: left;margin-top: 2%;height: 70px;color: #fff;
	width: 40%;text-align: center;
}
.grid-icon {
	font-size: 35px;width: 100%;line-height: 70px;
}
.grid-data {
	float: right;margin-top: 2%;width: 60%;height: 70px;text-align: center;
}
.grid-data .grid-money{
	padding-top: 8px;font-size: 25px;color: #222;font-weight: 700;
	width: 100%;height: 35px;line-height: 35px;
	overflow: hidden;text-overflow: ellipsis;white-space: nowrap;
} 
.grid-data .grid-percentage {
	font-size: 10px;color: #64d572;text-align: center;
}
</style>

<template>
	<div class="panel-money">
		<el-col class="el-col-20" v-for="(item,index) in moneyList" :key="item.id">
			<el-card shadow="hover" :body-style="{padding: '0px'}">
				<div class="grid-content">
					<div class="grid-title">
						<span>{{ item.title }}</span>
						<i class="icon-point" :class="bgColor[index]"></i>
					</div>
					<div class="grid-eye">
						<i class="el-icon-view grid-icon" :class="bgColor[index]"></i>
					</div>
					<div class="grid-data">
						<div class="grid-money">
							<span style="font-size: 16px;">￥</span>
							<span style="margin-left: -0.2rem;">{{ item.money }}</span>
						</div>
						<div class="grid-percentage">提前一日{{ item.percentage }}</div>
					</div>
				</div>
			</el-card>
		</el-col>
	</div>
</template>

<script>
export default {
	name: 'panelMoney',
	data() {
		return {
			bgColor: ['bg-firebrick','bg-darkCyan','bg-chocolate','bg-coral','bg-limeGreen'],
			moneyList: [
				{
					id:1,
					title: '销售金额',
					money: 4788,
					percentage: '10%',
				},
				{
					id:2,
					title: '入库金额',
					money: 5005,
					percentage: '20%',
				},
				{
					id:3,
					title: '收款金额',
					money: 6555,
					percentage: '30%',
					color: 'bg-chocolate'
				},
				{
					id:4,
					title: '收款金额',
					money: 7445,
					percentage: '40%',
				},
				{
					id:5,
					title: '支出金额',
					money: 8825,
					percentage: '50%',
				},
			]
		}
	},
	methods: {

	}
}
</script>