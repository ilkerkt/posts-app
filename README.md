# Posts Application

## Instructions
### Installation
Run following to install required dependencies
```bash
npm install
```

### Development version
To start in development mode, run following

```bash
npm run dev
```

### Running tests
To start in development mode, run following

```bash
npm run test
```


### Production version
Run following to build and start application
```bash
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to access to the application.


## Summary

### Technology choices
Initially, Anydesk official website and portal(v2) is visited and reviewed 
to have similar look and feel and use similar technologies.

As it described on the assignment requirements Next.js (pages router) is used for the project. 
In the application, client side rendering is used to ensure a smoother, more interactive user experience. 
Api route of Next.js(server side) is used to simulate missing functionalities of the api that gives seamless user experience.
Focus on unit testing critical parts such as store API interactions, forms, data boundaries, etc.

### Project Structure
1. Pages:
   1. index.tsx is the home page of the Posts application, which lists all posts.
   2. posts/new is a form page to create a new post.
   3. posts/id/index.tsx is a detailed post page to display the corresponding post.
   4. posts/id/edit.tsx is form page to edit corresponding post.
5. components: contains general and post related components.
6. hooks: includes a hook to handle initial side effect of single post pages.
7. pages/api/post: contains handlers to simulate JSONPlaceholder api seamlessly.
8. styles: includes common global, home and single post page css modules

### Libraries Used
1. Due to the requirement of application styling, CSS modules or styled components are used instead of Material UI components.
   CSS modules are used.
2. The following libraries are used
   1. zustand: to manage posts states throughout the application.
   2. react-hook-forms: to manage create/edit of post form:
   3. zod: to validate and keep same post model definition and form input.
   4. react-icons: to use few icons on buttons
   5. react-toastify: to display notification to inform user about action result