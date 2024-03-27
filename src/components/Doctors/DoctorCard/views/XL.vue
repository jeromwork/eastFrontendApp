<script setup lang="ts">


import {inject, ref} from "vue";
import {DoctorCartStateSymbol} from "../../../../composables/useSymbols";
import DoctorCardState from "../../../../state/DoctorCardState";
import type { DoctorInterface } from "../../../../EastclinicVueApi";

const doctorCardState = inject( DoctorCartStateSymbol ) as DoctorCardState
if(!doctorCardState) throw new Error('not have doctorCardState by doctorCardState');

const doctor = doctorCardState.Doctor as DoctorInterface;

const currentClinic = doctorCardState.selectedClinic
const clinics = doctor.clinics;
const sendEcommerce = () =>{
    //do we need it?
}


</script>

<template>222
    <div class="doctor-card-2-container">
        <div class="doctor-card-2">
            <div class="doctor-card-2__photo">
                <nuxt-link :to="'/'+doctor.uri" @click.native="sendEcommerce" class="doctor-card-2__photo__item">
                    <img loading="lazy" width="auto" :src="doctor.photo232x269?.url" :alt="doctor.photo232x269?.alt" >
                    <div class="doctor-card-2__photo__panel">
                        <div>
                            <div
                                v-if="doctorCardState.existsVideoContent"
                                class="doctor-card-2__photo__video-button">
                                <span class="icons playbutton"></span>
                            </div>
                        </div>
                        <div>
                            <div
                                v-if="doctorCardState.photosCount !== 0"
                                class="doctor-card-2__photo__counts">
                                {{(doctor.photo232x269) ? '1' : ''}}/{{doctorCardState.photosCount}}
                            </div>
                        </div>
                    </div>
                </nuxt-link>
            </div>
            <div
                v-if="doctor.awards"
                class="doctor-card-2__awards">
                <!--        <AwardsDropdown-->
                <!--          :items="awards"-->
                <!--          @openZoomImage="passZoomImages"-->
                <!--        />-->
            </div>

            <div class="doctor-card-2__info">
                <nuxt-link @click.native="sendEcommerce" class="text-decoration-none" :to="'/'+doctor.uri">
                    <div class="doctor-card-2__speciality">
                        <span>{{doctor.specials}}</span>
                    </div>
                    <div class="doctor-card-2__fio">
                        <span>{{doctor.fullname}}</span>
                    </div>
                </nuxt-link>

                <div class="doctor-card-2__divider"></div>
                <div class="doctor-card-2__divider"></div>
                <div v-if="doctor.description_private">

                </div>
                <span class="text-secondary text-no-wrap text-green">
                    <input type="text" :value="doctor.description_private" @change="doctorCardState.savePrivateDesc($event.target.value)"></span>
                <Rating
                    v-if="doctor.rating !== 0 && !doctor.dismissed"
                    :reviews="doctor.comments"
                    :level="doctor.rating"
                    :uri="(doctor.uri) ? '/'+doctor.uri+'#reviews' : '/'"

                />
            </div>
        </div>
    </div>



</template>

