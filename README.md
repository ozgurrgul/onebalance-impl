# onebalance-impl project - very fun!

Typescript supported node.js ERC20 + ETH balance checker project.

# How to run locally

For backend:

```
cd backend
npm i
npm run dev
```

For frontend:

```
cd frontend
npm i
npm run dev
```

# To make it production ready

## Backend 
- Environment variables should be read from `.env` files, if any. I left it out, but frontend `import.meta`, backend `dotenv` can be used
- Caching busting should be added, or can be automatic cache clean up such as keep only 1000 cached items in the memory
- Ideally nestjs etc can be used, for simplicity I used Node + Express.

## Frontend
- Side effects such as API calls should be handled via react-query or redux-saga. Redux-saga is way better for large projects since it makes business logic orchestration a breeze. I didn't use for the sake of this exercise.
- For UI, any component library can be used. Shadcn is easy choice but for this I just used TailwindCss CDN to keep simple

## Common
- Eslint rules, prettier config, git hooks such as pre-push should be added for more consistent codebase
