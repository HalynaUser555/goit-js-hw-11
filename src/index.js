import { ImagesApi } from "./js/pixabay.js";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css"

const imageApi = new ImagesApi();

const buttonEl = document.querySelector('[type="submit"]');
const searchQueryEl = document.getElementsByName('searchQuery')[0];
const gallery = document.querySelector('.gallery');
const loardMoreBtn = document.querySelector('.load-more');

let page = 1;

buttonEl.addEventListener('click', event => {
    event.preventDefault();
    gallery.innerHTML = '';
    imageApi.page = 1;
    search();
});

function search() {
    loardMoreBtn.classList.add('is-hidden')
    if (searchQueryEl.value.trim().length === 0) {
        Notiflix.Notify.warning("Please enter name to search.");
        return;
    }
    imageApi.search(searchQueryEl.value)
        .then(data => {
            if (data.hits.length === 0) {
                Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
                return;
            }
            const lightbox = new SimpleLightbox('.gallery a', {
                captionsData: 'alt',
                captionDelay: 250
            })
            Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);

            for (const imageData of data.hits) {
                const card = getCard(imageData);
                gallery.insertAdjacentHTML("beforeend", card);
            }
            lightbox.refresh();

            console.log(data.hits)
            console.log(imageApi.limit)
            if (data.totalHits >= imageApi.page * imageApi.limit) {
                loardMoreBtn.classList.remove('is-hidden')
            } else {
                loardMoreBtn.classList.add('is-hidden')
                Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
            }
        })
        .catch(data => {
            console.log(data);
            loardMoreBtn.classList.add('is-hidden')
        });
}

function getCard(imageData) {
    return `<div class="photo-card">
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
                    <b>Likes</b><span> ${imageData.likes}<span/>
                    </p>
                    <p class="info-item">
                    <b>Views</b><span> ${imageData.views}<span/>
                    </p>
                    <p class="info-item">
                    <b>Comments</b><span> ${imageData.comments}<span/>
                    </p>
                    <p class="info-item">
                    <b>Downloads</b><span> ${imageData.downloads}<span/>
                    </p>
                </div>
            </div>`;
}

const handleLoardMoreBtnClick = () => {
    imageApi.page += 1;
    search();
}

loardMoreBtn.addEventListener('click', handleLoardMoreBtnClick);
