import { http, HttpResponse } from "msw";

import { GetProfileResponse } from "@/api/get-profile";

export const getProfileMock = http.get<never, never, GetProfileResponse>(
  "/me",
  () => {
    return HttpResponse.json({
      id: "custom-user-id",
      name: "Giovanny",
      email: "giovannyf@outlook.com",
      phone: "111111111",
      role: "manager",
      createdAt: new Date(),
      updatedAt: null,
    });
  },
);
