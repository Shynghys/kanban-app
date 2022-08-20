<template>
	<div class="container">
		<div class="title">Отображение списка сделок</div>

		<div>
			<tabs :options="{ defaultTabHash: 'Новая' }">
				<tab
					v-for="tab in status"
					:key="tab.ID"
					:name="tab.NAME"
					:id="tab.NAME"
				>
					<div v-if="filterByStage(deals, tab.STATUS_ID).length != 0">
						<the-card
							v-for="item in filterByStage(deals, tab.STATUS_ID)"
							:key="item.ID"
							:item="item"
						/>
					</div>
					<div v-else>
						<div class="card">
							<div>
								<div class="card__title">Нет сделок</div>
							</div>
						</div>
					</div>
				</tab>
			</tabs>
		</div>
	</div>
</template>

<script setup>
import TheTabs from "./components/TheTabs.vue";
import TheTab from "./components/TheTab.vue";
import TheCard from "./components/TheCard.vue";
import { Tabs, Tab } from "vue3-tabs-component";

import { ref, nextTick, onMounted, computed } from "vue";
import axios from "axios";

let deals = ref([]);
let status = ref([]);

let currentList = computed({
	// getter
	get() {
		return deals;
	},
	// setter
	set(newValue) {
		сonsole.log("setting");
		return newValue.map(async (deal) => await getProducts(deal));
	},
});
async function getDeal(tab) {
	сonsole.log("getdeal", tab);
	let url = `https://aso-test-1.bitrix24.ru/rest/1/83go2kp1c28weuej/crm.deal.productrows.get?id=${tab.STAGE_ID}`;
	await axios.get(url).then((response) => {
		deals.value = response.data.result;
		// console.log(response.data.result, deals, deals.value[0].STAGE_ID);
	});
}
function filterByStage(deals1, stage) {
	return deals1.filter((item) => item.STAGE_ID == stage);
}
async function getProducts(deal) {
	let url = `https://aso-test-1.bitrix24.ru/rest/1/83go2kp1c28weuej/crm.deal.productrows.get?id=${deal.ID}`;
	await axios.get(url).then((response) => {
		deals.value = response.data.result;
		// console.log(response.data.result, deals, deals.value[0].STAGE_ID);
	});
}
onMounted(() => {
	nextTick(async function () {
		let url = `https://aso-test-1.bitrix24.ru/rest/1/83go2kp1c28weuej/crm.deal.list`;
		// console.log(url);
		await axios.get(url).then((response) => {
			deals.value = response.data.result;
			// console.log(response.data.result, deals, deals.value[0].STAGE_ID);
		});
		// status.forEach(tab=>)
		currentList = deals.value.filter((item) => {
			console.log(item.STAGE_ID);
			return item.STAGE_ID == "Preparation";
		});
		let url1 = `https://aso-test-1.bitrix24.ru/rest/1/83go2kp1c28weuej/crm.status.list`;
		// console.log(url1);
		await axios.get(url1).then((response) => {
			status.value = response.data.result.filter(
				(item) => item.ENTITY_ID == "DEAL_STAGE"
			);
			// console.log(response.data.result, status);
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

.tabs__wrapper {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	width: 100%;
}

.title {
	font-size: 50px;
	margin-bottom: 20px;
}

.tabs-component {
	display: flex;
	align-items: flex-start;
	/* justify-content: space-between; */
	width: 100%;
}
.tabs-component-tabs {
	/* margin-bottom: 10px; */
	list-style: none;
	padding: 0;
	/* border: 1px solid grey; */
	font-size: 30px;
	width: 300px;
}
.tabs-component-tab {
	padding: 10px 0;
	margin-bottom: 5px;
}
.tabs-component-tab a {
	text-decoration: none;
}
</style>
