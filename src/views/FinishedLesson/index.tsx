import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import Word from "../../models/Word";
import http from "../../utils/http";

interface IProps extends RouteComponentProps<any> {}

interface IState {
  questions: Word[];
  lessonId: number;
}

class FinishedLesson extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    const { questions, lessonId } = props.location.state;
    this.state = { questions, lessonId };
  }

  public componentDidMount(): void {
    const data: any = { completed: true };
    http
      .put(`${process.env.REACT_APP_API}/lessons/${this.state.lessonId}/complete`, data)
      .then(() => this.props.history.push("/"));
  }

  public render(): JSX.Element {
    return (
      <div>
        <h2>Finished :)</h2>
        <div>{this.state.questions.filter((a) => a.correct).length} correct questions</div>
        <div>{this.state.questions.filter((a) => !a.correct).length} wrong questions</div>
        <Link to={"/"}>
          <button>Home</button>
        </Link>
      </div>
    );
  }
}

export default FinishedLesson;
