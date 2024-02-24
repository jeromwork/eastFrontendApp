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
    };
    sessionId: string;
}

interface Breadcrumb {
    title: string;
    url: string;
}