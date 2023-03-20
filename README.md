# Propylon - Front-end challenge

## Objective

The objective of this code challenge is to give the candidate the opportunity to demonstrate the following technical skills: 

- knowledge on HTML, CSS and JavaScript 
- Understanding on how React works and how components can be created 
- Good understanding of TypeScript 
- Knowledge on React Redux 
- Unit tests using JavaScript/TypeScript 
- Programming logic skills 

<br />


## Requirements

The challenge is to build from scratch an application using React that renders a tree of elements from a JSON structure (the tree.json file provided along with this test), providing the option to navigate to the list of components via Table Of Contents (ToC), following the requirements below:  


- Refactor the application to use React Redux

- Change the state management logic as the TOC and Content View should use correlated data

- Include breadcrumbs in the heading of content view, showing the path for the selection in the ToC  

- The JSON file needs to be served to the React App via API request 

- Include unit test coverage

- Include the concept of pagination using infinite scroll, always displaying the next and previous 5 components from the document, based on the selection (OPTIONAL)

- Feel free to refactor the code as you prefer. This point will be considered as part of the code results.

<br />

## Running the initial project

This project has the basic structure to run. First of all, you need install the dependencies using:

```
npm install
```

Now, we are able to run the backend. To do it, run the command below in a new terminal:

```
npm run backend
```

Finally, to run the application:

```
npm start
```