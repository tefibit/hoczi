
export type Option = { label: string; text: string };
export type Question = {
  id: number;
  question: string;
  code: string;
  options: Option[];
  answer: string;
  explanation: string;
};

export const questions: Question[] = [
  {
    id: 1,
    question: "What's the output?",
    code: `function sayHi() {
  console.log(name);
  console.log(age);
  var name = 'Lydia';
  let age = 21;
}

sayHi();`,
    options: [
      { label: "A", text: "Lydia and undefined" },
      { label: "B", text: "Lydia and ReferenceError" },
      { label: "C", text: "ReferenceError and 21" },
      { label: "D", text: "undefined and ReferenceError" },
    ],
    answer: "D",
    explanation:
      "Variables declared with `var` are hoisted and initialized as `undefined`, so `name` logs `undefined`. Variables declared with `let` are hoisted but not initialized — accessing them before their declaration throws a `ReferenceError`.",
  },
  {
    id: 2,
    question: "What's the output?",
    code: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}`,
    options: [
      { label: "A", text: "0 1 2 and 0 1 2" },
      { label: "B", text: "0 1 2 and 3 3 3" },
      { label: "C", text: "3 3 3 and 0 1 2" },
      { label: "D", text: "3 3 3 and 3 3 3" },
    ],
    answer: "C",
    explanation:
      "With `var`, the loop variable is shared across all iterations — by the time the callbacks run, `i` is already `3`. With `let`, a new binding is created for each iteration, so each callback captures its own `i` value (0, 1, 2).",
  },
  {
    id: 3,
    question: "What's the output?",
    code: `const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2;
  },
  perimeter: () => 2 * Math.PI * this.radius,
};

console.log(shape.diameter());
console.log(shape.perimeter());`,
    options: [
      { label: "A", text: "20 and 62.83185307179586" },
      { label: "B", text: "20 and NaN" },
      { label: "C", text: "20 and 63" },
      { label: "D", text: "NaN and 63" },
    ],
    answer: "B",
    explanation:
      "The value of `diameter` is a regular function, so `this` refers to the `shape` object — returning `10 * 2 = 20`. The value of `perimeter` is an arrow function, so `this` refers to its surrounding scope (the window/global object). There is no `radius` on that object, so `this.radius` is `undefined`, making the result `NaN`.",
  },
  {
    id: 4,
    question: "What is result of 3+6",
    code: '',
    options: [
      {label: 'A', text: 'it is 4'},
      {label: 'B', text: 'it is 9'},
      {label: 'C', text: 'it is 7'},
      {label: 'D', text: 'it is 6'},
    ],
    answer: 'B',
    explanation: " 3 + 6 equal 9, so the right answer is B"
  },
  {
    id: 5,
    question: 'how long it take for light go from earth to sun ?',
    code: '',
    options: [
      {label: 'A', text: 'it takes 8 minutes'},
      {label: 'B', text: 'it takes 20 minutes'},
      {label: 'C', text: 'it takes 2 hours'},
      {label: 'D', text: 'it takes 5 minutes'},
    ],
    answer: 'A',
    explanation: "The disctance between earth and sun is around 150 million kimomitter, so it takes 8 minutes to go"
  },
  {
    id: 6,
    question: 'how long it take for light go from earth to moon ?',
    code: '',
    options: [
      {label: 'A', text: '1 minute'},
      {label: 'B', text: '128 seconds'},
      {label: 'C', text: '28 seconds'},
      {label: 'D', text: '1.28 seconds'},
    ],
    answer: 'D',
    explanation: "Distance Earth → Moon ≈ 384,400 km, Speed of light ≈ 299,792 km/s so it takes 1.28 seconds"
  }
];
