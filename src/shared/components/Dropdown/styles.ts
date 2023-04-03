import styled from "styled-components";

export const DropdownContainer = styled.div`
    border: 1px solid ${(props) => props.theme["green-700"]};
    padding: 0.5rem 0 0.5rem 2rem;
    position: relative;
    display: flex;
    align-items: center;
    cursor: default;
    border-radius: 0.5rem;

    &:hover li {
        display: initial;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    i:hover {
        background: none;
    }

    ul {
        position: absolute;
        display: flex;
        flex-direction: column;
        width: 100%;
        transform: translateX(-2.1rem) translateY(4.2rem);
    }

    li {
        background: ${(props) => props.theme.white};
        width: 101%;
        display: none;
        padding: 0 0 0 1rem;
        cursor: pointer;
        border: 1px solid ${(props) => props.theme["green-700"]};
        font-weight: 700;
        font-size: 1.4rem;

        &:hover {
            color: ${(props) => props.theme.white};
            background: ${(props) => props.theme["green-700"]};
        }

        @media (max-width: 768px) {
            div {
                padding: 0.25rem 0px 0.25rem 1rem;
            }
        }
    }
`;
