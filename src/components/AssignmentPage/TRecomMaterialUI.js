import React, { useState } from 'react';
import TRecomFileItem from './TRecomFileItem';
//.link might have to change when material come

function TRecomMaterialUI({recomFiles}) {
  const [fileUrls, setFileUrls] = useState(recomFiles);

  return (
    <div >
      <h2>Recommended Materials</h2>
      {fileUrls.map((file, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <TRecomFileItem file={file.link} />
        </div>
      ))}
    </div>
  );
}

export default TRecomMaterialUI;
