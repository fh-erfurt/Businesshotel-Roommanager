

INSERT INTO `contactdata` (`contactDataId`, `firstName`, `lastName`, `streetName`, `streetNumber`, `postalCode`, `cityName`, `phone`, `mailAddress`, `lastUpdate`, `createdAt`) VALUES
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

INSERT INTO `employee` (`empNo`, `empName`, `givenRole`, `createdAt`, `lastUpdate`,`accountId`) VALUES
(1, 'Peter Quistgard', 'isEnabledToManageBookings', '2021-05-24 08:10:15', NULL,6),
(2, 'Malignes Rau', 'isEnabledToManageRooms', '2021-05-24 08:15:13', '2021-05-24 08:18:54',7),
(3, 'Silikaten Muh', 'isEnabledToManageCustomerData', '2021-05-24 08:16:47', NULL,8),
(4, 'Juri Juhu', 'isEnabledToManageBookings', '2021-05-24 08:19:47', NULL,9);

INSERT INTO `room` (`roomNo`, `roomName`, `areaInSqrMetre`, `category`, `pricePerUnit`, `lastUpdate`, `createdAt`) VALUES
(1, 'President Suite', 75, 'SUITE', '600', NULL, '2021-05-24 05:54:48'),
(2, 'Standard Sonnendeck', 50, 'DOUBLE', '100', NULL, '2021-05-24 05:56:25'),
(3, 'Standard Sonnendeck gross', 60, 'DOUBLE', '120', '2021-05-24 05:58:08', '2021-05-24 05:56:56'),
(4, 'Deluxe Miniraum', 30, 'SINGLE', '95', NULL, '2021-05-24 06:01:55'),
(5, 'Deluxe Miniraum', 40, 'DOUBLE', '95', NULL, '2021-05-24 06:01:55'),
(6, 'Konferenz klein', 40, 'SMALLGROUP', '25', NULL, '2021-05-24 06:01:55');

INSERT INTO `customer` (`customerID`, `paymentMethod`, `lastUpdate`, `createdAt`, `contactDataId`,`accountId`) VALUES 
(NULL, 'paypal', NULL, '2021-05-24 08:33:41', 1,1),
(NULL, 'bill', '2021-05-24 08:34:52', '2021-05-24 08:34:18', 4,2),
(NULL, 'debit', NULL, '2021-05-24 08:35:39', 2,3),
(NULL, 'bill', NULL, '2021-05-24 08:35:56', 3,4),
(NULL, 'paypal', NULL, '2021-05-24 08:36:25', 5,5);

INSERT INTO `booking` (`bookingNo`, `bookingDate`, `lastUpdate`, `roomNo`, `startDate`, `endDate`, `startTime`, `endTime`, `specialWishes`, `Employee_empNo`, `Customer_customerID`) VALUES 
(1, '2021-05-24 08:42:26', NULL, '2', '2021-04-01', '2021-04-04', NULL, NULL, 'Cola so viel und so oft wie geht', '4', '2'),
(2, '2021-05-24 08:43:55', NULL, '4', '2021-05-01', '2021-05-07', NULL, NULL, 'Besonders weiche Kissen', '2', '4');


INSERT INTO `bookingrequest` (`reqId`, `bookingRequestDate`, `amountPeople`, `price`, `Room_roomNo`, `Customer_customerID`) VALUES 
(2, '2021-05-24 08:38:25', '14', '120', '4', '2'),
(3, '2021-05-24 08:39:27', '9', '245', '2', '3');

