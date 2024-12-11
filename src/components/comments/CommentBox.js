import React from "react";

import {useState} from "react";
import axios from "axios";
import "./comments.scss";
import {useAuth} from "../../context/AuthContext";

const CommentBox = ({comments, videoCid, refreshComments}) => {
  const { user } = useAuth();
  const [commentText, setCommentText] = useState("");
  const BACK_END_URL = process.env.REACT_APP_BACKEND_URL;

  const handleCommentChange = (event) => {
    setCommentText(event.target.value); // Update state on input change
  };


  const handleCommentSubmit = async () => {
    if (!commentText.trim()){
      alert('Comment cannot be empty!');
      return;
    } 
    try {
      console.log(commentText, videoCid);

      await axios.post(`${BACK_END_URL}/addComment`, {
        video_cid: videoCid,
        comment_text: commentText
      });

      setCommentText(""); // Clear the input
      refreshComments(); // Refresh the comment list
    } catch (error) {
      console.error("Error adding comment:", error.response?.data || error.message);
    }
  };
  
  return (
    <section className="comments__container">
      {comments?.length > 0 ? (
        <p className="comments__total">{comments?.length} comments</p>
      ) : (
        <p className="comments__total">No comments</p>
      )}
      <div className="comments__wrapper">
        <div className="comments__img"
             style={{
          backgroundImage: `url(${user?.avatar_url|| '../../assets/Images/user_default.jpg'})`,
        }}></div>
        <div className="comments__input-btn-container">
          <div className="comments__input">
            <p className="comments__input-title">Join the conversation</p>
            <textarea
              name="comment"
              className="comments__text-input"
              placeholder="Add a new comment"
              value={commentText} // Controlled component
              onChange={handleCommentChange} // Update state on input

            ></textarea>
          </div>
          <div className="comments__btn-wrapper">
            <button type="submit" className="comments__btn" onClick={handleCommentSubmit}>
              Comment
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommentBox;
