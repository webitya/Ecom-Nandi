import React, { useState } from "react";
import { PlusOutlined, DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space, Upload, Image, Progress, message } from "antd";
import toast from "react-hot-toast";
import { useUploadCloudinary } from "../../../hooks/useUploadCloudinary";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  }
  );

const AccRegisterPandit = () => {
  const [formdata, setFormdata] = useState({
    imageUrl: "",
    expertise: "Marriage",
    experience: "",
    contact: "",
    age: "",
  });
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const beforeUpload = async (file) => {
    if (file.size / 1024 / 1024 > 2) {
      toast.error("Image should be less than 2MB");
      return false;
    }

    const newFileList = [...fileList, { uid: file.uid, name: file.name, status: "uploading", originFileObj: file }];
    setFileList(newFileList);

    try {
      // setUploading(true);
      const secure_url = await useUploadCloudinary(file);
      const updatedFileList = newFileList.map((item) =>
        item.uid === file.uid ? { ...item, status: "done", url: secure_url } : item
      );
      setFileList(updatedFileList);
      setFormdata((prev) => ({ ...prev, imageUrl: secure_url }));
      toast.success("Image uploaded successfully!");
    } catch (error) {
      const updatedFileList = newFileList.map((item) =>
        item.uid === file.uid ? { ...item, status: "error" } : item
      );
      setFileList(updatedFileList);
      toast.error("Failed to upload image");
    }


    return false;
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleRemove = (file) => {
    const updatedFileList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(updatedFileList);
    setFormdata((prev) => ({ ...prev, imageUrl: "" }));
    toast.success("Image removed successfully!");
  };

  const handleMenuClick = (e) => {
    const { key } = e;
    const [{ label }] = items.filter((value) => value.key === key);
    setFormdata((prev) => ({ ...prev, expertise: label }));
  };

  const items = [
    { label: "Marriage", key: "1", icon: <UserOutlined /> },
    { label: "Puja in Temples", key: "2", icon: <UserOutlined /> },
    { label: "Puja in Domestics", key: "3", icon: <UserOutlined /> },
  ];

  const menuProps = { items, onClick: handleMenuClick };

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setFormdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serverData = { ...formdata, requestedRole: "pandit" };
    // Replace this with your API request logic
    console.log("Submitting data to server:", serverData);
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Register as Pandit</h2>

      <form className="mt-8 flex flex-col gap-6" onSubmit={handleSubmit}>
        <Upload
          listType="picture-circle"
          fileList={fileList}
          onPreview={handlePreview}
          beforeUpload={beforeUpload}
          onRemove={handleRemove}
          showUploadList={{ showRemoveIcon: true }}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>

        {previewImage && (
          <Image
            wrapperStyle={{ display: "none" }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(""),
            }}
            src={previewImage}
          />
        )}

        <div className="flex gap-4 items-center">
          <span className="font-semibold w-24 block">Expertise: </span>
          <Dropdown menu={menuProps}>
            <Button>
              <Space>
                {formdata.expertise}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </div>

        <div className="flex gap-4 items-center">
          <span className="font-semibold w-24 block">Age:</span>
          <input
            type="text"
            name="age"
            value={formdata.age}
            onChange={handleChange}
            className="outline-none border border-gray-300 px-4 py-1 text-sm rounded-md"
            placeholder="Enter your Age"
          />
        </div>

        <div className="flex gap-4 items-center">
          <span className="font-semibold w-24 block">Experience:</span>
          <input
            type="text"
            name="experience"
            value={formdata.experience}
            onChange={handleChange}
            className="outline-none border border-gray-300 px-4 py-1 text-sm rounded-md"
            placeholder="e.g 5 years of experience"
          />
        </div>

        <div className="flex gap-4 items-center">
          <span className="font-semibold w-24 block">Contact:</span>
          <input
            type="text"
            name="contact"
            value={formdata.contact}
            onChange={handleChange}
            className="outline-none border border-gray-300 px-4 py-1 text-sm rounded-md"
            placeholder="Enter your Contact no."
          />
        </div>

        <div className="flex gap-4">
          <button type="button" className="px-4 py-1 rounded-md bg-blue-500">
            Draft
          </button>
          <button type="submit" className="px-4 py-1 rounded-md bg-green-500">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccRegisterPandit;
