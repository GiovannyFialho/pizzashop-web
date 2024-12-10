import { http, HttpResponse } from "msw";

import { type SignInBody } from "@/api/sign-in";

export const signInMock = http.post<never, SignInBody>(
  "/authenticate",
  async ({ request }) => {
    const { email } = await request.json();

    if (email === "giovannyf@outlook.com") {
      return new HttpResponse(null, {
        status: 200,
        headers: {
          "Set-Cookie": "auth=sample-jwt",
        },
      });
    }

    return new HttpResponse(null, { status: 401 });
  },
);
