import { useRef } from "react";
import useLoading from "../../../../hooks/UseLoading";
import { set, ref } from "firebase/database";
import { getDB } from "../../../../firebase/FirebaseDB";
import uniqid from "uniqid";
import { DivCommentContainer } from "../../style/FeedStyledComponents";

interface props {
  loggedInUserPic: string;
  loggedInUserName: string;
  postID: string;
  postFetch: Function;
}
const CreateComment: React.FC<props> = ({
  postID,
  loggedInUserName,
  loggedInUserPic,
  postFetch,
}: props) => {
  const { LoadingCircle, startLoading, endLoading } = useLoading("");

  const commentInputRef = useRef<HTMLInputElement | null>(null!);
  const commentSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startLoading();
    const time = new Date().getTime().toString();
    const commentID = uniqid() + time
    const data = {
      userName: loggedInUserName,
      userPicL: loggedInUserPic,
      commentContent: commentInputRef.current?.value!,
      commentDate: new Date().getTime(),
      commentID:commentID
    };

    const fbReference = ref(getDB, "posts/" + postID + "/postComments/" + commentID);
    await set(fbReference, data);
    endLoading();
    postFetch();
  };

  return (
    <DivCommentContainer>
      <img src={loggedInUserPic} alt='' height={50} width={50} />
      <form onSubmit={commentSubmitHandler}>
        {LoadingCircle === "" ? (
          <input type='text' ref={commentInputRef} placeholder='Write a comment . . .' />
        ) : (
          <span className='svgInsidePostComment'>{LoadingCircle}</span>
        )}
      </form>
    </DivCommentContainer>
  );
};

export default CreateComment;
