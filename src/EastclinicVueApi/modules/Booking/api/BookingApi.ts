import {API_MODX_URL} from '../../../config';
import {postToServer} from '../../../util/UseFetchToServer';
import type {IBookingRequest} from '../../../index'


export default class BookingApi {
    public async book(requestData: Object): Promise<IBookingRequest> {
        try {
            const res = await postToServer('http://dev.eastclinic.local/api/book', { ...requestData });

            // Add a return statement here
            return res as IBookingRequest;

        } catch (error) {
            console.log('error')
            // Handle the error if needed

            // You might want to return something in case of an error, or throw it again
            throw error;
        }
    }

}
