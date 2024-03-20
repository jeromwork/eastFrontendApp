import type IBookingState from "../interfaces/IBookingState";
import type BookingFormViewProps from "../components/Booking/imterfaces/BookingFormViewProprs";
import type {Ref} from "vue";

export default class ShortBookingState   implements IBookingState{
    bookingFormViewProps:Ref<BookingFormViewProps| null> = ref(null);
    public showBookingSuccessMessage:boolean = false;
    showLeaveMessage:Ref<boolean>= ref(false);

    toggleBookingLeaveMessage( show:boolean ):this{
        return this;
    };
    public toogleBookingSuccessMessage(show:boolean):this{
        this.showBookingSuccessMessage = show;
        return this
    }
    public setBookingFormBlocks( viewProps:BookingFormViewProps ):this{
        this.bookingFormViewProps.value = viewProps;
        return this;
    }
    public async book():Promise<null|undefined>{

        return ;
    }
}