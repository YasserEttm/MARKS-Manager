import { useState, useEffect, useRef } from "react";
import "./Login.css";
import Button from "react-bootstrap/Button";
import { Toast } from 'primereact/toast';
import {
  TextField,
  Grid,
  Paper,
  Typography,
  Avatar,
  FormControlLabel,
  Checkbox,
  FormControl
} from "@mui/material";

import {Link, useNavigate} from 'react-router-dom';
function Login(props) {
  const [showPwd, setShowPwd] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorUserMessage, setErrorUserMessage] = useState("");
  const [errorPwdMessage, setErrorPwdMessage] = useState("");
  const [data, setData] = useState([]);
  const [dataProf, setDataProf] = useState([]);
  const avatarStyle = { backgroundColor: 'black', marginBottom: '10px' };
  const navigate = useNavigate();
  const toast = useRef(null);

  useEffect(() => {
    fetch("http://localhost:8080/compte/administrateur")
      .then(resp => resp.json())
      .then(data => setData(data))
    
    fetch("http://localhost:8080/compte/professeur")
      .then(resp => resp.json())
      .then(data => setDataProf(data))  // set data to state
  }, []);

  

  function handleSubmit(e){
    e.preventDefault();
    let user = data?.find((item) => {
        return item?.login === username && item.password === password;
    }
    )
    let userProf = dataProf?.find((item) => {
        return item?.login === username && item.password === password;
    }
    )

    console.log(user)
    console.log(userProf)
    user && localStorage.setItem("token", "UYbhwniuHBVuWdsFqwkh");
    userProf && localStorage.setItem("token", "UYbhwniuHBVuWdsFqwkh");
    username === (user?.login || userProf?.login ) && password === (user?.password || userProf?.password ) ? (user ? navigate("/home") : navigate("/homeprof")) : navigate("/login"); 
    //(userProf || user)  && username === userProf.login && password === userProf.password ? navigate("/home") : navigate("/login") ;// redirect to a home page
    let logger = user || userProf;
    props.onSubmit(logger);
    toast.current.show({ severity: 'error', summary: 'Authentication Failed !', detail: 'Wrong Login Or Password', life: 2000 })
  }

  const showPassword = () => {
    setIsChecked((current) => !current)
    setShowPwd((current) => !current);
  }
  function handleChangeUsername(e) {
    setUsername(e.target.value);
    e.target.value==="" ? setErrorUserMessage("Empty Username Field !") : setErrorUserMessage("");
  }
  function handleChangePassword(e) {
    setPassword(e.target.value);
    e.target.value==="" ? setErrorPwdMessage("Empty Password Field !") : setErrorPwdMessage("");
    
  }

  return (

    <Grid container className="gridStyle">
      <Toast ref={toast} />
      <Grid className="welcomeDiv">
          <p>WELCOME TO <span className="spanOne">MARKS MANAGER</span></p>
      </Grid>
      <Grid>
        <Paper elevation={20} sx={{ borderRadius: '10% 30% 60% 30%' , backgroundColor :'white'}} className="paperStyle" >
          <form onSubmit={handleSubmit}>
              <Grid align="center">
                  <Avatar style={avatarStyle} />
                  <h2>SIGN IN</h2>
              </Grid>
              <FormControl fullWidth>
                  <TextField
                  label="Login"
                  placeholder="Enter username"
                  helperText={errorUserMessage}
                  required
                  value={username}
                  onChange={(e) => handleChangeUsername(e)}
                  onClick={(e) => handleChangeUsername(e)}
                  />
              </FormControl>
              <br/>
              <br/>
              <FormControl fullWidth>
                  <TextField
                  label="Password"
                  placeholder="Enter password"
                  type={showPwd ? "text" : "password"}
                  helperText={errorPwdMessage}
                  required
                  value={password}
                  onChange={(e) => handleChangePassword(e)}
                  onClick={(e) => handleChangePassword(e)}
                  />
              </FormControl>
              <FormControlLabel
              label={<Typography style={{color: '#1976D2'}}>Show Password</Typography>}
              control={<Checkbox checked={isChecked} onChange={showPassword} />}
              />
              <Grid align="center">
                  <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      className="btn btn-primary"
                      fullWidth
                  >
                      SIGN IN
                  </Button>  
              </Grid>
          </form>
          <Typography>
            <Link to="/home" underline="none" style={{color: '#1976D2'}}>
              Forgot password ?
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Login;
