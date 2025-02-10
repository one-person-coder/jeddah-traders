import React from "react";

const LoginPage = () => {
  return (
    <div>
      <div class="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div
          class="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-[400px]"
          data-v0-t="card"
        >
          <div class="p-6 pt-6">
            <div class="flex flex-col items-center space-y-6">
              <div class="flex items-center gap-2">
                <img
                  alt="Materio Logo"
                  loading="lazy"
                  width="32"
                  height="32"
                  decoding="async"
                  data-nimg="1"
                  class="h-8 w-8"
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GT4zCOMivbJ423mHnyC49LtNRHlePg.png"
                  style="color: transparent;"
                />
                <span class="text-xl font-semibold">Materio</span>
              </div>
              <div class="text-center">
                <h1 class="text-2xl font-semibold mb-2">
                  Welcome to Materio! 👋
                </h1>
                <p class="text-muted-foreground">
                  Please sign-in to your account and start the adventure
                </p>
              </div>
              <form class="w-full space-y-4">
                <div class="space-y-4">
                  <input
                    class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-11"
                    placeholder="Email or Username"
                    type="text"
                  />
                  <div class="relative">
                    <input
                      class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-11 pr-10"
                      placeholder="Password"
                      type="password"
                    />
                    <button
                      type="button"
                      class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-eye h-5 w-5"
                      >
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked="false"
                      data-state="unchecked"
                      value="on"
                      class="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                      id="remember"
                    ></button>
                    <input
                      aria-hidden="true"
                      tabindex="-1"
                      type="checkbox"
                      value="on"
                      style="transform: translateX(-100%); position: absolute; pointer-events: none; opacity: 0; margin: 0px; width: 16px; height: 16px;"
                    />
                    <label
                      for="remember"
                      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember Me
                    </label>
                  </div>
                  <a
                    href="#"
                    class="text-sm text-purple-600 hover:text-purple-700"
                  >
                    Forgot Password?
                  </a>
                </div>
                <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 text-primary-foreground px-4 py-2 w-full h-11 bg-purple-600 hover:bg-purple-700">
                  Login
                </button>
                <p class="text-center text-sm text-muted-foreground">
                  New on our platform?{" "}
                  <a
                    href="#"
                    class="text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Create an account
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
