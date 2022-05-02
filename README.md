# Tech Stack

## Core

- React
- React Router
- Redux
- Redux Toolkit
- Reselect
- Redux-Saga
- Styled Components
- Typescript
- React-i18next

## Unit Testing

- Jest
- react-testing-library

## Linting

- ESLint
- Prettier
- Stylelint

# Code/Folder Structure

## src

- **src/app/components**: contains reusable components for website
- **src/app/pages**: Follow the folder-by-feature pattern

### src/locales

### src/store

### src/styles

### src/types

### src/utils

## public

## internals

This section you won't be bothering with much. We ship some extra functionalities to help with your web app and here it lies. It contains the code for:

- internals/extractMessages: Utils to extract messages into JSON syntax.
- internals/generators: Create new components and redux-toolkit slices using CLI.
- internals/testing: Testing the internal features like generators. You can customize your generators and still test them if they are working

# CLI & Scaffolding

## Development

```
yarn start
```

Sets up the development environment and starts a server, as well as hot module reloading.

## Cleaning

```
yarn cleanAndSetup
```

Removes the example app, replacing it with the smallest amount of boilerplate code necessary to start writing your app! Also, it makes some essential changes to your setup to give you a clean and working start.

## Generators

```
yarn generate
```

Allows you to auto-generate boilerplate code for common parts of your application, specifically `components`, and `redux-toolkit` slices

- `yarn generate component`: For generating a component:
  - **What should it be called?** Enter the component name
  - **Where do you want it to be created?** Choose a folder that you want to your component is located in
  - **Do you want to wrap your component in React.memo?** Default is `No`
  - **Do you want to use styled-components?** Default is `Yes`
  - **Do you want i18n translations (i.e. will this component use text)?** Default is `No`
  - **Do you want to load the component asynchronously?** Default is `No`
  - **Do you want to have tests?** Default is `No`
- `yarn generate slice`: For generating a slice:
  - **What should it be called (automatically adds ...Slice postfix)**: The slice name
  - **Where do you want it to be created?**: Choose a folder that you want to your slice is located in
  - **Do you want sagas for asynchronous flows? (e.g. fetching data)**: Default is `Yes`, enable `redux-saga` for managing side-effects such as dispatching actions asynchronously or accessing browser data

## Production

```
yarn start:prod
```

- Builds your app (see yarn run build)
- Serves the build folder locally

The app is built for optimal performance; assets are minified and served gzip-ed.

## Unit testing

```
yarn test
```

Unit tests specified in the `**/__tests__/*.ts` files throughout the application are run.

## Linting

```
yarn lint
```

Lints your Typescript and your CSS.

```
yarn lint:fix
```

Lints your code and tries to fix any errors it finds.

## Extracting translation JSON Files

```
yarn extract-messages
```

## Typescript

```
yarn checkTs
```

Checks for TypeScript errors.

# Building Blocks

In this section, we will explain the building blocks of the boilerplate in detail.
First we have to look at what is happening when react starts its life with `index.tsx` file.

## src/index.tsx:

It is one of the most important files of the boilerplate. It contains all the global setup to make sure your app runs smoothly. Let's break its contents down:

- `react-app-polyfill` is imported to enable compatibility with many browsers and cool stuff like generator functions, Promises, etc.
- A Redux store is instantiated.
- `ReactDOM.render()` not only renders the root React component, called `<App />`, of your application, but it renders it with `<Provider />`.
- Hot module replacement via `Webpack HMR` makes the i18n translations hot re-loadable.
- i18next internationalization support setup.
- `<Provider />` connects your app with the Redux store.
  Again, src/index.tsx handles all the bootstrapping and setup of the features we are using in the boilerplate. Now, let's review a summary of the building blocks.

## Redux

The Redux store is the heart of your application. Check out src/store/configureStore.ts to see how we have configured the store.

The createStore() factory creates the Redux store and accepts three parameters.

1. Root reducer: A master reducer combining all your reducers.
2. Initial state: The initial state of your app as determined by your reducers.
3. Middleware/enhancers: Middlewares are third party libraries which intercept each Redux action dispatched to the Redux store and then... do stuff. For example, if you install the redux-logger middleware, it will listen to all the actions being dispatched to the store and print the previous and next state in the browser console. It's helpful to track what happens in your app.

In our application, we are using a single middleware.

`redux-saga`: Used for managing side-effects such as dispatching actions asynchronously or accessing browser data.

## Reselect

Reselect is a library used for slicing your Redux state and providing only the relevant sub-tree to a React component. It has three key features:

1. Computational power.
2. Memoization.
3. Composability.

Imagine an application that shows a list of users. Its Redux state tree stores an array of usernames with signatures:

```
{ id: number, username: string, gender: string, age: number }
```

Let's see how the three features of reselect help.

- **Computation**: While performing a search operation, reselect will filter the original array and return only matching usernames. Redux state does not have to store a separate array of filtered usernames.
- **Memoization**: A selector will not compute a new result unless one of its arguments change. That means, if you are repeating the same search once again, reselect will not filter the array over and over. It will just return the previously computed and, subsequently, cached result. Reselect compares the old and the new arguments and then decides whether to compute again or return the cached result.
- **Composability**: You can combine multiple selectors. For example, one selector can filter usernames according to a search key, and another selector can filter the already filtered array according to gender. One more selector can further filter according to age. You combine these selectors by using `createSelector()`.

## Redux-Saga

If your application interacts with some back-end API for data, we recommend using redux-saga for side-effect management

Imagine that your application is fetching data in JSON format from a back-end. For every API call, ideally, you should define at least three kinds of action creators:

1. `API_REQUEST`: Upon dispatching this, your application should show a spinner to let the user know that something's happening.
2. `API_SUCCESS`: Upon dispatching this, your application should show the data to the user.
3. `API_FAILURE`: Upon dispatching this, your application should show an error message to the user.

And this is only for **one** API call. In a real-world scenario, one page of your application could be making tens of API calls. How do we manage all of them effectively? It essentially boils down to controlling the flow of your application. What if there was a background process that handled multiple actions simultaneously and communicated with the Redux store and React components at the same time? Here is where `redux-saga` enters the picture.

For a mental model, consider a saga like a separate thread in your application that's solely responsible for side-effects. Then `redux-saga` is a Redux middleware, which means this thread can be started, paused, and canceled from the main application with standard Redux actions. It has access to the full Redux application state, and it can dispatch Redux actions as well.

## Linting

This boilerplate includes a complete static code analysis setup. It's composed of ESLint, stylelint, and Prettier.

The boilerplate provides a `pre-commit` git hook to analyze and fix linting errors automatically before committing your code. If you'd like to disable it or modify its behavior, take a look at the `lint-staged` section in `package.json`.

# Building

```
yarn build
```

Preps your app for deployment (does not run tests). Optimizes and minifies all files, piping them to the `build` folder.

Upload the contents of `build` to your web server to
see your work live!
