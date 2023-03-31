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
        padding: 0 1rem 0 calc(1rem + 20px);
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
    }

    .charts-data-container {
        margin: 2rem auto;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3rem;
    }

    .data-container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 3rem;
        width: 100%;
        .card-data {
            display: flex;
            flex-direction: column;
            justify-content: ;
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

    .chart-container {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        justify-content: space-between;
        max-height: 480px;
        width: 100%;

        canvas {
            border-radius: 8px;
            padding: 1rem;
            background-color: ${(props) => props.theme.background};
            width: 100%;
            height: 100%;
        }

        canvas:first-child {
            flex-grow: 1;
        }
    }

    @media (max-width: 1280px) {
        .data-container {
            grid-template-columns: repeat(2, 1fr);
            justify-content: center;
        }

        .canvas:last-child {
            flex-grow: 1;
        }
    }
`;
