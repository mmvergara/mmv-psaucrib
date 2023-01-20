import styled from "styled-components";


export const DivCommentContainer = styled.div`
  display: flex;
  gap: 1em;
  border: 1px solid #b9c3ba4b;
  padding: 1em;
  padding-bottom: 0.7em;
  margin: 1em 0em;
  form {
    width: 100%;
  }
  form input {
    width: 100%;
    padding: 0.7em;
    outline: none;
    border: 1px solid #b9c3badc;
  }
  img {
    border-radius: 50%;
  }
  border-radius: 5px;
`;
export const FormCreatePostsContainer = styled.div`
  background-color: ${(props) => props.theme.createPostsContainer};
  width: 100%;
  max-width: 800px;
  margin: 0;
  padding: 0;
  border-radius: 7px;
`;
export const DivCreatePostsButtonContainer = styled.form`
  padding: 1em;
  display: flex;
  align-items: center;
  gap: 1em;
  div {
    color: white;
    font-weight: bold;
  }
  button,
  a {
    background-color: ${(props) => props.theme.btnBg};
    color: #058619;
    outline: none;
    border: none;
    font-size: 1.3rem;
    font-weight: bold;
    padding: 10px;
    width: 30%;
    text-decoration: none;
    border-radius: 7px;
  }
`;
export const DivInputPostsTitleContainer = styled.div`
  input {
    font-family: "Poppins", sans-serif;
    width: 100%;
    border: none;
    background-color: ${(props) => props.theme.createPostsInputField};
    font-size: 3.2rem;
    outline: none;
    margin-bottom: 0.55em;
    color: ${(props) => props.theme.createPostsText};
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    padding: 15px;
  }
  input::-webkit-input-placeholder {
    font-size: 3.2rem;
  }
  textarea {
    color: ${(props) => props.theme.createPostsText};
    background-color: ${(props) => props.theme.createPostsInputField};
    font-family: "Poppins", sans-serif;
    margin: 0;
    width: 100%;
    height: 600px;
    border: none;
    font-size: 1.2rem;
    outline: none;
    margin: 0;
    padding: 15px;
  }
  padding: 0;
  margin: 0;
`;
export const DivPostContainer = styled.div`
  overflow: hidden;
  background-color: ${(props) => props.theme.postsBG};
  color: ${(props) => props.theme.postsText};
  width: 98vw;
  max-width: 800px;
  margin: 1em 0em;
  padding: 1em;
  border-radius: 8px;
  border: 1px solid #b9c3badc;
  filter: drop-shadow(0px 0.5px 10px #2222223a);
  opacity: 0;
  animation-name: slideRight;
  animation-duration: 0.2s;
  animation-fill-mode: forwards;
  @keyframes slideRight {
    0% {
      transform: translateX(150px);
    }
    100% {
      transform: translate(0);
      opacity: 1;
    }
  }
`;
export const DivPostAuthorTitle = styled.div`
  width: 100%;
  display: flex;
  gap: 1em;
  align-items: center;
  img {
    border: solid 3px #284a24;
  }
`;
export const DivPostLikeCommentContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  span {
    display: flex;
    align-items: center;
  }
  span svg {
    font-size: 1.5rem;
    margin-right: 4px;
  }
  @media only screen and (max-width: 400px) {
    span b {
      font-size: 0.8rem;
    }
  }
`;
export const DivPsauFlexFeedPostContainer = styled.div`
  display: flex;
  gap: 1em;
  height: 450px;
`;
export const DivWeatherDashboard = styled.div`
  background-color: ${(props) => props.theme.navBg};
  background-color: #1f331d;
  background-image: linear-gradient(to top, #93e7f4, #6ae1f3);
  padding: 10px;
  border-radius: 15px;
  p {
    margin: 0;
  }
`;
export const DivWeatherDashboardContainer = styled.div``;
export const DivLoginContainerPsauHomePage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100vh;
  background-position: top;
  backdrop-filter: blur(5px);
  background-image: linear-gradient(to right, #2b4829, #82ff696c);

  @media only screen and (max-width: 1200px) {
    width: 100%;
  }
`;
export const DivPsauFeedPostsContainer = styled.div`
  display: grid;
  place-items: center;
  padding-top: 50px;
`;
export const DivSideBarFeedContainer = styled.div`
  margin-top: 40px;
  padding: 1em;
  border-radius: 8px;
  background-color: ${(props) => props.theme.navBg};

  width: 100%;
  max-width: 300px;
  font-weight: bold;
  @media only screen and (max-width: 1300px) {
    display: none;
  }
`;