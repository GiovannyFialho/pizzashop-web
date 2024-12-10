import { http, HttpResponse } from "msw";

import { GetManagedRestaurantResponse } from "@/api/get-manager-restaurant";

export const getManagerRestaurantMock = http.get<
  never,
  never,
  GetManagedRestaurantResponse
>("/managed-restaurant", () => {
  return HttpResponse.json({
    id: "custom-restaurant-id",
    name: "Pizza Shop",
    description: "descrição legal",
    managerId: "custom-user-id",
    createdAt: new Date(),
    updatedAt: null,
  });
});
