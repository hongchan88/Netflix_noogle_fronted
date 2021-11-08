import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { useForm } from "react-hook-form";

const MOVIE_BY_DIRECTOR = gql`
  query Query($director: String, $limit: Int) {
    directors(where: { director: $director }) {
      title(options: { limit: $limit }) {
        Title
        release {
          release_year
        }
        country {
          country
        }
        director {
          director
        }
      }
    }
  }
`;

const MovieByDirector = ({ query }) => {
  console.log(query);
  const {
    data,
    loading,

    refetch,
  } = useQuery(MOVIE_BY_DIRECTOR, {
    variables: {
      director: query?.title,
      limit: parseInt(query?.limit),
    },
  });
  console.log(data);
  return (
    <div className={styles.grid}>
      {loading
        ? "Loading..."
        : data?.directors?.map((movie) => {
            return (
              <a href="https://nextjs.org/docs" className={styles.card}>
                <h2>{movie.title.Title}</h2>
                <p>{movie.title.director.director}</p>
                <p>{movie.title.release.release_year}</p>
                <p>{movie.title.country.country}</p>
              </a>
            );
          })}
    </div>
  );
};

export default MovieByDirector;
