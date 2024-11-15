import React, {useRef, useState} from "react";
import "./upload.scss";
import Header from "../../components/header/Header";
import IPFSWrapper from "../../utils/IPFSWrapper";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {create} from "ipfs-http-client";


const client = create({ url: `${process.env.REACT_APP_IPFS_URL}/api/v0` });

function Upload() {
  const formRef = useRef();
  const navigate = useNavigate();
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (!files || files.length === 0) return;
    console.log(files[0]);
    if (name === "videoFile") setVideoFile(files[0]);
    if (name === "thumbnailFile") setThumbnailFile(files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("submitHandler called");
    if (!videoFile || !thumbnailFile) {
      console.log("null");
      toast.error("Video or Thumbnail cannot be empty!");
      return;
    }
    setUploading(true);

    try {
      const videoCid = await client.add(videoFile);

      const thumbnailCid = await client.add(thumbnailFile);

      toast.success('Upload successful!');

      const title = formRef.current.title.value;
      const description = formRef.current.description.value;
      const BACK_END_URL = `${process.env.REACT_APP_BACKEND_URL}/upload`;
      axios
          .post(BACK_END_URL, {
            title: title,
            description: description,
            video_cid: videoCid.path,
            preview_cid: thumbnailCid.path,
            file_name: videoFile.name,
          }, {withCredentials: true})
          .then(navigate("/publish"))
          .catch((error) => {
            console.log("An error has occurred", error);
          });
    } catch (error) {
      toast.error('Failed to upload files to IPFS.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Header />
      <section className="upload__container">
        <div className="upload__title-wrapper">
          <h1 className="upload__title">Upload Video</h1>
        </div>
        <main className="upload__wrapper">
          <div className="hero">
            <p className="hero__title">Video Thumbnail</p>
            <input type="file" name="thumbnailFile" className="upload-input" accept="image/*" onChange={handleFileChange}/>
            <p className="hero__title">Video</p>
            <input type="file" name="videoFile" className="upload-input" accept="video/*" onChange={handleFileChange}/>
          </div>
          <section className="input__container">
            <form
                ref={formRef}
                className="form"
                id="uploadForm"
              onSubmit={submitHandler}
            >
              <div className="input__wrapper">
                <p className="input__label">Title of your video</p>
                <textarea
                  id="title"
                  className="input__body--title"
                  name="title"
                  required
                  placeholder="Add a title to your video"
                ></textarea>
              </div>
              <div className="input__wrapper">
                <p className="input__label">Add a video description</p>
                <textarea
                  id="description"
                  className="input__body--description"
                  name="description"
                  required
                  placeholder="Add a description to your video"
                ></textarea>
              </div>
            </form>
            <div className="upload--border"></div>
            <div className="btn__wrapper">
              <button type="submit" form="uploadForm" className="btn--publish">
                Publish
              </button>
              <Link to={"/"} className="btn__link">
                <button className="btn--cancel">Cancel</button>
              </Link>
            </div>
          </section>
        </main>
      </section>
    </>
  );
}

export default Upload;
