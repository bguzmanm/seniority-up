export class Money {
  private constructor(
    public readonly amount: number,
    public readonly currency: "USD" | "CLP",
  ) {
    if (amount < 0) throw new Error("El monto no puede ser negativo");
  }

  static of(amount: number, currency: "USD" | "CLP"): Money {
    return new Money(amount, currency);
  }

  add(other: Money): Money {
    if (other.currency !== this.currency) throw new Error("Monedas distintas");
    return new Money(this.amount + other.amount, this.currency);
  }

  equals(other: Money): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }
  multiply(quantity: number): Money {

    return new Money(this.amount * quantity, this.currency);
  }
}
