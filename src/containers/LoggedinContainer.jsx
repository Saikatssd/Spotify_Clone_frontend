import React, { useContext, useEffect, useLayoutEffect, useRef } from 'react'
import { Howl, Howler } from "howler";
import { useCookies, Cookies } from 'react-cookie'
import { Icon } from '@iconify/react';
import IconText from '../components/shared/IconText';
import TextWithHover from '../components/shared/TextWithHover';
import songContext from '../contexts/songContext';
import CreatePlaylistModal from '../modals/CreatePlaylistModal';
import AddToPlaylistModal from '../modals/AddToPlaylistModal';
import { makeAuthenticatedPOSTRequest } from '../utils/serverHelper';



export default function LoggedinContainer({ children, currActiveScreen }) {

    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const [CreatePlaylistModalOpen, setCreatePlaylistModalOpen] = React.useState(false);
    const [addToPlaylistModalOpen, setAddToPlaylistModalOpen] = React.useState(false);

    const { currentSong, setCurrentSong, soundPlayed, setSoundPlayed, isPaused, setIsPaused } = useContext(songContext);

    const firstUpdate = useRef(true);
    useLayoutEffect(() => {
        //The following if statement will prevent the useEffect from running on the first render.
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        if (!currentSong) {
            return;
        }
        changeSong(currentSong.track);
    }, [currentSong && currentSong.track]);

    //Add song to playlist
    const addSongToPlaylist = async (playlistId) => {
        const songId = currentSong._id;
        const payload = { playlistId, songId }
        console.log(payload)
        const response = await makeAuthenticatedPOSTRequest("/playlist/add/song", payload);
        // console.log(response)
        if (response._id) {
            setAddToPlaylistModalOpen(false);
        }
    }

    const playSound = () => {
        if (!soundPlayed) {
            return;
        }
        soundPlayed.play();
    }

    const changeSong = (songSrc) => {
        if (soundPlayed) {
            soundPlayed.stop();
        }
        var sound = new Howl({
            src: [songSrc],
            html5: true,
        });
        setSoundPlayed(sound);
        sound.play();
        setIsPaused(false);
    };
    const pauseSound = () => {
        soundPlayed.pause();
    };

    const togglePlayPause = () => {
        if (isPaused) {
            playSound(currentSong.track);
            setIsPaused(!isPaused);
        }
        else {
            pauseSound();
            setIsPaused(!isPaused);

        }
    }

    // Logout Function
    const logout = () => {
        removeCookie('token');
        window.location.href = '/';
        return false;
    };


    return (
        <div className='h-full w-full bg-app-black'>

            {/* //Create playlist section */}
            {CreatePlaylistModalOpen && <CreatePlaylistModal closeModal={() => { setCreatePlaylistModalOpen(false) }} />}

            {/* //Add playlist section */}

            {addToPlaylistModalOpen && <AddToPlaylistModal closeModal={() => { setAddToPlaylistModalOpen(false) }}
                addSongToPlaylist={addSongToPlaylist} />}

            <div className='h-9/10 lg:h-full w-full'>
                <div className={`${currentSong ? 'h-9/10' : 'h-full'} w-full flex`}>

                    {/* This is left panel */}
                    <div className="h-full w-1/5 bg-black hidden lg:flex flex-col justify-between pb-10">
                        <div>
                            <div className="logoDiv p-6">
                                <Icon icon="logos:spotify" width="120" />
                            </div>
                            <div className='py-5'>
                                <IconText iconName={"material-symbols:home"} displayText={"Home"} active={currActiveScreen == "home"}
                                    targetLink={"/home"} />
                                <IconText iconName={"material-symbols:search-rounded"} displayText={"Search"} targetLink={"/search"} active={currActiveScreen == "search"} />
                                <IconText iconName={"icomoon-free:books"} displayText={"Library"} active={currActiveScreen == "library"} targetLink={"/library"} />
                                <IconText iconName={"material-symbols:library-music-sharp"} displayText={"My Music"} targetLink={"/myMusic"} active={currActiveScreen == "myMusic"} />
                            </div>
                            <div className='pt-5'>
                                <IconText iconName={"material-symbols:add-box"} displayText={"Create Playlist"} onClick={() => { setCreatePlaylistModalOpen(true) }} />
                                <IconText iconName={"mdi:cards-heart"} displayText={"Liked Songs"} />
                            </div>
                        </div>
                        <div className="px-5">
                            <div className="border border-gray-400 text-white w-2/5 flex items-center justify-center px-2 py-1 rounded-full cursor-pointer hover:border-white">
                                <Icon icon="carbon:earth-europe-africa" />
                                <div className="ml-2 text-sm font-semibold">English</div>
                            </div>
                        </div>

                    </div>
                    {/* This is Right Panel */}
                    {/* Navbar */}

                    <div className="h-full w-full lg:w-4/5 bg-gradient-to-b from-indigo-900 via-gray-900 to-black  overflow-auto">

                        <div className='flex justify-between items-center sm:hidden p-3'>
                            <div className='text-white text-2xl font-bold p-3'>Good evening</div>
                            <div className='flex items-center space-x-5'>
                                <Icon icon="clarity:notification-line" fontSize={30}  color="gray-100" />
                                <Icon icon="mdi:recent" fontSize={30} color="gray-100"  />
                                <Icon icon="carbon:settings" fontSize={30}  color="gray-100" />
                            </div>
                        </div>
                        <div className="navbar w-full h-1/10 bg-black bg-opacity-30 hidden lg:flex items-center justify-end">
                            <div className="w-1/2 h-full flex ">
                                <div className="w-3/5 flex justify-around items-center">
                                    <TextWithHover displayText={"Premium"} />
                                    <TextWithHover displayText={"Support"} />
                                    <TextWithHover displayText={"Download"} />
                                    <div className="h-1/2 border-r border-white"></div>
                                </div>
                                <div className="w-2/5 flex justify-around h-full items-center">
                                    <TextWithHover displayText={"Upload Song"} active={currActiveScreen == "uploadSong"} targetLink={"/uploadSong"} />
                                    <div className="bg-white h-10 w-10 p-3  flex items-center justify-center rounded-full font-semibold cursor-pointer" onClick={logout}>
                                        SSD
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Main Content */}
                        <div className="content p-2 lg:p-8 overflow-auto pt-0">
                            {children}
                        </div>
                    </div>
                </div>
                {/* currentSong playing div */}

                {
                    currentSong &&
                    <div className='w-full h-1/10 bg-black bg-opacity-30 text-white flex items-center px-4'>
                        <div className='w-1/4 flex items-center'>

                            <img className='h-14 w-14 rounded' src={currentSong.thumbnail} alt="currentSongThumbnail" />
                            <div className='pl-4'>
                                <div className='text-sm hover:underline cursor-pointer'>{currentSong.name}</div>
                                <div className='text-xs text-gray-500 hover:underline cursor-pointer'>{currentSong.artist.firstName + " " + currentSong.artist.lastName}</div>
                            </div>
                        </div>
                        <div className='w-1/2 h-full flex flex-col justify-center items-center'>
                            <div className='flex w-1/3 justify-between items-center'>
                                {/* Controls  for playing Songs*/}
                                <Icon icon="ph:suffle-fill" fontSize={30} className='text-gray-500 hover:text-white' />
                                <Icon icon="mdi:skip-previous-outline" fontSize={27} className='text-gray-500 hover:text-white' />
                                <Icon icon={isPaused ? "ic:baseline-play-circle" : "ic:baseline-pause-circle"} fontSize={43} className='text-gray-500 hover:text-white'
                                    onClick={togglePlayPause} />
                                <Icon icon="mdi:skip-next-outline" fontSize={27} className='text-gray-500 hover:text-white' />
                                <Icon icon="ic:twotone-repeat" fontSize={27} className='text-gray-500 hover:text-white' />

                            </div>
                            <div></div>
                        </div>
                        <div className='w-1/4 flex justify-end pr-4 space-x-4 items-center'>
                            <Icon icon="ic:round-playlist-add" fontSize={30} className='cursor-pointer text-gray-500 hover:text-white' onClick={() => { setAddToPlaylistModalOpen(true) }} />
                            <Icon icon="ph-heart-bold" fontSize={27} className='cursor-pointer text-gray-500 hover:text-white' />
                        </div>
                    </div>
                }
            </div>
            <div className='bg-black bg-opacity-30 h-1/10 lg:hidden flex items-center justify-between'>
                <IconText iconName={"material-symbols:home"} active={currActiveScreen == "home"}
                    targetLink={"/home"} />
                <IconText iconName={"material-symbols:search-rounded"} targetLink={"/search"} active={currActiveScreen == "search"} />
                <IconText iconName={"icomoon-free:books"} active={currActiveScreen == "library"} targetLink={"/library"} />
                <IconText iconName={"material-symbols:library-music-sharp"} targetLink={"/myMusic"} active={currActiveScreen == "myMusic"} />
            </div>
        </div>
    )
};
