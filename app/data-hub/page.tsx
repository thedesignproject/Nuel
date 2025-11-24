'use client';

import { TopBar } from '../components/TopBar';
import { Sidebar } from '../components/Sidebar';
import { FileUploadPanel } from '../components/FileUploadPanel';
import { useAuth } from '../context/AuthContext';
import { LAYOUT_SPACING } from '../design-tokens';

export default function DataHubPage() {
  const { logout } = useAuth();
  const handleFileUpload = (file: File) => {
    console.log('File uploaded:', file.name);
    // Handle file upload logic here
  };

  const handleFileDelete = (fileId: string) => {
    console.log('File deleted:', fileId);
    // Handle file deletion logic here
  };

  const handleFileDownload = (fileId: string) => {
    console.log('File download:', fileId);
    // Handle file download logic here
  };

  return (
    <div className="min-h-screen relative bg-[#E8F3FF]">
      {/* Grid Background */}
      <div
        className="fixed inset-0 z-0 opacity-40"
        style={{
          backgroundImage: 'url(/Grid.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Main Layout */}
      <div className="relative z-10 flex h-screen overflow-hidden">
        {/* Sidebar - Sticky */}
        <div className="h-screen sticky top-0 z-30" style={{ padding: LAYOUT_SPACING.pageEdge }}>
          <Sidebar mode="executive" variant="expanded" activeItem="data-hub" onLogout={logout} />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          {/* Content Wrapper with shared padding */}
          <div
            className="flex-1 flex flex-col min-w-0 overflow-y-auto"
            style={{
              paddingLeft: LAYOUT_SPACING.contentEdge,
              paddingRight: LAYOUT_SPACING.pageEdge,
              paddingTop: LAYOUT_SPACING.pageEdge,
              paddingBottom: LAYOUT_SPACING.pageEdge,
            }}
          >
            {/* Top Nav - Sticky with glass effect */}
            <div className="sticky top-0 z-20" style={{ marginBottom: LAYOUT_SPACING.contentTopGap }}>
              <TopBar
                title="Data Hub"
                subtitle="Upload daily reports to keep Nuel system syncronized with the latest operational data"
              />
            </div>

            {/* Page Content */}
            <div className="flex flex-col gap-[24px]" style={{ overflowX: 'hidden' }}>
              {/* File Upload Panels */}
              <div
                style={{
                  display: 'flex',
                  gap: '16px',
                  width: '100%',
                }}
              >
                <FileUploadPanel
                  title="ZSOP7"
                  onFileUpload={handleFileUpload}
                  onFileDelete={handleFileDelete}
                  onFileDownload={handleFileDownload}
                />
                <FileUploadPanel
                  title="Inventory Report"
                  onFileUpload={handleFileUpload}
                  onFileDelete={handleFileDelete}
                  onFileDownload={handleFileDownload}
                />
                <FileUploadPanel
                  title="Open Order Report"
                  onFileUpload={handleFileUpload}
                  onFileDelete={handleFileDelete}
                  onFileDownload={handleFileDownload}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
