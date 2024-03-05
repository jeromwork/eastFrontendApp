
import type { EventBusKey } from '@vueuse/core'

const EventSelectedWorkingDay: EventBusKey<number> = Symbol('event-selected-working-day')
export default  EventSelectedWorkingDay;