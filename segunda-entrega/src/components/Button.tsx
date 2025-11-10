import styled, { css } from "styled-components";

type ButtonProps = {
    isWhite?: boolean;
    withBorder?: boolean;
};

const ButtonContainer = styled.button.withConfig({
    shouldForwardProp: (prop) => !["isWhite", "withBorder"].includes(prop as string),
})<ButtonProps>`
    width: fit-content;
    padding: 10px 22px;
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: #FFFCF7;
    background: #E86B45;
    border: 0;
    border-radius: 14px;
    cursor: pointer;
    transition: ease-in 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        background: #d65026;
    }

    ${({ withBorder }) =>
            withBorder &&
            css`
                border: 1px solid #fff;
            `}

    ${({ isWhite, withBorder }) =>
            isWhite &&
            css`
                width: 100%;
                background: #fff;
                color: #e86b45;
                font-size: 20px;
                font-weight: 600;
                height: 50px;
                transition: ease-in 0.15s;
                margin-bottom: 30px;
                border-radius: 14px;
                border: ${withBorder ? "1px solid #fff" : "none"};
                outline: none;

                &:hover {
                    background: #e86b45;
                    color: #fff;
                    border: 1px solid #fff;
                }
            `}
`;

export default ButtonContainer;
