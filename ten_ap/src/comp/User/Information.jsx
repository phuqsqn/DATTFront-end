import React, { useEffect, useState } from "react";
import { set } from 'react-hook-form';
import httpService from "../service/http.service";
import { useParams } from "react-router";
import { Backdrop, Box, Fade, Modal } from "@mui/material";
import './information.css';

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const Information = () => {
    const [account, setAccount] = useState({})
    const [isReload, setIsReload] = useState(false);
    const { id } = useParams()
    useEffect(() => {
        httpService.get(`/api/accounts/information/${id}`, {}).then(data => {
            setAccount(data.data)
        })
    }, [])
    const [open, setOpen] = React.useState(false);
    const handleOpen = (item) => {
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        httpService.patch(`/api/accounts/${id}`, { body: account })
            .then((data) => {
                setOpen(false);
                setIsReload(!isReload)
            },
            )
    }
    // useEffect((id)=>{
    //     httpService.get(`/api/accounts/information/${id}`).then(data =>{
    //         console.log(data.data)
    //     })
    // },[])
    return (
        <>
            <div className="Sum_hoso">
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Fade style={{ width: "420px", height: "500px", border: "0px", borderRadius: "5px" }} in={open}>
                        <Box sx={style}>
                            <button style={{ margin: "0px" }} onClick={() => setOpen(false)}>x</button>
                            <div className="slog"><h1 className="dis">EDIT ACCOUNT</h1></div> <br />
                            <form className="formedit" onSubmit={handleSubmit}>
                                <label className="Boxname">Fullname:</label><br />
                                <input className="inpedit" type="text" value={account?.fullname} onChange={e => setAccount({ ...account, fullname: e.target.value })} /><br />
                                <label className="Boxname">Dob:</label><br />
                                <input className="inpedit" type="text" value={account?.dob} onChange={e => setAccount({ ...account, dob: e.target.value })} /><br />
                                <label className="Boxname">Phone:</label><br />
                                <input className="inpedit" type="text" value={account?.phone} onChange={e => setAccount({ ...account, phone: e.target.value })} /><br />
                                <button className="submitedit" type="submit">Edit</button>
                            </form>
                        </Box>
                    </Fade>
                </Modal>
                <div className="Sum_Statis">
                <div className="Ho_So">
                    <h1>Hồ Sơ Thông Tin</h1>
                </div>
                <hr/>
                <h3><span className="tieude2">Usernam:</span> <span>{account?.username}</span></h3>
                <h3><span className="tieude2">FullName:</span> <span>{account?.fullname}</span></h3>
                <h3><span className="tieude2" >Dob:</span> <span>{account?.dob}</span></h3>
                <h3><span className="tieude2">Phone:</span> <span>{account?.phone}</span></h3>
                <button
                className="OnlickEdit"
                    onClick={() => {
                        setOpen(true)
                    }}
                >
                    EDIT
                </button>
                </div>
            </div>
        </>
    )
}
export default Information;