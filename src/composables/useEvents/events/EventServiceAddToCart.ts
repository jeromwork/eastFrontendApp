
import type { EventBusKey } from '@vueuse/core'
import type {ServiceData} from "../../../EastclinicVueApi";
interface ServiceAddToCartInterface {
    service?:ServiceData;
    multiple?:boolean;

}

const eventServiceAddToCart: EventBusKey<ServiceAddToCartInterface> = Symbol('event-service-add-to-cart')
export default  eventServiceAddToCart;