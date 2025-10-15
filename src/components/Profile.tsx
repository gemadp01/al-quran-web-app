// type ProfileProps = {
//   greeting: string;
//   name: string;
//   avatar: string;
// };

import { getGreeting } from "../utils/greeting";

function Profile() {
  const currentDate = new Date();
  
  return (
    <div className="flex justify-between items-start">
      <div className="space-y-2">
        <p className="text-left text-xl font-bold text-light">{getGreeting()}</p>
        <p className="text-left text-sm text-light/80">
          {
            currentDate.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })
          }
        </p>
      </div>
    </div>
  );
}

export default Profile;
