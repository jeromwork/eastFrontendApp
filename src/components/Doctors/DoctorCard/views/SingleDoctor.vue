<script setup lang="ts">
//в этом компоненте только прием пропсов, проверка, и их отображение
//в том числе во вложенных компонентах

import { defineProps, withDefaults, reactive, ref, toRef, defineEmits, computed, toRaw, defineOptions } from "vue";
import type { Ref } from 'vue'
import BackLink from "../../../../UI/BackLink.vue";
import Reviews from '../../../Reviews/Controller.vue'
import ReviewCardController from '../../../Reviews/ReviewCard/Controller.vue'
import ReviewCardXL from '../../../Reviews/ReviewCard/views/XL.vue'
defineOptions({
    inheritAttrs: false
})
interface DoctorCardViewProps {
    doctor?: any | Ref<any>
}


const props = withDefaults(defineProps<DoctorCardViewProps>(), {
    doctor: {},
});


</script>

<template>

    <h1>!!{{doctor.fullname}}</h1>
    <BackLink/>
    <div
            v-if="doctor.isOnline"
            class="single-doctor__add-info__item">
        <span>Доктор ведет приём только онлайн</span>
    </div>
    <slot name="body"></slot>

<!--    <Reviews>-->
<!--&lt;!&ndash;        <ReviewCardController #review="reviewInfo">&ndash;&gt;-->
<!--&lt;!&ndash;            {{reviewInfo}}&ndash;&gt;-->
<!--&lt;!&ndash;            <ReviewCardXL v-bind="reviewInfo"/>&ndash;&gt;-->
<!--&lt;!&ndash;        </ReviewCardController>&ndash;&gt;-->
<!--        <template #review="reviewInfo">-->
<!--            <ReviewCardController v-bind="reviewInfo" #default="reviewInfoPrepared">-->
<!--                <ReviewCardXL v-bind="reviewInfoPrepared"/>-->
<!--            </ReviewCardController>-->

<!--        </template>-->
<!--    </Reviews>-->


<!--            <ZoomImage-->
<!--                :images="zoomImages"-->
<!--                :dialogProp="zoomImage"-->
<!--                :zoomKey="zoomKey"-->
<!--                @close="closeZoomImage"-->
<!--            />-->
<!--            <StoriesSlider-->
<!--                :items="storiesItems"-->
<!--                :storiesKey="storiesKey"-->
<!--                :dialog="storiesDialog"-->
<!--                :doctor="doctor"-->
<!--                @storiesSliderClose="closeStories"-->
<!--            />-->
<!--            <div class="single-doctor" v-if="doctor">-->
<!--                <div class="single-doctor__main">-->
<!--                    <Gallery-->
<!--                        :reviews="(!isDoctorScreenshot) ? comments: 0"-->
<!--                        :level="rating"-->
<!--                        :images="images"-->
<!--                        :videos="videos"-->
<!--                        :doctor="doctor"-->
<!--                        :loaded="fetchData"-->
<!--                        @openZoomImage="passItemsToStories"-->
<!--                    />-->
<!--                    <div class="single-doctor__info">-->
<!--                        <div class="doctor__top__info__desc desc">-->
<!--                            <h1 class="doctor__top__info__desc_fio" itemprop="name">{{doctor.fullname}}</h1>-->
<!--                            <div class="doctor__top__info__desc_specials" v-if="!isDoctorScreenshot" itemprop="medicalSpecialty">{{specials}}</div>-->
<!--                            <Rating-->
<!--                                :reviews="(!isDoctorScreenshot) ? comments: 0"-->
<!--                                :level="rating"-->
<!--                                :uri="'/'+doctor.uri"-->
<!--                                singleDoctor-->
<!--                                v-if="rating"-->
<!--                            >-->
<!--                            </Rating>-->
<!--                        </div>-->

<!--                        <div-->
<!--                            class="single-doctor__add-info">-->
<!--                            <div-->
<!--                                v-if="doctor.tv__dop_info_vrach"-->
<!--                                class="single-doctor__add-info__item">-->
<!--                                <span>{{doctor.tv__dop_info_vrach}}</span>-->
<!--                            </div>-->
<!--                            <div-->
<!--                                v-if="doctor.pregnant*1 === 1"-->
<!--                                class="single-doctor__add-info__item">-->
<!--                                <span>Работает с беременными</span>-->
<!--                            </div>-->
<!--                            <div-->
<!--                                v-if="online"-->
<!--                                class="single-doctor__add-info__item">-->
<!--                                <span>Доктор ведет приём только онлайн</span>-->
<!--                            </div>-->
<!--                        </div>-->

<!--                    </div>-->
<!--                    <hr class="single-doctor-hr">-->
<!--                    <div class="single-doctor__main-info">-->

