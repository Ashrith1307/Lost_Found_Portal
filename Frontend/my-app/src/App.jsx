import ButtonComponent from "./Components/ButtonComponent";
import Reject from "./Components/ButtonComponent";

export default function Even() {
  const bool = false;
  return <>{bool ? <ButtonComponent /> : <Reject />}</>;
}
