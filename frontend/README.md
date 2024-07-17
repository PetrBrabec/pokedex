# Running it locally

To run the server:

```
cd backend
npm install
npm start
```


To run the client:

```
cd frontend
pnpm install
pnpm dev
```


When making changes to the client you also need to be generating graphql types using:

```
pnpm graphql:watch
```