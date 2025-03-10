"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDNmN2FiYTM0OTFhYjU4ZTdmNjRlMmMzMTQ1YjA2MSIsIm5iZiI6MTc0MTM1ODYxNy4wNCwic3ViIjoiNjdjYjA2MTk4MWZiYjEyNTM5Y2I2Yzk4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.cnt2SO-eBt71o4iBF5c26AwHDXwJF4ND5ZhQGaQbnJM",
  },
};
export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [loading, setLoading] = useState(true);
  const [actorData, setActorData] = useState({
    adult: false,
    also_known_as: [" Mikaela Madison Rosberg", "미키 매디슨", "مایکی مدیسون"],
    biography:
      "Mikaela Madison Rosberg (born March 25, 1999), known professionally as Mikey Madison, is an American actress. She began her career acting in short films and received recognition for her role as a sullen teenager in the FX comedy series Better Things (2016–2022). Madison then played Susan Atkins in Quentin Tarantino's Once Upon a Time in Hollywood (2019) and Amber Freeman in Scream (2022).\n\nFor her breakthrough role as a sex worker in Sean Baker's film Anora (2024), Madison earned several accolades, including the BAFTA and Academy Award for Best Actress.\n\nDescription above from the Wikipedia article Mikey Madison, licensed under CC-BY-SA, full list of contributors on Wikipedia.",
    birthday: "1999-03-25",
    deathday: null,
    gender: 1,
    homepage: null,
    id: 1640439,
    imdb_id: "nm5700898",
    known_for_department: "Acting",
    name: "Mikey Madison",
    place_of_birth: "Los Angeles, California, USA",
    popularity: 37.859,
    profile_path: "/drny5M0foZpJfaee6Kh0L4Ox8xg.jpg",
  });
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const getProps = async () => {
      const { id } = await params;
      const actorsUrl = `https://api.themoviedb.org/3/person/${id}?language=en-US`;
      axios
        .request({ ...options, url: actorsUrl })
        .then((res) => {
          console.log(res.data);
          setActorData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("err", err);
          setLoading(false);
          setError(err.message);
        });
      return id;

    }
    getProps();
  }, [params]);

  return (
    <>
      <h2>Actor</h2>
      {loading && <p>Loading...</p>}
      {!loading && <p>{actorData.name}</p>}
      {!loading && <p>{actorData.biography}</p>}
      {!loading && <Image src=''/>}
      {error && <p>{error}</p>}
    </>
  );
}
