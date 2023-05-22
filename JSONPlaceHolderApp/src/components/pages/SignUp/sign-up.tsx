import Input from "../../common/Input/input";
import BlockButton from "../../common/BlockButton/block-button";
import { useState } from "react";
import { Address, Company } from "../../../lib/data/dataObjects/User";
import { State } from "../../../types/react.types";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [userName, setUserName] = useState("");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress]:State<Address> = useState({});
    const [website, setWebsite] = useState("");
    const [compant, setCompany]:State<Company> = useState({});



    return <h1>Sign Up</h1>;
}