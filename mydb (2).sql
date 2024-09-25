-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 23, 2024 at 11:21 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mydb`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_create_employee` (IN `name` VARCHAR(255), IN `position` VARCHAR(255), IN `status` VARCHAR(255))   BEGIN
  INSERT INTO employees (name, position, status) VALUES (name, position, status);
SELECT id,name,position,status FROM employees;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getall` ()   BEGIN
  SELECT * FROM employees;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_all_active_employees` ()   BEGIN
  SELECT id,name,position,status FROM employees WHERE status = 'active';

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_all_employees` ()   BEGIN
    SELECT id,name,position,status FROM employees;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_all_inactive_employees` ()   BEGIN
  SELECT id,name,position,status FROM employees WHERE status = 'inactive';

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_employee` (IN `emp_id` INT)   BEGIN
  SELECT id,name,position,status FROM employees WHERE id = emp_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_employee` (IN `emp_id` INT, IN `name` VARCHAR(255), IN `position` VARCHAR(255))   BEGIN

  UPDATE employees
  SET 
    name = IF(name IS NOT NULL AND name != '', name, name),
    position = IF(position IS NOT NULL AND position != '', position, position)
  WHERE id = emp_id;
  
  SELECT id,name,position,status FROM employees WHERE id = emp_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_employee_status` (IN `emp_id` INT, IN `new_status` ENUM('active','inactive'))   BEGIN

    UPDATE employees SET status = new_status WHERE id = emp_id;

    SELECT id,name,position,status FROM employees WHERE id = emp_id;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'inactive',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `name`, `position`, `status`, `created_at`, `updated_at`) VALUES
(1, 'John Doe', 'Senior Developer', 'inactive', '2024-09-23 07:28:19', '2024-09-23 08:43:19'),
(2, 'John sadasd', 'Senior Developer', 'active', '2024-09-23 08:37:00', '2024-09-23 08:37:00'),
(3, 'John sdasdsad', 'Senior dasdsadsa', 'active', '2024-09-23 08:37:39', '2024-09-23 08:37:39'),
(4, 'jame duran', 'sdkaljsjkdsad', 'active', '2024-09-23 09:15:40', '2024-09-23 09:15:40'),
(5, 'jame duran', 'sdkaljsjkdsad', 'active', '2024-09-23 09:17:25', '2024-09-23 09:17:25'),
(6, 'jame duran', 'dsadsd', 'active', '2024-09-23 09:17:32', '2024-09-23 09:17:32'),
(7, 'jame duran', 'dsadsd', 'active', '2024-09-23 09:20:46', '2024-09-23 09:20:46');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
