import { toast } from "react-toastify";
import { TasksComponent } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData, Link, NavLink } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
import { useContext, createContext } from "react";
import { styled } from "styled-components";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/tasks");
    // console.log(data);
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const tasksContext = createContext();

const Tasks = () => {
  const { data } = useLoaderData();
  return (
    <>
      <h2>Tasks</h2>
      <Link to="createtask">
        <CiSquarePlus /> createTask
      </Link>
      {/* <NavLink to="createtask">
        <CiSquarePlus /> createTask Nav
      </NavLink> */}
      <tasksContext.Provider value={{ data }}>
        <TasksComponent />
      </tasksContext.Provider>
    </>
  );
};

const Wrapper = styled.div`
  background: skyblue;
`;

export default Tasks;

export const useTasksContext = () => useContext(tasksContext);
