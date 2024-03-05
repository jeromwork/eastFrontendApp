import type { ClinicInterface } from '../../../EastclinicVueApi'



import type { EventBusKey } from '@vueuse/core'

const eventClinicMapOpen: EventBusKey<ClinicInterface> = Symbol('event-clinic-map-open')
export default  eventClinicMapOpen;