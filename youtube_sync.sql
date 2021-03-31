-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th3 31, 2021 lúc 01:13 PM
-- Phiên bản máy phục vụ: 10.4.14-MariaDB
-- Phiên bản PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `youtube_sync`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `table_accounts`
--

CREATE TABLE `table_accounts` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `table_accounts`
--

INSERT INTO `table_accounts` (`id`, `username`, `password`, `create_time`) VALUES
(1, 'Ily1606', '6d590d0d8702e8132a77913bf707de45', '2021-03-30 07:01:33'),
(5, 'HuyMagic123', '25f9e794323b453885f5181f1b624d0b', '2021-03-31 10:52:22');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `table_sync`
--

CREATE TABLE `table_sync` (
  `id` int(11) NOT NULL,
  `id_youtube` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `video_name` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `author_id` varchar(255) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `table_sync`
--

INSERT INTO `table_sync` (`id`, `id_youtube`, `username`, `video_name`, `author`, `author_id`, `create_time`) VALUES
(1, 'Ae1_oN5dQHw', 'Ily1606', 'Linh Cảm Tim Em (Lofi Ver.) - Ngọc Kara x Freak D', 'Freak D Music', 'UC7CLR70PwAff4tBUavQ42cw', '2021-03-31 09:19:31'),
(2, 'GwTSDsPwgJU', 'Ily1606', 'Giữ Ai Đó Đổi Thay (Lofi Ver.) - Trịnh Thiên Ân x Freak D', 'Freak D Music', 'UC7CLR70PwAff4tBUavQ42cw', '2021-03-31 09:22:20'),
(3, 'YBJT1ILMKpc', 'Ily1606', 'Chỉ Vì Quá Thương Em (Lofi Ver.) - Hải Nam x Freak D', 'Freak D Music', 'UC7CLR70PwAff4tBUavQ42cw', '2021-03-31 09:22:27'),
(4, 'YaykGT215b4', 'Ily1606', 'Già Cùng Nhau Là Được - TeA ft. PC ( Prod. VoVanDuc. ) | Official MV', 'TaynguyenSound Official', 'UCFqyQS21T6gvnRcqIp5f_DA', '2021-03-31 09:22:35'),
(5, 'JKwO77UUEYk', 'Ily1606', 'LiL Z - KẺ ĐIÊN TIN VÀO TÌNH YÊU | ( Official MV )', 'Lil Z Poet', 'UChRRxRUbcHK8HgYz4tiySyw', '2021-03-31 09:22:42'),
(6, 'SdUH8uFHYr8', 'Ily1606', '3107-2 (Lofi Ver.) - DuongG x Nâu x W/n x Freak D', 'Freak D Music', 'UC7CLR70PwAff4tBUavQ42cw', '2021-03-31 09:22:52'),
(7, 'V5GS5ANG96M', 'Ily1606', '3107 - W/n , Duongg, Nâu (Official MV)', 'W/n', 'UC6UrwtJjV4xPxxZo-ZEpQYA', '2021-03-31 09:23:00'),
(8, 'O71GdeeND68', 'Ily1606', 'Nợ Ai Đó Lời Xin Lỗi (Lofi ver.) - Bozitt x Freak D', 'Freak D Music', 'UC7CLR70PwAff4tBUavQ42cw', '2021-03-31 09:23:05'),
(9, 'Hi_22UXeP40', 'Ily1606', 'Chẳng Ai Yêu Mãi Một Người (Freak D Lofi Ver.) - NB3 Hoài Bảo x Đông Đặng', 'Freak D Music', 'UC7CLR70PwAff4tBUavQ42cw', '2021-03-31 09:23:10'),
(10, 'Hb03_MOcudQ', 'Ily1606', 'Chúng Ta Sau Này (Lofi Ver.) - T.R.I x Freak D', 'Freak D Music', 'UC7CLR70PwAff4tBUavQ42cw', '2021-03-31 09:23:15'),
(11, 'KCXOWNl2iCM', 'Ily1606', 'Dù Cho Mai Về Sau (Lofi Ver.) - buitruonglinh x Freak D', 'Freak D Music', 'UC7CLR70PwAff4tBUavQ42cw', '2021-03-31 09:23:30'),
(12, 'pse2JFM0rno', 'Ily1606', 'Mãi Chẳng Thuộc Về Nhau - Bozitt | MV Lyrics HD', 'Orinn SC', 'UC8BkoyQlpGiumLujgKSgW3A', '2021-03-31 09:23:42'),
(13, 'zEWSSod0zTY', 'Ily1606', 'GHÉ QUA  | OFFICIAL MV | Dick x PC x Tofu', 'BẠN CÓ TÀI MÀ', 'UCtVcnbgcPvXC-87MnGInvjw', '2021-03-31 09:26:15'),
(14, 'DnylRXWoGW0', 'Ily1606', 'Che Giấu Nỗi Đau (Lofi Ver.) - Hoàng Ly ft. Freak D | Lofi Chill Nhẹ Nhàng', 'Hạ Sang', 'UC8WHyfTblB1QhzlJEZawLQw', '2021-03-31 09:26:25'),
(15, 'AUz0JNWLt30', 'Ily1606', '3107-2 | DuongG x NÂU x W/N | OFFICIAL MV', 'Duongg Official', 'UCexR39LBcbgUr7YIKwR49Ww', '2021-03-31 09:26:36'),
(16, 'KbNL9ZyB49c', 'Ily1606', 'Take Over (ft. Jeremy McKinnon (A Day To Remember), MAX, Henry) | Worlds 2020 - League of Legends', 'League of Legends', 'UC2t5bjwHdUX4vM2g8TRDq5g', '2021-03-31 09:31:22');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `table_accounts`
--
ALTER TABLE `table_accounts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `username_2` (`username`);

--
-- Chỉ mục cho bảng `table_sync`
--
ALTER TABLE `table_sync`
  ADD PRIMARY KEY (`id`),
  ADD KEY `username` (`username`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `table_accounts`
--
ALTER TABLE `table_accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `table_sync`
--
ALTER TABLE `table_sync`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `table_sync`
--
ALTER TABLE `table_sync`
  ADD CONSTRAINT `table_sync_ibfk_1` FOREIGN KEY (`username`) REFERENCES `table_accounts` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
