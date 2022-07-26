<template>
    <div class="page p-4 w-full h-full-screen wide transition-all relative" :class="{'shifted': collectionStore.menu && collectionStore.myScreen > 896}">
       	<slot/>
    </div>
</template>

<script>
import * as XLSX from 'xlsx/xlsx.mjs';
import { mapStores } from 'pinia';
import { useCollectionStore } from "@/stores/collection";

export default {
    data() {
        return {
            dropmenu: {
                language: false,
                notification: false,
            },
        }
    },
    computed: {
        ...mapStores(useCollectionStore)
    },
    mounted() {
       
    }
}
</script>