import "./NavBar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  DivNavBarContainer,
  DivPSauCribText,
  DivPSauCribTextClone,
} from "../../style/StyledComponents";
import SideBarLinks from "./SideBarLinks";
import { ThemeProvider } from "styled-components";
import MainNavLinks from "./Links/MainNavLinks";
import BurgerNavItems from "./Links/BurgerNavItems";
const NavBar: React.FC = () => {
  const { userCredential } = useSelector((state: any) => state.accountSlice.userInfo);
  const { navBg } = useSelector((state: any) => state.uiSlice.theme);

  return (
    <ThemeProvider theme={{ navBg }}>
      <SideBarLinks />

      <DivNavBarContainer>
        {!!userCredential ? (
          <DivPSauCribText>
            <Link to='/psaufeed'>PSAU CRIB</Link>
          </DivPSauCribText>
        ) : (
          <DivPSauCribTextClone>
            <Link to='/'>PSAU CRIB</Link>
          </DivPSauCribTextClone>
        )}

        {!!userCredential && <MainNavLinks />}

          <BurgerNavItems />


      </DivNavBarContainer>
    </ThemeProvider>
  );
};

export default NavBar;
