import { GrSearch } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { DivControlFeedBtnsContainer, DivControlFeedContainer } from "../../style/StyledComponents";
import Dropdown from "react-bootstrap/Dropdown";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { useRef } from "react";

interface CFProsp {
  onSearchHandler: Function;
  onFilterHandler: Function;
}

const ControlFeed: React.FC<CFProsp> = ({ onSearchHandler, onFilterHandler }: CFProsp) => {
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement | null>(null!);
  const { type, posts } = useSelector((state: any) => state.uiSlice.theme);
  const variant = type === "darkmode" ? "dark" : "light";
  return (
    <ThemeProvider theme={{ postFeedControlButtons: posts.postFeedControlButtons, type }}>
      <DivControlFeedContainer>
        <b>Welcome to Psau Crib</b>
        <DivControlFeedBtnsContainer>
          <Button
            variant={variant}
            onClick={() => {
              navigate("/createpost");
            }}
          >
            Create post
          </Button>

          <Dropdown onSelect={(e)=>{onFilterHandler(e)}}>
            <Dropdown.Toggle id='dropdown-button-dark-example1' variant={variant}>
              Sort By
            </Dropdown.Toggle>
            <Dropdown.Menu  onSelect={(e)=>{console.log(e)}} variant={variant}>
              <Dropdown.Item eventKey='most-recent' active>Most Recent Post</Dropdown.Item>
              <Dropdown.Item eventKey='most-discussed' >Most Discussed Post</Dropdown.Item>
              <Dropdown.Item eventKey='most-liked'>Most Liked Post</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </DivControlFeedBtnsContainer>
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            onSearchHandler(searchInputRef.current?.value!);
          }}
        >
          <GrSearch />
          <input ref={searchInputRef} type='text' placeholder='Search a post . . .' />
        </form>
      </DivControlFeedContainer>
    </ThemeProvider>
  );
};
export default ControlFeed;
