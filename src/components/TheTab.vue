<template>
	<div class="tab__content" v-show="title == dealsStore.selectedTitle">
		<slot></slot>
	</div>
</template>
<script>
import { inject } from "vue";

import { useDealsStore } from "@/stores/deals";

export default {
	props: ["title"],
	setup() {
		const dealsStore = useDealsStore();
		// const selectedTitle = inject("selectedTitle");

		return { dealsStore };
	},
};
</script>



<style>
.tab__content {
	width: 100%;
}
</style>
