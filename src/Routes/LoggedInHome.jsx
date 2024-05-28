import React from 'react'
import { Howl, Howler } from "howler";
import { Icon } from '@iconify/react';
import IconText from '../components/shared/IconText';
import TextWithHover from '../components/shared/TextWithHover';
import LoggedinContainer from '../containers/LoggedinContainer';
import SingleSongCard from '../components/shared/SingleSongCard';

const focusCardsData = [
  {
    title: "Peaceful Piano",
    description: "Relax and indulge with beautiful piano pieces",
    imgUrl: "/pexels.jpeg"
  },
  {
    title: "Deep Focus",
    description: "Keep calm and focus with this music",
    imgUrl: "/Kesariya.PNG"
  },
  {
    title: "Instrumental Study",
    description: "Focus with soft study music in the background.",
    imgUrl: "/Khuda-Jane.PNG"
  },
  {
    title: "Focus Flow",
    description: "Up tempo instumental hip hop beats",
    imgUrl: "/Rasiya.PNG"
  },
  {
    title: "Beats to think to",
    description: "Focus with indulge deep techno  and tech house.",
    imgUrl: "/Sajna.PNG",
  }
]

const spotifyPlaylistCardData = [
  {
    title: "This is the one",
    description: "Relax and indulge with beautiful piano pieces",
    imgUrl: "/pexels.jpeg"
  },
  {
    title: "Kesariya",
    description: "Keep calm and focus with this music",
    imgUrl: "/Kesariya.PNG"
  },
  {
    title: "Khuda Jane",
    description: "Focus with soft study music in the background.",
    imgUrl: "/Khuda-Jane.PNG"
  },
  {
    title: "Rasiya",
    description: "Up tempo instumental hip hop beats",
    imgUrl: "/Rasiya.PNG"
  },
  {
    title: "Sajna",
    description: "Focus with indulge deep techno  and tech house.",
    imgUrl: "/Sajna.PNG",
  }
]


const recentCardData = [
  {
    imgUrl: "https://i.scdn.co/image/ab67706c0000da8470d229cb865e8d81cdce0889",
    title: "Liked Songs"
  },
  {
    imgUrl: "https://images.indianexpress.com/2021/05/arijit-singh-1200.jpg",
    title: "Arijit Singh"
  },
  {
    imgUrl: "https://static.toiimg.com/photo/msid-86773991/86773991.jpg",
    title: "Anupam Roy"
  },
  {
    imgUrl: "https://m.media-amazon.com/images/M/MV5BYWZmY2MzYzAtMjc4My00YmMyLThjZmItMDkxZGM1NjU1NzcxL2ltYWdlXkEyXkFqcGdeQXVyNTI5NjIyMw@@._V1_.jpg",
    title: "The Chainsmokers"
  },
  {
    imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQevh0B-xizkct_WVWUnrQKpRhKgBAl0NSpww&usqp=CAU",
    title: "Shreya Ghosal"
  },
  {
    imgUrl: "https://lyrics.soniyal.com/wp-content/uploads/2020/09/Armaan-Malik-Singer.jpg",
    title: "Armaan Mallik"
  }
]


export default function LoggedInHome() {
  return (
    <LoggedinContainer currActiveScreen={"home"}>
      <RecentPlaylist info={recentCardData} titleText={"Good evening"} />
      <PlaylistView titleText="Focus" cardsData={focusCardsData} />
      <PlaylistView titleText="Spotify Playlists" cardsData={spotifyPlaylistCardData} />
      <PlaylistView titleText="Sound of India" cardsData={focusCardsData} />
    </LoggedinContainer>
  )
}

const PlaylistView = ({ titleText, cardsData }) => {
  return (
    <div className='text-white mt-5'>
      <div className="text-2xl font-semibold mb-5">{titleText}</div>
      <div className="w-full flex flex-wrap md:flex-nowrap justify-center sm:justify-between  sm:space-x-4">
        {
          //cardsData will be an array
          cardsData.map((item) => {
            return (
              <Card
                title={item.title}
                description={item.description}
                imgUrl={item.imgUrl}
              />
            )
          })}
      </div>
    </div>
  )
};

const Card = ({ title, description, imgUrl }) => {
  return (
    <div className='bg-black bg-opacity-40 p-4 w-5/12 md:w-1/5 rounded-md m-3'>
      <div>
        <img className="w-full rounded-lg py-4" src={imgUrl} alt="" />
      </div>
      <div className='text-white text font-semibold py-3'>{title}
      </div>
      <div className="text-gray-500 text-sm">{description}</div>
    </div>
  )
};

const RecentPlaylist = ({ info, titleText }) => {
  return (
    <div>
      <div className="text-white text-3xl font-semibold mb-5 hidden lg:flex">{titleText}</div>
      <div className=' flex flex-wrap items-center justify-center' >

        {
          info.map((item) => {
            return (
              <RecentCard title={item.title}
                imgUrl={item.imgUrl} />
            )
          })
        }

      </div>
    </div>
  );
};
const RecentCard = ({ title, imgUrl }) => {
  return (
    <div className='bg-gray-600 w-1/4 bg-opacity-40 rounded-md flex items-center m-2 cursor-pointer  hover:bg-gray-400 hover:bg-opacity-20'>
      <div className='mr-5 '>
        <img className="w-16 h-16 rounded-l-md" src={imgUrl} alt="" />
      </div>
      <div className='text-white text font-semibold'>{title}
      </div>
      <div className='mx-1'>
        <Icon icon="carbon:play-filled" className='ml-auto' fontSize={40} color='green' />
      </div>
    </div>
  )
};