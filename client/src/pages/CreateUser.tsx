import { useState, ChangeEvent } from "react";
import { AiOutlineSave } from "react-icons/ai";
import { HiOutlineSave } from "react-icons/hi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  InputWithLabel,
  Sidebar,
  SimpleInput,
  WhiteButton,
} from "../components";
import SelectInput from "../components/SelectInput";
import { roles } from "../utils/data";

// Type for user form data
interface FormData {
  name: string;
  email: string;
  password: string;
  role: string;
}

const CreateUser = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleChange = (value: string) => {
    setFormData({ ...formData, role: value });
  };

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/api/users/addusers", formData);
      console.log("User created:", response.data);
      navigate("/users");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data); // Log the full error response
        setError(err.response?.data?.message || "Something went wrong.");
      } else {
        console.error("Error:", err);
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
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
                Add new user
              </h2>
            </div>
            <div className="flex gap-x-2 max-[370px]:flex-col max-[370px]:gap-2 max-[370px]:items-center">
              <button
                className="dark:bg-blackPrimary bg-whiteSecondary border border-gray-600 w-48 py-2 text-lg dark:hover:border-gray-500 hover:border-gray-400 duration-200 flex items-center justify-center gap-x-2"
                disabled={loading}
              >
                <AiOutlineSave className="dark:text-whiteSecondary text-blackPrimary text-xl" />
                <span className="dark:text-whiteSecondary text-blackPrimary font-medium">
                  Save draft
                </span>
              </button>
              <WhiteButton
                onClick={handleSubmit}
                text={loading ? "Publishing..." : "Publish user"}
                disabled={loading}
                textSize="lg"
                width="48"
                py="2"
              >
                <HiOutlineSave className="dark:text-blackPrimary text-whiteSecondary text-xl" />
              </WhiteButton>
            </div>
          </div>

          {/* Form content */}
          <div className="px-4 sm:px-6 lg:px-8 pb-8 pt-8 grid grid-cols-2 gap-x-10 max-xl:grid-cols-1 max-xl:gap-y-10">
            {/* Left section */}
            <div>
              <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                User information
              </h3>

              {error && (
                <p className="text-red-500 text-sm mt-2">
                  {error}
                </p>
              )}

              <div className="mt-4 flex flex-col gap-5">

                <InputWithLabel label="Name">
                  <SimpleInput
                    type="text"
                    name="name"
                    placeholder="Enter a name..."
                    value={formData.name}
                    onChange={handleChange}
                  />
                </InputWithLabel>

                <InputWithLabel label="Email">
                  <SimpleInput
                    type="email"
                    name="email"
                    placeholder="Enter an email..."
                    value={formData.email}
                    onChange={handleChange}
                  />
                </InputWithLabel>

                <InputWithLabel label="Password">
                  <SimpleInput
                    type="password"
                    name="password"
                    placeholder="Enter a password..."
                    value={formData.password}
                    onChange={handleChange}
                  />
                </InputWithLabel>


                <InputWithLabel label="Select role">
                  <SelectInput
                    selectList={roles}
                    value={formData.role} // use `value` if your SelectInput expects it
                    onChange={(e) => handleRoleChange(e.target.value)}
                  />
                </InputWithLabel>
              </div>
            </div>

            {/* Right section */}
            {/* <div>
              <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                Upload user image
              </h3>
              <ImageUpload />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
