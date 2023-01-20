import MultitaskCalcCard from "./dashcards/MultitaskCalcCard copy";
import PsauGradeCalc from "./dashcards/PsauGradeCalc";
import PsauWeatherCard from "./dashcards/PsauWeatherCard";
import TodolistCard from "./dashcards/TodolistCard";
import { DashboardIndexContainer } from "./style/DashboardSC";

const DashboardIndex: React.FC = () => {
  return (
    <DashboardIndexContainer>
      <PsauGradeCalc/>
      <TodolistCard/>
      <MultitaskCalcCard/>
      <PsauWeatherCard/>
    </DashboardIndexContainer>
  );
};

export default DashboardIndex;
