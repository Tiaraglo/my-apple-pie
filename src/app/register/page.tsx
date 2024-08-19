import ClientFlashComponent from "@/components/ClientFlashComponents";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BASE_URL } from "@/constant";

export default function Register() {
  const registSubmit = async (formData: FormData) => {
    "use server";

    const username = formData.get("username");
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    const payload = {
      username,
      name,
      email,
      password,
    };

    type MyResponse<T> = {
      statusCode: number;
      message?: string;
      data?: T;
      error?: string;
    };

    const response = await fetch(`${BASE_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseJson: MyResponse<unknown> = await response.json();

    if (!response.ok) {
      let message = responseJson.error ?? "Something went wrong!";
      console.log("FAILED TO CREATE AN USER");

      return redirect(`/register?error=${message}`);
    }

    revalidatePath("/register");
    console.log("SUCCES");
    return redirect("/login");
  };

  return (
    <>
      <div
        className="bg-no-repeat bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url(https://wallpapercat.com/w/full/7/d/9/81531-3840x2160-desktop-4k-apple-logo-wallpaper.jpg)",
        }}
      >
        <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
          <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
            <div className="self-start hidden lg:flex flex-col  text-white">
              <img src="" className="mb-3" />
              <h1 className="mb-3 font-bold text-5xl">
                Hi Pie? Welcome to Our APPle-Pie{" "}
              </h1>
              <p className="pr-1">
                One account for everything happie! here take a look..
              </p>
            </div>
          </div>
          <div className="flex justify-center self-center  z-10">
            <div className="p-12 bg-white mx-auto rounded-2xl w-100 ">
              <div className="mb-4">
                <h3 className="flex justify-center font-semibold text-2xl text-gray-800">
                  Register
                </h3>
                <p className="text-gray-500">
                  ✨🔹Create an account, and lets buy happie!!🔹✨
                </p>
                <ClientFlashComponent />
              </div>
              <form action={registSubmit}>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                      Name
                    </label>
                    <input
                      name="name"
                      className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                      type="username"
                      placeholder="Enter an name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 tracking-wide">
                      Username
                    </label>
                    <input
                      name="username"
                      className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                      type="username"
                      placeholder="Enter your username"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                      Email
                    </label>
                    <input
                      name="email"
                      className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-grey-400"
                      type="email"
                      placeholder="mail@gmail.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                      Password
                    </label>
                    <input
                      name="password"
                      className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-grey-400"
                      type="password"
                      placeholder="Enter password"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center bg-slate-900 hover:bg-sky-900 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                    >
                      Register Now
                    </button>
                  </div>
                </div>
                <div className="mt-3 text-xs flex justify-between items-center text-gray-600">
                  <p>Have an account already?</p>
                  <Link href={"/login"}>
                    <button className="py-2 px-5 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-300">
                      Login
                    </button>
                  </Link>
                </div>
              </form>
              <div className="pt-5 text-center text-gray-400 text-xs">
                <span>
                  Copyright © 2023-2024
                  <a
                    href="https://codepen.io/uidesignhub"
                    rel=""
                    target="_blank"
                    title="Ajimon"
                    className="text-green hover:text-green-500 "
                  >
                    {" "}
                    apple-pie
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
