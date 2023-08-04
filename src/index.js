import { ImagesApi } from "./js/pixabay.js";

const imageApi = new ImagesApi();

imageApi.search('cat')
    .then(data => {
        console.log(data)
        for (const imageData of data.hits) {
            console.log(imageData.webformatURL)
        }





    })


    //(console.log)
    .catch(console.log);