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
        if(cart[serviceId].count > 1)        cart[serviceId].count--;
        else delete cart[serviceId]
    }
    return cart;
};

export const refreshServicesInCart = (services:ServiceData[], cart:ServiceCartInterface):ServiceCartInterface =>{
    console.log('refreshServicesInCart')
    for(const s in cart){
        const good = cart[s];
        const service = good.service;
        const serviceExists = services.find((_service) => _service.id === service.id)
        if(!serviceExists){
            delete cart[service.id];
        }
    }
    services.map((service) => {
        if(!cart[service.id]) cart[service.id] = {count:1, service:service}
    })

    return cart;
}

export const servicesNameListFormCart = (cart:ServiceCartInterface):string => {
    const names = Object.values(cart).map((good) => good.service.name)
    return (names) ? names.slice(0,-3).join(' · ') : '';
};

export const sumPriceInCart = (cart:ServiceCartInterface):number => {
    // console.log(Object.values(cart))
    const sumServices = Object.values(cart).map((good) =>{
        return ( good.service.custom_price > 0 ) ? good.service.custom_price * good.count  : good.service.price * good.count
    }
        )
    return sumServices.reduce((a, b) => a + b, 0);
};