import type { ClinicInterface } from '../../../EastclinicVueApi'



import type { EventBusKey } from '@vueuse/core'

const eventClinicMapOpen: EventBusKey<ClinicInterface> = Symbol('event-set-current-clinic')
export default  eventClinicMapOpen;