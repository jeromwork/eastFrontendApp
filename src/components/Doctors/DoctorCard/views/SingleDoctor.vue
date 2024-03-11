<script setup lang="ts">
//в этом компоненте только прием пропсов, проверка, и их отображение
//в том числе во вложенных компонентах

import { defineProps, withDefaults, reactive, ref, toRef, defineEmits, computed, toRaw, defineOptions, defineModel, inject } from "vue";
import type { Ref } from 'vue'
import type {DoctorInterface} from "../../../../EastclinicVueApi";
import type DoctorCardViewProps from "../../Interfaces/DoctorCardViewProps";

import BackLink from "../../../../UI/BackLink/BackLink.vue";
import BackLinkMobile from "../../../../UI/BackLink/BackLinkMobile.vue";
import Chevrons from '../../../../UI/Chevrons'
import StickyBlock from '../../../../UI/StickyBlock'
import Reviews from '../../../Reviews/Controller.vue'
import ReviewCardController from '../../../Reviews/ReviewCard/Controller.vue'
import ReviewCardXL from '../../../Reviews/ReviewCard/views/XL.vue'
import AwardCardWithIcon from "../../../../UI/Awards/AwardCardWithIcon.vue";
// import Rating from '../../../../UI/Rating/Controller.vue'
// import RatingDetailView from '../../../../UI/Rating/RatingDetailView.vue'
// import type RatingViewProps from "../../../../UI/Rating/RatingViewProps";
// import Gallery from "../../Gallery.vue";
import FixedBlock from "../../../../UI/FixedBlock.vue";
import FavoriteServiceCard from '../../../../UI/Services/views/FavoriteView.vue'
import type ServiceData from "../../../../EastclinicVueApi/interfaces/ServiceData";
import ScheduleCardView from '../../../../UI/Schedule/views/ScheduleCardView.vue'
import ClinicsSelectView from "../../../../UI/Clinics/views/ClinicsSelectView.vue";
import {ShowModalServicesDispatch} from "../../../../composables/useDispatches";
import {clinicsOfDoctorReadonlyRefSymbol, clinicWorkingSelectedRefSymbol} from "../../../../composables/useSymbols";

//календарь это не зависимый от доктора компонент
//он может принимать массив или объект disables days, что бы дни были неактивны
//календарей может быть несколько видов
//для начала вид с прокруткой
//v-model календаря может возвращать один день или период дней
//это обрабатывается  в контроллере календаря
//для календаря с каруселью будут вьюшка одного дня,
//вьюшка группы дней
//значки вперед назад


//слот не имеет смысла без расписания.
//это маленькая вьюшка с форматированным временм
//кроме этого есть вьюшки групп слотов, управление read more





const props = defineProps<DoctorCardViewProps>();



const doctor = ref(props.doctor) as Ref<DoctorInterface>;
const mobileScreen = ref(false)

const currentWorkingDayModel = defineModel('currentWorkingDayModel',{ type: Number })
// const currentSlotModel = defineModel('currentSlotModel',{ type: Number })
const showModalServices = inject(ShowModalServicesDispatch)


const clinics = inject(clinicsOfDoctorReadonlyRefSymbol);
const clinicWorkingSelected = inject(clinicWorkingSelectedRefSymbol)

</script>

