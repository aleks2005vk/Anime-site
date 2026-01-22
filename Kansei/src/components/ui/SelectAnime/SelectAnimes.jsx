import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  ClickAwayListener,
  Grid
} from "@mui/material";

// Сокращенный список популярных жанров
const POPULAR_GENRES = [
  "Action", "Adventure", "Comedy", "Drama", "Fantasy", 
  "Horror", "Mystery", "Romance", "Sci-Fi", "Slice of Life"
];

// ТОЛЬКО конкретные года, которые поддерживает API
const YEARS = ["2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018"];

const SORTS = ["Rating", "Alphabet", "Episode Count", "Year", "Date Added"];

// mapping UI sort labels -> jikan API order_by values
const SORT_MAP = {
  Rating: "score",
  Alphabet: "title",
  "Episode Count": "episodes",
  Year: "year",
  "Date Added": "date",
};

export default function SelectAnimes({ genresList, setFilters }) {
  const [showPopup, setShowPopup] = useState(false);
  const [localFilters, setLocalFilters] = useState({
    genreid: "",
    year: "",
    sort: ""
  });
  const [sticky, setSticky] = useState(false);
  const buttonRef = useRef(null);

  // Фильтруем жанры - оставляем только популярные
  const filteredGenres = (genresList || []).filter(genre => 
    POPULAR_GENRES.includes(genre.name)
  );

  useEffect(() => {
    const handleScroll = () => {
      if (!buttonRef.current) return;
      const buttonBottom = buttonRef.current.getBoundingClientRect().bottom;
      setSticky(buttonBottom < 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const togglePopup = () => setShowPopup((s) => !s);

  const applyFilters = () => {
    // Преобразуем выбранные значения в формат, понятный API
    const apiFilters = {
      genreid: localFilters.genreid,
      year: localFilters.year,
      order: localFilters.sort ? SORT_MAP[localFilters.sort] : ""
    };
    
    console.log("Applying filters:", apiFilters);
    setFilters(apiFilters);
    setShowPopup(false);
  };

  const handleFilterChange = (filterType, value) => {
    setLocalFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const renderOptionsGrid = (options, filterType) => (
    <Grid container spacing={1}>
      {options.map((option) => {
        const val = typeof option === "object" ? String(option.mal_id) : String(option);
        const label = typeof option === "object" ? option.name : option;
        return (
          <Grid key={val}>
            <FormControlLabel
              value={val}
              control={<Radio sx={{ color: "#ff6600", "&.Mui-checked": { color: "#ffaa33" } }} />}
              label={label}
              checked={localFilters[filterType] === val}
              onChange={() => handleFilterChange(filterType, val)}
            />
          </Grid>
        );
      })}
      <Grid key="none">
        <FormControlLabel
          value=""
          control={<Radio sx={{ color: "#ff6600", "&.Mui-checked": { color: "#ffaa33" } }} />}
          label="None"
          checked={!localFilters[filterType]}
          onChange={() => handleFilterChange(filterType, "")}
        />
      </Grid>
    </Grid>
  );

  return (
    <Box sx={{ position: "relative", display: "flex", justifyContent: "flex-start", mb: 2 }}>
      <Button
        ref={buttonRef}
        variant="contained"
        sx={{ width: 140, height: 36, backgroundColor: "#ff6600", "&:hover": { backgroundColor: "#ffaa33" } }}
        onClick={togglePopup}
      >
        Select Categories
      </Button>

      {showPopup && (
        <ClickAwayListener onClickAway={() => setShowPopup(false)}>
          <Box
            sx={{
              position: sticky ? "fixed" : "absolute",
              top: sticky ? 10 : "auto",
              left: sticky ? 10 : 0,
              mt: sticky ? 0 : 1,
              width: 350,
              bgcolor: "rgba(28,28,28,0.95)",
              borderRadius: 2,
              p: 2,
              boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
              zIndex: 1000,
            }}
          >
            <FormControl sx={{ mb: 2 }}>
              <FormLabel sx={{ color: "#fff" }}>Genre</FormLabel>
              <RadioGroup>
                {renderOptionsGrid(filteredGenres, "genreid")}
              </RadioGroup>
            </FormControl>

            <FormControl sx={{ mb: 2 }}>
              <FormLabel sx={{ color: "#fff" }}>Year</FormLabel>
              <RadioGroup>
                {renderOptionsGrid(YEARS, "year")}
              </RadioGroup>
            </FormControl>

            <FormControl sx={{ mb: 2 }}>
              <FormLabel sx={{ color: "#fff" }}>Sort</FormLabel>
              <RadioGroup>
                {renderOptionsGrid(SORTS, "sort")}
              </RadioGroup>
            </FormControl>

            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#ff6600", "&:hover": { backgroundColor: "#ffaa33" } }}
                onClick={applyFilters}
              >
                Apply
              </Button>
            </Box>
          </Box>
        </ClickAwayListener>
      )}
    </Box>
  );
}