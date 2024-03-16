/// <reference path="./interfaces/Interfaces.d.ts" />


// import DoctorsRequest from './modules/Doctors/api/DoctorsRequest'
import DoctorsRequest from './modules/Doctors/api/DoctorsRequest'

// import {baseUrl, API_URL, BASE_URL, API_MODX_URL} from './config'


import DoctorsService from './modules/Doctors/DoctorsService';

import PageInfoService from './modules/PageInfo/PageInfoService';
import PageInfoRequest from './modules/PageInfo/api/PageInfoRequest';

import ScheduleService from "./modules/Schedule/ScheduleService";
import ScheduleRequest from "./modules/Schedule/api/ScheduleRequest";

import ClinicsService from './modules/Clinics/ClinicsService';
import ClinicsRequest from './modules/Clinics/api/ClinicsRequest';

import BookingService from './modules/Booking/BookingService'
import Patient from "./modules/Booking/Patient";


import type PageInfoInterface from './interfaces/PageInfoInterface'
import type ChevronInterface from "./interfaces/ChevronInterface";
import type AwardInterface from "./interfaces/AwardInterface";
import type DoctorInterface from "./interfaces/DoctorInterface";
import type ContentInterface from "./interfaces/ContentInterface";
import type ScheduleInterface from "./interfaces/ScheduleInterface";
import type ClinicInterface from "./interfaces/ClinicInterface";
import type ServiceData from "./interfaces/ServiceData";
import type ServiceCartInterface from "./interfaces/ServiceCartInterface";




export {


    DoctorsService,
    DoctorsRequest,


    PageInfoService,
    PageInfoRequest,

    ClinicsService,
    ClinicsRequest,

    ScheduleService,
    ScheduleRequest,

    BookingService,
    Patient,
};

export type {
    PageInfoInterface,
    DoctorInterface,


    AwardInterface,
    ChevronInterface,
    ContentInterface,

    ScheduleInterface,
    ClinicInterface,

    ServiceData,
    ServiceCartInterface,
}
