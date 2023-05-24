import Image from "next/image";
import Link from "next/link";

export default function WebNavbar() {
  return (
    <>
      <nav className="flex items-center justify-between h-[60px] px-4 md:px-16 lg:px-24 bg-[#181818]">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.jpg"
            alt="Job Board Logo"
            style={{ objectFit: "cover" }}
            width={48}
            height={48}
            className="rounded-full h-12"
          />
          <h2 className="text-white font-black ml-1.5 text-2xl md:text-3xl lg:text-3xl">
            Jobs
          </h2>
        </Link>
        <div className="flex items-center my-3">
          <Link
            href="/talent-profile"
            className="bg-[#00E7FF] rounded-md mr-3 min-w-fit px-2 py-1 md:px-3 md:py-1 lg:px-3 lg:py-1 md:text-2xl lg:text-2xl"
          >
            Account
          </Link>
          <Link
            href="/signin"
            className="bg-[#FF6464] rounded-md text-gray-900 min-w-fit px-2 py-1 md:px-3 md:py-1 lg:px-3 lg:py-1 md:text-2xl lg:text-2xl"
          >
            Log in
          </Link>
        </div>
      </nav>
      <div className="border-[#292828] border-b-4"></div>
    </>
  );
}
