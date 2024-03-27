import type IBookingState from "../interfaces/IBookingState";
import type BookingFormViewProps from "../components/Booking/imterfaces/BookingFormViewProprs";
import type {Ref} from "vue";
import { YandexMetrika } from "../composables/useYandexMetrika";
import useCalltouch from "../composables/useCalltouch";
import { DoctorsService, ScheduleService, BookingService, ScheduleRequest, Patient} from "../EastclinicVueApi";
import type { IBookingRequest } from "../EastclinicVueApi";
export default class BookingState implements IBookingState{
    public bookingFormViewProps:Ref<BookingFormViewProps| Object> = ref({});
    public _showBookingSuccessMessage:Ref<boolean> = ref(false);
    public _showBookingScheduleBlock:Ref<boolean> = ref(false);
    protected _showLeaveMessage:Ref<boolean> = ref(false);
    protected _showModalBooking:Ref<boolean> = ref(false);
    protected _errorText:Ref<string> = ref('');
    public bookingService = new BookingService();
    public Patient:Patient = new Patient()

    public get errorText():string{
        return this._errorText.value;
    }
    public set errorText(error:string){
        this._errorText.value = error;
    }
    public get showModalBooking():boolean{
        return this._showModalBooking.value;
    }
    public set showModalBooking(show:boolean){
        this._showModalBooking.value = show;
        this.showBookingScheduleBlock = false;
    }

    public get showLeaveMessage():boolean{
        return this._showLeaveMessage.value;
    }
    public set showLeaveMessage(show:boolean){
        this._showLeaveMessage.value = show;
    }

    public get showBookingScheduleBlock():boolean{
        return this._showBookingScheduleBlock.value;
    }
    public set showBookingScheduleBlock(show:boolean){
        this._showBookingScheduleBlock.value = show;
    }

    public get showBookingSuccessMessage():boolean{
        return this._showBookingSuccessMessage.value;
    }
    public set showBookingSuccessMessage(show:boolean){
        this._showBookingSuccessMessage.value = show;
    }

    toggleBookingLeaveMessage( show:boolean ):this{
        return this;
    };
    public toogleBookingSuccessMessage(show:boolean):this{
        this._showBookingSuccessMessage.value = show;
        return this
    }
    public setBookingFormBlocks( viewProps:BookingFormViewProps ):this{
        this.bookingFormViewProps.value = viewProps;
        return this;
    }
    public async book():Promise<IBookingRequest|undefined>{
        if(!this.Patient.checkFioResume() || !this.Patient.checkPhoneResume() )  return ;
        try {
            const bookingService = new BookingService().withPatient(this.Patient);

            const res = await bookingService.book()

            // Ecommerce.withDoctor(this.Doctor).purchase();

            if(res?.ok) {
                this.showModalBooking = false;
                this.showLeaveMessage = false;
                this.showBookingSuccessMessage = true;

                YandexMetrika.reachGoal('booking_done')

                useCalltouch()
                    .forPatient(this.Patient as Patient)
                    // .withTags([this.Doctor.shortFio as string, this.selectedClinic?.node_address as string]) //todo not found tags for short form
                    .booking()

            }else {
                if (res?.error){
                    this.errorText = res?.error as string;
                }else this.errorText = 'Ошибка сервера, попробуйте позже';
            }
            return res;
        }catch (e) {
            this.errorText = 'Ошибка сервера, попробуйте позже';
        }

        return ;

    }


}