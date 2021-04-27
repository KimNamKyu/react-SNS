import styled from "@emotion/styled";

export const Head = styled.div`
    padding: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;

    & div {
        margin-right: 10px;
    }
`;

export const Avatar = styled.div`
    border: 1px solid rgba(var(--b6a,219,219,219),1);
    background-color: green;
    width: 25px;
    border-radius: 20px;
`;