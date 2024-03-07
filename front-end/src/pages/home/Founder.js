import React from "react";

const Founder = () => {
    return (
        <div class="pl-10 pr-10">
            <div class="column pt-16">
                <p class="text-3xl text-orange-500 font-semibold text-center pt-6">
                    Nhà sáng lập
                </p>
            </div>
            <div class="flex flex-wrap">
                <div class="w-full md:w-1/3">
                    <div class="px-8  py-8 bg-white shadow-2xl rounded-lg my-20">
                        <div class="flex justify-center md:justify-center -mt-16">
                            <img
                                class="w-20 h-20 object-cover rounded-full border-2 border-indigo-500"
                                src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt="avatar"
                            />
                        </div>

                        <div class="flex justify-center mt-4">
                            <div class="text-xl font-medium text-indigo-500">Đắc Chiến</div>
                        </div>
                    </div>
                </div>
                <div class="w-full md:w-1/3">
                    <div class=" px-8 py-8 bg-white shadow-2xl rounded-lg my-20">
                        <div class="flex justify-center md:justify-center -mt-16">
                            <img
                                class="w-20 h-20 object-cover rounded-full border-2 border-indigo-500"
                                src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt="avatar"
                            />
                        </div>

                        <div class="flex justify-center mt-4">
                            <div class="text-xl font-medium text-indigo-500">Mạnh Hùng</div>
                        </div>
                    </div>
                </div>
                
                <div class="w-full md:w-1/3">
                    <div class=" px-8 py-8 bg-white shadow-2xl rounded-lg my-20">
                        <div class="flex justify-center md:justify-center -mt-16">
                            <img
                                class="w-20 h-20 object-cover rounded-full border-2 border-indigo-500"
                                src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt="avatar"
                            />
                        </div>

                        <div class="flex justify-center mt-4">
                            <div class="text-xl font-medium text-indigo-500">Xuân Vũ</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Founder;