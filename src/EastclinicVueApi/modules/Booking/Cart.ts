import type {Ref} from "vue";
import type ServiceCartInterface from "../../interfaces/ServiceCartInterface";
import type {ServiceData} from "../../index";
class Cart{
    protected _cart:Ref<ServiceCartInterface>= ref({})

    public toogleService( service:ServiceData ):this{
        if(this.getGoodByService(service))   delete this._cart.value[service.id];
        else this._cart.value[service.id] = {count:1, service:service}
        return this;
    }

    public add ( service:ServiceData ):this {
        if(this.getGoodByService(service)) this._cart.value[service.id].count++;
        else this._cart.value[service.id] = {count:1, service:service}
        return this;
    };

    public remove ( service:ServiceData ):this {
        const good = this.getGoodByService(service);
        if(good) {
            if(good.count === 1) delete this._cart.value[service.id];
            else this._cart.value[service.id].count--;
        }
        else this._cart.value[service.id] = {count:1, service:service}
        return this;
    };

    public clear():this {
        this._cart.value = {};
        return this;
    }


    public get servicesList():ServiceData[]|null{
        return ( Object.values( this._cart.value ).map((good) => good.service) ) ?? null;
    }

    public get sum():number{
        const sumServices = Object.values(this._cart.value).map((good) =>
            ( good.service.custom_price > 0 ) ? good.service.custom_price * good.count  : good.service.price * good.count )
        return sumServices.reduce((a, b) => a + b, 0);
    }

    public get count():number{
        Object.keys( this._cart.value ).length
        return ( Object.keys( this._cart.value ).length ) ?? 0;
    }

    public get goods():ServiceCartInterface {
        return this._cart.value;
    }




    protected getGoodByService( service:ServiceData ):{count:number, service:ServiceData}|null{
        return (this._cart.value[service.id]) ?? null;
    }

}


export default Cart;