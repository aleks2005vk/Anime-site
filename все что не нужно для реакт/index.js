const animeList = document.querySelector('.anime-list');
const animeCards = document.querySelector('.anime-cards');

let scrollSpeed = 0.5; // скорость прокрутки
let scrollPosition = 0;

function autoScroll() {
    scrollPosition += scrollSpeed; // увеличиваем сдвиг

    // если прокрутили весь контейнер, возвращаемся в начало
    if (scrollPosition >= animeCards.scrollWidth / 2) {
        scrollPosition = 0;
    }

    animeList.scrollLeft = scrollPosition;

    requestAnimationFrame(autoScroll); // рекурсивно вызываем для плавного движения
}

// запускаем автоскролл
autoScroll();
const animeData = {
    "data": {
        "Page": {
            "media": [
                {
                    "title": {
                        "romaji": "Shingeki no Kyojin"
                    },
                    "episodes": 25,
                    "averageScore": 84,
                    "coverImage": {
                        "large": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx16498-buvcRTBx4NSm.jpg"
                    }
                },
                {
                    "title": {
                        "romaji": "Kimetsu no Yaiba"
                    },
                    "episodes": 26,
                    "averageScore": 82,
                    "coverImage": {
                        "large": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx101922-WBsBl0ClmgYL.jpg"
                    }
                },
                {
                    "title": {
                        "romaji": "DEATH NOTE"
                    },
                    "episodes": 37,
                    "averageScore": 84,
                    "coverImage": {
                        "large": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx1535-kUgkcrfOrkUM.jpg"
                    }
                },
                {
                    "title": {
                        "romaji": "Jujutsu Kaisen"
                    },
                    "episodes": 24,
                    "averageScore": 85,
                    "coverImage": {
                        "large": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx113415-LHBAeoZDIsnF.jpg"
                    }
                },
                {
                    "title": {
                        "romaji": "Boku no Hero Academia"
                    },
                    "episodes": 13,
                    "averageScore": 76,
                    "coverImage": {
                        "large": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx21459-nYh85uj2Fuwr.jpg"
                    }
                },
                {
                    "title": {
                        "romaji": "HUNTER×HUNTER (2011)"
                    },
                    "episodes": 148,
                    "averageScore": 89,
                    "coverImage": {
                        "large": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx11061-y5gsT1hoHuHw.png"
                    }
                },
                {
                    "title": {
                        "romaji": "One Punch Man"
                    },
                    "episodes": 12,
                    "averageScore": 83,
                    "coverImage": {
                        "large": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx21087-B5DHjqZ3kW4b.jpg"
                    }
                },
                {
                    "title": {
                        "romaji": "Tokyo Ghoul"
                    },
                    "episodes": 12,
                    "averageScore": 75,
                    "coverImage": {
                        "large": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/b20605-k665mVkSug8D.jpg"
                    }
                },
                {
                    "title": {
                        "romaji": "Shingeki no Kyojin Season 2"
                    },
                    "episodes": 12,
                    "averageScore": 84,
                    "coverImage": {
                        "large": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx20958-HuFJyr54Mmir.jpg"
                    }
                },
                {
                    "title": {
                        "romaji": "ONE PIECE"
                    },
                    "episodes": null,
                    "averageScore": 88,
                    "coverImage": {
                        "large": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx21-ELSYx3yMPcKM.jpg"
                    }
                },
				{
                    "title": {
                        "romaji": "ONE PIECE"
                    },
                    "episodes": null,
                    "averageScore": 88,
                    "coverImage": {
                        "large": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx21-ELSYx3yMPcKM.jpg"
                    }
                },{
                    "title": {
                        "romaji": "ONE PIECE"
                    },
                    "episodes": null,
                    "averageScore": 88,
                    "coverImage": {
                        "large": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx21-ELSYx3yMPcKM.jpg"
                    }
                }
				
            ]
        }
    }
}
animeData.data.Page.media.forEach(anime => {
  const html = `
    <div class="anime-card">
      <div class="image">
        <img src="${anime.coverImage.large}" alt="${anime.title.romaji}" class="anime-img">
      </div>
      <div class="rating">
        <img src="/imgs/star.png" alt="" class="rating-star">
        <img src="/imgs/star.png" alt="" class="rating-star">
        <img src="/imgs/star.png" alt="" class="rating-star">
        <img src="/imgs/star.png" alt="" class="rating-star">
        <img src="/imgs/star.png" alt="" class="rating-star">
      </div>
      <div class="info">
        <h3 class="anime-title">${anime.title.romaji}</h3>
      </div>
    </div>
  `;
  animeCards.insertAdjacentHTML('beforeend', html);
});
