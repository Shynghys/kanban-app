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

					<div>{{ product.QUANTITY }} шт.</div>

					<div>{{ product.PRICE }} тг.</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, nextTick, onMounted, computed } from "vue";
import axios from "axios";

const { item } = defineProps({
	item: Object,
});
onMounted(() => {
	nextTick(async function () {
		let url = `https://aso-test-1.bitrix24.ru/rest/1/83go2kp1c28weuej/crm.deal.productrows.get?id=${item.ID}`;

		await axios.get(url).then((response) => {
			item.products = response.data.result;
		});
	});
});
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
	/* display: flex;
	justify-content: flex-start; */
	display: grid;
	grid-template: auto/repeat(3, 1fr);
	place-items: center flex-end;
	/* grid-template-columns: repeat(5, 1fr 2fr); */
	font-size: 20px;
	gap: 20px;
}
.card__product div:not(:last-child) {
	padding-right: 20px;
	border-right: 1px solid black;
}
</style>
