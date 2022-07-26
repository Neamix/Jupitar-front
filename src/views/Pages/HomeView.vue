<template>
   <PageSlot>
     <div class="p-4 w-full">
        <div class="w-full">
              <circle-progress
                    :percent="80"
                    :viewport="true"
                    :show-percent="true"
                    empty-color="#f7f7f7"
                    :border-width="6"
                    :border-bg-width="30"
                />
        </div>
    </div>
   </PageSlot>
</template>
<script>
import PageSlot from '../../components/slots/PageSlot.vue';
import "vue3-circle-progress/dist/circle-progress.css";
import CircleProgress from "vue3-circle-progress";

export default {
   components: {PageSlot,CircleProgress},
   data: function() {
       
    },
}
</script>