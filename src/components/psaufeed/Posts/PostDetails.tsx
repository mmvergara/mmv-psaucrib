import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ThemeProvider } from "styled-components";
import { deletePostById, deleteCommentById } from "../../../firebase/FirebaseActions";

import { MdDateRange, MdDeleteForever } from "react-icons/md";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import uniqid from "uniqid";
import useDate from "../../../hooks/UseDate";
import CreateComment from "./comments/CreateComments";
import { set as setFB, ref } from "firebase/database";
import { getDB } from "../../../firebase/FirebaseDB";
import useLoading from "../../../hooks/UseLoading";
import {
  DivCommentContainer,
  DivPostAuthorTitle,
  DivPostContainer,
  DivPostLikeCommentContainer,
  DivPsauFeedPostsContainer,
} from "../style/FeedStyledComponents";
import { firebaseURL } from "../../../config";

interface postData {
  postComments: string[];
  postContent: string;
  postDate: number;
  postID: string;
  postLike: string[];
  postTitle: string;
  studentNumber: string;
  userName: string;
  userPic: string;
}

const PostDetails: React.FC = () => {
  const { userName: loggedInUserName, userPic: loggedInUserPic } = useSelector(
    (state: any) => state.accountSlice.userInfo
  );
  const [isLiked, setIsLiked] = useState(false);
  const { postsBG, postsText } = useSelector((state: any) => state.uiSlice.theme.posts);
  const x = useParams();
  const navigate = useNavigate();
  const { LoadingCircle, startLoading } = useLoading("Delete Post");
  const { startLoading: startLoading2 } = useLoading("Delete Comment");

  const fetchPostDetails = useCallback(async () => {
    const rawData = await axios.get(
      `${firebaseURL}/posts/${x.postID}.json`
    );
    const thePostComments = [];
    const thePostLikes = [];
    if (!rawData.data) {
      navigate("/psaufeed");
    }

    if (rawData.data.postComments) {
      for (const x of Object.values(rawData.data.postComments)) {
        thePostComments.push(x);
      }
    }
    if (rawData.data.postLike) {
      for (const x of Object.values(rawData.data.postLike)) {
        thePostLikes.push(x);
      }
    }

    const transformedData = {
      postComments: thePostComments,
      postContent: rawData.data.postContent,
      postDate: rawData.data.postDate,
      postID: rawData.data.postID,
      postLike: thePostLikes,
      postTitle: rawData.data.postTitle,
      studentNumber: rawData.data.studentNumber,
      userName: rawData.data.userName,
      userPic: rawData.data.userPic,
    };
    setIsLiked(thePostLikes.includes(loggedInUserName));

    // @ts-ignore
    setPostData(transformedData);
  }, [x.postID, navigate, loggedInUserName]);

  const [postData, setPostData] = useState<postData>({
    postComments: [],
    postContent: "",
    postDate: 0,
    postID: "",
    postLike: [],
    postTitle: "",
    studentNumber: "",
    userName: "",
    userPic: "",
  });
  const { postComments, postContent, postDate, postID, postLike, postTitle, userName, userPic } =
    postData;
  const dateD = useDate(postDate);
  const likePostHandler = async () => {
    if (isLiked) {
      const fbReference = ref(getDB, "posts/" + postID + "/postLike/" + loggedInUserName);
      await setFB(fbReference, "");
      fetchPostDetails();
    } else {
      const fbReference = ref(getDB, "posts/" + postID + "/postLike/" + loggedInUserName);
      await setFB(fbReference, loggedInUserName);
      fetchPostDetails();
    }
  };
  const deletePostHandler = async () => {
    startLoading();
    await deletePostById(x.postID!);
    navigate("/psaufeed");
  };

  const deleteCommentHandler = async (postID: string, commentID: string) => {
    startLoading2();
    await deleteCommentById(postID, commentID);
    fetchPostDetails();
  };

  useEffect(() => {
    fetchPostDetails();
  }, [fetchPostDetails]);

  return (
    <>
      <ThemeProvider theme={{ postsBG, postsText }}>
        <DivPsauFeedPostsContainer>
          <DivPostContainer style={{ marginTop: "100px", zIndex: "0" }}>
            <DivPostAuthorTitle>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src={userPic} alt='Loading' width={70} height={70} />
              </div>
              <span>
                <span style={{ fontWeight: "bold", color: "gray" }}>{userName}</span>
                <h3>{postTitle}</h3>
                {postContent}
              </span>
            </DivPostAuthorTitle>
            <DivPostLikeCommentContainer style={{ marginTop: "1em" }}>
              <span>
                <span style={{ color: "#082f7b" }}>
                  <MdDateRange />
                </span>
                <b>{dateD}</b>
              </span>
              <span>
                <span
                  onClick={() => {
                    likePostHandler();
                  }}
                  style={{ color: "#c31b1b", cursor: "pointer" }}
                >
                  {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
                </span>
                <b>{postLike.filter((x) => x !== "").length} Likes</b>
              </span>

              {loggedInUserName === userName && (
                <span>
                  <span onClick={deletePostHandler} style={{ cursor: "pointer" }}>
                    <span style={{ color: "#8d0b0b" }}>
                      <MdDeleteForever />
                    </span>
                    <b>{LoadingCircle === "Delete Post" ? "Delete Post" : "Deleting Post"}</b>
                  </span>
                </span>
              )}
            </DivPostLikeCommentContainer>
            <hr style={{ borderTop: "3px solid #a6af59" }} />
            <h4>Comments</h4>

            <CreateComment
              postID={postID}
              loggedInUserName={loggedInUserName}
              postFetch={fetchPostDetails}
              loggedInUserPic={loggedInUserPic}
            />
            {postComments &&
              postComments
                .sort((a: any, b: any) => a.commentDate - b.commentDate)
                .map((x: any) => (
                  <DivCommentContainer key={uniqid()}>
                    <div>
                      <img src={x.userPicL} alt='' height={50} width={50} />
                    </div>
                    <div>
                      <span style={{ fontWeight: "bold", color: "gray" }}>{x.userName}</span>
                      <p style={{ margin: "0" }}>{x.commentContent} </p>

                      {(loggedInUserName === x.userName || loggedInUserName === userName) && (
                        <span
                          onClick={() => {
                            deleteCommentHandler(postID, x.commentID);
                          }}
                          style={{ cursor: "pointer", color: "#ff6565" }}
                        >
                          <span style={{ color: "#c12626", fontSize: "1.5rem" }}>
                            <MdDeleteForever />
                          </span>
                          Delete Comment
                        </span>
                      )}
                    </div>
                  </DivCommentContainer>
                ))}
          </DivPostContainer>
        </DivPsauFeedPostsContainer>
      </ThemeProvider>
    </>
  );
};

export default PostDetails;
