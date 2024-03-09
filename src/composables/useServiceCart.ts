import type {ServiceData, ServiceCartInterface} from "../EastclinicVueApi";
export const serviceAddToCart = (service:ServiceData, cart:ServiceCartInterface):ServiceCartInterface => {
    const serviceId = service.id;
    if(cart[serviceId]){
        cart[serviceId].count++;
    }else {
        cart[serviceId] = {count:1, service:service}
    }
    return cart;
};

export const serviceRemoveFromCart = (service:ServiceData, cart:ServiceCartInterface):ServiceCartInterface => {
    const serviceId = service.id;
    if(cart[serviceId]){
        cart[serviceId].count--;
    }
    return cart;
};

export const addServicesInCart = (services:ServiceData[], cart:ServiceCartInterface):ServiceCartInterface =>{
    const newCart:ServiceCartInterface = {};
    for(const s in services){
        const service = services[s]
        newCart[service.id] = {count:1, service:service}
    }
    return newCart;
}

export const servicesNameListFormCart = (cart:ServiceCartInterface):string => {
    const names = Object.values(cart).map((good) => good.service.name)
    return (names) ? names.slice(0,-3).join(' · ') : '';
};

export const sumPriceInCart = (cart:ServiceCartInterface):number => {
    const sumServices = Object.values(cart).map((good) =>
        ( good.service.custom_price > 0 ) ? good.service.custom_price * good.count  : good.service.price * good.count )
    return sumServices.reduce((a, b) => a + b, 0);
};