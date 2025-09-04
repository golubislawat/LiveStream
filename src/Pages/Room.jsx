import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';


export default function App() {
  const { roomID } = useParams();
  const location = useLocation();
  const containerRef = useRef(null);

  //Get role from URL query string
  const queryParams = new URLSearchParams(location.search);
  const role_str = queryParams.get("role") || "Audience";
  const role =
    role_str === 'Host'
      ? ZegoUIKitPrebuilt.Host
      : role_str === 'Cohost'
        ? ZegoUIKitPrebuilt.Cohost
        : ZegoUIKitPrebuilt.Audience;

  let sharedLinks = [];
  if (role === ZegoUIKitPrebuilt.Host || role === ZegoUIKitPrebuilt.Cohost) {
    sharedLinks.push({
      name: 'Join as co-host',
      url:
        window.location.protocol + '//' +
        window.location.host + window.location.pathname +
        '?roomID=' +
        roomID +
        '&role=Cohost',
    });
  }
  sharedLinks.push({
    name: 'Join as audience',
    url:
      window.location.protocol + '//' +
      window.location.host + window.location.pathname +
      '?roomID=' +
      roomID +
      '&role=Audience',
  });
  // generate Kit Token
  const appID = 1948529655;
  const serverSecret = "7a0fb15fbfa9e111943aa73804b7d7bb";
  const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID, 
    serverSecret, 
    roomID, 
    Date.now().toString(),
    role
    );
  // start the call
  useEffect(() => {
    if (!roomID || !containerRef.current) return;
    let zp;
    let myMeeting = async (element) => {
      // Create instance object from Kit Token.
      zp = ZegoUIKitPrebuilt.create(kitToken);
      // start the call
      zp.joinRoom({
        container: element,
        scenario: {
          mode: ZegoUIKitPrebuilt.LiveStreaming,
          config: {
            role,
          },
        },
        sharedLinks,
      });
    };
    myMeeting(containerRef.current);
    return () => {
      if (zp) {
        zp.destroy();
      }
    }
  }, [roomID, kitToken])

  return (
    <div
      className="myCallContainer"
      ref={containerRef}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
}