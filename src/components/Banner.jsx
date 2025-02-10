import bannerImg2 from "/images/home/banner2.png";

const Banner = () => {
  return (
    <div className='section-container bg-gradient-to-r from-[#FFDE59] to-[#FFDE59] relative w-full' style={{ maxWidth: 'auto', margin: '0 auto' }}> {/* background color */}
      <div className='py-24 flex flex-col md:flex-row justify-between items-start gap-8 relative'>
        
        {/* Text */}
        <div className='md:w-1/2 space-y-7 px-4 z-10'>
          <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug'>
          Explore the City in Style with Our Top Quality    

            <span className='text-pink'> Fashion</span>
          </h2>
          <p className='text-xl text-[#4a4a4a]'>
          Affordable fashion sense in Sri Lanka. Secure your most awaited design now.
          </p>
          <button className='btn bg-pink px-8 py-3 font-semibold text-white rounded-full'>
            Buy Now
          </button>
        </div> 
        
        {/* Image */}
        <div className='flex items-end h-full md:w-1/2 absolute bottom-0 right-0'>
          <img src={bannerImg2} alt="Banner" className="w-full md:w-3/4 lg:w-5/6" />
        </div> 
        
      </div>
    </div>
  );
};

export default Banner;