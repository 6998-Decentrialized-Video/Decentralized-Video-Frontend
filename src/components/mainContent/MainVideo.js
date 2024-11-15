import "./mainContent.scss";
import axios from "axios";
import React, { useState } from 'react';

const BACK_END_URL = process.env.REACT_APP_BACKEND_URL;

const MainVideo = ({ videoDetails }) => {
    const [hasViewed, setHasViewed] = useState(false);

    if (!videoDetails || !videoDetails.video_cid) {
        console.log("Loading video details...");
        return <div>Loading...</div>;
    }
    const handlePlay = (previewCid) => () => {
        if (!hasViewed) {
            const postView = async () => {
                try {
                    await axios.post(`${BACK_END_URL}/view`, { cid: previewCid }, {withCredentials: true});
                    console.log('View recorded');
                    setHasViewed(true);
                } catch (error) {
                    console.error('Error recording view:', error);
                }
            };
            // Call the async function to log the view
            postView();
        }
    };

    return (
        <main className="video">
            <video
                className="video__player"
                controls
                poster={`${process.env.REACT_APP_IPFS_GATEWAY}/ipfs/${videoDetails.preview_cid}`}
                onPlay={handlePlay(videoDetails.video_cid)}
            >
                <source src={`${process.env.REACT_APP_IPFS_GATEWAY}/ipfs/${videoDetails.video_cid}`} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </main>
    );
};


export default MainVideo;
