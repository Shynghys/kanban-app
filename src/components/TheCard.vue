<template>
	<div class="card">
		<div class="card__title">{{ item.TITLE }}</div>
		<div class="card__price">{{ item.OPPORTUNITY }} {{ item.CURRENCY_ID }}</div>
	</div>
</template>

<script setup>
const props = defineProps({
	item: Object,
});
let { item } = props;
// console.log(111, item);
</script>

<style>
.card {
	padding: 20px;
	border: 1px solid black;
}
.card__title {
	font-size: 20px;
}
</style>
