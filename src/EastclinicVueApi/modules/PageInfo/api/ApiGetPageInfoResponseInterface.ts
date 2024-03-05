export default interface ApiGetPageInfoResponseInterface {
    data: {
        resource: {
            parents: { [key: string]: number },
            isCatalog: boolean,
            type: string,
            template: number,
            url: string,
            parent: number,
            id: number,
            title: string,
            pagetitle: string,
            longtitle: string,
            menutitle: string,
            content: string,
            description: string,
            qualityDescription: string,
            authorArticle: string,
            urlAuthorArticle: string,
            useWorkerType: number,
            showInstaSlider: number,
            breadcrumbs?: Breadcrumb[];
        };
        currentClinicId?:number,
        clinicUrl?:string,
        nearestClinicsRoutsInfo?:NearestClinicsRoutsInfo[],

    };
    sessionId?: string;
}

interface NearestClinicsRoutsInfo {
    id: number;
    clinic_id: number;
    place_id: number;
    distance_car: number;
    duration_car: number;
    distance_walk: number;
    duration_walk: number;
}


interface Breadcrumb {
    title: string;
    url: string;
}