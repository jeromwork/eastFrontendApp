// useEventBus.js

import { useEventBus } from '@vueuse/core'


import EventClinicMapOpen from "./events/EventClinicMapOpen";
import type {EventBusKey} from "@vueuse/core";
import exp from "constants";

// import ClinicsService from './modules/Clinics/ClinicsService';

// export function eventBus<T> (name:EventBusKey<T>|string) {
//     console.log(name)
//     return useEventBus<T>(name);
// }
export default useEventBus;

export {
    EventClinicMapOpen,
    // DoctorInterface,
}