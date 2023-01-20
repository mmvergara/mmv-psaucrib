import { Button, Container, Divider, TextField, Typography } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { addTDLDatabase, deleteTDLDatabase } from "../../../firebase/FirebaseActions";
import uniqid from "uniqid";
import { firebaseURL } from "../../../config";
const TodoListPage: React.FC = () => {
  const [userInput, setUserInput] = useState<string>("");
  const { studentNumber } = useSelector((state: any) => state.accountSlice.userInfo);
  const [userTodoList, setUserTodoList] = useState<
    { text: string; studentNumber: string; todoId: string }[]
  >([]);

  const fetchAllTodoListId = async (studentNumber: string) => {
    const result = (await axios.get(
      `${firebaseURL}/todolist.json`
    )) as AxiosResponse<{ string: { text: string; studentNumber: string } }>;
    const gather = [];
    if (result.data) {
      for (const [k, v] of Object.entries(result.data)) {
        if (v.studentNumber === studentNumber) {
          const data = { ...v, todoId: k };
          gather.push(data);
        }
      }
    }

    setUserTodoList(gather);
  };
  useEffect(() => {
    fetchAllTodoListId(studentNumber);
  }, [studentNumber]);

  const submitNewTodoListHandler = async () => {
    await addTDLDatabase({ studentNumber: String(studentNumber), text: userInput });
    await fetchAllTodoListId(studentNumber);
    setUserInput("");
  };
  const deleteTodoListHandler = async (todoId: string) => {
    await deleteTDLDatabase(todoId);
    await fetchAllTodoListId(studentNumber);
  };

  return (
    <Container sx={{ paddingTop: "150px" }}>
      <Container sx={{ color: "white", backgroundColor: "#2b4829", padding: "20px 10px" }}>
        <Typography variant='h4' component='h5'>
          My Todo List
        </Typography>
        <TextField
          sx={{ color: "white" }}
          style={{ backgroundColor: "#ffffff9b" }}
          color='success'
          id='filled-basic'
          label='Add a todo list'
          variant='filled'
          type='text'
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setUserInput(e.target.value!);
          }}
          value={userInput}
        />
        <Button
          sx={{ padding: "1.1em 1em", marginLeft: "1em" }}
          variant='contained'
          color='success'
          onClick={submitNewTodoListHandler}
        >
          Add
        </Button>
        <Divider sx={{ padding: "0.2em 0em", margin: "1em 0em", backgroundColor: "gray" }} />
        {userTodoList.map((x) => {
          return (
            <div key={uniqid()} style={{ display: "flex", marginBottom: "20px" }}>
              <Typography
                variant='h4'
                component='h5'
                style={{ wordWrap: "break-word", overflowWrap: "break-word" }}
              >
                {x.text}
              </Typography>
              <Button
                sx={{ padding: "0.3em 1em", marginLeft: "1em" }}
                variant='contained'
                color='error'
                onClick={() => {
                  deleteTodoListHandler(x.todoId);
                }}
              >
                Delete
              </Button>
            </div>
          );
        })}
      </Container>
    </Container>
  );
};

export default TodoListPage;
