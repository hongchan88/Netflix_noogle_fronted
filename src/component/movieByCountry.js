import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { useForm } from "react-hook-form";

const MOVIE_BY_COUNTRY = gql`
  query Query($country: String, $limit: Int) {
    countries(where: { country: $country }) {
      title(options: { limit: $limit }) {
        Title
        release {
          release_year
        }
        director {
          director
        }
        country {
          country
        }
      }
    }
  }
`;

const MovieByCountry = ({ query }) => {
  console.log(query);
  const {
    data,
    loading,

    refetch,
  } = useQuery(MOVIE_BY_COUNTRY, {
    variables: {
      country: query?.title,
      limit: parseInt(query?.limit),
    },
  });
  console.log(data);
  return (
    <div className={styles.grid}>
      {loading
        ? "Loading..."
        : data?.countries.length === 0
        ? "No result / Please check your spelling or search option"
        : data?.countries[0]?.title.map((movie) => {
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

export default MovieByCountry;
