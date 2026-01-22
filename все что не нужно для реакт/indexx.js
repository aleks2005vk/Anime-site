fetch('anime.json')
  .then(response => response.json())
  .then(data => {
    const catalog = document.querySelector('.card-grid');

    data.forEach((anime, index) => {
      const card = document.createElement('a');
      card.classList.add('card');

      card.innerHTML = `
		<a href="#" class="card">
        		<img src="${anime.coverImage.large}" alt="${anime.title.english}" class="anime-image">
        		<div class="info">
          			<h2>${anime.title.english}</h2>
          			<button class="watch">Смотреть</button>
        		</div>
      		</a>
      `;

      catalog.appendChild(card);

      setTimeout(() => card.classList.add('show'), index * 100);
    });
  })
  .catch(error => console.error('Ошибка загрузки JSON:', error));
