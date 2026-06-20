import HeroBanner from '../components/common/HeroBanner';
import ContentRow from '../components/common/ContentRow';
import ContinueWatchingRow from '../components/common/ContinueWatchingRow';
import useFetch from '../hooks/useFetch';
import {
  getTrendingAll,
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
  getPopularTV,
  getTopRatedTV,
  getOnTheAirTV,
} from '../api/tmdb';

export default function Home() {
  const { data: trending } = useFetch(() => getTrendingAll('day'), []);
  const heroItems = (trending?.results || []).filter((item) => item.backdrop_path);

  return (
    <div className="pb-16">
      <HeroBanner items={heroItems} />

      <div className="flex flex-col gap-10 mt-10">
        <ContinueWatchingRow />

        <ContentRow
          title="Trending This Week"
          fetcher={() => getTrendingMovies('week')}
          mediaType="movie"
          seeAllHref="/movies?sort=popularity.desc"
        />

        <ContentRow
          title="Popular on Viralis"
          fetcher={() => getPopularTV()}
          mediaType="tv"
          seeAllHref="/tv?sort=popularity.desc"
        />

        <ContentRow
          title="Now Playing in Theaters"
          fetcher={() => getNowPlayingMovies()}
          mediaType="movie"
          seeAllHref="/movies?sort=primary_release_date.desc"
        />

        <ContentRow
          title="Top Rated Movies"
          fetcher={() => getTopRatedMovies()}
          mediaType="movie"
          seeAllHref="/movies?sort=vote_average.desc"
        />

        <ContentRow
          title="Critically Acclaimed Series"
          fetcher={() => getTopRatedTV()}
          mediaType="tv"
          seeAllHref="/tv?sort=vote_average.desc"
        />

        <ContentRow
          title="Popular Movies"
          fetcher={() => getPopularMovies()}
          mediaType="movie"
          seeAllHref="/movies?sort=popularity.desc"
        />

        <ContentRow title="On The Air" fetcher={() => getOnTheAirTV()} mediaType="tv" seeAllHref="/tv" />
      </div>
    </div>
  );
}
