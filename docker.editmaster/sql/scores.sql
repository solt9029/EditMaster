CREATE TABLE IF NOT EXISTS `scores` (
`id` int(10) NOT NULL,
  `username` varchar(20) NOT NULL,
  `comment` varchar(140) NOT NULL,
  `date` date NOT NULL,
  `videoid` varchar(60) NOT NULL,
  `bpm` float NOT NULL,
  `offset` float NOT NULL,
  `nums` longtext NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=26 ;

ALTER TABLE `scores`
 ADD PRIMARY KEY (`id`);

ALTER TABLE `scores`
MODIFY `id` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=26;