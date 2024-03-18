<script setup lang="ts">
const props = defineProps({phone:{type:String}, visible:{type:String, required:false, default:false}})
</script>

<template>
    <a :href="phone"
       :class="{'visible': visible}"
       class="contacts__item phone-mobile">
        <svg class="phone-button-size" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 15C0 6.71573 6.71573 0 15 0H25C33.2843 0 40 6.71573 40 15V25C40 33.2843 33.2843 40 25 40H15C6.71573 40 0 33.2843 0 25V15Z" fill="#F2F3F6"/>
            <path d="M26.0245 22.7166L23.9079 22.475C23.3995 22.4166 22.8995 22.5916 22.5412 22.95L21.0079 24.4833C18.6495 23.2833 16.7162 21.3583 15.5162 18.9916L17.0579 17.45C17.4162 17.0916 17.5912 16.5916 17.5329 16.0833L17.2912 13.9833C17.1912 13.1416 16.4829 12.5083 15.6329 12.5083H14.1912C13.2495 12.5083 12.4662 13.2916 12.5245 14.2333C12.9662 21.35 18.6579 27.0333 25.7662 27.475C26.7079 27.5333 27.4912 26.75 27.4912 25.8083V24.3666C27.4995 23.525 26.8662 22.8166 26.0245 22.7166Z" fill="#171E36"/>
        </svg>
    </a>
</template>

<style>

</style>
