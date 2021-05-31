

INSERT INTO `contact_data` (`contactDataId`, `firstName`, `lastName`, `streetName`, `streetNumber`, `postalCode`, `cityName`, `phone`, `mailAddress`, `lastUpdate`, `createdAt`) VALUES
(1, 'Koji', 'Kondo', 'Bergstraße', '14', '07749', 'Jena', '0900767676', 'koj_kondo@web.de', NULL, '2021-05-24 08:21:37'),
(2, 'Hiroshi', 'Yamauchi', 'Zauberweg', '9', '141815', 'Muisin', '+81142656565', 'suzukiDestroyer@jin.jp', NULL, '2021-05-24 08:23:39'),
(3, 'Manfred', 'Reide', 'Chemietischstraße', '1', '142857', 'Simcity', '0124-148257', 'fensterWarenZuTeuer@dunkeldrin.de', NULL, '2021-05-24 08:25:26'),
(4, 'Jonas', 'Stenberg', 'Gewinnerstraße', '7', '01248', 'Bergen', '14191111-142', 'BergeLiebhabber@gmx.net', NULL, '2021-05-24 08:29:04'),
(5, 'Shigeru', 'Miyamoto', 'Nintendoweg', '14', '00100', 'Phinshin', '+81142833341', 'MarioMaker@shin.jp', NULL, '2021-05-24 08:30:17');

INSERT INTO `account_details` (`accountId`, `username`, `passwordHash`, `createdAt`, `updatedAt`) VALUES
(1, 'IggyPop', 'password123', '2021-05-31 10:27:36', NULL),
(2, 'SchlaubiSchlumpf', 'schlumpfineGeschlumpft', '2021-05-31 10:27:36', NULL),
(3, 'Brightwing', 'ItOnlyHurtsUntilYouDie', '2021-05-31 10:28:18', NULL),
(4, 'Kekslieferant400', 'MjamMjamMjam?!', '2021-05-31 10:28:48', NULL),
(5, 'RocknRollOpa', 'ThePolice_123', '2021-05-31 10:29:16', NULL),
(7, 'FlodinWiesret', '66410', '2021-05-31 10:31:18', NULL),
(8, 'MagnolienAusStahl', 'Lemur418', '2021-05-31 10:31:38', NULL),
(9, 'ColumboAuge', 'katalimata_megagut', '2021-05-31 10:32:04', NULL),
(10, 'Marius Mac Mac', 'LangeIstsHer', '2021-05-31 10:32:48', NULL);

INSERT INTO `role` (`roleName`, `isEnabledToManageRooms`, `isEnabledToManageBookings`, `isEnabledToManageCustomerData`, `createdAt`, `lastUpdate`) VALUES
('BuchungsManager', 0, 1, 0, '2021-05-31 10:52:45', 'NULL ON UPDATE CURRENT_TIMESTAMP'),
('Hotelleiter', 1, 1, 1, '2021-05-31 10:54:07', 'NULL ON UPDATE CURRENT_TIMESTAMP'),
('Kundenverwalter', 0, 0, 1, '2021-05-31 10:53:32', 'NULL ON UPDATE CURRENT_TIMESTAMP'),
('Raumverwalter', 1, 0, 0, '2021-05-31 10:53:32', 'NULL ON UPDATE CURRENT_TIMESTAMP');


INSERT INTO `employee` (`empNo`, `empName`, `givenRole`, `accountId`, `createdAt`, `lastUpdate`) VALUES
(1, 'Peter Quistgard', 'BuchungsManager', 3, '2021-05-31 10:57:24', NULL),
(2, 'Malignes Rau', 'Hotelleiter', 7, '2021-05-24 08:15:13', '2021-05-24 08:18:54'),
(3, 'Silikaten Muh', 'Kundenverwalter',8, '2021-05-24 08:16:47', NULL),
(4, 'Juri Juhu', 'Raumverwalter',9, '2021-05-24 08:19:47', NULL);

INSERT INTO `room` (`roomNo`, `roomName`, `areaInSqrMetre`, `category`, `pricePerUnit`, `lastUpdate`, `createdAt`) VALUES
(1, 'President Suite', 75, 'SUITE', '600', NULL, '2021-05-24 05:54:48'),
(2, 'Standard Sonnendeck', 50, 'DOUBLE', '100', NULL, '2021-05-24 05:56:25'),
(3, 'Standard Sonnendeck gross', 60, 'DOUBLE', '120', '2021-05-24 05:58:08', '2021-05-24 05:56:56'),
(4, 'Deluxe Miniraum', 30, 'SINGLE', '95', NULL, '2021-05-24 06:01:55'),
(5, 'Deluxe Miniraum', 40, 'DOUBLE', '95', NULL, '2021-05-24 06:01:55'),
(6, 'Konferenz klein', 40, 'SMALLGROUP', '25', NULL, '2021-05-24 06:01:55'),
(7, 'Konferenz mittel', 50, 'BIGGROUP', '35', NULL, '2021-05-24 06:01:55');

INSERT INTO `hotelroom` (`roomNo`, `bedCount`, `hasSpeedLAN`, `hasTV`, `hasKitchen`, `hasCoffeemaker`) VALUES
(1, 5, 1, 1, 0, 1),
(2, 3, 1, 1, 1, 1),
(3, 2, 0, 0, 0, 1),
(4, 2, 1, 0, 0, 1),
(5, 1, 1, 0, 0, 0);

INSERT INTO `conferenceroom` (`roomNo`, `maxAmountOfParticipants`, `amountOfWhiteboards`, `amountOfBeamer`, `hasScreen`, `hasComputer`, `hasTV`) VALUES
(6, 11, 0, 2, 1, 1, 0),
(7, 20, 0, 3, 0, 0, 1);

INSERT INTO `customer` (`customerID`, `paymentMethod`, `lastUpdate`, `createdAt`, `contactDataId`,`accountId`) VALUES 
(NULL, 'paypal', NULL, '2021-05-24 08:33:41', 1,1),
(NULL, 'bill', '2021-05-24 08:34:52', '2021-05-24 08:34:18', 4,2),
(NULL, 'debit', NULL, '2021-05-24 08:35:39', 2,3),
(NULL, 'bill', NULL, '2021-05-24 08:35:56', 3,4),
(NULL, 'paypal', NULL, '2021-05-24 08:36:25', 5,5);

INSERT INTO `booking` (`bookingNo`, `bookingDate`, `lastUpdate`, `roomNo`, `bookingType`, `startDate`, `endDate`, `specialWishes`, `Employee_empNo`, `Customer_customerID`) VALUES
(1, '2021-05-24 06:42:26', '2021-05-31 12:54:30', 2, 'hotelRoom', '2021-04-01', '2021-04-04', 'Cola so viel und so oft wie geht', 4, 2),
(2, '2021-05-24 06:43:55', '2021-05-31 12:54:40', 4, 'hotelRoom', '2021-05-01', '2021-05-07', 'Besonders weiche Kissen', 2, 4);


INSERT INTO `booking_request` (`reqId`, `bookingRequestDate`, `amountPeople`, `price`, `Room_roomNo`, `Customer_customerID`) VALUES 
(2, '2021-05-24 08:38:25', '14', '120', '4', '2'),
(3, '2021-05-24 08:39:27', '9', '245', '2', '3');

