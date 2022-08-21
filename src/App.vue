<template>
	<div class="container">
		<div class="title">Отображение списка сделок</div>

		<div>
			<tabs ref="deals" :options="{ defaultTabHash: 'Новая' }">
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
import TheCard from "./components/TheCard.vue";
import { Tabs, Tab } from "vue3-tabs-component";

import { ref, nextTick, onMounted, computed } from "vue";
import axios from "axios";
import { useDealsStore } from "@/stores/deals";

let deals = ref([]);
let status = ref([]);
const dealsStore = useDealsStore();

function filterByStage(deals1, stage) {
	return deals1.filter((item) => item.STAGE_ID == stage);
}
function clickTab(name) {
	console.log("a", name);
	dealsStore.chooseTitle(name);
}
onMounted(() => {
	nextTick(async function () {
		let url = `https://aso-test-1.bitrix24.ru/rest/1/83go2kp1c28weuej/crm.deal.list`;
		await axios.get(url).then((response) => {
			deals.value = response.data.result;
		});
		deals.value.filter((item) => {
			console.log(item.STAGE_ID);
			return item.STAGE_ID == "Preparation";
		});
		let url1 = `https://aso-test-1.bitrix24.ru/rest/1/83go2kp1c28weuej/crm.status.list`;
		await axios.get(url1).then((response) => {
			status.value = response.data.result.filter(
				(item) => item.ENTITY_ID == "DEAL_STAGE"
			);
		});
		// deals.value.selectTab("#Новая");
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
	padding: 10px;
	margin-bottom: 5px;
}
.tabs-component-tab a {
	text-decoration: none;
}
</style>
