import type { EventBusKey } from '@vueuse/core'

const EventSelectedSlot: EventBusKey<number> = Symbol('event-selected-slot')
export default  EventSelectedSlot;