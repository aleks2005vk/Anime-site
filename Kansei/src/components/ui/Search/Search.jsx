// src/components/ui/Search/Search.jsx
import React, { useEffect, useState, useRef } from "react";
import { Autocomplete, TextField, CircularProgress, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLazyGetAnimesQuery } from "../../../services/JikanjsApi";
import { setKeyword, setResults } from "../../../features/searchQuerySlice";

export default function Search() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { keyword, results } = useSelector((state) => state.searchQuerySlice);
  
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [fetchSearch, { data, isLoading, error }] = useLazyGetAnimesQuery();
  const timeoutRef = useRef(null);

  // Обработчик изменения input
  const handleInputChange = (event, value) => {
    dispatch(setKeyword(value));
  };

  // Обработчик выбора аниме
  const handleAnimeSelect = (event, value) => {
    if (value && value.mal_id) {
      navigate(`/anime/${value.mal_id}`);
      dispatch(setKeyword(""));
      dispatch(setResults([]));
    }
  };

  // Запрос при изменении keyword с дебаунсингом
  useEffect(() => {
    if (!keyword || keyword.length < 3) {
      dispatch(setResults([]));
      return;
    }
    
    // Очищаем предыдущий таймаут
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Устанавливаем новый таймаут
    timeoutRef.current = setTimeout(() => {
      setPage(1);
      fetchSearch({ keyword, page: 1 });
    }, 800); // Увеличили задержку до 800мс
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [keyword, fetchSearch, dispatch]);

  useEffect(() => {
    if (data?.data) {
      if (page === 1) {
        dispatch(setResults(data.data));
      } else {
        dispatch(setResults([...results, ...data.data]));
      }
      setHasMore(data.pagination?.has_next_page || false);
    }
  }, [data, page, dispatch, results]);

  const loadMore = () => {
    if (!hasMore || isLoading || !keyword) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchSearch({ keyword, page: nextPage });
  };

  return (
    <div style={{ position: 'relative' }}>
      <Autocomplete
        freeSolo
        options={results}
        inputValue={keyword}
        onInputChange={handleInputChange}
        onChange={handleAnimeSelect}
        getOptionLabel={(option) => 
          typeof option === 'string' ? option : option.title
        }
        loading={isLoading}
        sx={{ width: 300 }}
        ListboxProps={{
          onScroll: (event) => {
            const listboxNode = event.currentTarget;
            if (listboxNode.scrollTop + listboxNode.clientHeight >= listboxNode.scrollHeight - 50) {
              loadMore();
            }
          }
        }}
        renderOption={(props, option) => (
          <Box 
            component="li" 
            {...props} 
            key={option.mal_id}
            sx={{ 
              py: 1, // Добавили вертикальные отступы
              borderBottom: '1px solid rgba(0,0,0,0.1)', // Разделитель между элементами
              '&:last-child': { borderBottom: 'none' } // Убираем разделитель у последнего элемента
            }}
          >
            {option.title} ({option.year || 'N/A'})
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Anime"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
      {error && <div style={{ color: 'red' }}>Error: {error.message}</div>}
    </div>
  );
}