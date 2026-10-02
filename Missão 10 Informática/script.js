const movies = [
  {
    id: 1,
    title: 'Super Mario Galaxy',
    genre: 'Ação',
    director: 'Aaron Horvath',
    year: 202,
    rating: 6.2,
    poster: 'Mario.webp',
    synopsis: 'Depois de derrotar Bowser e salvar o Brooklyn, Mario e seus amigos enfrentam uma nova ameaça: Wario, com Bowser Jr., conspiram para dominar o mundo. Eles devem se unir a Yoshi para deter essa dupla maligna.',
  },
  {
    id: 2,
    title: 'Green Book: O Guia',
    genre: 'Comédia',
    director: 'Peter Farrelly',
    year: 2018,
    rating: 8.2,
    poster: 'Green book.jpg',
    synopsis: 'Um valentão ítalo-americano se torna o motorista de um pianista afro-americano em um tour no sul dos Estados Unidos nos anos sessenta.',
  },
  {
    id: 3,
    title: 'I.T',
    genre: 'Terror',
    director: 'Andy Muschietti',
    year: 2017,
    rating: 7.3,
    poster: 'IT.webp',
    synopsis: 'Um grupo de garotos que sofre bullying se une para destruir um monstro que se disfarça de palhaço e ataca as crianças de sua pequena cidade.',
  },
  {
    id: 4,
    title: 'Verity',
    genre: 'Romance',
    director: 'Michael Showalter',
    year: 2026,
    rating: 6.1,
    poster: 'Verity.webp',
    synopsis: ' Ei, sou eu, o Verity! me pergunte qualquer coisa. Lowen Ashleigh é contratada por Jeremy Crawford para escrever romances para sua esposa Verity, autora de best-sellers, que não consegue terminar de escrever após um acidente.',
  },
  {
    id: 5,
    title: 'Matrix',
    genre: 'Ficção científica',
    director: 'Lana Wachowski e Lilly Wachowski',
    year: 1998,
    rating: 8.7,
    poster: 'Matrix.webp',
    synopsis: 'Um hacker aprende com os misteriosos rebeldes sobre a verdadeira natureza de sua realidade e seu papel na guerra contra seus controladores..',
  },
  {
    id: 6,
    title: 'NomadLand',
    genre: 'Drama',
    director: 'Chloé Zhao',
    year: 2020,
    rating: 7.3,
    poster: 'Nomad.webp',
    synopsis: 'Uma mulher na casa dos sessenta anos que, depois de perder tudo na Grande Recessão, embarca em uma viagem pelo oeste americano, vivendo como um nômade moderno que vive em uma van.',
  },
  {
    id: 7,
    title: 'Vingadores: Ultimato',
    genre: 'Ação',
    director: 'Anthony Russo e Joe Russo',
    year: 2019,
    rating: 8.4,
    poster: 'Vingadores.webp',
    synopsis: 'Após os eventos devastadores de Vingadores: Guerra Infinita, o universo está em ruínas. E com a ajuda de aliados, os Vingadores se reúnem para desfazer as ações de Thanos e restaurar a ordem.',
  },
  {
    id: 8,
    title: 'Ted: O Filme',
    genre: 'Comédia',
    director: 'Seth MacFarlane',
    year: 2012,
    rating: 6.9,
    poster: 'Ted.webp',
    synopsis: 'John Bennett, um homem cujo desejo de infância de dar vida ao seu ursinho de pelúcia, agora deve decidir entre manter um relacionamento com o urso ou sua namorada, Lori.',
  },
  {
    id: 9,
    title: 'Ruby Sparks',
    genre: 'Romance',
    director: 'Jonathan Dayton',
    year: 2012,
    rating: 7.2,
    poster: 'Ruby.webp',
    synopsis: 'Um escritor encontra o romance da maneira mais inusitada: criando uma personagem feminina que acredita que ela o amará.',
  },
  {
    id: 10,
    title: 'Backrooms',
    genre: 'Terror',
    director: 'Kane Parsons',
    year: 2026,
    rating: 6.7,
    poster: 'Backrooms.webp',
    synopsis: 'Lowen Ashleigh é contratada por Jeremy Crawford para escrever romances para sua esposa Verity, autora de best-sellers, que não consegue terminar de escrever após um acidente..',
  },
  {
    id: 11,
    title: 'A Última Jornada',
    genre: 'Ficção científica',
    director: 'Clara Nunes',
    year: 2024,
    rating: 9.0,
    poster: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
    synopsis: 'Um grupo de exploradores espaciais tenta atravessar um buraco de minhoca para localizar a origem da vida.',
  },
  {
    id: 12,
    title: 'Digger',
    genre: 'Comédia',
    director: ' Alejandro G. Iñárritu',
    year: 2026,
    rating: 7.3,
    poster: 'Digger.webp',
    synopsis: 'O homem mais poderoso do mundo provoca um desastre e embarca em uma missão para demonstrar que é o Salvador da Humanidade.',
  },
];

