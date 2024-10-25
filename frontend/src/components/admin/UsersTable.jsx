import React, { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from "../../BaseUrl";

function UsersTable() {
  const [users, setUsers] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    place: "",
  });

  const fetchUsers = async () => {
    setLoading(true); // Set loading to true while fetching
    try {
      const response = await axios.get(`${BaseUrl}/api/user/getusers`);
      if (response.status === 200) {
        setUsers(response.data);
      } else {
        console.error("Failed to fetch users:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false); // Reset loading after fetching
    }
  };

  // Fetch users from API on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle adding a new user
  const handleAddUser = async () => {
    if (!user.name || !user.email || !user.mobile || !user.place) {
      alert("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${BaseUrl}/api/user/adduser`, user);
      // console.log(response.data.user,"<-------------check");
      if (response.status === 201) {
        alert("User added successfully!");
        setUsers((prevUsers) => [...prevUsers, response.data.user]);        
        setUser({ name: "", email: "", mobile: "", place: "" }); // Clear form
        setShowAddForm(false);
      } else {
        alert("Failed to add user. Please try again.");
      }
    } catch (error) {
      console.error("Error adding the user!", error);
      alert("Error adding user. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting a user
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`${BaseUrl}/api/user/deleteuser/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete user");
        }
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Error deleting user. Please try again.");
      }
    }
  };

  // Handle updating a user
  const handleUpdateUser = async () => {
    if (!user.name || !user.mobile || !user.place) {
      alert("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(
        `${BaseUrl}/api/user/updateuser/${user._id}`,
        user
      );
      if (response.status === 200) {
        alert("User updated successfully!");
        setUsers((prevUsers) =>
          prevUsers.map((existingUser) =>
            existingUser._id === user._id ? response.data.user : existingUser
          )
        );
        setUser({ name: "", email: "", mobile: "", place: "" }); // Clear form
        setShowEditForm(false);
      } else {
        alert("Failed to update user. Please try again.");
      }
    } catch (error) {
      console.error("Error updating the user!", error);
      alert("Error updating user. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (userId) => {
    const userToEdit = users.find((u) => u._id === userId);
    setUser(userToEdit); // Populate the form with existing user data
    setShowEditForm(true); // Show the add/edit form
  };

  const handleCancel=()=>{
    setShowEditForm(false)
  }
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="w-full max-w-4xl mt-8 bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Users</h2>
          <button
            onClick={() => setShowAddForm((prev) => !prev)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            {showAddForm ? "Cancel" : "Add User"}
          </button>
        </div>

        {showEditForm && (
          <div className="mb-6">
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              placeholder="Name"
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="tel"
              name="mobile"
              value={user.mobile}
              onChange={(e) => setUser({ ...user, mobile: e.target.value })}
              placeholder="Mobile"
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              name="place"
              value={user.place}
              onChange={(e) => setUser({ ...user, place: e.target.value })}
              placeholder="Place"
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
            />
            <button
              onClick={user._id ? handleUpdateUser : handleAddUser} // Determine which action to take
              className={`bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : user._id
                ? "Update User"
                : "Cancel"}
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={handleCancel}>
Cancel
            </button>
          </div>
        )}

        {/* Add User Form */}
        {showAddForm && (
          <div className="mb-6">
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              placeholder="Name"
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Email"
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="tel"
              value={user.mobile}
              onChange={(e) => setUser({ ...user, mobile: e.target.value })}
              placeholder="Mobile"
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              value={user.place}
              onChange={(e) => setUser({ ...user, place: e.target.value })}
              placeholder="Place"
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
            />
            <button
              onClick={handleAddUser}
              className={`bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add User"}
            </button>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse">
            <thead>
              <tr>
                <th className="border-b py-4 px-6 text-left">Name</th>
                <th className="border-b py-4 px-6 text-left">Email</th>
                <th className="border-b py-4 px-6 text-left">Place</th>
                <th className="border-b py-4 px-6 text-left">Mobile</th>
                <th className="border-b py-4 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id}>
                    <td className="border-b py-4 px-6">{user.name}</td>
                    <td className="border-b py-4 px-6">{user.email}</td>
                    <td className="border-b py-4 px-6">{user.place}</td>
                    <td className="border-b py-4 px-6">{user.mobile}</td>
                    <td className="border-b py-4 px-6">
                      <button
                        onClick={() => handleEdit(user._id)}
                        className="bg-yellow-400 text-white px-4 py-2 rounded-md hover:bg-yellow-500 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="ml-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="border-b py-4 px-6 text-center">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UsersTable;
