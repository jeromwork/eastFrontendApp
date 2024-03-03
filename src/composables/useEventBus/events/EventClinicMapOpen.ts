import type { ClinicInterface } from '../../../EastclinicVueApi'
interface EventClinicMapOpenInterface {
    clinic?: ClinicInterface;
    str?: String;
}


import type { EventBusKey } from '@vueuse/core'

const eventClinicMapOpen: EventBusKey<EventClinicMapOpenInterface> = Symbol('event-clinic-map-open')
export default  eventClinicMapOpen;