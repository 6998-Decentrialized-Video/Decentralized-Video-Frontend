import {Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.js";
import logo from '../../assets/logo/btube_logo.jpg';
import searchIcon from '../../assets/icons/search.svg';
import {DropdownMenu, Box, Button, TextField, Avatar} from "@radix-ui/themes";
import React from "react";

function Header() {
  const { isSignedIn, setIsSignedIn, user , setUser} = useAuth();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/loginCoinbase`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to get Coinbase login URL");
      }

      const data = await response.json();
      const coinbaseUrl = data.url;

      const newWindow = window.open(coinbaseUrl, '_blank', 'width=500,height=600');

      window.addEventListener("message", (event) => {
        if (event.origin !== process.env.REACT_APP_BACKEND_URL) return;
        const { accessToken, user } = event.data;
        if (accessToken) {
          localStorage.setItem("coinbaseAccessToken", accessToken);
          setUser(user);
          setIsSignedIn(true);
          newWindow.close();
          navigate('/');
        }
      });

    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleUploadClick = () => {
    // if (isSignedIn) {
    //   navigate('/upload');
    // } else {
    //   handleLogin()
      // navigate('/login');
    // }
    navigate('/upload');
  };
  const handleSignOut = () => {
    setIsSignedIn(false);
    localStorage.removeItem('isSignedIn');
    localStorage.removeItem('coinbaseAccessToken');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleProfileClick = () => {
    navigate(`/user/${user?.id}`);
  }

  return (
      <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 24px",
            backgroundColor: "#ffffff",
            color: "#000000",
          }}
      >
        <Box
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
        >
          <Link to={"/"}>
            <img
                src={logo}
                alt="Logo"
                style={{ height: "50px" }}
            />
            </Link>
        </Box>

        <Box
            style={{
              flexGrow: 1,
              margin: "0 24px",
            }}
            maxWidth="400px"
        >
          <TextField.Root placeholder="Search" size={"3"} >
            <TextField.Slot>
              <img src={searchIcon} alt="Search icon" />
            </TextField.Slot>
          </TextField.Root>
        </Box>

        <Box
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
        >
          {isSignedIn ? (
              <Button color="gray" variant="surface" highContrast onClick={handleUploadClick}>
                Upload
              </Button>
          ) : null}
          {isSignedIn ? (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                      src={user?.avatar_url || "../../assets/Images/user_default.jpg"}
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "50%",
                        marginRight: "24px",
                      }}
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Item onClick={handleProfileClick}>
                    Profile
                  </DropdownMenu.Item>
                  <DropdownMenu.Item color="red" onClick={handleSignOut}>
                    Sign out
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
          ) : (
              <Button color="gray" variant="surface" highContrast onClick={handleLogin}>
                Sign in
              </Button>
          )}
        </Box>
      </Box>
  );
}


export default Header;
