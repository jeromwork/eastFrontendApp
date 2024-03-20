import type BookingFormViewProps from "../components/Booking/imterfaces/BookingFormViewProprs";
import { ref } from "vue";
import  type {Ref} from "vue";

export default interface IBookingState{


    bookingFormViewProps:Ref<BookingFormViewProps| Object>;
    showBookingSuccessMessage:Ref<boolean>;
    showLeaveMessage:Ref<boolean>;
    showModalBooking:boolean;

    toggleBookingLeaveMessage( show:boolean ):this;
    toogleBookingSuccessMessage(show:boolean):this;
    setBookingFormBlocks( viewProps:BookingFormViewProps ):this;
    book():Promise<null|undefined>;



}
