/* eslint-disable react/style-prop-object */
import React from "react";
import Button from "../../UI/Button";
import { CardContainer, CardHeader, CardHeaderOverlay } from "../../UI/Card";
import Utilities from "./Utilities";
import Founder from "./Founder";
import Outstanding from "./Outstanding";
import Logo from "../../assets/images/logo.jpg";
import Field1 from ".././../assets/images/field1.jpg";

import './Home.css'
const Home = () => {
  return (
    <div>
      <div class="items-center">
        
        <CardContainer className="m-4 hover:shadow-2xl duration-100">
          <CardHeader image={Field1} minHeight="500px" minWidth="90vw">
            <CardHeaderOverlay />
            <div className="absolute left-5 bottom-10 items-start">
            <h1 className="text-orange-500 text-4xl">Chào mừng đến với chuỗi sân bóng SALE OLE</h1>
            <h3 className="pt-4 text-orange-400 text-2xl hidden md:block">Đặt sân nhanh chóng, quản lý sân thông minh</h3>
    <div class="container pt-10 flex mx-auto">
    <div class="flex border-2 rounded">
        <button class="flex items-center justify-center px-4 border-r">
            <svg class="w-6 h-6 text-white-600" fill="white" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <path
                    d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z">
                </path>
            </svg>
        </button>
        <input type="text" class="px-4 py-2 w-80" placeholder="Tên quận hoặc tên sân bóng"/>
    </div>
</div>
            </div>
          </CardHeader>
        </CardContainer>
      </div>
      <div>
        <div class="pt-15">
          <Utilities />
        </div>
        <div class="pt-15">
          <Outstanding />
        </div>
        <div class="pt-15">
          <div class="w-full">
            <div class="bg-gray-300 grid grid-cols-1 p-10 lg:grid-cols-1">
              <div>
                <img src={Logo} class="h-20 w-20 rounded-full mx-auto" alt="" />
                <h2 class="font-bold text-2xl text-center my-3 text-orange-500 uppercase">
                  Hãy đến với SALE OLE
                </h2>
              </div>
              <p class="text-center">
                Hãy cùng nhau trải nghiệm những giây phút vui vẻ, rèn luyện sức
                khỏe, kết giao bạn bè cũng như trải nhiệm hệ thống sân bóng
                thông minh của chúng tôi
              </p>
              <div class="row pt-6 justify-center">
                <Button type="link" to="san-bong">
                  ĐẶT SÂN NGAY
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div class="pt-15">
          <Founder />
        </div>
        <div class="text-4xl font-bold"></div>
      </div>
    </div>
  );
};

export default Home;