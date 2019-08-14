import styled, { StyledComponent } from "styled-components";

interface IWordBoxProps {
  selected: boolean;
}

export const SelectedWordsContainer: StyledComponent<"div", any, {}> = styled.div`
  display: flex;
  padding: 0 10% 0 10%;
  align-items: center;
  justify-content: center;
  height: 50px;
`;

export const SelectedWordsBox: StyledComponent<"div", any, {}> = styled.div`
  width: 100%;
  height: 100%;
  border-style: solid;
  border-color: grey;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AvailableWordsContainer: StyledComponent<"div", any, {}> = styled.div`
  display: flex;
  padding: 0 10% 0 10%;
  align-items: center;
  justify-content: center;
  height: 50px;
`;

export const WordBox: StyledComponent<"div", any, IWordBoxProps> = styled.div`
  background-color: ${(p: IWordBoxProps) => p.selected ? "#989898" : "#E8E7E6"};
  display: inline-block;
  margin: 4px 9px;
  padding: 1px 15px;
  border-radius: 3px;
  box-shadow: inset 0 0 2px #B8B7B6;
  height: 25px;
  vertical-align: top;
  color: ${(p: IWordBoxProps) => p.selected ? "grey" : "black"};
  cursor: pointer;
`;
