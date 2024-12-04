import { useAsyncError, useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import Videos from "../../components/videos/Videos";
import UserInfo from "../../components/user/userInfo";
import {useAuth} from "../../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import "./profile.scss";

const Profile = () => {
    const { id } = useParams(); // Get the user ID from the URL
    const [profileUser, setProfileUser] = useState(null); // Store the user data
    const [avatar, setAvatar] = useState[null];
    const [error, setError] = useState(null);
    const BACK_END_URL = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        const fetchProfileUser = async () => {
            try {
                const response = await axios.get(`${BACK_END_URL}/user`, { params: { user_id: id } });
                if (!response.ok) {
                    throw new Error("Failed to fetch user");
                }
                setProfileUser(response.data['user_id']);
                setAvatar(response.data['user_profile_pic']);
            } catch (err) {
                console.error("Error fetching user data:", err);
                setError("Failed to load user data.");
            }
        };
        if (id) {
            fetchProfileUser();
        }
    }, [id]);

    return (
        <>
            <Header />
            <UserInfo
                avatarUrl={avatar}
                channelName={profileUser}
                description={"Don't have a description yet"}
                username={"Avery"}
                isSelf={user?.id === id}/>
            <Videos user_id={id} />
        </>
    );
};

export default Profile;

