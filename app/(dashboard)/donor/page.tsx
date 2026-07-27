"use client";

import { useAppSelector } from "../../store/hook";

export default function DonorPage() {
  const auth = useAppSelector((state) => state.auth);

  console.log("AUTH STATE:", auth);

  return (
    <pre>{JSON.stringify(auth, null, 2)}</pre>
  );
}