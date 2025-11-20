import React from "react";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useLoaderData } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const SendParcel = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const { user } = useAuth();
  const serviceCenters = useLoaderData();
  const axiosSecure = useAxiosSecure();

  const regions = [...new Set(serviceCenters.map((c) => c.region))];
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const districtsByRegion = (region) =>
    serviceCenters.filter((c) => c.region === region).map((d) => d.district);

  const handleSendParcel = (data) => {
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);

    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }

    Swal.fire({
      title: "Agree with the Cost?",
      text: `You will be charged ${cost} taka!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/parcels", data).then((res) => {
          console.log("Parcel saved:", res.data);
        });
      }
    });
  };

  return (
    <div className="py-16 px-6 lg:px-20">
      
      {/* Main Card */}
      <div className="bg-white shadow-xl rounded-2xl p-10 border border-gray-200">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-2">
          Send a <span className="text-primary">Parcel</span>
        </h2>
        <p className="text-gray-500 mb-8">
          Carefully fill in the information to send your parcel safely.
        </p>

        <form onSubmit={handleSubmit(handleSendParcel)} className="space-y-8">

          {/* Parcel Type */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-700">Parcel Type</h3>
            <div className="flex gap-6 bg-gray-50 p-4 rounded-xl border">
              
              <label className="flex items-center gap-2 cursor-pointer font-medium">
                <input type="radio" value="document" defaultChecked {...register("parcelType")} />
                Document
              </label>

              <label className="flex items-center gap-2 cursor-pointer font-medium">
                <input type="radio" value="non-document" {...register("parcelType")} />
                Non-Document
              </label>
            </div>
          </div>

          {/* Parcel Information */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-700">Parcel Information</h3>
            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <label className="font-semibold">Parcel Name</label>
                <input
                  type="text"
                  {...register("parcelName", { required: true })}
                  className="input input-bordered w-full mt-1"
                  placeholder="Parcel Name"
                />
              </div>

              <div>
                <label className="font-semibold">Parcel Weight (kg)</label>
                <input
                  type="number"
                  {...register("parcelWeight", { required: true })}
                  className="input input-bordered w-full mt-1"
                  placeholder="Ex: 1.5"
                />
              </div>

            </div>
          </div>

          {/* Sender + Receiver */}
          <div className="grid md:grid-cols-2 gap-10">

            {/* Sender */}
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-secondary">Sender Details</h3>
              <div className="space-y-4 bg-gray-50 p-6 rounded-xl border">

                <div>
                  <label className="font-semibold">Sender Name</label>
                  <input
                    type="text"
                    {...register("senderName", { required: true })}
                    defaultValue={user?.displayName}
                    className="input input-bordered w-full mt-1"
                  />
                </div>

                <div>
                  <label className="font-semibold">Sender Email</label>
                  <input
                    type="email"
                    {...register("senderEmail", { required: true })}
                    defaultValue={user?.email}
                    className="input input-bordered w-full mt-1"
                  />
                </div>

                <div>
                  <label className="font-semibold">Sender Mobile</label>
                  <input
                    type="text"
                    {...register("senderMobile", { required: true })}
                    className="input input-bordered w-full mt-1"
                  />
                </div>

                <div>
                  <label className="font-semibold">Region</label>
                  <select {...register("senderRegion", { required: true })} className="select select-bordered w-full mt-1">
                    <option value="">Select Region</option>
                    {regions.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold">District</label>
                  <select {...register("senderDistrict", { required: true })} className="select select-bordered w-full mt-1">
                    <option value="">Select District</option>
                    {districtsByRegion(senderRegion).map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold">Address</label>
                  <input
                    type="text"
                    {...register("senderAddress", { required: true })}
                    className="input input-bordered w-full mt-1"
                  />
                </div>

              </div>
            </div>

            {/* Receiver */}
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-secondary">Receiver Details</h3>
              <div className="space-y-4 bg-gray-50 p-6 rounded-xl border">

                <div>
                  <label className="font-semibold">Receiver Name</label>
                  <input
                    type="text"
                    {...register("receiverName", { required: true })}
                    className="input input-bordered w-full mt-1"
                  />
                </div>

                <div>
                  <label className="font-semibold">Receiver Email</label>
                  <input
                    type="email"
                    {...register("receiverEmail", { required: true })}
                    className="input input-bordered w-full mt-1"
                  />
                </div>

                <div>
                  <label className="font-semibold">Receiver Mobile</label>
                  <input
                    type="text"
                    {...register("receiverMobile", { required: true })}
                    className="input input-bordered w-full mt-1"
                  />
                </div>

                <div>
                  <label className="font-semibold">Region</label>
                  <select {...register("receiverRegion", { required: true })} className="select select-bordered w-full mt-1">
                    <option value="">Select Region</option>
                    {regions.map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold">District</label>
                  <select {...register("receiverDistrict", { required: true })} className="select select-bordered w-full mt-1">
                    <option value="">Select District</option>
                    {districtsByRegion(receiverRegion).map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold">Address</label>
                  <input
                    type="text"
                    {...register("receiverAddress", { required: true })}
                    className="input input-bordered w-full mt-1"
                  />
                </div>

              </div>
            </div>

          </div>

          {/* Button */}
          <button className="btn btn-primary  text-black text-lg shadow-md mt-4">
            Send Parcel
          </button>

        </form>
      </div>
    </div>
  );
};

export default SendParcel;
