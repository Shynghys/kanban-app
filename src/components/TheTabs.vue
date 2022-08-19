<template>
	<div class="tabs">
		<ul class="tabs__header">
			<li
				v-for="title in tabTitles"
				:key="title"
				@click="clickTab(title)"
				:class="selectedTitle == title ? 'is-active' : ''"
			>
				{{ title }}
			</li>
		</ul>
		<slot></slot>
	</div>
</template>

<script >
import { ref, provide, defineEmits, onMounted, computed } from "vue";

export default {
	setup(props, { slots, emit }) {
		console.log(slots.default());
		// const tabTitles = ref(
		// 	slots.default().map((tab) => {
		// 		return tab?.props?.title;
		// 	})
		// );
		onMounted(() => {});
		let tabTitles = ref(
			computed(() => slots.default().map((tab) => tab.props?.title))
		);
		let selectedTitle = ref(tabTitles.value[0]);
		// const emit = defineEmits(["getDealFromTabs"]);

		function clickTab(title) {
			selectedTitle.value = title;
			console.log("clicktab", selectedTitle);
			// emit("getDealFromTabs", title);
		}
		provide("selectedTitle", selectedTitle);

		return { selectedTitle, tabTitles, clickTab };
	},
};
</script>
<style>
.tabs {
	/* max-width: 400px; */
	padding: 20px 0;
}
.tabs__header {
	margin-bottom: 10px;
	list-style: none;
	padding: 0;
	border: 1px solid grey;
	font-size: 30px;
	width: 300px;
}
.is-active {
	background: grey;
}
/* .tabs__header */
</style>