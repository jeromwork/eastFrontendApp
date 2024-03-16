import { Config, YaMetrika } from "./types";
import Vue from 'vue';
export declare function loadScript(callback: () => void, scriptSrc?: string, err?: OnErrorEventHandler): void;
export declare function createMetrika(v: typeof Vue, config: Config): YaMetrika;
export declare function startTracking(metrika: YaMetrika, config: Config): void;

let ready = false;
const yandexMetrika = () => {

    if(process.client && !ready){

        import('vue-yandex-metrika-ts').then(module => {
            const VueYandexMetrika = module.default;
            VueYandexMetrika()
        });
        console.log(VueYandexMetrika)
    }
    // if(!process.client){
    //     return null;
    // }
    // if (window.hasOwnProperty('ym') === undefined) {
    //     create()
    // }
    // return window.ym;
}
export default yandexMetrika;

