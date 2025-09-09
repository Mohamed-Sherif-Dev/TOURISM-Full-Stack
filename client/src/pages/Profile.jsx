import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import fetchUserDetails from "../utils/fetchUserDetails";
import AxiosToastError from "../utils/AxiosToastError";
import UserProfileAvaterEidt from "../components/UserProfileAvaterEidt";
import { setUserDetauls } from "../store/counterSllice";

const RoleBadge = ({ role }) => {
  const norm = String(role || "user").toLowerCase();
  const isAdmin = norm === "admin" || norm === "owner" || norm === "superadmin";
  const label = isAdmin ? "Admin" : "User";
  const base =
    "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold";
  const cls = isAdmin
    ? `${base} bg-red-100 text-red-700 border border-red-200`
    : `${base} bg-emerald-100 text-emerald-700 border border-emerald-200`;
  return (
    <span className={cls}>
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isAdmin ? "bg-red-500" : "bg-emerald-500"
        }`}
      />
      {label}
    </span>
  );
};

const Profile = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user || {});

  const [openProfileAvatarEdit, setOpenProfileAvaterEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
  });

  useEffect(() => {
    setUserData({
      name: user?.name || "",
      email: user?.email || "",
      mobile: user?.mobile || "",
    });
  }, [user?.name, user?.email, user?.mobile]);

  const initials = useMemo(() => {
    const n = (userData.name || "").trim();
    if (!n) return "U";
    return n
      .split(" ")
      .slice(0, 2)
      .map((s) => s[0]?.toUpperCase())
      .join("");
  }, [userData.name]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await Axios({
        ...SummaryApi.updateUserDetails,
        data: userData,
      });

      const { data: responseData } = response;
      if (responseData?.success) {
        toast.success(responseData?.message || "Profile updated");
        const fresh = await fetchUserDetails();
        dispatch(setUserDetauls(fresh.data));
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-6">
      {/* Header Card */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          {/* Avatar */}
          <div className="relative">
            <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full overflow-hidden ring-2 ring-white shadow-md bg-neutral-100 grid place-items-center text-neutral-500">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user?.name || "Avatar"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="grid place-items-center h-full w-full">
                  <FaRegUserCircle className="text-neutral-400" size={56} />
                  <span className="text-sm font-semibold">{initials}</span>
                </div>
              )}
            </div>

            <button
              onClick={() => setOpenProfileAvaterEdit(true)}
              className="absolute -bottom-2 -right-1 inline-flex items-center gap-1 rounded-full bg-neutral-900 text-white px-3 py-1 text-xs hover:bg-neutral-800 shadow"
              type="button"
            >
              <FiEdit2 size={14} />
              Edit
            </button>
          </div>

          {/* Name + Role + Meta */}
          <div className="flex-1">
            <div className="flex items-center flex-wrap gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                {userData.name || "Your Name"}
              </h1>
              <RoleBadge role={user?.role} />
            </div>

            <p className="text-neutral-500 mt-1">
              Manage your profile info & account settings
            </p>

            <div className="mt-3 flex flex-wrap gap-2 text-sm">
              <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">
                {userData.email || "email@example.com"}
              </span>
              {userData.mobile ? (
                <span className="px-2 py-0.5 rounded bg-violet-50 text-violet-700 border border-violet-100">
                  {userData.mobile}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-neutral-200 rounded-2xl p-4 sm:p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Profile details</h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="grid">
              <label htmlFor="name" className="text-sm text-neutral-600">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="mt-1 p-2.5 bg-neutral-50 outline-none border border-neutral-200 focus:border-neutral-400 rounded-lg"
                value={userData.name}
                name="name"
                onChange={handleOnChange}
                required
              />
            </div>

            <div className="grid">
              <label htmlFor="email" className="text-sm text-neutral-600">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="mt-1 p-2.5 bg-neutral-50 outline-none border border-neutral-200 focus:border-neutral-400 rounded-lg"
                value={userData.email}
                name="email"
                onChange={handleOnChange}
                required
              />
            </div>

            <div className="grid">
              <label htmlFor="mobile" className="text-sm text-neutral-600">
                Mobile
              </label>
              <input
                id="mobile"
                type="tel"
                placeholder="Enter your mobile"
                className="mt-1 p-2.5 bg-neutral-50 outline-none border border-neutral-200 focus:border-neutral-400 rounded-lg"
                value={userData.mobile}
                name="mobile"
                onChange={handleOnChange}
                required
              />
            </div>

            <div className="md:col-span-2 flex items-center gap-3 pt-2">
              <button
                disabled={loading}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-neutral-900 text-white font-semibold hover:bg-neutral-800 disabled:opacity-60"
              >
                {loading ? "Saving..." : "Save changes"}
              </button>
              <span className="text-sm text-neutral-500">
                آخر تحديث: {new Date().toLocaleDateString()}
              </span>
            </div>
          </form>
        </div>

        {/* Side Card */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-4 sm:p-6 shadow-sm">
          <h3 className="text-base font-semibold mb-3">Account</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center justify-between">
              <span className="text-neutral-600">Role</span>
              <RoleBadge role={user?.role} />
            </li>
            <li className="flex items-center justify-between">
              <span className="text-neutral-600">Status</span>
              <span className="px-2 py-0.5 rounded-full text-xs bg-emerald-50 text-emerald-700 border border-emerald-200">
                Active
              </span>
            </li>
          </ul>

          <div className="mt-4 border-t border-neutral-200 pt-4">
            <button
              type="button"
              onClick={() => setOpenProfileAvaterEdit(true)}
              className="w-full rounded-lg border border-neutral-300 hover:bg-neutral-50 px-4 py-2.5 text-sm font-medium"
            >
              Change Avatar
            </button>
          </div>
        </div>
      </div>

      {/* Avatar Modal */}
      {openProfileAvatarEdit && (
        <UserProfileAvaterEidt close={() => setOpenProfileAvaterEdit(false)} />
      )}
    </div>
  );
};

export default Profile;
