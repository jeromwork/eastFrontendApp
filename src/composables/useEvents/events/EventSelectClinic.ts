import type { ClinicInterface } from '../../../EastclinicVueApi'



import type { EventBusKey } from '@vueuse/core'

const eventSelectClinic: EventBusKey<ClinicInterface> = Symbol('event-select-clinic')
export default  eventSelectClinic;