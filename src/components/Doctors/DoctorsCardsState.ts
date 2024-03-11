import type {DoctorInterface} from "../../EastclinicVueApi";
import type {Ref} from 'vue'



export default class DoctorsCardsState{

    protected doctors:Ref<{[key: string]: DoctorInterface}> = ref({})

}