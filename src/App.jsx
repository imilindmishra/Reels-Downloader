import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [videoUrl, setVideoUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [videoData, setVideoData] = useState('')
  const [Thumbnail, setThumbnail] = useState('')
  const [videoQuality, setVideoQuality] = useState('')
  const [videoDownloadURL, setvideoDownloadURL] = useState("");
  
  const getApidata = async () => {
    const options = {
      method: 'GET',
      url: 'https://social-media-video-downloader.p.rapidapi.com/smvd/get/instagram',
      params: {
        url: videoUrl,
        filename: 'download'
      },
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'social-media-video-downloader.p.rapidapi.com'
      }
    };

  
    try {
      setIsLoading(true);
      const response = await axios.request(options);
      setVideoData(response.data);
      setThumbnail(response.data.picture);
      const [{ quality, link }] = response.data.links;
      setVideoQuality(quality);
      setvideoDownloadURL(link);
      setIsLoading(false);
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="App">
      <h1>Insta Reels Downloader</h1>
      <input
        type="text"
        placeholder="Enter video URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
      />
      <button onClick={getApidata}>Get Video</button>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something went wrong. Please try again later.</p>}
      {videoData && (
        <div>
          <img src={Thumbnail} alt="thumbnail" />
          <p>Quality: {videoQuality}</p>
          <a href={videoDownloadURL} download>
            Download
          </a>
        </div>
      )}
    </div>
  )
}

export default App
