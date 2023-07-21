import { useEffect, useState }  from 'react';
import { useAppSelector } from "../redux-hooks/hooks";
import { Typography, TextField, Button, Divider } from '@mui/material';
import DropzoneModal from '../components/DropzoneModal';

type userType = {
    userId: string,
    firstName: string,
    lastName: string,
    userName: string,
    photo: string,
    country: string,
    createdAt: string,
    updatedAt: string,
    dateOfBirth: string,
    email: string,
}

type changedUserInfoType = {
    firstName?: string,
    lastName?: string,
    userName?: string,
    country?: string,
    dateOfBirth?: string,
    email?: string,
}

const UserProfile = () => {
    const userInfo = useAppSelector((state) => state.user);

    const [ user, setUser ] = useState<userType | null>(null);
    const [ changedUserInfo, setChangedUserInfo ] = useState<changedUserInfoType>({});
    const [ isDropzoneModalActive, setIsDropzoneModalActive ] = useState<boolean>(false);

    useEffect(() => {
        const getUser = async () => {
            const userResponse = await fetch(`http://localhost:3005/user/${userInfo.userId}`, {
                method: "GET",
                headers: { Authorization: `Bearer ${userInfo.token}` }
            });
            const user = await userResponse.json()
            if (user){
                setUser(user);
            }
            console.log(user)
        }

        getUser()
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const name = e.target.name;

        setChangedUserInfo({
            ...changedUserInfo,
            [name]: value,
        });
    }

    const handleUserInfoUpdate = () => {
        if(Object.keys(changedUserInfo).length > 0){
            const updateUser = async () => {
                const updatedUserResponse = await fetch(`http://localhost:3005/user/${userInfo.userId}/update`, {
                    method: "PUT",
                    headers: { 
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userInfo.token}`
                    },
                    body: JSON.stringify(changedUserInfo)
                })

                const updatedUser = await updatedUserResponse.json();
                console.log(updateUser)
            };

            updateUser();
        }
    }

    useEffect(() => {
        console.log(changedUserInfo);
    }, [changedUserInfo])

    if (!user) return null;
    return(
        <>
            {
                userInfo.token && isDropzoneModalActive && <DropzoneModal userId={user.userId} token={userInfo.token}/>
            }
            <img 
                src={`http://localhost:3005/images/${user.photo}`} 
                alt="user profile photo" 
                style={{ objectFit: "cover", borderRadius: "50%",  width: "200px", height: "200px" }}
                onClick={() => setIsDropzoneModalActive(currentState => !currentState)}
            />
            <Typography>{user.firstName}</Typography>
            <Typography>member since: {(user.createdAt).slice(0, 10)}</Typography>
            <Typography>last updated at: {(user.updatedAt).slice(0, 10)}</Typography>
            <Divider/>
            <form>
                <Typography>First name</Typography>
                <TextField 
                    value={(changedUserInfo.firstName !== undefined) ? changedUserInfo.firstName : user.firstName} 
                    name="firstName" 
                    onChange={handleInputChange}
                />
                <Typography>Last name</Typography>
                <TextField 
                    value={(changedUserInfo.lastName !== undefined) ? changedUserInfo.lastName : user.lastName} 
                    name="lastName" 
                    onChange={handleInputChange}
                />
                <Typography>User name</Typography>
                <TextField 
                    value={(changedUserInfo.userName !== undefined) ? changedUserInfo.userName : user.userName} 
                    name="userName" 
                    onChange={handleInputChange}
                />
                <Typography>Country</Typography>
                <TextField 
                    value={(changedUserInfo.country !== undefined) ? changedUserInfo.country : user.country} 
                    name="country" 
                    onChange={handleInputChange}
                />
                <Typography>Date of birth</Typography>
                <TextField 
                    type="date"
                    value={(changedUserInfo.dateOfBirth !== undefined) ? changedUserInfo.dateOfBirth : user.dateOfBirth} 
                    name="dateOfBirth" 
                    onChange={handleInputChange}
                />
                <Typography>Email</Typography>
                <TextField 
                    value={(changedUserInfo.email !== undefined) ? changedUserInfo.email : user.email} 
                    name="email" 
                    onChange={handleInputChange}
                />
                <br/>
                <Button onClick={() => handleUserInfoUpdate()}>
                    Update
                </Button>
            </form>
        </>
    )
};

export default UserProfile;