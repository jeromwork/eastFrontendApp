import type {ServiceData, ServiceCartInterface} from "../EastclinicVueApi";


const useServiceAddToCart = (service:ServiceData, cart:ServiceCartInterface, multiple:boolean = false) => {
    const serviceId = service.id;
    if(!multiple) {}
    if(cart[serviceId]){
        if(multiple)  cart[serviceId].count++;
        else delete cart[serviceId];
    }else {
        cart[serviceId] = {count:1, service:service}
    }
    return cart;
}
export default useServiceAddToCart