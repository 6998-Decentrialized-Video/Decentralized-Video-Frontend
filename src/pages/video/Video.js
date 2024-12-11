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

  const [loggedInUser, setLoggedInUser] = useState(null);

  const getUserInfo = async () => {
    try {
      const response = await axios.get(`${BACK_END_URL}/getUserInfo`);
      setLoggedInUser(response.data.user_info);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };


  const getSelectedVideo = async (videoId) => {
    try {
      const response = await axios.get(`${BACK_END_URL}/video`, { params: { cid: videoId } });
      const video_data = response.data.video_data;
      setVideoDetails(video_data);
      setComments(video_data.comments);
    } catch (error) {
      console.log("Failed to fetch video data:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${BACK_END_URL}/listComments`, { params: { video_cid: videoDetails.video_cid } });
      setComments(response.data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const refreshComments = () => {
    if (videoDetails.video_cid) {
      fetchComments(); 
    }
  };
  
  // const updateCommentsWithPermissions = (commentsList, videoCreatorId) => {
  //   if (!loggedInUser) return;

  //   const updatedComments = commentsList.map((comment) => ({
  //     ...comment,
  //     canDelete: loggedInUser.id === comment.userId || loggedInUser.id === videoCreatorId,
  //   }));
  //   setComments(updatedComments);
  // };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.post(`${BACK_END_URL}/deleteComment`, {
        video_cid: videoDetails.video_cid,
        comment_id: commentId
      });

      // Update the comments state by filtering out the deleted comment
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  useEffect(() => {
    getUserInfo();

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
        // updateCommentsWithPermissions(video_data.comments, video_data.creatorId);

        fetchComments(video_data.video_cid); 
        setComments(video_data.comments);
      } catch (error) {
        console.log(error);
      }
    };
    getVideoDetails();
  }, []);

  

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
          <CommentBox 
            comments={comments}
            videoCid={videoDetails.video_cid}
            refreshComments={refreshComments}
          />
          <Comments comments={comments}
            handleDeleteComment={handleDeleteComment}
            canDelete={true}
          />
        </div>
        <div className="app__wrapper">
          <VideoList videos={videos} videoDetails={videoDetails} />
        </div>
      </section>
    </>
  );
};

export default Video;
