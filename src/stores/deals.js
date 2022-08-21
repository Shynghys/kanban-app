import {
    defineStore
} from 'pinia'

export const useDealsStore = defineStore('deals', {
    state: () => {
        return {
            selectedTitle: ""
        }
    },
    actions: {
        chooseTitle(title) {
            console.log("aaa")
            this.selectedTitle = title
        },
    },
})