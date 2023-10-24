import { useContext } from "react";
import { UserContext } from "../UserContext";

export default function AccountPage(){
    const {user}=useContext(UserContext);
    return(
        <div>
            account page for 
        </div>
    );
}