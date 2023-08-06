import { ImagesApi } from "./js/pixabay.js";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css"

const imageApi = new ImagesApi();



const buttonEl = document.querySelector('[type="submit"]');
const searchQueryEl = document.getElementsByName('searchQuery')[0];
const gallery = document.querySelector('.gallery')

buttonEl.addEventListener('click', event => { event.preventDefault(); search(); });
function search() {
    imageApi.search('cat')//searchQueryEl.value
        .then(data => {
            console.log(data)
            if (data.hits.length === 0) {
                Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.");
                return;
            }
            const lightbox = new SimpleLightbox('.gallery a', {
                captionsData: 'alt',
                captionDelay: 250
            })
            Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);

            for (const imageData of data.hits) {
                gallery.insertAdjacentHTML("beforeend",
                    `<div class="photo-card">
                        <a class="gallery__link" href="${imageData.largeImageURL}">
                            <img
                            class="gallery__image"
                            src="${imageData.webformatURL}"
                            data-source="${imageData.largeImageURL}"
                            alt="${imageData.tags}"
                            loading="lazy"
                            />
                        </a>
                        <div class="info">
                            <p class="info-item">
                            <b>Likes</b><span>${imageData.likes}<span/>
                            </p>
                            <p class="info-item">
                            <b>Views</b><span>${imageData.views}<span/>
                            </p>
                            <p class="info-item">
                            <b>Comments</b><span>${imageData.comments}<span/>
                            </p>
                            <p class="info-item">
                            <b>Downloads</b><span>${imageData.downloads}<span/>
                            </p>
                        </div>
                    </div>`);

                lightbox.refresh();
            }
        })
        .catch(console.log);
}

