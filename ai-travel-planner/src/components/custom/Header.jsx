import React, { useEffect } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNavigation } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    console.log("user", user);
  });
  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <img src="/logo.svg" />
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="rounded-full bg-background text-foreground"
            >
              My Trips
            </Button>
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
          <Button className="">Get Started</Button>
        )}
      </div>
    </div>
  );
}

export default Header;
