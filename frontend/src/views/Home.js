import "@passageidentity/passage-elements/passage-auth";
//import ILovePDFFile from '@ilovepdf/ilovepdf-js/ILovePDFFile';
//import { useEffect } from "react";
//import ILovePDFApi from '@ilovepdf/ilovepdf-js';
//const instance = new ILovePDFApi('@ilovepdf/ilovepdf-nodejs');
//const task = instance.newTask('unlock');

function Home() {

//     useEffect(() => {
//         task.start()
// .then(() => {
//   const file = new ILovePDFFile("/home/tejaswi/pdf-passage/sampleFile.pdf")
//     return task.addFile(file);
// })
// .then((file) => {
//     file.params.password = "191999";
//     return task.process();
// })
// .then(() => {
//     return task.download();
// })
// .then((data) => {
//     console.log('DONE');
//     console.log("PDF data", data)})
//     }, [])

    return (
        <passage-auth app-id={process.env.REACT_APP_PASSAGE_APP_ID}></passage-auth>
    );
}

export default Home;
