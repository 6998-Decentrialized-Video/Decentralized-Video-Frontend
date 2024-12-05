import "./mainContent.scss";
import heartSymbol from "../../assets/icons/likes.svg";
import likedSymbol from "../../assets/icons/liked.svg"
import eyeSymbol from "../../assets/icons/views.svg";
import {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const BACK_END_URL = process.env.REACT_APP_BACKEND_URL;

const MainContent = ({ videos, getSelectedVideo, defaultId }) => {
  const { title, user_id, upload_date, view_count, like_count, description } = videos;
  const params = useParams();
  const videoId = params.id ? params.id : defaultId;
  const [isLiked, setIsLiked] = useState(false);
  const [likeCountLive, setLikeCountLive] = useState( 0);
  const navigate = useNavigate();

  const getHasLiked = async (videoId) => {
    try {
      const response = await axios.get(`${BACK_END_URL}/hasLiked`, { params: { video_cid: videoId } });
      const like_status = response.data.liked;
      setIsLiked(like_status);
    } catch (error) {
      console.log("Failed to fetch like status:", error);
    }
  };

  useEffect(() => {
    getHasLiked(videoId);
  }, [videoId]);

  useEffect(() => {
    if (like_count !== undefined) {
      setLikeCountLive(Number(like_count));
    }
  }, [like_count]);

  useEffect(() => {
    getSelectedVideo(videoId);
  }, [videoId]);

  const toggleLike = () => {
    if (isLiked) {
      const postUnlike = async () => {
        try {
          setIsLiked(false);
          setLikeCountLive(likeCountLive - 1);
          await axios.post(`${BACK_END_URL}/like`, { video_cid: videoId, status: -1 }, {withCredentials: true});
        } catch (error) {
          console.error('Error recording like:', error);
        }
      };
      postUnlike();
    } else {
      const postLike = async () => {
        try {
          setIsLiked(true);
          setLikeCountLive(likeCountLive + 1);
          await axios.post(`${BACK_END_URL}/like`, { video_cid: videoId , status : 1}, {withCredentials: true});
        } catch (error) {
          console.error('Error recording like:', error);
        }
      };
      postLike();
    }
  };

  const goToProfile = () => {
    navigate(`/profile/${user_id}`); // Navigate to the profile page with user_id
  };

  return (
    <>
      <div className="video__description">
        <h1 className="video__title">{title}</h1>
        <div className="video__details-wrapper">
          <div className="video__details-container">
            <div className="video__details">
              <span
                  className="video__details-creator"
                  style={{ cursor: "pointer", color: "blue" }} // Optional: Add styling to indicate it's clickable
                  onClick={goToProfile} // Add the onClick event
                >
                  By {user_id}
                </span>
    
              // <span className="video__details-creator">By {user_id}</span>
            </div>
            <div className="video__details">
              <span className="video__details-date">
                {new Date(upload_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </span>
            </div>
          </div>
          <div className="video__metrics-container">
            <div className="video__metrics">
              <div className="video__metrics-item">
                <img
                  className="video__metrics-views-img"
                  src={eyeSymbol}
                  alt="Eye symbol"
                ></img>
              </div>
              <div className="video__metrics-item">
                <p className="video__metrics-views">{view_count}</p>
              </div>
            </div>
            <div className="video__metrics">
              <div className="video__metrics-item">
                <img
                    className="video__metrics-likes-img"
                    src={isLiked ? likedSymbol : heartSymbol}
                    alt="Heart symbol"
                    onClick={toggleLike} // Adding onClick event
                    style={{cursor: 'pointer'}} // Optional: Change cursor to indicate clickable
                />
              </div>
              <div className="video__metrics-item">
                <p className="video__metrics-likes">{likeCountLive}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="video__description-container">
          <p className="video__description-text">{description}</p>
        </div>
      </div>
    </>
  );
};

export default MainContent;
