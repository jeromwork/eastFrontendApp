
import type { EventBusKey } from '@vueuse/core'
import type {ServiceData} from "../../../EastclinicVueApi";
import type BookingFormViewProps from "../../../components/Booking/imterfaces/BookingFormViewProprs";

const eventOpenBookingForm: EventBusKey<BookingFormViewProps> = Symbol('event-open-booking-form')
export default  eventOpenBookingForm;