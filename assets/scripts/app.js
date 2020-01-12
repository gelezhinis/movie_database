const addMovieModal = document.getElementById('add-modal');
const deleteMovieModal = document.getElementById('delete-modal');
const startAddMovieButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');

const cancelMovieModal = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = cancelMovieModal.nextElementSibling;
const cancelDeleteMovieModal = deleteMovieModal.querySelector('.btn--passive');
let confirmDeleteMovieButton = cancelDeleteMovieModal.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const sectionText = document.getElementById('entry-text');
const movieList = sectionText.nextElementSibling;

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};

const closeMovieModal = () => {
  addMovieModal.classList.remove('visible');
};

const showMovieModal = () => {
  addMovieModal.classList.add('visible');
  toggleBackdrop();
};

const clearMovieInputs = () => {
  for (const usrInput of userInputs) {
    usrInput.value = '';
  }
};

const cancelAddMovieHandler = () => {
  closeMovieModal();
  clearMovieInputs();
  toggleBackdrop();
};

const movies = [];

const updateUI = () => {
  if (movies.length === 0) {
    sectionText.style.display = 'block';
  } else {
    sectionText.style.display = 'none';
  }
};

const closeMovieDeletionModal = () => {
  toggleBackdrop();
  deleteMovieModal.classList.remove('visible');
};

const deleteMovieHandler = movieId => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  const movieList = document.getElementById('movie-list');
  movieList.children[movieIndex].remove();
  closeMovieDeletionModal();
  updateUI();
};

const startDeleteMovieHandler = movieId => {
  deleteMovieModal.classList.add('visible');
  toggleBackdrop();

  confirmDeleteMovieButton.replaceWith(
    confirmDeleteMovieButton.cloneNode(true)
  );

  confirmDeleteMovieButton = deleteMovieModal.querySelector('.btn--danger');

  cancelDeleteMovieModal.removeEventListener('click', closeMovieDeletionModal);

  cancelDeleteMovieModal.addEventListener('click', closeMovieDeletionModal);
  confirmDeleteMovieButton.addEventListener(
    'click',
    deleteMovieHandler.bind(null, movieId)
  );
};

const renderNewMovieElement = (id, title, image, rating) => {
  const newMovieElement = document.createElement('li');
  newMovieElement.className = 'movie-element';
  newMovieElement.innerHTML = `
    <div class="movie-element__image">
      <img src="${image}" alt="${title}">
    </div>
    <div class="movie-element__info">
      <h2>${title}</h2>
      <p>${rating}/5 stars</p>
    </div>
  `;
  newMovieElement.addEventListener(
    'click',
    startDeleteMovieHandler.bind(null, id)
  );
  movieList.append(newMovieElement);
};

const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;
  //trim() removes extra white space in front or back
  if (
    titleValue.trim() === '' ||
    imageValue.trim() === '' ||
    ratingValue.trim() === '' ||
    +ratingValue > 5 ||
    +ratingValue < 1
  ) {
    alert('Please enter valid values (rating between 1 and 5)');
    return;
  }
  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageValue,
    rating: ratingValue
  };
  movies.push(newMovie);
  console.log(movies);
  closeMovieModal();
  toggleBackdrop();
  clearMovieInputs();
  renderNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.image,
    newMovie.rating
  );
  updateUI();
};

const backdropClickHandler = () => {
  closeMovieModal();
  closeMovieDeletionModal();
  clearMovieInputs();
};

startAddMovieButton.addEventListener('click', showMovieModal);
cancelMovieModal.addEventListener('click', cancelAddMovieHandler);
backdrop.addEventListener('click', backdropClickHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);
