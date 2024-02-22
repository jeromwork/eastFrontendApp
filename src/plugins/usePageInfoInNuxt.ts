import {API_MODX_URL} from '../api/config';
import usePageInfoModx from "../server/services/util/usePageInfoModx";

export default defineNuxtPlugin((nuxtApp) => {
    const router = useRouter();
    nuxtApp.vueApp.use(usePageInfoModx, {
        router,
        apiUrl:API_MODX_URL
    })
})