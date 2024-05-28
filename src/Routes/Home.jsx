import React from 'react'
import LoggedinContainer from '../containers/LoggedinContainer';
import { Icon } from '@iconify/react';
import IconText from '../components/shared/IconText';
import TextWithHover from '../components/shared/TextWithHover';

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


// export default function Home() {
//   return (
//     <LoggedinContainer>

//     </LoggedinContainer>
//   )
// }


export default function Home() {
  return (
    <div className='h-full w-full flex'>
      {/* This is left panel */}
      <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
        <div>
          <div className="logoDiv p-6">
            <Icon icon="logos:spotify" width="120" />
          </div>
          <div className='py-5'>
            <IconText iconName={"material-symbols:home"} displayText={"Home"} active />
            <IconText iconName={"material-symbols:search-rounded"} displayText={"Search"} />
            <IconText iconName={"icomoon-free:books"} displayText={"Library"} />
          </div>
          <div className='pt-5'>
            <IconText iconName={"material-symbols:add-box"} displayText={"Create Playlist"} />
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
      <div className="h-full w-4/5 bg-app-black overflow-auto">
        <div className="navbar w-full h-1/10 bg-black bg-opacity-30 flex items-center justify-end">
          <div className="w-1/2 h-full flex ">
            <div className="w-3/5 flex justify-around items-center">

              <TextWithHover displayText={"Premium"} />
              <TextWithHover displayText={"Support"} />
              <TextWithHover displayText={"Download"} />
              <div className="h-1/2 border-r border-white"></div>
            </div>
            <div className="w-2/5 flex justify-around h-full items-center">
              <TextWithHover displayText={"Sign up"} />
              <div className="bg-white h-2/3 px-8 flex items-center justify-center rounded-full font-semibold cursor-pointer" onClick={()=>{}}>
                Log in
              </div>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="content p-8 overflow-auto pt-0">
          <PlaylistView titleText="Focus" cardsData={focusCardsData} />
          <PlaylistView titleText="Spotify Playlists" cardsData={spotifyPlaylistCardData} />
          <PlaylistView titleText="Sound of India" cardsData={focusCardsData} />
        </div>
      </div>
    </div>
  )
};

const PlaylistView = ({ titleText, cardsData }) => {
  return (
    <div className='text-white mt-8'>
      <div className="text-2xl font-semibold mb-5">{titleText}</div>
      <div className="w-full flex justify-between space-x-4">
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
          })};
      </div>
    </div>
  )
};

const Card = ({ title, description, imgUrl }) => {
  return (
    <div className='bg-black bg-opacity-40 p-4 w-1/5 rounded-md'>
      <div>
        <img className="w-full rounded-lg py-4" src={imgUrl} alt="" />
      </div>
      <div className='text-white text font-semibold py-3'>{title}
      </div>
      <div className="text-gray-500 text-sm">{description}</div>
    </div>
  )
};