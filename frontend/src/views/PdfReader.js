import React from 'react';

const PdfReader = () => {
    const formData = new FormData();
    formData.append('File', "../../../outFile.pdf");
    console.log(Object.fromEntries(formData.entries()))
  
  return (
    <div>
      check console
    </div>
  );
};

export default PdfReader;
