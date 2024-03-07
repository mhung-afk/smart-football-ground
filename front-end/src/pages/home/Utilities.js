
import React from "react";
import { ReactComponent as OnlineIcon } from "../../assets/icons/location-dot-solid.svg";
import { ReactComponent as CalenIcon } from "../../assets/icons/calendar-solid.svg";
import { ReactComponent as SmartIcon } from "../../assets/icons/hourglass-start-solid.svg";
const Utilities = () => {
    return (
        <div class="mt-2 pl-6 pr-6">
            <div class="pt-16">
                <p class="text-3xl text-orange-500 font-semibold text-center pt-6">
                    Tại sao lại cần SALE OLE
                </p>
                <p class="text-lg text-center pt-3">
                    Nền tảng đặt sân - quản lý sân thông minh
                </p>
            </div>
            <div class="flex-nowrap columns-1 sm:columns-3 pt-10 pb-6 h-fit">
            <div class="flex flex-wrap mt-3 sm:mt-0 sm:h-96 md:h-64 lg:h-64 bg-white rounded-lg border shadow-2xl">
                    <div class="row m-auto pt-3 pb-5">
                        <OnlineIcon width="2rem" fill="rgb(249 115 22)" fixedWidth />
                    </div>
                    <div class="flex flex-col">
                        <h5 class="mb-2 text-center text-lg font-bold tracking-tight ">
                            Tìm kiếm và đặt sân bóng online
                        </h5>
                        <p class="mb-3 text-center font-normal ">
                            Tìm kiếm, đặt sân bóng online theo địa điểm tiện lợi, dễ dàng và nhanh chóng.
                        </p>
                    </div>
                </div>
                
                <div class="flex flex-wrap mt-3 sm:mt-0 sm:h-96 md:h-64 lg:h-64 bg-white rounded-lg border shadow-2xl">
                    <div class="row m-auto pt-3 pb-5">
                        <CalenIcon width="2.3rem" fill="rgb(249 115 22)" />
                    </div>
                    <div class="flex flex-col">
                        <h5 class="mb-2 text-center text-lg font-bold tracking-tight ">
                            Công cụ quản lý sân bóng online
                        </h5>
                        <p class="mb-3 text-center font-normal ">
                            Quản lý lịch đặt sân đơn giản tiếp nhận đặt sân online dễ dàng và
                            hiệu quả.
                        </p>
                    </div>
                </div>
                
                <div class="flex flex-wrap mt-3 sm:mt-0 sm:h-96 md:h-64 lg:h-64 bg-white rounded-lg border shadow-2xl">
                    <div class="row m-auto pt-3 pb-5">
                        <SmartIcon width="2rem" fill="rgb(249 115 22)" />
                    </div>
                    <div class="flex flex-col">
                        <h5 class="mb-2 text-center text-lg font-bold tracking-tight ">
                            Điều khiển thiết bị sân thông minh
                        </h5>
                        <p class="mb-3 text-center font-normal ">
                            Điều khiển, sử dụng các thiết bị, đồ dùng trên sân bóng tự động,
                            thông minh
                        </p>
                    </div>
                </div>
            </div>

            



        </div>
    );
};

export default Utilities;