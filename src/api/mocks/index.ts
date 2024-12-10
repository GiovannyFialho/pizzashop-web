import { setupWorker } from "msw/browser";

import { env } from "@/env";

import { signInMock } from "@/api/mocks/sign-in-mock";

export const worker = setupWorker(signInMock);

export async function enableMSW() {
  if (env.MODE !== "test") {
    return;
  }

  await worker.start();
}
