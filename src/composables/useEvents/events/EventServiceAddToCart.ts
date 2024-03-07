import type { ClinicInterface } from '../../../EastclinicVueApi'



import type { EventBusKey } from '@vueuse/core'

const eventServiceAddToCart: EventBusKey<ClinicInterface> = Symbol('event-service-add-to-cart')
export default  eventServiceAddToCart;