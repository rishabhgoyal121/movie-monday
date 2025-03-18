"use client";
import { getUserDetails } from "@/api/user/user.api";
import { useEffect, useState } from "react";
import { User } from "@/interfaces/users";
import Image from "next/image";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState<User | null | undefined>();
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const loadDetails = async () => {
      setLoading(true);
      const { data, error, message } = await getUserDetails();
      if (data) {
        setUserDetails(data);
      }
      if (error && message) {
        setError(message);
      }
      setLoading(false);
    };
    loadDetails();
  }, []);
  return (
    <>
      <p>User</p>
      {loading && <p>Loading...</p>}
      {userDetails && userDetails.name ? (
        <p>Hello {userDetails.name}</p>
      ) : (
        <p>Hello {userDetails?.username}</p>
      )}
      {userDetails &&
        userDetails.avatar &&
        userDetails.avatar.tmdb &&
        userDetails.avatar.tmdb.avatar_path && (
          <div className="w-44">
            <Image
              src={`https://image.tmdb.org/t/p/original${userDetails.avatar.tmdb.avatar_path}`}
              alt={userDetails.username}
              height={160}
              width={90}
              layout="responsive"
              className="rounded-full"
            />
          </div>
        )}
      {error && <p>{error}</p>}
    </>
  );
}