const categories = ['Todos', 'Ação', 'Comédia', 'Romance', 'Terror', 'Ficção científica', 'Drama'];

const state = {
  search: '',
  activeCategory: 'Todos',
  favorites: new Set(JSON.parse(localStorage.getItem('starlight-favorites') || '[]')),
};

const movieGrid = document.getElementById('movieGrid');
const categoryFilter = document.getElementById('categoryFilter');
const movieSearch = document.getElementById('movieSearch');
const favoriteList = document.getElementById('favoriteList');
const favoritesCount = document.getElementById('favoritesCount');
const clearFiltersBtn = document.getElementById('clearFiltersBtn');
const movieModal = document.getElementById('movieModal');
const modalContent = document.getElementById('modalContent');

function saveFavorites() {
  localStorage.setItem('starlight-favorites', JSON.stringify([...state.favorites]));
}

function getFilteredMovies() {
  const normalizedSearch = state.search.trim().toLowerCase();

  return movies.filter((movie) => {
    const matchesCategory = state.activeCategory === 'Todos' || movie.genre === state.activeCategory;
    const matchesSearch =
      normalizedSearch === '' ||
      movie.title.toLowerCase().includes(normalizedSearch) ||
      movie.genre.toLowerCase().includes(normalizedSearch) ||
      movie.synopsis.toLowerCase().includes(normalizedSearch);

    return matchesCategory && matchesSearch;
  });
}

function renderCategoryFilters() {
  categoryFilter.innerHTML = '';

  categories.forEach((category) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `category-btn ${state.activeCategory === category ? 'active' : ''}`;
    button.textContent = category;
    button.addEventListener('click', () => {
      state.activeCategory = category;
      renderCategoryFilters();
      renderMovies();
    });

    categoryFilter.appendChild(button);
  });
}

function createMovieCard(movie) {
  const article = document.createElement('article');
  article.className = 'movie-card';
  article.innerHTML = `
    <img class="movie-poster" src="${movie.poster}" alt="Poster de ${movie.title}" />
    <div class="movie-body">
      <div class="movie-meta">
        <div>
          <h3 class="movie-title">${movie.title}</h3>
          <span class="movie-genre">${movie.genre}</span>
        </div>
        <span class="rating-pill">★ ${movie.rating.toFixed(1)}</span>
      </div>

      <div class="card-actions">
        <button type="button" class="view-button" data-open-movie="${movie.id}">Ver mais</button>
        <button
          type="button"
          class="favorite-toggle ${state.favorites.has(movie.id) ? 'active' : ''}"
          data-favorite="${movie.id}"
          aria-label="${state.favorites.has(movie.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}"
          title="${state.favorites.has(movie.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}"
        >
          ${state.favorites.has(movie.id) ? '♥' : '♡'}
        </button>
      </div>
    </div>
  `;

  return article;
}

