import type {ServiceData, ServiceCartInterface} from "../EastclinicVueApi";


const useServiceRemoveFromCart = (service:ServiceData, cart:ServiceCartInterface) => {
    const serviceId = service.id;
    if(cart[serviceId]){
        cart[serviceId].count--;
    }
    return cart;
}
export default useServiceRemoveFromCart