<style lang="scss">
@import "~/public/scss/parts/_colors";
@import "~/public/scss/parts/_mixins";
@import "~/public/scss/parts/_grid";
@import "~/public/scss/parts/_typography";
.doctor-card-2 {
    display: grid;
    grid-template-areas: "dc2-photo dc2-info dc2-slots"
                          "dc2-photo dc2-info-2 dc2-slots"
                          "dc2-awards dc2-phone dc2-slots";
    grid-template-columns: 232px 40% 1fr;
    grid-template-rows: auto auto 1fr;
    @media (max-width: 1075px) {
        grid-template-columns:  minmax(162px, 232px) 335px;
        grid-template-areas: "dc2-photo dc2-info"
                            "dc-2photo dc2-awards"
                            "dc-2photo dc2-info-2"
                            "dc-2photo dc2-slots"
                            "dc-2photo dc2-phone";
    }
    @media (max-width: 584px) {
        grid-template-columns:  1fr 106px;
        grid-template-areas: "dc2-info dc2-photo"
                            "dc2-awards dc2-awards"
                            "dc2-info-2 dc2-info-2"
                            "dc2-slots dc2-slots"
                            "dc2-phone dc2-phone";
    }
    &__divider {
        height: 8px;
    }
    &-container {
        background-color: #fff;
        border-radius: 30px;
        padding: $margin-6;
        margin-bottom: $margin-4;
        @media (max-width: 585px) {
            padding: $margin-5;
        }
    }
    &__photo {
        grid-area: dc2-photo;
        display: flex;
        flex-direction: column;
        margin-right: 24px;

        @media (min-width: 585px) and (max-width: 1075px){
            grid-row: span 3;
        }
        @media (max-width: 584px) {
            height: 106px;
            margin-right: 0;
            grid-row: span 1;
        }
        &__item {
            height: auto;
            border-radius: 15px;
            display: flex;
            flex-direction: column;
            align-self: baseline;
            overflow: hidden;
            position: relative;
            width: 100%;
            & img {
                width: 100%;
            }
        }
        &__panel {
            position: absolute;
            bottom: 10px;
            padding: 0 10px;
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
        &__video-button, &__counts {
            background-color: rgba(1,1,1, 0.4);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 24px;
            cursor: pointer;
            @media (max-width: 585px) {
                height: 18px;
            }
        }
        &__video-button {
            width: 24px;
            height: 24px;
            @media (max-width: 585px) {
                width: 18px;
                height: 18px;
                & .icons {
                    width: 8px;
                }
            }
        }
        &__counts {
            font-size: 14px;
            width: 46px;
            color: #fff;
            border-radius: 15px;
            @media (max-width: 585px) {
                width: 34px;
                font-size: 12px;
            }
        }
    }
    &__awards {
        grid-area: dc2-awards;
        margin-right: 24px;
        @media (min-width: 1076px) {
            grid-row: 1/4;
            margin-top: 245px;
        }
        & .doctor-awards__item {
            padding: 10px 0;
            max-width: unset;
        }
        & .doctor-awards__item_text {
            margin-right: 4px;
        }
        @media (max-width: 1075px) {
            margin: 12px 0 4px;
            border-bottom: 1px solid $border-gray-color;
        }
    }
    &__price {
        //font-size: 14px;
        //&__title, &__item, &__text {
        //  @media (max-width: 585px) {
        //    font-size: 14px;
        //  }
        //}
    }
    &__info {
        grid-area: dc2-info;
        @media (max-width: 585px) {
            margin-right: 10px;
        }
    }
    &__info-2 {

        grid-area: dc2-info-2

    }
    &__slots {
        grid-area: dc2-slots;
        display: flex;
        justify-content: right;
        @media (max-width: 1075px) {
            margin-top: $margin-4;
        }
        @media (max-width: 585px) {
            justify-content: normal;
        }
    }
    &__speciality {
        color: $text-gray-color;
        font-size: 16px;
        @include text-semibold;
        margin-bottom: 4px;
        line-height: inherit;
        @media (max-width: 585px) {
            font-size: 12px;
        }
    }
    &__fio {
        font-size: 18px;
        @include text-bold;
        line-height: 20px;
        &:hover {
            text-decoration: underline !important;
        }

        @media (max-width: 585px) {
            font-size: 16px;
        }
    }
    &__phone {
        grid-area: dc2-phone;
        @media (max-width: 585px) {
            font-size: 14px;
        }
    }
    & .doctor-awards__wrapper {
        margin-bottom: 0;
    }
}
.menuable__content__active {
    border-radius: 10px;
    padding: 8px;
    background-color: #fff;
}
.dropdown-panel__items-list__item {
    padding: 9px 4px;
}
.dropdown-panel__items-list__item.clinic-select  {
    font-size: 14px;
}
</style>
