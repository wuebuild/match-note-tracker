"use client"
import { logIn } from "@/service/authService";
import { providerMap } from "@/src/lib/auth";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SignInPage() {

  const [ credentials, setCredentials ] = useState({
    email: '',
    password: ''
  })
  
  useEffect(() => {
    const session = localStorage.getItem('mgm_access_token')
    if (session) { window.location.replace('/') }
  }, []);

  const submitCredentials = async (e:any, provider:any) => {
    console.log('here provider', provider)
    e.preventDefault();
    await logIn({
      email: credentials ? credentials.email : '',
      password: credentials ? credentials.password : ''
    })
  }

  return (
    <div className="flex overflow-hidden relative w-full h-full">
      <div
        aria-label="Slate cover background"
        className="absolute bg-[#035226] left-0 top-0 z-10 flex h-[275%] w-[150%] translate-x-[-70%] translate-y-[-28%] rotate-[22deg] items-center md:translate-y-[-15%] md:rotate-[11deg]"
      ></div>
      <div className="h-dvh z-20 flex w-full items-center justify-center md:ml-[15%] md:w-[22rem]">
        <div className="flex flex-col justify-center items-center w-80 text-xl">
          <h2 className="flex items-center mb-4 space-x-2 text-3xl font-light text-zinc-600">
            <Image className="rounded-sm" src="/logo_.png" width={30} height={30} alt={"logo"} />
            <span className="text-4xl font-medium text-white">Match Journal</span>
          </h2>
          <div className="flex flex-col gap-2 p-6 m-8 w-full bg-white rounded shadow-lg">
            {/* credentials index 0 */}
            <form
                className="[&>div]:last-of-type:hidden"
                onSubmit={async (e) => {
                  submitCredentials(e, providerMap[0])
                }}
              >
                <>
                  <label className="text-base text-left font-light text-neutral-800">
                    Email
                    <input
                      className="block flex-1 p-3 w-full font-normal rounded-md border border-gray-200 transition sm:text-sm placeholder:font-light placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-zinc-500"
                      required
                      data-1p-ignore
                      placeholder="Email"
                      name="email"
                      type="email"
                      value={credentials.email}
                      onChange={(e) => {
                        setCredentials(prev => ({
                          ...prev,
                          email: e.target.value
                        }))
                      }}
                    />
                  </label>
                  <label className="text-base font-light text-neutral-800">
                    Password
                    <input
                      className="block flex-1 p-3 w-full font-normal rounded-md border border-gray-200 transition sm:text-sm placeholder:font-light placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-zinc-500"
                      required
                      data-1p-ignore
                      placeholder="Password"
                      name="password"
                      type="password"
                      value={credentials.password}
                      onChange={(e) => {
                        setCredentials(prev => ({
                          ...prev,
                          password: e.target.value
                        }))
                      }}
                    />
                  </label>
                  <button
                    type="submit"
                    className="mt-4 flex justify-center items-center px-4 space-x-2 w-full h-12 text-base font-light text-white rounded transition focus:ring-2 focus:ring-offset-2 focus:outline-none bg-[#035226] hover:bg-[#046644] focus:ring-[#046644]"
                  >
                  <span>Login</span>
                </button>
                </>
            </form>
            {/* <div className="flex gap-2 items-center my-4">
              <div className="flex-1 bg-neutral-300 h-[1px]" />
              <span className="text-xs leading-4 uppercase text-neutral-500">
                or
              </span>
              <div className="flex-1 bg-neutral-300 h-[1px]" />
            </div>
            <form action={ async () => {
                const provider = providerMap[1]
                await signIn(provider.id, { redirectTo: "/" });
            }}>
              <div className="text-center">
                <button className="gsi-material-button">
                  <div className="gsi-material-button-state"></div>
                  <div className="gsi-material-button-content-wrapper">
                    <div className="gsi-material-button-icon">
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlnsXlink="http://www.w3.org/1999/xlink" style={{display: 'block'}}>
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                        <path fill="none" d="M0 0h48v48H0z"></path>
                      </svg>
                    </div>
                    <span className="gsi-material-button-contents">Sign in with Google</span>
                    <span style={{display: 'none'}}>Sign in with Google</span>
                  </div>
                </button>
              </div>
            </form> */}
            <div className="text-xs mt-8 text-center">{"Don't have account ? "}<span className="cursor-pointer">{"Sign up"}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}