<!--                        <BestAward-->
<!--                            v-if="Object.keys(awards).length > 0"-->
<!--                            :items="awards"-->
<!--                        />-->
<!--                        <Chevrons-->
<!--                            :experience="getExp(doctor.experience)"-->
<!--                            :chevrons="chevrons"-->
<!--                            :age="doctor.tv__dop_info_vrach"-->
<!--                        />-->

<!--                    </div>-->
<!--                    <StickyBlock-->
<!--                        :hide="true"-->
<!--                    >-->
<!--                        <div class="main-container">-->
<!--                            <div class="single-doctor__top-toolbar">-->
<!--                                <div class="single-doctor__top-toolbar__left">-->
<!--                                    <nuxt-link :to="backLink" class="single-doctor__top-toolbar__back">-->
<!--                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">-->
<!--                                            <g clip-path="url(#clip0_12273_256011)">-->
<!--                                                <path d="M19 12.9997H7.83L12.71 17.8797C13.1 18.2697 13.1 18.9097 12.71 19.2997C12.32 19.6897 11.69 19.6897 11.3 19.2997L4.71 12.7097C4.32 12.3197 4.32 11.6897 4.71 11.2997L11.29 4.69973C11.68 4.30973 12.31 4.30973 12.7 4.69973C13.09 5.08973 13.09 5.71973 12.7 6.10973L7.83 10.9997H19C19.55 10.9997 20 11.4497 20 11.9997C20 12.5497 19.55 12.9997 19 12.9997Z" fill="#272727"/>-->
<!--                                            </g>-->
<!--                                            <defs>-->
<!--                                                <clipPath id="clip0_12273_256011">-->
<!--                                                    <rect width="24" height="24" fill="white" transform="matrix(-1 0 0 1 24 0)"/>-->
<!--                                                </clipPath>-->
<!--                                            </defs>-->
<!--                                        </svg>-->
<!--                                    </nuxt-link>-->
<!--                                    <div class="single-doctor__top-toolbar__doctor">-->
<!--                                        <div class="single-doctor__top-toolbar__doctor-photo">-->
<!--                                            <img :src="photoThumb" :alt="doctor.fullname">-->
<!--                                        </div>-->
<!--                                        <div class="single-doctor__top-toolbar__doctor-info">-->
<!--                                            <div class="text-semibold single-doctor__top-toolbar__doctor-name">{{doctor.fullname}}</div>-->
<!--                                            <div class="single-doctor__top-toolbar__doctor-desc">{{specials}}</div>-->
<!--                                        </div>-->
<!--                                    </div>-->
<!--                                </div>-->

<!--                                <a class="single-doctor__top-toolbar__doctor-phone" :href="this.$store.getters['pageInfo/getLinkPhone']">-->
<!--                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">-->
<!--                                        <g clip-path="url(#clip0_12273_256022)">-->
<!--                                            <path d="M19.23 15.2598L16.69 14.9698C16.08 14.8998 15.48 15.1098 15.05 15.5398L13.21 17.3798C10.38 15.9398 8.06004 13.6298 6.62004 10.7898L8.47004 8.93976C8.90004 8.50977 9.11004 7.90977 9.04004 7.29977L8.75004 4.77977C8.63004 3.76977 7.78004 3.00977 6.76004 3.00977H5.03004C3.90004 3.00977 2.96004 3.94977 3.03004 5.07977C3.56004 13.6198 10.39 20.4398 18.92 20.9698C20.05 21.0398 20.99 20.0998 20.99 18.9698V17.2398C21 16.2298 20.24 15.3798 19.23 15.2598Z" fill="#272727"/>-->
<!--                                        </g>-->
<!--                                        <defs>-->
<!--                                            <clipPath id="clip0_12273_256022">-->
<!--                                                <rect width="24" height="24" fill="white"/>-->
<!--                                            </clipPath>-->
<!--                                        </defs>-->
<!--                                    </svg>-->
<!--                                </a>-->
<!--                            </div>-->

<!--                        </div>-->

<!--                    </StickyBlock>-->
<!--                    <div class="single-doctor__blocks">-->
<!--                        <div v-if="mobileScreen" class="single-doctor__block">-->
<!--                            <hr class="single-doctor-hr">-->
<!--                            <div class="single-doctor__booking no-shadow">-->
<!--                                <h2 class="single-doctor__block__header text-bold mb-6">Записаться на приём:</h2>-->
<!--                                <Price-->
<!--                                    :mainServices="mainServices"-->
<!--                                    :all-services="servicesList"-->
<!--                                />-->
<!--                                <ServicesDialog-->
<!--                                    :doctor="doctor"-->
<!--                                    :all-services="servicesList"-->
<!--                                />-->
<!--                                <div class="slots mt-6">-->

<!--                                    <div class="doctor-card-2__slots">-->
<!--                                        <SlotsCalendar-->
<!--                                            :dissmissDoctor="dismissDoctor"-->
<!--                                            :doctor="doctor"-->
<!--                                        />-->
<!--                                    </div>-->
<!--                                </div>-->

