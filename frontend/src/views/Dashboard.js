import {useAuthStatus} from '../hooks/useAuthStatus';
import styles from '../styles/Dashboard.module.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Alert from '@mui/material/Alert';

function Dashboard() {
    const [targetEmail,setTargetEmail] = useState("");
    const {isLoading, isAuthorized, username} = useAuthStatus();
    const [isValid, setIsValid] = useState(false);
    const [linkSent, setLinkSent] = useState(false);

    const theme = createTheme({
        palette: {
          primary: {
            main: '#3c0949'
          }
        }
      });

    const sendMagicLink = ()  => {
        setLinkSent(true);
        const userData = {
            targetEmail: targetEmail
        }
        fetch("http://localhost:7000/magicLinkMessage1", {
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

    const validateEmail = (input) => {
        // Regular expression for email validation
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(input);
    };

    const handleEmailChange = (event) => {
        const input = event.target.value;
        setTargetEmail(input);
        setIsValid(validateEmail(input));
    };

    return (
        <div className={styles.dashboard}>
            <div className={styles.title}>{isAuthorized ? 'Welcome!' : 'Unauthorized'}</div>
            <div className={styles.message}>
                { isAuthorized ? authorizedBody : unauthorizedBody }
            </div>
            <br></br>
            <br></br>
            {isAuthorized?
            <div style={{textAlign:"center"}}>
            <ThemeProvider theme={theme}>
                <TextField 
                id="outlined-basic"
                label="Enter external user email" 
                variant="outlined" 
                onChange={handleEmailChange}
                error={!isValid && targetEmail.length > 0}
                helperText={!isValid && targetEmail.length > 0? 'Invalid email' : ''}
                />
            <Button variant="contained" onClick={isValid?sendMagicLink:null} disabled={!isValid}>Send</Button></ThemeProvider>
           {linkSent?<Alert severity="success">File shared to user successfully!!</Alert>:null}</div>:null
            }
        </div>
    );

}

export default Dashboard;
