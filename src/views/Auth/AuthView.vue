<template>
    <div class="auth h-screen md:p-10 flex justify-center items-center">
        <div class="bg-white panal md:rounded-lg p-9 pb-16 min-w-full md:min-w-464 h-full md:h-auto">
            <div class="w-full flex flex-col h-full justify-center md:justify-auto ">
                <img src="@/assets/img/system/logo-sm.png" alt="logo" class="logo-small w-fit "/>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>