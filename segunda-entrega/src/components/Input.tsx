import styled from "styled-components";

const StyledInput = styled.input`
    background: #E86B45;
    border: solid 1px #fff;
    padding: 14px 14px 14px 18px;
    border-radius: 14px;
    margin-bottom: 12px;
    font-size: 18px;
    outline: none;
    color: #fff;
    
    &::placeholder {
        color: rgba(255, 255, 255, 0.7);
        font-weight: 400;
    }
`;

export default StyledInput;