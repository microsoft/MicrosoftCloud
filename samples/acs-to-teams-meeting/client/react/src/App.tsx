import React, { useEffect, useState } from 'react';
import { Call, CallAgent, CallClient, Features } from '@azure/communication-calling';
import { AzureCommunicationTokenCredential } from '@azure/communication-common';
import './App.css';

const App = () => {
  // Represents the ACS --> Teams Meeting call and call state
  const [call, setCall] = useState<Call>();
  const [callState, setCallState] = useState('--');

  // Represents the call agent to allow us to join a call
  const [callAgent, setCallAgent] = useState<CallAgent>();

  // Handle UI states
  const [callInProgress, setCallInProgress] = useState(false);
  const [teamsMeetingLink, setTeamsMeetingLink] = useState<string>();
  const [recordingState, setRecordingState] = useState('');

  const getTeamsMeetingLink =  async () => {
    //Call Azure Functions to get the meeting link
    setCallState('Getting meeting information...');
    let res = await fetch('http://localhost:7071/api/TeamsMeetingFunction');
    let text = await res.text();
    console.log('Teams meeting link', text);
    setCallState('Meeting information retrieved...');
    //Set the meeting link
    setTeamsMeetingLink(text);
  };

  const hangup = async () => {
    if (call) {
      await call.hangUp();
      setCallState('--');
      setCallInProgress(false);
    }
  }

  useEffect(() => {
    const joinTeamsMeeting = async () => {
      // Join the call
      if (callAgent && teamsMeetingLink) {
        const currentCall = callAgent.join({ meetingLink: teamsMeetingLink }, {});
        setCall(currentCall);
      }
    }
    joinTeamsMeeting();
  }, [callAgent, teamsMeetingLink]);

  useEffect(() => {
    if (call) {
      call.on('stateChanged', () => {
        setCallState(call.state);
      });
      call.feature(Features.Recording).on('isRecordingActiveChanged', () => {
        if (call.feature(Features.Recording).isRecordingActive) {
            setRecordingState('This call is being recorded');
        }
        else {
          setRecordingState('');
        }
      });
      setCallInProgress(true);
    }
  } , [call]);

  useEffect(() => {
    const init = async() => {
      const callClient = new CallClient();
      // Get a token from the Azure Portal. Go to ACS Resource --> `Identities & User Access Tokens`, select the
      // Voice and video calling (VOIP) checkbox and copy the User Access token value below
      const tokenCredential = new AzureCommunicationTokenCredential('eyJhbGciOiJSUzI1NiIsImtpZCI6IjEwNiIsIng1dCI6Im9QMWFxQnlfR3hZU3pSaXhuQ25zdE5PU2p2cyIsInR5cCI6IkpXVCJ9.eyJza3lwZWlkIjoiYWNzOjM5OTRhMjJhLWIwMjEtNDM2OS1hMGUyLWY5YjBjZDJjN2E1Ml8wMDAwMDAxMy1mYzcyLWEzNTQtMGQ4Yi0wODQ4MjIwMGU3MmMiLCJzY3AiOjE3OTIsImNzaSI6IjE2NjM3MDUzNDkiLCJleHAiOjE2NjM3OTE3NDksImFjc1Njb3BlIjoidm9pcCIsInJlc291cmNlSWQiOiIzOTk0YTIyYS1iMDIxLTQzNjktYTBlMi1mOWIwY2QyYzdhNTIiLCJpYXQiOjE2NjM3MDUzNDl9.hpuaXjjmn2Jao3m-K9hclTp5cWFGQiLU0xxeks6oBDyAc2UrbHWXrDHiIKpX_TaKNi-pUW-tNFsmJFna6wp71U5jSkwEzZdphM9q1Eu17MCA_0GJvNyRUw4p6Uwnf3NFsW8Ponbiy2hLnHdkHA7hPLHaItsp5CfEWSlHeJFcwKex2ib2IdS6_iOqIq4M9UhOvS2nTAmeM7ipEsRzRC340LnKwK1YN4oOufcL4QHn90J1qjlulZH3Xe5PS70dM_IYIELUaDFTQ8NpkvH8aRZRw5ny8HaXDvwQs3hXFQrHVcsam0np29Er9uLfS8_8T28mbCCA8YwstW-SjDzjpWLh6Q');
      try {
        const agent = await callClient.createCallAgent(tokenCredential, { displayName: 'ACS External User' });
        setCallAgent(agent);
      }
      catch (error) {
        console.log(error);
      }
    };

    init();

  } , []);

  return (
    <div className="App">
      <h1>Using Azure Communication Services to Call into a Teams Meeting</h1>
      {/* <h3>Teams meeting link</h3>
      <button type="button" onClick={getTeamsMeetingLink}>Talk to an agent</button>
      <br /><br /> */}
      <div className="button-container">
        <button type="button" disabled={callInProgress} onClick={getTeamsMeetingLink}>
          Join Meeting
        </button>
        <button type="button" disabled={!callInProgress} onClick={hangup}>
          Hang Up
        </button>
      </div>
      <br />
      <div><span>{recordingState}</span></div>
      <div>Call state <span>{callState}</span></div>
    </div>
  );
}

export default App;
