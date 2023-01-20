import { AiOutlineIdcard } from "react-icons/ai";
import { BsChatTextFill } from "react-icons/bs";
import { CgFeed } from "react-icons/cg";
import { HiLogout } from "react-icons/hi";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { UISliceActions } from "../../../data/UISlice";

import { Link } from "react-router-dom";

interface GetLinkProps {
  getLink: "adminpanel" | "psauchat" | "psaufeed" | "themeswitch" | "logout";
}

export const GetLink: React.FC<GetLinkProps> = ({ getLink }: GetLinkProps) => {
  const { SideNav: sideNavVisible, theme } = useSelector((state: any) => state.uiSlice);
  const dispatch = useDispatch();
  const LinksList = {
    adminpanel: (
      <Link
        to='/adminpanel'
        style={{ animationDelay: "0.2s" }}
        className={`liIcons ${sideNavVisible && "liAnimation"}`}
        onClick={() => {
          dispatch(UISliceActions.hideSideNav());
        }}
      >
        Admin Panel
        <AiOutlineIdcard />
      </Link>
    ),
    psauchat: (
      <Link
        to='/psauchat'
        style={{ animationDelay: "0.3s" }}
        className={`liIcons ${sideNavVisible && "liAnimation"}`}
        onClick={() => {
          dispatch(UISliceActions.hideSideNav());
        }}
      >
        PSAU Chat <BsChatTextFill />
      </Link>
    ),
    psaufeed: (
      <Link
        to='/psaufeed'
        style={{ animationDelay: "0.3s" }}
        className={`liIcons ${sideNavVisible && "liAnimation"}`}
        onClick={() => {
          dispatch(UISliceActions.hideSideNav());
        }}
      >
        PSAU Feed
        <CgFeed />
      </Link>
    ),
    themeswitch: (
      <div
        style={{ animationDelay: "0.3s" }}
        className={`liIcons ${sideNavVisible && "liAnimation"}`}
        onClick={() => {
          dispatch(UISliceActions.hideSideNav());
          dispatch(UISliceActions.toggleTheme());
        }}
      >
        {theme.type === "lightmode" ? "Dark Mode" : "Light Mode"}
        <HiLogout />
      </div>
    ),
    logout: (
      <Link
        to='/logout'
        onClick={() => {
          dispatch(UISliceActions.hideSideNav());
        }}
        key={`logout`}
        style={{ animationDelay: "0.35s" }}
        className={`liIcons ${sideNavVisible && "liAnimation"}`}
      >
        Log Out
        <HiLogout />
      </Link>
    ),
  };

  return <>{LinksList[getLink]}</>;
};

// export const PSAUFeed: React.FC = () => {
//   const sideNavVisible = useSelector((state: any) => state.uiSlice.SideNav);

//   return <Link to='/psaufeed'></Link>;
// };

// export const PSAUFeed: React.FC = () => {
//   const sideNavVisible = useSelector((state: any) => state.uiSlice.SideNav);

//   return <Link to='/psaufeed'></Link>;
// };

// export const PSAUFeed: React.FC = () => {
//   const sideNavVisible = useSelector((state: any) => state.uiSlice.SideNav);

//   return <Link to='/psaufeed'></Link>;
// };
