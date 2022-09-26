import { AzureCommunicationTokenCredential, CommunicationUserIdentifier } from '@azure/communication-common';
import {  CallComposite, fromFlatCommunicationIdentifier, useAzureCommunicationCallAdapter } from '@azure/communication-react';
import React, { useState, useMemo, useEffect } from 'react';
import './App.css';

const App = () => { 
  const displayName = 'Guest'
  const userId = process.env.REACT_APP_ACS_USER_ID as string;
  const token = process.env.REACT_APP_ACS_TOKEN as string;
  const [teamsMeetingLink, setTeamsMeetingLink] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const credential = useMemo(() => new AzureCommunicationTokenCredential(token), [token]);

  const callAdapterArgs = useMemo(() => 
    ({
      userId: fromFlatCommunicationIdentifier(userId) as CommunicationUserIdentifier,
      displayName,
      credential,
      locator: { meetingLink: teamsMeetingLink },
    }),
    [userId, credential, displayName, teamsMeetingLink]
  );

  const callAdapter = useAzureCommunicationCallAdapter(callAdapterArgs);

  useEffect(() => {
    const getTeamsMeetingLink = async () => {
      setMessage('Getting Teams meeting link...');
      //Call Azure Function to get the meeting link
      let res = await fetch(process.env.REACT_APP_FUNCTION_URL as string);
      let link = await res.text();
      setTeamsMeetingLink(link);
      setMessage('');
      console.log('Teams meeting link', link);
    }
    getTeamsMeetingLink();
  }, []);

  if (callAdapter) {
    return (
      <div>
        <h1>Contact Customer Service</h1>
        <div className="wrapper">
          <CallComposite
            adapter={callAdapter}
          />
        </div>
      </div>
    );
  }
  if (!credential) {
    return <>Failed to construct credential. Provided token is malformed.</>;
  }
  if (message) {
    return <div>{message}</div>;
  }
  return <div>Initializing...</div>;
};

export default App;