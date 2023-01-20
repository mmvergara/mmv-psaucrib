import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { set as setFB, ref } from "firebase/database";
import { getDB } from "../../../firebase/FirebaseDB";
import uniqid from "uniqid";
import { Link, useNavigate } from "react-router-dom";
import { DivCreatePostsButtonContainer, DivInputPostsTitleContainer, DivPsauFeedPostsContainer, FormCreatePostsContainer } from "../style/FeedStyledComponents";

const CreatePosts: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { userCredential, studentNumber, userName, userPic } = useSelector(
    (state: any) => state.accountSlice.userInfo
  );
  const navigation = useNavigate();
  useEffect(() => {
    if (!userCredential) {
      navigation("/welcome");
    }
  });
  const { createPostsContainer, createPostsInputField, createPostsText, btnBg } = useSelector(
    (state: any) => state.uiSlice.theme.posts
  );
  const d = new Date();
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  const [PostTitle, setPostTitle] = useState("");
  const [PostContent, setPostContent] = useState("");
  const PostSubmitHandler = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!PostTitle || !PostContent) {
      alert("Post Title/Content should not be empty");
      return;
    }
    setIsLoading(true);
    const postID = userName + uniqid() + Math.random().toString().slice(4, 9);
    const data = {
      userName,
      userPic: userPic || "https://i.ibb.co/gtQqBc4/unnamed.jpg",
      postTitle: PostTitle,
      studentNumber,
      postID,
      postContent: PostContent,
      postDate: new Date().getTime(),
    };
    const fbReference = ref(getDB, "posts/" + postID);
    await setFB(fbReference, data);

    setTimeout(() => {
      navigation("/psaufeed");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <ThemeProvider theme={{ createPostsContainer, createPostsInputField, createPostsText, btnBg }}>
      <DivPsauFeedPostsContainer>
        <FormCreatePostsContainer style={{ marginTop: "1em" }} onSubmit={PostSubmitHandler}>
          <DivInputPostsTitleContainer>
            <input
              value={PostTitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPostTitle(e.target.value);
              }}
              type='text'
              placeholder='Post Title . . .'
            />
          </DivInputPostsTitleContainer>
          <DivInputPostsTitleContainer>
            <textarea
              value={PostContent}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setPostContent(e.target.value);
              }}
              placeholder='Post content . . . '
            />
          </DivInputPostsTitleContainer>
          <DivCreatePostsButtonContainer>
            <button style={{ cursor: isLoading ? "not-allowed" : "" }} type='submit'>
              {isLoading ? "Loading . . ." : "Publish Post"}
            </button>
            <button type='button'>
              <Link to={"/psaufeed"}>Go Back</Link>
            </button>
            <div>{`${da} ${mo} ${ye}`}</div>
          </DivCreatePostsButtonContainer>
        </FormCreatePostsContainer>
      </DivPsauFeedPostsContainer>
    </ThemeProvider>
  );
};

export default CreatePosts;
