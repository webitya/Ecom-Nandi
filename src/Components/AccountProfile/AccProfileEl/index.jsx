import React, { useState } from 'react';
import { Button, Input, Tooltip, Modal } from 'antd';
import { 
  HomeOutlined, 
  CreditCardOutlined, 
  EnvironmentOutlined, 
  EditOutlined, 
  DeleteOutlined 
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const AccProfileEl = () => {
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    gender: 'Male',
  });

  const [editField, setEditField] = useState('');
  const [tempValue, setTempValue] = useState('');
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleEdit = (field) => {
    if (editField === field) {
      handleSave(field);
    } else {
      setEditField(field);
      setTempValue(profileData[field]);
    }
  };

  const handleSave = (field) => {
    if (tempValue.trim() === '') return;
    setProfileData({ ...profileData, [field]: tempValue });
    setEditField('');
  };

  const handleCancelEdit = () => setEditField('');

  const handleDeleteAccount = () => {
    // Handle delete logic here
    setDeleteModalVisible(false);
  };

  const renderEditableField = (label, field) => (
    <div className="flex items-center mb-4">
      <label className="font-semibold w-40">{label}:</label>
      {editField === field ? (
        <div className="flex items-center space-x-2">
          <Input
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="w-64"
            autoFocus
          />
          <Button type="primary" onClick={() => handleSave(field)}>
            Save
          </Button>
          <Button onClick={handleCancelEdit}>Cancel</Button>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <p className="w-64 cursor-pointer" onClick={() => handleEdit(field)}>
            {profileData[field]}
          </p>
          <Tooltip title="Edit">
            <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(field)} />
          </Tooltip>
        </div>
      )}
    </div>
  );

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg mx-auto" style={{userSelect:"none"}}>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Profile Information</h2>

      {/* Editable Fields */}
      {renderEditableField('First Name', 'firstName')}
      {renderEditableField('Last Name', 'lastName')}
      {renderEditableField('Email', 'email')}
      {renderEditableField('Phone', 'phone')}
      {renderEditableField('Gender', 'gender')}

      {/* Navigation Buttons */}
      <div className="mt-8 flex flex-wrap gap-4">
        <Link href="/cart">
          <Button
            type="primary"
            icon={<CreditCardOutlined />}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Go to Cart
          </Button>
        </Link>
        <Link href="/address">
          <Button
            type="default"
            icon={<EnvironmentOutlined />}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Address Manager
          </Button>
        </Link>
        <Link href="/">
          <Button
            type="link"
            icon={<HomeOutlined />}
            className="text-gray-600 hover:text-red-500"
          >
            Home Page
          </Button>
        </Link>
        <Button
          type="danger"
          icon={<DeleteOutlined />}
          className="hover:bg-red-600"
          onClick={() => setDeleteModalVisible(true)}
        >
          Delete Account
        </Button>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Delete Account"
        visible={deleteModalVisible}
        onOk={handleDeleteAccount}
        onCancel={() => setDeleteModalVisible(false)}
        okText="Yes, Delete"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete your account? This action cannot be undone.</p>
      </Modal>
    </div>
  );
};

export default AccProfileEl;
