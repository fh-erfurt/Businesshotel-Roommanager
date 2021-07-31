

INSERT INTO `contact_data` (`contact_data_id`, `first_name`, `last_name`, `street_name`, `street_number`, `postal_code`, `city_name`, `phone`, `mail_address`, `payment_credentials`, `updated_at`, `created_at`) VALUES
(1, 'Koji', 'Kondo', 'Bergstraße', '14', '07749', 'Jena', '0900767676', 'koj_kondo@web.de','koj_kondo@web.de', NULL, '2021-05-24 08:21:37'),
(2, 'Hiroshi', 'Yamauchi', 'Zauberweg', '9', '141815', 'Muisin', '+81142656565', 'suzukiDestroyer@jin.jp','DE1234567891011121', NULL, '2021-05-24 08:23:39'),
(3, 'Manfred', 'Reide', 'Chemietischstraße', '1', '142857', 'Simcity', '0124-148257', 'fensterWarenZuTeuer@dunkeldrin.de', NULL, NULL, '2021-05-24 08:25:26'),
(4, 'Jonas', 'Stenberg', 'Gewinnerstraße', '7', '01248', 'Bergen', '14191111-142', 'BergeLiebhabber@gmx.net',NULL, NULL, '2021-05-24 08:29:04'),
(5, 'Shigeru', 'Miyamoto', 'Nintendoweg', '14', '00100', 'Phinshin', '+81142833341', 'MarioMaker@shin.jp','BergeLiebhabber@gmx.net', NULL, '2021-05-24 08:30:17');

INSERT INTO `account_details` (`account_id`, `username`, `password_hash`, `created_at`, `updated_at`) VALUES
(1, 'IggyPop', 'password123', '2021-05-31 10:27:36', NULL),
(2, 'SchlaubiSchlumpf', 'schlumpfineGeschlumpft', '2021-05-31 10:27:36', NULL),
(3, 'Brightwing', 'ItOnlyHurtsUntilYouDie', '2021-05-31 10:28:18', NULL),
(4, 'Kekslieferant400', 'MjamMjamMjam?!', '2021-05-31 10:28:48', NULL),
(5, 'RocknRollOpa', 'ThePolice_123', '2021-05-31 10:29:16', NULL),
(7, 'FlodinWiesret', '66410', '2021-05-31 10:31:18', NULL),
(8, 'MagnolienAusStahl', 'Lemur418', '2021-05-31 10:31:38', NULL),
(9, 'ColumboAuge', 'katalimata_megagut', '2021-05-31 10:32:04', NULL),
(10, 'Marius Mac Mac', 'LangeIstsHer', '2021-05-31 10:32:48', NULL);

INSERT INTO `role` (`role_name`, `is_enabled_to_manage_rooms`, `is_enabled_to_manage_bookings`, `is_enabled_to_manage_customer_data`, `is_enabled_to_manage_employee_data`, `created_at`, `updated_at`) VALUES
('Buchungsmanager', 0, 1, 0, 0, '2021-05-31 10:52:45', 'NULL ON UPDATE CURRENT_TIMESTAMP'),
('Hotelleiter', 1, 1, 1, 1, '2021-05-31 10:54:07', 'NULL ON UPDATE CURRENT_TIMESTAMP'),
('Kundenmanager', 0, 0, 1, 0, '2021-05-31 10:53:32', 'NULL ON UPDATE CURRENT_TIMESTAMP'),
('Personalmanager', 0, 0, 0, 1, '2021-05-31 10:53:32', 'NULL ON UPDATE CURRENT_TIMESTAMP'),
('Raummanager', 1, 0, 0, 0, '2021-05-31 10:53:32', 'NULL ON UPDATE CURRENT_TIMESTAMP');


