<template>
  <div class="modal bg-white rounded-md min-w-992 max-w-lg grid grid-cols-1">
      <div class="p-5 relative">
          <h2 class="font-extrabold text-headline ">Change your cover</h2>
          <div class="mt-4 h-full w-full">
              <div class="user_image">
                  <file-pond 
                    allow-multiple="false" 
                    max-files="3" 
                    imageCropAspectRatio="1:1"
                    accepted-file-types="image/jpeg, image/png"
                    @addfile="onAddFile"
                  />
              </div>
              <div class="flex right-2 items-center ml-auto">
                <div class="ml-auto flex">
                  <button 
                      @click="uploadingFile"
                      class=" focus:outline-0 mt-2 bottom-0  mt-5 text-xs font-semibold bg-blue-600 py-2 px-5 rounded-sm text-white flex items-center ">
                      <span>Upload cover</span>
                      <svg v-if="uploading" role="status" class=" mx-2 inline w-4 h-4 mr-2 text-wht animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#fff"/>
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill=" #00b4d8 "/>
                      </svg>
                  </button>
                  <button 
                      @click="closeModel()"
                      class=" ml-2 focus:outline-0 bottom-0 mt-5 text-xs font-semibold bg-red-600 py-2 px-5 rounded-sm text-white">
                      <span>Cancel</span>
                  </button>
                </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import vueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import { mapActions } from 'pinia';
import { useAuthStore } from '../../../stores/Auth';

const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginImageCrop
);

export default {
  name: "app",
  data: () => {
    return {
      uploading: false,
      images: {
        cover: null
      }
    }
  },
  methods: {
    ...mapActions(useAuthStore,['modifyCover']),
    uploadingFile() {
      this.uploading = true;
      this.modifyCover(this.images.cover).then((response) => {
        this.uploading = false;
        this.$emit('close');
      });
    },

    onAddFile(error, fileObject) {
      if ( ! error ) {
        this.images.cover = fileObject.file;
      }
    },

    closeModel() {
      this.$emit('close');
    }

  },
  components: {
    FilePond,
  },
};

</script>