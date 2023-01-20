import "./AdminPanel.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import {
  addAccountToDatabase,
  deleteFromPending,
  fetchPendingAccounts,
} from "../../firebase/FirebaseActions";
import { useEffect, useState } from "react";
import { pendingAccountsDetails } from "../../types/AppInterfaces";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DivAdminPanelContainer } from "../../style/StyledComponents";
import useLoading from "../../hooks/UseLoading";
import { ThemeProvider } from "styled-components";
// import { SMTPClient } from "emailjs";

// const client = new SMTPClient({
//   user: "sample@gmail.com",
//   password: "ivtgkmstifvtnecl",
//   host: "smtp.gmail.com",
//   ssl: true,
// });

const AdminPanel: React.FC = () => {
  const [pAccounts, setPAccounts] = useState<pendingAccountsDetails[]>([]);
  const { userCredential } = useSelector((state: any) => state.accountSlice.userInfo);
  const { LoadingCircle, startLoading, endLoading } = useLoading("");
  const { adminPanel } = useSelector((state: any) => state.uiSlice.theme);

  const fetchRenderPendingAccounts = async () => {
    const data = await fetchPendingAccounts();
    setPAccounts(data);
  };

  const addAccountToDatabaseHandler = async (acc: pendingAccountsDetails) => {
    startLoading();
    await addAccountToDatabase(acc);
    await deleteFromPending(acc.studentNumber);

    // client.send(
    //   {
    //     from: "crownie1ab@gmail.com",
    //     subject: "[Approved] PSAU Crib Account",
    //     text: `Hello ${acc.userFullName}, You may now use your PSAU Crib Account`,
    //     to: acc.userEmail, // list of receivers
    //   },
    //   (err, message) => {
    //     console.log(err || message);
    //   }
    // );
    fetchRenderPendingAccounts();
    endLoading();
  };

  const deteleFromPendingHandler = async (acc: pendingAccountsDetails) => {
    startLoading();
    await deleteFromPending(acc.studentNumber);
    // const mailOptionsRejected = {
    //   from: "crownie1ab@gmail.com", // sender address
    //   to: acc.userEmail, // list of receivers
    //   subject: "[Rejected] PSAU Crib Account ", // Subject line
    //   html: `<p>Hello ${acc.userFullName}, Your Registration for PSAU Crib  </p>`, // plain text body
    // };

    // client.send(
    //   {
    //     from: "crownie1ab@gmail.com",
    //     subject: "[Rejected] PSAU Crib Account",
    //     text: `Hello ${acc.userFullName}, Your Registration for  PSAU Crib Account is rejected`,
    //     to: acc.userEmail, // list of receivers
    //   },
    //   (err, message) => {
    //     console.log(err || message);
    //   }
    // );
    fetchRenderPendingAccounts();
    endLoading();
  };
  const nav = useNavigate();
  useEffect(() => {
    fetchRenderPendingAccounts();
  }, []);
  if (userCredential !== "admin" || userCredential === "") {
    nav("/");
  }

  return (
    <ThemeProvider theme={{ adminPanel }}>
      <DivAdminPanelContainer>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Student Number</th>
              <th>Pic</th>
              <th>Verification Pic</th>
              <th>Full Name</th>
              <th>Email</th>
              <th className='actionSVG'>Actions {LoadingCircle}</th>
            </tr>
          </thead>
          <tbody>
            {pAccounts.map((acc) => {
              return (
                <tr key={acc.studentNumber}>
                  <td>{acc.studentNumber}</td>
                  <td>
                    <img src={acc.userPic} alt='No Pic' width={35} height={35} />
                  </td>
                  <td>
                    <a
                      href={acc.userPicVerification}
                      className='seeFullImage'
                      target='_blank'
                      rel='noreferrer'
                    >
                      See Full Image
                    </a>
                  </td>
                  <td>{acc.userFullName}</td>
                  <td>{acc.userEmail}</td>
                  <td>
                    <Button
                      onClick={() => {
                        addAccountToDatabaseHandler(acc);
                      }}
                      variant='success'
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={() => {
                        deteleFromPendingHandler(acc);
                      }}
                      className='adminActionsButtonsReject'
                      variant='danger'
                    >
                      Reject
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {pAccounts.length === 0 && <td style={{ paddingLeft: "7px" }}>Wow it's Empty 😮‍💨 </td>}
      </DivAdminPanelContainer>
    </ThemeProvider>
  );
};

export default AdminPanel;
