import React, { useEffect, useState } from "react";
import CityAutocomplete from "../components/CityAutocomplete";
import { Input } from "../components/ui/input";
import { SelectBudgetOptions, SelectTravelesList } from "../constants/options";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { AI_PROMPT } from "../constants/options";
import chatsession from "../service/AIModal";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../service/firebaseConfig";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "../components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formdata, setFormdata] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setloading] = useState(false);
  const  navigate=useNavigate();
  const handleInputChange = (name, value) => {
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      GetUserProfile(tokenResponse);
    },
    onError: (error) => console.log(error),
  });

  useEffect(() => {
    console.log(formdata);
  }, [formdata]);

  const GetUserProfile = async (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDialog(false);
        OnGenerateTrip();
      });
  };

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      !formdata.noOfdays ||
      formdata.noOfdays > 10 ||
      !formdata.location ||
      !formdata.budget ||
      !formdata.traveler
    ) {
      toast("Please Fill All Details....");
      return;
    }
    setloading(true);
    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formdata?.location)
      .replace("{totalDays}", formdata.noOfdays)
      .replace("{traveler}", formdata.traveler)
      .replace("{budget}", formdata.budget)
      .replace("{totalDays}", formdata.noOfdays);

    console.log(FINAL_PROMPT);

    const result = await chatsession.sendMessage(FINAL_PROMPT);
    const aiText = await result?.response?.text(); // ✅ Await here
    console.log(aiText);
    setloading(false);
    SaveAiTrip(aiText);
  };

  const SaveAiTrip = async (TripData) => {
    setloading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formdata,
      tripData: TripData ? JSON.parse(TripData) : null, // ✅ Defensive check
      userEmail: user?.email,
      id: docId,
    });
    setloading(false);
    navigate('/view-trip/'+docId);
    toast.success("Trip Generated Successfully");
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl text-center">
        Tell Your Preferences 🚗 ✈️ 🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xl text-center">
        Just Provide Some Basic Information, And our Trip Planner will generate
        a customized itinerary based on your Preferences.
      </p>

      <div className="mt-20 flex justify-center flex-col gap-10">
        <h2 className="text-xl my-3 font-medium">
          What is your destination of choice?
        </h2>
        <CityAutocomplete
          place={place}
          onChange={(v) => {
            setPlace(v);
            handleInputChange("location", v);
          }}
        />
      </div>

      <div>
        <h2 className="text-xl my-3 font-medium">
          How Many Days Are You Planning Your Trip?
        </h2>
        <Input
          type="number"
          placeholder="Ex.3"
          max={10}
          min={1}
          onChange={(e) =>
            handleInputChange("noOfdays", parseInt(e.target.value, 10))
          }
        />
      </div>

      <div>
        <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
        <div className="grid grid-cols-3 mt-5 gap-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("budget", item.title)}
              className={`gap-3 p-4 cursor-pointer rounded-lg border hover:shadow-lg ${
                formdata?.budget === item.title
                  ? "shadow-lg border-black"
                  : "border-gray-300"
              }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl my-3 font-medium">
          Who Do You Plan On Travelling With?
        </h2>
        <div className="grid grid-cols-3 mt-5 gap-5">
          {SelectTravelesList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("traveler", item.people)}
              className={`gap-3 p-4 cursor-pointer rounded-lg border hover:shadow-lg ${
                formdata?.traveler === item.people
                  ? "shadow-lg border-black"
                  : ""
              }`}
            >
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 flex justify-end">
        <Button disabled={loading} onClick={OnGenerateTrip}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip Plan"
          )}
        </Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" />
              <h2 className="font-bold text-lg mt-7">SIGN IN WITH GOOGLE</h2>
              <p>Sign in to the app with google authentication</p>

              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className="h-7 w-7" />
                Sign In with google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
