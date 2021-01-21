import React from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import http from "../../utils/http";

const FinishedLesson = ({history, location}: RouteComponentProps) => {
  React.useEffect(() => {
    const data: any = { completed: true };
    http
      .put(`${process.env.REACT_APP_API}/lessons/${(location as any).lessonId}/complete`, data)
      .then(() => history.push("/"));
  }, [history, location])
  // constructor(props: IProps) {
  //   super(props);

  //   const { questions, lessonId } = props.location.state;
  //   this.state = { questions, lessonId };
  // }

  // public componentDidMount(): void {
  //   const data: any = { completed: true };
  //   http
  //     .put(`${process.env.REACT_APP_API}/lessons/${this.state.lessonId}/complete`, data)
  //     .then(() => history.push("/"));
  // }

  return (
    <div>
      <h2>Finished :)</h2>
      <div>{(location.state as any).questions.filter((a: any) => a.correct).length} correct questions</div>
      <div>{(location.state as any).questions.filter((a: any) => !a.correct).length} wrong questions</div>
      <Link to={"/"}>
        <button>Home</button>
      </Link>
    </div>
  );
}

export default withRouter(FinishedLesson);
