import React from 'react';
import callingIcon from '../assets/calling.svg';
import TrophyIcon from '../assets/trophy.svg';
import warrantyIcon from '../assets/warrenty.svg';
import shippingIcon from '../assets/shipping.svg';

const Footer = () => {
  return (
    <div className="bg-[#F9F1E7] border-t-2 border-b-2 border-[#d9e0ea] px-4 sm:px-10 lg:px-20 py-8 sm:py-12 lg:py-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">

        {/* Feature 1: High Quality */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <img src={TrophyIcon} alt="High Quality" className="w-12 h-12 sm:w-10 sm:h-10" />
          <div>
            <p className="text-black text-lg sm:text-xl lg:text-2xl font-bold">High Quality</p>
            <p className="text-gray-400 text-sm sm:text-base">crafted from top materials</p>
          </div>
        </div>

        {/* Feature 2: Warranty Protection */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <img src={warrantyIcon} alt="Warranty Protection" className="w-12 h-12 sm:w-10 sm:h-10" />
          <div>
            <p className="text-black text-lg sm:text-xl lg:text-2xl font-bold">Warranty Protection</p>
            <p className="text-gray-400 text-sm sm:text-base">Over 2 years</p>
          </div>
        </div>

        {/* Feature 3: Free Shipping */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <img src={shippingIcon} alt="Free Shipping" className="w-12 h-12 sm:w-10 sm:h-10" />
          <div>
            <p className="text-black text-lg sm:text-xl lg:text-2xl font-bold">Free Shipping</p>
            <p className="text-gray-400 text-sm sm:text-base">Order over $150</p>
          </div>
        </div>

        {/* Feature 4: 24 / 7 Support */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <img src={callingIcon} alt="24/7 Support" className="w-12 h-12 sm:w-10 sm:h-10" />
          <div>
            <p className="text-black text-lg sm:text-xl lg:text-2xl font-bold">24 / 7 Support</p>
            <p className="text-gray-400 text-sm sm:text-base">Dedicated support</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Footer;
