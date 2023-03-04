import { dbService, storageService } from 'fbase';
import React, { useEffect, useState } from "react";
import Nweet from "components/Nweet";
import {v4 as uuidv4} from 'uuid';

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment,setAttachment] = useState();

    useEffect(() => {

        dbService.collection("nweets").onSnapshot((snapshot) => {
            const nweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArray);
        })
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";
        if(attachment != ""){
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment,"data_url");
            attachmentUrl = await response.ref.getDownloadURL();
        }

        const nweetObj = {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl
        }
        await dbService.collection("nweets").add(nweetObj);
        setNweet("");
        setAttachment("");

    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNweet(value);
    };
    const onattachmentChange = (event) => {

        const {
            target : {attachments},
        } = event ;
        const theattachment = attachments[0];
        const reader = new attachmentReader();
        reader.onloadend = (finishedEvent) => {
                const {
                    currentTarget : {result},
                } = finishedEvent;
                setAttachment(result);
        }
        reader.readAsDataURL(theattachment);

    };
    const onClearAttachment = () => setAttachment(null);
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    value={nweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input type="attachment" accept='image/*' onChange={onattachmentChange}/>
                <input type="submit" value="Nweet" />
                {attachment && (
                <div>
                    <img src={attachment} width="50px"/>
                    <button onClick={onClearAttachment}>clear</button>
                </div>
                )    
                }
            </form>

            <div>
                {nweets.map((nweet) => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
                ))}
            </div>

        </div>
    );
};
export default Home;