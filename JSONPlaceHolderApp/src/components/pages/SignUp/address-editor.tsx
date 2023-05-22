import { Address } from "../../../lib/data/dataObjects/User";
import { InputGroup, Form } from "react-bootstrap";
import { StateSetter } from "../../../types/react.types";

type AddressEditorProps = {
  setAddress: StateSetter<Address>;
};

export default function AddressEditor({
  setAddress,
}: AddressEditorProps) {
  const getChangeHandler = (key: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setAddress((prev: Address) => ({ ...prev, [key]: e.target.value }));
    };
  };

  return (
    <InputGroup>
      <InputGroup.Text>Address</InputGroup.Text>
      <Form.Control
        type="text"
        placeholder="street"
        onChange={getChangeHandler("street")}
      />
      <Form.Control
        type="text"
        placeholder="city"
        onChange={getChangeHandler("city")}
      />
      <Form.Control
        type="text"
        placeholder="suite"
        onChange={getChangeHandler("suite")}
      />
      <Form.Control
        type="text"
        placeholder="zip code"
        onChange={getChangeHandler("zipcode")}
      />
    </InputGroup>
  );
}
