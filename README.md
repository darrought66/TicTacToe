# Tic Tac Toe

A fully interactive online Tic-Tac-Toe game. The project illustrates some
ideas of Game Theory, basic neural networks and serverless programming on 
AWS.

The random and minimax options use lambdas that read from a DynamoDB. The 
data was generated with a Python program. 

The neural network option calls a Python based neural network via a lambda.

The rules engine option is Typescript. 

Random: Chooses from the moves available randomly.
Rules Engine: uses a small set of heuristic rules to choose a move.
Minimax: Use the classic algorithm from game theory.
Minimax with Look-Ahead: an enhanced version of minimax.
Neural Network: calls a neural network to choose a move.

**History & Details: [https://en.wikipedia.org/wiki/Tic-tac-toe](https://en.wikipedia.org/wiki/Tic-tac-toe)**

**Live Demo:** [http://www.darrought66.com/](http://www.darrought66.com/)

## Tech Stack

- **Angular** 21 (standalone components, signals / `model()` where used)
- **TypeScript** 5.9
- **Unit tests:** `ng test` (Vitest via Angular’s test builder—see `angular.json`)
- Node v25.9.0
- Python 3.14.5

## Getting Started

```bash
npm install
npm start
```

Then open the URL shown in the terminal (usually `http://localhost:4200/`).

Other scripts:


| Command         | Description                     |
| --------------- | ------------------------------- |
| `npm run build` | Production build output         |
| `npm run watch` | Development build in watch mode |
| `npm test`      | Unit tests                      |

## License

This project is licensed under the **Apache License 2.0**—see the `[LICENSE](./LICENSE)` file (copyright: Timorhy "Rob" Darrough Jr.).

## Contributing / contact

**darrought66@gmail.com**

**There is no bug tracker, just email me.**

It is Apache license, meaning your free to use it however you wish, whether that be an example in a course, book, Udemy or YouTube video or start your own project doing it your way. Indeed, I would love to know if you found this useful.
