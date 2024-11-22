import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload, Progress } from 'antd';
import toast from 'react-hot-toast';
import { useUploadCloudinary } from '../../../hooks/useUploadCloudinary';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    }
);

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

    const beforeUpload = async (file) => {
        if (file.size / 1024 / 1024 > 1) {
            toast.error("Image should be less than 1MB");
            return false;
        }
        const newFileList = [...fileList, { uid: file.uid, name: file.name, status: 'uploading', originFileObj: file }];
        setFileList(newFileList);

        try {
            setUploading(true);
            const url = await useUploadCloudinary(file);

            const updatedFileList = newFileList.map((item) =>
                item.uid === file.uid ? { ...item, status: 'done', url } : item
            );
            setFileList(updatedFileList);
            toast.success('Image uploaded successfully!');
        } catch (error) {
            const updatedFileList = newFileList.map((item) =>
                item.uid === file.uid ? { ...item, status: 'error' } : item
            );
            setFileList(updatedFileList);
            toast.error('Failed to upload image');
        } finally {
            setUploading(false);
            setProgress(0); // Reset progress bar
        }

        return false; // Prevent automatic upload
    };

    const handleRemove = (file) => {
        // Filter out the file being removed
        const updatedFileList = fileList.filter((item) => item.uid !== file.uid);
        setFileList(updatedFileList);
        toast.success('Image removed successfully!');
    };

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
                beforeUpload={beforeUpload}
                onRemove={handleRemove}
                showUploadList={{ showRemoveIcon: true }}
            >
                {fileList.length >= 4 ? null : uploadButton}
            </Upload>
            {uploading && (
                <Progress
                    percent={progress}
                    status="active"
                    size="small"
                    style={{ marginTop: 16 }}
                />
            )}

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
