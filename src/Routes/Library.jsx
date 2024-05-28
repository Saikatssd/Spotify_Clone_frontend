// import React, { useEffect } from 'react'
// import LoggedinContainer from '../containers/LoggedinContainer';
// import { makeAuthenticatedGETRequest } from '../utils/serverHelper';
// import { useNavigate } from 'react-router-dom';

// export default function Library() {

//     const [myPlaylists, setMyPlaylists] = React.useState([]);

//     useEffect(() => {
//         const getData = async () => {
//             const response = await makeAuthenticatedGETRequest("/playlist/get/me");
//             setMyPlaylists(response.data);
//         }
//         getData();
//     }, []);

//     return (

//         <LoggedinContainer currActiveScreen={"library"} >
//             <div className='text-white text-xl pt-8'>My Playlists</div>
//             <div className='py-5 grid gap-5 grid-cols-5'>
//                 {
//                     myPlaylists.map((item) => {
//                         return (
//                             <Card
//                                 key={JSON.stringify(item)}
//                                 title={item.name}
//                                 description=""
//                                 imgUrl={item.thumbnail}
//                                 playlistId={item._id}
//                             />
//                         );
//                     })}
//             </div>
//         </LoggedinContainer>

//     )
// }


// const Card = ({ title, description, imgUrl,playlistId }) => {
//     const navigate = useNavigate();
//     return (
//         <div className='bg-black bg-opacity-40 p-4 w-full rounded-md cursor-pointer' onClick={()=>{navigate("/playlist/"+ playlistId)}}>
//             <div>
//                 <img className="w-full rounded-lg py-4" src={imgUrl} alt="" />
//             </div>
//             <div className='text-white text font-semibold py-3'>{title}
//             </div>
//             <div className="text-gray-500 text-sm">{description}</div>
//         </div>
//     )
// };

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MusicPlayer = () => {
  const [trackList, setTrackList] = useState([]);

  useEffect(() => {
    fetchTracks();
  }, []);

  const fetchTracks = async () => {
    try {
      const response = await axios.get(
        'https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0/tracks'
      );
      setTrackList(response.data.data);
    } catch (error) {
      console.error('Error fetching tracks:', error);
    }
  };

  return (
    <div>
      <h1>Deezer Music Player</h1>
      <ul>
        {trackList.map(track => (
          <li key={track.id}>{track.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default MusicPlayer;
