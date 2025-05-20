import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNotification } from './NotificationContext';

export default function FileUpload({ onUploadComplete, label, acceptedFileTypes = '.pdf,.docx,.jpg,.jpeg' }) {
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const { addNotification } = useNotification();

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) {
      return;
    }

    const file = acceptedFiles[0];
    
    // Check file type
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const allowedExtensions = ['pdf', 'docx', 'jpg', 'jpeg'];
    
    if (!allowedExtensions.includes(fileExtension)) {
      addNotification('Invalid file type. Only PDF, DOCX, and JPG are allowed.', 'error');
      return;
    }

    setUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }
      
      const data = await response.json();
      setUploadedFile({
        name: file.name,
        url: data.url,
        public_id: data.public_id
      });
      
      if (onUploadComplete) {
        onUploadComplete(data.url);
      }
      
      addNotification(`${file.name} uploaded successfully!`, 'success');
    } catch (error) {
      console.error('Upload error:', error);
      addNotification(error.message || 'Error uploading file. Please try again.', 'error');
    } finally {
      setUploading(false);
    }
  }, [addNotification, onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    multiple: false
  });

  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">{label}</label>
      
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer transition duration-300 ${
          isDragActive ? 'border-orange-500 bg-orange-50' : 'border-gray-300 hover:border-orange-500'
        }`}
      >
        <input {...getInputProps()} />
        
        {uploading ? (
          <div className="text-gray-600">
            <p>Uploading...</p>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-orange-500 h-2.5 rounded-full animate-pulse" style={{ width: '100%' }}></div>
            </div>
          </div>
        ) : uploadedFile ? (
          <div className="text-gray-600">
            <p className="text-green-600 font-medium">✓ File uploaded successfully</p>
            <p className="text-sm mt-1">{uploadedFile.name}</p>
            <button 
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setUploadedFile(null);
              }}
              className="mt-2 text-xs text-orange-600 hover:text-orange-800"
            >
              Replace file
            </button>
          </div>
        ) : (
          <div className="text-gray-600">
            <p>Drag & drop a file here, or click to select</p>
            <p className="text-sm mt-1">Accepted formats: PDF, DOCX, JPG</p>
          </div>
        )}
      </div>
    </div>
  );
}
