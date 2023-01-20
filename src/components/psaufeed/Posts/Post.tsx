import { AiOutlineHeart } from "react-icons/ai";
import { BiCommentDots } from "react-icons/bi";
import { MdDateRange } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import useDate from "../../../hooks/UseDate";
import { DivPostAuthorTitle, DivPostContainer, DivPostLikeCommentContainer } from "../style/FeedStyledComponents";

interface PostProps {
  postComments: number;
  postAuthor: string;
  postAuthorPic: string;
  postID: string;
  postLikes: number;
  postDate: string;
  postTitle: string;
  postContent: string;
  index: number;
}
const Post: React.FC<PostProps> = ({
  postComments,
  postAuthor,
  postID,
  postAuthorPic,
  postLikes,
  postDate,
  postTitle,
  postContent,
  index,
}: PostProps) => {

  
  const navigate = useNavigate();
  const { postsBG, postsText } = useSelector((state: any) => state.uiSlice.theme.posts);
  const moreDetails = () => {
    navigate(`/postdetails/${postID}`);
  };
  const dateD = useDate(Number(postDate));

  return (
    <ThemeProvider theme={{ postsBG, postsText }}>
      <DivPostContainer style={{ animationDelay: `${(index + 1) / 10}s` }}>
        <DivPostAuthorTitle style={{ cursor: "pointer" }} onClick={moreDetails}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={postAuthorPic} alt='AuthorImage' width={70} height={70} />
          </div>
          <span>
            <span style={{ fontWeight: "bold", color: "gray" }}>{postAuthor}</span>
            <h3>{postTitle}</h3>
            {postContent}
          </span>
        </DivPostAuthorTitle>
        <hr style={{ borderTop: "3px solid #a6af59" }} />
        <DivPostLikeCommentContainer>
          <span>
            <span style={{ color: "#082f7b" }}>
              <MdDateRange />
            </span>
            <b>{dateD}</b>
          </span>
          
          <span style={{ cursor: "pointer" }} onClick={moreDetails}>
            <span style={{ color: "#c31b1b" }}>
              <AiOutlineHeart />
            </span>
            <b>{postLikes} Likes</b>
          </span>

          <span style={{ cursor: "pointer" }} onClick={moreDetails}>
            <BiCommentDots /> <b>{postComments} Comments</b>
          </span>
        </DivPostLikeCommentContainer>
      </DivPostContainer>
    </ThemeProvider>
  );
};

export default Post;
