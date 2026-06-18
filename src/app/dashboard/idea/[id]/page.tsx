"use client";

import { useParams } from "next/navigation";
import IdeaDetail from "@/components/dashboard/IdeaDetail";

export default function IdeaDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  return <IdeaDetail id={id} />;
}
