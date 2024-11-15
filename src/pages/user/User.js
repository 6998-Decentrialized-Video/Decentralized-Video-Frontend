import {useAuth} from "../../context/AuthContext";
import {useNavigate, useParams} from "react-router-dom";
import Header from "../../components/header/Header";
import Videos from "../../components/videos/Videos";
import UserInfo from "../../components/user/userInfo";
import {Button, TabNav} from "@radix-ui/themes";
import {useState} from "react";

const User = () => {
    const { id } = useParams();
    const { isSignedIn, setIsSignedIn } = useAuth();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState("videos");



    return (
        <>
            <Header />
            <UserInfo
                avatarUrl={user?.avatar_url}
                channelName={user?.name}
                description={"Don't have a description yet"}
                username={"Avery"}
                isSelf={user?.id === id}/>
            <TabNav.Root>
                <TabNav.Link
                    href="#"
                    active={activeTab === "videos"}
                    onClick={() => setActiveTab("videos")}
                >
                    Videos
                </TabNav.Link>
                <TabNav.Link
                    href="#"
                    active={activeTab === "transactions"}
                    onClick={() => setActiveTab("transactions")}
                >
                    Transactions
                </TabNav.Link>
            </TabNav.Root>

            {activeTab === "videos" && <Videos user_id={id}/>}
            {/*{activeTab === "transactions" && <Transactions />}*/}

        </>
    );
};
export default User;