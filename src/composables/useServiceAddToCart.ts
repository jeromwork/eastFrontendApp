import type {ServiceData, ServiceCartInterface} from "../EastclinicVueApi";


const useServiceAddToCart = (service:ServiceData, cart:ServiceCartInterface) => {
    const serviceId = service.id;
    if(cart[serviceId]){
        cart[serviceId].count++;
    }else {
        cart[serviceId] = {count:1, service:service}
    }
    return cart;
}
export default useServiceAddToCart