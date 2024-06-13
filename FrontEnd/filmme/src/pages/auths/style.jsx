import styled, { css } from "styled-components";

export const LoginImage = styled.img `
    display: flex;
    margin-top: 80px;
    width: 700px;
    height: auto;
`;

export const LoginButton = styled.img `
    display: flex;
    width: 300px;
    height: auto;
    margin-left: 200px;
`;

export const Form = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

export const Input = styled.input`
    width: 250px;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
`;

export const Button = styled.button`
    width: 250px;
    padding: 10px;
    background-color: #6069E4;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    margin-bottom: 10px;

    &:hover {
        background-color: #8995FF;
    }
`;

export const SignupButton = styled.button`
    width: 250px;
    padding: 10px;
    background-color: #161835;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background-color: #8995FF;
    }
`;