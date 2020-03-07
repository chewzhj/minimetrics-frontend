## MiniMetrics FrontEnd React App
Will update this readme if we need more FAQ.

### Setup Information

1. Install node.js on your computer.
2. Clone the repository into the folder of your choice.
3. On your terminal (node.js cmd, git bash, powershell), run `npm install` to install the node.js packages required by this project.

### Typical Usage

If there are (or arent) any changes to the packages used (when cloning from github), run `npm install` again to update the packages.

Then run the React App with `npm start`

The git model that I followed during capstone is: https://nvie.com/posts/a-successful-git-branching-model/
..* `develop` is the main branch where we use for development
..* `feature-dashboard` is the branch name you might use for a dashboard, where you push your commits to.

Install Babel Language Support on your editor: https://babeljs.io/docs/en/editors/

### Folder Structure

Below shows the folder structure for a React App using Redux.
All the files, similar to a typical React App, will be found in `src`

##### `actions`
Redux Actions go here
##### `api`
API setup files and calls are here
##### `assets`
Images, CSS files, and other references
##### `components`
Reused Components (Sidebar, header, reused forms) go here
##### `containers`
Containers that connect views to actions go here
##### `phrases`
Phrases are words shown on the screen. Important for localization
##### `reducers`
Reducers define the state changes from actions
##### `router`
Router defines the URL routes of the application
##### `variables/constants`
Constants are action names
##### `views`
Views are all the JSX files

##### Other React Information available below

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
