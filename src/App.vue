<template>
	<div class="container">
		<div>Отображение списка сделок</div>

		<div>
			<the-tabs class="tabs__wrapper">
				<the-tab title="deals[0]?.STAGE_ID">
					<the-card
						v-for="item in deals.filter(
							(item) => item.STAGE_ID == deals[0]?.STAGE_ID
						)"
						:key="item.ID"
						:item="item"
				/></the-tab>
				<the-tab title="2">
					<the-card
						v-for="item in deals.filter(
							(item) => item.STAGE_ID == deals[1]?.STAGE_ID
						)"
						:key="item.ID"
						:item="item"
				/></the-tab>
				<the-tab v-for="tab in status" :key="tab.ID" :title="tab.NAME"
					><the-card
						v-for="item in deals.filter((item) => item.STAGE_ID == tab.NAME)"
						:key="item.ID"
						:item="item"
					/>
				</the-tab>
			</the-tabs>
			<!-- {{ status }} -->
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
		// console.log(url);
		await axios.get(url).then((response) => {
			deals.value = response.data.result;
			// console.log(response.data.result, deals, deals.value[0].STAGE_ID);
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
.is-active {
	background: grey;
}
</style>
