import React, { useEffect, useState } from 'react';
import { Call, CallAgent, CallClient, Features } from '@azure/communication-calling';
import { AzureCommunicationTokenCredential } from '@azure/communication-common';
import './App.css';

const App = () => {
  // Represents the ACS --> Teams Meeting call and call state
  const [call, setCall] = useState<Call>();
  const [callState, setCallState] = useState('-');

  // Represents the call agent to allow us to join a call
  const [callAgent, setCallAgent] = useState<CallAgent>();

  // Handle UI states
  const [teamsJoinEnabled, setTeamsJoinEnabled] = useState(false);
  const [callInProgress, setCallInProgress] = useState(false);
  const [teamsMeetingLink, setTeamsMeetingLink] = useState<string>();
  const [recordingState, setRecordingState] = useState('');

  const joinTeamsMeeting = async () => {
    // Join the call
    if (callAgent && teamsMeetingLink) {
      const currentCall = callAgent.join({ meetingLink: teamsMeetingLink }, {});
      setCall(currentCall);
    }
  }

  const hangup = async () => {
    if (call) {
      await call.hangUp();
      setCallState('-');
      setCallInProgress(true);
      setTeamsJoinEnabled(true);
    }
  }

  const updateTeamsMeetingLink = (value: string) => {
    setTeamsMeetingLink(value);
    setTeamsJoinEnabled(value ? true : false);
  };

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
      setTeamsJoinEnabled(false);
      setCallInProgress(true);
    }
  } , [call]);

  useEffect(() => {
    const init = async() => {
      const callClient = new CallClient();
      // Get a token from the Azure Portal - ACS Resource - `Identities & User Access Tokens`
      const tokenCredential = new AzureCommunicationTokenCredential('USER ACCESS TOKEN');
      try {
        const agent = await callClient.createCallAgent(tokenCredential, { displayName: 'ACS External User' });
        setCallAgent(agent);
        setTeamsJoinEnabled(false);
      }
      catch (error) {
        console.log(error);
      }
    };

    init();

  } , []);

  return (
    <div className="App">
      <h1>Azure Communication Services to Teams Meeting</h1>
      <h3>Teams meeting link</h3>
      <input type="text" placeholder="Teams meeting link" onChange={(e) => updateTeamsMeetingLink(e.target.value)} />
      <div>Call state <span>{callState}</span></div>
      <div><span>{recordingState}</span></div>
      <div className="button-container">
        <button type="button" disabled={!teamsJoinEnabled} onClick={joinTeamsMeeting}>
          Join Teams Meeting
        </button>
        <button type="button" disabled={!callInProgress} onClick={hangup}>
          Hang Up
        </button>
      </div>
    </div>
  );
}

export default App;
