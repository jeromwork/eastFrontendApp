<script setup lang="ts">
import { useRouter  } from 'vue-router';
import { ref } from 'vue';
const previousRoutePath = ref('/');

const router = useRouter();
const props = defineProps<{
    to?:String;
}>()

onMounted(() => {
    if(router?.options?.history?.state?.back){
        previousRoutePath.value = router.options.history.state.back as string;
    }
});

</script>

<template>
    <div class="back-button__container">
        <router-link :to="(to !== undefined) ? to : previousRoutePath" class="back-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <g clip-path="url(#clip0_12273_238720)">
                    <path d="M15.8334 10.8333H6.52502L10.5917 14.8999C10.9167 15.2249 10.9167 15.7583 10.5917 16.0833C10.2667 16.4083 9.74169 16.4083 9.41669 16.0833L3.92502 10.5916C3.60002 10.2666 3.60002 9.7416 3.92502 9.4166L9.40835 3.9166C9.73335 3.5916 10.2584 3.5916 10.5834 3.9166C10.9084 4.2416 10.9084 4.7666 10.5834 5.0916L6.52502 9.1666H15.8334C16.2917 9.1666 16.6667 9.5416 16.6667 9.99994C16.6667 10.4583 16.2917 10.8333 15.8334 10.8333Z" fill="#878FA2"/>
                </g>
                <defs>
                    <clipPath id="clip0_12273_238720">
                        <rect width="20" height="20" fill="white" transform="matrix(-1 0 0 1 20 0)"/>
                    </clipPath>
                </defs>
            </svg>
            <span>Назад</span>
        </router-link>
    </div>
</template>


<style scoped  lang="scss">
.back-button {
    display: flex;
    align-items: center;
    color: #878fa2 !important;
    text-decoration: none;
    &:hover, &:focus {
        text-decoration: none;
    }
    & svg {
        margin-right: 4px;
        position: relative;
        top: -1px;
    }
    &__container {
        margin-bottom: 16px;
    }
}
</style>