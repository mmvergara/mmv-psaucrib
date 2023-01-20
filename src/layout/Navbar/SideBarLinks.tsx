import { DivSideBar } from "../../style/StyledComponents";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { GetLink } from "./Links/Links";
import uniqid from "uniqid";
const SideBarLinks: React.FC = () => {
  const { userCredential } = useSelector((state: any) => state.accountSlice.userInfo);
  const { navBg } = useSelector((state: any) => state.uiSlice.theme);
  const { SideNav: sideNavVisible } = useSelector((state: any) => state.uiSlice);

  const [adminPanel, psauChat, newsFeed, switchTheme, logOut] = [
    <GetLink key={uniqid()} getLink='adminpanel' />,
    <GetLink key={uniqid()} getLink='psauchat' />,
    <GetLink key={uniqid()} getLink='psaufeed' />,
    <GetLink key={uniqid()} getLink='themeswitch' />,
    <GetLink key={uniqid()} getLink='logout' />,
  ];

  return ( 
    <ThemeProvider theme={{ navBg: navBg }}>
      <DivSideBar className={`${sideNavVisible && "sideBarIn"}`}>
        {userCredential === "admin" && [adminPanel,psauChat]}
        {userCredential === "psauStudent" && psauChat}
        {userCredential !== "" && [newsFeed, switchTheme, logOut]}
      </DivSideBar>
    </ThemeProvider>
  );
};

export default SideBarLinks;
