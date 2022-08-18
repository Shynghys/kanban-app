<template>
	<div class="tabs">
		<ul class="tabs__header">
			<li
				v-for="title in tabTitles"
				:key="title"
				@click="selectedTitle = title"
				:class="selectedTitle == title ? 'is-active' : ''"
			>
				{{ title }}
			</li>
		</ul>
		<slot></slot>
	</div>
</template>

<script >
import { ref, provide } from "vue";

export default {
	setup(props, { slots }) {
		console.log(slots.default());
		const tabTitles = ref(
			slots.default().map((tab) => {
				console.log(11, props, tab);
				return tab?.props?.title;
			})
		);
		const selectedTitle = ref(tabTitles.value[0]);
		provide("selectedTitle", selectedTitle);
		return { selectedTitle, tabTitles };
	},
};
</script>
<style>
.tabs {
	/* max-width: 400px; */
	padding: 20px;
}
.tabs__header {
	margin-bottom: 10px;
	list-style: none;
	padding: 0;
	border: 1px solid grey;
	font-size: 30px;
}
/* .tabs__header */
</style>