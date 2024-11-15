import React from 'react';
import { Box, Text, Avatar, Button } from "@radix-ui/themes";

const UserInfo = ({ avatarUrl, channelName, username, description, isSelf }) => {
    return (
        <Box
            style={{
                display: "flex",
                alignItems: "center",
                padding: "24px",
                backgroundColor: "#e9f6ff",
                color: "#000000",
            }}
        >
            <Avatar
                src={avatarUrl}
                style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    marginRight: "24px",
                }}
            />

            <Box
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    flexGrow: 1,
                }}
            >
                <Text size="4" style={{ fontWeight: "bold", marginBottom: "8px" }}>
                    {channelName}
                </Text>
                <Text size="3" style={{ color: "var(--gray-a11)", marginBottom: "4px" }}>
                    @{username}
                </Text>
                <Text size="2" style={{ color: "var(--gray-a11)" }}>
                    {description}
                </Text>
            </Box>
            {isSelf ? (
                <Box
                    style={{
                        display: "flex",
                        gap: "16px",
                    }}
                >
                    <Button
                        variant="outline"
                        style={{
                            color: "#000000",
                            borderColor: "var(--gray-a5)",
                            padding: "8px 16px",
                            fontSize: "14px",
                        }}
                    >
                        Customize channel
                    </Button>
                    <Button
                        variant="outline"
                        style={{
                            color: "#000000",
                            borderColor: "var(--gray-a5)",
                            padding: "8px 16px",
                            fontSize: "14px",
                        }}
                    >
                        Manage videos
                    </Button>
                </Box>
            ) : null}


        </Box>
    );
};

export default UserInfo;
