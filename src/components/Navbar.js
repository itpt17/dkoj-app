import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar(){
    const [clock,setClock] = useState();
    const navigate = useNavigate();
    useEffect(()=>{
        let time = new Date().toLocaleTimeString();
        setClock(time);
    },[]);
    setInterval(()=>{
        let time = new Date().toLocaleTimeString();
        setClock(time);
    },1000);
    const sign_options= (
        <>
            <div className="d-flex text-light-gray f-14">
                <div className="sign-option-item no-select" onClick={()=>navigate("/register")}>Đăng ký</div>
                <div className="sign-option-item no-select" onClick={()=>navigate("/login")}>Đăng nhập</div>
            </div>
        </>
    )
    const account = (
        <>
            <div className="dropdown f-14 position-relative">
                <div className="dropdown-appear d-flex align-items-center">
                    <div className="username text-white d-inline no-select">username</div>
                    <i className="fas fa-angle-down mx-1 mt-1 text-white"></i>
                </div>
                <div className="account-info position-absolute end-0">
                    <ul>
                        <li className="no-select">
                        <i class="fas fa-user-cog f-12 mx-1"></i>
                        Thay đổi thông tin</li>
                        <li className="no-select">
                        <i class="fas fa-sign-out-alt f-12 mx-1"></i>
                        Đăng xuất</li>
                    </ul>
                </div>
            </div>
        </>
    )
    return(
        <>
            <div className="container-fluid bg-main position-fixed top-0 start-0 d-flex justify-content-between align-items-center">
                <div className="dkoj-logo">
                    DKOJ
                </div>
                <div className="clock text-white f-12">
                    {clock}
                </div>
                <div className="account">
                    {sign_options}
                </div>
            </div>
        </>
    )
}

export default Navbar;