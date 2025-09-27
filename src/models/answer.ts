class Answer {
  public correct!: boolean;
  public createdAt!: Date;
  public id!: number;
  public order!: number;
  public questionId!: number;
  public selected!: boolean;
  public text!: string;
  public options!: Answer[];

  constructor() {
    this.options = [];
  }
}

export default Answer;
