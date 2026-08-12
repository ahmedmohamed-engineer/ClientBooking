// import React, { useState } from 'react'
// import assets from '../../assets/uploadArea.png'

// function AddHotel() {

//   const [image, setImage] = useState({
//     1: null,
//     2: null,
//     3: null,
//   })

//   const [inputData, setInputData] = useState({
//     roomType: '',
//     prisePernight: '',

//     amenities:{
//       'free Wi-Fi': false,
//       'Breakfast included': false,
//       'Swimming Pool': false,
//       'AirPort Shuttle': false,
//     }
//   })



//   return (
//    <form className='mt-4 p-4'>
//     <h1>Add Hotel</h1>
//     <p>Please Fill In Details below to add a new hotel .</p>

//     <div className=' grid grid-cols-1 md:grid-cols-2 gap-4 my-4'>

//       {Objects.keys(image).map((key) =>(
//         <label htmlFor={`hotelImage${key}`} key={key}>

//           <img
//           className='max-h-13 cursor-pointer opacity-80'
//           src={image[key] ? URL.createObjectURL(image[key]) : uploadArea}
//           />
//           <input
//           type='file'
//           accept='image/*'
//           hidden
//           onChange={(e) => setImage({
//             ...image,
//             [key]: e.target.files[0]
//           })}
//           />

//         </label>
//       ))}

//     </div>
//    </form>
//   )
// }

// export default AddHotel


import React, { useState } from 'react'
import uploadArea from '../../assets/uploadArea.png'
function AddHotel() {

  const [image, setImage] = useState({
    1: null,
    2: null,
    3: null,
  })

  const [inputData, setInputData] = useState({
    roomType: '',
    prisePernight: '',
    amenities:{
      'free Wi-Fi': false,
      'Breakfast included': false,
      'Swimming Pool': false,
      'AirPort Shuttle': false,
    }
  })

  return (
   <form className='mt-4 p-4'>
    <h1>Add Hotel</h1>
    <p>Please Fill In Details below to add a new hotel.</p>

    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-4'>

      {Object.keys(image).map((key) => (
        <label htmlFor={`hotelImage${key}`} key={key}>

          <img
            className='max-h-13 cursor-pointer opacity-80'
            src={image[key] ? URL.createObjectURL(image[key]) : uploadArea}
            alt="preview"
          />

          <input
            id={`hotelImage${key}`}
            type='file'
            accept='image/*'
            hidden
            onChange={(e) =>
              setImage({
                ...image,
                [key]: e.target.files[0],
              })
            }
          />
        </label>
      ))}

    </div>
    <div className='w-full flex sm:flex-col sm:gap-4 mt-4'>
      <div className='flex-1 max-w-50'>
        <p className='text-gray-600 font-bold'>Room Type</p>
        <select value={inputData.roomType}
        onChange={(e) => setInputData({...inputData, roomType: e.target.value})}
        className='border opacity-70 border-gray-300 mt-1 rounded p-2 w-full'>
          <option value="">Select Room Type</option>
          <option value="single">Single</option>
          <option value="double">Double</option>
          <option value="suite">Suite</option>

        </select>

      </div>
      <div>
        <p className='text-gray-600 font-bold'>Prise Per Night</p>
        <input type='numper' placeholder='0' className=' border border-gray-300 mt-0 rounded w-25'
        value={inputData.prisePernight} onChange={(e)=> setInputData({...inputData, prisePernight
          : e.target.value
        })}/>
      </div>

    </div>

    <p className='text-gray-600 font-bold'>Amenities</p>
    <div className='flex flex-col flex-wrap text-gray-400 mt-2'>
      {Object.keys(inputData.amenities).map((amenty, index)=>(
        <div key={index}>
          <input type="checkbox" id={`amenities${index+1}`}checked={inputData.amenities[amenty]}
          onChange={() => setInputData({...inputData, amenities:{...inputData.amenities,
            [amenty]: !inputData.amenities[amenty]
          }})} />
          <label htmlFor={`amenities${index+1}`} className='ml-2 cursor-pointer'>{amenty}</label>

        </div>
      ))}         

    </div>

    <button className='mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-all'>Add Hotel</button>
   </form>
  )
}

export default AddHotel
