import { useState } from "react";
import axios from "axios";

const useYoutubeSearch = () => {
  const [playlists, SetPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

  const searchPlaylists = async (query = '', maxResults = 15) => {
    setLoading(true);
    setError(null);

    try{
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          type: 'playlist',
          maxResults,
          q: query || '아이돌 playlist',
          key: apiKey
        }
      });
      SetPlaylists(response.data.items);
    } catch(err){
      setError(err);
    } finally{
      setLoading(false);
    }
  };

  return {playlists, searchPlaylists, loading, error};
};

export default useYoutubeSearch;