<!--                            </div>-->
<!--                        </div>-->
<!--                        <div class="single-doctor__block">-->
<!--                            <hr class="single-doctor-hr">-->
<!--                            <h2 class="single-doctor__block__header text-bold mb-6">О враче</h2>-->
<!--                            <div class="single-doctor__block__content">-->
<!--                                <ReadMoreText-->
<!--                                    :title="doctor.fullname"-->
<!--                                    :author="doctor.fullname"-->
<!--                                    :authorUrl="doctor.fullname"-->
<!--                                    :smallImage="smallImage"-->
<!--                                    :interviews="interviews"-->
<!--                                    :showWords="30"-->
<!--                                    :text="doctor.description_full"-->
<!--                                />-->
<!--                            </div>-->
<!--                        </div>-->
<!--                        <div-->
<!--                            v-if="Object.keys(awards).length > 0"-->
<!--                            class="single-doctor__block">-->
<!--                            <SlideGallery-->
<!--                                :header="'Награды врача'"-->
<!--                                :items="awards"-->
<!--                                @openModal="passItemsToStories"-->
<!--                            />-->
<!--                            <div class="single-doctor__block__footer">-->

<!--                            </div>-->
<!--                        </div>-->
<!--                        <div class="single-doctor__block">-->

<!--                            <div class="single-doctor__block__footer">-->
<!--                                <hr v-if="diploms.length === 0" class="single-doctor-hr">-->
<!--                                <h2 v-if="diploms.length === 0" class="single-doctor-header mb-6">Образование</h2>-->
<!--                                <SlideGallery-->
<!--                                    :small="true"-->
<!--                                    :header="'Образование'"-->
<!--                                    :items="diploms"-->
<!--                                    @openModal="passItemsToStories"-->
<!--                                />-->
<!--                                <Education-->
<!--                                    :educationDesc="this.pageInfo.doc_description"-->
<!--                                />-->
<!--                            </div>-->
<!--                            <div-->
<!--                                v-if="diseases"-->
<!--                                class="single-doctor__block__footer">-->
<!--                                <hr class="single-doctor-hr">-->
<!--                                <h2 class="single-doctor-header mb-6">Заболевания, которые лечит врач</h2>-->
<!--                                <Diseases-->
<!--                                    :diseases="diseases"-->
<!--                                />-->

<!--                            </div>-->

<!--                        </div>-->

<!--                        <div-->
<!--                            v-if="rating"-->
<!--                            id="reviews" class="single-doctor__block">-->
<!--                            <hr class="single-doctor-hr">-->
<!--                            <h2 class="single-doctor-header">Отзывы</h2>-->
<!--                            <ec-reviews-->
<!--                                v-if="doctor.id"-->
<!--                                :doctor="doctor"-->
<!--                                :item-id="doctor.id*1"-->
<!--                                :item-name="doctor.fullname"-->
<!--                                @openZoomImage="passZoomImages"-->
<!--                            />-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div-->
<!--                    v-if="!mobileScreen"-->
<!--                    class="single-doctor__aside"  id="info-tabs">-->
<!--                    <FixedBlock>-->
<!--                        <div class="single-doctor__booking">-->

<!--                            <div class="header-h3 text-semibold mb-6">-->
<!--                                Записаться на приём:-->
<!--                            </div>-->
<!--                            <Price-->
<!--                                :mainServices="mainServices"-->
<!--                                :all-services="servicesList"-->
<!--                            />-->
<!--                            <ServicesDialog-->
<!--                                :doctor="doctor"-->
<!--                                :all-services="servicesList"-->
<!--                            />-->
<!--                            <div class="slots mt-6">-->

<!--                                <div class="doctor-card-2__slots">-->
<!--                                    <SlotsCalendar-->
<!--                                        :dissmissDoctor="dismissDoctor"-->
<!--                                        :doctor="doctor"-->
<!--                                    />-->
<!--                                </div>-->
<!--                            </div>-->

<!--                        </div>-->
<!--                    </FixedBlock>-->

<!--                </div>-->

<!--            </div>-->
<!--            <div v-if="doctorClinics">-->
<!--                <div v-for="(clinic, key) in doctorClinics"-->
<!--                     :key="`clinic-${key}`"-->
<!--                     itemprop="hospitalAffiliation" itemscope-->
<!--                     itemtype="https://schema.org/Hospital">-->
<!--                    <meta :content="clinic.full_name" itemprop="name">-->
<!--                    <div itemprop="geo" itemscope itemtype="https://schema.org/GeoCoordinates">-->
<!--                        <meta :content="clinic.lat" itemprop="latitude">-->
<!--                        <meta :content="clinic.lon" itemprop="longitude">-->
<!--                        <meta :content="clinic.address" itemprop="address">-->
<!--                    </div>-->


<!--                </div>-->
<!--            </div>-->


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
