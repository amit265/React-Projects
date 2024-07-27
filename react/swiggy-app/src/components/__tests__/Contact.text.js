import { render } from "@testing-library/react"
import Contact from "../Contact"
import { expect } from "@jest/globals";

test("should load contact up component", () => {
    render(<Contact />);

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocumnet();
})