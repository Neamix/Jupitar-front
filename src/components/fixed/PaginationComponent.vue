<template>
    <div aria-label="Page navigation example">
        <ul class="inline-flex -space-x-px mt-5">
            <li @click="moveSwipers('backward')">
                <a href="#"
                    class="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
            </li>
            <li v-for="(index,page) in pages" :key="page">
                <a 
                @click="getPage = index;swipeing()"
                href="#" 
                :class="{'bg-blue-700 text-white': this.getPage - 1 == page}"
                class="py-2 px-3 leading-tight text-gray-500  border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{{ index }}</a>
            </li>
            <li @click="moveSwipers('forward')">
                <a href="#"
                    class="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ["pages"],
    data() {
        return {
            getPage: parseInt(localStorage.getItem('CollegePager') || 1)
        }
    },
    methods: {
        moveSwipers(direction) {
            if ( direction == 'backward' ) {
                if ( this.getPage == 1 ) {
                    this.getPage == this.pages;
                } else {
                    this.getPage = this.getPage - 1;
                }

                localStorage.setItem('CollegePager',this.getPage);
                this.swipeing();
            }

            if ( direction == 'forward' ) {
                if ( this.getPage == this.pages ) {
                    this.getPage = 1;
                } else {
                    console.log(this.getPage);
                    this.getPage = this.getPage + 1
                    console.log(this.getPage);
                }
            }

            localStorage.setItem('CollegePager',this.getPage);
            this.swipeing();
        },
        swipeing() {
            localStorage.setItem('CollegePager',this.getPage);
            this.$emit('swipePage',this.getPage)
        }
    },
}
</script>