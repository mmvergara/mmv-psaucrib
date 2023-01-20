import styled from "styled-components";

export const DivIndividualMessage = styled.div`
  color: white;
  background-color: ${(props) => props.theme.individualChatColor};
  border-radius: 20px;
  display: inline-flexbox;
  padding: 10px;
  letter-spacing: 0.6px;

  span {
    font-weight: 500;
  }
`;
export const DivIndividualMessageAuthor = styled.div`
  color: white;
  background-color: ${(props) => props.theme.individualChatColor};
  border-radius: 20px;
  display: inline-flexbox;
  padding: 10px;
  letter-spacing: 0.6px;
  span {
    font-weight: 500;
  }
`;
export const DivMessageContainer = styled.div`
  margin-top: 30px;
  padding-left: 4px;
  display: flex;
  flex-direction: column;
  width: fit-content;
  flex-wrap: nowrap;
`;
export const DivMessageContainerAuthor = styled.div`
  margin-inline: 10px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  width: fit-content;
  flex-wrap: nowrap;
  height: 100%;
  width: 98vw;
  display: flex;
  align-items: flex-end;
  justify-content: left;
  right: 0;
  text-align: right;
`;
export const FormChatInput = styled.form`
  position: fixed;
  display: flex;
  width: 100vw;
  bottom: 0;
`;
export const SpanMessageInputContainer = styled.span`
  width: 85%;
  input {
    font-size: 1rem;
    font-weight: bold;
    letter-spacing: 1px;
    outline: none;
    border: 0;
    padding: 1em;
    width: 100%;
    background-color: #2b4829;
    border: 0;
    color: aliceblue;
  }
  input::-webkit-input-placeholder {
    /* Chrome/Opera/Safari/Edge */
    /*styles here*/
    color: #f0f8ffa7;
  }
`;
export const ButtonSendMessageContainer = styled.button`
  width: 15%;
  background-color: #ffb80e;
  outline: none;
  border: 0;
  font-size: 2.3rem;
  svg {
    transform: translateY(-6px);
    color: white;
  }
`;
