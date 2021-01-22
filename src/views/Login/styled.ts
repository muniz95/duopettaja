import styled from 'styled-components';

export const LoginContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;

  form {
    padding: 20px;
    background: lightskyblue;
    border-radius: 10px;
  }
`;

export const FieldContainer = styled.div`
  display: flex;
  flex-flow: column
  margin: 10px 0;

  input {
    border-radius: 5px;
    height: 25px;
    outline: none;
    border-style: solid;
    border-width: 1px;
  }
`;
