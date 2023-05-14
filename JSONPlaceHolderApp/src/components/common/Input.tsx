import { Form, InputGroup } from "react-bootstrap";

type InputProps = Partial<{
  inputType: string;
  placeholder: string;
  value: string;
  setter: (value: string) => void;
}>;

export default function Input({
  inputType,
  placeholder,
  value,
  setter,
}: InputProps) {
  return (
    <InputGroup>
      <Form.Control
        type={inputType ?? "text"}
        as={inputType === "textarea" ? "textarea" : "input"}
        placeholder={placeholder ?? ""}
        value={value ?? ""}
        onChange={(e) => {
          setter ? e.target.value : null;
        }}
      />
    </InputGroup>
  );
}
