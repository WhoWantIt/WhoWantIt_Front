import YouTube, { YouTubeProps } from 'react-youtube';
import styled from 'styled-components';

const YouTubePlayer = ({ videoId }: { videoId: string }) => {
  const opts: YouTubeProps['opts'] = {
    playerVars: { autoplay: 0, rel: 0, modestbranding: 1 },
  };
  
  return (
    <ResponsiveVideoContainer>
      <YouTube videoId={videoId} opts={opts} />
    </ResponsiveVideoContainer>
  );
};

const ResponsiveVideoContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 비율 유지 */
  height: 0;
  overflow: hidden;
  background-color: #000;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export default YouTubePlayer;