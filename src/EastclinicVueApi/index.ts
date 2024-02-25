/// <reference path="./interfaces/Interfaces.d.ts" />


// import DoctorsRequest from './modules/Doctors/api/DoctorsRequest'
import DoctorsRequest from './modules/Doctors/api/DoctorsRequest'

// import {baseUrl, API_URL, BASE_URL, API_MODX_URL} from './config'


import DoctorsService from './modules/Doctors/DoctorsService';

import PageInfoService from './modules/PageInfo/PageInfoService';
import PageInfoRequest from './modules/PageInfo/api/PageInfoRequest';


import type PageInfoInterface from './interfaces/PageInfoInterface'
import type ChevronInterface from "./interfaces/ChevronInterface";
import type AwardInterface from "./interfaces/AwardInterface";
import type DoctorInterface from "./interfaces/DoctorInterface";
import type ContentInterface from "./interfaces/ContentInterface";

// import ClinicsService from './modules/Clinics/ClinicsService';

export {


    DoctorsService,
    DoctorsRequest,


    PageInfoService,
    PageInfoRequest,

    // ClinicsService,
    // ClinicsRequest,



};

export type {
    PageInfoInterface,
    DoctorInterface,


    AwardInterface,
    ChevronInterface,
    ContentInterface,
}
