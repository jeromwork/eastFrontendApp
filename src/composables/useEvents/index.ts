import type { ClinicInterface } from '../../EastclinicVueApi'


import type { EventBusKey } from '@vueuse/core'

const eventSelectClinic: EventBusKey<ClinicInterface> = Symbol('event-select-clinic')

import EventClinicMapOpen from "./events/EventClinicMapOpen";
import EventSelectedSlot from "./events/EventSelectedSlot";
import EventServiceAddToCart from "./events/EventServiceAddToCart";
import EventOpenBookingForm from "./events/EventOpenBookingForm";

export {
    EventClinicMapOpen,
    EventSelectedSlot,
    EventServiceAddToCart,
    EventOpenBookingForm,
}

