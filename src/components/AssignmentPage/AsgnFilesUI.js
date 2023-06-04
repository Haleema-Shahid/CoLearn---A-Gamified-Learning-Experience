//this component will receive all the assignment files and display them
import React, { useState } from 'react';
import AsgnFileItem from './AsgnFileItem';


function AsgnFilesUI({asgnFiles}) {
  const [fileUrls, setFileUrls] = useState(asgnFiles);

  return (
    <div >
      <h2>Assignment Attachments</h2>
      {fileUrls.map((file, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <AsgnFileItem file={file.link} />
        </div>
      ))}
    </div>
  );
}

export default AsgnFilesUI;
