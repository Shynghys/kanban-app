<template>
	<div class="card">
		<div>
			<div class="card__title">{{ item.TITLE }}</div>
			<div class="card__price">
				{{ item.OPPORTUNITY }} {{ item.CURRENCY_ID }}
			</div>
		</div>
		<div>
			<div
				v-for="product in item.products"
				:key="product.ID"
				class="card__products"
			>
				<div class="card__product">
					<div>{{ product.PRODUCT_NAME }}</div>
					|
					<div>{{ product.QUANTITY }}</div>
					|
					<div>{{ product.PRICE }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, nextTick, onMounted, computed } from "vue";
import axios from "axios";

const props = defineProps({
	item: Object,
});
let { item } = props;
onMounted(() => {
	nextTick(async function () {
		console.log("the card on mount");
		let url = `https://aso-test-1.bitrix24.ru/rest/1/83go2kp1c28weuej/crm.deal.productrows.get?id=${item.ID}`;
		// console.log(url);
		await axios.get(url).then((response) => {
			item.products = response.data.result;
			// console.log(response.data.result, deals, deals.value[0].STAGE_ID);
		});
	});
});
// console.log(111, item);
</script>

<style>
.card {
	padding: 20px;
	border: 2px solid rgb(196, 196, 196);
	display: flex;
	justify-content: space-between;
	width: 1000px;
	position: relative;
	border-radius: 10px;
	margin: 5px 20px;
}
.card__title {
	font-size: 40px;
}
.card__products {
	display: flex;
	flex-direction: column;
}
.card__product {
	display: flex;
	justify-content: flex-start;
	font-size: 20px;
	gap: 20px;
}
</style>
