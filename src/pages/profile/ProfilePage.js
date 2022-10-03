import React from "react";
import userService from "../../services/user/user-service";
import userProfilePlaceholder from "../../assets/user-profile-placeholder.svg";

function ProfilePage() {
  const user = userService.getUser();
  return (
    <div className="container">
      <div className="flex flex-col sm:flex-row items-center gap-10 text-center sm:text-left">
        <div className="border border-black rounded-full w-36 h-36">
          <img src={userProfilePlaceholder} alt="" className="w-full h-full rounded-full" />
        </div>
        <div>
          <h1 className="text-4xl font-black">{`${user.firstname} ${user.familyname}`}</h1>
          <p className="text-[#959191]">{user.role}</p>
          <p className="text-[#959191]">{user.email}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
