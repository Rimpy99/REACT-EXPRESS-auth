import { useState } from "react";
import { Typography, Box } from "@mui/material";
import Dropzone from "react-dropzone";

type DropzoneModalProps = {
    userId: string,
    token: string,
}

const DropzoneModal = ({ userId, token }: DropzoneModalProps) => {

    const updateUserPicture = async (picture: File) => {
        const pictureCopy = new File([picture], `${userId}.jpg`);
        const form = new FormData();

        form.append('picture', pictureCopy);
        form.append('picturePath', pictureCopy.name);

        const updatedUserResponse = await fetch(`http://localhost:3005/user/${userId}/updateUserPicture`, {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}` },
            body: form,
        });

        const updatedUser = await updatedUserResponse.json()
    }

    return(
        <>
            <Dropzone
                onDrop={acceptedFiles => updateUserPicture(acceptedFiles[0])}
                // onDrop={acceptedFiles => console.log(acceptedFiles[0])}
                multiple={false}
            >
                {({getRootProps, getInputProps}) => (
                    <Box {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Typography>Add picture here.</Typography>
                    </Box>
                )}
            </Dropzone>
        </>
    );
}

export default DropzoneModal;