<template>


    <BackLink/>
    <slot name="body">

    </slot>

    <div class="single-doctor" v-if="doctor">
        <div class="single-doctor__main">
            <div class="single-doctor__info">
                <div class="doctor__top__info__desc desc">
                    <h1 class="doctor__top__info__desc_fio" itemprop="name">{{doctor.fullname}}</h1>
                    <div class="doctor__top__info__desc_specials" itemprop="medicalSpecialty">{{doctor.specials}}</div>
                    <!--                    <Rating v-if="doctor.rating"-->
                    <!--                            :reviews-count="doctor.comments"-->
                    <!--                            :level="doctor.rating"-->
                    <!--                            :uri="'/'+doctor.uri"-->
                    <!--                            #default="ratingInfo"-->
                    <!--                    >-->
                    <!--                        <RatingDetailView v-bind="ratingInfo as RatingViewProps"></RatingDetailView>-->
                    <!--                    </Rating>-->
                </div>

                <div
                    class="single-doctor__add-info">
                    <div
                        v-if="doctor.tv__dop_info_vrach"
                        class="single-doctor__add-info__item">
                        <span>{{doctor.tv__dop_info_vrach}}</span>
                    </div>
                    <div
                        v-if="doctor.pregnant=== 1"
                        class="single-doctor__add-info__item">
                        <span>Работает с беременными</span>
                    </div>
                    <div
                        v-if="doctor.appointmentOnline"
                        class="single-doctor__add-info__item">
                        <span>Доктор ведет приём только онлайн</span>
                    </div>
                </div>
            </div>
            <hr class="single-doctor-hr">
            <div class="single-doctor__main-info">
                <AwardCardWithIcon  v-if="doctor.awards"  :award-info="doctor.awards[0]"  />
                <Chevrons :chevrons="doctor.chevrons"  />

            </div>
            <StickyBlock :hide-default="true">
                <div class="main-container">
                    <div class="single-doctor__top-toolbar">
                        <div class="single-doctor__top-toolbar__left">
                            <BackLinkMobile/>
                            <div class="single-doctor__top-toolbar__doctor">
                                <div class="single-doctor__top-toolbar__doctor-photo">
                                    <img :src="doctor.photo120x120?.url" :alt="doctor.fullname">
                                </div>
                                <div class="single-doctor__top-toolbar__doctor-info">
                                    <div class="text-semibold single-doctor__top-toolbar__doctor-name">{{doctor.fullname}}</div>
                                    <div class="single-doctor__top-toolbar__doctor-desc">{{doctor.specials}}</div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </StickyBlock>
        </div>


        <div
            v-if="!mobileScreen"
            class="single-doctor__aside"  id="info-tabs">
            <FixedBlock>
                <div class="single-doctor__booking">

                    <div class="header-h3 text-semibold mb-6">
                        Записаться на приём:
                    </div>
                    <FavoriteServiceCard
                        :service="doctor.favoriteService as ServiceData"
                    />
                    <span
                        @click="showModalServices(true)"
                        class="font-12 main-color pointer text-semibold">Другие услуги
                    </span>

                    <ClinicsSelectView v-if="clinics && clinicWorkingSelected"/>

                    <ScheduleCardView />

                </div>
            </FixedBlock>

        </div>
    </div>



</template>

<style lang="scss">
.single-doctor {
    display: flex;
    &__main {
        max-width: 674px;
        min-width: 566px;
        margin-right: 56px;
        @media (max-width: 1165px) {
            max-width: none;
            width: auto;
            flex-shrink: 1;
        }
        @media (max-width: 1024px) {
            width: 100%;
            max-width: 1100px;
            min-width: 280px;
            margin-right: 0;
        }
    }
    &__aside {
        width: 35%;
        position: relative;
    }
    &__booking {
        box-shadow: 0px 4px 24px 0px rgba(135, 143, 162, 0.25);
        border-radius: 20px;
        border: 1px solid #E5E5E7;
        padding: 24px;
        max-width: 380px;
        position: sticky;
        top: 0;
        &.no-shadow {
            box-shadow: none;
            border: none;
            padding: 0;
        }
    }
    &__info {
        margin-top: 32px;
        @media (max-width: 768px) {
            margin-top: 0;
        }
    }
    &__add-info {
        margin-top: 18px;
        &__item {
            display: inline-flex;
            padding: 8px 12px;
            justify-content: center;
            align-items: center;
            border-radius: 27px;
            border: 1px solid #D5D7D9;
            @media (max-width: 768px) {
                font-size: 14px;
                white-space: nowrap;
                padding: 6px 12px;
            }
            &:not(:last-child) {
                margin-bottom: 10px;
                margin-right: 10px;
            }
        }
    }
    &__main-info {
        &__item {
            display: flex;
            align-items: start;
            line-height: 16px;
            &:not(:last-child) {
                margin-bottom: 24px;
            }
            & div {
                align-self: center;
            }
            & div:not(:last-child) {
                margin-bottom: 4px;
            }
            & img {
                padding-right: 24px;
            }
        }

    }
    &__top-toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 70px;
        gap: 16px;
        @media (max-width: 768px) {
            height: 48px;
        }
        &__left {
            display: flex;
            align-items: center;
            overflow: hidden;
        }
        &__back {
            display: none;
            @media (max-width: 768px) {
                display: inherit;
                margin-right: 20px;
            }
        }
        &__doctor {
            display: flex;
            align-items: center;
            overflow: hidden;
            &-photo {
                border-radius: 50%;
                overflow: hidden;
                flex-shrink: 0;
                width: 44px;
                height: 44px;
                margin-right: 16px;
                & img {
                    width: 100%;
                }
                @media (max-width: 768px) {
                    width: 32px;
                    height: 32px;
                    margin-right: 8px;
                }
            }
            &-phone {
                display: none;
                @media (max-width: 768px) {
                    display: inherit;
                }
            }
            &-name {
                font-size: 18px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                @media (max-width: 768px) {
                    font-size: 14px;
                }
            }
            &-info {
                overflow: hidden;
            }
            &-desc {
                font-size: 14px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                @media (max-width: 768px) {
                    font-size: 12px;
                }
            }


        }
    }
    &-hr {
        margin: 32px 0;
    }
    &-ul {
        list-style-type: circle;
        list-style-position: inside;
        margin: 24px 0;
        & li:not(:last-child) {
            margin-bottom: 8px;
        }
    }
}

</style>
