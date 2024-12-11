import React from "react";
import "./comments.scss";

const Comments = ({ comments, handleDeleteComment, canDelete}) => {
  return (
    <>
      {comments?.length > 0 ? (
        <div className="comments__content-container">
          {comments?.map((comment) => (
            <div className="comments__container-main" key={comment.id}>
              <div className="comments__content-logo"></div>
              <div className="comments__item">
                <div className="comments__content-wrapper">
                  <div className="comments__content">
                    <h3 className="comments__content-name">{comment.user_id}</h3>
                    <p className="comments__content-date">
                      {new Date(comment.timestamp).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </p>
                  </div>
                  <p className="comments__content-text">{comment.comment}</p>
                  {canDelete && (
                    <button
                    className="comments__delete-btn"
                    onClick={() => handleDeleteComment(comment._id)}
                  >
                    Delete
                  </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <section className="comments__content-container">
          <p className="comments__empty">No Comments</p>
        </section>
      )}
    </>
  );
};

export default Comments;
