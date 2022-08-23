# Lab: ACS Video to Teams Meeting Lab 

## Exercise 1: Create the Project and Add Dependencies 

1. Create the React project using the following command: 
 
    ```
    npx create-react-app acs-video-to-teams-meeting --template typescript 
    ```

1. Open the `acs-video-to-teams-meeting` project folder in Visual Studio Code. 

1. Add the required ACS packages by running the following command: 

    ```
    npm install @azure/communication-common @azure/communication-calling  
    ``` 

1. Open `App.tsx` and replace the existing HTML returned from the component with the following: 

    ```html
    <div className="App">
        <h1>Azure Communication Services</h1> 
        <h3>Teams meeting link</h3> 
        <input type="text" placeholder="Teams meeting link" /> 
        <p>Call state <span id="call-state">-</span></p> 
        <p><span id="recording-state"></span></p> 
        <div> 
            <button id="join-meeting-button" type="button"> 
            Join Teams Meeting 
            </button> 
            <button id="hang-up-button" type="button"> 
            Hang Up 
            </button> 
        </div> 
    </div>
    ```

1. Change the existing React `import` statement to the following:

    ```
    import React, { useEffect, useState } from 'react';
    ```

1. Add the following code into the `App` component to handle initializing ACS.

    ```

    ```

1. 