// simple.ts - Basic TypeScript for Terminal
console.log("🚀 TypeScript is working!");

// Basic types - using different variable names
let userName: string = "Alice";
let userAge: number = 25;
let isStudent: boolean = true;

console.log("\n=== BASIC TYPES ===");
console.log("Name:", userName);
console.log("Age:", userAge);
console.log("Is Student:", isStudent);

// Function with types
function greet(person: string): string {
    return "Hello, " + person + "!";
}

function add(a: number, b: number): number {
    return a + b;
}

console.log("\n=== FUNCTIONS ===");
console.log(greet("Bob"));
console.log("10 + 15 =", add(10, 15));

// Array with type
let numbers: number[] = [1, 2, 3, 4, 5];
console.log("\n=== ARRAY ===");
console.log("Numbers:", numbers);

console.log("\n✅ TypeScript compiled successfully!");
