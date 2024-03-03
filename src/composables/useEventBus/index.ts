// useEventBus.js

import { useEventBus } from '@vueuse/core'


import EventClinicMapOpen from "./events/EventClinicMapOpen";
import type {EventBusKey} from "@vueuse/core";

// import ClinicsService from './modules/Clinics/ClinicsService';

export default function eventBus<T> (name:EventBusKey<T>|string) {
    console.log(name)
    return useEventBus<T>(name);
}

export {
    EventClinicMapOpen,
    // DoctorInterface,
}