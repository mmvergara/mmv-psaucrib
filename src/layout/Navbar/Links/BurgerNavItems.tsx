import { FaBars } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { DivUserInfoNav, LiBurger, UlNavTag } from "../../../style/StyledComponents";
import { UISliceActions } from "../../../data/UISlice";
const BurgerNavItems: React.FC = () => {
  const { userCredential } = useSelector((state: any) => state.accountSlice.userInfo);
  const dispatch = useDispatch();
  return (
    <UlNavTag>
      {!!userCredential && (
        <>
          <UserInfoNav/>
          <LiBurger
            onClick={() => {
              dispatch(UISliceActions.toggleSideNav());
            }}
            className='liBurger'
            style={{ cursor: "pointer" }}
          >
            <FaBars />
          </LiBurger>
        </>
      )}
    </UlNavTag>
  );
};

export default BurgerNavItems;

function UserInfoNav() {
  const { userName, userPic } = useSelector((state: any) => state.accountSlice.userInfo);

  return (
    <DivUserInfoNav>
      <img
        className='iconPic'
        src={
          userPic ||
          "https://upload.wikimedia.org/wikipedia/commons/7/73/Sir_James_Brooke_%281847%29_by_Francis_Grant.jpg"
        }
        alt='PicIcon'
        height={30}
        width={30}
      />
      {userName}
    </DivUserInfoNav>
  );
}
