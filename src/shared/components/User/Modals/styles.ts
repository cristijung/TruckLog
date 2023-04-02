import styled from "styled-components";

export const ModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h2 {
        font-size: 1.8rem;
        color: ${(props) => props.theme["green-700"]};
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }


  p {
    padding: 1rem;
    text-align: center;
    border: 1px transparent black;
    background-color: ${(props) => props.theme["gray-100"]};
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.2) 1px 1px 1px 1px;
    font-size: 1.6rem;
    strong {
      color: ${(props) => props.theme["green-700"]};
    }
  }

  .close-btn {
    position: absolute;
    font-size: 3rem;
    top: 2rem;
    right: 2rem;
    cursor: pointer;

    filter: invert(32%) sepia(6%) saturate(0%) hue-rotate(235deg)
      brightness(98%) contrast(88%);
  }

  .delete-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 2rem;

    > h2 {
      margin-bottom: 2rem;
    }

    .delete-btn-container {
      display: flex;
      width: 100%;
      flex-direction: column;
      align-items center;
      gap: 1rem;
      text-align: center;

      button {
        margin: 0;
        width: 85%;
      }
    }
  }    
    
    p {
        padding: 1rem;
        text-align: center;
        border: 1px transparent black;
        background-color: ${(props) => props.theme["gray-100"]};
        border-radius: 4px;
        box-shadow: rgba(0, 0, 0, 0.2) 1px 1px 1px 1px;
        font-size: 1.6rem;
        strong {
            color: ${(props) => props.theme["green-700"]};
        }
    }

    .posto-info-container {
      margin-top: 0.8rem;
      box-shadow: rgba(0, 0, 0, 0.2) 1px 1px 1px 1px;
      border-radius: 8px;
      width: fit-content;
        p {
            text-align: left;
            font-size: 1.6rem;
            padding: 0.8rem;
            background-color: rgb(255, 255, 255);
            box-shadow: none;

            strong {
                font-size: 1.4rem;
            }
        }
    }

    .delete-gas-station {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3rem;

        .delete-btn-container {
            display: flex;
            flex-direction: column;
            width: 100%;
            gap: 1rem;
            text-align: center;
        }
    }

    .form-container {
        display: flex;
        flex-direction: column;

        label {
            margin-top: 1rem;
            font-size: 1.6rem;
            color: ${(props) => props.theme["green-700"]};
        }

        input,
        select {
            all: unset;
            width: 95%;
            padding: 1rem;
            border: 1px solid ${(props) => props.theme["gray-100"]};
            font-size: 1.4rem;
            border-radius: 0.5rem;
        }

        button {
            width: fit-content;
            padding: 1rem 1.5rem;
            margin: 1.5rem auto 0 auto;
        }
    }

    .lgpdH2 {
        text-align: center;
    }
    .lgpdText {
        text-align: justify;
    }

    @media (max-width: 600px) {
        .lgpdH2 {
            font-size: 1.6rem;
        }
        .lgpdText {
            font-size: 1.2rem;
        }
    }

    label {
        margin-top: 1rem;
        font-size: 1.6rem;
        color: ${(props) => props.theme["green-700"]};
    }

    button {
      /* width: fit-content; */
      padding: 1rem 1.5rem;
      margin: 1.5rem auto 0 auto;
    }

    .form-interest {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
        margin: 0 auto;
        border-radius: 1rem;
        padding: 2rem;
        input {
            font-size: 1.8rem;
        }
    }

    .text-section {
        display: flex;
        font-size: 1.3rem;
        margin: 1rem;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 2rem;
        .subtitle {
            margin-top: 1rem;
            font-size: 2rem;
        }
    }

    form div {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        width: 100%;
    }

    form label,
    form p {
        background-color: #fff;
        font-size: 2rem;
        box-shadow: none;
    }

    form label i {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 3rem;
        height: 3rem;
        margin-right: 1rem;
        border-radius: 4px;
        background-color: ${(props) => props.theme["green-500"]};
        color: ${(props) => props.theme.white};
    }

    form > div input {
        border: 1px solid ${(props) => props.theme["gray-300"]};
        width: 100%;
        padding: 1rem;
        border-radius: 0.5rem;
    }

    form > button {
        margin: auto;
    }
`;
