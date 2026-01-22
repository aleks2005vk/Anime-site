import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useGetTopAnimeQuery } from "../../../services/JikanjsApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Autoplay, EffectFade } from "swiper/modules";
import { Rating, Tooltip } from "@mui/material";
import AnimesSkeleton from "./animesSkeleton";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "./Home.css";
import "./HeroSlider.css"
import Chat from "../../ui/Chat/chat";

export default function Home() {
  const [page] = useState(1);
  const [animeList, setAnimeList] = useState([]);
  const [featuredList, setFeaturedList] = useState([]);

  const { data, error, isLoading } = useGetTopAnimeQuery({
    page,
    subtype: "tv",
    filter: "bypopularity",
    rating: "pg13",
    sfw: true,
    limit: 18,
  });

  const breakpoints = useMemo(() => ({
    320: { slidesPerView: 1 },
    640: { slidesPerView: 3 },
    900: { slidesPerView: 4 },
    1200: { slidesPerView: 5 },
    1440: { slidesPerView: 7 },
  }), []);

  const maxVisibleSlides = useMemo(() => {
    const vals = Object.values(breakpoints).map(b => b.slidesPerView || 1);
    return Math.max(...vals);
  }, [breakpoints]);

  function randomUniqueSelection(arr = [], n = 3) {
    const copy = [...arr];
    if (copy.length <= n) return copy;
    for (let i = copy.length - 1; i > copy.length - 1 - n; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(copy.length - n);
  }

  useEffect(() => {
    if (data?.data) {
      const newAnime = data.data.map((a) => ({ ...a, isNew: true }));
      setAnimeList((prev) => {
        if (!prev || prev.length === 0) return newAnime;
        const ids = new Set(prev.map(p => p.mal_id));
        const filtered = newAnime.filter(n => !ids.has(n.mal_id));
        return [...prev, ...filtered];
      });
      setTimeout(() => {
        setAnimeList((prev) => prev.map((a) => ({ ...a, isNew: false })));
      }, 600);
    }
  }, [data]);

  useEffect(() => {
    if (animeList && animeList.length > 0) {
      const selection = randomUniqueSelection(animeList, 3);
      setFeaturedList(selection);
    }
  }, [animeList]);

  useEffect(() => {
    if (!animeList || animeList.length === 0) return;
    const interval = setInterval(() => {
      setFeaturedList(randomUniqueSelection(animeList, 3));
    }, 20000);
    return () => clearInterval(interval);
  }, [animeList]);

  if (isLoading && animeList.length === 0) {
    return <AnimesSkeleton />;
  }

  return (
    <div className="content">
      <div className="hero-wrapper" aria-label="Герой-слайдер с тремя случайными аниме">
        <Swiper
          modules={[Navigation, A11y, Autoplay, EffectFade]}
          spaceBetween={0}
          navigation
          autoplay={{ delay: 8000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          effect="fade"
          speed={1000}
          loop={featuredList.length > 1}
          className="hero-swiper"
          aria-live="polite"
        >
          {featuredList.length === 0 && (
            <SwiperSlide>
              <div className="hero-slide hero-slide--placeholder">
                <div className="hero-content">
                  <h2 className="hero-title">Загрузка...</h2>
                </div>
              </div>
            </SwiperSlide>
          )}

          {featuredList.map((anime) => (
            <SwiperSlide key={`hero-${anime.mal_id}`}>
              <div className="hero-slide" role="group" aria-label={`${anime.title} — герой слайда`}>
                <img
                  className="hero-bg"
                  src={anime.images?.webp?.large_image_url || anime.images?.jpg?.large_image_url}
                  alt={anime.title}
                  loading="eager"
                  decoding="async"
                />
                <div className="hero-overlay" aria-hidden="true" />
                <div className="hero-content">
                  <h2 className="hero-title">{anime.title}</h2>
                  <p className="hero-desc">
                    {anime.synopsis?.length > 10 ? anime.synopsis : (anime.description || anime.synopsis || 'Описание недоступно')}
                  </p>
                  <div className="hero-actions">
                    <Link to={`/anime/${anime.mal_id}`} className="cta-button hero-cta" aria-label={`Открыть ${anime.title}`}>
                      Подробнее
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="new-anime">
        <h2 className="section-title">Новые аниме</h2>
        {error && <p style={{ color: "var(--accent-1)" }}>Ошибка загрузки аниме</p>}

        <Swiper
          modules={[Navigation, A11y, Autoplay]}
          spaceBetween={24}
          navigation
          autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          loop={animeList.length >= maxVisibleSlides}
          loopedSlides={animeList.length}
          loopFillGroupWithBlank={true}
          watchOverflow={true}
          speed={900}
          breakpoints={breakpoints}
          aria-live="polite"
        >
          {animeList.map((anime) => (
            <SwiperSlide key={anime.mal_id} className="swiper-slide-custom">
              <Link
                to={`/anime/${anime.mal_id}`}
                style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}
                aria-label={`Перейти на страницу ${anime.title}`}
              >
                <article className={`anime-card ${anime.isNew ? "is-new" : ""}`} role="group" aria-roledescription="anime card">
                  <div className="image" aria-hidden="true">
                    {anime.isNew && <div className="badge-new">НОВОЕ</div>}
                    <img
                      loading="lazy"
                      src={anime.images.webp?.large_image_url || anime.images.jpg.large_image_url}
                      alt={anime.title}
                      className="anime-img"
                    />
                  </div>

                  <div className="info">
                    <h3 className="anime-title">{anime.title}</h3>

                    <div className="card-meta">
                      <div className="episode-count">{anime.episodes ? `${anime.episodes} эп.` : '—'}</div>
                      <div className="anime-year">{anime.year || ''}</div>
                      <div className="rating-row" aria-hidden="true">
                        <Tooltip title={`Рейтинг: ${anime.score ?? 'N/A'}`}>
                          <div>
                            <Rating
                              name="read-only"
                              value={anime.score ? anime.score / 2 : 0}
                              precision={0.1}
                              readOnly
                              size="small"
                            />
                          </div>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="main-content">
        <div className="extra-content">
          <h2 className="updates-title">Обновления на сайте</h2>
          <div className="updates">
            <div className="update-card">Новая категория: Isekai</div>
            <div className="update-card">Добавлен рейтинг просмотров</div>
            <div className="update-card">Оптимизация поиска</div>
            <div className="update-card">Рефактор UI</div>
          </div>

          <div style={{ marginTop: 20 }}>
            <Chat />
          </div>
        </div>

        <aside className="watched-anime" aria-label="История просмотренных">
          <h2 className="watched-title">История просмотренных</h2>
          <div className="watched-list">
            {[
              { title: "Восхождение героя щита", details: "7 серия (4 сезон)" },
              { title: "Благоухающий цветок расцветает", details: "7 серия" },
              { title: "Дни Сакамото", details: "18 серия" },
              { title: "Ван Пис", details: "1140 серия" },
            ].map((anime, idx) => (
              <div className="watched-item" key={idx}>
                <div className="watched-circle">{idx + 1}</div>
                <div className="watched-info">
                  <h3 className="anime-name">{anime.title}</h3>
                  <p className="anime-details">{anime.details}</p>
                </div>
                <div className="watched-options" role="button" aria-label="Опции записи"></div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
