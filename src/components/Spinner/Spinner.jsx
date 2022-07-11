import { TailSpin } from "react-loader-spinner";
import { SpinnerWrapper } from "./Spinner.styled.jsx";
const Spinner = () => {
  return (
    <SpinnerWrapper>
      <TailSpin color="orange" ariaLabel="loading" />
    </SpinnerWrapper>
  );
};

export default Spinner;
