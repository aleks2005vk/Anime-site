	import { TOP_LISTS } from "../constants";

	export default function useMoviesQuery() {
		const fetchMovies = async (subtype = "airing", limit = 10) => {
			const top = TOP_LISTS.find(t => t.subtype === subtype);
			const endpoint = top
				? `https://api.jikan.moe/v4/top/anime?filter=${top.subtype}&limit=${limit}`
				: `https://api.jikan.moe/v4/top/anime?limit=${limit}`;

			const response = await fetch(endpoint);
			if (!response.ok) throw new Error("Ошибка запроса");
			return response.json(); // Jikan возвращает объект с полем data
		};

		return { fetchMovies };
	}
