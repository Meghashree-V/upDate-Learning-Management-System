import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";

/** flexible user shape to cover many API variants */
interface ApiUser {
  _id?: string;
  id?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email: string;
  role: string;
}

const Users = () => {
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // normalize response to array of users
  const normalizeResponse = (data: any): ApiUser[] => {
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.items)) return data.items;
    // sometimes backend might return { users: [...] }
    if (data && Array.isArray(data.users)) return data.users;
    return [];
  };

  // get display name safely
  const displayName = (u: ApiUser) => {
    const first = u.firstName?.trim() ?? "";
    const last = u.lastName?.trim() ?? "";
    const full = `${first} ${last}`.trim();
    return full || u.name || u.email || "—";
  };

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/users");
      // normalize into array
      const list = normalizeResponse(res.data);
      setUsers(list);
    } catch (err) {
      console.error("Error fetching users:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // Delete user
  const deleteUser = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.delete(`/users/${id}`);
      setUsers((prev) => prev.filter((u) => (u._id ?? u.id) !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user. Check console.");
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <p className="text-center mt-10">Loading users...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Users</h2>
        <button
          onClick={() => navigate("/admin/users/add")}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          + Add User
        </button>
      </div>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">Email</th>
                <th className="border px-4 py-2 text-left">Role</th>
                <th className="border px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const key =
                  user._id ?? user.id ?? Math.random().toString(36).slice(2);
                return (
                  <tr key={key} className="text-center">
                    <td className="border px-4 py-2 text-left">
                      {displayName(user)}
                    </td>
                    <td className="border px-4 py-2 text-left">{user.email}</td>
                    <td className="border px-4 py-2 text-left">{user.role}</td>
                    <td className="border px-4 py-2 space-x-2">
                      <button
                        onClick={() =>
                          navigate(`/admin/users/edit/${user._id ?? user.id}`)
                        }
                        className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteUser(user._id ?? user.id ?? "")}
                        className="bg-red-500 text-white px-3 py-1 rounded-md"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;
