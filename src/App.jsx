import { useState } from 'react'
import { useCookies } from 'react-cookie'
import './App.css'
// import './index.css'
import Login from './Routes/Login'
import SignUp from './Routes/SignUp'
import SpotifyWebApi from 'spotify-web-api-js'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import Home from './Routes/Home'
import LoggedInHome from './Routes/LoggedInHome'
import UploadSong from './Routes/UploadSong'
import MyMusic from './Routes/MyMusic'
import songContext from './contexts/songContext'
import Search from './Routes/Search'
import Library from './Routes/Library'
import SinglePlaylistView from './Routes/SinglePlaylistView'
import DeezerPlayer from './utils/WebPlayback'
import Spotify from './utils/spotify'



const spotify = new SpotifyWebApi();

function App() {

  const [cookie, setCookie] = useCookies(["token"])
  const [currentSong, setCurrentSong] = useState(null)
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [isPaused, setIsPaused] = useState(true);

  return (
    <div className='w-screen h-screen font-poppins'>
      <Router>
        {
          cookie.token ? (
            //logged in routes
            <songContext.Provider value={{ currentSong, setCurrentSong, soundPlayed, setSoundPlayed, isPaused, setIsPaused }}>
              <Routes>
                <Route exact path="/home" element={<LoggedInHome />} />
                <Route exact path="/uploadSong" element={<UploadSong />} />
                <Route exact path="/search" element={<Search />} />
                <Route exact path="/library" element={<Library />} />
                <Route exact path="/playlist/:playlistId" element={<SinglePlaylistView />} />
                <Route exact path="/myMusic" element={<MyMusic />} />
                <Route exact path="/spotify" element={<DeezerPlayer />} />
                
                <Route path="*" element={<Navigate to="/home" />}></Route>
              </Routes>
            </songContext.Provider>
          ) :
            (
              //logged out routes
              <Routes>
                <Route exact path="/slogin" element={<Spotify />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<SignUp />} />
                <Route exact path="/home" element={<Home />} />
                <Route path="*" element={<Navigate to="/login" />}></Route>
              </Routes>)
        }
      </Router>
    </div>
  )
}

export default App
