import type BookingFormViewProps from "../components/Booking/imterfaces/BookingFormViewProprs";

export default interface IBookingState{

    setBookingFormBlocks( viewProps:BookingFormViewProps ):this;
    bookingFormViewProps:BookingFormViewProps | null;
    book():Promise<null|undefined>;
}
