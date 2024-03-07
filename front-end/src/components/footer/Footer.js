import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer class="footer z-10">
      <div class="container">
        <div class="row">
          <div class="footer-col">
            <h4>Về SALE_OLE</h4>
            <ul>
              <li>
                <a href="#">Giới thiệu</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Điều khoản sử dụng</a>
              </li>
              <li>
                <a href="#">Chính sách bảo mật</a>
              </li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Trợ giúp</h4>
            <ul>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Trạng thái đặt hàng</a>
              </li>
              <li>
                <a href="#">Phương thức thanh toán</a>
              </li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Thanh toán</h4>
            <ul>
              <li>
                <a href="#">Tiền mặt</a>
              </li>
              <li>
                <a href="#">Chuyển khoản</a>
              </li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Follow</h4>
            <div class="social-links">
              <a href="#">
                <i class="fab"></i>
              </a>
              <a href="#">
                <i class="fab"></i>
              </a>
              <a href="#">
                <i class="fab"></i>
              </a>
              <a href="#">
                <i class="fab"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
