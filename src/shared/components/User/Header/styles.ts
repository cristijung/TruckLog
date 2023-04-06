import styled from "styled-components";

export const HeaderContainer = styled.header`
    width: 100%;
    height: 10vh;
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    align-items: center;
    border-bottom: 1px solid ${(props) => props.theme["gray-100"]};
    box-shadow: 2px 0 3px rgba(0, 0, 0, 0.1);
    padding: 0 4rem;

    gap: 1rem;
    .header-icon {
        width: 5rem;
    }
    .dashboard-menu {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .logout-container {
        button {
            background-color: transparent;
            border: 1px solid black;
            color: ${(props) => props.theme["green-700"]};
            font-weight: 700;

            &:hover {
                background-color: ${(props) => props.theme["green-700"]};
                color: ${(props) => props.theme["white"]};
            }
        }
    }

    img {
        height: 80%;
    }

    i {
        font-size: 2rem;
        padding: 1rem;
        border-radius: 90rem;
        cursor: pointer;
        transform: translateY(-0.2rem);
    }

    i:hover {
        background-color: ${(props) => props.theme["gray-100"]};
        transition: background 200ms;
    }
`;
