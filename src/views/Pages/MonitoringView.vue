<template>
    <PageSlot>
        <div class="w-full bg-white shadow-sm rounded-md p-3">
            <h2 class="font-bold text-26 mb-4">Monitoring</h2>
            <!-- <button class="bg-silvery border-light-silvery px-5 py-1 text-xs rounded-xl font-semibold">Search Options</button> -->
            <div class="xl:flex filter-search grid grid-cols-1">
                <div class="search-container ml-2 md:ml-0">
                    <label class="block text-xs font-lightbold pl-1 py-1">Search College</label>
                    <svg viewBox="64 64 896 896" focusable="false" data-icon="search" width="1em" height="1em" fill="#5e5e5e" aria-hidden="true" class="absolute mt-2 w-4 text-md w-5 ml-2" style="width: 13px; margin:9px"><path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path></svg>
                    <input type="search" class="bg-gray-50 text-sm px-3 py-2 min-w-fit search" placeholder="Search.."/>
                </div>
                <div class="search-container ml-2">
                    <label class="block text-xs font-lightbold pl-1  py-1">Record from</label>
                    <input type="date" class="bg-gray-50 text-sm px-3 py-2 min-w-fit search" placeholder="Search Colleage.."/>
                </div>
                <div class="search-container ml-2">
                    <label class="block text-xs font-lightbold pl-1  py-1">Record to</label>
                    <input type="date" class="bg-gray-50 text-sm px-3 py-2 min-w-fit search" placeholder="Search Colleage.."/>
                </div>
                <ul class="ml-auto mt-6 flex justify-center md:justify-end w-full">
                    <button class="btn flex bg-green-100 justify-center items-center uppercase md:w-50p w-30">
                        <img src="@/assets/img/icon/excel.png" alt="excel" class="icon"/>
                        <span class="text-white px-2 font-lightbold text-us">Export As Excel</span>
                    </button>
                     <button class="btn flex items-center ml-2 bg-red-500 uppercase justify-center md:w-50p w-30 ">
                        <img src="@/assets/img/icon/pdf.png" alt="excel" class="icon"/>
                        <span class=" text-us text-white px-2 font-lightbold">Export As PDF</span>
                    </button>
                </ul>
            </div>
        </div>
        <div class="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">

            <div class="card mt-5 bg-white shadow-sm mx-2 rounded-md" v-for="user in users" :key="user.id">
                <div class="shadow-sm rounded-md w-full flex items-center">
                    <img :src="user.avatar" alt="person" class="avatar rounded-full p-3"/>
                    <div class="user-info">
                        <h3 class="text-sm font-semibold">{{ user.name }}</h3>
                        <p class="text-xs text-gray-600 ">{{ user.role }}</p>
                    </div>
                </div>
                <div class="status-info p-4 grid grid-cols-3 ">
                    <div class="status  mt-2">
                        <p class="d-block text-xs font-semibold ">
                            <span class=" w-2 h-2 bg-green-600 inline-block rounded-full "></span>
                            Ready
                        </p>
                        <span class="text-xs">1 Hour 22 Min</span>
                    </div>
                     <div class="status  mt-2">
                        <p class="d-block text-xs font-semibold ">
                            <span class=" w-2 h-2 bg-red-600 inline-block rounded-full "></span>
                            Busy
                        </p>
                        <span class="text-xs">1 Hour 22 Min</span>
                    </div>
                     <div class="status  mt-2">
                        <p class="d-block text-xs font-semibold ">
                            <span class=" w-2 h-2 bg-yellow-600 inline-block rounded-full "></span>
                            Meeting
                        </p>
                        <span class="text-xs">1 Hour 22 Min</span>
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
        return {
            users: [
                {
                    id: 1,
                    name:"Amber Jack",
                    role:"HR Manager",
                    avatar: "src/assets/img/thumb-1.jpg",
                    durations:[
                        {name:"ready",time:"12 Hour 4 Min",id:1},
                        {name:"busy",time:"11 Hour 4 Min",id:2},
                        {name:"meeting",time:"10 Hour 4 Min",id:3}
                    ]
                },
                {
                    id: 2,
                    name:"Jack Aswald",
                    role:"HR",
                    avatar: "src/assets/img/thumb-2.jpg",
                    durations:[
                        {name:"ready",time:"12 Hour 4 Min",id:4},
                        {name:"busy",time:"11 Hour 4 Min",id:5},
                        {name:"meeting",time:"10 Hour 4 Min",id:6}
                    ]
                },
                {
                    id: 3,
                    name:"Adam Edelgard",
                    role:"Web Developer",
                    avatar: "src/assets/img/thumb-3.jpg",
                    durations:[
                        {name:"ready",time:"12 Hour 4 Min",id:7},
                        {name:"busy",time:"11 Hour 4 Min",id:8},
                        {name:"meeting",time:"10 Hour 4 Min",id:9}
                    ]
                }
            ]
        }
    }
}
</script>