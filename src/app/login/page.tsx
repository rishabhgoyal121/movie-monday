'use client'
import { getRequestToken } from "@/api/users/users.api";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null | undefined>(null);
  const [error, setError] = useState<string | null | undefined>(null);
  useEffect(() => {
    const getToken = async () => {
      setLoading(true);
      const { data, message, error } = await getRequestToken();
      if (data && data.success) {
        setToken(data.request_token);
      }
      if (error && message) {
        setError(message);
      }
      setLoading(false);
    };
    getToken();
  }, []);
  return (
    <>
      <p className="text-xl font-bold">Login Page</p>
      {loading && <p>Loading...</p>}
      {token && (
        <div>
          <p>Token: {token} </p>
          <p>
            <Link
              href={`https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:3000/login/approved`}
              className="text-lg font-semibold underline"
            >
              Approve
            </Link>
          </p>
        </div>
      )}
      {error && <p>{error}</p>}
    </>
  );
}
