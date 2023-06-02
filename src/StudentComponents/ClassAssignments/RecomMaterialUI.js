import React, { useState } from 'react';
import RecomFileItem from './RecomFileItem';


function RecomMaterialUI({recomFiles}) {
  const [fileUrls, setFileUrls] = useState(recomFiles);

  return (
    <div >
      <h2>Recommended Materials</h2>
      {fileUrls.map((file, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <RecomFileItem file={file} />
        </div>
      ))}
    </div>
  );
}

export default RecomMaterialUI;
