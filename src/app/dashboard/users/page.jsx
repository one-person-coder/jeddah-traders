import UserCards from "@/components/Card/UserCards";
import UserLists from "@/components/Card/UserLists";
import { ErrorToast } from "@/components/utils/CustomToasts";

const UsersPage = async () => {
  const response = await fetch(`${process.env.MAIN_API}/api/users/status`, {
    method: "GET",
  });
  const userStatus = await response.json();

  if (!userStatus.success) {
    ErrorToast("User Cannot Fetch Server Error");
  }

  if (!userStatus.success) {
    ErrorToast("User Cannot Fetch Server Error");
  }

  return (
    <div className="custom-width">
      <UserCards data={userStatus} />
      <UserLists data={userStatus} />
    </div>
  );
};

export default UsersPage;
