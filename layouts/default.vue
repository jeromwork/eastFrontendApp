<script >
import Vue from "vue";
import Header from "../components/Header";
import Footer from "../components/Footer";

</script>
<template>

    <Header/>
    <slot />
    <div class="v-application--wrap">

        <div class="white-container">
            <div class="main-container">
            </div>
        </div>
    </div>
    <Footer/>
</template>


