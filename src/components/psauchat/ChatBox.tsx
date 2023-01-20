import { useState } from "react";
import "./PsauChat";
import { useSelector } from "react-redux";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { doc, setDoc } from "firebase/firestore";
import { messageFirestoreRef } from "../../firebase/FirebaseActions";
import uniqid from "uniqid";
import { HiPaperAirplane } from "react-icons/hi";
import { ThemeProvider } from "styled-components";
import {
  ButtonSendMessageContainer,
  FormChatInput,
  SpanMessageInputContainer,
} from "./style/ChatStlyedComponents";
const ChatBox: React.FC = () => {
  const { userName, userPic } = useSelector((state: any) => state.accountSlice.userInfo);
  const [userMessageInput, setUserMessageInput] = useState("");
  const userInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserMessageInput(e.target.value!);
  };

  const sendMessageHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    /// PUT BANNED WORDS HERE
    const bannedWords = ["pizza", "wtf", "foo", "burger"];
    /// PUT BANNED WORDS HERE
    e.preventDefault();
    if (userMessageInput.trim() === "") return;
    if (bannedWords.some((x) => userMessageInput.toLowerCase().includes(x.toLowerCase()))) {
      alert("Message not sent... Your message includes banned words!");
      return;
    }
    await setDoc(doc(messageFirestoreRef, uniqid()), {
      userName,
      userPic,
      message: userMessageInput,
      created_date: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setUserMessageInput("");
  };
  return (
    <ThemeProvider theme={{}}>
      <FormChatInput onSubmit={sendMessageHandler}>
        <SpanMessageInputContainer className='messageInput'>
          <input
            type='text'
            placeholder='Send a message . . .'
            value={userMessageInput}
            onChange={userInputChangeHandler}
          />
        </SpanMessageInputContainer>
        <ButtonSendMessageContainer type='submit'>
          <HiPaperAirplane />
        </ButtonSendMessageContainer>
      </FormChatInput>
    </ThemeProvider>
  );
};

export default ChatBox;
