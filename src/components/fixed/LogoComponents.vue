<template>
    <div class="logo">
        <img :src="src" alt="logo" class="">
    </div>
</template>

<script>
    export default {

        props: {
            dark: Boolean
        },

        data() {
            return {
                src: ( this.dark ) ? "src/assets/img/system/logo_light.png" : "src/assets/img/system/logo.png",
            }
        },

        watch: {
            dark: function (value)
            {
                console.log('jer')
                this.src = ( value ) ? "src/assets/img/system/logo_light.png" : "src/assets/img/system/logo.png";             
            }
        }
    }
</script>