<template>
	<div class="container">
		<div>Отображение списка сделок</div>

		<div>
			<the-tabs>
				<the-tab title="Tab 1">Hello From Tab 1</the-tab>
				<the-tab title="Tab 2">Hello From Tab 2</the-tab>
			</the-tabs>
			<!-- {{ deals }} -->
			<the-card v-for="item in deals" :key="item.ID" :item="item" />
		</div>
	</div>
</template>

<script setup>
import TheTabs from "./components/TheTabs.vue";
import TheTab from "./components/TheTab.vue";
import TheCard from "./components/TheCard.vue";

import { ref, nextTick, onMounted } from "vue";
import axios from "axios";

let deals = ref([]);
let status = ref([]);
onMounted(() => {
	nextTick(async function () {
		let url = `https://aso-test-1.bitrix24.ru/rest/1/83go2kp1c28weuej/crm.deal.list`;
		console.log(url);
		await axios.get(url).then((response) => {
			deals.value = response.data.result;
			console.log(response.data.result, deals);
		});
		let url1 = `https://aso-test-1.bitrix24.ru/rest/1/83go2kp1c28weuej/crm.status.list`;
		console.log(url1);
		await axios.get(url1).then((response) => {
			status.value = response.data.result;
			console.log(response.data.result, status);
		});
	});
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Bitter:wght@300;500;600&display=swap");

html {
	box-sizing: border-box;
	font-family: "Bitter", serif;
}

*,
*:before,
*:after {
	box-sizing: border-box;
	margin: 0;
}

.container {
	position: relative;
	width: 1300px;
	margin: 0 auto;
}

.widget__gear-icon {
	z-index: 200;
	position: absolute;
	top: 10px;
	right: 15px;
	width: 25px;
	background: transparent;
}
</style>
