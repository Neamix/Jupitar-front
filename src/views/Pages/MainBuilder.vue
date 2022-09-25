<template>
  <PageSlot>
    <div class=" flex ">
      <ul class=" grow-1 ">
        <li class=" bg-gray-100 p-2 border-2 rounded-sm border-gray-300 mb-2 grabbable" draggable="true" @dragstart="startDrag($event,'text_input')">
          <span class="text-xs font-semibold">Text input</span>
          <span class="block text-xs text-gray-500 ">Single line input</span>
        </li>
        <li class=" bg-gray-100 p-2 border-2 rounded-sm border-gray-300 mb-2 grabbable" draggable="true" @dragstart="startDrag($event,'text_area')">
          <span class="text-xs font-semibold">Text area</span>
          <span class="block text-xs text-gray-500 ">Multi line area</span>
        </li>
        <li class=" bg-gray-100 p-2 border-2 rounded-sm border-gray-300 mb-2 grabbable" draggable="true" @dragstart="startDrag($event,'text_date')">
          <span class="text-xs font-semibold">Date</span>
          <span class="block text-xs text-gray-500 ">Add date</span>
        </li>
        <li class=" bg-gray-100 p-2 border-2 rounded-sm border-gray-300 mb-2 grabbable" draggable="true" @dragstart="startDrag($event,'text_radio')">
          <span class="text-xs font-semibold">Radio Options</span>
          <span class="block text-xs text-gray-500 ">Select only one of options</span>
        </li>
        <li class=" bg-gray-100 p-2 border-2 rounded-sm border-gray-300 mb-2 grabbable" draggable="true" @dragstart="startDrag($event,'text_checkbox')">
          <span class="text-xs font-semibold">Checkbox Options</span>
          <span class="block text-xs text-gray-500 ">Select multi options</span>
        </li>
        <li class=" bg-gray-100 p-2 border-2 rounded-sm border-gray-300 mb-2 active:cursor-pointer grabbable" draggable="true" @dragstart="startDrag($event,'text_upload')">
          <span class="text-xs font-semibold">File upload</span>
          <span class="block text-xs text-gray-500 ">Upload attachment file</span>
        </li>
      </ul>
      <div class=" grow-2 px-2 ">
        <div class="dropZone min-h-full bg-white border-2 flex justify-center items-center " @dragenter.prevent @dragover.prevent  @drop="endDrag($event)">
            <div class="empty_zone w-full min-h-full flex justify-center items-center border-dashed flex text-lg font-bold " @drop="endDrag($event)">
              Drag and Drop
            </div>
        </div>
      </div>
    </div>
  </PageSlot>
</template>

<script>
import PageSlot from "@/components/slots/PageSlot.vue";

export default {
  components: {PageSlot},
  data() {

  },
  methods: {
    startDrag($event,$type) {
      $event.dataTransfer.setData('type',$type);
    },

    endDrag($event) {
      let input = $event.dataTransfer.getData('type');
      console.log(input);
    }
  }
}
</script>