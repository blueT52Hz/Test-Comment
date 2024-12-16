export function Temp() {
  return (
    <div>
      <aside
        aria-label="Panel"
        id="panel-wrapper"
        className="col-xl-3 ps-2 text-muted"
      >
        <div className="access">
          <section id="access-lastmod">
            <h2 className="panel-heading">Recently Updated</h2>
            <ul className="content list-unstyled ps-0 pb-1 ms-1 mt-2">
              <li className="text-truncate lh-lg">
                {" "}
                <a href="/posts/Python_C%C6%A1_B%E1%BA%A3n/">Python Cơ Bản</a>
              </li>
              <li className="text-truncate lh-lg">
                {" "}
                <a href="/posts/OOP_Trong_Python/">OOP Trong Python</a>
              </li>
              <li className="text-truncate lh-lg">
                {" "}
                <a href="/posts/T%E1%BB%95ng_Quan_V%E1%BB%81_AI/">
                  Tổng Quan Về AI
                </a>
              </li>
              <li className="text-truncate lh-lg">
                {" "}
                <a href="/posts/M%C3%B4i_Tr%C6%B0%E1%BB%9Dng_%E1%BA%A2o_Trong_Python/">
                  Môi Trường Ảo Trong Python
                </a>
              </li>
              <li className="text-truncate lh-lg">
                {" "}
                <a href="/posts/C%C3%A1c_K%C4%A9_Thu%E1%BA%ADt_T%C3%A1ch_T%E1%BB%AB_Ph%E1%BA%A7n_1/">
                  Các kĩ thuật tách từ (Tokenizer) Phần 1
                </a>
              </li>
            </ul>
          </section>
          <section>
            <h2 className="panel-heading">Trending Tags</h2>
            <div className="d-flex flex-wrap mt-3 mb-1 me-3">
              {" "}
              <a
                className="post-tag btn btn-outline-primary"
                href="/tags/proptit/"
              >
                proptit
              </a>{" "}
              <a
                className="post-tag btn btn-outline-primary"
                href="/tags/token/"
              >
                Token
              </a>{" "}
              <a
                className="post-tag btn btn-outline-primary"
                href="/tags/cloud/"
              >
                cloud
              </a>{" "}
              <a
                className="post-tag btn btn-outline-primary"
                href="/tags/crawl-data/"
              >
                crawl data
              </a>{" "}
              <a
                className="post-tag btn btn-outline-primary"
                href="/tags/docker/"
              >
                docker
              </a>{" "}
              <a
                className="post-tag btn btn-outline-primary"
                href="/tags/embedding/"
              >
                embedding
              </a>{" "}
              <a
                className="post-tag btn btn-outline-primary"
                href="/tags/langchain/"
              >
                langchain
              </a>{" "}
              <a
                className="post-tag btn btn-outline-primary"
                href="/tags/prompt-engineering/"
              >
                prompt engineering
              </a>{" "}
              <a className="post-tag btn btn-outline-primary" href="/tags/rag/">
                rag
              </a>{" "}
              <a
                className="post-tag btn btn-outline-primary"
                href="/tags/regrex/"
              >
                Regrex
              </a>
            </div>
          </section>
        </div>
        <div className="toc-border-cover z-3"></div>
        <section id="toc-wrapper" className="position-sticky ps-0 pe-4">
          <h2 className="panel-heading ps-3 pb-2 mb-0">Contents</h2>
          <nav id="toc">
            <ul className="toc-list ">
              <li className="toc-list-item is-active-li">
                <a
                  href="#1-ai-là-gì-"
                  className="toc-link node-name--H2  is-active-link"
                >
                  1. AI là gì ?
                </a>
              </li>
              <li className="toc-list-item">
                <a
                  href="#2-thời-kỳ-phát-triển-của-ai"
                  className="toc-link node-name--H2 "
                >
                  2. Thời kỳ phát triển của AI.
                </a>
                <ul className="toc-list  is-collapsible is-collapsed">
                  <li className="toc-list-item">
                    <a
                      href="#1-khởi-đầu-ý-tưởng-trước-1956"
                      className="toc-link node-name--H3 "
                    >
                      1. Khởi đầu ý tưởng (Trước 1956)
                    </a>
                  </li>
                  <li className="toc-list-item">
                    <a
                      href="#2-thành-lập-lĩnh-vực-ai-1956"
                      className="toc-link node-name--H3 "
                    >
                      2. Thành lập lĩnh vực AI (1956)
                    </a>
                  </li>
                  <li className="toc-list-item">
                    <a
                      href="#3-giai-đoạn-lạc-quan-19561974"
                      className="toc-link node-name--H3 "
                    >
                      3. Giai đoạn lạc quan (1956–1974)
                    </a>
                  </li>
                  <li className="toc-list-item">
                    <a
                      href="#4-thời-kỳ-ai-mùa-đông-19741980"
                      className="toc-link node-name--H3 "
                    >
                      4. Thời kỳ “AI Mùa Đông” (1974–1980)
                    </a>
                  </li>
                  <li className="toc-list-item">
                    <a
                      href="#5-sự-phục-hồi-nhờ-hệ-chuyên-gia-19801987"
                      className="toc-link node-name--H3 "
                    >
                      5. Sự phục hồi nhờ hệ chuyên gia (1980–1987)
                    </a>
                  </li>
                  <li className="toc-list-item">
                    <a
                      href="#6-ai-mùa-đông-lần-thứ-hai-19871993"
                      className="toc-link node-name--H3 "
                    >
                      6. AI Mùa Đông lần thứ hai (1987–1993)
                    </a>
                  </li>
                  <li className="toc-list-item">
                    <a
                      href="#7-thời-kỳ-bùng-nổ-nhờ-học-máy-19932011"
                      className="toc-link node-name--H3 "
                    >
                      7. Thời kỳ bùng nổ nhờ học máy (1993–2011)
                    </a>
                  </li>
                  <li className="toc-list-item">
                    <a
                      href="#8-ai-hiện-đại-và-sự-bùng-nổ-2012nay"
                      className="toc-link node-name--H3 "
                    >
                      8. AI hiện đại và sự bùng nổ (2012–nay)
                    </a>
                  </li>
                  <li className="toc-list-item">
                    <a
                      href="#9-tương-lai-của-ai"
                      className="toc-link node-name--H3 "
                    >
                      9. Tương lai của AI
                    </a>
                  </li>
                </ul>
              </li>
              <li className="toc-list-item">
                <a
                  href="#3-tổng-quan-về-machine-learning-học-máy"
                  className="toc-link node-name--H2 "
                >
                  3. Tổng quan về Machine Learning (Học Máy).
                </a>
                <ul className="toc-list  is-collapsible is-collapsed">
                  <li className="toc-list-item">
                    <a
                      href="#học-máy-là-gì-"
                      className="toc-link node-name--H3 "
                    >
                      Học Máy là gì ?
                    </a>
                  </li>
                  <li className="toc-list-item">
                    <a
                      href="#tại-sao-lại-dùng-học-máy-"
                      className="toc-link node-name--H3 "
                    >
                      Tại sao lại dùng Học Máy ?
                    </a>
                  </li>
                  <li className="toc-list-item">
                    <a
                      href="#các-ứng-dụng-tiêu-biểu"
                      className="toc-link node-name--H3 "
                    >
                      Các Ứng dụng Tiêu biểu
                    </a>
                    <ul className="toc-list  is-collapsible is-collapsed">
                      <li className="toc-list-item">
                        <a
                          href="#phân-tích-hình-ảnh-và-tự-động-phân-loại-sản-phẩm-trên-dây-chuyền-sản-xuất"
                          className="toc-link node-name--H4 "
                        >
                          Phân tích hình ảnh và tự động phân loại sản phẩm trên
                          dây chuyền sản xuất
                        </a>
                      </li>
                      <li className="toc-list-item">
                        <a
                          href="#phát-hiện-khối-u-trong-ảnh-quét-não"
                          className="toc-link node-name--H4 "
                        >
                          Phát hiện khối u trong ảnh quét não
                        </a>
                      </li>
                      <li className="toc-list-item">
                        <a
                          href="#phân-loại-tin-tức-tự-động"
                          className="toc-link node-name--H4 "
                        >
                          Phân loại tin tức tự động
                        </a>
                      </li>
                      <li className="toc-list-item">
                        <a
                          href="#đánh-giá-bình-luận-cảm-trong-diễn-đàn-một-cách-tự-động"
                          className="toc-link node-name--H4 "
                        >
                          Đánh giá bình luận cảm trong diễn đàn một cách tự động
                        </a>
                      </li>
                      <li className="toc-list-item">
                        <a
                          href="#tóm-tắt-tài-liệu-tự-động"
                          className="toc-link node-name--H4 "
                        >
                          Tóm tắt tài liệu tự động
                        </a>
                      </li>
                      <li className="toc-list-item">
                        <a
                          href="#tạo-một-chatbot-hoặc-trợ-lý-cá-nhân"
                          className="toc-link node-name--H4 "
                        >
                          Tạo một chatbot hoặc trợ lý cá nhân
                        </a>
                      </li>
                      <li className="toc-list-item">
                        <a
                          href="#dự-báo-doanh-thu-công-ty-của-năm-tiếp-theo-dựa-trên-nhiều-chỉ-số-hiệu-suất"
                          className="toc-link node-name--H4 "
                        >
                          Dự báo doanh thu công ty của năm tiếp theo, dựa trên
                          nhiều chỉ số hiệu suất
                        </a>
                      </li>
                      <li className="toc-list-item">
                        <a
                          href="#tương-tác-với-ứng-dụng-thông-qua-giọng-nói"
                          className="toc-link node-name--H4 "
                        >
                          Tương tác với ứng dụng thông qua giọng nói
                        </a>
                      </li>
                      <li className="toc-list-item">
                        <a
                          href="#phát-hiện-gian-lận-thẻ-tín-dụng"
                          className="toc-link node-name--H4 "
                        >
                          Phát hiện gian lận thẻ tín dụng
                        </a>
                      </li>
                      <li className="toc-list-item">
                        <a
                          href="#phân-nhóm-khách-hàng-dựa-trên-sản-phẩm-tiêu-thụ-để-thiết-kế-chiến-lược-tiếp-thị-khác-nhau-cho-mỗi-phân-khúc"
                          className="toc-link node-name--H4 "
                        >
                          Phân nhóm khách hàng dựa trên sản phẩm tiêu thụ để
                          thiết kế chiến lược tiếp thị khác nhau cho mỗi phân
                          khúc
                        </a>
                      </li>
                      <li className="toc-list-item">
                        <a
                          href="#biểu-diễn-một-tập-dữ-liệu-phức-tạp-nhiều-chiều-trong-biểu-đồ-một-cách-rõ-ràng-và-hữu-ích"
                          className="toc-link node-name--H4 "
                        >
                          Biểu diễn một tập dữ liệu phức tạp, nhiều chiều trong
                          biểu đồ một cách rõ ràng và hữu ích
                        </a>
                      </li>
                      <li className="toc-list-item">
                        <a
                          href="#gợi-ý-sản-phẩm-mà-khách-hàng-có-thể-sẽ-quan-tâm-dựa-trên-những-sản-phẩm-mà-họ-đã-mua-trong-quá-khứ"
                          className="toc-link node-name--H4 "
                        >
                          Gợi ý sản phẩm mà khách hàng có thể sẽ quan tâm dựa
                          trên những sản phẩm mà họ đã mua trong quá khứ
                        </a>
                      </li>
                      <li className="toc-list-item">
                        <a
                          href="#xây-dựng-bot-thông-minh-biết-chơi-trò-chơi"
                          className="toc-link node-name--H4 "
                        >
                          Xây dựng bot thông minh biết chơi trò chơi
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="toc-list-item">
                    <a
                      href="#các-kiểu-hệ-thống-học-máy"
                      className="toc-link node-name--H3 "
                    >
                      Các kiểu Hệ thống Học Máy
                    </a>
                    <ul className="toc-list  is-collapsible is-collapsed">
                      <li className="toc-list-item">
                        <a
                          href="#học-có-giám-sátkhông-giám-sát"
                          className="toc-link node-name--H4 "
                        >
                          Học có Giám sát/không Giám sát
                        </a>
                      </li>
                      <li className="toc-list-item">
                        <a
                          href="#học-có-giám-sát"
                          className="toc-link node-name--H4 "
                        >
                          Học Có Giám Sát
                        </a>
                      </li>
                      <li className="toc-list-item">
                        <a
                          href="#học-không-giám-sát"
                          className="toc-link node-name--H4 "
                        >
                          Học Không Giám Sát
                        </a>
                      </li>
                      <li className="toc-list-item">
                        <a
                          href="#học-bán-giám-sát"
                          className="toc-link node-name--H4 "
                        >
                          Học bán giám sát
                        </a>
                      </li>
                      <li className="toc-list-item">
                        <a
                          href="#học-tăng-cường-reinforcement-learning"
                          className="toc-link node-name--H4 "
                        >
                          Học Tăng cường (Reinforcement Learning)
                        </a>
                      </li>
                      <li className="toc-list-item">
                        <a
                          href="#học-theo-batch-và-học-trực-tuyến"
                          className="toc-link node-name--H4 "
                        >
                          Học theo Batch và Học Trực tuyến
                        </a>
                      </li>
                      <li className="toc-list-item">
                        <a
                          href="#học-theo-batch"
                          className="toc-link node-name--H4 "
                        >
                          Học theo Batch
                        </a>
                      </li>
                      <li className="toc-list-item">
                        <a
                          href="#học-trực-tuyến"
                          className="toc-link node-name--H4 "
                        >
                          Học Trực tuyến
                        </a>
                      </li>
                      <li className="toc-list-item">
                        <a
                          href="#học-dựa-trên-mẫu-và-dựa-trên-mô-hình"
                          className="toc-link node-name--H4 "
                        >
                          Học dựa trên Mẫu và dựa trên Mô hình
                        </a>
                      </li>
                      <li className="toc-list-item">
                        <a
                          href="#học-dựa-trên-mẫu"
                          className="toc-link node-name--H4 "
                        >
                          Học dựa trên Mẫu
                        </a>
                      </li>
                      <li className="toc-list-item">
                        <a
                          href="#học-dựa-trên-mô-hình"
                          className="toc-link node-name--H4 "
                        >
                          Học dựa trên Mô hình
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="toc-list-item">
                    <a
                      href="#những-thách-thức-chính-của-học-máy"
                      className="toc-link node-name--H3 "
                    >
                      Những Thách Thức Chính của Học Máy
                    </a>
                    <ul className="toc-list  is-collapsible is-collapsed">
                      <li className="toc-list-item">
                        <a
                          href="#không-đủ-dữ-liệu-huấn-luyện"
                          className="toc-link node-name--H4 "
                        >
                          Không đủ Dữ liệu Huấn luyện
                        </a>
                      </li>
                      <li className="toc-list-item">
                        <a
                          href="#dữ-liệu-huấn-luyện-không-mang-tính-đại-diện"
                          className="toc-link node-name--H4 "
                        >
                          Dữ liệu Huấn luyện Không mang tính Đại diện
                        </a>
                      </li>
                      <li className="toc-list-item">
                        <a
                          href="#dữ-liệu-kém-chất-lượng"
                          className="toc-link node-name--H4 "
                        >
                          Dữ liệu Kém Chất lượng
                        </a>
                      </li>
                      <li className="toc-list-item">
                        <a
                          href="#các-đặc-trưng-không-liên-quan"
                          className="toc-link node-name--H4 "
                        >
                          Các Đặc trưng Không liên quan
                        </a>
                      </li>
                      <li className="toc-list-item">
                        <a
                          href="#quá-khớp-dữ-liệu-huấn-luyện"
                          className="toc-link node-name--H4 "
                        >
                          Quá khớp Dữ liệu Huấn luyện
                        </a>
                      </li>
                      <li className="toc-list-item">
                        <a
                          href="#dưới-khớp-dữ-liệu-huấn-luyện"
                          className="toc-link node-name--H4 "
                        >
                          Dưới khớp Dữ liệu Huấn luyện
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="toc-list-item">
                    <a href="#ôn-tập" className="toc-link node-name--H3 ">
                      Ôn tập
                    </a>
                  </li>
                  <li className="toc-list-item">
                    <a
                      href="#kiểm-tra-và-đánh-giá"
                      className="toc-link node-name--H3 "
                    >
                      Kiểm tra và Đánh giá
                    </a>
                    <ul className="toc-list  is-collapsible is-collapsed">
                      <li className="toc-list-item">
                        <a
                          href="#tinh-chỉnh-siêu-tham-số-và-lựa-chọn-mô-hình"
                          className="toc-link node-name--H4 "
                        >
                          Tinh Chỉnh Siêu Tham Số và Lựa Chọn Mô Hình
                        </a>
                      </li>
                      <li className="toc-list-item">
                        <a
                          href="#dữ-liệu-không-tương-đồng"
                          className="toc-link node-name--H4 "
                        >
                          Dữ liệu không tương đồng
                        </a>
                      </li>
                      <li className="toc-list-item">
                        <a
                          href="#định-lý-không-có-bữa-trưa-miễn-phí"
                          className="toc-link node-name--H4 "
                        >
                          Định Lý Không Có Bữa Trưa Miễn Phí
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className="toc-list-item">
                <a href="#4-câu-hỏi-ôn-tập" className="toc-link node-name--H2 ">
                  4. Câu Hỏi Ôn Tập.
                </a>
                <ul className="toc-list  is-collapsible is-collapsed">
                  <li className="toc-list-item">
                    <a
                      href="#1-định-nghĩa-của-học-máy-là-gì-"
                      className="toc-link node-name--H4 "
                    >
                      1. Định nghĩa của Học Máy là gì ?
                    </a>
                  </li>
                  <li className="toc-list-item">
                    <a
                      href="#2-bạn-có-thể-liệt-kê-bốn-loại-bài-toán-mà-học-máy-giải-quyết-tốt-không-"
                      className="toc-link node-name--H4 "
                    >
                      2. Bạn có thể liệt kê bốn loại bài toán mà Học Máy giải
                      quyết tốt không ?
                    </a>
                  </li>
                  <li className="toc-list-item">
                    <a
                      href="#3-tập-huấn-luyện-đã-gán-nhãn-là-gì-"
                      className="toc-link node-name--H4 "
                    >
                      3. Tập huấn luyện đã gán nhãn là gì ?
                    </a>
                  </li>
                  <li className="toc-list-item">
                    <a
                      href="#4-hai-tác-vụ-học-có-giám-sát-phổ-biến-nhất-là-gì-"
                      className="toc-link node-name--H4 "
                    >
                      4. Hai tác vụ học có giám sát phổ biến nhất là gì ?
                    </a>
                  </li>
                  <li className="toc-list-item">
                    <a
                      href="#5-bạn-có-thể-liệt-kê-bốn-tác-vụ-học-không-giám-sát-phổ-biến-không-"
                      className="toc-link node-name--H4 "
                    >
                      5. Bạn có thể liệt kê bốn tác vụ học không giám sát phổ
                      biến không ?
                    </a>
                  </li>
                  <li className="toc-list-item">
                    <a
                      href="#6-bạn-sẽ-sử-dụng-loại-thuật-toán-học-máy-nào-để-cho-phép-rô-bốt-đi-lại-trong-các-địa-hình-chưa-biết-"
                      className="toc-link node-name--H4 "
                    >
                      6. Bạn sẽ sử dụng loại thuật toán Học Máy nào để cho phép
                      rô bốt đi lại trong các địa hình chưa biết ?
                    </a>
                  </li>
                  <li className="toc-list-item">
                    <a
                      href="#7-bạn-sẽ-sử-dụng-loại-thuật-toán-nào-để-phân-nhóm-khách-hàng-thành-nhiều-nhóm-"
                      className="toc-link node-name--H4 "
                    >
                      7. Bạn sẽ sử dụng loại thuật toán nào để phân nhóm khách
                      hàng thành nhiều nhóm ?
                    </a>
                  </li>
                  <li className="toc-list-item">
                    <a
                      href="#8-bạn-sẽ-đặt-bài-toán-phát-hiện-thư-rác-là-bài-toán-học-có-giám-sát-hay-học-không-giám-sát-"
                      className="toc-link node-name--H4 "
                    >
                      8. Bạn sẽ đặt bài toán phát hiện thư rác là bài toán học
                      có giám sát hay học không giám sát ?
                    </a>
                  </li>
                  <li className="toc-list-item">
                    <a
                      href="#9-hệ-thống-học-trực-tuyến-là-gì-"
                      className="toc-link node-name--H4 "
                    >
                      9. Hệ thống học trực tuyến là gì ?
                    </a>
                  </li>
                  <li className="toc-list-item">
                    <a
                      href="#10-thế-nào-là-học-ngoài-bộ-nhớ-chính-"
                      className="toc-link node-name--H4 "
                    >
                      10. Thế nào là học ngoài bộ nhớ chính ?
                    </a>
                  </li>
                  <li className="toc-list-item">
                    <a
                      href="#11-loại-thuật-toán-nào-dựa-vào-phép-đo-độ-tương-đồng-để-đưa-ra-dự-đoán-"
                      className="toc-link node-name--H4 "
                    >
                      11. Loại thuật toán nào dựa vào phép đo độ tương đồng để
                      đưa ra dự đoán ?
                    </a>
                  </li>
                  <li className="toc-list-item">
                    <a
                      href="#12-sự-khác-biệt-giữa-tham-số-mô-hình-và-siêu-tham-số-của-thuật-toán-là-gì-"
                      className="toc-link node-name--H4 "
                    >
                      12. Sự khác biệt giữa tham số mô hình và siêu tham số của
                      thuật toán là gì ?
                    </a>
                  </li>
                  <li className="toc-list-item">
                    <a
                      href="#13-thuật-toán-học-dựa-trên-mô-hình-đang-tìm-kiếm-thứ-gì--chiến-lược-phổ-biến-nhất-mà-chúng-sử-dụng-để-thành-công-là-gì-chúng-đưa-ra-dự-đoán-như-thế-nào-"
                      className="toc-link node-name--H4 "
                    >
                      13. Thuật toán học dựa trên mô hình đang tìm kiếm thứ gì ?
                      Chiến lược phổ biến nhất mà chúng sử dụng để thành công là
                      gì? Chúng đưa ra dự đoán như thế nào ?
                    </a>
                  </li>
                  <li className="toc-list-item">
                    <a
                      href="#14-bạn-có-thể-liệt-kê-bốn-thách-thức-chính-trong-học-máy-không-"
                      className="toc-link node-name--H4 "
                    >
                      14. Bạn có thể liệt kê bốn thách thức chính trong Học Máy
                      không ?
                    </a>
                  </li>
                  <li className="toc-list-item">
                    <a
                      href="#15-nếu-mô-hình-của-bạn-hoạt-động-tốt-trên-dữ-liệu-huấn-luyện-nhưng-lại-khái-quát-kém-đối-với-dữ-liệu-mới-điều-gì-đang-xảy-ra--bạn-có-thể-liệt-kê-ba-giải-pháp-khả-thi-cho-vấn-đề-này-không-"
                      className="toc-link node-name--H4 "
                    >
                      15. Nếu mô hình của bạn hoạt động tốt trên dữ liệu huấn
                      luyện nhưng lại khái quát kém đối với dữ liệu mới, điều gì
                      đang xảy ra ? Bạn có thể liệt kê ba giải pháp khả thi cho
                      vấn đề này không ?
                    </a>
                  </li>
                  <li className="toc-list-item">
                    <a
                      href="#16-tập-kiểm-tra-là-gì-và-tại-sao-bạn-lại-muốn-sử-dụng-nó-"
                      className="toc-link node-name--H4 "
                    >
                      16. Tập kiểm tra là gì và tại sao bạn lại muốn sử dụng nó
                      ?
                    </a>
                  </li>
                  <li className="toc-list-item">
                    <a
                      href="#17-mục-đích-của-tập-kiểm-định-là-gì-"
                      className="toc-link node-name--H4 "
                    >
                      17. Mục đích của tập kiểm định là gì ?
                    </a>
                  </li>
                  <li className="toc-list-item">
                    <a
                      href="#18-tập-huấn-luyện---phát-triển-là-gì-khi-nào-bạn-cần-sử-dụng-và-làm-thế-nào-để-sử-dụng-nó-"
                      className="toc-link node-name--H4 "
                    >
                      18. Tập huấn luyện - phát triển là gì, khi nào bạn cần sử
                      dụng và làm thế nào để sử dụng nó ?
                    </a>
                  </li>
                  <li className="toc-list-item">
                    <a
                      href="#19-vấn-đề-gì-có-thể-xảy-ra-nếu-bạn-tinh-chỉnh-siêu-tham-số-bằng-tập-kiểm-tra-"
                      className="toc-link node-name--H4 "
                    >
                      19. Vấn đề gì có thể xảy ra nếu bạn tinh chỉnh siêu tham
                      số bằng tập kiểm tra ?
                    </a>
                  </li>
                </ul>
              </li>
              <li className="toc-list-item">
                <a
                  href="#5-tài-liệu-tham-khảo"
                  className="toc-link node-name--H2 "
                >
                  5. Tài Liệu Tham Khảo.
                </a>
              </li>
            </ul>
          </nav>
        </section>
      </aside>
    </div>
  );
}
