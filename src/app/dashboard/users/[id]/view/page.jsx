import ViewUser from "@/components/User/ViewUser/ViewUser";
import connectDB from "@/dbConfig/config";
import UserInfo from "@/models/UserInfo";

const ViewPage = async ({ params }) => {
  const { id } = await params;

  await connectDB();

  const user = JSON.parse(
    JSON.stringify(
      await UserInfo.findById(id).select("-password -createdAt -updatedAt -__v")
    )
  );
  user.date = new Date(user.date).toISOString().split("T")[0];

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <ViewUser user={user} />
    </div>
  );
};

export default ViewPage;
