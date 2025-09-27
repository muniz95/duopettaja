class Word {
  public id!: number;
  public text!: string;
  public selected!: boolean;
  public correct!: boolean;
  public category!: string;
  public expression!: string;
  public options!: any[];
  public weight!: number;
}

export default Word;
