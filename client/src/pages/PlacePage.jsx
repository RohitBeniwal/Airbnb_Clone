import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function PlacePage(){
    const {id}=useParams();
    useEffect(()=>{
        if(!id){
            return;
        }
        axios.get('/place/${id}').then()
    },[id]);
    return (
        <div className="mt-8">
            Place page: {id}
        </div>
    );
}