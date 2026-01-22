// constants.js

// Типы
export const TYPE = {
  ANIME: "anime",
  MANGA: "manga",
  PERSON: "person",
  CHARACTER: "character",
  USER: "user",
  CLUB: "club"
};

// Сезоны
export const SEASON = {
  WINTER: "winter",
  SPRING: "spring",
  SUMMER: "summer",
  FALL: "fall"
};

// Дни недели для расписания
export const DAY = {
  MONDAY: "monday",
  TUESDAY: "tuesday",
  WEDNESDAY: "wednesday",
  THURSDAY: "thursday",
  FRIDAY: "friday",
  SATURDAY: "saturday",
  SUNDAY: "sunday",
  OTHER: "other" // если аниме выходит нерегулярно
};

// Подтипы (для loadTop)
export const SUBTYPE = {
  AIRING: "airing",
  UPCOMING: "upcoming",
  TV: "tv",
  MOVIE: "movie",
  OVA: "ova",
  SPECIAL: "special",
  BYPOPULARITY: "bypopularity",
  FAVORITE: "favorite"
};

// Периоды для loadMeta
export const META_PERIOD = {
  TODAY: "today",
  WEEK: "weekly",
  MONTH: "monthly"
};
export const RATING = {
  G: "g",
  PG: "pg",
  PG13: "pg13",
  R17: "r17",
  R: "r",
  RX: "rx"
};
// Списки топ-аниме
export const TOP_LISTS = [
  { title: "Top Airing", subtype: "airing" },
  { title: "Top Upcoming", subtype: "upcoming" },
  { title: "Top TV", subtype: "tv" },
  { title: "Top Movies", subtype: "movie" }
];

// Списки жанров
export const GENRE_LISTS = [
  { id: 1, name: "Action" },
  { id: 2, name: "Adventure" },
  { id: 3, name: "Comedy" },
  { id: 4, name: "Drama" },
  { id: 5, name: "Fantasy" }
];
export const ALL_ANIME = {
  key: "all",
  title: "Все аниме",
  type: "anime",   // основной тип
  endpoint: "anime" // сюда можно подставить API endpoint для получения всех аниме
};
export const FILTER_GENRES = {
  "Приключения": "Adventure",
  "Боевик": "Action",
  "Комедия": "Comedy",
  "Повседневность": "Slice of Life",
  "Романтика": "Romance",
  "Драма": "Drama",
  "Фантастика": "Fantasy",
  "Фэнтези": "Fantasy",
  "Мистика": "Mystery",
  "Детектив": "Detective",
  "Триллер": "Thriller",
  "Психология": "Psychological"
};

export const FILTER_TYPES = {
  "Боевые искусства": "Martial Arts",
  "Вампиры": "Vampire",
  "Военное": "Military",
  "Демоны": "Demon",
  "Игры": "Game",
  "История": "Historical",
  "Космос": "Space",
  "Магия": "Magic",
  "Меха": "Mecha",
  "Музыка": "Music",
  "Пародия": "Parody",
  "Полиция": "Police",
  "Самураи": "Samurai",
  "Сёдзё": "Shoujo",
  "Сёнен": "Shounen",
  "Спорт": "Sports",
  "Суперсила": "Super Power",
  "Ужасы": "Horror",
  "Школа": "School"
};

export const FILTER_SORTS = {
  "По рейтингу": "score",
  "По алфавиту": "title",
  "По кол-ву серий": "episodes",
  "По году выхода": "year",
  "По дате добавл.": "date"
};