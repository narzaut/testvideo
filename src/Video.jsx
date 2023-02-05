import React, { useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.min.css';
const VideoPlayer = ({ magnetUri }) => {
  const playerRef = useRef(null);

  const options = {
    sources: [{
      src: magnetUri,
      type: 'application/x-bittorrent'
    }]
  };

  React.useEffect(() => {
    setTimeout(() => { 
        playerRef.current = videojs('my-player', options, function onPlayerReady() {
            videojs.log('Your player is ready!');
          
            // In this context, `this` is the player that was created by Video.js.
            this.play();
          
            // How about an event listener?
            this.on('ended', function() {
              videojs.log('Awww...over so soon?!');
            });
          });
    }, 1000);
    return () => {
      playerRef.current.dispose();
    };
  }, [options]);

  return (
    <div>
      <div data-vjs-player>
        <video id='my-player' ref={playerRef} className="video-js"></video>
        <script src="https://unpkg.com/video.js@7.10.2/dist/video.min.js"></script>

      </div>
    </div>
  );
};

export default VideoPlayer;