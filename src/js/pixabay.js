
// import Notiflix from 'notiflix';
import axios from 'axios';
// import pixabay from 'pixabay';

// axios.defaults.headers.common['x-api-key']
//     = 'API_KEY';
const API_KEY = "38644328-26e5aea8258bf29764be525e4";
const BASE_URL = "https://pixabay.com/api/";
// const Pixabay_URL = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent('cat')}&image_type=photo&orientation=horizontal&safesearch=true`;
// $.getJSON(URL, function (data) {
//     if (parseInt(data.totalHits) > 0)
//         $.each(data.hits, function (i, hit) { console.log(hit.pageURL); });
//     else
//         console.log('No hits');
// });


export class ImagesApi {
    constructor() {
        this.page = 1;
    }
    search(term) {
        return axios.get(`${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(term)}&image_type=photo&orientation=horizontal&safesearch=true`)
            .then(response => {
                if (response.status != 200) {
                    throw new Error(response.status);
                }
                return response.data;
            });
    };
}

//webformatURL=https://pixabay.com/get/35bbf209e13e39d2_640.jpg&largeImageURL="https://pixabay.com/get/ed6a99fd0a76647_1280.jpg"
//& tags=the cat is small and adult"&views=7000&downloads=3500&likes=5&comments=2

