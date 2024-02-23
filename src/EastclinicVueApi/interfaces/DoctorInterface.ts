
interface Research {
    question: string;
    answer: string;
}

interface ServiceData {
    id: string;
    serviceId: number;
    variationId: number;
    name: string;
    variationName: string;
    variationOfficialCode: string;
    price: number;
    custom_price: number;
    default_option: string;
    option: string;
    discount: number;
    weight: number;
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
    main_specials: string[];
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
    content: { type: string; id: null; typeFile: string; url: string }[];
    photos: { [key: string]: string[] };
    diploms: { image: string; title: null }[];
    awards: { [key: string]: { source: string; name: string; portal: string; place: number } };
}

