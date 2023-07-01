import { useEffect } from "react";

function MagicLinkMessage() {

    useEffect(() => {
        fetch('../../../outFile.pdf')
        .then((response) => response.blob())
        .then((blob) => {
          // Create a download link
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'Importantdocument.pdf';
  
          // Programmatically click the link to start the download
          document.body.appendChild(link);
          link.click();
  
          // Clean up
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        })
        .catch((error) => {
          console.error('Error downloading PDF:', error);
        });
    }, [])

    return (
        <div style={{textAlign:"center", verticalAlign: "middle"}}> File Downloaded!!</div>
        );
}

export default MagicLinkMessage;