function renderMovies() {
  const filteredMovies = getFilteredMovies();
  movieGrid.innerHTML = '';

  if (filteredMovies.length === 0) {
    movieGrid.innerHTML = '<div class="empty-state">Nenhum filme encontrado para sua busca.</div>';
    return;
  }

  filteredMovies.forEach((movie) => {
    movieGrid.appendChild(createMovieCard(movie));
  });
}

function renderFavorites() {
  const favorites = movies.filter((movie) => state.favorites.has(movie.id));
  favoritesCount.textContent = favorites.length;
  favoriteList.innerHTML = '';

  if (favorites.length === 0) {
    favoriteList.innerHTML = '<div class="empty-state">Você ainda não favoritou nenhum filme.</div>';
    return;
  }

  favorites.forEach((movie) => {
    const item = document.createElement('div');
    item.className = 'favorite-item';
    item.innerHTML = `
      <div>
        <strong>${movie.title}</strong>
        <small>${movie.genre}</small>
      </div>
      <button type="button" data-remove-favorite="${movie.id}" aria-label="Remover ${movie.title} dos favoritos">×</button>
    `;
    favoriteList.appendChild(item);
  });
}

function toggleFavorite(id) {
  if (state.favorites.has(id)) {
    state.favorites.delete(id);
  } else {
    state.favorites.add(id);
  }

  saveFavorites();
  renderMovies();
  renderFavorites();
}

function openMovieDetails(id) {
  const movie = movies.find((item) => item.id === Number(id));
  if (!movie) return;

  const isFavorite = state.favorites.has(movie.id);

  modalContent.innerHTML = `
    <div class="modal-content">
      <img class="modal-poster" src="${movie.poster}" alt="Poster de ${movie.title}" />
      <div class="modal-body">
        <div class="modal-header">
          <div>
            <span class="modal-genre">${movie.genre}</span>
            <h3 id="modalTitle">${movie.title}</h3>
          </div>
          <span class="rating-pill">★ ${movie.rating.toFixed(1)}</span>
        </div>

        <div class="modal-meta">
          <span class="meta-badge">📽️ ${movie.director}</span>
          <span class="meta-badge">🗓️ ${movie.year}</span>
        </div>

        <p class="modal-text">${movie.synopsis}</p>

        <div class="modal-actions">
          <button type="button" class="primary-btn" data-favorite-modal="${movie.id}">
            ${isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          </button>
          <button type="button" class="secondary-btn" data-close-modal="true">Fechar</button>
        </div>
      </div>
    </div>
  `;

  movieModal.classList.remove('hidden');
  movieModal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  movieModal.classList.add('hidden');
  movieModal.setAttribute('aria-hidden', 'true');
}

movieSearch.addEventListener('input', (event) => {
  state.search = event.target.value;
  renderMovies();
});

clearFiltersBtn.addEventListener('click', () => {
  state.search = '';
  state.activeCategory = 'Todos';
  movieSearch.value = '';
  renderCategoryFilters();
  renderMovies();
});

document.addEventListener('click', (event) => {
  const favoriteButton = event.target.closest('[data-favorite]');
  if (favoriteButton) {
    toggleFavorite(Number(favoriteButton.dataset.favorite));
    return;
  }

  const modalFavoriteButton = event.target.closest('[data-favorite-modal]');
  if (modalFavoriteButton) {
    toggleFavorite(Number(modalFavoriteButton.dataset.favoriteModal));
    openMovieDetails(modalFavoriteButton.dataset.favoriteModal);
    return;
  }

  const openButton = event.target.closest('[data-open-movie]');
  if (openButton) {
    openMovieDetails(openButton.dataset.openMovie);
    return;
  }

  const removeButton = event.target.closest('[data-remove-favorite]');
  if (removeButton) {
    toggleFavorite(Number(removeButton.dataset.removeFavorite));
    return;
  }

  if (event.target.matches('[data-close-modal]') || event.target.closest('.close-modal')) {
    closeModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !movieModal.classList.contains('hidden')) {
    closeModal();
  }
});

renderCategoryFilters();
renderMovies();
renderFavorites();
