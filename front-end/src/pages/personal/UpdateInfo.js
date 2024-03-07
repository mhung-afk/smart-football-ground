import React from "react";
import { useState, useEffect, useContext } from "react";
import Logo from "../../assets/images/logo.jpg";
import { API_URL } from "../../utils/constant";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import { getSrcFile } from "../../../src/utils/helpers";
const UpdateInfo = () => {
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const { accessToken } = useContext(AuthContext);
  const { loginHandle } = useContext(AuthContext);
  const [image, setimage] = useState(Logo);
  const [imageDP, setimageDP] = useState(Logo);
  const [user, setUser] = useState(null);
  useEffect(() => {
    axios
      .get(`${API_URL}/user-info`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        setUser(res.data.data.resUser);
        setName(res.data.data.resUser.name);
        setPhone(res.data.data.resUser.phone);
        setEmail(res.data.data.resUser.email);
        setimage(res.data.data.resUser.avatar);
        setimageDP(getSrcFile(res.data.data.resUser.avatar));
      });
  }, []);
  const onImageChange = (event) => {
    setimage(event.files[0]);
    
    setimageDP(event.files[0].name);
  };
  const Update = (event) => {
    event.preventDefault();
    var fd = new FormData();
    
    fd.append("name", name);
    fd.append("phone", phone);
    if (!image){
        setMsg("Vui lòng thêm ảnh")
    }
    else{ fd.append("image", image);
    try {
      axios
        .post(`${API_URL}/user-info/edit`, fd, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => {
          loginHandle(res.data.data.token, res.data.data.user);
          alert("Cap nhat thanh cong");
        });
    } catch (error) {
      setError("Server Interval Error.");
    }
  }
  };

  return (
    user && (
      <div class="pt-20">
        <div class="relative row pt-20 pb-10 items-center justify-center">
          <div class="absolute rounded-full bg-gray-100 w-36 h-36  -top-12 shadow-lg hover:shadow-xl transition">
            <div class="rounded-full w-full h-full overflow-auto">
              {user.avatar && <img src={imageDP} />}
              {!user.avatar && <img src={Logo} />}
            </div>
          </div>

          <div></div>

          <div class="w-full h-screen flex pt-5 pb-10 justify-center">
            <form class="w-full max-w-lg">
              <div class="flex flex-wrap -mx-3 mb-6  justify-center pt-2">
                <div class="w-full flex justify-center">
                  <input
                    name="image"
                    onChange={(e) => onImageChange(e.target)}
                    type="file"
                    className="filetype"
                    accept="image/*"
                  />
                </div>
               
                <div class="pt-10 w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-name"
                  >
                    Tên
                  </label>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div class="pt-10 w-full md:w-1/2 px-3">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-phone"
                  >
                    SĐT
                  </label>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-phone"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-email"
                  >
                    Email
                  </label>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-email"
                    type="text"
                    value={email}
                    readOnly
                  />
                </div>
              </div>
              <div class="flex items-center justify-center">{msg}</div>
              <div class="flex items-center justify-center">
                <button
                  onClick={Update}
                  class="text-white bg-amber-500 hover:bg-amber-600 font-bold py-2 px-4 border rounded-lg"
                >
                  Cập nhập
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};
export default UpdateInfo;
