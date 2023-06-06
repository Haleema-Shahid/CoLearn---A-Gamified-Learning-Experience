import React, { useState } from 'react';
import TRecomFileItem from './TRecomFileItem';
//.link might have to change when material come

function TRecomMaterialUI({ recomFiles }) {
  const [fileUrls, setFileUrls] = useState(recomFiles);

  return (
    <div >

      {console.log("fileurls: ", fileUrls)}

      {fileUrls.map((file, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <TRecomFileItem file={file.file} level={file.level} tags={file.tags} />
        </div>
      ))}
    </div>
  );
}

export default TRecomMaterialUI;
