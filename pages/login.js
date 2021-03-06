import { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import theme from '../global/theme';
import { googleSDK } from '../global/func'
import Head from "next/head";

// const responseGoogle = (response) => {
//   console.log(response);
// };

const Login = (props) => {
  const [modalOn, setModalOn] = useState(true);
  const [modalOnDisp, setModalOnDisp] = useState(true);
  const [isEntered, setIsEntered] = useState(false);
  const [token, setToken] = useState('');
  const googleLoginBtn = useRef(null);

  useEffect(() => {
  //   googleSDK(googleLoginBtn);
    modalShow()
  },[]);

  const modalShow = () => {
    if (!isEntered) {
      setModalOn(!modalOn);
      if (!modalOn) {
        setTimeout(() => {
          setModalOnDisp(!modalOnDisp);
        }, 600);
      } else {
        googleSDK(googleLoginBtn);
        setModalOnDisp(!modalOnDisp);
      }
    }
  };

  const signOut = () => {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      console.log('User signed out.');
    });
  };

  return (
    <LoginComp>
      <button type="button" onClick={signOut}>
        log out
      </button>
      <button type="button" onClick={modalShow}>
        sign up
      </button>
      <LoginContainer modal={[modalOn, modalOnDisp]} onClick={modalShow}>
        <LoginWrapper
          modal={[modalOn, modalOnDisp]}
          onMouseEnter={() => setIsEntered(!isEntered)}
          onMouseLeave={() => setIsEntered(!isEntered)}
        >
          <div>
            <FbLogin type="button">
              <span className="icon"></span>Continue with Facebook
            </FbLogin>
            {/* <div id="gdbtn" className="g-signin2" data-onsuccess="onSignIn"></div> */}
            <GoogleLogin id="gSignInWrapper">
              <span className="label" />
              <div id="customBtn" className="customGPlusSignIn">
                <span className="icon"></span>
                <span ref={googleLoginBtn} className="buttonText">
                  Continue with Google
                </span>
              </div>
            </GoogleLogin>
            <Line>or</Line>
            <Input
              type="text"
              placeholder="Your email address or profile URL *"
            />
            <Button type="button">Countinue</Button>
            <Desc>
              <div>Need help?</div>
              <div>
                We may use your email and devices for updates and tips on
                SoundCloud's products and services, and for activities
                notifications. You can unsubscribe for free at any time in your
                notification settings. We may use information you provide us in
                order to show you targeted ads as described in our Privacy
                Policy.
              </div>
            </Desc>
          </div>
        </LoginWrapper>
      </LoginContainer>
    </LoginComp>
  );
};

export default Login;

const LoginComp = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  /* margin-top: 50px; */

  z-index: 500000;

`;

const GoogleLogin = styled.div`
  #customBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    color: #222;
    width: 400px;
    border-radius: 3px;
    border: 1px solid #e5e5e5;
    /* box-shadow: 1px 1px 1px grey; */
    white-space: nowrap;
    margin-bottom: 12px;
  }
  #customBtn:hover {
    cursor: pointer;
  }
  /* span.label {
    font-family: serif;
    font-weight: normal;
  } */
  span.icon {
    background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOHB4IiBoZWlnaHQ9IjE4cHgiIHZpZXdCb3g9IjAgMCA0OCA0OCI+CiAgPGc+CiAgICA8cGF0aCBmaWxsPSIjRUE0MzM1IiBkPSJNMjQgOS41YzMuNTQgMCA2LjcxIDEuMjIgOS4yMSAzLjZsNi44NS02Ljg1QzM1LjkgMi4zOCAzMC40NyAwIDI0IDAgMTQuNjIgMCA2LjUxIDUuMzggMi41NiAxMy4yMmw3Ljk4IDYuMTlDMTIuNDMgMTMuNzIgMTcuNzQgOS41IDI0IDkuNXoiLz4KICAgIDxwYXRoIGZpbGw9IiM0Mjg1RjQiIGQ9Ik00Ni45OCAyNC41NWMwLTEuNTctLjE1LTMuMDktLjM4LTQuNTVIMjR2OS4wMmgxMi45NGMtLjU4IDIuOTYtMi4yNiA1LjQ4LTQuNzggNy4xOGw3LjczIDZjNC41MS00LjE4IDcuMDktMTAuMzYgNy4wOS0xNy42NXoiLz4KICAgIDxwYXRoIGZpbGw9IiNGQkJDMDUiIGQ9Ik0xMC41MyAyOC41OWMtLjQ4LTEuNDUtLjc2LTIuOTktLjc2LTQuNTlzLjI3LTMuMTQuNzYtNC41OWwtNy45OC02LjE5Qy45MiAxNi40NiAwIDIwLjEyIDAgMjRjMCAzLjg4LjkyIDcuNTQgMi41NiAxMC43OGw3Ljk3LTYuMTl6Ii8+CiAgICA8cGF0aCBmaWxsPSIjMzRBODUzIiBkPSJNMjQgNDhjNi40OCAwIDExLjkzLTIuMTMgMTUuODktNS44MWwtNy43My02Yy0yLjE1IDEuNDUtNC45MiAyLjMtOC4xNiAyLjMtNi4yNiAwLTExLjU3LTQuMjItMTMuNDctOS45MWwtNy45OCA2LjE5QzYuNTEgNDIuNjIgMTQuNjIgNDggMjQgNDh6Ii8+CiAgICA8cGF0aCBmaWxsPSJub25lIiBkPSJNMCAwaDQ4djQ4SDB6Ii8+CiAgPC9nPgo8L3N2Zz4K")
      transparent 50% center no-repeat;
    background-size: 14px 14px;
    display: inline-block;
    vertical-align: middle;
    width: 42px;
    height: 42px;
  }
  span.buttonText {
    display: inline-block;
    vertical-align: middle;
    /* padding-left: 42px;
    padding-right: 42px; */
    font-size: 16px;
    font-weight: 100;
    /* Use the Roboto font that is loaded in the <head> */
    font-family: "Roboto", sans-serif;
  }
