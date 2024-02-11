<template>
    <div id="east-search-panel"></div>
    <div id="east-doctors-list" data-v-inspector="pages/vrachi/[doctor].vue:3:5" data-v-app="">
        <div data-v-06026146=""> 333333
            <a data-v-06026146="" href="https://vitejs.dev" target="_blank">
                <img data-v-06026146="" src="" class="logo" alt="Vite logo"></a><a data-v-06026146="" href="https://vuejs.org/" target="_blank"><img data-v-06026146="" src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20aria-hidden='true'%20role='img'%20class='iconify%20iconify--logos'%20width='37.07'%20height='36'%20preserveAspectRatio='xMidYMid%20meet'%20viewBox='0%200%20256%20198'%3e%3cpath%20fill='%2341B883'%20d='M204.8%200H256L128%20220.8L0%200h97.92L128%2051.2L157.44%200h47.36Z'%3e%3c/path%3e%3cpath%20fill='%2341B883'%20d='m0%200l128%20220.8L256%200h-51.2L128%20132.48L50.56%200H0Z'%3e%3c/path%3e%3cpath%20fill='%2335495E'%20d='M50.56%200L128%20133.12L204.8%200h-47.36L128%2051.2L97.92%200H50.56Z'%3e%3c/path%3e%3c/svg%3e" class="logo vue" alt="Vue logo"></a></div><h1 data-v-4b8d1567="">Vite + Vue</h1><div data-v-4b8d1567="" class="card"><button data-v-4b8d1567="" type="button">count is 3</button><p data-v-4b8d1567=""> Edit <code data-v-4b8d1567="">components/HelloWorld.vue</code> to test HMR </p></div><p data-v-4b8d1567=""> Check out <a data-v-4b8d1567="" href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the official Vue + Vite starter </p><p data-v-4b8d1567=""> Install <a data-v-4b8d1567="" href="https://github.com/vuejs/language-tools" target="_blank">Volar</a> in your IDE for a better DX </p><p data-v-4b8d1567="" class="read-the-docs">Click on the Vite and Vue logos to learn more</p></div>
</template>

<script setup>

// const route = useRoute();

import { onMounted } from 'vue';

onMounted(() => {
    loadVueApp('http://127.0.0.1:8000/vendors/doctors-list/vue_core.js' );
    loadVueApp('http://127.0.0.1:8000/vendors/doctors-list/index.js' );

    loadVueAppCss('http://127.0.0.1:8000/vendors/doctors-list/index.css')

    loadVueApp('http://127.0.0.1:8000/vendors/east-search-panel/index.js' );
    loadVueAppCss('http://127.0.0.1:8000/vendors/east-search-panel/index.css')



    // setTimeout(() => {
    //     // Load and mount the first Vue 3 app
    //
    //     setTimeout(() => {
    //         // Load and mount the first Vue 3 app
    //
    //
    //     }, 1000)
    // }, 1000)
    // Load and mount the first Vue 3 app
    //loadVueApp('http://127.0.0.1:8000/vendors/doctors-list/index.js', 'app1');

});

function loadVueApp(src) {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.defer = true;
    script.type = 'module';

    document.head.appendChild(script);

}

function loadVueAppCss(cssSrc) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssSrc;
    document.head.appendChild(link);
}
</script>

<style scoped>
</style>