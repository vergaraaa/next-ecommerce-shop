import Link from "next/link";
import { titleFont } from "@/config/fonts";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <h1 className={`${titleFont.className} text-4xl mb-5`}>Login</h1>

      <div className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
        />

        <label htmlFor="email">Password</label>
        <input
          type="password"
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
        />

        <button className="btn-primary">Login</button>

        {/* divisor line */}
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">OR</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link href="/register" className="btn-secondary text-center">
          Create new account
        </Link>
      </div>
    </div>
  );
}
