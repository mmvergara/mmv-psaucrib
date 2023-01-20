import { useEffect } from "react";
import Login from "../components/login/Login";
import { DivLoginContainerPsauHomePage } from "../components/psaufeed/style/FeedStyledComponents";
import {
  DivHomePageMainContainer,
  DivWelcomeTextContainerPsauHomePage,
} from "../style/StyledComponents";

const HomePage: React.FC = () => {

  return (
    <DivHomePageMainContainer>
      <DivWelcomeTextContainerPsauHomePage />
      <DivLoginContainerPsauHomePage>
        <Login />
      </DivLoginContainerPsauHomePage>
    </DivHomePageMainContainer>
  );
};

export default HomePage;