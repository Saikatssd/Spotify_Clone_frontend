import React from 'react'
import TextInput from '../components/shared/TextInput';
import CloudinaryUpload from '../components/shared/CloudinaryUpload';
import { makeAuthenticatedPOSTRequest } from '../utils/serverHelper';
import { useNavigate } from 'react-router-dom';
import LoggedinContainer from '../containers/LoggedinContainer';


export default function UploadSong() {

    const [name, setName] = React.useState("");
    const [thumbnail, setThumbnail] = React.useState("");
    const [playlistUrl, setPlaylistUrl] = React.useState("");
    const [uploadedSongFileName, setUploadedSongFileName] = React.useState();
    const navigate = useNavigate();

    const submitSong = async () => {
        const data = { name, thumbnail, track: playlistUrl }
        const response = await makeAuthenticatedPOSTRequest("/song/create", data);
        if (response.err) {
            alert("Could not create song");
            return;
        }
        alert("Success");
        navigate("/home");
    }

    return (
        <LoggedinContainer currActiveScreen={"uploadSong"}>
            <div className="content p-8 pt-0 overflow-auto">
                <div className="text-2xl font-semibold mb-5 text-white mt-8">
                    Upload Your Music
                </div>
                <div className="w-2/3 flex space-x-3">
                    <div className="w-1/2">
                        <TextInput label="Name" labelClassName={"text-white"}
                            placeholder="Name"
                            value={name}
                            setValue={setName} />
                    </div>
                    <div className="w-1/2">
                        <TextInput label="Thumbnail" labelClassName={"text-white"}
                            placeholder="Thumbnail"
                            value={thumbnail}
                            setValue={setThumbnail} />
                    </div>
                </div>
                <div className='py-5'>
                    {uploadedSongFileName ? (
                        <div className='bg-white rounded-full p-3 w-1/3'>
                            {uploadedSongFileName.substring(0, 35)}....
                        </div>
                    ) : (

                        <CloudinaryUpload setUrl={setPlaylistUrl} setName={setUploadedSongFileName} />

                    )}
                </div>
                <div className="bg-white w-40 flex items-center justify-center p-4 rounded-full font-semibold cursor-pointer" onClick={submitSong}>
                    Submit Song
                </div>
            </div>
        </LoggedinContainer>
    )
};
