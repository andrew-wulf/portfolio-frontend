
import { useEffect } from "react";

import YouTube from "react-youtube";


export function VideoPlayer() {

  let id = 'dQw4w9WgXcQ';

  const opts = {
    height: '300',
    width: '400',
    playerVars: {
      color: 'white',
      origin: 'http://localhost:3000'
    },
  }


  let video = 'https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1&origin=http://localhost:3000'

  let testFrame = <iframe id='player' type='text/html' className='video-player' allow="fullscreen"
                    title='Youtube player'
                    src={`https://www.youtube.com/embed/${id}?enablejsapi=1&origin=http://localhost:5173&color=white`}>
                  </iframe>


  return (
    <>
      {testFrame}
    </>
  )
}