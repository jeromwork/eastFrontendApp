import type ChevronInterface from './ChevronInterface'
import type AwardInterface from './AwardInterface'
import type ContentInterface from './ContentInterface'
import type ServiceData from './ServiceData'
import type ClinicInterface from './ClinicInterface'
import type {Ref} from 'vue'
interface Research {
    question: string;
    answer: string;
}

interface Award {
    source: string;
    name: string;
    portal: string;
    place: number;
}



interface Speciality {
    id:number,
    name:string,
}


/**
 * Interface representing a Doctor.
 * @interface
 */
export default interface DoctorInterface {
    /**
     * The unique identifier for the doctor.
     * @var int
     */
    id: number;

    /**
     * The first name of the doctor.
     * @var string
     */
    name: string;

    /**
     * The middle name of the doctor.
     * @var string
     */
    middlename: string;

    /**
     * The last name of the doctor.
     * @var string
     */
    surname: string;

    /**
     * The group to which the doctor belongs. Can be null or of unknown type.
     * @var null | any // Replace 'any' with the appropriate type if known
     */
    group: null | any;

    /**
     * The unique identifier for the doctor's instance.
     * @var int
     */
    iid: number;

    /**
     * The rating assigned to the doctor.
     * @var number
     */
    rating: number;

    /**
     * The URI (Uniform Resource Identifier) representing the doctor.
     * @var string
     */
    uri: string;

    /**
     * The unique identifier for the doctor's resource.
     * @var number
     */
    id_resource: number;

    /**
     * The number of comments about the doctor.
     * @var number
     */
    comments: number;

    /**
     * A short description of the doctor.
     * @var string
     */
    description: string;

    /**
     * The full description of the doctor, possibly containing HTML markup.
     * @var string
     */
    description_full: string;

    /**
     * The number of years of experience the doctor has.
     * @var number
     */
    experience: number;
    /**
    * The full name of the doctor.
    * @var string
    */
    fullname: string;

    /**
     * The filials to which the doctor is associated, represented as a key-value pair.
     * @var { [key: string]: number }
     */
    filials: { [key: string]: number };

    /**
     * Indicates whether the doctor can handle pregnant patients (1 for true, 0 for false).
     * @var number
     */
    pregnant: number;

    /**
     * Indicates whether the doctor offers telemedicine services (1 for true, 0 for false).
     * @var number
     */
    telemedicine: number;
    service_data: ServiceData[];
    choosen_service_data: ServiceData[];
    favoriteService?: ServiceData;
    main_specials?: Speciality[];
    research: {
        question: string;
        answer: string;
    }[];
    quotes: string;
    interviews: { question: string; answer: string }[];
    seoServiceData: null; // Replace 'null' with the appropriate type if known
    videos: any[]; // Replace 'any' with the appropriate type if known
    is_cabinet: number;
    tv__doctorSkill: string;
    tv__doc_chevron: string;
    tv__doc_exp: number;
    tv__doc_photo: string;
    tv__dop_info_vrach: string;
    tv__det: null; // Replace 'null' with the appropriate type if known
    content?: ContentInterface[];
    photos: { [key: string]: string[] };
    diploms: { image: string; title: null }[];
    awards?: AwardInterface[];
    chevrons?: ChevronInterface[];
    photo120x120? : ContentInterface;

    appointmentOnline:boolean,
    specials?:string,
    specials_of_service?:Speciality[];


    workDays?:number[]|Ref<number[]>;
    clinics: ClinicInterface[]|null

}


