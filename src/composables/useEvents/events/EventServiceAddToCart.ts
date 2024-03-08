
import type { EventBusKey } from '@vueuse/core'
import type {ServiceData} from "../../../EastclinicVueApi";

const eventServiceAddToCart: EventBusKey<ServiceData> = Symbol('event-service-add-to-cart')
export default  eventServiceAddToCart;