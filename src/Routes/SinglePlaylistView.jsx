import React, { useEffect } from 'react'
import LoggedinContainer from '../containers/LoggedinContainer'
import { useParams } from 'react-router-dom'
import { makeAuthenticatedGETRequest } from '../utils/serverHelper';
import SingleSongCard from '../components/shared/SingleSongCard';

export default function SinglePlaylistView() {
    const [playlistDetails, setPlaylistDetails] = React.useState({});
    const { playlistId } = useParams();
    useEffect(() => {
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest("/playlist/get/playlist/" + playlistId);
            setPlaylistDetails(response)
        };
        getData();
    }, []);

    return (
        <LoggedinContainer currActiveScreen={"library"}>
            {
                playlistDetails._id && (
                    <div>
                        <div className='text-white text-xl pt-8'>{playlistDetails.name}</div>
                        <div className='pt-10 space-y-3'>
                            {playlistDetails.songs.map(item => {
                        return <SingleSongCard info={item} key={JSON.stringify(item)}
                        playSound={() => { }} />
                    })}
                        </div>
                       
                    </div>
                )
            }
        </LoggedinContainer>
    )
}
