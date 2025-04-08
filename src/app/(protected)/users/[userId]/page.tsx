import EditUser from "@/components/features/user-management/EditUser";
import { decryptData } from "@/lib/utils/crypto";
import { redirect } from "next/navigation";
import React from "react";

export default async function EditDetailPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  // Decrypt userId
  const decrypted = decryptData(userId);

  // Jika decryptData mengembalikan null atau undefined, redirect ke 404
  if (!decrypted) {
    redirect("/users");
  }

  // Render EditUser component
  return <EditUser userId={decrypted} />;
}
