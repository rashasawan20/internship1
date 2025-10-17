// demo.ts - TypeScript functions for browser demo

// Function with type annotations
function greet(name: string): string {
    return `Hello, ${name}! Welcome to TypeScript in the browser!`;
}

// Function with number types
function calculateSum(a: number, b: number): number {
    return a + b;
}

// Function with multiple operations
function calculateOperations(x: number, y: number): string {
    const sum = x + y;
    const difference = x - y;
    const product = x * y;
    const quotient = y !== 0 ? (x / y).toFixed(2) : 'undefined (division by zero)';
    
    return `Results: Sum = ${sum}, Difference = ${difference}, Product = ${product}, Quotient = ${quotient}`;
}

// Interface for type safety
interface Person {
    name: string;
    age: number;
    email?: string; // Optional property
}

// Function using interface
function createPerson(name: string, age: number, email?: string): Person {
    return { name, age, email };
}

// Function that demonstrates type safety
function processPerson(person: Person): string {
    return `Processing: ${person.name}, Age: ${person.age}${person.email ? `, Email: ${person.email}` : ''}`;
}

// Array with type annotation
const numbers: number[] = [1, 2, 3, 4, 5];

// Function to demonstrate array operations
function processNumbers(): string {
    const doubled = numbers.map(n => n * 2);
    const evenNumbers = numbers.filter(n => n % 2 === 0);
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    
    return `
        Original: [${numbers.join(', ')}]
        Doubled: [${doubled.join(', ')}]
        Even Numbers: [${evenNumbers.join(', ')}]
        Sum: ${sum}
    `;
}
// Global function declarations for HTML
function demoGreet(): void {
    const output = document.getElementById('output');
    if (output) {
        const greeting1 = greet('TypeScript Developer');
        const greeting2 = greet('Web Browser');
        output.innerHTML = `
            <h3>Greet Function Demo:</h3>
            <p><strong>Output 1:</strong> ${greeting1}</p>
            <p><strong>Output 2:</strong> ${greeting2}</p>
            <hr>
            <p><em>This function uses: <code>function greet(name: string): string</code></em></p>
        `;
    }
}

function demoCalculate(): void {
    const output = document.getElementById('output');
    if (output) {
        const sum = calculateSum(15, 25);
        const operations = calculateOperations(20, 5);
        output.innerHTML = `
            <h3>Calculate Functions Demo:</h3>
            <p><strong>Sum of 15 and 25:</strong> ${sum}</p>
            <p><strong>Operations with 20 and 5:</strong> ${operations}</p>
            <hr>
            <p><em>TypeScript ensures we only pass numbers to these functions</em></p>
        `;
    }
}

function demoTypeSafety(): void {
    const output = document.getElementById('output');
    if (output) {
        const numbersInfo = processNumbers();
        output.innerHTML = `
            <h3>Type Safety & Array Operations:</h3>
            <pre>${numbersInfo}</pre>
            <hr>
            <p><em>TypeScript prevents:</em></p>
            <ul>
                <li><code>numbers.push("hello")</code> ← This would cause a compile error!</li>
                <li><code>calculateSum("5", "10")</code> ← Strings instead of numbers</li>
            </ul>
        `;
    }
}

function demoInterface(): void {
    const output = document.getElementById('output');
    if (output) {
        const person1 = createPerson('Alice Johnson', 28, 'alice@example.com');
        const person2 = createPerson('Bob Smith', 35); // No email
        
        const processed1 = processPerson(person1);
        const processed2 = processPerson(person2);
        
        output.innerHTML = `
            <h3>Interface Demo:</h3>
            <p><strong>Person 1:</strong> ${processed1}</p>
            <p><strong>Person 2:</strong> ${processed2}</p>
            <hr>
            <p><em>Interfaces ensure objects have the correct shape:</em></p>
            <pre>interface Person {
    name: string;
    age: number;
    email?: string; // Optional
}</pre>
        `;
    }
}

function clearOutput(): void {
    const output = document.getElementById('output');
    if (output) {
        output.innerHTML = 'Output cleared. Click buttons to run demos...';
    }
}

// Make functions globally available
(window as any).demoGreet = demoGreet;
(window as any).demoCalculate = demoCalculate;
(window as any).demoTypeSafety = demoTypeSafety;
(window as any).demoInterface = demoInterface;
(window as any).clearOutput = clearOutput;

// Initialize with a welcome message
window.onload = function() {
    const output = document.getElementById('output');
    if (output) {
        output.innerHTML = `
            <h3>🚀 TypeScript Browser Demo Ready!</h3>
            <p>Click the buttons above to see TypeScript features in action.</p>
            <p>All this code was written in TypeScript and compiled to JavaScript for the browser.</p>
        `;
    }
};

console.log("TypeScript demo loaded successfully!");