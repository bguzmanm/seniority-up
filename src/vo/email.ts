export class Email {
  private constructor(public readonly value: string) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      throw new Error(`Email inválido: ${value}`);
  }

  static of(value: string): Email {
    return new Email(value.toLowerCase().trim());
  }
}
