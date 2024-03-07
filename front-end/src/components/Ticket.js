
import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as TimeIcon } from "../assets/icons/calendar-days-solid.svg";
import { ReactComponent as PersonIcon } from "../assets/icons/male-solid.svg";
import { ReactComponent as PhoneIcon } from "../assets/icons/phone-solid.svg";
import { ReactComponent as PriceIcon } from "../assets/icons/ticket-solid.svg";
const Ticket = (props) => {
    return (


      <div class="pr-4 pb-4">
        <a href="" class="c-card block bg-slate-300 shadow-xl hover:shadow-2xl rounded-lg overflow-hidden">
        
        <div class="p-4">
        <div class="row">
        <TimeIcon width="1.5rem" fill="rgb(249 115 22)" fixedWidth />
        <div class="pl-5"></div>
          <span class="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">6:00 12/12/2022</span>
          </div>
          <div class="row pt-4">
          <PersonIcon width="0.8rem" fill="rgb(249 115 22)" fixedWidth />
          <div class="pl-5"></div>
          <h2 class="mt-2 mb-2  font-bold">Nguyễn Văn Xuân Vũ</h2>
          </div>
          <div class="row pt-4">
          <PhoneIcon width="1.5rem" fill="rgb(249 115 22)" fixedWidth />
          <div class="pl-5"></div>
          <h2 class="mt-2 mb-2  font-bold">0375874221</h2>
          </div>
          <div class="row pt-4">
          <PriceIcon width="1.5rem" fill="rgb(249 115 22)" fixedWidth />
          <div class="pl-5"></div>
          <div class="mt-3 flex items-center">
            &nbsp;<h2>450.000</h2>&nbsp;<h2>VNĐ</h2>
          </div>
          </div>
        </div>
        
      </a>
      </div>
    
      

      );
}
export default Ticket