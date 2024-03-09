import type { ClinicInterface } from '../../EastclinicVueApi'


import type { EventBusKey } from '@vueuse/core'

const eventSelectClinic: EventBusKey<ClinicInterface> = Symbol('event-select-clinic')

import EventClinicMapOpen from "./events/EventClinicMapOpen";
import EventSelectClinic from "./events/EventSelectClinic";
import EventSelectedWorkingDay from "./events/EventSelectedWorkingDay";
import EventSelectedSlot from "./events/EventSelectedSlot";
import EventServiceAddToCart from "./events/EventServiceAddToCart";
import EventOpenBookingForm from "./events/EventOpenBookingForm";

export {
    EventClinicMapOpen,
    EventSelectClinic,
    EventSelectedWorkingDay,
    EventSelectedSlot,
    EventServiceAddToCart,
    EventOpenBookingForm,
}

