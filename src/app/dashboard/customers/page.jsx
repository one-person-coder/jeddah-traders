import UserCards from "@/components/Card/UserCards";
import UserLists from "@/components/Card/UserLists";
import connectDB from "@/dbConfig/config";
import UserInfo from "@/models/UserInfo";

export const revalidate = 0;

const UsersPage = async () => {
  await connectDB();
  const users = JSON.parse(
    JSON.stringify(
      await UserInfo.find({
        role: { $in: ["admin", "manager"] },
      }).select("-password")
    )
  );

  

  return (
    <div className="custom-width">
      <UserCards data={users} />
      <UserLists data={users} />
    </div>
  );
};

export default UsersPage;
