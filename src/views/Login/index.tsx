import React, { FormEvent, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions";
import http from "../../utils/http";
import * as S from './styled';

const Login = () => {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const setFieldValue: any = {
    email: setEmail,
    password: setPassword,
  };
  const dispatch = useDispatch();
  const dispatchLogin = React.useCallback(
    () => dispatch(login()),
    [dispatch]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatchLogin();
  }
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFieldValue[event.target.id](event.target.value);
  }

  return (
    <S.LoginContainer>
      <form onSubmit={handleSubmit} >
        <S.FieldContainer>
          <label htmlFor="email">E-mail</label>
          <input type="text" name="email" id="email" onChange={handleChange} />
        </S.FieldContainer>
        <S.FieldContainer>
          <label htmlFor="password">Login</label>
          <input type="password" name="password" id="password" onChange={handleChange} />
        </S.FieldContainer>
        <S.FieldContainer>
          <input type="submit" value="Login"/>
        </S.FieldContainer>
      </form>
    </S.LoginContainer>
  );
}

(Login as any).whyDidYouRender = true

export default Login
