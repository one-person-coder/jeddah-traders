import React from "react";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";

const Profile = () => {
  return (
    <div className="my-6 custom-width">
      <div className="flex flex-col md:flex-row gap-2">
        <div>
          <LeftSideBar />
        </div>
        <div>
          <RightSideBar />
        </div>
      </div>
    </div>
  );
};

export default Profile;
