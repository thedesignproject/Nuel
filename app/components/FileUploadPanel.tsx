'use client';

import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { FileArrowUp, FileText, UserCircle, Info, DownloadSimple, Trash } from '@phosphor-icons/react';

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  uploadedBy: string;
  uploadedAt: Date;
}

export interface FileUploadPanelProps {
  title: string;
  className?: string;
  onFileUpload?: (file: File) => void;
  onFileDelete?: (fileId: string) => void;
  onFileDownload?: (fileId: string) => void;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 MB';
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
};

const formatDate = (date: Date): string => {
  const day = date.getDate();
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${day} ${month}, ${hours}:${minutes}`;
};

// ============================================
// MAIN COMPONENT
// ============================================

export const FileUploadPanel = React.forwardRef<HTMLDivElement, FileUploadPanelProps>(
  ({ title, className, onFileUpload, onFileDelete, onFileDownload }, ref) => {
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
      {
        id: '1',
        name: `${title.replace(' ', '')}_2024_12_09.xlsx`,
        size: 3.2 * 1024 * 1024,
        uploadedBy: 'Name Name',
        uploadedAt: new Date('2024-12-09T09:00:00'),
      },
      {
        id: '2',
        name: `${title.replace(' ', '')}_2024_12_08.xlsx`,
        size: 3.1 * 1024 * 1024,
        uploadedBy: 'Name Name',
        uploadedAt: new Date('2024-12-08T09:30:00'),
      },
      {
        id: '3',
        name: `${title.replace(' ', '')}_2024_12_07.xlsx`,
        size: 3.3 * 1024 * 1024,
        uploadedBy: 'Name Name',
        uploadedAt: new Date('2024-12-07T09:15:00'),
      },
      {
        id: '4',
        name: `${title.replace(' ', '')}_2024_12_06.xlsx`,
        size: 3.0 * 1024 * 1024,
        uploadedBy: 'Name Name',
        uploadedAt: new Date('2024-12-06T09:45:00'),
      },
      {
        id: '5',
        name: `${title.replace(' ', '')}_2024_12_06.xlsx`,
        size: 3.0 * 1024 * 1024,
        uploadedBy: 'Name Name',
        uploadedAt: new Date('2024-12-06T10:00:00'),
      },
    ]);

    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
    const ALLOWED_TYPES = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
      'application/vnd.ms-excel', // .xls
      'text/csv', // .csv
    ];

    const validateFile = (file: File): string | null => {
      if (!ALLOWED_TYPES.includes(file.type) && !file.name.match(/\.(xlsx|xls|csv)$/i)) {
        return 'Invalid file type. Please upload .xlsx, .xls, or .csv files only.';
      }
      if (file.size > MAX_FILE_SIZE) {
        return 'File size exceeds 10 MB limit.';
      }
      return null;
    };

    const handleFile = (file: File) => {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        setTimeout(() => setError(null), 5000);
        return;
      }

      setError(null);

      // Add file to uploaded files list
      const newFile: UploadedFile = {
        id: Date.now().toString(),
        name: file.name,
        size: file.size,
        uploadedBy: 'John Doe RM',
        uploadedAt: new Date(),
      };

      setUploadedFiles([newFile, ...uploadedFiles]);

      // Call callback if provided
      if (onFileUpload) {
        onFileUpload(file);
      }
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFile(files[0]);
      }
    };

    const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        handleFile(files[0]);
      }
      // Reset input value to allow re-uploading same file
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };

    const handleClick = () => {
      fileInputRef.current?.click();
    };

    const handleDelete = (fileId: string) => {
      setUploadedFiles(uploadedFiles.filter((f) => f.id !== fileId));
      if (onFileDelete) {
        onFileDelete(fileId);
      }
    };

    const handleDownload = (fileId: string) => {
      if (onFileDownload) {
        onFileDownload(fileId);
      }
    };

    return (
      <div
        ref={ref}
        className={className}
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          width: '100%',
          height: '100%',
        }}
      >
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            width: '100%',
          }}
        >
          <h3
            style={{
              fontFamily: 'DM Sans',
              fontSize: '18px',
              fontWeight: 600,
              lineHeight: '26px',
              color: '#17263D',
              margin: 0,
            }}
          >
            {title}
          </h3>
        </div>

        {/* File Upload Dropzone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
          style={{
            backgroundColor: isDragging ? '#EAF0FC' : '#F6F9FF',
            border: `2px dashed ${isDragging ? '#1C58F7' : '#C8D4EB'}`,
            borderRadius: '16px',
            padding: '24px 32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            cursor: 'pointer',
            transition: 'all 150ms ease-in-out',
            width: '100%',
          }}
        >
          <FileArrowUp size={56} weight="regular" color="#17263D" />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              textAlign: 'center',
              color: '#17263D',
            }}
          >
            <p
              style={{
                fontFamily: 'DM Sans',
                fontSize: '18px',
                fontWeight: 600,
                lineHeight: '26px',
                margin: 0,
              }}
            >
              Drop your Excel file here
            </p>
            <p
              style={{
                fontFamily: 'DM Sans',
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: '24px',
                margin: 0,
              }}
            >
              or click to browse
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Info size={16} weight="regular" color="#7F8FA4" />
            <p
              style={{
                fontFamily: 'DM Sans',
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: '22px',
                color: '#7F8FA4',
                margin: 0,
              }}
            >
              Supports .xlsx, .xls, .csv files up to 10 MB
            </p>
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv"
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
        />

        {/* Error Message */}
        {error && (
          <div
            style={{
              padding: '12px',
              backgroundColor: '#FFF5F5',
              border: '1px solid #FF3B30',
              borderRadius: '8px',
              fontFamily: 'DM Sans',
              fontSize: '14px',
              fontWeight: 500,
              color: '#FF3B30',
            }}
          >
            {error}
          </div>
        )}

        {/* Upload History Section */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            height: '592px',
            overflow: 'hidden',
          }}
        >
          {/* Section Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              height: '24px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                flex: 1,
              }}
            >
              <p
                style={{
                  fontFamily: 'DM Sans',
                  fontSize: '16px',
                  fontWeight: 600,
                  lineHeight: '24px',
                  color: '#17263D',
                  margin: 0,
                }}
              >
                Upload History
              </p>
              <div
                style={{
                  backgroundColor: '#EAF0FC',
                  padding: '1px 8px',
                  borderRadius: '4px',
                }}
              >
                <p
                  style={{
                    fontFamily: 'DM Sans',
                    fontSize: '12px',
                    fontWeight: 500,
                    lineHeight: '20px',
                    color: '#1C58F7',
                    margin: 0,
                  }}
                >
                  {uploadedFiles.length} files
                </p>
              </div>
            </div>
          </div>

          {/* Files Container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              overflowY: 'auto',
              flex: 1,
            }}
          >
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '0.5px solid #D9E0E9',
                  borderRadius: '8px',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                }}
              >
                {/* File Info */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    flex: 1,
                  }}
                >
                  {/* File Name */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <FileText size={16} weight="regular" color="#17263D" />
                    <p
                      style={{
                        fontFamily: 'DM Sans',
                        fontSize: '16px',
                        fontWeight: 600,
                        lineHeight: '24px',
                        color: '#17263D',
                        margin: 0,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        flex: 1,
                      }}
                    >
                      {file.name}
                    </p>
                  </div>

                  {/* User Info */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <UserCircle size={16} weight="regular" color="#7F8FA4" />
                    <p
                      style={{
                        fontFamily: 'DM Sans',
                        fontSize: '14px',
                        fontWeight: 400,
                        lineHeight: '22px',
                        color: '#7F8FA4',
                        margin: 0,
                      }}
                    >
                      By
                    </p>
                    <p
                      style={{
                        fontFamily: 'DM Sans',
                        fontSize: '14px',
                        fontWeight: 500,
                        lineHeight: '22px',
                        color: '#7F8FA4',
                        margin: 0,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        flex: 1,
                      }}
                    >
                      {file.uploadedBy}
                    </p>
                  </div>

                  {/* File Details */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <Info size={16} weight="regular" color="#7F8FA4" />
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                      }}
                    >
                      <p
                        style={{
                          fontFamily: 'DM Sans',
                          fontSize: '14px',
                          fontWeight: 400,
                          lineHeight: '22px',
                          color: '#7F8FA4',
                          margin: 0,
                        }}
                      >
                        {formatFileSize(file.size)}
                      </p>
                      <div
                        style={{
                          width: '1px',
                          height: '16px',
                          backgroundColor: '#C3CDD9',
                        }}
                      />
                      <p
                        style={{
                          fontFamily: 'DM Sans',
                          fontSize: '14px',
                          fontWeight: 400,
                          lineHeight: '22px',
                          color: '#7F8FA4',
                          margin: 0,
                        }}
                      >
                        {formatDate(file.uploadedAt)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '8px',
                    paddingLeft: '16px',
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(file.id);
                    }}
                    style={{
                      padding: '2px',
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    aria-label="Download file"
                  >
                    <DownloadSimple size={20} weight="regular" color="#17263D" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(file.id);
                    }}
                    style={{
                      padding: '2px',
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    aria-label="Delete file"
                  >
                    <Trash size={20} weight="regular" color="#17263D" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

FileUploadPanel.displayName = 'FileUploadPanel';
