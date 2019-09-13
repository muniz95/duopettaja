import styled from "styled-components";

const values: any = {
  finished: "blue",
  locked: "white",
  unfinished: "green",
};
interface IButtonProps {
  state: string;
}

export const Button = styled.button`
  border: none;
  height: 100%;
  background-color: ${(props: IButtonProps) => values[props.state]};
`;

export default {
  Button,
};