INSERT INTO `employee` (`emp_no`, `emp_name`, `given_role`, `account_id`, `created_at`, `updated_at`) VALUES
(1, 'Peter Quistgard', 'Buchungsmanager', 3, '2021-05-31 10:57:24', NULL),
(2, 'Malignes Rau', 'Hotelleiter', 7, '2021-05-24 08:15:13', '2021-05-24 08:18:54'),
(3, 'Silikaten Muh', 'Kundenmanager',8, '2021-05-24 08:16:47', NULL),
(4, 'Juri Juhu', 'Raummanager',9, '2021-05-24 08:19:47', NULL),
(5, 'Peter Ersonal', 'Personalmanager',10, '2021-05-24 08:20:47', NULL);



INSERT INTO `hotel_room` (`hotel_room_id`, `bed_count`, `has_speed_lan`, `has_tv`, `has_kitchen`, `has_coffeemaker`) VALUES
(1, 5, 1, 1, 0, 1),
(2, 3, 1, 1, 1, 1),
(3, 2, 0, 0, 0, 1),
(4, 2, 1, 0, 0, 1),
(5, 1, 1, 0, 0, 0);

INSERT INTO `conference_room` (`conference_room_id`, `max_amount_of_participants`, `amount_of_whiteboards`, `amount_of_beamer`, `has_screen`, `has_computer`, `amount_of_tv`) VALUES
(6, 11, 0, 2, 1, 1, 0),
(7, 20, 0, 3, 0, 0, 1);


INSERT INTO `room` (`room_no`, `area_in_sqr_metre`, `category`, `price_per_unit`, `updated_at`, `created_at`,`hotel_room_id`,`conference_room_id`,`room_type`) VALUES
(1, 75, 'SUITE',        '600', NULL, '2021-05-24 05:54:48',1,NULL,'HOTELROOM'),
(2, 50, 'DOUBLE',       '100', NULL, '2021-05-24 05:56:25',2,NULL,'HOTELROOM'),
(3, 60, 'DOUBLE',       '120', NULL, '2021-05-24 05:56:56',3,NULL,'HOTELROOM'),
(4, 30, 'SINGLE',       '95', NULL, '2021-05-24 06:01:55',4,NULL,'HOTELROOM'),
(5, 40, 'DOUBLE',       '95', NULL, '2021-05-24 06:01:55',5,NULL,'HOTELROOM'),
(6, 40, 'SMALLGROUP',   '25', NULL, '2021-05-24 06:01:55',NULL,6,'CONFERENCEROOM'),
(7, 50, 'BIGGROUP',     '35', NULL, '2021-05-24 06:01:55',NULL,7,'CONFERENCEROOM');


INSERT INTO `customer` (`customer_id`, `payment_method`, `updated_at`, `created_at`, `contact_data_id`,`account_id`, `is_business_customer`) VALUES
(NULL, 'paypal', NULL, '2021-05-24 08:33:41', 1,1,true),
(NULL, 'bill', '2021-05-24 08:34:52', '2021-05-24 08:34:18', 4,2,false),
(NULL, 'debit', NULL, '2021-05-24 08:35:39', 2,3,true),
(NULL, 'bill', NULL, '2021-05-24 08:35:56', 3,4,false),
(NULL, 'paypal', NULL, '2021-05-24 08:36:25', 5,5,true);

INSERT INTO `booking` (`booking_no`, `updated_at`, `room_no`, `booking_type`, `start_date`, `end_date`, `special_wishes`, `emp_no`, `customer_id`, `pricing`) VALUES
(1, '2021-05-24 06:42:26',  2, 'ConferenceRoomBooking', '2021-04-01 10:30:00', '2021-04-04 10:30', 'Cola so viel und so oft wie geht', 4, 2,1111.99),
(2, '2021-05-24 06:43:55',  4, 'HotelRoomBooking', '2021-05-01 10:30:00', '2021-05-07 10:30:00', 'Besonders weiche Kissen', 2, 4,2525.52);

INSERT INTO `room_has_booking` (`room_no`, `booking_id`) VALUES
('2', '1'),
('4', '1');

INSERT INTO `booking_request` (booking_request_id, customer_id, room_category, booking_type, start_date, end_date, special_wishes) VALUES
(1,1,'SINGLE','ConferenceRoomBooking','2021-06-28','2021-06-29',null),
(2,2,'SMALLGROUP','HotelRoomBooking','2021-06-28','2021-06-29',null);