`;

const LoginContainer = styled.div`
z-index:9999999;
  width: 100%;
  height: 100vh;
  display: ${props => (props.modal[1] ? "none" : "flex")};
  justify-content: center;
  flex-direction: column;
  background-color: hsla(0,0%,94.9%,.9);
  position: absolute;
  top: 0;
`;

const LoginWrapper = styled.div`
  display: ${(props) => (props.modal[1] ? 'none' : 'flex')};
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  background-color: white;
  width: 450px;
  height: 620px;
  padding: 25px;
  position: absolute;
  top: 100px;
  left: 40%;

  @keyframes modalTransOff {
    0% {top: 100px;}
    20% {top: 200px;}
    100% {top: -1500px;}
  }

  @keyframes modalTransOn {
    0% {top: -1500px;}
    80% {top: 200px;}
    100% {top: 100px;}
  }

  ${(props) => (props.modal[0] ? css`animation: modalTransOff ease-in-out 0.6s;` : css`animation: modalTransOn ease-out 0.6s;`)}
`;

const Desc = styled.div`
  font-size: 12px;
  &:nth-child(1) {
    color: #999;
  }
  &:nth-child(2) {
  }
`;

const Button = styled.button`
  width: 400px;
  height: 40px;
  margin-bottom: 12px;

  background-color: ${theme.orange};
  color: #fff;
  border: none;
  font-size: 16px;
  border-radius: 3px;
  outline: none;
`;

const FbLogin = styled.button`
  width: 400px;
  height: 40px;
  margin-bottom: 12px;

  background-color: #3578e5;
  color: #fff;
  border: none;
  font-size: 16px;
  border-radius: 3px;

  display: flex;
  justify-content: center;
  align-items: center;

  span.icon {
    background: url("https://a-v2.sndcdn.com/assets/images/facebook-02b09d52.png")
      transparent 50% center no-repeat;
    background-size: 14px 14px;
    display: inline-block;
    vertical-align: middle;
    width: 42px;
    height: 14px;
  }
`;

const Input = styled.input`
  width: 400px;
  height: 40px;
  margin-bottom: 12px;

  background-color: #ffffff;
  color: #333;
  padding: 7px 8px;
  border: 1px solid #ccc;
  outline: none;
  font-size: 16px;
  border-radius: 3px;
  transition: border-color 0.1s;

  &:focus {
    border-color: #999;
  }
`;

const Line = styled.div`
width: 400px;
position: relative;
text-align: center;
margin-bottom: 12px;

&::before {
  position: absolute;
  display: inline-block;
  width: 43%;
  top: 50%;
  left: 0;
  content: " ";
  border-bottom: 1px solid black;
}

&::after {
  position: absolute;
  display: inline-block;
  width: 43%;
  top: 50%;
  right: 0;
  content: " ";
  border-bottom: 1px solid black;
}
`;
