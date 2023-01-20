import Post from "./Posts/Post";
import "./PsauFeed.css";
import uniqid from "uniqid";
import { useEffect, useState } from "react";
import { postsDetails } from "../../types/AppInterfaces";
import { fetchAllPosts } from "../../firebase/FirebaseActions";
import ControlFeed from "./ControlFeed";
import WeatherDashboard from "./WeatherDashboard";
import {
  DivPsauFeedPostsContainer,
  DivPsauFlexFeedPostContainer,
  DivSideBarFeedContainer,
  DivWeatherDashboard,
} from "./style/FeedStyledComponents";
import { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";

const PsauFeed: React.FC = () => {
  const [origpostsList, origSetPostsList] = useState<postsDetails[]>([]);
  const [postsList, setPostsList] = useState<postsDetails[]>([]);
  const fetchAllThePosts = async () => {
    const result = await fetchAllPosts();
    origSetPostsList(result.sort((a, b) => +a.postDate - +b.postDate).reverse());
    setPostsList(result.sort((a, b) => +a.postDate - +b.postDate).reverse());
  };
  const { navBg } = useSelector((state: any) => state.uiSlice.theme);
  const onSearchHandler = (searchText: string) => {
    const filteredList = origpostsList.filter((post: postsDetails) => {
      return post.postTitle.toLowerCase().includes(searchText.toLowerCase());
    });
    setPostsList(filteredList);
  };

  const onFilterHandler = (filterMethod: string) => {
    switch (filterMethod) {
      case "most-recent":
        setPostsList((prev: postsDetails[]) => {
          const filteredMethod = [...prev].sort((a, b) => +a.postDate - +b.postDate).reverse();
          return filteredMethod;
        });
        break;
      case "most-discussed":
        setPostsList((prev: postsDetails[]) => {
          const filteredMethod = [...prev]
            .sort((a, b) => {
              return (
                Object.values(a.postComments || {}).filter((x) => x.commentContent !== "").length -
                Object.values(b.postComments || {}).filter((x) => x.commentContent !== "").length
              );
            })
            .reverse();
          return filteredMethod;
        });
        break;
      case "most-liked":
        setPostsList((prev: postsDetails[]) => {
          const filteredMethod = [...prev]
            .sort((a, b) => {
              return (
                Object.values(a.postLike || {}).filter((x) => x !== "").length -
                Object.values(b.postLike || {}).filter((x) => x !== "").length
              );
            })
            .reverse();
          return filteredMethod;
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    fetchAllThePosts();
  }, []);

  const postLista = postsList.map((p, index) => {
    let likeCount = 0;
    let commentCount = 0;
    if (p.postComments) {
      for (const x of Object.keys(p.postComments)) {
        if (x) commentCount++;
      }
    }
    if (p.postLike) {
      for (const y of Object.values(p.postLike)) {
        if (!!y) likeCount++;
      }
    }

    return (
      <Post
        key={uniqid()}
        postID={p.postID}
        postComments={commentCount}
        postContent={p.postContent.slice(0, 150) + " . . . . "}
        postAuthor={p.userName}
        postAuthorPic={p.userPic}
        postLikes={likeCount}
        postDate={p.postDate}
        postTitle={p.postTitle}
        index={index}
      />
    );
  });
  return (
    <>
      <DivPsauFeedPostsContainer>
        <DivPsauFlexFeedPostContainer>
          <ThemeProvider theme={{ navBg: navBg }}>
            <DivSideBarFeedContainer>
              <DivWeatherDashboard>
                <WeatherDashboard />
              </DivWeatherDashboard>
            </DivSideBarFeedContainer>
          </ThemeProvider>

          <div>
            <ControlFeed onFilterHandler={onFilterHandler} onSearchHandler={onSearchHandler} />
            {postLista}
          </div>
        </DivPsauFlexFeedPostContainer>
      </DivPsauFeedPostsContainer>
    </>
  );
};

export default PsauFeed;
