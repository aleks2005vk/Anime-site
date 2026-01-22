import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Tooltip from "@mui/material/Tooltip";
import { useLazyGetAnimesQuery, useGetGenresQuery } from "../../../services/JikanjsApi";
import "./AnimeCatalog.css";
import AnimesSkeleton from "./CardsSkeleton";
import SelectAnimes from "../../ui/SelectAnime/SelectAnimes";

export default function AnimeListTop() {
  const [page, setPage] = useState(1);
  const [animeList, setAnimeList] = useState([]);
  const [filters, setFilters] = useState({ genreid: "", year: "", order: "" });

  const { data: genresData } = useGetGenresQuery();
  const [fetchAnimes, { data, isLoading, isFetching, error }] = useLazyGetAnimesQuery();

  const buildParams = (filtersObj, pageNumber) => {
    const params = { page: pageNumber || 1 };
    if (filtersObj.genreid) params.genres = filtersObj.genreid;
    if (filtersObj.year) params.year = filtersObj.year;
    if (filtersObj.order) params.order_by = filtersObj.order;
    return params;
  };

  useEffect(() => {
    const params = buildParams(filters, page);
    fetchAnimes(params);
  }, [filters, page, fetchAnimes]);

  useEffect(() => {
    if (!data?.data) return;
    if (page === 1) {
      setAnimeList(data.data);
    } else {
      setAnimeList(prev => {
        const existingIds = new Set(prev.map(p => p.mal_id));
        const newItems = data.data.filter(item => !existingIds.has(item.mal_id));
        return [...prev, ...newItems];
      });
    }
  }, [data, page]);

  const onFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
    setAnimeList([]);
  };

  const handleLoadMore = () => setPage(p => p + 1);

  if (error) return <p style={{ color: "red", textAlign: "center" }}>Ошибка загрузки</p>;
  if (isLoading && animeList.length === 0) return <AnimesSkeleton rows={3} cardsPerRow={8} />;

  return (
    <div className="catalog-content">
      <h1 className="catalog-title">Каталог аниме</h1>

      <SelectAnimes 
        genresList={genresData?.data} 
        filters={filters} 
        setFilters={onFiltersChange} 
      />

      <div className="card-grid">
        {animeList.map((anime) => {
          const largeImg = anime.images?.webp?.large_image_url || anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url;
          return (
            <Link
              to={`/anime/${anime.mal_id}`}
              key={anime.mal_id}
              className="card"
              aria-label={`Перейти к ${anime.title}`}
            >
              <div className="card-media">
                <img
                  className="anime-image"
                  src={largeImg}
                  alt={anime.title}
                  loading="lazy"
                  decoding="async"
                />
                <div className="rating-overlay">
                  <Tooltip title={`Рейтинг: ${anime.score ?? "N/A"}`}>
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

                {anime.rank && <div className="badge-rank">#{anime.rank}</div>}
              </div>

              <div className="info">
                <h2 className="card-title">{anime.title}</h2>

                <div className="card-meta">
                  <div className="meta-left">
                    <div className="meta-row">
                      <span className="meta-label">Эпизоды:</span>
                      <span className="meta-value">{anime.episodes ?? "—"}</span>
                    </div>
                    <div className="meta-row">
                      <span className="meta-label">Год:</span>
                      <span className="meta-value">{anime.year ?? "—"}</span>
                    </div>
                  </div>

                  <div className="meta-right">
                    <button className="watch">Смотреть</button>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {data?.pagination?.has_next_page && (
        <div className="load-more-wrap">
          <button 
            onClick={handleLoadMore}
            className="watch load-more"
            disabled={isFetching}
          >
            {isFetching ? "Загрузка..." : "Загрузить ещё"}
          </button>
        </div>
      )}
    </div>
  );
}
