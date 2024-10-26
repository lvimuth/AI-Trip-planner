import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

function Header() {
  const [openDialog, setOpenDialog] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    console.log("user", user);
  });
  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        localStorage.setItem("user", JSON.stringify(response.data));
        setOpenDialog(false);
        window.location.reload();
      });
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (err) => console.log(err),
  });
  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <a href="/">
        <img src="/logo.svg" />
      </a>

      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <a href="/create-trip">
              <Button
                variant="outline"
                className="rounded-full bg-background text-foreground"
              >
                + Create a Trip
              </Button>
            </a>
            <a href="/my-trips">
              <Button
                variant="outline"
                className="rounded-full bg-background text-foreground"
              >
                My Trips
              </Button>
            </a>
            {console.log(user.picture)}

            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture}
                  className="h-[30px] w-[30px] rounded-full"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className="cursor-pointer flex justify-center"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  LogOut
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={setOpenDialog} className="">
            Sign In
          </Button>
        )}
      </div>
      <Dialog
        open={openDialog}
        onOpenChange={(isOpen) => setOpenDialog(isOpen)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <DialogTitle>Sign In</DialogTitle>
              <img src="/logo.svg" alt="" />
              <h2 className="font-bold text-lg mt-7">Sign In with Google</h2>
              <p>Sign in with Google Authentication to the app securely</p>
              <Button
                onClick={googleLogin}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className="h-9 w-9" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
