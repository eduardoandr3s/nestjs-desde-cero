const myName: string = 'Eduardo';
const myAge: number = 33; // number

const suma = (a: number, b: number): number => {
  return a + b;
};

suma(1, 2);

class Person {
  constructor(
    private name: string,
    private age: number,
  ) {}
  getSummary(): string {
    return `${this.name} is ${this.age} years old`;
  }
}

const eduardo = new Person('Eduardo', 33);
const juan = new Person('Juan', 25);
const maria = new Person('Maria', 28);
const juanSummary = juan.getSummary();
const mariaSummary = maria.getSummary();
const eduardoSummary = eduardo.getSummary();
console.log(juanSummary);
console.log(mariaSummary);
console.log(eduardoSummary);
