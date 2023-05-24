import Image from "next/image";
import Link from "next/link";
import axios from "axios";

export default function ClientNavbar() {
  const handleSignOut = async () => {
    try {
      await axios.get("/api/auth/signout", {});

      router.push("/");
    } catch (err) {
      console.log(`CATCH ${err}`);
    }
  };

  return (
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
          href="https://api.whatsapp.com/send?phone=251909090909"
          className="px-5 py-1.5 bg-[#FF6464] text-white font-bold text-lg rounded-lg mr-2"
        >
          Chat
        </Link>
        <Link
          href="/client-dashboard/talents"
          className="mr-2 text-xl md:text-2xl lg:text-2xl text-gray-700"
        >
          Talents
        </Link>
        <button
          onClick={handleSignOut}
          className="mr-1 text-xl md:text-2xl lg:text-2xl text-gray-700"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
