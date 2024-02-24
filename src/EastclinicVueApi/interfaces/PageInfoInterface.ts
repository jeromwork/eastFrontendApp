/**
 * Interface representing the structure for the page information.
 */
export default interface PageInfoInterface {
    /**
     * An associative array representing the parents of the page.
     *
     * @var { [key: string]: number }
     */
    parents: { [key: string]: number };

    /**
     * A boolean indicating whether the page is a catalog.
     *
     * @var boolean
     */
    isCatalog: boolean;

    /**
     * A string representing the type of the page.
     *
     * @var string
     */
    type: string;

    /**
     * The template number associated with the page.
     *
     * @var number
     */
    template: number;

    /**
     * The URL of the page.
     *
     * @var string
     */
    url: string;

    /**
     * The parent number of the page.
     *
     * @var number
     */
    parent: number;

    /**
     * The unique identifier of the page.
     *
     * @var number
     */
    id: number;

    /**
     * The title of the page.
     *
     * @var string
     */
    title: string;

    /**
     * The page title.
     *
     * @var string
     */
    pagetitle: string;

    /**
     * The long title of the page.
     *
     * @var string
     */
    longtitle: string;

    /**
     * The menu title of the page.
     *
     * @var string
     */
    menutitle: string;

    /**
     * The content of the page.
     *
     * @var string
     */
    content: string;

    /**
     * The description of the page.
     *
     * @var string
     */
    description: string;

    /**
     * The quality description of the page.
     *
     * @var string
     */
    qualityDescription: string;

    /**
     * The author of the article associated with the page.
     *
     * @var string
     */
    authorArticle: string;

    /**
     * The URL of the author's article.
     *
     * @var string
     */
    urlAuthorArticle: string;

    /**
     * The worker type to be used.
     *
     * @var number
     */
    useWorkerType: number;

    /**
     * Indicator for showing the Instagram slider on the page.
     *
     * @var number
     */
    showInstaSlider: number;
}
