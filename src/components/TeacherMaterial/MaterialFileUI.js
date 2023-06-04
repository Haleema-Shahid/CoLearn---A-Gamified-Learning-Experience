import React, { useState } from 'react';
import MaterialFileItem from './MaterialFileItem';
//.link might have to change when material come

function MaterialFileUI({materialFiles}) {
  const [fileUrls, setFileUrls] = useState(materialFiles);

  return (
    <div >
      
      {fileUrls.map((file, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <MaterialFileItem file={file} />
        </div>
      ))}
    </div>
  );
}

export default MaterialFileUI;
