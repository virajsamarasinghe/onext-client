/* eslint-disable react/no-unescaped-entities */
import React from 'react'

const serviceLists = [
  {
      id: 1, 
      title: "Food", 
      des: "Visit our shop anytime, and enjoy our delightful food corner!", 
      image: "/images/home/services/icon1.png"
  },
  {
      id: 2, 
      title: "Fast Delivery", 
      des: "Get your favorite ice cream delivered promptly to your door", 
      image: "/images/home/services/icon2.png"
  },
  {
      id: 3, 
      title: "Online Ordering", 
      des: "Explore our collection & shop with ease using our online ordering system", 
      image: "/images/home/services/icon3.png"
  },
  {
      id: 4, 
      title: "Gift Cards", 
      des: "Give the gift of stylish fashion with ONEXT Gift Cards", 
      image: "/images/home/services/icon4.png"
  }
];


const OurServices = () => {
  return (
    <div className='section-container my-16'> 
        <div className='flex flex-col md:flex-row items-center justify-between gap-12'>
                {/* text */}
        <div className='md:w-1/2'>
          <div className='text-left md:w-4/5'>
            <p className='subtitle'>Our Story and Services</p>
            <h2 className='title'>Our Sweet Fashion
            and Offerings</h2>
            <p className='my-5 text-secondary leading-[30px]'>
            Rooted in a love for fashion, we craft unforgettable clothing experiences and offer 
            exceptional services. Our journey blends artisanal garment making with a passion for creating smiles, one outfit at a time.
            </p>

            <button className='btn bg-pink text-white px-8 py-3 rounded-full'>Explore</button>

          </div>
        </div>

            {/*images*/}
        <div className='md:w-1/2'>
          <div className='grid sm:grid-cols-2 grid-cols-1 gap-8 items-center'>
            {
                serviceLists.map((service) => (
                    <div key={service.id} className='shadow-md rounded-sm py-5 px-4 text-center space-y-2
                    text-pink cursor-pointer hover:border-indigo-600 transition-all duration-200 hover:border'>
                        <img src={service.image} alt="" className='mx-auto'/>
                        <h5 className='pt-3 font-semibold'>{service.title}</h5>
                        <p className='text-[#4E4B51]'>{service.des}</p>
                    </div>
            ))
            }
          </div>
        </div>

        
      </div>
    </div>
  )
}

export default OurServices