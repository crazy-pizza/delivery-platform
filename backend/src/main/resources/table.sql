/*
 Navicat Premium Data Transfer

 Source Server         : mysql-local
 Source Server Type    : MySQL
 Source Server Version : 50724
 Source Host           : localhost:3306
 Source Schema         : delivery

 Target Server Type    : MySQL
 Target Server Version : 50724
 File Encoding         : 65001

 Date: 17/05/2020 15:39:29
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP DATABASE delivery;
CREATE DATABASE delivery;
USE delivery;
-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `commentID` bigint(20) NOT NULL AUTO_INCREMENT,
  `userID` bigint(20) NOT NULL DEFAULT '0',
  `orderID` bigint(20) NOT NULL DEFAULT '0',
  `imagePath` varchar(300) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `createTime` bigint(20) NOT NULL DEFAULT '0',
  `content` varchar(300) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `star` decimal(10,8) NOT NULL DEFAULT '0.00000000',
  `merchantID` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`commentID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Table structure for food
-- ----------------------------
DROP TABLE IF EXISTS `food`;
CREATE TABLE `food` (
  `foodID` bigint(20) NOT NULL AUTO_INCREMENT,
  `foodName` varchar(200) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `imagePath` varchar(200) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `foodDesc` varchar(200) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `foodPrice` decimal(20,8) NOT NULL DEFAULT '0.00000000',
  `balance` decimal(20,8) NOT NULL DEFAULT '0.00000000',
  `merchantID` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`foodID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Table structure for memcon
-- ----------------------------
DROP TABLE IF EXISTS `memcon`;
CREATE TABLE `memcon` (
  `memconID` bigint(20) NOT NULL AUTO_INCREMENT,
  `from` bigint(20) DEFAULT NULL,
  `to` bigint(20) DEFAULT NULL,
  `content` varchar(200) CHARACTER SET utf8mb4 DEFAULT '',
  `createTime` bigint(20) DEFAULT NULL,
  `sessionKey` varchar(20) CHARACTER SET utf8mb4 DEFAULT '',
  PRIMARY KEY (`memconID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `orderID` bigint(20) NOT NULL AUTO_INCREMENT,
  `orderNo` varchar(20) COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `orderStatus` tinyint(5) NOT NULL,
  `userID` bigint(20) NOT NULL DEFAULT '0',
  `remark` varchar(300) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `merchantID` bigint(20) NOT NULL,
  `totalAmount` decimal(20,8) NOT NULL DEFAULT '0.00000000',
  `createTime` bigint(20) DEFAULT NULL,
  `userAddress` varchar(500) CHARACTER SET utf8mb4 DEFAULT '',
  `merchantAddress` varchar(500) CHARACTER SET utf8mb4 DEFAULT '',
  PRIMARY KEY (`orderID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Table structure for order_detail
-- ----------------------------
DROP TABLE IF EXISTS `order_detail`;
CREATE TABLE `order_detail` (
  `detailID` bigint(20) NOT NULL AUTO_INCREMENT,
  `foodID` bigint(20) DEFAULT NULL,
  `orderID` bigint(20) DEFAULT NULL,
  `foodNum` bigint(10) DEFAULT NULL,
  `foodName` varchar(20) CHARACTER SET utf8mb4 DEFAULT '',
  `foodDesc` varchar(300) CHARACTER SET utf8mb4 DEFAULT '',
  `foodPrice` decimal(20,8) DEFAULT NULL,
  `foodImagePath` varchar(100) CHARACTER SET utf8mb4 DEFAULT NULL,
  PRIMARY KEY (`detailID`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userID` bigint(20) NOT NULL AUTO_INCREMENT,
  `userName` varchar(20) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `password` varchar(100) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `role` tinyint(4) NOT NULL DEFAULT '3',
  `headImage` varchar(100) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `isActive` tinyint(4) NOT NULL DEFAULT '1',
  `shopName` varchar(20) CHARACTER SET utf8mb4 DEFAULT '',
  `shopDesc` varchar(20) CHARACTER SET utf8mb4 DEFAULT '',
  `address` varchar(500) CHARACTER SET utf8mb4 DEFAULT '',
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

SET FOREIGN_KEY_CHECKS = 1;
