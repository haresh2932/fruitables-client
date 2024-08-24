// import { all } from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';


function Chat(props) {
    const [rec, setRec] = useState('')
    const [message, setmassege] = useState('')
    const [allmsg, setAllmsg] = useState([])
    const [Group, setGroup] = useState('')





    const socket = useMemo(() => io("http://localhost:4000"), []);


    useEffect(() => {
        socket.on('connect', () => {
            console.log("client conntcted to server", socket.id);
            socket.on("welcome", (msg) => console.log(msg))
            socket.on("greeting", (msg) => console.log(msg))
            socket.on('rec-message', (msg) => setAllmsg((prev)=>[...prev,msg]))
            
        });
    }, [])

    const handleSubmit=(e)=>{
        e.preventDefault()

        socket.emit('message',{
            reciver:rec,
            message:message
        })

    }

    const handlegroupSubmit=(e)=>{
        e.preventDefault()

        socket.emit('join-Group',Group)

    }




    return (
        <>
            <div>
                <div className="container-fluid page-header py-5">
                    <h1 className="text-center text-white display-6">Chat</h1>
                    <ol className="breadcrumb justify-content-center mb-0">
                        <li className="breadcrumb-item">
                            <a href="#">Home</a>
                        </li>
                        <li className="breadcrumb-item">
                            <a href="#">Pages</a>
                        </li>
                        <li className="breadcrumb-item active text-white">Chat</li>
                    </ol>
                </div>
            </div>
            <br/>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        name='reciver'
                        placeholder='Reciver'
                        onChange={(e) => setRec(e.target.value)}
                    />
                    <input
                        type='text'
                        name='message'
                        placeholder='message'
                        onChange={(e) => setmassege(e.target.value)}
                    />
                    <input
                        type='submit'
                    />
                </form>
                <br/><br/><br/><br/>
                <form onSubmit={handlegroupSubmit}>
                    <input
                        type='text'
                        name='group'
                        placeholder='Enter Group Name'
                        onChange={(e) => setGroup(e.target.value)}
                    />                    
                    <input
                        type='submit'
                    />
                </form>

                {
                    allmsg.map((v)=>(
                        <p>{v}</p>
                    ))
                }
            </div>
        </>
    );
}

export default Chat;