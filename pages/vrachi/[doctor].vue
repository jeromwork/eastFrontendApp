<template>
    <div id="east-search-panel"></div>
   </template>

<script setup>

// const route = useRoute();

import { onMounted } from 'vue';

onMounted(() => {
    // loadVueApp('http://127.0.0.1:8000/vendors/doctors-list/vue_core.js' );
    // loadVueApp('http://127.0.0.1:8000/vendors/doctors-list/index.js' );
    //
    // loadVueAppCss('http://127.0.0.1:8000/vendors/doctors-list/index.css')
    //
    // loadVueApp('http://127.0.0.1:8000/vendors/east-search-panel/index.js' );
    // loadVueAppCss('http://127.0.0.1:8000/vendors/east-search-panel/index.css')


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