import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

const About = () => {
  return (
    <>
      <Header />

      <div className="max-w-5xl mx-auto p-5">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-4">
          <a href="/" className="hover:underline">
            Trang chủ
          </a>{' '}
          {'>'} <span className="text-orange-600 font-semibold">Giới thiệu</span>
        </nav>

        {/* Title */}
        <h1 className="text-2xl font-semibold mb-6">Giới thiệu</h1>

        {/* Content Sections */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">SUKIMOKO LÀ AI?</h2>
          <p className="text-gray-800 leading-relaxed">
            Thương hiệu SUKIMOKO ra đời trong thời kì đại dịch Covid 19. Thấu hiểu nhu cầu khách hàng, SUKIMOKO  cho ra mắt những sản phẩm gia dụng dành cho gia đình với mục đích mang sản phẩm thiết yếu đến tay người tiêu dùng nhanh nhất qua nền tảng mua hàng trực tuyến. Chúng tôi mang đến đa dạng mặt hàng giúp chăm sóc gia đình một cách tiện lợi và an toàn như giấy ăn cao cấp , giấy rút đáy, giấy vệ sinh, khăn mặt khô, nước giặt, nước rửa chén, viên giặt, hộp khử mùi tủ lạnh và nhiều sản phẩm vệ sinh gia đình khác. SUKIMOKO  luôn đồng hành cùng hàng triệu gia đình Việt, mang đến sự an tâm và tiện ích trong từng sản phẩm, góp phần tạo nên những khoảnh khắc hạnh phúc và ấm áp cho gia đình. Hãy trải nghiệm ngay những sản phẩm tại ToSUKIMOKO pGia để trải nghiệm sự TẬN TÂM - UY TÍN - CHẤT LƯỢNG
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">TẦM NHÌN</h2>
          <p className="italic mb-2">“Trở thành thương hiệu hàng đầu đồ tiêu dùng của gia đình Việt”</p>
          <p className="text-gray-800 leading-relaxed">
            Đến năm 2028, Sukimoko hướng đến việc trở thành thương hiệu hàng đầu trong lĩnh vực đồ tiêu dùng cho gia đình tại Việt Nam. Sukimoko cam kết cung cấp những sản phẩm chất lượng cao, thân thiện với môi trường và phù hợp với nhu cầu đa dạng của người tiêu dùng Việt.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">SỨ MỆNH</h2>
          <p className="italic mb-2">“Mang đến sự tiện lợi cho mỗi gia đình”</p>
          <p className="text-gray-800 leading-relaxed">
            Sukimoko cam kết cung cấp các sản phẩm tiêu dùng chất lượng cao, tiện lợi và đa dạng, giúp mỗi gia đình Việt dễ dàng tiếp cận và sử dụng. Bằng cách lắng nghe nhu cầu của khách hàng, đổi mới công nghệ và cải tiến quy trình sản xuất, Sukimoko mong muốn mang lại giải pháp tối ưu cho cuộc sống hàng ngày, tạo điều kiện thuận lợi cho các gia đình tận hưởng thời gian bên nhau và nâng cao chất lượng cuộc sống.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">GIÁ TRỊ CỐT LÕI</h2>
          <p className="italic mb-2">“Hiệu suất cải thiện cuộc sống - Hiệu quả phục vụ khách hàng”</p>
          {/* The screenshot cuts off here, so no further content */}
        </section>
      </div>

      <Footer />
    </>
  );
};

export default About;
