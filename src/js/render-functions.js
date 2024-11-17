export function createGalleryMarkup({ hits }) {
  if (hits.length === 0) {
    onSearchError();
    return;
  }

  return hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}">
     <img
      class="gallery-image"
      src="${webformatURL}"
      alt="${tags}"
    />
  </a>
  <ul class="galery-attribute-list">
    <li class="attribute-item">
          <p class="attribute">Likes</p>
          <p class="attribute-value">${likes}</p>
        </li>
        <li class="attribute-item">
          <p class="attribute">Views</p>
          <p class="attribute-value">${views}</p>
        </li>
        <li class="attribute-item">
          <p class="attribute">Comments</p>
          <p class="attribute-value">${comments}</p>
        </li>
        <li class="attribute-item">
          <p class="attribute">Downloads</p>
          <p class="attribute-value">${downloads}</p>
        </li>
        </ul>
</li>`
    )
    .join('');
}
