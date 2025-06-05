# OneCX Standalone Components Example

This project contains an example implementation of a OneCX compatible Angular 18 application that is based on standalone components. Apart from all basic setup steps, it also demonstrates how to display toast messages, handle translations, perform permission checks and navigate betweem screens in a OneCX compatible way.

## Run the example application

1. Clone the repository:
   ```bash
   git clone https://github.com/bastianjakobi/onecx-standalone-components-example.git
   ```
2. Navigate to the project directory:
   ```bash
   cd onecx-standalone-components-example
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the application:
   ```bash
   npm start
   ```
5. Open your browser and navigate to `http://localhost:4200` to access the application in standalone mode.
6. Open your browser and navigate to `http://localhost:4200/remoteEntry.js` to access the applications remote entry file.
7. Configure the OneCX shell to load the remote entry to view the application in remote mode.