"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function VerifyEmailPage() {
  const { userId, token } = useParams<{
    userId: string;
    token: string;
  }>();

  const router = useRouter();

  const [status, setStatus] = useState<
    "loading" | "success" | "error"
  >("loading");

  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    if (!userId || !token) return;

    const verifyEmail = async () => {
      try {
        await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/verify-email/${userId}/${token}/`
        );

        setStatus("success");
        setMessage("Your email has been verified successfully.");

        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } catch (error) {
        setStatus("error");
        setMessage(
          "Verification link is invalid or has expired."
        );
      }
    };

    verifyEmail();
  }, [userId, token, router]);

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md rounded-xl border bg-white p-8 text-center shadow">
        <h1 className="mb-4 text-2xl font-bold">
          Email Verification
        </h1>

        <p>{message}</p>

        {status === "loading" && (
          <div className="mt-6">Loading...</div>
        )}

        {status === "success" && (
          <div className="mt-6 text-green-600">
            Redirecting to login...
          </div>
        )}

        {status === "error" && (
          <button
            className="mt-6 rounded bg-blue-600 px-4 py-2 text-white"
            onClick={() => router.push("/login")}
          >
            Go to Login
          </button>
        )}
      </div>
    </main>
  );
}