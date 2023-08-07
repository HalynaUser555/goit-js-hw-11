import axios from 'axios';

const API_KEY = "38644328-26e5aea8258bf29764be525e4";
const BASE_URL = "https://pixabay.com/api/";

export class ImagesApi {
    constructor() {
        this.page = 1;
        this.limit = 40;
    }
    async search(term) {
        const refs = {
            key: API_KEY,
            q: encodeURIComponent(term),
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page: this.page,
            per_page: this.limit,
        }

        const path = new URLSearchParams(refs).toString()
        const response = await axios.get(`${BASE_URL}?${path}`);
        if (response.status != 200) {
            throw new Error(response.status);
        }
        return response.data;
    };
}
