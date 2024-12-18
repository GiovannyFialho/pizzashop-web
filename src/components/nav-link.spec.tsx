import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";

import { NavLink } from "@/components/nav-link";

describe("NavLink", () => {
  it("should highlight the nav link when is the current page link", () => {
    const wrapper = render(
      <>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">Sobre</NavLink>
      </>,
      {
        wrapper: ({ children }) => (
          <MemoryRouter initialEntries={["/about"]}>{children}</MemoryRouter>
        ),
      },
    );

    expect(wrapper.getByText("Home").dataset.current).toEqual("false");
    expect(wrapper.getByText("Sobre").dataset.current).toEqual("true");
  });
});
