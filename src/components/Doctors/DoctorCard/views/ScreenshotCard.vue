<script setup lang="ts">
//в этом компоненте только прием пропсов, проверка, и их отображение
//в том числе во вложенных компонентах

import { defineProps, withDefaults, reactive, ref, toRef, defineEmits, computed, toRaw, defineOptions } from "vue";
import type { Ref } from 'vue'
import BackLink from "../../../../UI/BackLink.vue";
import Reviews from '../../../Reviews/Controller.vue'
import ReviewCardController from '../../../Reviews/ReviewCard/Controller.vue'
import ReviewCardXL from '../../../Reviews/ReviewCard/views/XL.vue'
import type DoctorInterface from "../../../../EastclinicVueApi/interfaces/DoctorInterface";
defineOptions({
    inheritAttrs: false
})
interface DoctorCardViewProps {
    doctor?: DoctorInterface | Ref<DoctorInterface>
}
const Gallery = ref('Gallery')
const Rating = ref('Rating')


const props = defineProps<DoctorCardViewProps>();
const doctor = ref(props.doctor);

</script>

<template>
    <BackLink/>

    <slot name="body">

    </slot>

    <div class="single-doctor" v-if="doctor">
        <div class="single-doctor__main">
            <Gallery/>
            <div class="single-doctor__info">
                <div class="doctor__top__info__desc desc">
                    <h1 class="doctor__top__info__desc_fio" itemprop="name">{{doctor.fullname}}</h1>
                    <div class="doctor__top__info__desc_specials" v-if="!isDoctorScreenshot" itemprop="medicalSpecialty">{{specials}}</div>
                    <Rating/>
                </div>

                <div
                    class="single-doctor__add-info">
                    <div
                        v-if="doctor.tv__dop_info_vrach"
                        class="single-doctor__add-info__item">
                        <span>{{doctor.tv__dop_info_vrach}}</span>
                    </div>
                    <div
                        v-if="doctor.pregnant*1 === 1"
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
