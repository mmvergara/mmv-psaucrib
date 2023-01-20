import { CgFeed } from "react-icons/cg";
import { FaBars } from "react-icons/fa";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { RiDashboardFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { DivMainNavLinks, LiBurger } from "../../../style/StyledComponents";
import { useNavigate } from "react-router-dom";
import { UISliceActions } from "../../../data/UISlice";
const MainNavLinks: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <DivMainNavLinks>
        <span
          onClick={() => {
            navigate("/psaufeed");
          }}
        >
          <CgFeed />
          <div>Feed</div>
        </span>
        <span
          onClick={() => {
            navigate("/psauchat");
          }}
        >
          <HiOutlineChatAlt2 />
          <div>Chat</div>
        </span>

        <span
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          <RiDashboardFill />
          <div>Dashboard</div>
        </span>

        <span>
          <LiBurger
            onClick={() => {
              dispatch(UISliceActions.toggleSideNav());
            }}
            className='liBurger'
            style={{ cursor: "pointer" }}
          >
            <FaBars />
          </LiBurger>
        </span>
      </DivMainNavLinks>
    </>
  );
};

export default MainNavLinks;
