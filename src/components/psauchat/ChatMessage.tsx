import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import {
  DivIndividualMessage,
  DivIndividualMessageAuthor,
  DivMessageContainer,
  DivMessageContainerAuthor,
} from "./style/ChatStlyedComponents";

interface propz {
  isOwner: boolean;
  message: string;
  username: string;
  userpictures: string;
}

const ChatMessage: React.FC<propz> = ({ isOwner, message, username, userpictures }: propz) => {
  const { individualChatColor } = useSelector((state: any) => state.uiSlice.theme);
  return (
    <ThemeProvider theme={{ individualChatColor }}>
      {!isOwner ? (
        <DivMessageContainer>
          <span className='messageAuthor'>{username}</span>
          <div style={{ display: "flex" }}>
            <img className='messageAuthorImage' src={userpictures} alt='authorPicc' />
            <DivIndividualMessage>
              <span className='message'>{message}</span>
            </DivIndividualMessage>
          </div>
        </DivMessageContainer>
      ) : (
        <DivMessageContainerAuthor>
          <div className='messageandpic asAuthorIndivial'>
            <DivIndividualMessageAuthor>
              <span className='message'>{message}</span>
            </DivIndividualMessageAuthor>
          </div>
        </DivMessageContainerAuthor>
      )}
    </ThemeProvider>
  );
};

export default ChatMessage;
