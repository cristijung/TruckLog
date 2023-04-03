import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";
import { Roles } from "./index";
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

describe("Roles component", () => {
  beforeEach(() => {
    // Renderizar o componente antes de cada teste
    render(
      <Provider store={store}>
        <Roles />
      </Provider>
    );
  });
});
