import ChatBox from "./ChatBox";
import ChatMessage from "./ChatMessage";
import uniqid from "uniqid";
import { useEffect, useRef } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { query, orderBy, limitToLast } from "firebase/firestore";
import { useSelector } from "react-redux";
import { messageFirestoreRef } from "../../firebase/FirebaseActions";
import "./PsauChat.css";
import "firebase/auth";
import "firebase/firestore";
import { DivIndividualMessage } from "./style/ChatStlyedComponents";

const PsauChat: React.FC= () => {
  const { userName: selectUsername } = useSelector((state: any) => state.accountSlice.userInfo);
  const queryMessages = query(messageFirestoreRef, orderBy("created_date"), limitToLast(25));
  const [messages] = useCollectionData(queryMessages);
  const scrollerRef = useRef<null | HTMLSpanElement>(null!);
  const elementRef = scrollerRef.current!;
  useEffect(() => {
    if (elementRef) {
      elementRef.scrollIntoView({ behavior: "smooth" });
    }
  });

  return (
    <>
      <div className='psauChatContainer'>
        {messages?.map((q) => (
          <ChatMessage
            key={uniqid()}
            isOwner={q.userName === selectUsername}
            message={q.message}
            username={q.userName}
            userpictures={q.userPic}
          />
        ))}
      </div>
      <div style={{ opacity: "0" }} className='messageContainer asAuthor'>
        <div className='messageandpic asAuthorIndivial'>
          <DivIndividualMessage className='individualMessage'>
            <span className='message' ref={scrollerRef}>
              Hello this is a fake padding, nice one finding it
            </span>
          </DivIndividualMessage>
        </div>
      </div>
      <ChatBox />
    </>
  );
};

export default PsauChat;
