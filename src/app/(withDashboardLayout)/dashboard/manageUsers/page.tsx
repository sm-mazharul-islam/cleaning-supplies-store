"use client";

import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaTrashAlt,
  FaUserShield,
  FaUsers,
  FaEnvelope,
  FaCalendarAlt,
  FaIdBadge,
} from "react-icons/fa";

export default function ManageUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5000/api/v1/user/all-users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (result.success) {
        setUsers(result.data);
      } else {
        toast.error(result.message || "Failed to load users");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (id: string, newRole: string) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `http://localhost:5000/api/v1/user/update-role/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ role: newRole }),
        },
      );
      const result = await res.json();
      if (result.success) {
        toast.success(`Role updated to ${newRole}`);
        fetchUsers();
      }
    } catch (error) {
      toast.error("Role update failed");
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Are you sure? This user will be permanently removed!"))
      return;

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `http://localhost:5000/api/v1/user/admin-delete/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const result = await res.json();
      if (result.success) {
        toast.warn("User deleted successfully");
        fetchUsers();
      }
    } catch (error) {
      toast.error("Delete request failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-6 text-base-content transition-colors duration-300">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-base-100 p-6 rounded-2xl shadow-lg border border-base-300">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2 text-base-content">
            <FaUserShield className="text-primary" /> Manage Users
          </h1>
          <p className="text-sm opacity-70 text-base-content">
            Administrative control for user roles and status
          </p>
        </div>
        <div className="stats shadow bg-base-200 border border-base-300">
          <div className="stat py-2 px-6">
            <div className="stat-title text-xs font-bold uppercase opacity-60">
              System Users
            </div>
            <div className="stat-value text-primary text-2xl">
              {users.length}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View: Card List | Desktop View: Table */}
      <div className="block lg:hidden space-y-4">
        {users.map((user: any) => (
          <div
            key={user._id}
            className="bg-base-100 p-5 rounded-2xl shadow-md border border-base-300 space-y-4"
          >
            <div className="flex items-center gap-4">
              <div className="avatar">
                <div className="mask mask-squircle w-14 h-14 ring ring-primary/20">
                  <img
                    src={user.pictureUrl || "https://via.placeholder.com/150"}
                    alt="Avatar"
                  />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg text-base-content">
                  {user.userName}
                </h3>
                <p className="text-xs opacity-60 flex items-center gap-1">
                  <FaIdBadge className="text-primary" /> ID:{" "}
                  {user._id.slice(-8)}
                </p>
              </div>
            </div>

            <div className="space-y-2 py-2 border-y border-base-200">
              <p className="text-sm flex items-center gap-3 opacity-80 text-base-content">
                <FaEnvelope className="text-primary" /> {user.email}
              </p>
              <p className="text-sm flex items-center gap-3 opacity-80 text-base-content">
                <FaCalendarAlt className="text-primary" /> Joined:{" "}
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex justify-between items-center pt-2">
              <select
                className={`select select-bordered select-sm font-bold ${
                  user.role === "admin"
                    ? "select-primary text-primary"
                    : "text-base-content"
                }`}
                value={user.role}
                onChange={(e) => handleRoleChange(user._id, e.target.value)}
              >
                <option value="Customer">Customer</option>
                <option value="admin">Admin</option>
              </select>

              <button
                onClick={() => handleDeleteUser(user._id)}
                className="btn btn-error btn-circle btn-sm btn-ghost hover:bg-error/20"
              >
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View: Full Table */}
      <div className="hidden lg:block card bg-base-100 shadow-2xl border border-base-300 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-base-200">
              <tr className="text-base-content opacity-70">
                <th className="text-sm font-black uppercase">User Profile</th>
                <th className="text-sm font-black uppercase">
                  Account Details
                </th>
                <th className="text-sm font-black uppercase text-center">
                  Permission
                </th>
                <th className="text-sm font-black uppercase text-right">
                  Management
                </th>
              </tr>
            </thead>
            <tbody className="text-base-content">
              {users.map((user: any) => (
                <tr
                  key={user._id}
                  className="hover:bg-base-200/40 transition-colors border-b border-base-200"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12 shadow-sm ring-1 ring-base-300">
                          <img
                            src={
                              user.pictureUrl ||
                              "https://via.placeholder.com/150"
                            }
                            alt="Avatar"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-extrabold text-base">
                          {user.userName}
                        </div>
                        <div className="text-[10px] uppercase font-bold opacity-40 tracking-tighter">
                          ID: {user._id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium flex items-center gap-2">
                        <FaEnvelope className="text-primary text-xs" />{" "}
                        {user.email}
                      </span>
                      <span className="text-[11px] font-bold opacity-50 flex items-center gap-2 uppercase">
                        <FaCalendarAlt className="text-primary text-xs" />{" "}
                        Joined: {new Date(user.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="text-center">
                    <select
                      className={`select select-bordered select-sm font-black transition-all ${
                        user.role === "admin"
                          ? "border-primary text-primary"
                          : "opacity-80"
                      }`}
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                    >
                      <option value="Customer">Customer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="text-right">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="btn btn-ghost btn-sm text-error hover:bg-error/10 hover:scale-110 transition-transform"
                      title="Terminate User"
                    >
                      <FaTrashAlt size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {users.length === 0 && (
        <div className="text-center py-24 bg-base-100 rounded-[2.5rem] border-2 border-dashed border-base-300 shadow-inner">
          <FaUsers className="mx-auto text-7xl opacity-10 mb-6 text-primary" />
          <p className="text-xl font-bold opacity-30 uppercase tracking-widest">
            No Database Records Found
          </p>
        </div>
      )}
    </div>
  );
}
