<script setup lang="ts">
import {PageInfoService} from "../../EastclinicVueApi";
import WhatsAppLink from '../../UI/Contacts/WhatsAppLink.vue'
import PhoneButton from '../../UI/Contacts/PhoneButton.vue'
import EcButton from "../../UI/Buttons/EcButton.vue";
import {useRouter} from "vue-router";
import {YandexMetrika} from "../../composables/useYandexMetrika";
import Modal from "#build/src/UI/Modal.vue";
import BookingFormShortView from "#build/src/components/Booking/views/BookingFormShortView.vue";


const isSingleDoctorPage = computed(() => PageInfoService.pageInfo.type === 'doctor').value
const openModal = () => {
    YandexMetrika?.reachGoal(( isSingleDoctorPage ) ? 'booking-header-single' : 'booking-header-contacts');
    if (window.innerWidth < 680){
        useRouter().push('/booking');
    } else {
        showModalBooking.value = true;
    }
}

const showModalBooking = ref(false)

</script>

<template>

    <Modal  v-model:visible="showModalBooking" v-if="showModalBooking" >
        <BookingFormShortView/>
    </Modal>
    <div class="header-wrapper">

        <header class="header">
            <div class="header__logo">
                <nuxt-link to="/" class="header__logo-image no-hover flex-wrapper center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="209" height="27" viewBox="0 0 209 27" fill="none">
                        <title>Ист Клиник - сеть медицинских центров</title>
                        <path d="M3.7698 20.5151L14.7647 6.91901H18.5385V25.5608H14.7647V12.0024L3.7698 25.5608H0V6.91901H3.7698V20.5151Z" fill="#2D7FF9"/>
                        <path d="M42.0608 13.698H38.1318C37.71 12.5696 36.9263 11.5949 35.8906 10.9108C34.7828 10.172 33.4546 9.78945 32.1009 9.81934C31.2053 9.7872 30.3126 9.93474 29.4812 10.2523C28.6498 10.5699 27.8984 11.0504 27.2762 11.6624C26.665 12.2719 26.1872 12.9902 25.8701 13.7758C25.5531 14.5614 25.4032 15.3988 25.4291 16.2397C25.3836 17.9359 26.0477 19.5802 27.2762 20.8133C27.8959 21.4287 28.6468 21.9117 29.4787 22.2301C30.3107 22.5486 31.2046 22.6951 32.1009 22.6601C33.4536 22.6827 34.7794 22.3008 35.8906 21.5686C36.9645 20.8727 37.7553 19.8492 38.1318 18.6681H42.0608C41.6199 20.7782 40.3969 22.6687 38.6135 23.9971C36.7563 25.4002 34.4385 26.1394 32.0651 26.0856C28.9919 26.0856 26.4907 25.1389 24.5613 23.2455C23.611 22.3194 22.8649 21.2228 22.3666 20.0199C21.8683 18.817 21.6278 17.5319 21.6593 16.2397C21.6208 14.9442 21.8576 13.6547 22.3554 12.4478C22.8533 11.241 23.6022 10.1416 24.5573 9.21507C26.4973 7.33427 28.9985 6.39262 32.0611 6.3901C34.4298 6.33619 36.7451 7.06216 38.6135 8.44462C40.3934 9.74342 41.618 11.6094 42.0608 13.698Z" fill="#2D7FF9"/>
                        <path d="M67.8049 6.42014C70.0819 6.42014 71.8746 7.12386 73.183 8.53131C74.4913 9.93876 75.1468 11.7956 75.1495 14.1019V25.5604H71.3757V14.4872C71.3757 13.0545 70.9856 11.9215 70.2053 11.0881C69.8031 10.6721 69.3092 10.3451 68.7589 10.1304C68.2085 9.91563 67.6151 9.81841 67.0207 9.8456C66.3716 9.84769 65.7305 9.98117 65.1401 10.2371C64.5497 10.4931 64.0237 10.8656 63.5972 11.3298C62.618 12.3093 62.1283 13.7645 62.1283 15.6957V25.5604H58.3585V14.4872C58.3585 13.0558 57.9605 11.9228 57.1882 11.0881C56.7818 10.6647 56.2793 10.3346 55.7186 10.1226C55.1579 9.91058 54.5538 9.82233 53.9518 9.86448C53.2558 9.86562 52.5705 10.0271 51.9548 10.3349C51.339 10.6428 50.8113 11.0879 50.4169 11.632C49.479 12.9109 49.0053 14.4447 49.0674 16.0016V25.5604H45.2976V9.59256H49.0674C50.4182 7.47761 52.3502 6.42014 54.8634 6.42014C57.7508 6.42014 59.8288 7.62616 61.0973 10.0382H61.2167C62.602 7.62616 64.7981 6.42014 67.8049 6.42014Z" fill="#2D7FF9"/>
                        <path d="M71.4192 0H49.1069V3.48211H71.4192V0Z" fill="url(#paint0_linear_1712_14581)"/>
                        <path d="M71.4192 0H49.1069V3.48211H71.4192V0Z" fill="url(#paint1_linear_1712_14581)"/>
                        <path d="M111.222 11.6738L117.775 25.7193H121.755L112.89 7.07751H109.188L100.386 25.7193H104.475L111.063 11.6738H111.222Z" fill="#01B3FF"/>
                        <path d="M127.757 20.53L138.752 6.93387H142.542V25.5756H138.772V12.0211L127.757 25.5756H123.983V6.93765H127.757V20.53Z" fill="#01B3FF"/>
                        <path d="M172.224 20.53L183.219 6.93387H187.009V25.5756H183.239V12.0211L172.224 25.5756H168.45V6.93765H172.224V20.53Z" fill="#01B3FF"/>
                        <path d="M160.854 14.461V7.07751H164.624V25.7193H160.854V17.9242H149.835V25.7193H146.065V7.07751H149.835V14.461H160.854Z" fill="#01B3FF"/>
                        <path d="M208.651 25.7193H203.93L197.457 17.8864H193.978V25.7193H190.197V7.07751H193.978V14.5365H197.748L204.01 7.07751H208.413L200.849 16.1907L208.651 25.7193Z" fill="#01B3FF"/>
                        <path d="M98.5284 25.7193H93.8072L87.3344 17.8864H83.8552V25.7193H80.0735V7.07751H83.8552V14.5365H87.625L93.8868 7.07751H98.2895L90.7261 16.1907L98.5284 25.7193Z" fill="#01B3FF"/>
                        <defs>
                            <linearGradient id="paint0_linear_1712_14581" x1="49.6358" y1="3.4248" x2="71.3771" y2="3.4248" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#1F59EE"/>
                                <stop offset="0.479167" stop-color="#00B3FF"/>
                            </linearGradient>
                            <linearGradient id="paint1_linear_1712_14581" x1="49.6358" y1="3.4248" x2="71.3771" y2="3.4248" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#2D7FF9"/>
                                <stop offset="0.53125" stop-color="#00B2FF"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </nuxt-link>

            </div>
            <div class="header__contacts-wrapper flex-wrapper center right">
                <div class="contacts">
                    <a :href="PageInfoService.getLinkPhone()" class="mobile-menu__contacts__item_phone pl-3 hidden-lg">
                         <span style="color: #4372ea" class="phone no-wrap text-semibold">{{PageInfoService.getFormattedMainPhone()}}</span>
                        <span class="hours annotation text-right">08:00 - 21:00</span>
                    </a>
                    <WhatsAppLink :phone="PageInfoService.getWhatsAppPhone()"/>
                    <PhoneButton :phone="PageInfoService.getLinkPhone()"/>
                    <EcButton :large="false"
                            @click="openModal()"
                            class="button primary medium contact write hidden-md">
                        Записаться
                    </EcButton>
                </div>
            </div>
        </header>

    </div>

</template>


<style scoped>

</style>