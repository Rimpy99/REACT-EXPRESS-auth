import { Button, TextField,  Typography } from "@mui/material";
import { Formik } from "formik";
import { loginSchema } from "../schemas/formSchemas";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux-hooks/hooks";
import { setUser } from "../state/userSlice";

type formValues = {
    email: string, 
    password: string, 
}

const LoginForm = () => {

    const dispatch = useAppDispatch()

    const navigate = useNavigate();

    const loginInitialValues = {
        email: "", 
        password: "", 
    }

    const handleFormSubmit = async (values: formValues) => {
        const { email, password } = values;

        const userInfo = {
            email: email,
            password: password,
        };

        const savedUserResponse = await fetch('http://localhost:3005/auth/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userInfo),
        });

        const savedUser = await savedUserResponse.json();
        
        if (savedUser) {

            const userInfoToSave = {
                userId: savedUser.userId,
                token: savedUser.token,
            }

            dispatch(setUser(userInfoToSave))

            navigate('/home');
        }
    }

    return(
        <>
            <Formik 
                onSubmit={handleFormSubmit}
                initialValues={loginInitialValues}
                validationSchema={loginSchema}
            >
                {({handleChange, handleSubmit, handleBlur, values, touched, errors}) => (
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name="email" 
                            label="Email" 
                            value={values.email} 
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                        />
                        <TextField
                            type="password" 
                            name="password" 
                            label="Password" 
                            value={values.password} 
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                        />
                        <Button type="submit">submit</Button>
                    </form>
                )}
            </Formik> 
        </>
    )
}

export default LoginForm;