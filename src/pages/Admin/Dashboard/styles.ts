import styled from "styled-components";

export const UsersContainer = styled.main`
    width: 100%;
    overflow-x: hidden;

    input[type="text"] {
        all: unset;
        width: 98%;
        padding: 1.5rem;
        border: 1px solid ${(props) => props.theme["gray-100"]};
        font-size: 1.6rem;
        border-radius: 0.5rem;
    }

    [class$="content"] {
        max-width: 80vw;
        margin: 0 auto;
    }

    main {
        height: 90vh;
        display: flex;
        flex-direction: column;
    }

    .user-trail {
        background-color: #d8d8d8;
        color: ${(props) => props.theme["gray-400"]};
        border-radius: 0.5rem;
        padding: 0.5rem 2rem;
        width: fit-content;
        margin-top: 1rem;

        .selected {
            text-decoration: underline;
            cursor: default;
        }
    }

    .title-page {
        font-size: 2rem;
        margin: 2rem 0;
    }

    .create-button {
        width: fit-content;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 2rem;

        i {
            font-size: 1.6rem;
        }
    }

    .page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 5rem;
    }

    .data-container {
        padding: 3rem 4rem;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 3rem;
        .card-data {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding: 1.5rem;
            border-radius: 8px;
            background-color: ${(props) => props.theme.background};

            .card-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 1rem;
            }

            span {
                font-size: 1.2rem;
                font-weight: bold;
            }

            strong {
                font-size: 1.8rem;
            }
        }
    }
`;
