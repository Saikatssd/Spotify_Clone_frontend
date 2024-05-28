import React, { useEffect } from 'react'
import { makeAuthenticatedGETRequest } from '../utils/serverHelper';


export default function AddToPlaylistModal({ closeModal, addSongToPlaylist }) {

    const [myPlaylists, setMyPlaylists] = React.useState([]);

    useEffect(() => {
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest("/playlist/get/me");
            setMyPlaylists(response.data);
            // console.log(response.data);
        }
        getData();
    }, []);


    return (
        <div className='absolute bg-black w-screen h-screen bg-opacity-50 flex justify-center items-center' onClick={closeModal}>
            <div className="bg-app-black  w-1/3 p-8 rounded-md " onClick={(e) => { e.stopPropagation() }}>
                <div className='text-white mb-5 font-semibold text-lg'>
                    Select Playlist
                </div>
                <div className='space-y-4 flex flex-col justify-center items-center'>
                    {
                        myPlaylists.map((item) => {
                            return (
                                <PlaylistComponent
                                    // key={JSON.stringify(item)}
                                    info={item}
                                    addSongToPlaylist={addSongToPlaylist}
                                />
                            );
                        })}
                </div>
            </div>
        </div>
    )
}

const PlaylistComponent = ({ info,addSongToPlaylist }) => {
    return (
        <div className='bg-app-black w-full flex items-center space-x-4  hover:bg-gray-400 hover:bg-opacity-20 rounded-sm cursor-pointer p-3' onClick={()=>{addSongToPlaylist(info._id)}}>
            <div>
                <img src={info.thumbnail} alt="thumbnail" className='w-10 h-10 rounded' />
            </div>
            <div className='text-white font-semibold text-sm '>{info.name}</div>
        </div>
    );
};
