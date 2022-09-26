import { AzureCommunicationTokenCredential } from '@azure/communication-common';
import {
  CallAdapter,
  CallComposite, createAzureCommunicationCallAdapter,
} from '@azure/communication-react';
import React, { useState, useMemo, useEffect } from 'react';
import './App.css';

const App = () => { 

  const userId = process.env.REACT_APP_ACS_USER_ID as string;
  const token = process.env.REACT_APP_ACS_TOKEN as string;
  const [teamsMeetingLink, setTeamsMeetingLink] = useState('');
  const credential = useMemo(() => new AzureCommunicationTokenCredential(token), [token]);
  const [adapter, setAdapter] = useState<CallAdapter | undefined>();

  useEffect(() => {
    const getTeamsMeetingLink = async () => {
      //Call Azure Function to get the meeting link
      let res = await fetch(process.env.REACT_APP_FUNCTION_URL as string);
      let link = await res.text();
      setTeamsMeetingLink(link);
      console.log('Teams meeting link', link);
    }
    getTeamsMeetingLink();
  }, []);

  useEffect(() => {
    const createCallAdapter = async () => {
      const args = {
        userId: { communicationUserId: userId },
        displayName: 'Guest',
        credential,
        locator: { meetingLink: teamsMeetingLink }
      };
      const adapter = await createAzureCommunicationCallAdapter(args);
      setAdapter(adapter);
    }

    if (userId && teamsMeetingLink && credential) {
      createCallAdapter();
    }
  }, [userId, teamsMeetingLink, credential]); // When all have values create the call adapter

  if (adapter) {
    return (
      <div>
        <h1>Contact Customer Care</h1>
        <div className="wrapper">
          <CallComposite
            adapter={adapter}
          />
        </div>
      </div>
    );
  }
  if (credential === undefined) {
    return <>Failed to construct credential. Provided token is malformed.</>;
  }
  return <>Initializing...</>;
};

export default App;

// import React, { useEffect, useState } from 'react';
// import { Call, CallAgent, CallClient, Features } from '@azure/communication-calling';
// import { AzureCommunicationTokenCredential } from '@azure/communication-common';
// import './App.css';

// const App = () => {
//   // Represents the ACS --> Teams Meeting call and call state
//   const [call, setCall] = useState<Call>();
//   const [callState, setCallState] = useState('--');

//   // Represents the call agent to allow us to join a call
//   const [callAgent, setCallAgent] = useState<CallAgent>();

//   // Handle UI states
//   const [callInProgress, setCallInProgress] = useState(false);
//   const [teamsMeetingLink, setTeamsMeetingLink] = useState<string>();
//   const [recordingState, setRecordingState] = useState('');

//   const getTeamsMeetingLink =  async () => {
//     //Call Azure Functions to get the meeting link
//     setCallState('Getting meeting information...');
//     let res = await fetch('http://localhost:7071/api/TeamsMeetingFunction');
//     let text = await res.text();
//     console.log('Teams meeting link', text);
//     setCallState('Meeting information retrieved...');
//     //Set the meeting link
//     setTeamsMeetingLink(text);
//   };

//   const hangup = async () => {
//     if (call) {
//       await call.hangUp();
//       setCallState('--');
//       setCallInProgress(false);
//     }
//   }

//   useEffect(() => {
//     const joinTeamsMeeting = async () => {
//       // Join the call
//       if (callAgent && teamsMeetingLink) {
//         const currentCall = callAgent.join({ meetingLink: teamsMeetingLink }, {});
//         setCall(currentCall);
//       }
//     }
//     joinTeamsMeeting();
//   }, [callAgent, teamsMeetingLink]);

//   useEffect(() => {
//     if (call) {
//       call.on('stateChanged', () => {
//         setCallState(call.state);
//       });
//       call.feature(Features.Recording).on('isRecordingActiveChanged', () => {
//         if (call.feature(Features.Recording).isRecordingActive) {
//             setRecordingState('This call is being recorded');
//         }
//         else {
//           setRecordingState('');
//         }
//       });
//       setCallInProgress(true);
//     }
//   } , [call]);

//   useEffect(() => {
//     const init = async() => {
//       const callClient = new CallClient();
//       // Get a token from the Azure Portal. Go to ACS Resource --> `Identities & User Access Tokens`, select the
//       // Voice and video calling (VOIP) checkbox and copy the User Access token value below
//       const tokenCredential = new AzureCommunicationTokenCredential(process.env.REACT_APP_ACS_TOKEN as string);
//       try {
//         const agent = await callClient.createCallAgent(tokenCredential, { displayName: 'ACS External User' });
//         setCallAgent(agent);
//       }
//       catch (error) {
//         console.log(error);
//       }
//     };

//     init();

//   } , []);

//   return (
//     <div className="App">
//       <h1>Using Azure Communication Services to Call into a Teams Meeting</h1>
//       {/* <h3>Teams meeting link</h3>
//       <button type="button" onClick={getTeamsMeetingLink}>Talk to an agent</button>
//       <br /><br /> */}
//       <div className="button-container">
//         <button type="button" disabled={callInProgress} onClick={getTeamsMeetingLink}>
//           Join Meeting
//         </button>
//         <button type="button" disabled={!callInProgress} onClick={hangup}>
//           Hang Up
//         </button>
//       </div>
//       <br />
//       <div><span>{recordingState}</span></div>
//       <div>Call state <span>{callState}</span></div>
//     </div>
//   );
// }

// export default App;
