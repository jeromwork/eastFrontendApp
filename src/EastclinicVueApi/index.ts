/// <reference path="./interfaces/Interfaces.d.ts" />


// import DoctorsRequest from './modules/Doctors/api/DoctorsRequest'
import DoctorsRequest from './modules/Doctors/api/DoctorsModxRequest'

import {baseUrl, API_URL, BASE_URL, API_MODX_URL} from './config'


import DoctorsService from './modules/Doctors/DoctorsService';

import PageInfoService from './modules/PageInfo/PageInfoService';
import PageInfoRequest from './modules/PageInfo/api/PageInfoRequest';


// import ClinicsService from './modules/Clinics/ClinicsService';

export {


    DoctorsService,
    DoctorsRequest,


    PageInfoService,
    PageInfoRequest,


    // ClinicsService,

    baseUrl, API_URL, BASE_URL, API_MODX_URL,

};