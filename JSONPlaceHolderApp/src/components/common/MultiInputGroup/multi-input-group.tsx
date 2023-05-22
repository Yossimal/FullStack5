import { InputGroup, Form } from "react-bootstrap";
import { StateSetter } from "../../../types/react.types";

type InputItemProps = {
  setter: StateSetter<any>;
  placeholder: string;
  propName: string;
};

function InputItem({ setter, placeholder, propName }: InputItemProps) {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setter((prev: any) => ({ ...prev, [propName]: e.target.value }));
  };

  return <Form.Control type="text" placeholder={placeholder} />;
}

export default function MultiInputGroup() {}
