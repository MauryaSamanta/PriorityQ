import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { saveAs } from 'file-saver';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const FilePreviewOverlay = ({ file, onClose }) => {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  if (!file) return null;

  const handleDownload = () => {
    saveAs(file.file_url, file.file_name);
  };

  const renderFilePreview = () => {
    const fileType = file.file_url.split('.').pop().toLowerCase();

    switch (fileType) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <img src={file.file_url} alt={file.file_name} style={{ maxWidth: '100%', maxHeight: '100%' }} />;

      case 'mp4':
      case 'webm':
      case 'ogg':
        return (
          <video controls style={{ maxWidth: '100%', maxHeight: '100%' }}>
            <source src={file.file_url} type={`video/${fileType}`} />
            Your browser does not support the video tag.
          </video>
        );

      case 'pdf':
        return (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            height="100%"
            overflow="auto"
            
            p={2}
            sx={{
              zIndex:1200,
              overflowY: 'auto',
              '&::-webkit-scrollbar': {
                width: '10px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#888',
                borderRadius: '10px',
                border: '3px solid transparent',
                backgroundClip: 'padding-box',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: '#555',
              },
              '&::-webkit-scrollbar-track': {
                background: 'transparent',
              },
            }}
          >
            <Document
              file={file.file_url}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={<div>Loading PDF...</div>}
              noData={<div>No PDF file specified</div>}
              error={<div>Error while loading PDF</div>}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Box mb={1} key={index}>
                  <Page
                    pageNumber={index + 1}
                    width={600}
                    renderMode="canvas"
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    style={{ margin: "0 auto", padding: 0 }}
                  />
                </Box>
              ))}
            </Document>
          </Box>
        );

      default:
        return <Typography variant="body2" color="white">Preview not available for this file type.</Typography>;
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        zIndex: 1300,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          display: 'flex',
          gap: '10px',
        }}
      >
        <IconButton onClick={onClose} color="inherit">
          <CloseIcon />
        </IconButton>
        <IconButton onClick={handleDownload} color="inherit">
          <DownloadIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          width: '80%',
          height: '80%',
          borderRadius: '8px',
          overflow: 'auto',
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          {file.file_name}
        </Typography>
        {renderFilePreview()}
      </Box>
    </Box>
  );
};

export default FilePreviewOverlay;
