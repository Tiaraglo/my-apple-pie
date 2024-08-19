import Link from "next/link";
import { loginHandler } from "./action";

export default function Login() {
  return (
    <section
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url(https://images8.alphacoders.com/366/366170.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <form
        action={loginHandler}
        method="POST"
        className="bg-white flex rounded-2xl shadow-lg max-w-3xl p-8 md:p-12 items-center"
      >
        <div className="md:w-auto px-8 md:px-16">
          <h2 className="font-semibold text-4xl text-gray-900">Sign In</h2>
          <p className="text-sm mt-2 text-gray-600">
            One account for everything that happens. Hello!
          </p>
          <div className="flex flex-col gap-4 mt-6">
            <input
              className="p-3 rounded-lg border border-gray-300 focus:border-gray-500 focus:ring-0 outline-none transition duration-200 text-base"
              type="email"
              name="email"
              placeholder="Email Address"
              required
            />
            <div className="relative">
              <input
                className="p-3 rounded-lg border border-gray-300 w-full focus:border-gray-500 focus:ring-0 outline-none transition duration-200 text-base"
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </div>
            <button className="bg-gray-900 rounded-lg text-white py-3 hover:bg-gray-800 transition duration-300 text-lg">
              Sign In
            </button>
          </div>
          <div className="mt-6 grid grid-cols-3 items-center text-gray-950">
            <hr className="border-gray-300" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-300" />
          </div>
          <button className="bg-gray-500 text-white py-1 w-full rounded-full mt-5 flex items-center justify-center hover:bg-gray-800 transition duration-300">
            <img src="/assets/icon.svg" alt="Appie icon" className="h-12" />
            Sign in with Appie
          </button>
          <div className="mt-3 text-xs flex justify-between items-center text-gray-600">
            <p>Do not have an account?</p>
            <Link href="/register">
              <button className="py-2 px-5 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-300">
                Register
              </button>
            </Link>
          </div>
        </div>
        <div className="md:block hidden w-1/2 relative">
          <img
            className="rounded-2xl"
            src="https://i.pinimg.com/originals/cb/d3/08/cbd308527fd78df4529ab6b9b7583eda.png"
            alt="Login"
          />
        </div>
      </form>
    </section>
  );
}
