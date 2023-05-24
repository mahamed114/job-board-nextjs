import Image from "next/image";
import Link from "next/link";

export default function WebNavbar({ logoutHandler }) {
  return (
    <>
      <nav className="flex items-center justify-between h-[70px] px-4 md:px-12 bg-white border-[#f3f3f3] border-b-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.jpg"
            alt="Job Board Logo"
            style={{ objectFit: "cover" }}
            width={48}
            height={48}
            className="rounded-full h-12"
          />
          <h2 className="font-black ml-1.5 text-2xl md:text-3xl lg:text-3xl">
            Jobs
          </h2>
        </Link>
        <div className="flex items-center my-3">
          <Link
            href="/"
            className="mr-3 text-xl md:text-2xl lg:text-2xl text-gray-900"
          >
            Browse
          </Link>
          <button
            onClick={logoutHandler}
            className="mr-1 text-xl md:text-2xl lg:text-2xl text-[#FF6464]"
          >
            Logout
          </button>
        </div>
      </nav>
      <div className="border-[#b1afaf] border-b-4"></div>
    </>
  );
}
