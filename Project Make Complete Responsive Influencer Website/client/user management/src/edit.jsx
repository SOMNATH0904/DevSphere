import Forminput from "./Forminput";
import { Button } from "@mui/material";
import { useNavigate,Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import SearchAppBar from "./navbar";
export default function EditUser() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const first = params.get('first');
    const last = params.get('last');
    const handle = params.get('handle');
    const followers = params.get('followers');
    const id = params.get('id');

    const [Formdata, setFormData] = useState({    //state to save the form data
        firstname: first,
        lastname: last,
        handle: handle,
        followers: followers
    })
    const [errors, setErrors] = useState({        //state for form validation
        firstname: '',
        lastname: '',
        handle: '',
        followers: ''
    });
    const handlchange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
    }
    const postdetails = async () => {

        const newErrors = {};

        // Perform form validation here
        if (!Formdata.firstname.trim()) {
            newErrors.firstname = 'firstname is required.';
        }
        if (!Formdata.lastname.trim()) {
            newErrors.lastname = 'lastname is required.';
        }
        if (!Formdata.handle.trim()) {
            newErrors.handle = 'handle is required.';
        }
        if (!Formdata.followers.trim()) {
            newErrors.followers = 'followers is required.';
        }

        // Check if there are any errors
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        }
        else {
            try {
                const res = await axios.put(`http://localhost:5000/users/${id}/edit`,
                {
                    firstname: Formdata.firstname,
                    lastname: Formdata.lastname,
                    handle: Formdata.handle,
                    followers: Formdata.followers 

                })
                navigate('/')
            }
            catch (error) {
                console.error(error)
            }
        }
    }
    return (
        <>
            <SearchAppBar/>
            <h1>Edit {handle}</h1>
            <Forminput value={Formdata.firstname} error={Boolean(errors.firstname)} helperText={errors.firstname} name={'firstname'} onchange={handlchange} label={'Enter your Firstname'} />
            <Forminput value={Formdata.lastname} error={Boolean(errors.lastname)} helperText={errors.lastname} name={'lastname'} onchange={handlchange} label={'Enter your Lastname'} />
            <Forminput value={Formdata.handle} error={Boolean(errors.handle)} helperText={errors.handle} name={'handle'} onchange={handlchange} label={'Enter your Handle'} />
            <Forminput value={Formdata.followers} error={Boolean(errors.followers)} helperText={errors.followers} name={'followers'} onchange={handlchange} type={'number'} label={'Enter your number of followers'} />
            <Button variant="contained" color="success" onClick={postdetails}  sx={{ margin: '30px 10px' }}>
                Save Changes
            </Button>
            <Link to={'/'}><Button variant="contained"  color="error" sx={{ margin: '30px 10px' }}>
                Cancel
            </Button></Link>
        </>
    );
}
