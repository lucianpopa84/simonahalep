-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Gazdă: 127.0.0.1
-- Timp de generare: feb. 22, 2019 la 11:11 AM
-- Versiune server: 10.1.38-MariaDB
-- Versiune PHP: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Bază de date: `simonahalep`
--

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `adminusers`
--

CREATE TABLE `adminusers` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `validated` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Eliminarea datelor din tabel `adminusers`
--

INSERT INTO `adminusers` (`id`, `username`, `password`, `validated`) VALUES
(4, 'mugur', '$2a$08$FHcEfftOXUkRsUkQrZNTWOSYVm/6aEhUtsDA43/aeButoQYabDaA2', 1),
(3, 'mugur2', '$2a$08$82FIYSQn6g0KINGd4BU0euQa9QknA8F9/8tLBWobUL3wCT1uVcDo6', 1),
(5, 'lucian', '$2a$08$7Wqf5v41jkJfEEmhyT5UEOjA9OS6S1RwmJ7p4j5iPEYYW55tuKzQK', 1),
(6, 'madalina', '$2a$08$v1nDsi16MMHyGSQSd96fWeO0Ocwa3renvSTjh9nZ.Bq0cICe4oRvO', 1),
(7, 'sergiu', '$2a$08$WRxVHbEoSU0ppILbFsmFdOyynNQLFBZcMAdj91t3TkF/ngrkYJmVi', 1);

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `biography`
--

