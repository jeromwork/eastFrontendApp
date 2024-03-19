<script setup lang="ts">
import { defineProps,  ref, inject } from "vue";
import type { Ref } from 'vue'
import PatientFormView from "./PatientFormView.vue";
import EcButton from "../../../UI/Buttons/EcButton.vue";
import { YandexMetrika } from "../../../composables/useYandexMetrika";
import useCalltouch from "../../../composables/useCalltouch";
import {BookingService, PageInfoService} from '../../../EastclinicVueApi'
import BookingSuccessMessageView from "./BookingSuccessMessageView.vue";
import Modal from "../../../UI/Modal.vue";
import BookingFormWithChoiceView from "./BookingFormWithChoiceView";


const props = defineProps({visible:Boolean})
const visible = defineModel('visible', {type:Boolean, default:false, required:false})

const toggleLeaveMessage = () =>{
    console.log('toggleLeaveMessage')
}

const errorText:Ref<string> = ref('')
const bookingService = new BookingService();
// const  book = async() => {
//     //todo #captha_enable
// try {
//     const res = await bookingService.book()
//     if (!res) return;
//
//     if(res.ok) {
//         showBookingSuccessMessage.value = true;
//         showModalBooking.value = false;
//
//         YandexMetrika
//             .reachGoal('booking_done')
//             .reachGoal((PageInfoService.getPageType() === 'doctor') ? 'header_single_booking_done':'header_contacts_booking_done');
//
//         useCalltouch()
//             .forPatient(this.bookingService?.Patient)
//             .withTags([this.Doctor.shortFio as string, this.selectedClinic?.node_address as string])
//             .booking()
//
//     }else {
//         errorText.value = (res.error) ? res.error : 'Произошла ошибка, попробуйте позднее'
//     }
//
// }catch (e){
//     alert(e)
// }


    // Ecommerce.withDoctor(this.Doctor).purchase();




    //todo show success or error message

// }


const showBookingSuccessMessage = ref(false)
const showModalBooking = ref(props.show)
</script>

<template>

    <Modal  v-model:visible="showModalBooking" v-if="showModalBooking" >
        <BookingFormWithChoiceView/>

        <div id="booking__dialog__wrapper" class="booking__dialog__scroll" >
        <div class="v-card-container divider">
            <div class="modal-card-title">
                <span class="text-semibold">Запись в клинику</span>
                <span class="icons closesearch pointer modal-card-title_close"
                      @click="toggleLeaveMessage"
                ></span>

                <div class="border-radius-30 scroll">
                    <div class="booking__dialog">
                        <div id="booking-form" class="v-card-container last">
                                <div class="booking__dialog__item">
                                    <PatientFormView :state-patient="bookingService.Patient"/>
                            <div class="v-card-container button-container padding-c">
<!--error server text-->
                                <div v-if="errorText" class="booking__dialog__error_wrap">
                                    <div v-html="errorText" class="error--text booking__dialog__error"></div>

                                </div>
<!--error server text-->
                                <EcButton class="primary full-width shadow-button services-button-container"
                                          @click="book()">
                                    <span>Записаться</span>

                                </EcButton>
                                <div class="mt-4 booking__annotation annotation">
                                    Нажимая «Записаться», я даю
                                    <a target="_blank" href="https://eastclinic.ru/assets-new/docs/soglasie-na-obrabotku.pdf">
                                        согласие на обработку персональных данных
                                    </a>и принимаю
                                    <a target="_blank" href="https://yandex.ru/legal/smartcaptcha_notice/">
                                        политику обработки данных
                                    </a>.
                                </div>
                            </div>
                        </div>
                    </div>
                    </div></div>
            </div>
        </div>
    </div>
    </Modal>

</template>


<style scoped>
.booking__dialog__item_row .v-input__slot {
    height: auto;
}
.booking__dialog__item_row .v-messages {
    min-height: 0;
}
</style>