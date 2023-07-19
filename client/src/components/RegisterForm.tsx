import { Dispatch, SetStateAction } from 'react';
import { Button, TextField } from "@mui/material";
import { Formik, Field } from "formik";
import { registerSchema } from "../schemas/formSchemas";
import FlexBetween from './FlexBetween';
import { countryList } from '../constants/countryList';

type formValues = {
    firstName: string, 
    lastName: string, 
    userName: string, 
    email: string, 
    password: string, 
    confirmedPassword: string, 
    country: string, 
    dateOfBirth: string, 
}

type RegisterFormProps = {
    setIsRegisterFormActive: Dispatch<SetStateAction<boolean>>
}

const RegisterForm = ({setIsRegisterFormActive}: RegisterFormProps) => {

    const registerInitialValues = {
        firstName: "", 
        lastName: "", 
        userName: "", 
        email: "", 
        password: "", 
        confirmedPassword: "", 
        country: countryList[0], 
        dateOfBirth: "",
    }

    const handleFormSubmit = async (values: formValues) => {
        const { confirmedPassword, ...data } = values;
        console.log('submit')
        console.log(data)

        const userInfo = {
            firstName: data.firstName,
            lastName: data.lastName,
            userName: data.userName,
            email: data.email,
            password: data.password,
            country: data.country,
            dateOfBirth: data.dateOfBirth,
            photo: 'profilePhoto.jpg',
        }
        
        try{
            const savedUserResponse = await fetch('http://localhost:3005/auth/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userInfo),
            })
    
            const savedUser = await savedUserResponse.json();
    
            console.log(savedUser);
    
            if (savedUser) setIsRegisterFormActive(currentState => !currentState)
        } catch(err){
            console.log(err)
        }
    }

    return(
        <>
            <Formik 
                onSubmit={handleFormSubmit}
                initialValues={registerInitialValues}
                validationSchema={registerSchema}
            >
                {({handleChange, handleSubmit, handleBlur, values, touched, errors}) => (
                    <form onSubmit={handleSubmit}>
                        <FlexBetween sx={{ flexDirection: "column" }}>
                            <TextField
                                name="firstName" 
                                label="First name" 
                                value={values.firstName} 
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                helperText={touched.firstName && errors.firstName}
                            />
                            <TextField 
                                name="lastName" 
                                label="Last name" 
                                value={values.lastName} 
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                helperText={touched.lastName && errors.lastName}
                            />
                            <TextField 
                                name="userName" 
                                label="User name" 
                                value={values.userName} 
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={Boolean(touched.userName) && Boolean(errors.userName)}
                                helperText={touched.userName && errors.userName}
                            />
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
                            <TextField
                                type="password" 
                                name="confirmedPassword" 
                                label="Confirmed password" 
                                value={values.confirmedPassword} 
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={Boolean(touched.confirmedPassword) && Boolean(errors.confirmedPassword)}
                                helperText={touched.confirmedPassword && errors.confirmedPassword}
                            />
                            <Field 
                                as="select"
                                name="country"
                                // label="Country" 
                                // value={values.country} 
                                // onBlur={handleBlur}
                                // onChange={handleChange}
                                // error={Boolean(touched.country) && Boolean(errors.country)}
                                // helperText={touched.country && errors.country}
                            >
                                {
                                    countryList.map((country) => (
                                        <option key={country} value={country}>{country}</option>
                                    ))
                                }
                            </Field>
                            <TextField 
                                type="date"
                                name="dateOfBirth"
                                value={values.dateOfBirth} 
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={Boolean(touched.dateOfBirth) && Boolean(errors.dateOfBirth)}
                                helperText={touched.dateOfBirth && errors.dateOfBirth}
                            />
                            <Button type="submit">submit</Button>
                        </FlexBetween>
                    </form>
                )}
            </Formik> 
        </>
    )
}

export default RegisterForm;