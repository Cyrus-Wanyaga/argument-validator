# Argument Validator

This web app validates arguments. An argument is a sequence of statements called premises or hypothesis ending in a conclusion.
Arguments can be valid or invalid. To say that an argument is valid means that no matter what particular statements are substituted 
for the statement variables in its premises, if the resulting premises are all true, then the conclusion is also true.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser and start entering your arguments.

Arguments are entered as broken down segments consisting of premises(hypothesis) and the conclusion. Preferred symbols for the premises
are also entered.  

### Supported Rules of Inference

1. Modus Ponens
2. Modus Tollens
3. Generalization
4. Specialization
5. Conjunction
6. Elimination
7. Transitivity

