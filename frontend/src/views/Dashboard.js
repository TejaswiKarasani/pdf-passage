import {useAuthStatus} from '../hooks/useAuthStatus';
import styles from '../styles/Dashboard.module.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';

function Dashboard() {
    const [targetEmail,setTargetEmail] = useState("");
    const {isLoading, isAuthorized, username} = useAuthStatus();

    //console.log(isAuthorized);

    const sendMagicLink = ()  => {
        //event.preventDefault()
        const userData = {
            //targetEmail: "karasanitejaswi99@gmail.com"
            targetEmail: targetEmail
        }
        fetch("http://localhost:7000/magicLinkMessage", {
            method: "post",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        }).then(response=> response.json()).then(data => {
            console.log(data);
        })
        // .catch((e) => {
        //     console.log("errored", e)
        // })
    }
    if (isLoading) {
        return null;
    }
    const authorizedBody = 
    <>
        You successfully signed in with Passage.
        <br/><br/>
        Your username is: <b>{username}</b>
    </>

    const unauthorizedBody = 
    <>
        You have not logged in and cannot view the dashboard.
        <br/><br/>
        <a href="/" className={styles.link}>Login to continue.</a>
    </>

    return (
        <div className={styles.dashboard}>
            <div className={styles.title}>{isAuthorized ? 'Welcome!' : 'Unauthorized'}</div>
            <div className={styles.message}>
                { isAuthorized ? authorizedBody : unauthorizedBody }
            </div>
            {isAuthorized?
            <div><TextField id="outlined-basic" label="Outlined" variant="outlined" onChange ={(e) => 
                setTargetEmail(e.target.value)
                //console.log("e.target.value", e.target.value)
                }/>
            <Button variant="contained" onClick={sendMagicLink}>Send</Button></div>:null
            }
        </div>
    );

}

export default Dashboard;
