
"use client";

import { Envelope } from "@gravity-ui/icons";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { BiEdit } from "react-icons/bi";
import { toast } from "react-toastify";

export function EditModal({ room }) {
    const {
        _id,
        roomName = "",
        description = "",
        imageUrl = "",
        floor = "",
        capacity = "",
        hourlyRate = "",
        amenities = []
    } = room || {};

    const amenityOptions = [
        "Whiteboard",
        "Projector",
        "Wi-Fi",
        "Power Outlets",
        "Quiet Zone",
        "Air Conditioning",
    ];

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedData = {
            roomName: formData.get("roomName"),
            description: formData.get("description"),
            imageUrl: formData.get("imageUrl"),
            floor: formData.get("floor"),
            capacity: formData.get("capacity"),
            hourlyRate: formData.get("hourlyRate"),
            amenities: formData.getAll("amenities"),
        };

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${_id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(updatedData), 
        });

        const data = await res.json();
        console.log(data);
        if (data) {
            toast.success("Room Edit successfully! 🎉");
        };
    };
    return (
        <Modal>
            <div className="flex justify-end">
                <Button variant="quiantity" className={"rounded-none mt-5 mb-5 border-1 hover:bg-blue-500"}>
                    <BiEdit /> Edit
                </Button>
            </div>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-2xl">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading className="text-2xl">Edit Room</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <form onSubmit={onSubmit} className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

                                    {/* Left Column: Main Details */}
                                    <div className="lg:col-span-2 space-y-6">

                                        {/* Room Name */}
                                        <div>
                                            <TextField isRequired type="text">
                                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                    Room Name <span className="text-rose-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="roomName"
                                                    defaultValue={roomName} // 🌟 ডিফল্ট ভ্যালু সেট করা হয়েছে
                                                    placeholder="e.g., The Turing Suite"
                                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition duration-200"
                                                />
                                            </TextField>
                                        </div>

                                        {/* Description */}
                                        <div>
                                            <TextField isRequired type="text">
                                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                    Description <span className="text-rose-500">*</span>
                                                </label>
                                                <textarea
                                                    name="description"
                                                    required
                                                    rows={5}
                                                    defaultValue={description} // 🌟 ডিফল্ট ভ্যালু সেট করা হয়েছে
                                                    placeholder="Describe the atmosphere, equipment, and unique features..."
                                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition duration-200 resize-none"
                                                />
                                            </TextField>
                                        </div>

                                        {/* Amenities Section */}
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-3">
                                                Available Amenities
                                            </label>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {amenityOptions.map((amenity) => {
                                                    // 🌟 ব্যাকএন্ডের ডাটার সাথে মিল থাকলে চেকড (True) হবে
                                                    const isChecked = amenities.includes(amenity);
                                                    return (
                                                        <label
                                                            key={amenity}
                                                            className={`flex items-center p-4 border rounded-xl cursor-pointer select-none transition duration-200 ${isChecked
                                                                ? "border-blue-600 bg-blue-50/50 text-blue-900 font-medium"
                                                                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                                                                }`}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                name="amenities"
                                                                value={amenity}
                                                                defaultChecked={isChecked} // 🌟 ডিফল্ট চেকড স্টেট
                                                                className="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 mr-3"
                                                            />
                                                            {amenity}
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column: Meta Details & Image */}
                                    <div className="space-y-6 lg:border-l lg:border-slate-100 lg:pl-8">

                                        {/* Room Image URL */}
                                        <div>
                                            <TextField type="url">
                                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                    Room Image URL
                                                </label>
                                                <div className="aspect-video w-full rounded-xl bg-slate-100 border border-dashed border-slate-300 flex items-center justify-center overflow-hidden mb-3 relative group">
                                                    {imageUrl ? (
                                                        // eslint-disable-next-line @next/next/no-img-element
                                                        <img
                                                            src={imageUrl}
                                                            alt="Room Preview"
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => {
                                                                e.currentTarget.src = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80";
                                                            }}
                                                        />
                                                    ) : (
                                                        <div className="text-center p-4">
                                                            <p className="text-xs text-slate-400">Image Preview will appear here</p>
                                                        </div>
                                                    )}
                                                </div>
                                                <input
                                                    type="url"
                                                    name="imageUrl"
                                                    defaultValue={imageUrl} 
                                                    placeholder="https://images.unsplash.com/..."
                                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition duration-200"
                                                />
                                            </TextField>
                                        </div>

                                        {/* Floor Number */}
                                        <div>
                                            <TextField type="text">
                                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                    Floor Number
                                                </label>
                                                <input
                                                    type="text"
                                                    name="floor"
                                                    defaultValue={floor} 
                                                    placeholder="e.g., 2nd Floor"
                                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition duration-200"
                                                />
                                            </TextField>
                                        </div>

                                        {/* Capacity & Hourly Rate */}
                                        <div className="grid grid-cols-2 gap-4">

                                            {/* Capacity */}
                                            <div>
                                                <TextField type="number">
                                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                        Capacity
                                                    </label>
                                                    <input
                                                        type="number"
                                                        name="capacity"
                                                        min="1"
                                                        defaultValue={capacity} // 
                                                        placeholder="4"
                                                        className="w-full py-1.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition duration-200"
                                                    />
                                                </TextField>
                                            </div>

                                            {/* Hourly Rate */}
                                            <div>
                                                <TextField type="number">
                                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                        Hourly Rate ($)
                                                    </label>
                                                    <input
                                                        type="number"
                                                        name="hourlyRate"
                                                        min="0"
                                                        defaultValue={hourlyRate}
                                                        placeholder="15.00"
                                                        className="w-full  py-1.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition duration-200"
                                                    />
                                                </TextField>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="pt-4 space-y-3">
                                            <Modal.Footer>
                                                <Button type="submit" slot="close" variant="quiantity" className={"rounded-none w-full border-1 hover:bg-blue-500"}>Save</Button>
                                            </Modal.Footer>
                                        </div>

                                    </div>
                                </form>
                            </Surface>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}