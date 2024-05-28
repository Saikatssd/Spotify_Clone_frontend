import React from 'react'
import { useEffect } from 'react'
import { makeAuthenticatedGETRequest } from '../utils/serverHelper';
import SingleSongCard from '../components/shared/SingleSongCard';
import LoggedinContainer from '../containers/LoggedinContainer';



export default function MyMusic() {

    const [songData, setSongData] = React.useState([]);

    useEffect(() => {
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest("/song/get/mysongs");
            setSongData(response.data);
        }
        getData();
    }, [])

    return (
        <LoggedinContainer currActiveScreen={"myMusic"}>
            <div className='text-white text-xl font-semibold pb-4 pl-2 pt-8'>
                My Songs
            </div>
            <div className='space-y-3 overflow-auto'>
                {songData.map((item) => {
                    return <SingleSongCard info={item} playSound={()=>{}} />
                })}

            </div>
        </LoggedinContainer>
    )
}

// export default function MyMusic() {

//     const [songData, setSongData] = React.useState([]);
//     const [soundPlayed, setSoundPlayed] = React.useState(null);

//     const playSound = (songSrc) => {
//         if (soundPlayed) {
//             soundPlayed.stop();
//         }
//         var sound = new Howl({
//             src: [songSrc],
//             html5: true,
//         });
//         setSoundPlayed(sound);
//         sound.play();
//     };

//     useEffect(() => {
//         const getData = async () => {
//             const response = await makeAuthenticatedGETRequest("/song/get/mysongs");
//             setSongData(response.data);
//         }
//         getData();
//     }, [])

//     return (
//         <div className='h-full w-full flex'>
//             {/* This is left panel */}
//             <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
//                 <div>
//                     <div className="logoDiv p-6">
//                         <Icon icon="logos:spotify" width="120" />
//                     </div>
//                     <div className='py-5'>
//                         <IconText iconName={"material-symbols:home"} displayText={"Home"} />
//                         <IconText iconName={"material-symbols:search-rounded"} displayText={"Search"} />
//                         <IconText iconName={"icomoon-free:books"} displayText={"Library"} />
//                         <IconText iconName={"material-symbols:library-music-sharp"} active displayText={"My Music"} />
//                     </div>
//                     <div className='pt-5'>
//                         <IconText iconName={"material-symbols:add-box"} displayText={"Create Playlist"} />
//                         <IconText iconName={"mdi:cards-heart"} displayText={"Liked Songs"} />
//                     </div>
//                 </div>
//                 <div className="px-5">
//                     <div className="border border-gray-400 text-white w-2/5 flex items-center justify-center px-2 py-1 rounded-full cursor-pointer hover:border-white">
//                         <Icon icon="carbon:earth-europe-africa" />
//                         <div className="ml-2 text-sm font-semibold">English</div>
//                     </div>
//                 </div>

//             </div>
//             {/* This is Right Panel */}
//             <div className="h-full w-4/5 bg-app-black overflow-auto">
//                 <div className="navbar w-full h-1/10 bg-black bg-opacity-30 flex items-center justify-end">
//                     <div className="w-1/2 h-full flex ">
//                         <div className="w-3/5 flex justify-around items-center">

//                             <TextWithHover displayText={"Premium"} />
//                             <TextWithHover displayText={"Support"} />
//                             <TextWithHover displayText={"Download"} />
//                             <div className="h-1/2 border-r border-white"></div>
//                         </div>
//                         <div className="w-2/5 flex justify-around h-full items-center">
//                             <TextWithHover displayText={"Upload Song"} />
//                             <div className="bg-white h-10 w-10 p-3  flex items-center justify-center rounded-full font-semibold cursor-pointer">
//                                 SSD
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 {/* Main Content */}
//                 <div className="content p-8  overflow-auto">
//                     <div className='text-white text-xl font-semibold pb-4 pl-2'>
//                         My Songs
//                     </div>
//                     <div className='space-y-3 overflow-auto'>
//                         {songData.map((item) => {
//                             return <SingleSongCard info={item} playSound={playSound} />
//                         })}

//                     </div>
//                 </div>

//             </div>
//         </div>
//     )
// };

