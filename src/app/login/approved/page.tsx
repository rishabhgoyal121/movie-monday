"use client";
import { getSessionId } from "@/api/login/login.api";
import { LocalStorageService } from "@/services/local-storage-service";
import Link from "next/link";
import { useEffect, useState } from "react";
import { use } from "react";

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | null | undefined }>;
}) {
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null | undefined>(null);
  const [error, setError] = useState<string | null | undefined>(null);
  const { request_token, approved } = use(searchParams);

  //   const request_token = query && query.request_token;
  //   const approved = query && query.approved;

  useEffect(() => {
    const loadSessionId = async () => {
      setLoading(true);
      const { data, error, message } = await getSessionId(request_token);
      if (data && data.success) {
        setSessionId(data.session_id);
        LocalStorageService.set("session_id", data.session_id);
      }
      if (error && message) {
        setError(message);
      }
      setLoading(false);
    };
    if (approved) {
      loadSessionId();
    }
  }, [request_token, approved]);
  return (
    <>
      {loading && <p>Loading...</p>}
      {sessionId && (
        <div>
          <p>Session ID: {sessionId} </p>
          <Link href={'/user'} className="text-lg font-semibold underline">Go to account</Link>
        </div>
      )}
      {!approved && (
        <p>
          Request token not approved. Please generate a new token on login page
          and approve again.
        </p>
      )}
      {error && <p>{error}</p>}
    </>
  );
}
