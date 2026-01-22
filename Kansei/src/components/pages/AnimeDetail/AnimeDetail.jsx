import React, { useState } from 'react';
import { useGetAnimeQuery, useGetStaffQuery } from '../../../services/JikanjsApi';
import { useParams, useNavigate } from 'react-router-dom';
import { CircularProgress, Box, Button, Typography, Stack, Link } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import VideoPlayer from '../../ui/VideoPlayer/VideoPlayer';
import './Film.css';

export default function Film() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showStaff, setShowStaff] = useState(false); // state для раскрытия staff

  const animeQuery = useGetAnimeQuery(id);
  const staffQuery = useGetStaffQuery(id);

  if (animeQuery.isLoading || staffQuery.isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (animeQuery.error || staffQuery.error) {
    return (
      <Box p={4}>
        <Typography color="error">Ошибка загрузки</Typography>
      </Box>
    );
  }

  const anime = animeQuery.data?.data;
  const staff = Array.isArray(staffQuery?.data?.data) ? staffQuery.data.data : [];

  return (
    <Box p={3} className="film-root">
      <Box className="film-grid" sx={{ display: 'flex', gap: 3, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {/* Картинка */}
        <Box
          component="img"
          className="film-poster"
          src={anime?.images?.jpg?.image_url}
          alt={anime?.title}
          sx={{ width: { xs: '100%', sm: '40%', md: '35%' }, borderRadius: 2, objectFit: 'cover' }}
        />

        {/* Правая колонка */}
        <Box className="film-meta" sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, minWidth: { xs: '100%', sm: '55%', md: '60%' } }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            variant="outlined"
            className="film-back"
            sx={{ alignSelf: 'flex-start' }}
          >
            Назад
          </Button>

          <Typography variant="h4" className="film-title">{anime?.title}</Typography>

          <Stack spacing={0.5} className="film-meta-list">
            <Typography variant="body2"><b>Год:</b> {anime?.year || 'Неизвестно'}</Typography>
            <Typography variant="body2"><b>Длительность серии:</b> {anime?.duration || 'Неизвестно'}</Typography>
            <Typography variant="body2"><b>Эпизодов:</b> {anime?.episodes ?? 'Неизвестно'}</Typography>
            <Typography variant="body2"><b>Жанры:</b> {anime?.genres?.map(g => g.name).join(', ') || 'Неизвестно'}</Typography>
            <Typography variant="body2">
              <b>Студии:</b>{' '}
              {anime?.studios && anime.studios.length > 0 ? (
                anime.studios.map((s, idx) => (
                  <React.Fragment key={s.mal_id}>
                    <Link href={s.url} target="_blank" rel="noopener noreferrer" underline="hover" color="inherit">
                      {s.name}
                    </Link>
                    {idx < anime.studios.length - 1 ? ', ' : ''}
                  </React.Fragment>
                ))
              ) : 'Неизвестно'}
            </Typography>

            {/* Staff с кнопкой More/Less */}
            <Typography variant="body2">
              <b>Staff:</b>{' '}
              {staff.length ? (
                <>
                  {showStaff
                    ? staff.map(s => s.person?.name || s.name).join(', ')
                    : staff.slice(0, 5).map(s => s.person?.name || s.name).join(', ')
                  }
                  {staff.length > 5 && (
                    <Button
                      size="small"
                      onClick={() => setShowStaff(!showStaff)}
                      sx={{ ml: 1, minWidth: 'auto', p: 0, textTransform: 'none' }}
                    >
                      {showStaff ? 'Less' : `More (${staff.length - 5})`}
                    </Button>
                  )}
                </>
              ) : 'Неизвестно'}
            </Typography>

            <Typography variant="body2"><b>Тип:</b> {anime?.type || 'Неизвестно'}</Typography>
            <Typography variant="body2"><b>Рейтинг:</b> {anime?.score ?? 'N/A'}</Typography>
          </Stack>

          <Box>
            <Typography variant="body1" className="film-synopsis" sx={{ mt: 1 }}>
              {anime?.synopsis || 'Нет описания'}
            </Typography>

            <Box className="film-player">
              <VideoPlayer />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
