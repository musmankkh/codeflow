import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";

// Define user type
interface User {
  _id: string;
  name: string,
  email: string;
  role: string;
}

const UserTable = () => {
  const [users, setUsers] = useState<User[]>([]);

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/users");
        const data: { users: User[] } = await res.json();
        setUsers(data.users);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await fetch(`http://localhost:8080/api/users/${userId}`, { method: "DELETE" });
        setUsers((prev) => prev.filter((u) => u._id !== userId));
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };
  

  return (
    <table className="mt-6 w-full whitespace-nowrap text-left max-lg:block max-lg:overflow-x-scroll">
      <colgroup>
        <col className="w-full sm:w-4/12" />
        <col className="lg:w-4/12" />
        <col className="lg:w-2/12" />
        <col className="lg:w-1/12" />
        <col className="lg:w-1/12" />
      </colgroup>
      <thead className="border-b border-white/10 text-sm leading-6 dark:text-whiteSecondary text-blackPrimary">
        <tr>
          <th className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">User</th>
          <th className="py-2 pl-0 pr-8 font-semibold table-cell">Email</th>
          <th className="py-2 pl-0 pr-8 font-semibold table-cell">Role</th>
          <th className="py-2 pl-0 pr-4 text-right font-semibold table-cell sm:pr-6 lg:pr-8">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-white/5">
        {users?.map((user) => (
          <tr key={user._id}>
            <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
              <div className="text-sm font-medium leading-6 dark:text-whiteSecondary text-blackPrimary">
                {user.name}
              </div>
            </td>
            <td className="py-4 pl-0 pr-8 table-cell text-sm dark:text-whiteSecondary text-blackPrimary">
              {user.email}
            </td>
            <td className="py-4 pl-0 pr-8 text-sm font-medium dark:text-whiteSecondary text-blackPrimary">
              {user.role}
            </td>
            <td className="py-4 pl-0 pr-4 text-right text-sm dark:text-whiteSecondary text-blackPrimary table-cell pr-6 lg:pr-8">
              <div className="flex gap-x-1 justify-end">
                <Link to={`/users/edit/${user._id}`} className="icon-button">
                  <HiOutlinePencil className="text-lg" />
                </Link>
              
                <button className="icon-button" onClick={() => handleDelete(user._id)}>
                  <HiOutlineTrash className="text-lg" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
