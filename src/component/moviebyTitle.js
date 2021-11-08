import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { useForm } from "react-hook-form";

const MOVIE_BY_TITLE = gql`
  query Query($title: String!, $limit: Int) {
    titles(where: { Title: $title }, options: { limit: $limit }) {
      Title
      director {
        director
      }
      release {
        release_year
      }
      country {
        country
      }
    }
  }
`;

const MoviebyTitle = ({ query }) => {
  console.log(query);
  const {
    data: byTitleData,
    loading: titleLoading,

    refetch: titleRefetch,
  } = useQuery(MOVIE_BY_TITLE, {
    variables: {
      title: query?.title,
      limit: parseInt(query?.limit),
    },
  });
  return (
    <div className={styles.grid}>
      {titleLoading
        ? "Loading..."
        : byTitleData?.titles?.map((movie) => {
            return (
              <a href="https://nextjs.org/docs" className={styles.card}>
                <h2>{movie.Title}</h2>
                <p>{movie.director.director}</p>
                <p>{movie.release.release_year}</p>
                <p>{movie.country.country}</p>
              </a>
            );
          })}
    </div>
  );
};

export default MoviebyTitle;
