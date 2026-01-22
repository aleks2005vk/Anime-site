import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Animes from "./pages/AnimePage/Animes";
import AnimeDetail from "./pages/AnimeDetail/AnimeDetail";
import Layouts from "./Layouts";

import TopAnimePage from "./pages/animes/animes";
import GenreAnimePage from "./pages/GenreAnimePage/GenreAnimePage";

import { TOP_LISTS, GENRE_LISTS, ALL_ANIME } from "../constants"; 
import Home from "./pages/home/home";


function App() {
  // создаём динамические маршруты для TOP_LISTS
  const topRoutes = TOP_LISTS.map((top) => ({
    path: `/top/${top.key}`,
    element: <TopAnimePage topKey={top.key} title={top.title} endpoint={top.endpoint} />,
  }));

  // создаём динамические маршруты для GENRE_LISTS
  const genreRoutes = GENRE_LISTS.map((genre) => ({
    path: `/genre/${genre.key}`,
    element: <GenreAnimePage genreKey={genre.key} title={genre.title} endpoint={genre.endpoint} />,
  }));

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layouts />,
      children: [
		{
			path: "/",
			element: <Home />,
		},
        {
          path: "/animes",
          element: <Animes title={ALL_ANIME.title} type={ALL_ANIME.type} endpoint={ALL_ANIME.endpoint} />,
        },
        {
          path: "/anime/:id",
          element: <AnimeDetail />,
        },
        ...topRoutes,   // вставляем динамические маршруты для топов
        ...genreRoutes, // вставляем динамические маршруты для жанров
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
