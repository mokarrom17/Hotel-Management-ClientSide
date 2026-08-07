import React from "react";
import Swal from "sweetalert2";

const EditUserModal = ({ selectedUser, axiosSecure, refetch }) => {
  const handleUpdateUser = async (e) => {
    e.preventDefault();

    const form = e.target;

    const updatedUser = {
      name: form.name.value.trim(),
      phone: form.phone.value.trim(),
      address: form.address.value.trim(),
    };

    if (!updatedUser.name) {
      return Swal.fire({
        icon: "warning",
        title: "Name is required",
      });
    }

    try {
      const res = await axiosSecure.patch(
        `/users/${selectedUser._id}`,
        updatedUser,
      );

      if (res.data.modifiedCount > 0) {
        refetch();

        Swal.fire({
          icon: "success",
          title: "User updated successfully",
          timer: 1500,
          showConfirmButton: false,
        });

        document.getElementById("edit_user_modal").close();
      } else {
        Swal.fire({
          icon: "info",
          title: "No changes detected",
        });
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Failed to update user",
      });
    }
  };

  return (
    <dialog id="edit_user_modal" className="modal">
      <div className="modal-box max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">Edit User</h3>

          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost"
            onClick={() => document.getElementById("edit_user_modal").close()}
          >
            ✕
          </button>
        </div>

        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={
                  selectedUser?.photoURL ||
                  "https://i.ibb.co/4pDNDk1/avatar.png"
                }
                alt="User"
              />
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleUpdateUser} className="space-y-5">
          {/* Name */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">Full Name</span>
            </label>

            <input
              name="name"
              type="text"
              defaultValue={selectedUser?.name}
              className="input input-bordered w-full"
            />
          </div>

          {/* Email */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">Email</span>
            </label>

            <input
              type="email"
              defaultValue={selectedUser?.email}
              disabled
              className="input input-bordered w-full"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">Phone</span>
            </label>

            <input
              name="phone"
              type="text"
              defaultValue={selectedUser?.phone}
              placeholder="Enter phone number"
              className="input input-bordered w-full"
            />
          </div>

          {/* Address */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">Address</span>
            </label>

            <textarea
              name="address"
              defaultValue={selectedUser?.address}
              placeholder="Enter address"
              className="textarea textarea-bordered w-full"
              rows={3}
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => document.getElementById("edit_user_modal").close()}
            >
              Cancel
            </button>

            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default EditUserModal;
