import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Login } from "./index";
import { vi, describe, it } from "vitest";

vi.mock("react-router-dom", () => {
  return {
    useNavigate() {
      return [null, false];
    },
    Link: vi.fn().mockImplementation(({ children }) => children),
  };
});

vi.mock("../../redux/features/Authentication/authenticationSlice", () => {
  return {
    useAuthLoginMutation: () => [authLoginMock],
  };
});

const authLoginMock = vi.fn();

describe("Login", () => {
  it("should render login form", () => {
    render(<Login />);

    const loginInput = screen.getByPlaceholderText("login");
    const passwordInput = screen.getByPlaceholderText("senha");
    const submitButton = screen.getByText("Entrar");

    expect(loginInput).to.exist;
    expect(passwordInput).to.exist;
    expect(submitButton).to.exist;
  });

  // it("should handle form submission", async () => {
  //   const authLoginMock = vi.fn().mockResolvedValue("token");
  //   vi.mock("../../redux/features/Authentication/authenticationSlice", () => {
  //     return {
  //       useAuthLoginMutation: () => [authLoginMock],
  //     };
  //   });

  //   render(<Login />);

  //   const loginInput = screen.getByPlaceholderText("login");
  //   const passwordInput = screen.getByPlaceholderText("senha");
  //   const submitButton = screen.getByText("Entrar");
    
  //   fireEvent.change(loginInput, { target: { value: "John Doe" } });
  //   fireEvent.change(passwordInput, { target: { value: "jhon123" } });
  //   fireEvent.click(submitButton);

  //   console.log(authLoginMock);

  //   await waitFor(() => expect(authLoginMock).toHaveBeenCalledTimes(1));
  //   expect(authLoginMock).toHaveBeenCalledWith({
  //     login: "user",
  //     senha: "password",
  //   });
  // });
});
