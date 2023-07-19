import { useState } from 'react';
import { Box, Button, Typography } from "@mui/material";
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import FlexBetween from '../components/FlexBetween';

const Authentication = () => {
    const [ isRegisterFormActive, setIsRegisterFormActive ] =  useState<boolean>(true);

    const changeFormStatus = () => setIsRegisterFormActive(currentState => !currentState);

    return(
        <Box width="100%">
            <FlexBetween sx={{ flexDirection: "column" }}>
                <Typography>{isRegisterFormActive ? "SIGN UP" : "SIGN IN"}</Typography>
                <FlexBetween sx={{ flexDirection: "column" }}>
                    {
                        isRegisterFormActive ? <RegisterForm setIsRegisterFormActive={setIsRegisterFormActive}/> : <LoginForm />
                    }
                    <Button onClick={() => changeFormStatus()}>
                        {isRegisterFormActive ? "Do you already have an account?" : "You don't have an account?"}
                    </Button>
                </FlexBetween>
            </FlexBetween>
        </Box>
    )
}

export default Authentication;