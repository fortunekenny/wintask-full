import { styled } from "styled-components";
import { FormRow } from "../components";
// import { useOutletContext } from "react-router-dom";
import { Form, useNavigation, redirect, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { RiCheckboxBlankFill } from "react-icons/ri";
import customFetch from "../utils/customFetch";
import { CiSquarePlus } from "react-icons/ci";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/tasks", data);
    console.log(data);
    toast.success("Task created");
    return redirect("/userpage");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const CreateTask = () => {
  // const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <h3>CreateTask Page</h3>
      <Link to="..">
        <CiSquarePlus /> userpage
      </Link>
      <Form method="post">
        <div className="">
          <FormRow type="text" name="title" labelText="Title" />
          <FormRow
            type="number"
            name="alarmHour"
            labelText="Hour"
            min="0"
            max="23"
          />
          <FormRow
            type="number"
            name="alarmMinute"
            labelText="Minute"
            min="0"
            max="59"
          />
          <button
            type="submit"
            className="btn btn-block form-btn "
            disabled={isSubmitting}
          >
            {isSubmitting ? "submitting..." : "submit"}
          </button>
        </div>
        {/* <button type="button">
          active/inactive
          <RiCheckboxBlankFill />
        </button>
        <div className="">
          <button type="button">repeat</button>
          <button type="button">cancel</button>
          <button type="button">delete</button>
        </div> */}
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: skyblue;
`;

export default CreateTask;

/*
const remainingTime = () => {
  const timesNow = new Date();
  const remainingTime = futureTime.getTime() - timesNow.getTime();
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;

  let remainingHours = Math.floor(remainingTime / oneHour);
  let remainingMinutes = Math.floor((remainingTime % oneHour) / oneMinute);
  let remainingSeconds = Math.floor((remainingTime % oneMinute) / 1000);

  remainingHours = remainingHours < 10 ? `0${remainingHours}` : remainingHours;
  remainingMinutes =
    remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes;
  remainingSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

  console.log(`${remainingHours}:${remainingMinutes}:${remainingSeconds}`);

  if (remainingTime < 1000) {
    clearInterval(countDown);
    console.log(`Time Up`);
  }

  return `${remainingHours}:${remainingMinutes}:${remainingSeconds}`;
};

let countDown = setInterval(remainingTime, 1000);

remainingTime();
*/
