import React from 'react'
import { Link } from 'react-router-dom'

export default function MovieCard(anime) {
  return (
	          <Link to={`/movie/${anime.mal_id}`} key={anime.mal_id} className="card">
            <img src={anime.images.jpg.image_url} alt={anime.title} className="anime-image" />
            <div className="info">
              <h2>{anime.title}</h2>
              <button className="watch">Смотреть</button>
            </div>
          </Link>
  )
}
