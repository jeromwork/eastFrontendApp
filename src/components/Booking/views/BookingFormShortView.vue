<script setup lang="ts">
import { defineProps,  ref, inject } from "vue";
import type { Ref } from 'vue'
import PatientFormView from "./PatientFormView.vue";
import EcButton from "../../../UI/Buttons/EcButton.vue";
import { YandexMetrika } from "../../../composables/useYandexMetrika";
import useCalltouch from "#build/src/composables/useCalltouch";
import { BookingService } from '../../../EastclinicVueApi'



const toggleLeaveMessage = () =>{
    console.log('toggleLeaveMessage')
}

const bookingService = new BookingService();
const  book = async() => {
    //todo #captha_enable
    //todo check fill form

    //check patient

    const res = await bookingService.book()

    // Ecommerce.withDoctor(this.Doctor).purchase();

    if(res?.ok) {
        this.toogleModalBooking(false);
        this.toogleBookingSuccessMessage(true);
        YandexMetrika.reachGoal('booking_done')
        if(this.bookingService && this.bookingService.Cart?.count > 0){
            YandexMetrika.reachGoal('service_booking_done')
        }

        useCalltouch()
            .forPatient(this.bookingService?.Patient)
            .withTags([this.Doctor.shortFio as string, this.selectedClinic?.node_address as string])
            .booking()

    }else {
        if ( res?.code === 24 || res?.code === 25 ){  //handle busy slot
            this.data.value.selectedSlot = null;
            this.data.value.selectedSlotError = res.error;
        }
    }



    //todo show success or error message

}

</script>

<template>
    <div id="booking__dialog__wrapper" class="booking__dialog__scroll">
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
                            <div class="v-card-container button-container padding-c"><!---->
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

            </div>
        </div>
    </div>
</template>


<style scoped>
.booking__dialog__item_row .v-input__slot {
    height: auto;
}
.booking__dialog__item_row .v-messages {
    min-height: 0;
}
</style>