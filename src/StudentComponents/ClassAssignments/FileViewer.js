import React from 'react';

const FileViewer = ({ fileUrl }) => {
    return (
        <iframe src={fileUrl} title="File Viewer" width="100%" height="500px" />
    );
};

export default FileViewer;
