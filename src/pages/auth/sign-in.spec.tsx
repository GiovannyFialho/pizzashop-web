import { QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";

import { queryClient } from "@/lib/react-query";
import { SignIn } from "@/pages/auth/sign-in";

describe("SignIn", () => {
  it("should set default email input value if email is present on search params", () => {
    const wrapper = render(<SignIn />, {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={["/sign-in?email=giovannyf@outlook.com"]}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </MemoryRouter>
      ),
    });

    const emailInput = wrapper.getByLabelText("Seu e-mail") as HTMLInputElement;

    expect(emailInput.value).toEqual("giovannyf@outlook.com");
  });
});
