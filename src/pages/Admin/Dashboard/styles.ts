import styled from "styled-components";

export const UsersContainer = styled.main`
    width: 100%;
    overflow-x: hidden;

    [class$="content"] {
        max-width: 80vw;
        margin: 0 auto;
        padding: 0 0 0 1.5rem;
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

    .page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: rem;
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
        gap: 2.9rem;
        align-items: center;
        height: fit-content;
        width: 100%;

        canvas {
            border-radius: 8px;
            padding: 1rem;
            background-color: ${(props) => props.theme.background};
            max-width: 49.9%;
            max-height: 550px;
        }
    }
    @media (max-width: 1750px) {
        .chart-container {
            max-height: none;
            align-items: center;
            justify-content: center;
            margin-bottom: 3rem;
            width: 100%;
            flex-grow: 1;

            canvas {
                max-width: 100%;
                max-height: 500px;
            }
        }
    }

    @media (max-width: 1280px) {
        .content {
            padding-bottom: 3rem;
            padding: 0 1.5rem 0 calc(1.5rem + 20px);
        }

        .data-container {
            grid-template-columns: repeat(2, 1fr);
            justify-content: center;
            align-items: center;
        }
    }

    @media (max-width: 600px) {
        .page-header {
            gap: 0.5rem;
            flex-wrap: wrap;
            padding-top: 2rem;
            h2 {
                margin: 0;
            }
        }

        .data-container {
            gap: 1rem;

            .card-data {
                height: 100%;
                padding: 1rem;
            }
        }

        [class$="content"] {
            padding: 0 0 2rem;
            max-width: 85vw;
        }
    }
`;
