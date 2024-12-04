import Header from "../../components/header/Header.js";
import MainVideo from "../../components/mainContent/MainVideo.js";
import MainContent from "../../components/mainContent/MainContent.js";
import CommentBox from "../../components/comments/CommentBox";
import Comments from "../../components/comments/Comments";
import VideoList from "../../components/videoList/VideoList.js";
import { useState, useEffect } from "react";
import axios from "axios";
import "./video.scss";
import {useParams} from "react-router-dom";

const Video = () => {
  const { id } = useParams();
  const BACK_END_URL = process.env.REACT_APP_BACKEND_URL;
  const videoDetailsUrl = "";

  const selectedVideo = (videoId) => `${process.env.REACT_APP_IPFS_GATEWAY}/ipfs/${videoId}`;

  const [defaultId, setDefaultId] = useState("");
  const [videoDetails, setVideoDetails] = useState({});
  const [videos, setVideos] = useState([]);
  const [comments, setComments] = useState([]);

  const getSelectedVideo = async (videoId) => {
    try {
      const response = await axios.get(`${BACK_END_URL}/video`, { params: { cid: videoId } });
      const video_data = response.data.video_data;
      setVideoDetails(video_data);
    } catch (error) {
      console.log("Failed to fetch video data:", error);
    }
  };

  useEffect(() => {
    const getVideoList = async () => {
      try {
        const { data } = await axios.get(`${BACK_END_URL}/videos`);
        setVideos(data.videos);
      } catch (error) {
        console.log("An error has occurred", error);
      }
    };
    getVideoList();
  }, []);


  useEffect(() => {
    const getVideoDetails = async () => {
      try {
        const response = await axios.get(`${BACK_END_URL}/video`, { params: { cid: id } });
        const video_data = response.data.video_data;
        setVideoDetails(video_data);
      } catch (error) {
        console.log(error);
      }
    };
    getVideoDetails();
  }, []);

  // Fetch comments from the backend
  const fetchComments = async () => {
    try {
      setComments(videoDetails.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // Refresh comments (used as a prop)
  const refreshComments = () => {
    fetchComments();
  };

  return (
    <>
      <Header />
      <MainVideo videoDetails={videoDetails} />
      <section className="app">
        <div className="app__wrapper">
          <MainContent
            videos={videoDetails}
            defaultId={defaultId}
            getSelectedVideo={getSelectedVideo}
          />
          <CommentBox comments={comments}
            videoCid={videoDetails.video_cid}
            refreshComments={refreshComments}
          />
          <Comments comments={videoDetails.comments}/>
        </div>
        <div className="app__wrapper">
          <VideoList videos={videos} videoDetails={videoDetails} />
        </div>
      </section>
    </>
  );
};

export default Video;
