import { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Toast from "./Toast";
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

function Login(){
    const username = useRef();
    const password = useRef();
    const navigate = useNavigate();
    const [passwordtxt,setPassword] = useState();
    const [usernametxt,setUsername] = useState();
    const [loading,setLoading] = useState(false);
    const [toast,setToast] = useState();
    const [message,setMessage] = useState();
    const [step,setStep] = useState(1);
    useEffect(()=>{
        // load username password
    },[])
    const btn_submit_content = loading?(<div className="spinner-border login-loading" role="status"></div>):"Đăng nhập";
    const password_fill = (
        <>
            <div className="position-absolute login-step-2 pb-5 w-100 px-md-4 px-sm-2 px-2">
            <h3 className="no-select">Đăng nhập</h3>
            <p className="f-14 text-gray mb-1 no-select" style={{fontWeight:600}}>Mật khẩu</p>
                <div className="input-fill password-fill d-flex justify-content-center align-items-center">
                    <i className="fas fa-lock position-relative px-3"></i>
                    <input ref={password} defaultValue={passwordtxt} onFocus={input_focus} onBlur={focus_out} expand="password-fill" onChange={password_change} type="password" className="f-14" placeholder="Mật khẩu"></input>
                </div>
                <div className={passwordtxt != null && passwordtxt.trim() !== ''?
                    "login-btn submit-btn d-flex justify-content-center align-items-center f-14 text-white mt-2 no-select bg-danger":
                    "login-btn submit-btn d-flex justify-content-center align-items-center f-14 text-white mt-2 no-select bg-gray"}
                    onClick={sign_in}>{btn_submit_content}</div>
                <p className="text-center f-12 text-danger my-2">{message}</p>
            </div>
            <div className="prev-btn position-absolute no-select f-14" onClick={prevstep}>
                Trở lại
            </div>
        </>
    )
    const username_fill = (
        <>
            <div className="position-absolute bottom-0 pb-5 w-100 px-md-4 px-sm-2 px-2">
                <h3 className="no-select">Chào bạn,</h3>
                <p className="p-0 f-14 no-select">Nếu chưa có tài khoản, vui lòng <a href="/register">Đăng ký tại đây</a></p>
                <p className="f-14 text-gray mb-1 no-select" style={{fontWeight:600}}>Tên đăng nhập</p>
                <div className="input-fill username-fill d-flex justify-content-center align-items-center">
                    <i className="fas fa-user position-relative px-3"></i>
                    <input ref={username} defaultValue={usernametxt} onChange={username_change} onFocus={input_focus} onBlur={focus_out} expand="username-fill" type="text" className="f-14" placeholder="Tên đăng nhập"></input>
                </div>
                <div className={usernametxt != null && usernametxt.trim() !== ''?
                "login-btn continue-btn f-14 text-white mt-2 no-select bg-danger":
                "login-btn continue-btn f-14 text-white mt-2 no-select bg-gray"} onClick={nextstep}>Tiếp tục</div>
                <p className="text-center f-12 text-danger my-2">{message}</p>
                <p className="text-center f-12 my-2 no-select">hoặc</p>
                <div className="other-login d-flex justify-content-center align-items-center">
                    <FacebookLogin
                    appId="3149026968658582"
                    autoLoad={true}
                    fields="name,email,picture"
                    callback={responseFacebook} />
                    <GoogleLogin
                    clientId="1042850174243-pupvtuqq0l5mebu06ug4e4tfdtuuhnvg.apps.googleusercontent.com"
                    buttonText="Đăng nhập với google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}/>
                </div>
            </div>
        </>
    )
    const current_fill = step===1?username_fill:password_fill;
    function responseFacebook(response){
        let fbID = response.id;
        let name   = response.name;
        let email  = response.email;
        axios({
            method: 'POST',
            url: 'http://localhost:2022/login',
            data:{
                type: 'facebook',
                fbID,name,email 
            }
        }).then(()=>{
            setToast(Toast('Đăng nhập thành công'));
            setInterval(()=>setToast(null),3000);
        }).catch(()=>{
            setToast(Toast('Thao tác thất bại'));
            setInterval(()=>setToast(null),3000);
        })
    }
    function responseGoogle(response){
        let ggID = response.googleId;
        let name  = response.Iu.sf;
        let email = response.Iu.yv;
        axios({
            method: 'POST',
            url: 'http://localhost:2022/login',
            data:{
                type:'google',
                ggID,name,email
            }
        }).then((response)=>{
            setToast(Toast('Đăng nhập thành công'));
            setInterval(()=>setToast(null),3000);
        }).catch((error)=>{
            setToast(Toast('Thao tác thất bại'));
            setInterval(()=>setToast(null),3000);
        })
    }
    function nextstep(){
        if(username.current.value.trim() !== '' ){
            if(!username.current.value.trim().includes(' ')){
                setMessage("");
                setStep(2);
            } else{
                setMessage("Tên đăng nhập không chứa dấu cách");
            }
        }
    }
    function prevstep(){
        setMessage("");
        setStep(1);
    }
    function sign_in(){
        if(password.current.value.trim() !== ''){
            if(!password.current.value.trim().includes(' ')){
                setMessage("");
                setLoading(true);
                axios({
                    method: 'POST',
                    url: 'http://localhost:2022/login',
                    data:{
                        type: 'account',
                        username: usernametxt.trim(),
                        password: passwordtxt.trim()
                    }
                }).then(async response=>{
                    if(response.data.login === false){
                        setMessage(response.data.message);
                        setLoading(false);
                    }else{
                        setLoading(false);
                        setToast(Toast('Đăng nhập thành công'));
                        setInterval(()=>setToast(null),3000);
                    }
                }).catch(error=>{
                    setLoading(false);
                    setToast(Toast('Thao tác thất bại'));
                    setInterval(()=>setToast(null),3000);
                })
            } else{
                setMessage("Mật khẩu không chứa dấu cách");
            }
        }
    }
    function exit_login(){
        navigate("/home");
    }
    function focus_out(event){
        let parentSelector = "." + event.target.getAttribute('expand');
        let inputfill = document.querySelector(parentSelector);
        inputfill.classList.remove("input-focus");
    }
    function input_focus(event){
        let parentSelector = "." + event.target.getAttribute('expand');
        let inputfill = document.querySelector(parentSelector);
        inputfill.classList.add("input-focus");
        setMessage("");
    }  
    function password_change(){
        let btn = document.querySelector(".submit-btn");
        setMessage("");
        setPassword(password.current.value.trim());
        if(password.current.value.trim() === ''){
            btn.classList.remove("bg-danger");
            btn.classList.add("bg-gray");
        }else{
            btn.classList.add("bg-danger");
            btn.classList.remove("bg-gray");
        }
    }
    function username_change(){
        let btn = document.querySelector(".continue-btn");
        setMessage("");
        setUsername(username.current.value.trim());
        if(username.current.value.trim() === ''){
            btn.classList.remove("bg-danger");
            btn.classList.add("bg-gray");
        }else{
            btn.classList.add("bg-danger");
            btn.classList.remove("bg-gray");
        }
    }
    return(
        <>
            {toast}
            <div className="login-container d-flex">
                <div className="row w-100 d-flex justify-content-center align-items-center">
                    <div className="login-form col-md-5 col-sm-8 col-10 position-relative">
                        <div onClick={exit_login} className="exit-btn position-absolute no-select f-14">
                            Thoát
                        </div>
                        {current_fill}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;