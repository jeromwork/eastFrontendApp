import type { ClinicInterface } from '../../../EastclinicVueApi'



import type { EventBusKey } from '@vueuse/core'

const EventClearSelectedServices: EventBusKey<boolean> = Symbol('event-clear-selected-services')
export default  EventClearSelectedServices;