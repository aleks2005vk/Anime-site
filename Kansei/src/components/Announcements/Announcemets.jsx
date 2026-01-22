import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Announcement = () => {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("https://api.jikan.moe/v4/news");
        const data = await response.json();
        setNewsList(data.data);
      } catch (error) {
        console.error("Ошибка при загрузке новостей:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="announcement">
      <h2>Новости аниме</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        navigation
        loop={newsList.length > 1}
      >
        {newsList.map((news) => (
          <SwiperSlide key={news.mal_id}>
            <div className="news-item">
              <div className="news-text">
                <h3>{news.title}</h3>
                <p>{news.excerpt}</p>
              </div>
              <div className="news-image">
                <img src={news.image_url} alt={news.title} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Announcement;
