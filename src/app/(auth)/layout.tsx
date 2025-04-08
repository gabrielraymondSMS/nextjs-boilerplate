import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex w-full h-dvh max-w-[1440px] mx-auto max-h-[815px]">
        <div className="w-[462px] min-w-[462px] p-16 flex flex-col justify-center">
          {children}
        </div>
        <div className="w-[calc(100vw-462px)] ">
          <div className="p-3.5 w-full h-full">
            <div className="relative w-full h-full rounded">
              <Image
                src="/assets/images/auth.jpg"
                alt="Hero Image"
                fill
                className="object-cover rounded-3xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