CREATE TABLE `biography` (
  `id` int(11) NOT NULL,
  `status` enum('visible','not visible') NOT NULL DEFAULT 'not visible',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_roman_ci NOT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_roman_ci NOT NULL,
  `date` date NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Eliminarea datelor din tabel `biography`
--

INSERT INTO `biography` (`id`, `status`, `title`, `description`, `date`) VALUES
(1, 'visible', 'Copilărie', 'Simona Halep s-a născut pe 27 septembrie 1991 la Constanţa, într-o familie de aromâni. Ea a copilărit  într-o casă modestă, din Piaţa Chiliei, pe care părinţii ei, Stere şi Stania au cumpărat-o în anul 1990. Vacanţele şi le petrecea uneori la bunicii săi, din partea tatălui, la Stejaru, judeţul Tulcea. Bunica, pe care o cheamă tot Simona, Halep senior respectând tradiţia aromânilor şi punând copiilor numele prinţilor, îşi aminteşte cu mare drag de copilăria nepoţicii Simona: „O chemam la masă să mănânce, dar nu voia. Se mai certa cu verii ei mai mari, că se băga în joaca lor, dar tot nu se lăsa“. Bunicii Simonei s-au născut în Grecia, după care au ajuns în Bulgaria, de unde au fost deportaţi în localitatea Stejaru, din Tulcea. Acolo, părinţii lor au pus la cale căsătoria. S-au plăcut de cum s-au văzut. El avea 18 ani şi ea 19 atunci când s-au căsătorit în anul 1954. După trei ani a venit pe lume Zoiţa, apoi Cheraţa. Au urmat apoi doi băieţi: Stere (tatăl Simonei) şi Iancu. Stere a ţinut neapărat să-şi aducă la Constanţa şi părinţii. Aşa se face că în anul 1995 s-au mutat şi ei la Constanţa, la o casă distanţă de casa fiului lor. Acum, când e plecată familia Halep, bunicii au grijă de casă. Împreună cu ei locuieşte fratele lui Stere, Iancu, dar şi nepoţii. ', '1991-09-27'),
(3, 'visible', 'Scoala primara', 'Simona a început studiul la Şcoala Gimnazială nr. 30, din Constanţa. Acolo,  la intrare, pe panoul pe care sunt expuse rezultate notabile ale elevilor, indiferent de disciplină, stă, la loc de cinste, o poză cu Simona Halep. ”Este mândria noastră”, a declarat directorul şcolii, Aneta Dragnea, cea care i-a fost Simonei profesor de religie şi de educaţie civică.”Îmi amintesc şi acum când intram în clasă şi îi vedeam direct ochii mari. Sătea în a treia bancă de pe rândul de la mijloc şi primele lucruri pe care le remarcam când intram la oră erau faţa ei şi ochii expresivi. Era cuminte, uneori poate prea cuminte pentru un copil la acea vârstă, dar ea de mică îşi consuma toată energia concentrându-se la tenis”, a povestit doamna Dragnea.\r\n', '2006-07-01'),
(20, 'visible', 'La varsta de 4 ani s-a apucat de tenis', 'Antrenorul fratelui sau a pus ochii imediat pe fetiţa de patru ani şi puţin. „Avea ţinută de sportivă de mică. Am văzut-o şi le-am spus părinţilor: «O iau la tenis». Mi-a plăcut mult. Avea o motricitate extraordinară. La cinci ani, alerga precum o sportivă, deşi era cât racheta de mică. Promitea mult”, povesteşte Ioan Stan. Acesta a lucrat doi ani cu Simona, la Club „Castel” din Mamaia. „La început, pregătirea nu a fost foarte intensă, două - trei antrenamente pe săptămână, întrucât era foarte mică. Nu am ajuns cu ea la concursuri, că nici nu erau întreceri pentru vârsta ei. Am încercat să-i transmit totul într-o manieră frontală. Am vrut să ştie tot. Am lucrat cu ea toate elementele. Era o fetiţă harnică, modestă, talentată şi inteligentă. Avea o inteligenţă nativă. Nu i-am zis de două ori că trebuie să strângă mingile. Era harnică şi conştiincioasă. Nici nu mai întorceam capul, pentru că ştiam că ea îşi vede de treabă. Avea o îndemânare aparte. Alerga, sărea, aprecia corect loviturile şi avea imaginaţie în joc. Se vedea limpede că e un copil cu chemare pentru sport în general şi pentru tenis în special”, îşi aminteşte primul antrenor al Simonei Halep. ', '1995-09-24'),
(18, 'visible', 'Facultatea', 'În 2014 și-a luat licența la Facultatea de Educație Fizică și Sport a Universității „Ovidius” din Constanța.[5]', '2014-06-15'),
(21, 'visible', 'Liceul', ' Între anii 2006 și 2010, Simona Halep a fost eleva Liceului cu Program Sportiv „Nicolae Rotaru” din Constanța.[4]\r\n', '2010-09-15');

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `content` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Eliminarea datelor din tabel `comments`
--

INSERT INTO `comments` (`id`, `userId`, `time`, `content`) VALUES
(1, 8, '2019-02-21 15:00:13', 'Primul comentariu despre Simona'),
(2, 8, '2019-02-21 15:10:46', 'al doilea cometariu'),
(31, 4, '2019-02-22 09:41:40', 'comentariu de sters');

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `competitions`
--

CREATE TABLE `competitions` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `name` varchar(50) NOT NULL,
  `location` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Eliminarea datelor din tabel `competitions`
--

INSERT INTO `competitions` (`id`, `date`, `name`, `location`) VALUES
(2, '2019-06-01', 'Craiova', 'craiova, romania'),
(3, '2019-06-05', 'undefined', 'craiova, romania'),
(4, '2019-06-10', 'Craiova', 'craiova, romania');

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `nickname` varchar(50) NOT NULL,
  `picture` varchar(255) NOT NULL,
  `sub` varchar(255) NOT NULL,
  `banned` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Eliminarea datelor din tabel `users`
--

INSERT INTO `users` (`id`, `name`, `nickname`, `picture`, `sub`, `banned`) VALUES
(8, 'mugurel serban', 'mugur.serban2012', 'https://lh6.googleusercontent.com/-EUv5gMWli94/AAAAAAAAAAI/AAAAAAAAAAA/ACevoQP5x83OqdPxhneDPPuCkYqwmQXpHQ/mo/photo.jpg', 'google-oauth2|106682227812133893636', 0),
(4, 'fictiv', 'nicky', '', '', 1);

--
-- Indexuri pentru tabele eliminate
--

--
-- Indexuri pentru tabele `adminusers`
--
ALTER TABLE `adminusers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexuri pentru tabele `biography`
--
ALTER TABLE `biography`
  ADD PRIMARY KEY (`id`);

--
-- Indexuri pentru tabele `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexuri pentru tabele `competitions`
--
ALTER TABLE `competitions`
  ADD PRIMARY KEY (`id`);

--
-- Indexuri pentru tabele `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sub` (`sub`);

--
-- AUTO_INCREMENT pentru tabele eliminate
--

--
-- AUTO_INCREMENT pentru tabele `adminusers`
--
ALTER TABLE `adminusers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pentru tabele `biography`
--
ALTER TABLE `biography`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT pentru tabele `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT pentru tabele `competitions`
--
ALTER TABLE `competitions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pentru tabele `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
