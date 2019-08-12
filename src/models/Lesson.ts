class Lesson {
  public id?: number;
  public completed?: boolean;
  public words: string[];
  public skillId?: number;
  public order?: number;
  public available?: true;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor() {
    this.words = [];
  }
}

export default Lesson;