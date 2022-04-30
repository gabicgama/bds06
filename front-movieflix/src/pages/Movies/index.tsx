import "./styles.css";
import { useCallback, useEffect, useState } from "react";
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "util/requests";
import { SpringPage } from "types/vendor/spring";
import { Link } from "react-router-dom";
import { Movie } from "types/movie";
import Pagination from "components/Pagination";
import MovieFilter, { MovieFilterData } from "components/MovieFilter";

type ControlComponentsData = {
  activePage: number;
  filterData: MovieFilterData;
};

const Movies = () => {
  const [page, setPage] = useState<SpringPage<Movie>>();

  const [controlComponentsData, setcontrolComponentsData] =
    useState<ControlComponentsData>({
      activePage: 0,
      filterData: { genre: null },
    });

  const handlePageChange = (pageNumber: number) => {
    setcontrolComponentsData({
      activePage: pageNumber,
      filterData: controlComponentsData.filterData,
    });
  };

  const handleSubmitFilter = (data: MovieFilterData) => {
    setcontrolComponentsData({
      activePage: 0,
      filterData: data,
    });
  };

  const getMovies = useCallback(() => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: "/movies",
      withCredentials: true,
      params: {
        page: controlComponentsData.activePage,
        size: 4,
        genreId: controlComponentsData.filterData.genre?.id,
      },
    };
    requestBackend(config).then((response) => {
      setPage(response.data);
    });
  }, [controlComponentsData]);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  return (
    <div className="container my-4 movie-container">
      <MovieFilter onSubmitFilter={handleSubmitFilter} />
      <div className="row">
        {page?.content.map((movie) => (
          <div className="col-sm-6 col-lg-4 col-xl-3" key={movie.id}>
            <div className="base-card movie-card-container">
              <Link to={"/movies/" + movie.id.toString()}>
                <div className="movie-card-top-container">
                  <img src={movie.imgUrl} alt={movie.title} />
                </div>
              </Link>
              <div className="movie-card-bottom-container">
                <h1>{movie.title}</h1>
                <h2>{movie.year}</h2>
                <p>{movie.subTitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="row movie-pagination-container">
        <Pagination
          pageCount={page ? page.totalPages : 0}
          range={3}
          onChange={handlePageChange}
          forcePage={page?.number}
        />
      </div>
    </div>
  );
};

export default Movies;
