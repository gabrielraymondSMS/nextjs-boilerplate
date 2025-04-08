import Sidebar from "@/components/common/layout/Sidebar";
import Navbar from "@/components/common/layout/Navbar";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const cookieStore = await cookies();

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-white">
          <div className="relative h-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
