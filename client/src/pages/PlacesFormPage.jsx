import { useEffect, useState } from "react";
import Perks from "../Perks";
import PhotosUploader from "../PhotosUploader";
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";

export default function PlacesFormPage(){
  const {id}=useParams();
  // console.log({id});
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [photos, setPhotos] = useState([]);
    const [description, setDescription] = useState("");
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [maxGuests, setMaxGuests] = useState(1);
    const [redirect,setRedirect]=useState(false);
    useEffect(()=>{
      if(!id){
        return;
      }
      axios.get('/places/'+id).then(response=>{
        const {data}=response;
        setTitle(data.title);
        setAddress(data.address);
        setPhotos(data.photos);
        setDescription(data.description);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setMaxGuests(data.maxGuests);
      });
    },[id]);

    function inputHeader(text) {
        return <h2 className="text-2xl mt-4">{text}</h2>;
      }
    
      function inputDescription(text) {
        return <p className="text-gray-500 text-sm">{text}</p>;
      }
    
      function preInput(header, description) {
        return (
          <>
            {inputHeader(header)}
            {inputDescription(description)}
          </>
        );
      }
    
      async function savePlace(ev) {
        ev.preventDefault();
        const placeData={photos,
          description,
          title,
          address,
          perks,
          extraInfo,
          checkIn,
          checkOut,
          maxGuests,};
        if(id){
          await axios.put("/places", {
            id,
            ...placeData
          });
          setRedirect(true);
        }
        else{

          await axios.post("/places",placeData);
          setRedirect(true);
        }
      }

      if(redirect){
        return <Navigate to={'/account/places'}/>
      }

    return (
        <>
        <div>
          <AccountNav/>
          <form onSubmit={savePlace}>
            {inputHeader("Title")}
            <input
              type="text"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
              placeholder="title , For example: My Lovely Apartment"
            />
            {inputHeader("Address")}
            <input
              type="text"
              value={address}
              onChange={(ev) => setAddress(ev.target.value)}
              placeholder="address"
            />
            {inputHeader("Photos")}
            <PhotosUploader photos={photos} onChange={setPhotos} />
            {preInput("Description", "description of the place")}
            <textarea
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            />
            {preInput("Perks", "Select all the perks of your place")}
            <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              <Perks selected={perks} onChange={setPerks} />
            </div>
            {preInput("Extra Info", "Rule & Regulations ,  etc.")}
            <textarea
              value={extraInfo}
              onChange={(ev) => setExtraInfo(ev.target.value)}
            />
            {preInput(
              "Check in & out times",
              "Add check in and check out time,remember to have some time window for cleaning the rooms"
            )}
            <div className="grid gap-2 sm:grid-cols-3">
              <div>
                <h3 className="mt-2 -mb-1">Check in time</h3>
                <input
                  value={checkIn}
                  onChange={(ev) => setCheckIn(ev.target.value)}
                  type="text"
                  placeholder="14"
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Check out time</h3>
                <input
                  value={checkOut}
                  onChange={(ev) => setCheckOut(ev.target.value)}
                  type="text"
                  placeholder="11"
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Max guests</h3>
                <input
                  type="number"
                  value={maxGuests}
                  onChange={(ev) => setMaxGuests(ev.target.value)}
                />
              </div>
            </div>
            <button className="primary my-4">Save</button>
          </form>
        </div>
        </>
    );
}