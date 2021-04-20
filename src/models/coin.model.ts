class Coin {
  public symbol: string;
  public amount: number;

  constructor(name: string, amount: number) {
    this.symbol = name;
    this.amount = amount;
  }
}
export default Coin;
