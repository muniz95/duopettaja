class Lesson {
  public id?: number;
  public completed?: boolean;
  public words: string[];
  public questions: string[];
  public skillId?: number;
  public order?: number;
  public available?: true;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor() {
    this.words = [];
    this.questions = [];
  }
}

export default Lesson;
