// import React, { useState,useReducer, useEffect } from 'react';
// import { Transition } from "@headlessui/react";
// import LineGraph from './bigd3';
// import * as XLSX from 'xlsx';
// import GoogleLineGraph from './googleLineGraph';

// const GraphPage = ({ key }) => {
//   const [data, setData] = useState([]);
//   const [data2, setData2] = useState([]);
//   const [data3, setData3] = useState([]);
//   const [isDataLoaded, setIsDataLoaded] = useState(false);


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://127.0.0.1:5000/get_cyclic_graph');
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }
//         const rawData = await response.text();

//         const rows = rawData.trim().split('\n').map(row => row.split(/\s+/));
//         const rearrangedData = rows.slice(1).map(row => ({
//           x: parseFloat(row[2]),
//           y: parseFloat(row[1])
//         }));
//         const rearrangedData2 = rows.slice(1).map(row => ({
//           x: parseFloat(row[2]),
//           y: parseFloat(row[4])
//         }));
//         const rearrangedData3 = rows.slice(1).map(row => ({
//           x: parseFloat(row[3]),
//           y: parseFloat(row[4])
//         }));
        
//         console.log(`Length of rearrangedData: ${rearrangedData.length}`);
//         console.log(`Length of rearrangedData2: ${rearrangedData2.length}`);
//         console.log(`Length of rearrangedData3: ${rearrangedData3.length}`);

//         setData(rearrangedData);
//         setData2(rearrangedData2);
//         setData3(rearrangedData3);
//         setIsDataLoaded(true); // Set data loaded flag to true

//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
    
  
    
//     console.log("forceupdate triggered")
//   }, [key]);

  
//   const handleDownloadExcel = () => {
//     const dataToExport = [
//       ['Normal Displacement (m)', 'Tangential Displacement (m)', 'Normal Stress (Pa)', 'Shear Stress (Pa)'],
//       ...data.map((item, index) => [item.y, item.x, data3[index].x, data3[index].y])
//     ];

//     const workbook = XLSX.utils.book_new();
//     const worksheet1 = XLSX.utils.aoa_to_sheet(dataToExport);
//     XLSX.utils.book_append_sheet(workbook, worksheet1, 'Data');

//     const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
//     const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
//     const url = URL.createObjectURL(blob);

//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'data.xlsx';
//     a.click();

//     URL.revokeObjectURL(url);
//   };

//   if (loader || !isDataLoaded) {
//     return (
//       <div className="loader">
//         <Transition
//           show={true}
//           enter="transition-opacity duration-1000"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="transition-opacity duration-1000"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           loading...
//         </Transition>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="flex flex-col">
//         <div className="flex justify-between mb-4">
//           <div className="w-1/2 bg-gray-200 p-4">
//             <p className="text-center">Tangential Displacement (m) against Normal Displacement (m)</p>
//             {/* <LineGraph data={data} /> */}
//             <GoogleLineGraph data={data} />
//           </div>
//           <div className="w-1/2 bg-gray-200 p-4">
//             <p className="text-center">Normal Stress (Pa) against Shear Stress (Pa)</p>
//             <LineGraph data={data2} />
//           </div>
//         </div>
//         <div className="flex justify-center">
//           <div className="bg-gray-200 p-4">
//             <p className="text-center">Normal Stress (Pa) against Shear Stress (Pa)</p>
//             <LineGraph data={data3} />
//           </div>
//         </div>
//       </div>
//       <div className="flex justify-center mt-4">
//         <button onClick={handleDownloadExcel} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//           Download Excel
//         </button>
//       </div>
//     </>
//   );
// };

// export default GraphPage;



import React, { useState, useEffect } from 'react';
// import LineGraph from '../app/components/d3matploty';
import { Transition } from "@headlessui/react";
import LineGraph from './bigd3';
import * as XLSX from 'xlsx';

const GraphPage = ({key, loader}) => {

    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);
    const [dataDownload, setDataDownload] = useState([]);
    const [dataDownload2, setDataDownload2] = useState([]);
    const [dataDownload3, setDataDownload3] = useState([]);

  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://127.0.0.1:5000/get_cyclic_graph');
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const rawData = await response.text();
          console.log("raw data from the server ..... ")
          console.log(rawData)
          console.log("complete")
          const rows = rawData.trim().split('\n').map(row => row.split(/\s+/));
          const rearrangedData = rows.slice(1).map(row => ({
            x: parseFloat(row[2]), 
            y: parseFloat(row[1])  
          }));
          const rearrangedData2 = rows.slice(1).map(row => ({
            x: parseFloat(row[2]), 
            y: parseFloat(row[4])  
          }));
          const rearrangedData3 = rows.slice(1).map(row => ({
            x: parseFloat(row[3]), 
            y: parseFloat(row[4])  
          }));
  
          setData(rearrangedData);
          setData3(rearrangedData3);
          setData2(rearrangedData2);

          const selectDataPoints = (data) => {
            const selectedData = [];
            for (let i = 0; i < data.length; i += 10) {
              selectedData.push(data[i]);
            }
            return selectedData;
          };
      
          const selectedData = selectDataPoints(rearrangedData);
          const selectedData2 = selectDataPoints(rearrangedData2);
          const selectedData3 = selectDataPoints(rearrangedData3);
      
          setDataDownload(selectedData);
          setDataDownload2(selectedData2);
          setDataDownload3(selectedData3);

  
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    const handleDownloadExcel = () => {
      const dataToExport = [
        ['Normal Displacement (m)', 'Tangential Displacement (m)', 'Normal Stress (Pa)', 'Shear Stress (Pa)'], // Header row
        ...data.map((item, index) => [item.y, item.x, data3[index].x, data3[index].y]) // Data rows
      ];
    
      // Create a new workbook
      const workbook = XLSX.utils.book_new();
    
      // Add the worksheet
      const worksheet1 = XLSX.utils.aoa_to_sheet(dataToExport);
      XLSX.utils.book_append_sheet(workbook, worksheet1, 'Data');
    
      // Generate a binary string from the workbook
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    
      // Convert the binary string to a Blob
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    
      // Create a download link
      const url = URL.createObjectURL(blob);
    
      // Initiate the download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data.xlsx';
      a.click();
    
      // Clean up
      URL.revokeObjectURL(url);
    };
    if (loader) {
      return <div className="loader">
        <Transition
            show={true}
            enter="transition-opacity duration-1000"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-1000"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >loading...</Transition>
             

      </div>; // Assuming you have a CSS class for a circular loader
    }

    return (
      <>
        <div className="flex flex-col">
          <div className="flex justify-between mb-4">
            <div className="w-1/2 bg-gray-200 p-4">
              <p className="text-center">Tangential Displacment(m) against Normal Displacment (m)</p>
              <LineGraph data={dataDownload} />
            </div>
            <div className="w-1/2 bg-gray-200 p-4">
              <p className="text-center">Normal Stress (Pa) against Shear Stress (Pa)</p>
              <LineGraph data={dataDownload2} />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="bg-gray-200 p-4">
              <p className="text-center"> Normal Stress (Pa) against Shear Stress (Pa)</p>
              <LineGraph data={dataDownload3} />
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <button onClick={handleDownloadExcel} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Download Excel
          </button>
        </div>
      </>
    );
  };
  
export default GraphPage;
