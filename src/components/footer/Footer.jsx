import { FaFacebookF, FaYoutube, FaInstagram, FaTiktok } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#43bb1b] text-[#333333] text-sm py-10 px-6 mt-0 ">
      <div className=" mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 ">
        {/* Contact Information */}
        <div>
          <h3 className="font-bold mb-4">THÔNG TIN LIÊN HỆ</h3>
          <p>
            <strong>SUKIMOKO</strong>
            <br /> CÔNG TY TNHH TMDV SUKIMOKO - Sản xuất tại CÔNG TY TNHH MTV DV
            GIẤY PHƯƠNG NAM
          </p>
          <p className="mt-2">
            <strong>Địa chỉ</strong>
            <br />
            68-70 Nguyễn Ngọc Phương, P19, Bình Thạnh, TP. Hồ Chí Minh, Việt Nam
          </p>
          <p className="mt-2">
            <strong>Email</strong>
            <br />
            sukimoko@gmail.com
          </p>
          <p className="mt-2">
            <strong>Hotline</strong>
            <br />
            0981.450.145
          </p>
          <p className="mt-2">
            <strong>Thời gian hỗ trợ</strong>
            <br />
            08:30 - 18:00 (T2-T6)
          </p>
        </div>

        {/* Guidance */}
        <div className="hidden md:block lg:block">
          <h3 className="font-bold mb-4">HƯỚNG DẪN</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-[#333333]">
                Trang chủ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#333333]">
                Giới thiệu
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#333333]">
                Sản phẩm
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#333333]">
                Yêu thích
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#333333]">
                Tin tức
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#333333]">
                Liên hệ
              </a>
            </li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="font-bold mb-4">CHĂM SÓC KHÁCH HÀNG</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-[#333333]">
                Các câu hỏi thường gặp
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#333333]">
                Gửi yêu cầu hỗ trợ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#333333]">
                Đặt hàng online
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#333333]">
                Phương thức vận chuyển
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#333333]">
                Hoàn trả đơn hàng
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#333333]">
                Chính sách kiểm hàng
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#333333]">
                Tiêu chuẩn dịch vụ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#333333]">
                Phương thức thanh toán
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#333333]">
                Hướng dẫn
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#333333]">
                Chính sách bảo mật
              </a>
            </li>
          </ul>
        </div>

        {/* Connect */}
        <div className="text-white">
          <h3 className="text-[#333333] font-bold mb-4">KẾT NỐI</h3>
          <div className="flex space-x-4 mb-4 text-xl">
            <a
              href="#"
              aria-label="Facebook"
              className="hover:scale-120 bg-[#0866ff] p-2 rounded-md"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              aria-label="tiktok"
              className="hover:scale-120 bg-black p-2  rounded-md"
            >
              <FaTiktok />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="hover:scale-120 bg-gradient-to-bl from-[#fe6527] to-[#fec002]  p-2  rounded-md"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-dashed border-white border-gray-700 mt-8 pt-4 text-center text-[#333333] text-sm">
        <p>© Bản quyền thuộc về SUKIMOKO</p>
        <p>Chịu trách nhiệm nội dung: CÔNG TY TNHH MTV DV GIẤY PHƯƠNG NAM</p>
      </div>
    </footer>
  );
};

export default Footer;
