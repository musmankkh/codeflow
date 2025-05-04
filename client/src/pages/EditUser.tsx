import { AiOutlineSave } from "react-icons/ai";
import { HiOutlineSave } from "react-icons/hi";
import {
  InputWithLabel,
  Sidebar,
  SimpleInput,
  WhiteButton,
} from "../components";
import SelectInput from "../components/SelectInput";
import { roles } from "../utils/data";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
  const { id } = useParams(); // Assuming route is /users/edit/:id
  const navigate = useNavigate();

  const [inputObject, setInputObject] = useState({
    name: "",
    email: "",
   
    role: "",
  });

  // Fetch user data to pre-fill form
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/${id}`);
        const user = response.data;

        setInputObject({
          name: user.name,
          email: user.email,
     
          role: user.role,
        });
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, [id]);

  const handleUpdate = async () => {

    try {
      const updatedData: {
        name: string,
        email: string;
        role: string;
      } = {
        name: inputObject.name,
        email: inputObject.email,
        role: inputObject.role,
      };
  

  
      await axios.put(`http://localhost:8080/api/users/${id}`, updatedData);
      alert("User updated successfully!");
      navigate("/users");
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
                Edit user
              </h2>
            </div>
            <div className="flex gap-x-2 max-[370px]:flex-col max-[370px]:gap-2 max-[370px]:items-center">
              <button
                onClick={handleUpdate}
                className="dark:bg-blackPrimary border border-gray-600 w-48 py-2 text-lg dark:hover:border-gray-500 hover:border-gray-400 duration-200 flex items-center justify-center gap-x-2"
              >
                <AiOutlineSave className="dark:text-whiteSecondary text-blackPrimary text-xl" />
                <span className="dark:text-whiteSecondary text-blackPrimary font-medium">
                  Save changes
                </span>
              </button>
              <WhiteButton
                link="/users"
                textSize="lg"
                width="48"
                py="2"
                text="Back to users"
              >
                <HiOutlineSave className="dark:text-blackPrimary text-whiteSecondary text-xl" />
              </WhiteButton>
            </div>
          </div>

          <div className="px-4 sm:px-6 lg:px-8 pb-8 pt-8 grid grid-cols-2 gap-x-10 max-xl:grid-cols-1 max-xl:gap-y-10">
            <div>
              <h3 className="text-2xl font-bold dark:text-whiteSecondary text-blackPrimary">
                User information
              </h3>

              <div className="mt-4 flex flex-col gap-5">

                <InputWithLabel label="Name">
                  <SimpleInput
                    type="text"
                    placeholder="Enter last name"
                    value={inputObject.name}
                    onChange={(e) =>
                      setInputObject({ ...inputObject, name: e.target.value })
                    }
                  />
                </InputWithLabel>

                <InputWithLabel label="Email">
                  <SimpleInput
                    type="email"
                    placeholder="Enter email"
                    value={inputObject.email}
                    onChange={(e) =>
                      setInputObject({ ...inputObject, email: e.target.value })
                    }
                  />
                </InputWithLabel>
{/* 
                <InputWithLabel label="Password">
                  <SimpleInput
                    type="password"
                    placeholder="Leave blank to keep current password"
                    value={inputObject.password}
                    onChange={(e) =>
                      setInputObject({ ...inputObject, password: e.target.value })
                    }
                  />
                </InputWithLabel>

                <InputWithLabel label="Confirm Password">
                  <SimpleInput
                    type="password"
                    placeholder="Confirm password"
                    value={inputObject.confirmPassword}
                    onChange={(e) =>
                      setInputObject({ ...inputObject, confirmPassword: e.target.value })
                    }
                  />
                </InputWithLabel> */}

                <InputWithLabel label="Role">
                  <SelectInput
                    selectList={roles}
                    value={inputObject.role}
                    onChange={(e) =>
                      setInputObject({ ...inputObject, role: e.target.value })
                    }
                  />
                </InputWithLabel>
              </div>
            </div>

  
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
