import React, {useEffect, useState} from "react";
import {useAuth} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Box, Grid, Card, Text, Avatar} from "@radix-ui/themes";
import {create} from "ipfs-http-client";

const client = create({ url: 'http://localhost:5001/api/v0' });
const Videos = (user_id) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [videosPerPage] = useState(6);
    const { user } = useAuth();
    const navigate = useNavigate();
    const [videos, setVideos] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/videos`, {
                    params: user_id ? { user_id: user_id } : undefined
                });
                const { videos: fetchedVideos } = response.data;
                const timeout = (ms) => new Promise((_, reject) => setTimeout(() => reject(new Error("Request timed out")), ms));

                const availableVideos = await Promise.all(fetchedVideos.map(async (video) => {
                    try {
                        await Promise.race([
                            client.cat(video.video_cid, { length: 1 }),
                            timeout(5000)
                        ]);
                        return {
                            id: video.id,
                            title: video.title,
                            thumbnail: `http://localhost:8080/ipfs/${video.preview_cid}`,
                            videoCid: video.video_cid,
                            author: video.author,
                            avatar: video.profile_pic_url,
                            view_count: video.view_count,
                            created_at: video.upload_date
                        };
                    } catch (err) {
                        console.warn(`Video with CID ${video.video_cid} not found in local IPFS node or request timed out.`);
                        return null;
                    }
                }));
                setVideos(availableVideos.filter(video => video !== null));
            } catch (error) {
                console.error('Error fetching videos:', error);
                setErrorMessage('Failed to fetch videos. Please try again later.');
            }
        };

        fetchVideos();
    }, []);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    const indexOfLastVideo = currentPage * videosPerPage;
    const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
    const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);

    const renderVideos = () => {

        return currentVideos.map((video, index) => (

            <Card
                key={`${video.id}-${index}`}
                variant="ghost"
                style={{
                    display: "flex",
                    flexDirection: "column", // Arrange elements vertically
                    width: "100%",
                    boxShadow: "var(--shadow-5)",
                    borderRadius: "12px",
                    overflow: "hidden",
                    marginBottom: "16px",
                }}
            >
                <Box
                    style={{
                        width: "100%",
                        paddingTop: "56.25%",
                        position: "relative",
                        backgroundColor: "var(--gray-a2)",
                    }}
                    onClick={() => navigate(`/video/${video.videoCid}`)}
                >
                    <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="video-thumbnail"
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "center",
                        }}
                    />
                </Box>

                <Box
                    style={{
                        display: "flex",
                        padding: "12px",
                        alignItems: "center",
                        width: "100%",
                    }}
                >
                    <Avatar
                        src={video.profile_pic_url}
                        style={{
                            width: "48px",
                            height: "48px",
                            marginRight: "12px",
                        }}
                    />

                    <Box
                        style={{
                            flexGrow: 1,
                        }}
                    >
                        <Text size="2" style={{ fontWeight: "bold", marginBottom: "4px" }}>
                            {video.title}
                        </Text>

                        <Box
                            style={{
                                display: "flex",
                                gap: "16px",
                                marginTop: "4px",
                            }}
                        >
                            <Text size="1" style={{ color: "var(--gray-a11)" }}>
                                {video.view_count} views
                            </Text>
                            <Text size="1" style={{ color: "var(--gray-a11)" }}>
                                {new Date(video.created_at).toLocaleDateString()}
                            </Text>
                        </Box>
                    </Box>
                </Box>
            </Card>

        ));
    };

    const renderPagination = () => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(videos.length / videosPerPage); i++) {
            pageNumbers.push(i);
        }

        return pageNumbers.map((number) => (
            <button
                key={number}
                onClick={() => handlePageChange(number)}
                className={`pagination-button ${currentPage === number ? 'active' : ''}`}
            >
                {number}
            </button>
        ));
    };

    return (
        <>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <div className="app-container">
                <Grid columns={3} gap="3" className="videos-container" style={{ justifyContent: 'center', margin: '0 auto' }}>
                    {renderVideos()}
                </Grid>
                <div className="pagination-container">
                    {renderPagination()}
                </div>
            </div>
        </>
    );
}

export default Videos;