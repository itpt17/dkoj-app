function Toast(message){
    return(
        <div className="my-toast position-fixed">
            <div className="my-toast-header d-flex justify-content-between">
                <p className="f-14 m-0">Thông báo</p>
                <div className="my-toast-time f-12 d-flex justify-content-between align-items-center">
                    <p className="m-0 mx-3">Vừa mới</p>
                </div>
            </div>
            <hr className="m-0"></hr>
            <div className="my-toast-content d-flex align-items-center">
                <p className="f-12 mt-3 text-infor">{message}</p>
            </div>
        </div>
    )
}

export default Toast;