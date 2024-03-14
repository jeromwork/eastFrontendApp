import {API_MODX_URL} from '../../../config';
import {postToServer} from '../../../util/UseFetchToServer';

type TBookingRequest = {
    ok : boolean;
    message ?: string;
    error ?: string;
    code ?: number;
}

export default class BookingApi {
    public async book(requestData: Object): Promise<TBookingRequest> {
        try {
            const res = await postToServer('http://dev.eastclinic.local/api/book', { ...requestData });

            // Add a return statement here
            return res as TBookingRequest;

        } catch (error) {
            console.log('error')
            // Handle the error if needed

            // You might want to return something in case of an error, or throw it again
            throw error;
        }
    }

}
