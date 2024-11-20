import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload, message, Progress } from 'antd';
import toast from 'react-hot-toast';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const uploadImageToCloudinary = async (file, onProgress) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_UPLOAD_PRESET);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
    });
    if (!response.ok) {
        throw new Error('Failed to upload image');
    }
    const data = await response.json();
    return data.secure_url;
};

export const ImageUpload = ({ fileList, setFileList }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };


    const handleChange = async ({ file, fileList: newFileList }) => {
        if (file.size && file.size / 1024 / 1024 > 1) {
            const updatedFileList = newFileList.filter((item) => item.uid !== file.uid);
            setFileList(updatedFileList);
            toast.error("Image should be less than 1MB");
            return;
        }

        setFileList(newFileList);

        if (file.status === 'uploading') {
            setUploading(true);
            try {
                const url = await uploadImageToCloudinary(file.originFileObj, (percent) => {
                    setProgress(percent);
                });

                const updatedFileList = newFileList.map((item) =>
                    item.uid === file.uid ? { ...item, status: 'done', url } : item
                );
                setFileList(updatedFileList);
                message.success('Image uploaded successfully!');
            } catch (error) {
                const updatedFileList = newFileList.map((item) =>
                    item.uid === file.uid ? { ...item, status: 'error' } : item
                );
                setFileList(updatedFileList);
                message.error('Failed to upload image');
            } finally {
                setUploading(false);
                setProgress(0);
            }
        } else if (file.status === 'error') {
            message.error('Failed to upload image');
        }
    };

    console.log(fileList);


    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    return (
        <>
            <Upload
                listType="picture-circle"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                showUploadList={{ showRemoveIcon: true }}
            >
                {fileList.length >= 4 ? null : uploadButton}
            </Upload>
            {/* {uploading && (
                <Progress
                    percent={progress}
                    status="active"
                    size="small" // Updated to 'size' instead of 'strokeWidth'
                    style={{ marginTop: 16 }}
                />
            )} */}
            {previewImage && (
                <Image
                    wrapperStyle={{ display: 'none' }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                />
            )}
        </>
    );
};

export default ImageUpload;
