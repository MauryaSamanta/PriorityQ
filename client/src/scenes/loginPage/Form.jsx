import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  dob: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  dob:"",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const [username,setusername]=useState('');
  const [email,setemail]=useState('');
  const [pass,setpass]=useState('');
  const [dob,setdob]=useState('');
  const [taken,settaken]=useState(false);
  const [wrong, setwrong]=useState(false);
  const [exist,setexist]=useState(true);
  
  const register = async (onSubmitProps) => {
   if(username==='' || pass===''||email===''||dob==='')
    return;

    const values={username:username,email:email, dob:dob, password:pass};
    //formData.append("picturePath", values.picture.name);
     console.log(values);
    const savedUserResponse = await fetch(
      "https://surf-jtn5.onrender.com/auth/new",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    const savedUser = await savedUserResponse.json();
   // onSubmitProps.resetForm();
   if(savedUser==='Present')
    setexist(true);
   else
   {setusername('');
   setemail('');
   setpass('');
   setdob('');
   setPageType("login");}
      
      
    
  };

  const login = async ( onSubmitProps) => {
    if(email===''||pass==='')
      return;
    const values={email:email,password:pass};
    const loggedInResponse = await fetch("https://surf-jtn5.onrender.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    if(loggedIn==='Invalid')
      {setwrong(true);return;}
    if(loggedIn==='no exist')
    {
      setexist(false);return;
    }
   // onSubmitProps.resetForm();
   setemail('');
   setpass('');
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token:loggedIn.token
        })
      );
      navigate("/home");
    }
  };
  let typingTimer;
const debounceDelay = 1000;
  const check=async(username)=>{
    settaken(false);
    setusername(username);
    if (typingTimer) clearTimeout(typingTimer);

    typingTimer = setTimeout(async () => {
      try {
        const response = await fetch("https://surf-jtn5.onrender.com/auth/check", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username:username }),
        });
  
        const result = await response.json();
        if(result==='Taken')
          settaken(true);
        else
          settaken(false);
        console.log(result);
        
      } catch (error) {
        console.error("Error checking username:", error);
      }
    }, debounceDelay);

  }

  const handleFormSubmit = async (values, onSubmitProps) => {
    console.log(isRegister);
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesLogin}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="20px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <Typography fontWeight="500" variant="h5"  sx={{ gridColumn: "span 4" }} textAlign={"center"}>
              {isRegister?"Create an Account":""}
            </Typography>
            {isRegister && (
              <>  
                
                <TextField
                  label="Username"
                  onBlur={handleBlur}
                  onChange={(e)=>check(e.target.value)}
                  value={username}
                  name="username"
                  error={Boolean(touched.username) && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                  sx={{ gridColumn: "span 4" }}
                />
                {taken && username? <Typography mt={0} sx={{gridColumn:"span 4", color:"#e62e31"}}>{username} is taken ☹️</Typography>:
                 !taken && username && <Typography mt={0} sx={{gridColumn:"span 4", color:"#2ee659"}}>{username} is available 😀</Typography>}
                <TextField
                  label="Date of Birth"
                  type="date"
                  onBlur={handleBlur}
                  onChange={(e)=>setdob(e.target.value)}
                  value={dob}
                  name="dob"
                  InputLabelProps={{
                    shrink: true, // Keeps the label above the input
                  }}
                  error={Boolean(touched.dob) && Boolean(errors.dob)}
                  helperText={touched.dob && errors.dob}
                  sx={{ gridColumn: "span 4" }}
                />
                
              </>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={(e)=>setemail(e.target.value)}
              value={email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            /> 
             
             <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={(e)=>setpass(e.target.value)}
              value={pass}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
            {wrong && <Typography mt={0} sx={{gridColumn:"span 4", color:"#e62e31"}}>Wrong Credentials</Typography>}
            {!exist && <Typography mt={0} sx={{gridColumn:"span 4", color:"#e62e31"}}>You need to create an account</Typography>}
          </Box>
           
          {/* BUTTONS */}
          <Box >
            <Button
              fullWidth
              type="submit"
              disabled={!isLogin? taken:false}
              sx={{
                m: "2rem 0",
               // p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
                borderRadius:"30px"
              }}
              
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
                setusername('');
                setemail('');
                setdob('');
                setpass('');
                setexist(true);
                settaken(false);
              }}
              sx={{
                //textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
