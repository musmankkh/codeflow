import { HiOutlineSave } from "react-icons/hi";
import { InputWithLabel, Sidebar, SimpleInput, WhiteButton } from "../components";
import { useState, useEffect } from "react";
import { useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Assuming route is /users/edit/:id


  const [inputObject, setInputObject] = useState({
    name: "",
    email: "",
  });

  // Fetch user data to pre-fill form
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/profile/${id}`);
        const user = response.data;

        setInputObject({
          name: user.name,
          email: user.email,
        });
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchProfile();
  }, [id]);

  const handleUpdate = async () => {

    try {
      const updatedData: {
        name: string,
        email: string;
      } = {
        name: inputObject.name,
        email: inputObject.email,
       
      };
  

  
      await axios.put(`http://localhost:8080/api/users/profile/${id}`, updatedData);
      alert("Profile updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update user.");
    }
  };
  
  return (
    <div className="h-auto border-t border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />
      <div className="dark:bg-blackPrimary bg-whiteSecondary w-full">
        <div className="dark:bg-blackPrimary bg-whiteSecondary py-10">
          <div className="px-4 sm:px-6 lg:px-8 pb-8 border-b border-gray-800 flex justify-between items-center max-sm:flex-col max-sm:gap-5">
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                Your Profile
              </h2>
            </div>
            {/* Profile update button or any other action */}
            <WhiteButton
                onClick={handleUpdate} // Use the handleUpdate function here
                textSize="lg"
                width="48"
                py="2"
                text="Update profile"
              >
                <HiOutlineSave className="dark:text-blackPrimary text-whiteSecondary text-xl" />
              </WhiteButton>
          </div>
          <div className="px-4 sm:px-6 lg:px-8 pb-8 pt-8">
            {/* Profile details section */}
            <div className="flex flex-col gap-4">
              {/* Example: Displaying user information */}
              <div className="flex justify-between items-center max-sm:flex-col max-sm:gap-10">
              <div className="flex items-center gap-4">
                <img
                  src="/src/assets/profile.jpg"
                  alt="Profile"
                  className="rounded-full w-20 h-20"
                />
                <div>
                  <p className="dark:text-whiteSecondary text-blackPrimary text-xl">
                    {inputObject.name}
                  </p>
              
                </div>
              </div>
              
            
              </div>
              {/* Additional sections like password change, email update, etc. */}
              <div className="flex flex-col gap-3 mt-5">
                <InputWithLabel label="Your username">
                  <SimpleInput
                    type="text"
                    placeholder="Your Name"
                    value={inputObject.name}
                    onChange={(e) =>
                      setInputObject({
                        ...inputObject,
                        name: e.target.value,
                      })
                    }
                  />
                </InputWithLabel>
                <InputWithLabel label="Your email">
                  <SimpleInput
                    type="text"
                    placeholder="Your email"
                    value={inputObject.email}
                    onChange={(e) =>
                      setInputObject({ ...inputObject, email: e.target.value })
                    }
                  />
                </InputWithLabel>
                {/* <InputWithLabel label="New password">
                  <SimpleInput
                    type="password"
                    placeholder="Enter your new password..."
                    value={inputObject.passwor}
                    onChange={(e) =>
                      setInputObject({
                        ...inputObject,
                        password: e.target.value,
                      })
                    }
                  />
                </InputWithLabel> */}
                {/* <InputWithLabel label="Confirm new password">
                  <SimpleInput
                    type="password"
                    placeholder="Confirm your new password..."
                    value={inputObject.confirmPassword}
                    onChange={(e) =>
                      setInputObject({
                        ...inputObject,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </InputWithLabel> */}
              </div>
            </div>
          </div>
          {/* Notifications section, already implemented in the provided code */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
