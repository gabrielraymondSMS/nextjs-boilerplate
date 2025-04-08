import EditLead from "@/components/features/leads/EditLead";
import { decryptData } from "@/lib/utils/crypto";
import { redirect } from "next/navigation";

export default async function EditDetailLeadPage({
  params,
}: {
  params: Promise<{ leadId: string }>;
}) {
    const { leadId } = await params;

  // Decrypt userId
    const decrypted = decryptData(leadId);


  // Jika decryptData mengembalikan null atau undefined, redirect ke 404
    if (!decrypted) {
      redirect("/leads");
    }

  // Render EditUser component
  return <EditLead leadId={decrypted} />;
}
