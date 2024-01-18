--
-- PostgreSQL database dump
--

-- Dumped from database version 14.10 (Ubuntu 14.10-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.10 (Ubuntu 14.10-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: banned_emails; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.banned_emails (id, email, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.users (user_id, first_name, last_name, username, email, password, security_question, answer, tooltips, is_admin, created_at, updated_at, avatar, bio, verification_token, is_email_verified, map_center, user_zoom, view_count) FROM stdin;
27	julia	julia	julia	julia@julia.com	$2a$10$SLg/wx/vuLa4GMUipzztU.6hUrG9i1cH7/SxH3.H3XxJoR2naWihe	What is the name of your first pet?	$2a$10$W8Lt.ARb.oO8jYDGXV.ujOG2cG4jwHz41YXs8KsiuIGBE4./M6vva	t	f	2023-11-21 14:40:38.047-06	2023-12-07 13:15:25.004-06	https://www.kbr.be/wp-content/uploads/2019/03/ms_10777_58r_miniatuur.jpg		\N	t	{49,12}	4	0
30	lenny	lenny	lenny	lenny@lenny.com	$2a$10$xT.snWN1vU4scFNMmh2Tq.Cb/aIt27x5F4vYm99Tf4jBqBL1v8BF6	What is the name of your first pet?	$2a$10$7bqkged0knpWg/5uT.tds.Yg/o2PFdDdjmYml.a3RZ34o8hKllIPG	t	f	2023-11-21 14:41:49.442-06	2023-12-07 13:26:43.192-06	https://www.facsimilefinder.com/articles/wp-conten…/2013/10/thumb_1000_600_102_06-e1382696371946.jpg		\N	t	{49,12}	4	0
35	kebab2	kebab2	kebab2	kebab2@kebab2.com	$2a$10$VWWBDZz3dpUxNGQqwsPnkuRiiGCKt5fo82cTXXmJ5IbQcjiDh8QNe	What is the name of your first pet?	$2a$10$tgj1kS5z4kwTQEq.u938ee/G45W99n/ixsN7Mv4ArXUbs0zjEky/2	t	f	2023-11-26 23:58:43.749-06	2023-12-07 13:27:19.91-06	https://i.pinimg.com/564x/4e/a8/2e/4ea82e0682606727251a4c2d61caa4b9.jpg		\N	t	{49,12}	4	0
19	Tip	Tip	Tip	Tip@Tip.com	$2a$10$7BCiwS2WpP8KG5qCjBNgveByI2MHKQ1VrarBI6nxDY05iOLpdHUPK	What is the name of your first pet?	$2a$10$HFU.Oe6u6p5liAXvcTtl2.TF.JI4rtneN3FjiAX/FpA9dNIh1ULl6	t	f	2023-11-17 05:21:54.915-06	2023-12-07 13:28:25.538-06	https://upload.wikimedia.org/wikipedia/commons/6/6d/Chigi_codex.jpg		\N	t	{49,12}	4	0
123	Zelda	Zelda	Zelda	motiviquestudio@gmail.com	$2a$10$a4TTan2mMGPs3sNYMZuZUuN2ulWHzSKqBX9AqZB0Nq8Xq4FCinS/a	What is the name of your first pet?	$2a$10$tt4eKwNOQcoUKbClFZJjfuZFaFmxoUQgswi0L.Wx1NVGlaR8eaVoO	t	f	2023-12-06 23:30:06.684-06	2023-12-11 23:04:50.86-06	https://c8.alamy.com/comp/MW85MM/english-armoured-…rovoke-that-dwell-in-sepulchres-36-god-MW85MM.jpg		\N	t	{49,12}	4	1
120	inky	inky	inky	inky@inky.com	$2a$10$TjftUPuSkoBZA0NDFZqpKuFdPal6.JiQ6AicwE6W1MxnH3pgfex3e	What is the name of your first pet?	$2a$10$zN31PNvwZTZwqOiD4HLcm.R2GiOOAO.wvhJKDvIkIrrI/QO0poUCW	t	f	2023-12-03 01:36:14.031-06	2023-12-13 10:20:24.59-06	https://live.staticflickr.com/3557/3449041959_1bd9b05ac8_c.jpg		\N	t	{49,12}	4	32
43	bumble	bumble	bumble	bumble@bumble.com	$2a$10$N4r.e84ByCUmgC.CBgit9OgPfbD8f0PYVFMnK8DW2lllbBYltWGC6	What is the name of your first pet?	$2a$10$VnAXqNKqiz38eVJtrwTl9OFXQD25adLbDQFW.dPuc5./TWLgdUu0S	t	f	2023-11-30 23:00:08.095-06	2023-12-12 07:38:07.273-06	https://live.staticflickr.com/3557/3449041959_1bd9b05ac8_c.jpg		e6de2c4194d124e4f8be74233ad2dc309104416b9c58f149d115aa9d1aebe77e	t	{49,12}	4	1
42	gavin	gavin	gavin	gavin@gavin.com	$2a$10$zSsDYc6JLFI1IiYk41ENA.tjWRaGZqWoJWNkDY9UQ5rMjxsSYJCRi	What is the name of your first pet?	$2a$10$Bb7VfYyJa2TtJyErIe3kD./dhFbcRtzugRUrEzJmDhhhxLtBhz9z6	t	f	2023-11-30 22:56:03.092-06	2023-12-12 07:46:18.033-06	\thttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6DfhbCrWOZjLlaglTulQv6nofeziYvBtQzA&usqp=CAU		f0f23710260b60bf289cb21d9b3bb552c8c435a33214f31894e6d921ba8de79f	t	{49,12}	4	1
20	johnnyboy	johnnyboy	johnnyboy	johnnyboy@johnnyboy.com	$2a$10$R0iCt4DdpR/5T6/WjrPVn.NG2Q6AA5uXZpP6zMdBA2G0rnWbtnw0W	What is the name of your first pet?	$2a$10$3wTkgHvB.HC.2ccIQwYaY.Wr4uaDT90boiB.FUwLnF99xmNv1d31S	t	f	2023-11-19 06:40:23.9-06	2023-12-12 07:38:33.982-06	https://ica.themorgan.org/icaimages/3/g32.107va.jpg		\N	t	{49,12}	4	1
21	Blorko	Blorko	Blorko	Blorko@Blorko.com	$2a$10$D9bpdf7j5/tw.dHigf73fOfPQn8ccjCiHV5qnDIkkCVJ6QkjvcgA6	What is the name of your first pet?	$2a$10$HQy2fALE2u7ieZvApQ.hiuDLjdERtG22THPO1rogWkR9axb3TpNcS	t	f	2023-11-19 20:29:58.382-06	2023-12-12 07:46:26.684-06	https://photos1.blogger.com/blogger/1717/1584/1600/seite_1v.jpg		\N	t	{49,12}	4	1
124	pappy	pappy	pappy	motiviquestudio@gmail.com	$2a$10$Jhryeykol0lfFh3UX9M9WuMgQFUP4iXmLPsPXakCzsAWL0WO/oT7C	What is the name of your first pet?	plunk	t	f	2023-12-12 00:03:34.993-06	2023-12-12 08:42:33.993-06	https://live.staticflickr.com/3557/3449041959_1bd9b05ac8_c.jpg	aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa	\N	t	{49,12}	4	3
4	jay	jay	jay	jay@jay.com	$2a$10$DGqCj4.eyOoSJDAVjmX7hOwgTielv9J21icq3BBqEMmk6haggfZN.	What is the name of your first pet?	$2a$10$eB6YtT5uM9LUT2fzjdE1seRoSVPrsAiUXbcbf5o995GDYOC0dw0AS	t	f	2023-11-14 02:05:14.52-06	2023-12-26 03:00:41.165-06	https://ica.themorgan.org/icaimages/1/m158.003rb.jpg		\N	t	{49,12}	4	11
126	tomm	tomm	tomm	tom@tom.com	$2a$10$.AQr8ySzr35e7WKaig3rEeAKyrwsqgyNXSxwmNt/dSK12iC3YMUr.	What is the name of your first pet?	$2a$10$z8617GfYy.YiidTC2HOI7eF8Exb5c82H6rDLbwe73VfODbaVDsmgu	t	f	2023-12-15 00:45:49.701-06	2023-12-15 00:45:49.701-06	https://live.staticflickr.com/3557/3449041959_1bd9b05ac8_c.jpg		8f27e255d456a264fb12abefe01e1a7ad2bbf58495d6769f3d221a56e46c38ec	f	{49,12}	4	0
127	Bomm	Bomm	Bomm	tomm@tomm.com	$2a$10$t4xOlcAaklshQQiciyj8J.Y7Y2J0rqbPRglQtSO7GQnxOppWXvvPG	What is the name of your first pet?	$2a$10$DgaJbFzAmsIskB.68StenuJSw9FBfVNNmcXOcKJ8l1.Lk.H3B52ea	t	f	2023-12-15 00:47:20.47-06	2023-12-15 00:47:20.471-06	https://live.staticflickr.com/3557/3449041959_1bd9b05ac8_c.jpg		e0b0a6ac7d73e2c33388848743ab86aab7e244af4e5ce093fdef88d07466625f	f	{49,12}	4	0
125	tommyg	tommyg	tommyg		$2a$10$cL21N.1F51kaWG3HNpZAJ.LNLKVdIntMNBtatG3Njecp2cTsU.n/.	What is the name of your first pet?	$2a$10$iMaB/4R0LNyhf.XRxUFsiOEb1JYlH9aXNBaRhUG1O9XvHSMC4R4YO	t	f	2023-12-14 19:13:27.007-06	2024-01-10 14:26:16.819-06	https://c8.alamy.com/comp/H9P813/miniature-15th-century-view-of-london-H9P813.jpg	Hiya	\N	t	{49,12}	4	1
121	Henry	Henry	Henry	motiviquestudio@gmail.com	$2a$10$IU0p/fbGmvTEPixKnwzYiujK0kKFo5y/fyVNn.AQvjXHWfO9NLZpy	What is the name of your first pet?	$2a$10$tQ3J4f9xuBhl0hH8cwpJjeb4hd0qRNFX3Rn/1fMC3qMyGMxPC1dI6	t	t	2023-12-04 16:14:57.457-06	2024-01-12 23:13:51.826-06	https://i.pinimg.com/736x/5f/79/40/5f794000567bba677659cbfee87dc00b.jpg		\N	t	{49,12}	4	4
128	boom	boom	boom	boom@boom.com	$2a$10$H6d7EgqinNxRFEgnhpcf7uLsiPJ/fR80XwtyE2BxYiSHf9TdauZRC	What is the name of your first pet?	$2a$10$RDW3azIewOlHdDG7b0LzhuV0ugSFhjVrxPQ4i1jB/HQLFSz2T7QHG	t	f	2023-12-15 00:48:00.835-06	2023-12-15 00:48:00.835-06	https://live.staticflickr.com/3557/3449041959_1bd9b05ac8_c.jpg		ec64be6e053bb560d195b3a7a9f198dd957b9859c4d8fd1c7406c91cd2f62b76	f	{49,12}	4	0
129	boomm	boomm	boomm	boomy@boomy.com	$2a$10$HEYVS67mX11Kscq7t0BqIeKFQMNe0b5gUgUebf7XwO13nc5Xyt.66	What is the name of your first pet?	$2a$10$cY1kgWyuXJmy679vLqmy3efIZB4u1hhPnynbvV9.wGfH52kz.S5hq	t	f	2023-12-15 00:54:40.048-06	2024-01-08 01:07:41.989-06	https://live.staticflickr.com/3557/3449041959_1bd9b05ac8_c.jpg		57a161daea35bbc776fd532204cc316431d232ce68ae9b3c4a530b18ac2f2efa	f	{49,12}	4	4
25	kebab	kebab	kebab	kebab@kebab.com	$2a$10$chLoSKYqP44VAmD4Mcx7Q.yimASVJfQdLhrgffShtUbXuOSsKYOeK	What is the name of your first pet?	$2a$10$lRs2xfbzItpSMxbk.2kHH.v4MVTkhLg4vA56TdtJJxXAh.sWVG7qa	t	f	2023-11-20 02:06:44.203-06	2023-12-17 22:04:02.973-06	https://ica.themorgan.org/icaimages/1/m158.003ra.jpg		\N	t	{49,12}	4	12
122	Michael	Michael	Michael	motiviquestudio@gmail.com	$2a$10$O0jPYTlmoRzhnHq6q6xMSOdMkMutW/D0zOqOebuKoByw3aV5EWe9W	What is your mother's maiden name?	$2a$10$bN3EcVfvD2saFHLtG7aw.OnGKwo2bCz91rjMFUaCheh1L/2jAibgq	t	t	2023-12-06 09:16:37.879-06	2024-01-12 22:54:19.313-06	https://c8.alamy.com/comp/D9DBM6/the-trs-riches-he…e-berry-is-a-french-gothic-illuminated-D9DBM6.jpg		\N	t	{49,12}	4	23
17	eva	eva	eva	eva@eva.com	$2a$10$KUbyPn0X2Krdp6rcPnzvE.eIix3tJtBKld35HApC.rwqSrkbM.IJK	What is the name of your first pet?	$2a$10$AJ5RLfK.bC3wqkO3T503geOjZ0y8wpSfqfiIQ82zI2EiQPIxen/rG	t	f	2023-11-15 02:50:36.741-06	2024-01-10 02:23:04.729-06	https://i.pinimg.com/474x/2e/f8/fd/2ef8fd650ee4dc6ea64731c453550110.jpg		\N	t	{49,12}	4	6
10	tom	tom	tom	tom@tom.com	$2a$10$P6fgo7jix95za30MB9kZxumgZQwJlotgBCSh7qjwoHsJTTOTz0Qr.	What is the worst Star Wars film?	$2a$10$0EeB6rk0s9s41KPOrHRy5.bN3oltMxQv4pO8zWf9ggJVaxnNOlvvK	t	f	2023-11-14 04:34:44.356-06	2024-01-12 23:01:27.473-06	https://i.pinimg.com/236x/b6/11/7e/b6117ef3bca0422462419206aa2b0804.jpg	hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya hiya BYYYY	\N	t	{49.24485882196211,15.113454263731}	3	172
18	henry	henry	henry	henry@henry.com	$2a$10$nmN8ukriLZrU2pzVYM.Zt.AftpIO.rqIBeyhZuIsoZvVWRQpV2aAG	What is the name of your first pet?	$2a$10$SBHOe0TQLgSCB.AB4f6yu.gXa7uF5XuOVr1rIyp6DNwWm8NVEsXMa	t	f	2023-11-15 03:29:21.396-06	2024-01-12 23:07:58.799-06	https://live.staticflickr.com/3557/3449041959_1bd9b05ac8_c.jpg		\N	t	{49,12}	4	2
\.


--
-- Data for Name: blocks; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.blocks (block_id, blocker_id, blocked_id, created_at, updated_at) FROM stdin;
7	10	17	2023-12-04 02:19:58.883-06	2023-12-04 02:19:58.883-06
8	25	121	2023-12-05 20:40:33.768-06	2023-12-05 20:40:33.768-06
9	121	122	2023-12-11 01:34:07.741-06	2023-12-11 01:34:07.741-06
10	124	4	2023-12-12 07:34:21.762-06	2023-12-12 07:34:21.762-06
11	124	18	2023-12-12 07:37:53.5-06	2023-12-12 07:37:53.5-06
12	124	121	2023-12-12 07:37:59.23-06	2023-12-12 07:37:59.23-06
13	124	43	2023-12-12 07:38:09.685-06	2023-12-12 07:38:09.685-06
14	124	120	2023-12-12 07:38:15.639-06	2023-12-12 07:38:15.639-06
15	124	17	2023-12-12 07:38:28.101-06	2023-12-12 07:38:28.101-06
16	124	20	2023-12-12 07:38:36.015-06	2023-12-12 07:38:36.015-06
17	124	42	2023-12-12 07:46:21.104-06	2023-12-12 07:46:21.104-06
18	124	21	2023-12-12 07:46:30.018-06	2023-12-12 07:46:30.018-06
\.


--
-- Data for Name: trips; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.trips (trip_id, user_id, username, title, description, tripentry, date_of_departure, date_of_return, image_url, latitude, longitude, trip_zoom, is_private, have_visited, view_count, created_at, updated_at) FROM stdin;
35	10	tom	asdf	\N	\N	2222-02-22	2222-02-22	https://s3-media3.fl.yelpcdn.com/bphoto/rNxgXaaS7OScgb1e3rTy3w/o.jpg	52.0663	-5.2154	4	f	f	0	2023-11-30 02:26:58.057-06	2023-12-04 01:31:34.143-06
43	17	eva	Irish Cathedrals	\N	"<p>How beautiful they are!</p>"	2020-12-04	2020-12-10	https://s3-media2.fl.yelpcdn.com/bphoto/ev6cjws8NGar3ASmoS6P0A/o.jpg	52.9981	-6.7644	4	f	t	0	2023-12-06 23:29:15.211-06	2023-12-07 14:44:37.652-06
19	10	tom	Proximity Test	\N	"<p>Hey hey</p>"	2020-10-10	2020-10-10	https://live.staticflickr.com/65535/50799916446_8118f00fab_k.jpg	50.0870210643148	14.4207134534138	4	f	f	15	2023-11-29 00:55:53.031-06	2023-12-08 13:45:01.56-06
47	17	eva	Franchy	\N	\N	2016-12-08	2016-12-20	https://s3-media1.fl.yelpcdn.com/bphoto/jMTNGaTOuFizWm_ZSyG40A/o.jpg	47.3318	0.73	4	f	f	5	2023-12-07 03:37:55.484-06	2023-12-13 14:04:02.421-06
46	122	Michael	Engaland	\N	"<p>hey ho holiday</p>"	2020-12-01	2020-12-14	https://s3-media3.fl.yelpcdn.com/bphoto/p-_BjzdhFRBvlDw9kbe0dg/o.jpg	51.5037	-0.1123	4	f	f	3	2023-12-07 03:35:56.769-06	2024-01-08 23:11:22.823-06
48	10	tom	Germaaaan	\N	\N	2010-12-01	2010-12-30	https://s3-media1.fl.yelpcdn.com/bphoto/VPRK_MaH882IAe9LNxCsPw/o.jpg	50.0384	12.0755	4	f	f	37	2023-12-07 15:47:45.592-06	2023-12-23 01:07:15.249-06
18	10	tom	Germany	\N	\N	2020-03-03	2020-07-07	https://s3-media3.fl.yelpcdn.com/bphoto/SJiYyQErXdbMwfKljDA-zw/o.jpg	51.9291	-2.4028	4	f	t	18	2023-11-28 16:03:56.92-06	2023-12-25 03:53:48.067-06
49	10	tom	Just checkin'	\N	"<p>hwhat the hhellhwhat the hhellhwhat the hhellhwhat the hhellhwhat the hhellhwhat the hhellhwhat the hhellhwhat the hhellhwhat the hhellhwhat the hhellhwhat the hhellhwhat the hhellhwhat the hhellhwhat the hhellhwhat the hhellhwhat the hhellhwhat the hhellhwhat the hhellhwhat the hhellhwhat the hhellhwhat the hhellhwhat the hhellhwhat the hhell</p>"	2005-05-05	2005-05-06	https://s3-media3.fl.yelpcdn.com/bphoto/p-_BjzdhFRBvlDw9kbe0dg/o.jpg	51.6969	-4.3037	4	f	t	13	2023-12-08 04:12:19.754-06	2023-12-25 03:06:34.46-06
42	4	jay	Got it?	\N	"<p>asd;lkajsdf;lakdsjfkasd;lkajsdf;lakdsjfkasd;lkajsdf;lakdsjfkasd;lkajsdf;lakdsjfkasd;lkajsdf;lakdsjfkasd;lkajsdf;lakdsjfkasd;lkajsdf;lakdsjfkasd;lkajsdf;lakdsjfkasd;lkajsdf;lakdsjfkasd;lkajsdf;lakdsjfkasd;lkajsdf;lakdsjfkasd;lkajsdf;lakdsjfkasd;lkajsdf;lakdsjfkasd;lkajsdf;lakdsjfkasd;lkajsdf;lakdsjfkasd;lkajsdf;lakdsjfkasd;lkajsdf;lakdsjfkasd;lkajsdf;lakdsjfkasd;lkajsdf;lakdsjfkasd;lkajsdf;lakdsjfkasd;lkajsdf;lakdsjfk</p>"	2012-12-01	2012-12-20	https://s3-media4.fl.yelpcdn.com/bphoto/yN2YHF5-zlZ2lR_xLQCz6Q/o.jpg	53.3596	-7.6107	7	f	f	30	2023-12-04 09:08:28.158-06	2023-12-25 03:33:04.615-06
39	10	tom	asdf	\N	"<p>47</p>"	1212-12-12	1212-12-12	https://s3-media1.fl.yelpcdn.com/bphoto/dHubgSWXWzNqrSrTvZ1Cwg/o.jpg	49.205	11.694	4	f	f	1	2023-11-30 04:17:11.024-06	2023-12-24 00:54:10.645-06
50	25	kebab	Spain!	\N	"<p>Hey there! Count me!</p>"	1212-12-11	1212-12-13	https://s3-media1.fl.yelpcdn.com/bphoto/0Kc5xaSDHG5ik2VNW_C5iA/o.jpg	42.1428	-3.1851	4	f	t	24	2023-12-13 11:16:58.168-06	2023-12-25 03:16:22.327-06
32	10	tom	tom	\N	\N	1010-10-10	1020-10-10	https://s3-media3.fl.yelpcdn.com/bphoto/Jk9w8gt-pBQeO337JM5bpw/o.jpg	50.8842	1.4013	4	f	f	3	2023-11-30 01:58:44.336-06	2023-12-24 02:07:49.096-06
15	10	tom	Eurofun	\N	"<p>Funky 😀</p>"	1212-12-12	1212-12-13	https://s3-media3.fl.yelpcdn.com/bphoto/p-_BjzdhFRBvlDw9kbe0dg/o.jpg	47.1907	-4.336	4	f	t	6	2023-11-19 00:15:04.099-06	2023-12-25 03:30:20.955-06
45	122	Michael	2 Castles (Trips need 2 entries)	\N	"<p>Hey hey</p>"	2023-12-05	2023-12-07	https://s3-media4.fl.yelpcdn.com/bphoto/yN2YHF5-zlZ2lR_xLQCz6Q/o.jpg	50.5308	-2.3237	4	f	f	170	2023-12-07 02:03:01.075-06	2023-12-25 03:55:05.215-06
51	10	tom	Tally Test	\N	\N	1212-12-12	1212-12-13	https://s3-media3.fl.yelpcdn.com/bphoto/dpXoE2fuN0f2K4l5usLw6g/o.jpg	41.7377	66.5914	4	f	t	3	2023-12-18 00:46:46.98-06	2024-01-08 02:44:09.893-06
40	10	tom	Got it?	\N	"<p>awawefawefefawef</p>"	2002-12-12	2002-12-12	https://s3-media4.fl.yelpcdn.com/bphoto/DV-wX6xTWhRiay_ts2ulsA/o.jpg	52.412	-4.7242	4	f	f	2	2023-11-30 04:18:17.174-06	2024-01-08 02:45:35.389-06
53	10	tom	and again	\N	"<p><strong><em><u>asdfasdfasdfasdf </u></em></strong><br><br></p><img src=\\"\\thttps://live.staticflickr.com/8368/8396392870_0d4a8916ae_b.jpg\\"><p></p><p>😨🤠 asdfadsf</p>"	1212-12-12	1212-12-13	https://s3-media4.fl.yelpcdn.com/bphoto/yN2YHF5-zlZ2lR_xLQCz6Q/o.jpg	46.1165	-7.7776	4	t	t	3	2023-12-18 00:51:26.369-06	2024-01-12 00:17:28.983-06
44	123	Zelda	Chateau	\N	\N	2020-12-08	2020-12-14	https://s3-media3.fl.yelpcdn.com/bphoto/XoHey5_DbLEaplymP89bNQ/o.jpg	47.4705	1.2937	4	f	f	9	2023-12-06 23:32:42.019-06	2024-01-09 15:10:42.434-06
54	122	Michael	Test	\N	\N	2022-12-12	2022-12-13	https://s3-media3.fl.yelpcdn.com/bphoto/p-_BjzdhFRBvlDw9kbe0dg/o.jpg	51.2756	6.8071	4	f	t	24443	2023-12-24 00:57:14.066-06	2024-01-12 22:54:23.155-06
52	10	tom	Test again	\N	"<p>Well hel<strong>lo!</strong></p>"	1212-12-12	1212-12-13	https://s3-media2.fl.yelpcdn.com/bphoto/Gr9vx2BFzIH2-8CavSndWA/o.jpg	45.1889	1.3083	4	f	f	74	2023-12-18 00:48:25.136-06	2024-01-12 22:54:48.438-06
17	10	tom	French Trip	\N	"<p>Hey there</p>"	2020-03-01	2020-03-10	https://s3-media3.fl.yelpcdn.com/bphoto/dpXoE2fuN0f2K4l5usLw6g/o.jpg	48.015	-0.4132	4	t	f	0	2023-11-28 15:54:40.479-06	2024-01-13 22:42:45.579-06
\.


--
-- Data for Name: travelogs; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.travelogs (travelog_id, user_id, title, username, site, country, state, city, address, phone_number, latitude, longitude, text_body, traventry, date_visited, is_private, have_visited, unesco, film_location, video_game_location, category, trip_id, view_count, created_at, updated_at) FROM stdin;
41	17	12	eva	Azay-le-Rideau	France	37	Azay-le-Rideau	37190 Azay-le-Rideau France		47.250804901123	0.473393648862839	\N	"<p>France, a country in Western Europe, boasts a diverse landscape of alpine villages, medieval cities, and Mediterranean beaches. Paris, its capital, is renowned for its fashion houses, classical art museums including the Louvre, and landmarks like the Eiffel Tower. The country is also known for its sophisticated cuisine and its wines. The ancient cave drawings at Lascaux, Lyon's Roman theater, and the vast Palace of Versailles attest to its rich history.</p><p>From the lush vineyards of Bordeaux and the sparkling waters of the French Riviera to the snow-capped peaks of the Alps and the rolling lavender fields of Provence, France offers a stunning array of natural beauty. It's a country that has inspired poets, artists, and architects for centuries.</p><p></p><img src=\\"https://live.staticflickr.com/7061/13297917303_fd3f4a5dd3_b.jpg\\"><p><br>France's influence on global culture is undeniable. It's the birthplace of cinema, home to vibrant fashion and literary scenes, and a center of gastronomic excellence. French cuisine is celebrated for its precision and flavors, with regional specialties ranging from the delectable pastries of Paris to the hearty cassoulet of Toulouse.</p><p>The French take pride in their language and culture, preserving their heritage while also embracing modernity. This balance is evident in the country's approach to life, where traditional values coexist with contemporary advancements. Education and the arts are highly valued, and the nation has produced some of the world's most influential thinkers, writers, and artists.</p><p>Politically, France is a founding member of the European Union and a key player in international affairs. It has a mixed economy, combining extensive private enterprise with substantial state enterprise and government intervention. The government retains considerable influence over key segments of infrastructure sectors, with majority ownership of railway, electricity, aircraft, nuclear power, and telecommunications.</p><p>Socially, France is known for its forward-thinking attitude towards human rights and social issues. It was among the first countries to legalize same-sex marriage and continues to be a champion of freedom of expression and human dignity.</p><p>The French lifestyle is characterized by long meals, leisurely strolls through marketplaces and city streets, and an emphasis on savoring the simple pleasures of life. This \\"joie de vivre\\" or joy of living is a defining aspect of the French ethos.</p><p>France is not without its challenges, including debates over immigration and national identity, economic reforms, and its role in the global community. Yet, these discussions take place against the backdrop of a deeply resilient and culturally rich society.</p><p>A journey through France is not just a trip through geographic regions but a voyage into the depths of culture, history, and the human psyche. It's a land that has been at the forefront of human endeavor, pushing boundaries in art, science, philosophy, and politics. France, with its enduring legacy and commitment to the future, continues to captivate and inspire the world. As one explores the cobblestone streets of small towns or the grand boulevards of major cities, it becomes evident that France's beauty lies not only in its landscape and monuments but in its spirit and its people. The French way of life, with its emphasis on quality, craftsmanship, and appreciation for the finer things, is a testament to a country that values both its past and its future. From its contributions to world cuisine and fashion to its influence on global politics and culture, France remains a key player on the world stage. Whether sipping coffee at a Parisian café, exploring the vineyards of Burgundy, or marveling at the gothic architecture of Notre-Dame, France offers an endless array of experiences that speak to the heart of what it means to be human. Its cities and countryside reveal a landscape rich in beauty and history, while its people offer a warm welcome to those who come to explore and appreciate this unique country. France, in its essence, is a celebration of life, a place where art, culture, history, and innovation merge to create a tapestry of human experience unlike any other in the world. It is a country that invites exploration and contemplation, a place where the past and present intertwine to create a rich and enduring narrativ...France, a country in Western Europe, boasts a diverse landscape of alpine villages, medieval cities, and Mediterranean beaches. Paris, its capital, is renowned for its fashion houses, classical art museums including the Louvre, and landmarks like the Eiffel Tower. The country is also known for its sophisticated cuisine and its wines. The ancient cave drawings at Lascaux, Lyon's Roman theater, and the vast Palace of Versailles attest to its rich history.</p><p></p><img src=\\"//live.staticflickr.com/65535/45859333665_a905fb6606_b.jpg \\"><p>From the lush vineyards of Bordeaux and the sparkling waters of the French Riviera to the snow-capped peaks of the Alps and the rolling lavender fields of Provence, France offers a stunning array of natural beauty. It's a country that has inspired poets, artists, and architects for centuries.</p><p>France's influence on global culture is undeniable. It's the birthplace of cinema, home to vibrant fashion and literary scenes, and a center of gastronomic excellence. French cuisine is celebrated for its precision and flavors, with regional specialties ranging from the delectable pastries of Paris to the hearty cassoulet of Toulouse.</p><p>The French take pride in their language and culture, preserving their heritage while also embracing modernity. This balance is evident in the country's approach to life, where traditional values coexist with contemporary advancements. Education and the arts are highly valued, and the nation has produced some of the world's most influential thinkers, writers, and artists.</p><p>Politically, France is a founding member of the European Union and a key player in international affairs. It has a mixed economy, combining extensive private enterprise with substantial state enterprise and government intervention. The government retains considerable influence over key segments of infrastructure sectors, with majority ownership of railway, electricity, aircraft, nuclear power, and telecommunications.</p><p>Socially, France is known for its forward-thinking attitude towards human rights and social issues. It was among the first countries to legalize same-sex marriage and continues to be a champion of freedom of expression and human dignity.</p><p>The French lifestyle is characterized by long meals, leisurely strolls through marketplaces and city streets, and an emphasis on savoring the simple pleasures of life. This \\"joie de vivre\\" or joy of living is a defining aspect of the French ethos.</p><p>France is not without its challenges, including debates over immigration and national identity, economic reforms, and its role in the global community. Yet, these discussions take place against the backdrop of a deeply resilient and culturally rich society.</p><p>A journey through France is not just a trip through geographic regions but a voyage into the depths of culture, history, and the human psyche. It's a land that has been at the forefront of human endeavor, pushing boundaries in art, science, philosophy, and politics. France, with its enduring legacy and commitment to the future, continues to captivate and inspire the world. As one explores the cobblestone streets of small towns or the grand boulevards of major cities, it becomes evident that France's beauty lies not only in its landscape and monuments but in its spirit and its people. The French way of life, with its emphasis on quality, craftsmanship, and appreciation for the finer things, is a testament to a country that values both its past and its future. From its contributions to world cuisine and fashion to its influence on global politics and culture, France remains a key player on the world stage. Whether sipping coffee at a Parisian café, exploring the vineyards of Burgundy, or marveling at the gothic architecture of Notre-Dame, France offers an endless array of experiences that speak to the heart of what it means to be human. Its cities and countryside reveal a landscape rich in beauty and history, while its people offer a warm welcome to those who come to explore and appreciate this unique country. France, in its essence, is a celebration of life, a place where art, culture, history, and innovation merge to create a tapestry of human experience unlike any other in the world. It is a country that invites exploration and contemplation, a place where the past and present intertwine to create a rich and enduring narrativ...</p>"	1212-12-12 00:00:00-05:50:36	f	t	f	\N	\N		\N	0	2023-11-23 00:00:00-06	2023-11-27 08:19:07.992-06
47	10	Warwick	tom	Warwick Castle	United Kingdom	WAR	Warwick	Castle Hill Warwick CV34 4QU United Kingdom	+44 870 442 2371	52.2820788325064	-1.5853363465576	\N	\N	2021-06-06 10:00:00-05	t	f	f		\N		18	0	2023-11-28 00:00:00-06	2023-11-28 16:03:56.95-06
55	10	Heya	tom	Malahide Castle	Ireland	D	Malahide	Malahide, Co. Dublin Republic of Ireland	+353 1 816 9538	53.445382	-6.164513	\N	"<p>asdfadsf</p>"	1212-12-12 00:12:00-05:50:36	f	t	f		\N	Castle / Fortress / Palace	40	0	2023-11-30 00:00:00-06	2023-12-04 00:14:12.557-06
50	10	Yay Styling	tom	Cardiff Castle	United Kingdom	CRF	Cardiff	Castle Street Cardiff CF10 3RB United Kingdom	+44 29 2087 8100	51.482255	-3.181187	\N	\N	2020-10-10 10:10:00-05	t	t	t	Probably	\N	Castle / Fortress / Palace	35	0	2023-11-29 00:00:00-06	2023-12-04 01:31:34.218-06
61	4	3456	jay	Galway Cathedral	Ireland	G	Galway	Gaol Roads Galway Republic of Ireland	+353 91 563 577	53.2738299	-9.05691	\N	\N	1212-12-12 10:10:00-05:50:36	f	t	f		\N		42	0	2023-12-04 00:00:00-06	2023-12-04 09:08:28.28-06
63	17	Another Cathedral	eva	St Canice's Cathedral	Ireland	KK	Kilkenny	The Close Coach Road Kilkenny Republic of Ireland	+353 56 776 4971	52.6566480149788	-7.25730021996693	\N	\N	2020-12-05 11:00:00-06	f	t	f		\N		43	0	2023-12-06 00:00:00-06	2023-12-06 23:29:15.272-06
44	10	Following the Witcher	tom	Ogrodzieniec Castle	Poland		Podzamcze			50.4513	19.519	\N	\N	2018-04-03 11:00:00-05	f	t	f	The Witcher	\N	Castle / Fortress / Palace	40	21	2023-11-28 00:00:00-06	2023-12-14 13:20:02.884-06
72	17	Franch	eva	Azay-le-Rideau	France	37	Azay-le-Rideau	37190 Azay-le-Rideau France		47.250804901123	0.473393648862839	\N	"<p>Azay! 😀</p>"	2016-12-09 09:00:00-06	f	t	f		\N		47	8	2023-12-07 03:36:36.735-06	2023-12-13 22:36:10.828-06
46	10	St Gatien	tom	Cathédrale Saint-Gatien	France	37	Tours	Place de la Cathédrale 37000 Tours France	+33 2 47 71 21 00	47.394144	0.68484	\N	\N	2020-03-04 12:00:00-06	f	f	f		\N		17	1	2023-11-28 00:00:00-06	2023-12-12 21:07:43.748-06
75	10	Dat Castle Tho	tom	Neuschwanstein Castle	Germany	BY	Schwangau	Neuschwansteinstr. 20 87645 Schwangau Germany	+49 8362 939880	47.557581	10.749793	\N	\N	2010-12-12 12:00:00-06	f	t	f		\N		48	7	2023-12-07 15:45:17.685-06	2023-12-14 00:15:14.486-06
76	10	Probably won't go back	tom	Berlin Cathedral	Germany	BE	Berlin	Am Lustgarten 10178 Berlin Germany	+49 30 20269136	52.519149145301	13.4011079662007	\N	\N	2010-12-12 14:00:00-06	f	t	f		\N		48	3	2023-12-07 15:47:16.208-06	2023-12-11 07:22:55.529-06
74	25	Sagrada!	kebab	Basílica de la Sagrada Família	Spain	B	Barcelona	Carrer de Mallorca, 401 08013 Barcelona Spain	+34 932 08 04 14	41.4035949887	2.17435520142	\N	"<p>Amazing!</p>"	2015-12-12 12:00:00-06	f	t	f		\N		50	4	2023-12-07 03:41:28.7-06	2023-12-14 00:38:05.105-06
48	10	Caerphilly	tom	Caerphilly Castle	United Kingdom	CAY	Caerphilly	Castle Street Caerphilly CF83 1JD United Kingdom	+44 29 2088 3143	51.5760715238969	-3.22019635008468	\N	\N	2020-06-16 11:00:00-05	f	f	f		\N		18	2	2023-11-28 00:00:00-06	2023-12-11 16:29:26.547-06
73	17	Amboise!	eva	Château d'Amboise	France	37	Amboise	37403 Amboise France	+33 2 47 57 00 98	47.412809	0.986522	\N	"<p>Amboisy!</p>"	2016-12-10 10:00:00-06	f	t	f		\N		47	1	2023-12-07 03:37:19.564-06	2023-12-11 09:20:22.237-06
60	4	awef	jay	Malahide Castle	Ireland	D	Malahide	Malahide, Co. Dublin Republic of Ireland	+353 1 816 9538	53.445382	-6.164513	\N	\N	1212-12-12 10:10:00-05:50:36	f	t	f		\N		42	37	2023-12-04 00:00:00-06	2023-12-11 11:32:30.646-06
80	122	I Cycled Mt. Doom!	Michael	Tongariro Alpine Crossing	New Zealand	WKO	Taupo	Taupo 3377 New Zealand		-39.2083635911966	175.545269586146	\N	\N	2023-12-11 12:00:00-06	f	t	f	The Lord of the Rings	\N		\N	1	2023-12-11 16:26:17.799-06	2023-12-11 23:02:38.524-06
71	122	Shakin spears	Michael	Shakespeare's Globe Theatre	United Kingdom	XGL	Bankside	21 New Globe Walk Bankside SE1 9DT United Kingdom	+44 20 7902 1400	51.5080696775251	-0.0972148872577918	\N	"<p>Play!</p>"	2020-12-13 11:00:00-06	f	t	f		\N		46	3	2023-12-07 03:33:42.359-06	2023-12-16 22:16:00.642-06
64	123	Chambord	Zelda	Château de Chambord	France	41	Chambord	41250 Chambord France	+33 2 54 50 40 00	47.616145099948	1.51704118720249	\N	\N	2020-12-12 10:00:00-06	f	t	f		\N		44	18	2023-12-06 00:00:00-06	2023-12-24 00:25:40.618-06
66	17	Irish Cathedrals	eva	St Canice's Cathedral	Ireland	KK	Kilkenny	The Close Coach Road Kilkenny Republic of Ireland	+353 56 776 4971	52.6566480149788	-7.25730021996693	\N	\N	2023-12-10 10:00:00-06	f	t	f		\N		\N	1	2023-12-07 00:40:07.485-06	2023-12-26 23:07:20.694-06
51	10	Ireland	tom	Kilkenny Castle	Ireland	KK	Kilkenny	The Parade Kilkenny Republic of Ireland	+353 56 770 4100	52.6504321675246	-7.2495174407959	\N	\N	2019-06-06 10:10:00-05	f	t	f		\N	Castle / Fortress / Palace	35	1	2023-11-29 00:00:00-06	2023-12-24 00:55:46.201-06
78	10	Dark Souls 2	tom	Mont Saint-Michel	France	50	Le Mont-Saint-Michel	50170 Le Mont-Saint-Michel France	+33 2 33 60 14 30	48.6359448074127	-1.51116700000004	\N	\N	2019-06-07 13:00:00-05	f	t	t		Dark Souls 2	Cathedral / Basilica	51	13	2023-12-08 04:14:01.107-06	2023-12-24 00:39:23.671-06
38	10	12	tom	Catedral de Santiago de Compostela	Spain	C	Santiago de Compostela	Praza do Obradoiro, s/n 15704 Santiago de Compostela Spain	+34 981 58 35 48	42.882	-8.544626	\N	"<p>Oh hey there</p>"	121212-12-12 00:00:00-06	f	t	f	\N	\N		15	49	2023-11-19 00:00:00-06	2024-01-08 02:42:03.559-06
45	10	Mont St Michel	tom	Mont Saint-Michel	France	50	Le Mont-Saint-Michel	50170 Le Mont-Saint-Michel France	+33 2 33 60 14 30	48.6359448074127	-1.51116700000004	\N	\N	2020-03-03 15:20:00-06	f	f	f		\N	Cathedral / Basilica	32	1	2023-11-28 00:00:00-06	2023-12-23 23:53:17.292-06
87	10	Pena	tom	Parque e Palácio Nacional da Pena	Portugal	11	Sintra	Estrada da Pena, s/n 2710-609 Sintra Portugal	+351 21 923 7300	38.787587	-9.390609	\N	\N	1212-12-12 12:00:00-05:50:36	f	t	f		\N		53	1	2023-12-13 03:54:20.019-06	2023-12-23 23:53:52.614-06
54	10	Testing update	tom	Burg Hohenzollern	Germany	BW	Burg Hohenzollern	Burg Hohenzollern 72379 Burg Hohenzollern Germany	+49 7471 2428	48.3230099	8.96721	\N	"<p>Hey, read me.</p>"	2020-10-10 10:10:00-05	f	t	f		\N		32	11	2023-11-30 00:00:00-06	2023-12-25 02:54:37.324-06
42	35	malahide	kebab2	Malahide Castle	Ireland	D	Malahide	Malahide, Co. Dublin Republic of Ireland	+353 1 816 9538	53.445382	-6.164513	\N	\N	1212-12-12 00:00:00-05:50:36	f	t	f	\N	\N		\N	3	2023-11-27 00:00:00-06	2024-01-08 02:41:58.992-06
67	122	Travelog 1	Michael	Malahide Castle	Ireland	D	Malahide	Malahide, Co. Dublin Republic of Ireland	+353 1 816 9538	53.445382	-6.164513	\N	\N	2023-12-06 10:00:00-06	f	t	f		\N	Castle / Fortress / Palace	45	42	2023-12-07 02:01:21.707-06	2024-01-04 14:24:19.372-06
65	123	Chateau de Chenonceaux	Zelda	Château de Chenonceau	France	41	Chenonceau	Château de Chenonceau 41500 Chenonceau France	+33 820 20 90 90	47.324874	1.070299	\N	\N	2020-12-12 11:00:00-06	f	t	f		\N		44	3	2023-12-06 00:00:00-06	2024-01-09 15:21:15.94-06
86	10	Chinon	tom	Château Chinon	France	37	Chinon	Rue de Huisme 37500 Chinon France	+33 2 47 93 03 47	47.171575	0.252824	\N	"<p>asdf</p>"	1212-12-12 12:00:00-05:50:36	f	t	f		\N		52	2	2023-12-13 03:53:38.204-06	2024-01-10 02:20:33.544-06
39	10	12	tom	Astronomical Clock 	Czech Republic	PR	Prague	Staroměstské náměstí 1/3 110 00 Prague Czech Republic	+420 236 002 629	50.0870210643148	14.4207134534138	\N	"<p>48</p>"	2023-07-16 10:20:00-05	f	t	t	\N	\N		39	8	2023-11-19 00:00:00-06	2024-01-09 23:52:27.381-06
49	10	Clocky	tom	Astronomical Clock 	Czech Republic	PR	Prague	Staroměstské náměstí 1/3 110 00 Prague Czech Republic	+420 236 002 629	50.0870210643148	14.4207134534138	\N	"<p>asdf</p>"	1212-12-12 00:12:00-05:50:36	f	t	t		\N		19	0	2023-11-29 00:00:00-06	2024-01-09 23:52:35.788-06
37	10	12	tom	Westminster Abbey	United Kingdom	XGL	London	20 Dean's Yard London SW1P 3PA United Kingdom	+44 20 7222 5152	51.4993203344498	-0.127374497474177	\N	\N	1212-12-12 00:00:00-05:50:36	t	t	f	\N	\N		52	3	2023-11-19 00:00:00-06	2024-01-11 23:27:29.984-06
77	10	Fin Barr	tom	Saint Fin Barr's Cathedral	Ireland	CO	Cathedral	Library House, Cathedral Office Dean Street Cathedral, DZ08 H6X3 Republic of Ireland	+353 21 496 3387	51.894553	-8.480064	\N	\N	2005-05-05 09:00:00-05	f	t	f	James Bond	Dark Souls		49	7	2023-12-08 04:07:46.278-06	2024-01-13 00:18:38.724-06
52	10	Trip Test	tom	Real Monasterio de San Lorenzo de El Escorial	Spain	M	San Lorenzo de El Escorial	Avenida Juan de Borbón y Battemberg, s/n 28200 San Lorenzo de El Escorial Spain	+34 918 90 50 11	40.5891640930522	-4.1475966	\N	"<p>asd;lasdfj;alskdfjasd;lasdfj;alskdfjasd;lasdfj;alskdfjasd;lasdfj;alskdfjasd;lasdfj;alskdfjasd;lasdfj;alskdfjasd;lasdfj;alskdfjasd;lasdfj;alskdfjasd;lasdfj;alskdfjasd;lasdfj;alskdfjasd;lasdfj;alskdfjasd;lasdfj;alskdfjasd;lasdfj;alskdfjasd;lasdfj;alskdfjasd;lasdfj;alskdfjasd;lasdfj;alskdfjasd;lasdfj;alskdfjasd;lasdfj;alskdfjasd;lasdfj;alskdfjasd;lasdfj;alskdfjasd;lasdfj;alskdfj</p>"	2015-12-10 01:01:00-06	f	t	f		\N	Castle / Fortress / Palace	15	22	2023-11-29 00:00:00-06	2023-12-13 04:02:49.431-06
84	10	Matsumoto Castle	tom	Matsumoto Castle	Japan	20	Matsumoto	丸の内4-1 Matsumoto, 長野県 〒390-0873 Japan	+81 263-32-2902	36.238655	137.968953	\N	\N	1212-12-12 12:00:00-05:50:36	f	t	f		\N		\N	0	2023-12-13 03:51:38.905-06	2023-12-13 03:51:38.905-06
85	10	Basilica	tom	Basilica di San Marco	Italy	VE	Venezia	Piazza San Marco 30124 Venezia Italy	+39 041 270 8311	45.434561	12.339715	\N	\N	1212-12-12 12:00:00-05:50:36	f	t	f		\N		\N	0	2023-12-13 03:52:45.249-06	2023-12-13 03:52:45.249-06
83	10	Himeji	tom	Himeji Castle	Japan	28	Himeji	本町68 Himeji, 兵庫県 〒670-0012 Japan	+81 79-285-1146	34.83945	134.693903	\N	\N	1212-12-12 12:00:00-05:50:36	f	t	f		\N		51	0	2023-12-13 03:51:14.023-06	2023-12-18 00:46:47.043-06
90	25	Cathedral	kebab	Catedral de Santiago de Compostela	Spain	C	Santiago de Compostela	Praza do Obradoiro, s/n 15704 Santiago de Compostela Spain	+34 981 58 35 48	42.882	-8.544626	\N	\N	1212-12-12 12:00:00-05:50:36	f	t	f		\N		50	79	2023-12-13 11:16:31.376-06	2023-12-18 01:17:14.397-06
91	25	Testing search	kebab	La Tour Eiffel	France	75	Paris	5 avenue Anatole France Champ de Mars 75007 Paris France	+33 892 70 12 39	48.858368	2.29448028497734	\N	\N	2023-12-25 10:00:00-06	f	t	f		\N		\N	0	2023-12-23 00:06:23.109-06	2023-12-23 00:06:23.109-06
89	20	Clos Luce	johnnyboy	Château du Clos Lucé	France	37	Amboise	2 rue Clos Lucé 37400 Amboise France	+33 2 47 57 00 73	47.9959233	1.8522571	\N	\N	1212-12-12 12:00:00-05:50:36	f	t	f		\N		\N	17	2023-12-13 10:52:24.234-06	2023-12-23 00:25:59.042-06
95	17	Testing diversity	eva	Warwick Castle	United Kingdom	WAR	Warwick	Castle Hill Warwick CV34 4QU United Kingdom	+44 870 442 2371	52.2820788325064	-1.5853363465576	\N	\N	2023-12-25 10:00:00-06	f	t	f		\N		\N	0	2023-12-25 02:15:01.905-06	2023-12-25 02:15:01.905-06
68	122	Travelog 2	Michael	Château de Chambord	France	41	Chambord	41250 Chambord France	+33 2 54 50 40 00	47.616145099948	1.51704118720249	\N	"<p>Count me please!</p>"	2023-12-06 11:00:00-06	f	t	f	James BondJames BondJames BondJames BondJames BondJames BondJames BondJames BondJames BondJames BondJames BondJames BondJames BondJames BondJames BondJames BondJames BondJames BondJames BondJames BondJames BondJames BondJames BondJames BondJames Bondv		Castle / Fortress / Palace	45	34	2023-12-07 02:02:07.234-06	2023-12-24 00:25:43.72-06
88	10	Amboise	tom	Château d'Amboise	France	37	Amboise	37403 Amboise France	+33 2 47 57 00 98	47.412809	0.986522	\N	\N	1212-12-12 12:00:00-05:50:36	f	t	f		\N		40	12	2023-12-13 03:55:12.655-06	2024-01-08 02:48:08.864-06
40	10	12	tom	Chester Beatty Library	Ireland	D	Dublin	The Clock Tower Building Dublin Castle Dublin 2 Republic of Ireland	+353 1 407 0750	53.3417	-6.26719	\N	"<p>Funky 😀</p>"	2023-07-16 10:10:00-05	f	t	f	\N	\N		40	24	2023-11-19 00:00:00-06	2023-12-25 04:03:12.892-06
81	10	malahide 2	tom	Malahide Castle	Ireland	D	Malahide	Malahide, Co. Dublin Republic of Ireland	+353 1 816 9538	53.445382	-6.164513	\N	\N	1212-12-12 12:00:00-05:50:36	f	t	f		\N		53	2	2023-12-13 03:45:37.354-06	2023-12-27 00:03:05.778-06
92	122	What a gorgeous place	Michael	Church of Our Lady	Germany	SN	Dresden	Georg-Treu-Platz 3 01067 Dresden Germany	+49 351 65606100	51.051885	13.741505	\N	"<p>Hey there. </p><img src=\\"https://s3-media2.fl.yelpcdn.com/bphoto/CTDeB2DAnOZe6VwIeiyKNQ/o.jpg\\">"	2023-06-07 12:00:00-05	f	t	f		\N		54	15	2023-12-23 01:36:47.697-06	2024-01-09 00:50:09.928-06
100	10	Dresden Castle Trip	tom	Schloss Kuckuckstein	Germany	SN	Liebstadt	Am Schlossberg 1 01825 Liebstadt Germany	+49 35025 12770	50.8623258	13.8614851	\N	"<p><strong><em><span style=\\"font-size: 24px\\">We</span></em></strong><span style=\\"font-size: 24px\\">ll hey</span><span style=\\"font-size: [object Object]px\\"> there 😀</span></p>"	2023-04-04 10:00:00-05	f	t	t		\N		48	17	2024-01-11 14:32:43.171-06	2024-01-12 00:08:45.445-06
70	122	England	Michael	Westminster Abbey	United Kingdom	XGL	London	20 Dean's Yard London SW1P 3PA United Kingdom	+44 20 7222 5152	51.4993203344498	-0.127374497474177	\N	"<p>Westminster</p>"	2020-12-12 10:00:00-06	f	t	f				54	19	2023-12-07 03:33:07.655-06	2024-01-10 13:42:55.96-06
94	4	UNESCO site	jay	Aachener Dom	Germany	NW	Aachen	Klosterplatz 2 52062 Aachen Germany	+49 241 477090	50.7746274053422	6.08393669128418	\N	\N	2023-12-12 11:00:00-06	f	t	t		\N		\N	4	2023-12-24 00:38:30.747-06	2024-01-10 13:49:59.991-06
82	10	Carcassone	tom	Cité Médiévale de Carcassonne	France	11	Carcassonne	11000 Carcassonne France		43.206287	2.36375	\N	\N	1212-12-12 12:00:00-05:50:36	f	t	f		\N		52	3	2023-12-13 03:50:48.162-06	2024-01-10 02:18:26.68-06
96	121	testing Henry	Henry	La chiesa di Santa Margherita d'Antiochia	Italy	SP	Vernazza	19018 Vernazza Italy		44.1354446016213	9.68236842908323	\N	"<p>asdf 🙄</p>"	2023-12-26 11:00:00-06	f	t	f		\N		\N	17	2023-12-26 23:18:21.409-06	2024-01-12 23:38:26.227-06
99	10	Sully Sur Loire	tom	Château de Sully	France	71	Sully	71360 Sully France		46.98284	4.42218	\N	\N	2024-01-01 10:00:00-06	f	t	t		\N	Castle / Fortress / Palace	17	0	2024-01-11 14:30:37.651-06	2024-01-11 14:30:37.651-06
93	10	Notre Dame	tom	Notre Dame de la Paix	France	75	Paris	19 Rue Jour 75001 Paris France	+33 1 45 08 57 66	48.86374	2.34472	\N	\N	2023-12-12 00:00:00-06	f	t	f		Assassin's Creed Unity		40	21	2023-12-24 00:07:54.288-06	2024-01-11 14:37:11.84-06
97	121	Chateau Chinon	Henry							47.616341	1.516962	\N	\N	1212-12-12 10:00:00-05:50:36	f	t	f		\N		\N	32	2024-01-08 02:08:38.319-06	2024-01-13 00:28:34.769-06
101	10	Lofoten	tom	Lofoten Krigsminnemuseum	Norway	18	Svolvær	Jektvn 30 8300 Svolvær Norway	+47 91 73 03 28	68.2424393	14.5801401	\N	\N	2024-01-10 12:00:00-06	f	t	f		\N		\N	1	2024-01-12 22:42:17.442-06	2024-01-13 22:28:24.282-06
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.comments (comment_id, username, travelog_id, trip_id, user_id, parent_id, content, created_at, updated_at) FROM stdin;
36	Tip	\N	15	19	\N	hEYO	2023-11-21 04:19:41.41-06	2023-11-21 04:19:41.41-06
37	Tip	\N	15	19	36	asdf	2023-11-21 04:20:58.565-06	2023-11-21 04:20:58.565-06
41	kebab	39	\N	25	\N	asdf	2023-11-23 03:26:51.947-06	2023-11-23 03:26:51.947-06
51	jay	60	\N	4	\N	Hi there	2023-12-09 07:56:11.132-06	2023-12-09 07:56:11.132-06
52	tom	\N	18	10	\N	Haiyaa	2023-12-11 10:03:34.14-06	2023-12-11 10:03:34.141-06
53	Michael	\N	18	122	52	flubbaflubbaflubbaflubbaflubbaflubbaflubbaflubbaflubbaflubbaflubbaflubbaflubbaflubbaflubbaflubbaflubbaflubbaflubba	2023-12-11 16:36:24.415-06	2023-12-11 16:36:24.415-06
54	Michael	\N	18	122	\N	test	2023-12-11 16:55:33.026-06	2023-12-11 16:55:33.026-06
55	Michael	\N	18	122	54	awefd	2023-12-11 16:55:43.619-06	2023-12-11 16:55:43.619-06
56	tom	54	\N	10	\N	Hoowah	2023-12-11 22:41:22.227-06	2023-12-11 22:41:22.227-06
57	kebab	38	\N	25	\N	2345	2023-12-12 11:17:49.948-06	2023-12-12 11:17:49.948-06
58	tom	38	\N	10	57	asdf	2023-12-12 21:11:13.976-06	2023-12-12 21:11:13.976-06
59	kebab	90	\N	25	\N	Flubber Bubber	2023-12-13 11:18:21.013-06	2023-12-13 11:18:21.013-06
60	johnnyboy	\N	49	20	\N	asdf	2023-12-13 14:08:29.487-06	2023-12-13 14:08:29.487-06
61	tom	\N	49	10	\N	asdf	2023-12-13 14:19:17.784-06	2023-12-13 14:19:17.785-06
62	kebab	72	\N	25	\N	ergserg	2023-12-13 14:30:49.894-06	2023-12-13 14:30:49.894-06
63	kebab	\N	50	25	\N		2023-12-13 19:52:06.304-06	2023-12-13 19:52:06.305-06
64	kebab	\N	50	25	\N		2023-12-13 19:52:19.281-06	2023-12-13 19:52:19.282-06
65	tom	38	\N	10	\N	awefaewf	2023-12-14 00:11:50.662-06	2023-12-14 00:11:50.662-06
66	Michael	74	\N	122	\N	asdfadsf	2023-12-14 00:38:01.992-06	2023-12-14 00:38:01.992-06
67	jay	\N	18	4	\N	Testing Diversity	2023-12-25 02:28:11.841-06	2023-12-25 02:28:11.841-06
68	jay	\N	18	4	55	testing diversity	2023-12-25 02:28:20.062-06	2023-12-25 02:28:20.062-06
69	jay	38	\N	4	\N	Testing diversity.	2023-12-25 02:44:43.695-06	2023-12-25 02:44:43.699-06
70	jay	38	\N	4	58	Testing diversity.	2023-12-25 02:44:48.039-06	2023-12-25 02:44:48.039-06
71	jay	\N	18	4	67	This seems to work	2023-12-25 02:51:39.51-06	2023-12-25 02:51:39.511-06
72	jay	54	\N	4	\N	tally tally sally sally	2023-12-25 02:54:36.492-06	2023-12-25 02:54:36.492-06
73	eva	\N	42	17	\N	Hey.	2023-12-25 03:21:52.891-06	2023-12-25 03:21:52.892-06
74	tom	67	\N	10	\N	Heyo	2024-01-04 14:24:10.285-06	2024-01-04 14:24:10.286-06
75	tom	67	\N	10	74	Heyo	2024-01-04 14:24:18.157-06	2024-01-04 14:24:18.158-06
76	tom	92	\N	10	\N	adsf	2024-01-08 23:14:34.354-06	2024-01-08 23:14:34.354-06
77	tom	86	\N	10	\N	asdf	2024-01-10 02:20:19.292-06	2024-01-10 02:20:19.292-06
81	tom	100	\N	10	\N	Yo	2024-01-11 22:53:24.576-06	2024-01-11 22:53:24.576-06
82	tom	100	\N	10	81	Yo	2024-01-11 22:53:31.385-06	2024-01-11 22:53:31.386-06
83	eva	97	\N	17	\N	hey	2024-01-12 00:29:01.842-06	2024-01-12 00:29:01.842-06
84	tom	97	\N	10	83	hey	2024-01-12 00:29:32.07-06	2024-01-12 00:29:32.071-06
85	eva	\N	54	17	\N	Hey	2024-01-12 00:33:08.511-06	2024-01-12 00:33:08.511-06
86	tom	\N	54	10	85	hey	2024-01-12 00:33:24.75-06	2024-01-12 00:33:24.751-06
87	Henry	96	\N	121	\N	asdf	2024-01-12 23:23:38.129-06	2024-01-12 23:23:38.13-06
90	jay	96	\N	4	\N	awef	2024-01-12 23:26:27.549-06	2024-01-12 23:26:27.55-06
93	jay	96	\N	4	91	3546	2024-01-12 23:28:46.294-06	2024-01-12 23:28:46.294-06
89	Henry	96	\N	121	\N	awef	2024-01-12 23:26:20.612-06	2024-01-12 23:26:20.613-06
91	Henry	96	\N	121	\N	awef	2024-01-12 23:28:18.63-06	2024-01-12 23:28:18.63-06
94	Henry	96	\N	121	93	awef546	2024-01-12 23:35:18.315-06	2024-01-12 23:35:18.315-06
95	Henry	96	\N	121	87	ewrerg	2024-01-12 23:36:33.94-06	2024-01-12 23:36:33.94-06
96	Henry	96	\N	121	\N	345345345	2024-01-12 23:37:41.349-06	2024-01-12 23:37:41.349-06
97	Henry	96	\N	121	\N	234t234t	2024-01-12 23:37:48.54-06	2024-01-12 23:37:48.54-06
98	Henry	96	\N	121	\N	why	2024-01-12 23:37:56.245-06	2024-01-12 23:37:56.245-06
99	jay	96	\N	4	\N	67856789579	2024-01-12 23:38:24.39-06	2024-01-12 23:38:24.39-06
100	Henry	96	\N	121	\N	45h	2024-01-12 23:39:19.5-06	2024-01-12 23:39:19.5-06
101	Henry	96	\N	121	100	w45by	2024-01-12 23:39:25.411-06	2024-01-12 23:39:25.412-06
\.


--
-- Data for Name: comment_likes; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.comment_likes (like_id, user_id, liker_id, liketype, comment_id, created_at, updated_at) FROM stdin;
46	19	4	comment	36	2023-11-23 05:39:13.681-06	2023-11-23 05:39:13.681-06
63	19	25	comment	36	2023-11-23 06:05:29.251-06	2023-11-23 06:05:29.251-06
64	19	25	comment	37	2023-11-23 06:05:39.717-06	2023-11-23 06:05:39.717-06
70	25	10	comment	57	2023-12-12 21:11:05.717-06	2023-12-12 21:11:05.717-06
71	25	122	comment	57	2023-12-13 04:45:40.413-06	2023-12-13 04:45:40.413-06
73	25	122	comment	59	2023-12-13 11:18:35.839-06	2023-12-13 11:18:35.839-06
74	10	122	comment	58	2023-12-14 00:10:58.724-06	2023-12-14 00:10:58.724-06
75	10	122	comment	65	2023-12-14 00:12:16.393-06	2023-12-14 00:12:16.393-06
76	122	4	comment	54	2023-12-25 03:03:12.087-06	2023-12-25 03:03:12.087-06
78	122	4	comment	53	2023-12-25 03:03:18.014-06	2023-12-25 03:03:18.014-06
81	10	4	comment	61	2023-12-25 03:06:38.341-06	2023-12-25 03:06:38.341-06
82	20	4	comment	60	2023-12-25 03:06:38.813-06	2023-12-25 03:06:38.813-06
83	19	4	comment	37	2023-12-25 03:20:18.371-06	2023-12-25 03:20:18.371-06
84	10	4	comment	52	2023-12-25 03:20:42.657-06	2023-12-25 03:20:42.657-06
85	122	4	comment	55	2023-12-25 03:20:44.329-06	2023-12-25 03:20:44.329-06
86	17	4	comment	73	2023-12-25 03:22:01.958-06	2023-12-25 03:22:01.958-06
87	17	120	comment	73	2023-12-25 03:23:25.519-06	2023-12-25 03:23:25.519-06
90	4	25	comment	71	2023-12-25 03:30:38.585-06	2023-12-25 03:30:38.585-06
91	4	25	comment	67	2023-12-25 03:30:39.428-06	2023-12-25 03:30:39.428-06
92	4	25	comment	68	2023-12-25 03:30:40.646-06	2023-12-25 03:30:40.646-06
93	17	25	comment	73	2023-12-25 03:32:39.816-06	2023-12-25 03:32:39.816-06
94	17	122	comment	73	2023-12-25 03:33:17.859-06	2023-12-25 03:33:17.859-06
96	25	4	comment	57	2023-12-25 03:36:24.004-06	2023-12-25 03:36:24.004-06
99	10	4	comment	77	2024-01-10 02:21:49.803-06	2024-01-10 02:21:49.803-06
\.


--
-- Data for Name: email_verifications; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.email_verifications (verification_id, user_id, token, expires_at, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: feedback_reports; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.feedback_reports (report_id, user_id, travelog_id, content, reported_user_id, reported_trip_id, reported_travelog_id, reported_comment_id, complaint_text, created_at, updated_at, name, email, cleared) FROM stdin;
105	\N	\N	asdf	\N	\N	\N	\N	\N	2023-12-01 01:35:40.4-06	2023-12-01 01:35:40.401-06	me	me@me.com	f
106	\N	\N	asdf	\N	\N	\N	\N	\N	2023-12-01 01:35:43.668-06	2023-12-01 01:35:43.669-06	me	me@me.com	f
107	18	\N	\N	17	\N	\N	\N	asdf	2023-12-12 11:16:08.424-06	2023-12-12 11:16:08.424-06	henry	henry@henry.com	f
108	18	\N	\N	\N	42	\N	\N	asdf	2023-12-12 11:16:32.368-06	2023-12-12 11:16:32.369-06	henry	henry@henry.com	f
109	18	\N	\N	\N	\N	64	\N	2345	2023-12-12 11:17:04.588-06	2023-12-12 11:17:04.588-06	henry	henry@henry.com	f
110	18	\N	\N	\N	\N	\N	57	2345	2023-12-12 11:18:21.762-06	2023-12-12 11:18:21.762-06	henry	henry@henry.com	f
112	4	\N	\N	10	\N	\N	\N	asdfadsfadsf	2024-01-11 23:44:03.167-06	2024-01-12 00:01:23.896-06	jay	jay@jay.com	t
111	10	\N	\N	120	\N	\N	\N	Hey now this seems to work.	2023-12-12 20:01:37.555-06	2024-01-12 00:02:02.485-06	tom	tom@tom.com	t
\.


--
-- Data for Name: follows; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.follows (follow_id, follower_id, followee_id, created_at, updated_at) FROM stdin;
3	18	19	2023-12-07 05:36:06.825-06	2023-12-07 05:36:06.825-06
4	18	25	2023-12-07 05:36:27.054-06	2023-12-07 05:36:27.054-06
5	18	121	2023-12-07 05:36:35.925-06	2023-12-07 05:36:35.925-06
6	18	122	2023-12-07 05:36:42.458-06	2023-12-07 05:36:42.458-06
7	42	19	2023-12-07 05:37:03.322-06	2023-12-07 05:37:03.322-06
8	42	25	2023-12-07 05:37:10.703-06	2023-12-07 05:37:10.703-06
9	42	122	2023-12-07 05:37:17.318-06	2023-12-07 05:37:17.318-06
10	122	19	2023-12-07 05:37:38.874-06	2023-12-07 05:37:38.874-06
11	122	25	2023-12-07 05:37:44.707-06	2023-12-07 05:37:44.707-06
12	25	19	2023-12-07 05:37:57.727-06	2023-12-07 05:37:57.727-06
13	10	123	2023-12-07 05:51:13.737-06	2023-12-07 05:51:13.737-06
14	123	10	2023-12-07 06:02:44.768-06	2023-12-07 06:02:44.768-06
15	10	4	2023-12-11 12:51:36.008-06	2023-12-11 12:51:36.008-06
16	122	10	2023-12-11 12:52:30.659-06	2023-12-11 12:52:30.659-06
17	10	123	2023-12-11 23:04:52.924-06	2023-12-11 23:04:52.924-06
18	42	10	2023-12-11 23:04:59.023-06	2023-12-11 23:04:59.023-06
19	25	10	2023-12-11 23:10:15.459-06	2023-12-11 23:10:15.459-06
20	4	10	2023-12-11 23:10:37.941-06	2023-12-11 23:10:37.941-06
21	120	10	2023-12-11 23:10:58.618-06	2023-12-11 23:10:58.618-06
22	20	10	2023-12-11 23:11:33.274-06	2023-12-11 23:11:33.274-06
23	43	10	2023-12-11 23:12:04.077-06	2023-12-11 23:12:04.077-06
24	18	10	2023-12-11 23:15:41.116-06	2023-12-11 23:15:41.116-06
25	122	25	2023-12-13 11:19:16.166-06	2023-12-13 11:19:16.166-06
28	120	25	2023-12-13 12:28:10.031-06	2023-12-13 12:28:10.031-06
\.


--
-- Data for Name: forbidden_words; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.forbidden_words (word_id, word, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: friendships; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.friendships (friendship_id, user1, user2, accepted, denied, dismissed, created_at, updated_at) FROM stdin;
9	4	17	t	f	f	2023-11-25 00:19:18.767-06	2023-11-25 00:19:32.225-06
13	25	17	t	f	f	2023-11-26 22:33:04.069-06	2023-11-26 22:33:11.911-06
14	25	10	t	f	f	2023-12-02 01:33:20.24-06	2023-12-02 01:33:26.063-06
15	10	4	t	f	f	2023-12-04 04:15:14.667-06	2023-12-04 04:15:37.079-06
16	10	120	t	f	f	2023-12-04 04:15:22.375-06	2023-12-04 04:15:45.779-06
18	122	4	t	f	f	2023-12-06 12:12:18.361-06	2023-12-06 12:12:37.41-06
22	123	10	t	f	f	2023-12-11 23:00:28.593-06	2023-12-11 23:00:51.186-06
21	20	10	t	f	f	2023-12-11 23:00:09.454-06	2023-12-11 23:00:52.595-06
20	43	10	t	f	f	2023-12-11 22:59:30.912-06	2023-12-11 23:00:53.133-06
19	18	10	t	f	f	2023-12-11 22:58:50.416-06	2023-12-11 23:00:53.609-06
23	42	10	t	f	f	2023-12-11 23:01:11.136-06	2023-12-11 23:01:12.442-06
25	18	124	f	t	f	2023-12-12 07:42:38.838-06	2023-12-12 07:42:41.684-06
27	122	10	t	f	f	2023-12-12 23:18:53.263-06	2023-12-12 23:20:37.791-06
28	122	25	t	f	f	2023-12-13 11:14:12.847-06	2023-12-13 11:15:19.08-06
29	120	25	f	f	f	2023-12-13 11:36:33.745-06	2023-12-13 11:36:33.745-06
\.


--
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.images (image_id, travelog_id, image_url, view_count, title, description, created_at, updated_at) FROM stdin;
37	37	https://s3-media3.fl.yelpcdn.com/bphoto/p-_BjzdhFRBvlDw9kbe0dg/o.jpg	0	\N	\N	2023-11-19 00:14:04.686-06	2023-11-19 00:14:04.686-06
38	38	https://s3-media2.fl.yelpcdn.com/bphoto/USZL8MxiUe1R21O470ChUg/o.jpg	0	\N	\N	2023-11-19 00:14:35.915-06	2023-11-19 00:14:35.915-06
39	39	https://s3-media1.fl.yelpcdn.com/bphoto/dHubgSWXWzNqrSrTvZ1Cwg/o.jpg	0	\N	\N	2023-11-19 05:45:01.574-06	2023-11-19 05:45:01.574-06
42	41	https://upload.wikimedia.org/wikipedia/commons/9/9c/Chateau-Azay-le_-Rideau-CourtInterieure.jpg	0	\N	\N	2023-11-25 15:23:46.585-06	2023-11-26 00:50:52.863-06
41	41	https://s3-media1.fl.yelpcdn.com/bphoto/jMTNGaTOuFizWm_ZSyG40A/o.jpg	0	\N	\N	2023-11-23 04:08:38.387-06	2023-11-26 00:50:52.865-06
43	41	https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Chateau_Azay_le_Rideau.jpg/1200px-Chateau_Azay_le_Rideau.jpg	0	\N	\N	2023-11-25 23:47:41.998-06	2023-11-26 00:50:52.867-06
46	41	https://live.staticflickr.com/2029/1795837015_e769333e82_b.jpg	0	\N	\N	2023-11-26 00:44:07.24-06	2023-11-26 00:50:52.868-06
47	42	https://s3-media4.fl.yelpcdn.com/bphoto/yN2YHF5-zlZ2lR_xLQCz6Q/o.jpg	0	\N	\N	2023-11-27 00:05:23.347-06	2023-11-27 00:05:23.347-06
49	44	https://live.staticflickr.com/65535/50799916446_8118f00fab_k.jpg	0	\N	\N	2023-11-28 03:08:30.241-06	2023-11-28 03:08:30.241-06
51	46	https://s3-media1.fl.yelpcdn.com/bphoto/6AiUZ8QyQmHcpGASzqKbRA/o.jpg	0	\N	\N	2023-11-28 15:53:58.8-06	2023-11-28 15:53:58.8-06
52	47	https://s3-media3.fl.yelpcdn.com/bphoto/SJiYyQErXdbMwfKljDA-zw/o.jpg	0	\N	\N	2023-11-28 16:02:18.725-06	2023-11-28 16:02:18.725-06
53	48	https://s3-media2.fl.yelpcdn.com/bphoto/Wcd9rIHH0gwf1Hh5k5-KQA/o.jpg	0	\N	\N	2023-11-28 16:03:06.141-06	2023-11-28 16:03:06.141-06
54	49	https://s3-media1.fl.yelpcdn.com/bphoto/dHubgSWXWzNqrSrTvZ1Cwg/o.jpg	0	\N	\N	2023-11-29 00:50:02.091-06	2023-11-29 00:50:02.091-06
55	50	https://s3-media3.fl.yelpcdn.com/bphoto/rNxgXaaS7OScgb1e3rTy3w/o.jpg	0	\N	\N	2023-11-29 01:07:21.246-06	2023-11-29 01:07:21.246-06
72	45	https://live.staticflickr.com/941/42836827695_5f96190ef7_c.jpg	0	\N	\N	2023-11-30 05:10:57.184-06	2023-11-30 05:10:57.184-06
73	45	https://live.staticflickr.com/941/42836827695_5f96190ef7_c.jpg	0	\N	\N	2023-11-30 05:11:09.325-06	2023-11-30 05:11:09.325-06
71	45	https://live.staticflickr.com/941/42836827695_5f96190ef7_c.jpg	0	\N	\N	2023-11-30 05:10:42.612-06	2023-11-30 05:10:42.612-06
59	54	https://s3-media3.fl.yelpcdn.com/bphoto/Jk9w8gt-pBQeO337JM5bpw/o.jpg	0	\N	\N	2023-11-30 01:21:17.559-06	2023-11-30 10:12:09.505-06
81	54	https://live.staticflickr.com/65535/53364939824_d1ef7aa22e_c.jpg	0	\N	\N	2023-11-30 09:18:39.174-06	2023-11-30 10:12:09.509-06
79	54	https://live.staticflickr.com/65535/53361096159_141564150e_h.jpg	0	\N	\N	2023-11-30 08:38:59.339-06	2023-11-30 10:12:09.512-06
87	55	https://s3-media4.fl.yelpcdn.com/bphoto/yN2YHF5-zlZ2lR_xLQCz6Q/o.jpg	0	flowers	malahide	2023-12-01 00:00:00-06	2023-12-03 07:54:12.939-06
88	55	https://live.staticflickr.com/3846/14679051950_0ddddc7004_b.jpg	0	castles	not malahide	2023-12-01 06:23:14.451-06	2023-12-03 07:54:12.956-06
89	60	https://s3-media4.fl.yelpcdn.com/bphoto/yN2YHF5-zlZ2lR_xLQCz6Q/o.jpg	0	\N	\N	2023-12-04 09:07:41.538-06	2023-12-04 09:07:41.538-06
90	61	https://s3-media3.fl.yelpcdn.com/bphoto/2PDuOs1p4UKV4532KvTg0w/o.jpg	0	\N	\N	2023-12-04 09:08:04.493-06	2023-12-04 09:08:04.493-06
92	63	https://s3-media2.fl.yelpcdn.com/bphoto/ySLbZ8I6FoGzth-x8wMWrg/o.jpg	0	\N	\N	2023-12-06 23:28:29.334-06	2023-12-06 23:28:29.334-06
94	65	https://s3-media2.fl.yelpcdn.com/bphoto/HNNpwI40rOfxkSKqDui5HA/o.jpg	0	\N	\N	2023-12-06 23:32:22.886-06	2023-12-06 23:32:22.886-06
95	66	https://s3-media2.fl.yelpcdn.com/bphoto/ySLbZ8I6FoGzth-x8wMWrg/o.jpg	0	\N	\N	2023-12-07 00:40:07.496-06	2023-12-07 00:40:07.496-06
97	68	https://s3-media3.fl.yelpcdn.com/bphoto/XoHey5_DbLEaplymP89bNQ/o.jpg	0	\N	\N	2023-12-07 02:02:07.242-06	2023-12-07 02:02:07.242-06
99	70	https://s3-media3.fl.yelpcdn.com/bphoto/p-_BjzdhFRBvlDw9kbe0dg/o.jpg	0	\N	\N	2023-12-07 03:33:07.673-06	2023-12-07 03:33:07.673-06
100	71	https://s3-media2.fl.yelpcdn.com/bphoto/z7yLHQFfHEyfbXuGPVnxAg/o.jpg	0	\N	\N	2023-12-07 03:33:42.365-06	2023-12-07 03:33:42.365-06
101	72	https://s3-media1.fl.yelpcdn.com/bphoto/jMTNGaTOuFizWm_ZSyG40A/o.jpg	0	\N	\N	2023-12-07 03:36:36.743-06	2023-12-07 03:36:36.743-06
102	73	https://s3-media3.fl.yelpcdn.com/bphoto/0boy0abGaYNHi6C2STyeWw/o.jpg	0	\N	\N	2023-12-07 03:37:19.574-06	2023-12-07 03:37:19.574-06
104	75	https://s3-media1.fl.yelpcdn.com/bphoto/VPRK_MaH882IAe9LNxCsPw/o.jpg	0	\N	\N	2023-12-07 15:45:17.695-06	2023-12-07 15:45:17.695-06
105	76	https://s3-media2.fl.yelpcdn.com/bphoto/hzonAVC_PKUFERgWp2C-kQ/o.jpg	0	\N	\N	2023-12-07 15:47:16.214-06	2023-12-07 15:47:16.214-06
107	78	https://s3-media3.fl.yelpcdn.com/bphoto/dpXoE2fuN0f2K4l5usLw6g/o.jpg	0	\N	\N	2023-12-08 04:14:01.126-06	2023-12-08 04:14:01.126-06
112	81	https://s3-media4.fl.yelpcdn.com/bphoto/yN2YHF5-zlZ2lR_xLQCz6Q/o.jpg	0	\N	\N	2023-12-13 03:45:37.36-06	2023-12-13 03:45:37.36-06
114	83	https://s3-media2.fl.yelpcdn.com/bphoto/8xjOF0ayiQQvYM9u20R9gw/o.jpg	0	\N	\N	2023-12-13 03:51:14.03-06	2023-12-13 03:51:14.03-06
57	52	https://s3-media1.fl.yelpcdn.com/bphoto/_CQKn6Sg1NQ54W3BWPCZww/o.jpg	0	\N	\N	2023-11-29 02:44:24.647-06	2023-12-08 10:00:15.146-06
109	52	https://live.staticflickr.com/7719/16913261240_c4f2b4a27a_b.jpg	0	\N	\N	2023-12-08 10:00:15.148-06	2023-12-08 10:00:15.148-06
115	84	https://s3-media4.fl.yelpcdn.com/bphoto/CABzNTz04VmxOsvf5vWUnw/o.jpg	0	\N	\N	2023-12-13 03:51:38.91-06	2023-12-13 03:51:38.91-06
93	64	https://s3-media3.fl.yelpcdn.com/bphoto/XoHey5_DbLEaplymP89bNQ/o.jpg	2	\N	\N	2023-12-06 23:31:45.755-06	2023-12-08 13:51:52.814-06
111	80	https://s3-media1.fl.yelpcdn.com/bphoto/bLEMoQVInLnFx2hxqEFsCw/o.jpg	0	\N	\N	2023-12-11 16:26:17.817-06	2023-12-11 16:26:17.817-06
116	85	https://s3-media2.fl.yelpcdn.com/bphoto/2Qgf88K2VGqR6_l3nkWLSQ/o.jpg	0	\N	\N	2023-12-13 03:52:45.257-06	2023-12-13 03:52:45.257-06
117	86	https://s3-media2.fl.yelpcdn.com/bphoto/Kj7OWmJJd14BF4OpPrHqqg/o.jpg	0	\N	\N	2023-12-13 03:53:38.21-06	2023-12-13 03:53:38.21-06
119	88	https://s3-media3.fl.yelpcdn.com/bphoto/0boy0abGaYNHi6C2STyeWw/o.jpg	0	\N	\N	2023-12-13 03:55:12.661-06	2023-12-13 03:55:12.661-06
103	74	https://s3-media1.fl.yelpcdn.com/bphoto/0Kc5xaSDHG5ik2VNW_C5iA/o.jpg	0	sagrada	familia	2023-12-07 03:41:28.708-06	2023-12-13 11:12:51.735-06
120	89	https://s3-media4.fl.yelpcdn.com/bphoto/Tb8DpxZ13acw5wHbmfjzJA/o.jpg	0	Wait...	This does work?	2023-12-13 10:52:24.241-06	2023-12-13 10:56:35.978-06
121	90	https://s3-media2.fl.yelpcdn.com/bphoto/USZL8MxiUe1R21O470ChUg/o.jpg	0	\N	\N	2023-12-13 11:16:31.381-06	2023-12-13 11:16:31.381-06
122	91	https://s3-media1.fl.yelpcdn.com/bphoto/55NtnLIORS2Gx2AHzkG9FQ/o.jpg	0	\N	\N	2023-12-23 00:06:23.137-06	2023-12-23 00:06:23.137-06
125	94	https://s3-media1.fl.yelpcdn.com/bphoto/bnO7RY7-5QGJe8u4zL2LEg/o.jpg	0	\N	\N	2023-12-24 00:38:30.769-06	2023-12-24 00:38:30.769-06
126	95	https://s3-media3.fl.yelpcdn.com/bphoto/SJiYyQErXdbMwfKljDA-zw/o.jpg	0	\N	\N	2023-12-25 02:15:01.918-06	2023-12-25 02:15:01.918-06
40	40	https://live.staticflickr.com/2143/2098356772_d78a2e2a97_b.jpg	8	\N	\N	2023-11-19 05:45:34.195-06	2023-12-25 04:03:26.945-06
96	67	https://s3-media4.fl.yelpcdn.com/bphoto/yN2YHF5-zlZ2lR_xLQCz6Q/o.jpg	2	\N	\N	2023-12-07 02:01:21.719-06	2023-12-25 03:55:10.815-06
108	40	https://live.staticflickr.com/6016/5944749581_ff280c9683_b.jpg	7	adsf	\N	2023-12-08 06:35:11.864-06	2023-12-25 04:03:21.079-06
127	96	https://s3-media4.fl.yelpcdn.com/bphoto/uBM40bpD5VPlJGtamXSCXQ/o.jpg	0	\N	\N	2023-12-26 23:18:21.418-06	2023-12-26 23:18:21.418-06
106	77	https://s3-media2.fl.yelpcdn.com/bphoto/zSYNCp38aVeJK58z4Zi3CA/o.jpg	5	\N	\N	2023-12-08 04:07:46.297-06	2024-01-13 00:06:27.908-06
56	51	https://s3-media2.fl.yelpcdn.com/bphoto/cdmLRaxJzmDqvDSinRMHzw/o.jpg	0	asdf	asdf	2023-11-29 02:12:02.799-06	2024-01-10 02:45:31.064-06
118	87	https://s3-media4.fl.yelpcdn.com/bphoto/zjh9slB1yJzQAUjDayR0Zw/o.jpg	0	asdf	\N	2023-12-13 03:54:20.024-06	2024-01-10 14:53:37.566-06
128	97	https://live.staticflickr.com/2507/4149366991_bf068b5543_b.jpg	2	\N	\N	2024-01-08 02:08:38.331-06	2024-01-11 14:39:04.594-06
129	92	https://live.staticflickr.com/1876/43802368725_dd6ca36191_b.jpg	0	Dresden	Beautiful	2024-01-09 00:30:35.349-06	2024-01-09 00:30:51.336-06
123	92	https://s3-media2.fl.yelpcdn.com/bphoto/CTDeB2DAnOZe6VwIeiyKNQ/o.jpg	15	Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo	Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo Honkadoo	2023-12-23 01:36:47.71-06	2024-01-09 00:39:18.586-06
113	82	https://s3-media2.fl.yelpcdn.com/bphoto/Gr9vx2BFzIH2-8CavSndWA/o.jpg	1	\N	\N	2023-12-13 03:50:48.17-06	2024-01-10 02:18:38.024-06
143	93	https://live.staticflickr.com/61/179883332_2c39f1525a_b.jpg	0	Notre Dame 1	Front	2024-01-11 02:32:13.256-06	2024-01-11 04:14:42.733-06
149	93	https://live.staticflickr.com/3839/15161643891_a40a035b34_b.jpg	0	Notre Dame 2	Interior	2024-01-11 04:14:42.736-06	2024-01-11 04:14:42.736-06
150	99	https://s3-media3.fl.yelpcdn.com/bphoto/jsClUs7Bo0njjgpk9A5Rpg/o.jpg	0	\N	\N	2024-01-11 14:30:37.671-06	2024-01-11 14:30:37.671-06
133	87	https://live.staticflickr.com/2378/2523837734_305d1f1881_b.jpg	0	4	4	2024-01-10 14:50:18.36-06	2024-01-10 14:53:37.582-06
134	87	https://live.staticflickr.com/2378/2523837734_305d1f1881_b.jpg	0	5	5	2024-01-10 14:51:32.994-06	2024-01-10 14:53:37.584-06
154	100	https://live.staticflickr.com/4087/5036639727_ac7e40ba4f_c.jpg	0	Dresden Castle 4	Archway	2024-01-11 22:52:43.654-06	2024-01-11 22:52:43.654-06
152	100	https://live.staticflickr.com/8368/8396392870_0d4a8916ae_b.jpg	0	Dresden Castle 2	Cloudy Day	2024-01-11 14:42:06.955-06	2024-01-11 22:52:43.659-06
155	101	https://s3-media4.fl.yelpcdn.com/bphoto/48G_XFy8nEzGJlEI9gjfbg/o.jpg	0	\N	\N	2024-01-12 22:42:17.448-06	2024-01-12 22:42:17.448-06
\.


--
-- Data for Name: image_likes; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.image_likes (like_id, user_id, liker_id, liketype, image_id, created_at, updated_at) FROM stdin;
4	10	25	image	59	2023-11-30 05:55:36.675-06	2023-11-30 05:55:36.675-06
5	10	25	image	38	2023-12-03 02:13:45.167-06	2023-12-03 02:13:45.167-06
6	10	19	image	38	2023-12-07 15:03:23.504-06	2023-12-07 15:03:23.504-06
7	10	19	image	39	2023-12-07 15:04:53.077-06	2023-12-07 15:04:53.077-06
8	35	10	image	47	2023-12-12 20:48:28.518-06	2023-12-12 20:48:28.518-06
9	10	122	image	38	2023-12-13 04:47:43.825-06	2023-12-13 04:47:43.825-06
10	10	25	image	104	2023-12-13 10:29:30.828-06	2023-12-13 10:29:30.828-06
11	17	25	image	101	2023-12-13 10:29:33.954-06	2023-12-13 10:29:33.954-06
12	25	122	image	121	2023-12-13 11:17:41.832-06	2023-12-13 11:17:41.832-06
13	10	121	image	40	2023-12-13 23:47:32.968-06	2023-12-13 23:47:32.968-06
14	10	121	image	108	2023-12-13 23:47:33.681-06	2023-12-13 23:47:33.681-06
15	10	120	image	40	2023-12-13 23:47:44.28-06	2023-12-13 23:47:44.28-06
16	10	42	image	40	2023-12-13 23:47:56.256-06	2023-12-13 23:47:56.256-06
17	10	42	image	108	2023-12-13 23:47:56.974-06	2023-12-13 23:47:56.974-06
18	10	25	image	113	2023-12-16 22:17:12.41-06	2023-12-16 22:17:12.41-06
19	10	25	image	40	2023-12-25 03:43:26.586-06	2023-12-25 03:43:26.586-06
21	10	4	image	117	2024-01-10 02:19:56.752-06	2024-01-10 02:19:56.752-06
25	10	122	image	143	2024-01-11 04:13:38.306-06	2024-01-11 04:13:38.306-06
26	10	4	image	154	2024-01-11 22:58:27.426-06	2024-01-11 22:58:27.426-06
30	121	4	image	128	2024-01-13 00:28:37.237-06	2024-01-13 00:28:37.237-06
\.


--
-- Data for Name: indicators; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.indicators (indicator_id, user_id, logged_in, last_active, created_at, updated_at) FROM stdin;
22	21	f	2023-12-07 13:15:14.429-06	2023-12-07 13:14:37.945-06	2023-12-07 13:15:14.434-06
23	27	f	2023-12-07 13:15:31.73-06	2023-12-07 13:15:15.998-06	2023-12-07 13:15:31.736-06
24	30	f	2023-12-07 13:26:50.253-06	2023-12-07 13:25:21.627-06	2023-12-07 13:26:50.263-06
25	35	f	2023-12-07 13:28:15.044-06	2023-12-07 13:26:56.155-06	2023-12-07 13:28:15.056-06
20	19	f	2023-12-07 15:19:50.348-06	2023-12-07 05:48:28.56-06	2023-12-07 15:19:50.365-06
19	42	f	2023-12-14 00:10:09.312-06	2023-12-07 05:36:50.386-06	2023-12-14 00:10:09.321-06
18	18	f	2023-12-12 12:02:43.346-06	2023-12-07 05:35:42.869-06	2023-12-12 12:02:43.351-06
27	124	f	2023-12-12 12:29:20.381-06	2023-12-12 00:04:34.125-06	2023-12-12 12:29:20.386-06
17	123	f	2023-12-13 04:41:39.982-06	2023-12-06 23:31:05.746-06	2023-12-13 04:41:39.987-06
28	125	f	2023-12-14 23:43:34.972-06	2023-12-14 19:14:19.33-06	2023-12-14 23:43:34.997-06
21	20	f	2023-12-23 01:07:31.116-06	2023-12-07 13:13:27.06-06	2023-12-23 01:07:31.174-06
7	25	t	2024-01-04 20:54:20.341-06	2023-11-30 05:53:50.523-06	2024-01-04 20:54:20.341-06
26	43	f	2024-01-11 23:52:28.604-06	2023-12-11 22:59:05.877-06	2024-01-11 23:52:28.609-06
13	120	f	2024-01-12 00:07:09.883-06	2023-12-03 01:36:41.565-06	2024-01-12 00:07:09.892-06
16	122	f	2024-01-11 14:37:14.237-06	2023-12-06 09:26:37.93-06	2024-01-11 14:37:14.25-06
14	4	f	2024-01-13 00:28:37.23-06	2023-12-03 08:39:37.752-06	2024-01-13 00:28:37.23-06
15	121	f	2024-01-13 22:39:12.686-06	2023-12-04 16:15:23.786-06	2024-01-13 22:39:12.703-06
8	10	t	2024-01-13 22:42:45.566-06	2023-11-30 05:55:53.117-06	2024-01-13 22:42:45.567-06
10	17	f	2024-01-12 22:53:20.862-06	2023-12-02 04:09:28.477-06	2024-01-12 22:53:20.871-06
\.


--
-- Data for Name: interactions; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.interactions (interaction_id, user_id, travelog_id, status, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: maintenance_histories; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.maintenance_histories (history_id, maintenance_id, actual_start, actual_end, maintenance_key, created_at, updated_at) FROM stdin;
24	31	2023-12-12 12:29:00.608-06	2023-12-12 12:55:00.758-06	puppy	2023-12-12 12:29:00.625-06	2023-12-12 12:55:00.788-06
25	35	2023-12-15 10:54:00.23-06	2023-12-15 10:55:00.281-06	ppp	2023-12-15 10:54:00.239-06	2023-12-15 10:55:00.29-06
26	36	2023-12-15 10:57:00.41-06	\N	qqq	2023-12-15 10:57:00.429-06	2023-12-15 10:57:00.429-06
27	38	2023-12-15 11:01:00.618-06	2023-12-15 11:02:00.692-06	ppp	2023-12-15 11:01:00.65-06	2023-12-15 11:02:00.707-06
28	40	2023-12-15 11:20:00.023-06	\N	ppp	2023-12-15 11:20:00.034-06	2023-12-15 11:20:00.034-06
\.


--
-- Data for Name: maintenances; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.maintenances (maintenance_id, admin_id, timestamp_start, timestamp_end, maintenance_mode, maintenance_key, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.messages (message_id, caller_id, receiver_id, caller_del, receiver_del, content, read, warning, created_at, updated_at) FROM stdin;
475	17	4	f	f	awefawe	t	f	2023-11-25 00:19:54.811-06	2023-11-25 01:13:03.16-06
563	122	17	f	f	Hey there	f	t	2023-12-12 12:02:30.262-06	2023-12-12 12:02:30.262-06
564	10	43	f	f	Yo!	t	f	2024-01-11 23:49:14.52-06	2024-01-11 23:49:28.466-06
565	43	10	f	f	hey!	t	f	2024-01-11 23:49:31.547-06	2024-01-11 23:50:02.242-06
566	10	25	f	f	Freaky deaky!	f	f	2024-01-11 23:50:13.583-06	2024-01-11 23:50:13.583-06
567	10	4	f	f	Freaky deaky!	f	f	2024-01-11 23:50:15.807-06	2024-01-11 23:50:15.808-06
568	121	10	f	f	Skibidi	t	t	2024-01-11 23:52:46.379-06	2024-01-12 00:01:23.903-06
569	10	121	f	f	Skibidi	t	f	2024-01-11 23:52:56.583-06	2024-01-12 00:01:23.903-06
570	121	10	f	f	dafuq	t	t	2024-01-12 00:01:15.068-06	2024-01-12 00:01:23.903-06
571	10	121	f	f	boom	t	f	2024-01-12 00:01:18.316-06	2024-01-12 00:01:23.903-06
572	121	120	f	f	SUUUP	t	t	2024-01-12 00:01:52.376-06	2024-01-12 00:02:02.493-06
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.notifications (notification_id, sender_id, recipient_id, comment_id, type, content, expiry_date, read, dismissed, created_at, updated_at) FROM stdin;
590	25	10	\N	comment	{"username":"kebab","text":"commented on your travelog/trip.","url":"/travelog/38"}	2024-01-12 11:17:49.953-06	t	f	2023-12-12 11:17:49.953-06	2023-12-12 22:42:51.666-06
458	122	4	\N	friend-request	{"text":"has sent you a friend request.","username":"Michael","url":"/public_profile/Michael"}	2024-01-06 12:12:18.381-06	t	t	2023-12-06 12:12:18.382-06	2023-12-06 12:12:37.414-06
462	18	121	\N	new-follow	{"username":"henry","text":"has followed you.","url":"/public_profile/henry"}	2024-01-07 05:36:35.934-06	t	f	2023-12-07 05:36:35.934-06	2023-12-07 05:48:23.347-06
460	18	19	\N	new-follow	{"username":"henry","text":"has followed you.","url":"/public_profile/henry"}	2024-01-07 05:36:06.837-06	t	f	2023-12-07 05:36:06.839-06	2023-12-07 05:48:30.261-06
464	42	19	\N	new-follow	{"username":"gavin","text":"has followed you.","url":"/public_profile/gavin"}	2024-01-07 05:37:03.33-06	t	f	2023-12-07 05:37:03.33-06	2023-12-07 05:48:30.261-06
467	122	19	\N	new-follow	{"username":"Michael","text":"has followed you.","url":"/public_profile/Michael"}	2024-01-07 05:37:38.883-06	t	f	2023-12-07 05:37:38.883-06	2023-12-07 05:48:30.261-06
469	25	19	\N	new-follow	{"username":"kebab","text":"has followed you.","url":"/public_profile/kebab"}	2024-01-07 05:37:57.733-06	t	f	2023-12-07 05:37:57.733-06	2023-12-07 05:48:30.261-06
470	10	123	\N	new-follow	{"username":"tom","text":"has followed you.","url":"/public_profile/tom"}	2024-01-07 05:51:13.746-06	t	f	2023-12-07 05:51:13.746-06	2023-12-07 05:54:18.299-06
593	10	120	\N	profile-like	{"likerUsername":"tom","text":" has liked your profile for great photography.","likerUrl":"/public_profile/tom","entityUrl":"/public_profile/inky"}	2024-01-12 20:38:58.519-06	t	f	2023-12-12 20:38:58.519-06	2023-12-12 20:40:35.965-06
598	10	35	\N	travelog-like	{"likerUsername":"tom","text":" has liked your travelog.","likerUrl":"/public_profile/tom","entityUrl":"/trav_det/42"}	2024-01-12 20:43:18.643-06	f	f	2023-12-12 20:43:18.643-06	2023-12-12 20:43:18.643-06
600	10	35	\N	travelog-like	{"likerUsername":"tom","text":" has liked your travelog.","likerUrl":"/public_profile/tom","entityUrl":"/trav_det/42"}	2024-01-12 20:43:20.215-06	f	f	2023-12-12 20:43:20.215-06	2023-12-12 20:43:20.215-06
601	10	35	\N	travelog-like	{"likerUsername":"tom","text":" has liked your travelog.","likerUrl":"/public_profile/tom","entityUrl":"/trav_det/42"}	2024-01-12 20:43:21.017-06	f	f	2023-12-12 20:43:21.017-06	2023-12-12 20:43:21.017-06
478	123	20	\N	profile-like	{"likerUsername":"Zelda","text":" has liked your profile for great photography.","likerUrl":"/public_profile/Zelda","entityUrl":"/public_profile/johnnyboy"}	2024-01-07 06:19:30.806-06	t	f	2023-12-07 06:19:30.806-06	2023-12-07 13:13:32.47-06
479	123	20	\N	profile-like	{"likerUsername":"Zelda","text":" has liked your profile for great writing.","likerUrl":"/public_profile/Zelda","entityUrl":"/public_profile/johnnyboy"}	2024-01-07 06:19:31.041-06	t	f	2023-12-07 06:19:31.041-06	2023-12-07 13:13:32.47-06
491	19	17	\N	travelog-like	{"likerUsername":"Tip","text":" has liked your travelog.","likerUrl":"/public_profile/Tip","entityUrl":"/trav_det/73"}	2024-01-07 14:44:08.721-06	t	f	2023-12-07 14:44:08.721-06	2023-12-07 14:44:25.641-06
492	19	17	\N	travelog-like	{"likerUsername":"Tip","text":" has liked your travelog.","likerUrl":"/public_profile/Tip","entityUrl":"/trav_det/73"}	2024-01-07 14:44:08.727-06	t	f	2023-12-07 14:44:08.727-06	2023-12-07 14:44:25.641-06
493	19	17	\N	travelog-like	{"likerUsername":"Tip","text":" has liked your travelog.","likerUrl":"/public_profile/Tip","entityUrl":"/trav_det/73"}	2024-01-07 14:44:08.77-06	t	f	2023-12-07 14:44:08.77-06	2023-12-07 14:44:25.641-06
494	19	17	\N	travelog-like	{"likerUsername":"Tip","text":" has liked your travelog.","likerUrl":"/public_profile/Tip","entityUrl":"/trav_det/73"}	2024-01-07 14:44:08.781-06	t	f	2023-12-07 14:44:08.781-06	2023-12-07 14:44:25.641-06
640	20	10	\N	profile-like	{"likerUsername":"johnnyboy","text":" has liked your profile for great writing.","likerUrl":"/public_profile/johnnyboy","entityUrl":"/public_profile/tom"}	2024-01-13 10:47:29.782-06	t	f	2023-12-13 10:47:29.782-06	2023-12-13 23:00:09.473-06
618	4	120	\N	profile-like	{"likerUsername":"jay","text":" has liked your profile for great photography.","likerUrl":"/public_profile/jay","entityUrl":"/public_profile/inky"}	2024-01-13 04:42:22.823-06	t	f	2023-12-13 04:42:22.823-06	2023-12-14 00:56:25.385-06
633	122	120	\N	profile-like	{"likerUsername":"Michael","text":" has liked your profile for great writing.","likerUrl":"/public_profile/Michael","entityUrl":"/public_profile/inky"}	2024-01-13 10:16:40.655-06	t	f	2023-12-13 10:16:40.655-06	2023-12-14 00:56:25.385-06
596	10	123	\N	trip	{"likerUsername":"tom","text":" has liked your writing.","likerUrl":"/public_profile/tom","entityUrl":"/trip_det/44"}	2024-01-12 20:43:02.166-06	t	f	2023-12-12 20:43:02.166-06	2023-12-13 04:41:15.705-06
495	19	17	\N	trip	{"likerUsername":"Tip","text":" has liked your trip.","likerUrl":"/public_profile/Tip","entityUrl":"/trip_det/43"}	2024-01-07 14:45:09.996-06	t	f	2023-12-07 14:45:09.996-06	2023-12-11 02:36:27.018-06
621	122	10	\N	trip	{"likerUsername":"Michael","text":" has liked your writing.","likerUrl":"/public_profile/Michael","entityUrl":"/trip_det/49"}	2024-01-13 04:43:40.784-06	t	f	2023-12-13 04:43:40.784-06	2023-12-13 04:44:02.392-06
622	122	10	\N	trip	{"likerUsername":"Michael","text":" has liked your trip as educational.","likerUrl":"/public_profile/Michael","entityUrl":"/trip_det/49"}	2024-01-13 04:43:42.029-06	t	f	2023-12-13 04:43:42.029-06	2023-12-13 04:44:02.392-06
625	122	10	\N	image-like	{"likerUsername":"Michael","text":" has liked your image.","likerUrl":"/public_profile/Michael","entityUrl":"/trav_det/38?image=38"}	2024-01-13 04:47:43.835-06	t	f	2023-12-13 04:47:43.835-06	2023-12-13 10:16:11.786-06
630	122	10	\N	profile-like	{"likerUsername":"Michael","text":" has liked your profile for great photography.","likerUrl":"/public_profile/Michael","entityUrl":"/public_profile/tom"}	2024-01-13 10:14:51.917-06	t	f	2023-12-13 10:14:51.917-06	2023-12-13 10:16:11.786-06
629	4	10	\N	profile-like	{"likerUsername":"jay","text":" has liked your profile for great writing.","likerUrl":"/public_profile/jay","entityUrl":"/public_profile/tom"}	2024-01-13 10:14:03.198-06	t	f	2023-12-13 10:14:03.198-06	2023-12-13 10:16:11.786-06
637	25	10	\N	image-like	{"likerUsername":"kebab","text":" has liked your image.","likerUrl":"/public_profile/kebab","entityUrl":"/trav_det/75?image=104"}	2024-01-13 10:29:30.835-06	t	f	2023-12-13 10:29:30.835-06	2023-12-13 10:34:02.321-06
588	18	124	\N	friend-request	{"text":"has sent you a friend request.","username":"henry","url":"/public_profile/henry"}	2024-01-12 07:42:38.845-06	t	t	2023-12-12 07:42:38.845-06	2023-12-12 07:46:21.238-06
591	\N	17	\N	Account Warning	{"text":"Your account is under review. Further action may be taken in 72 hours."}	2024-01-12 12:02:33.41-06	t	f	2023-12-12 12:02:33.41-06	2023-12-12 12:02:45.289-06
594	10	120	\N	profile-like	{"likerUsername":"tom","text":" has liked your profile for great writing.","likerUrl":"/public_profile/tom","entityUrl":"/public_profile/inky"}	2024-01-12 20:38:59.086-06	t	f	2023-12-12 20:38:59.086-06	2023-12-12 20:40:35.965-06
603	10	35	\N	image-like	{"likerUsername":"tom","text":" has liked your image.","likerUrl":"/public_profile/tom","entityUrl":"/trav_det/42?image=47"}	2024-01-12 20:48:28.534-06	f	f	2023-12-12 20:48:28.534-06	2023-12-12 20:48:28.534-06
606	10	10	\N	comment	{"username":"tom","text":"commented on your travelog/trip.","url":"/travelog/38"}	2024-01-12 21:11:13.983-06	t	f	2023-12-12 21:11:13.983-06	2023-12-12 22:42:51.666-06
616	10	120	\N	travelog-access-granted	{"text":" has given you access to their travelog.","username":"tom","entityUrl":"http://localhost:3000/trav_det/52","url":"/public_profile/tom"}	2024-01-13 04:03:00.198-06	t	f	2023-12-13 04:03:00.198-06	2023-12-13 04:41:45.378-06
631	122	10	\N	profile-like	{"likerUsername":"Michael","text":" has liked your profile for great writing.","likerUrl":"/public_profile/Michael","entityUrl":"/public_profile/tom"}	2024-01-13 10:14:52.333-06	t	f	2023-12-13 10:14:52.333-06	2023-12-13 10:16:11.786-06
574	10	20	\N	friend-request-accepted	{"username":"tom","text":"has accepted your friend request.","url":"/public_profile/tom"}	2024-01-11 23:00:52.598-06	t	f	2023-12-11 23:00:52.598-06	2023-12-13 11:12:23.498-06
643	122	25	\N	friend-request	{"text":"has sent you a friend request.","username":"Michael","url":"/public_profile/Michael"}	2024-01-13 11:14:12.853-06	t	t	2023-12-13 11:14:12.854-06	2023-12-13 11:15:19.082-06
662	120	25	\N	friend-request	{"text":"has sent you a friend request.","username":"inky","url":"/public_profile/inky"}	2024-01-13 11:36:33.752-06	t	f	2023-12-13 11:36:33.752-06	2023-12-13 11:50:38.914-06
666	120	25	\N	new-follow	{"username":"inky","text":"has followed you.","url":"/public_profile/inky"}	2024-01-13 12:28:10.038-06	t	f	2023-12-13 12:28:10.038-06	2023-12-13 12:31:32.315-06
672	25	25	\N	comment	{"username":"kebab","text":"commented on your travelog/trip.","url":"/trip/50"}	2024-01-13 19:52:06.312-06	t	f	2023-12-13 19:52:06.312-06	2023-12-13 20:01:18.143-06
673	25	25	\N	comment	{"username":"kebab","text":"commented on your travelog/trip.","url":"/trip/50"}	2024-01-13 19:52:19.291-06	t	f	2023-12-13 19:52:19.291-06	2023-12-13 20:01:18.143-06
670	10	10	\N	comment	{"username":"tom","text":"commented on your travelog/trip.","url":"/trip/49"}	2024-01-13 14:19:17.789-06	t	f	2023-12-13 14:19:17.789-06	2023-12-13 23:00:09.473-06
669	20	10	\N	comment	{"username":"johnnyboy","text":"commented on your travelog/trip.","url":"/trip/49"}	2024-01-13 14:08:29.492-06	t	f	2023-12-13 14:08:29.492-06	2023-12-13 23:00:09.473-06
639	20	10	\N	profile-like	{"likerUsername":"johnnyboy","text":" has liked your profile for great photography.","likerUrl":"/public_profile/johnnyboy","entityUrl":"/public_profile/tom"}	2024-01-13 10:47:29.53-06	t	f	2023-12-13 10:47:29.531-06	2023-12-13 23:00:09.473-06
674	25	10	\N	travelog-like	{"likerUsername":"kebab","text":" has liked your travelog.","likerUrl":"/public_profile/kebab","entityUrl":"/trav_det/88"}	2024-01-13 23:13:48.185-06	t	f	2023-12-13 23:13:48.185-06	2023-12-13 23:34:27.319-06
675	25	10	\N	travelog-like	{"likerUsername":"kebab","text":" has liked your travelog.","likerUrl":"/public_profile/kebab","entityUrl":"/trav_det/88"}	2024-01-13 23:13:48.821-06	t	f	2023-12-13 23:13:48.821-06	2023-12-13 23:34:27.319-06
676	25	10	\N	travelog-like	{"likerUsername":"kebab","text":" has liked your travelog.","likerUrl":"/public_profile/kebab","entityUrl":"/trav_det/88"}	2024-01-13 23:13:49.591-06	t	f	2023-12-13 23:13:49.591-06	2023-12-13 23:34:27.319-06
619	4	120	\N	profile-like	{"likerUsername":"jay","text":" has liked your profile for great writing.","likerUrl":"/public_profile/jay","entityUrl":"/public_profile/inky"}	2024-01-13 04:42:23.206-06	t	f	2023-12-13 04:42:23.206-06	2023-12-14 00:56:25.385-06
635	25	120	\N	profile-like	{"likerUsername":"kebab","text":" has liked your profile for great photography.","likerUrl":"/public_profile/kebab","entityUrl":"/public_profile/inky"}	2024-01-13 10:20:27.205-06	t	f	2023-12-13 10:20:27.205-06	2023-12-14 00:56:25.385-06
575	10	43	\N	friend-request-accepted	{"username":"tom","text":"has accepted your friend request.","url":"/public_profile/tom"}	2024-01-11 23:00:53.136-06	t	f	2023-12-11 23:00:53.136-06	2023-12-14 01:01:40.532-06
592	\N	17	\N	Account Warning	{"text":"Your account is under review. Further action may be taken in 72 hours."}	2024-01-12 12:02:54.155-06	t	f	2023-12-12 12:02:54.155-06	2023-12-12 12:21:20.587-06
599	10	35	\N	travelog-like	{"likerUsername":"tom","text":" has liked your travelog.","likerUrl":"/public_profile/tom","entityUrl":"/trav_det/42"}	2024-01-12 20:43:19.405-06	f	f	2023-12-12 20:43:19.405-06	2023-12-12 20:43:19.405-06
602	10	35	\N	travelog-like	{"likerUsername":"tom","text":" has liked your travelog.","likerUrl":"/public_profile/tom","entityUrl":"/trav_det/42"}	2024-01-12 20:43:21.865-06	f	f	2023-12-12 20:43:21.865-06	2023-12-12 20:43:21.865-06
559	10	4	\N	travelog-like	{"likerUsername":"tom","text":" has liked your travelog.","likerUrl":"/public_profile/tom","entityUrl":"/trav_det/60"}	2024-01-08 23:22:29.139-06	t	f	2023-12-08 23:22:29.14-06	2023-12-08 23:29:50.464-06
560	10	4	\N	travelog-like	{"likerUsername":"tom","text":" has liked your travelog.","likerUrl":"/public_profile/tom","entityUrl":"/trav_det/60"}	2024-01-08 23:22:29.537-06	t	f	2023-12-08 23:22:29.537-06	2023-12-08 23:29:50.464-06
561	4	4	\N	comment	{"username":"jay","text":"commented on your travelog/trip.","url":"/travelog/60"}	2024-01-09 07:56:11.143-06	t	f	2023-12-09 07:56:11.143-06	2023-12-09 08:40:08.395-06
612	25	10	\N	travelog-like	{"likerUsername":"kebab","text":" has liked your travelog.","likerUrl":"/public_profile/kebab","entityUrl":"/trav_det/38"}	2024-01-12 21:17:47.179-06	t	f	2023-12-12 21:17:47.179-06	2023-12-12 22:42:51.666-06
617	10	120	\N	travelog-access-granted	{"text":" has given you access to their travelog.","username":"tom","entityUrl":"http://localhost:3000/trav_det/52","url":"/public_profile/tom"}	2024-01-13 04:03:08.901-06	t	f	2023-12-13 04:03:08.901-06	2023-12-13 04:41:45.378-06
613	122	10	\N	friend-request	{"text":"has sent you a friend request.","username":"Michael","url":"/public_profile/Michael"}	2024-01-12 23:18:53.279-06	t	t	2023-12-12 23:18:53.279-06	2023-12-12 23:20:37.794-06
595	10	123	\N	trip	{"likerUsername":"tom","text":" has liked your trip.","likerUrl":"/public_profile/tom","entityUrl":"/trip_det/44"}	2024-01-12 20:43:01.136-06	t	f	2023-12-12 20:43:01.136-06	2023-12-13 04:41:15.705-06
597	10	123	\N	trip	{"likerUsername":"tom","text":" has liked your trip as educational.","likerUrl":"/public_profile/tom","entityUrl":"/trip_det/44"}	2024-01-12 20:43:02.939-06	t	f	2023-12-12 20:43:02.939-06	2023-12-13 04:41:15.705-06
573	10	123	\N	friend-request-accepted	{"username":"tom","text":"has accepted your friend request.","url":"/public_profile/tom"}	2024-01-11 23:00:51.19-06	t	f	2023-12-11 23:00:51.19-06	2023-12-13 04:41:15.705-06
579	10	123	\N	new-follow	{"username":"tom","text":"has followed you.","url":"/public_profile/tom"}	2024-01-11 23:04:52.942-06	t	f	2023-12-11 23:04:52.942-06	2023-12-13 04:41:15.705-06
620	122	10	\N	trip	{"likerUsername":"Michael","text":" has liked your trip.","likerUrl":"/public_profile/Michael","entityUrl":"/trip_det/49"}	2024-01-13 04:43:40.421-06	t	f	2023-12-13 04:43:40.422-06	2023-12-13 04:44:02.392-06
568	10	10	\N	comment	{"username":"tom","text":"commented on your travelog/trip.","url":"/travelog/54"}	2024-01-11 22:41:22.241-06	t	f	2023-12-11 22:41:22.241-06	2023-12-11 23:00:48.122-06
565	122	10	\N	comment	{"username":"Michael","text":"commented on your travelog/trip.","url":"/trip/18"}	2024-01-11 16:36:24.424-06	t	f	2023-12-11 16:36:24.424-06	2023-12-11 23:00:48.122-06
566	122	10	\N	comment	{"username":"Michael","text":"commented on your travelog/trip.","url":"/trip/18"}	2024-01-11 16:55:33.033-06	t	f	2023-12-11 16:55:33.033-06	2023-12-11 23:00:48.122-06
567	122	10	\N	comment	{"username":"Michael","text":"commented on your travelog/trip.","url":"/trip/18"}	2024-01-11 16:55:43.625-06	t	f	2023-12-11 16:55:43.625-06	2023-12-11 23:00:48.122-06
569	18	10	\N	friend-request	{"text":"has sent you a friend request.","username":"henry","url":"/public_profile/henry"}	2024-01-11 22:58:50.425-06	t	t	2023-12-11 22:58:50.426-06	2023-12-11 23:00:53.61-06
576	10	18	\N	friend-request-accepted	{"username":"tom","text":"has accepted your friend request.","url":"/public_profile/tom"}	2024-01-11 23:00:53.612-06	f	f	2023-12-11 23:00:53.612-06	2023-12-11 23:00:53.612-06
572	123	10	\N	friend-request	{"text":"has sent you a friend request.","username":"Zelda","url":"/public_profile/Zelda"}	2024-01-11 23:00:28.601-06	t	t	2023-12-11 23:00:28.602-06	2023-12-11 23:00:51.188-06
571	20	10	\N	friend-request	{"text":"has sent you a friend request.","username":"johnnyboy","url":"/public_profile/johnnyboy"}	2024-01-11 23:00:09.462-06	t	t	2023-12-11 23:00:09.462-06	2023-12-11 23:00:52.597-06
570	43	10	\N	friend-request	{"text":"has sent you a friend request.","username":"bumble","url":"/public_profile/bumble"}	2024-01-11 22:59:30.92-06	t	t	2023-12-11 22:59:30.921-06	2023-12-11 23:00:53.134-06
578	10	42	\N	friend-request-accepted	{"username":"tom","text":"has accepted your friend request.","url":"/public_profile/tom"}	2024-01-11 23:01:12.448-06	f	f	2023-12-11 23:01:12.448-06	2023-12-11 23:01:12.448-06
671	25	17	\N	comment	{"username":"kebab","text":"commented on your travelog/trip.","url":"/travelog/72"}	2024-01-13 14:30:49.902-06	t	f	2023-12-13 14:30:49.902-06	2023-12-25 02:14:28.787-06
577	42	10	\N	friend-request	{"text":"has sent you a friend request.","username":"gavin","url":"/public_profile/gavin"}	2024-01-11 23:01:11.151-06	t	t	2023-12-11 23:01:11.152-06	2023-12-11 23:02:37.54-06
580	42	10	\N	new-follow	{"username":"gavin","text":"has followed you.","url":"/public_profile/gavin"}	2024-01-11 23:04:59.037-06	t	f	2023-12-11 23:04:59.037-06	2023-12-12 00:01:57.321-06
581	25	10	\N	new-follow	{"username":"kebab","text":"has followed you.","url":"/public_profile/kebab"}	2024-01-11 23:10:15.468-06	t	f	2023-12-11 23:10:15.468-06	2023-12-12 00:01:57.321-06
582	4	10	\N	new-follow	{"username":"jay","text":"has followed you.","url":"/public_profile/jay"}	2024-01-11 23:10:37.953-06	t	f	2023-12-11 23:10:37.953-06	2023-12-12 00:01:57.321-06
583	120	10	\N	new-follow	{"username":"inky","text":"has followed you.","url":"/public_profile/inky"}	2024-01-11 23:10:58.632-06	t	f	2023-12-11 23:10:58.633-06	2023-12-12 00:01:57.321-06
584	20	10	\N	new-follow	{"username":"johnnyboy","text":"has followed you.","url":"/public_profile/johnnyboy"}	2024-01-11 23:11:33.284-06	t	f	2023-12-11 23:11:33.285-06	2023-12-12 00:01:57.321-06
585	43	10	\N	new-follow	{"username":"bumble","text":"has followed you.","url":"/public_profile/bumble"}	2024-01-11 23:12:04.089-06	t	f	2023-12-11 23:12:04.089-06	2023-12-12 00:01:57.321-06
586	18	10	\N	new-follow	{"username":"henry","text":"has followed you.","url":"/public_profile/henry"}	2024-01-11 23:15:41.126-06	t	f	2023-12-11 23:15:41.127-06	2023-12-12 00:01:57.321-06
632	122	120	\N	profile-like	{"likerUsername":"Michael","text":" has liked your profile for great photography.","likerUrl":"/public_profile/Michael","entityUrl":"/public_profile/inky"}	2024-01-13 10:16:40.267-06	t	f	2023-12-13 10:16:40.267-06	2023-12-14 00:56:25.385-06
628	4	10	\N	profile-like	{"likerUsername":"jay","text":" has liked your profile for great photography.","likerUrl":"/public_profile/jay","entityUrl":"/public_profile/tom"}	2024-01-13 10:14:02.718-06	t	f	2023-12-13 10:14:02.718-06	2023-12-13 10:16:11.786-06
636	25	120	\N	profile-like	{"likerUsername":"kebab","text":" has liked your profile for great writing.","likerUrl":"/public_profile/kebab","entityUrl":"/public_profile/inky"}	2024-01-13 10:20:27.533-06	t	f	2023-12-13 10:20:27.533-06	2023-12-14 00:56:25.385-06
677	42	10	\N	travelog-like	{"likerUsername":"gavin","text":" has liked your travelog.","likerUrl":"/public_profile/gavin","entityUrl":"/trav_det/88"}	2024-01-13 23:14:01.081-06	t	f	2023-12-13 23:14:01.081-06	2023-12-13 23:34:27.319-06
678	42	10	\N	travelog-like	{"likerUsername":"gavin","text":" has liked your travelog.","likerUrl":"/public_profile/gavin","entityUrl":"/trav_det/88"}	2024-01-13 23:14:01.81-06	t	f	2023-12-13 23:14:01.81-06	2023-12-13 23:34:27.319-06
679	42	10	\N	travelog-like	{"likerUsername":"gavin","text":" has liked your travelog.","likerUrl":"/public_profile/gavin","entityUrl":"/trav_det/88"}	2024-01-13 23:14:02.54-06	t	f	2023-12-13 23:14:02.54-06	2023-12-13 23:34:27.319-06
680	120	10	\N	travelog-like	{"likerUsername":"inky","text":" has liked your travelog.","likerUrl":"/public_profile/inky","entityUrl":"/trav_det/88"}	2024-01-13 23:14:17.496-06	t	f	2023-12-13 23:14:17.496-06	2023-12-13 23:34:27.319-06
681	120	10	\N	travelog-like	{"likerUsername":"inky","text":" has liked your travelog.","likerUrl":"/public_profile/inky","entityUrl":"/trav_det/88"}	2024-01-13 23:14:18.265-06	t	f	2023-12-13 23:14:18.265-06	2023-12-13 23:34:27.319-06
682	120	10	\N	travelog-like	{"likerUsername":"inky","text":" has liked your travelog.","likerUrl":"/public_profile/inky","entityUrl":"/trav_det/88"}	2024-01-13 23:14:19.133-06	t	f	2023-12-13 23:14:19.133-06	2023-12-13 23:34:27.319-06
687	121	10	\N	travelog-like	{"likerUsername":"Henry","text":" has liked your travelog.","likerUrl":"/public_profile/Henry","entityUrl":"/trav_det/88"}	2024-01-13 23:14:36.291-06	t	f	2023-12-13 23:14:36.291-06	2023-12-13 23:34:27.319-06
688	121	10	\N	image-like	{"likerUsername":"Henry","text":" has liked your image.","likerUrl":"/public_profile/Henry","entityUrl":"/trav_det/40?image=40"}	2024-01-13 23:47:32.98-06	t	f	2023-12-13 23:47:32.98-06	2023-12-14 00:56:06.691-06
689	121	10	\N	image-like	{"likerUsername":"Henry","text":" has liked your image.","likerUrl":"/public_profile/Henry","entityUrl":"/trav_det/40?image=108"}	2024-01-13 23:47:33.693-06	t	f	2023-12-13 23:47:33.693-06	2023-12-14 00:56:06.691-06
690	120	10	\N	image-like	{"likerUsername":"inky","text":" has liked your image.","likerUrl":"/public_profile/inky","entityUrl":"/trav_det/40?image=40"}	2024-01-13 23:47:44.292-06	t	f	2023-12-13 23:47:44.292-06	2023-12-14 00:56:06.691-06
691	42	10	\N	image-like	{"likerUsername":"gavin","text":" has liked your image.","likerUrl":"/public_profile/gavin","entityUrl":"/trav_det/40?image=40"}	2024-01-13 23:47:56.269-06	t	f	2023-12-13 23:47:56.27-06	2023-12-14 00:56:06.691-06
692	42	10	\N	image-like	{"likerUsername":"gavin","text":" has liked your image.","likerUrl":"/public_profile/gavin","entityUrl":"/trav_det/40?image=108"}	2024-01-13 23:47:56.984-06	t	f	2023-12-13 23:47:56.984-06	2023-12-14 00:56:06.691-06
693	122	10	58	comment-like	{"likerUsername":"Michael","text":" has liked your comment.","likerUrl":"/public_profile/Michael","entityUrl":"/trav_det/38?comment=58"}	2024-01-14 00:10:58.742-06	t	f	2023-12-14 00:10:58.743-06	2023-12-14 00:56:06.691-06
694	10	10	\N	comment	{"username":"tom","text":"commented on your travelog/trip.","url":"/travelog/38"}	2024-01-14 00:11:50.669-06	t	f	2023-12-14 00:11:50.669-06	2023-12-14 00:56:06.691-06
695	122	10	65	comment-like	{"likerUsername":"Michael","text":" has liked your comment.","likerUrl":"/public_profile/Michael","entityUrl":"/trav_det/38?comment=65"}	2024-01-14 00:12:16.405-06	t	f	2023-12-14 00:12:16.405-06	2023-12-14 00:56:06.691-06
697	25	10	\N	image-like	{"likerUsername":"kebab","text":" has liked your image.","likerUrl":"/public_profile/kebab","entityUrl":"/trav_det/82?image=113"}	2024-01-16 22:17:12.419-06	t	f	2023-12-16 22:17:12.419-06	2023-12-16 22:41:54.259-06
696	122	25	\N	comment	{"username":"Michael","text":"commented on your travelog/trip.","url":"/travelog/74"}	2024-01-14 00:38:02.011-06	t	f	2023-12-14 00:38:02.011-06	2023-12-16 22:53:30.658-06
701	25	20	\N	travelog-like	{"likerUsername":"kebab","text":" has liked your travelog.","likerUrl":"/public_profile/kebab","entityUrl":"/trav_det/89"}	2024-01-23 00:26:26.768-06	f	f	2023-12-23 00:26:26.771-06	2023-12-23 00:26:26.772-06
702	25	20	\N	travelog-like	{"likerUsername":"kebab","text":" has liked your travelog.","likerUrl":"/public_profile/kebab","entityUrl":"/trav_det/89"}	2024-01-23 00:26:27.071-06	f	f	2023-12-23 00:26:27.072-06	2023-12-23 00:26:27.072-06
703	25	20	\N	travelog-like	{"likerUsername":"kebab","text":" has liked your travelog.","likerUrl":"/public_profile/kebab","entityUrl":"/trav_det/89"}	2024-01-23 00:26:27.465-06	f	f	2023-12-23 00:26:27.465-06	2023-12-23 00:26:27.466-06
707	25	123	\N	travelog-like	{"likerUsername":"kebab","text":" has liked your travelog.","likerUrl":"/public_profile/kebab","entityUrl":"/trav_det/64"}	2024-01-23 00:33:58.17-06	f	f	2023-12-23 00:33:58.17-06	2023-12-23 00:33:58.17-06
708	25	123	\N	travelog-like	{"likerUsername":"kebab","text":" has liked your travelog.","likerUrl":"/public_profile/kebab","entityUrl":"/trav_det/64"}	2024-01-23 00:33:58.613-06	f	f	2023-12-23 00:33:58.613-06	2023-12-23 00:33:58.614-06
709	25	123	\N	travelog-like	{"likerUsername":"kebab","text":" has liked your travelog.","likerUrl":"/public_profile/kebab","entityUrl":"/trav_det/64"}	2024-01-23 00:33:58.968-06	f	f	2023-12-23 00:33:58.968-06	2023-12-23 00:33:58.968-06
713	20	123	\N	travelog-like	{"likerUsername":"johnnyboy","text":" has liked your travelog.","likerUrl":"/public_profile/johnnyboy","entityUrl":"/trav_det/64"}	2024-01-23 00:34:45.484-06	f	f	2023-12-23 00:34:45.484-06	2023-12-23 00:34:45.484-06
757	4	10	\N	comment	{"username":"jay","text":"commented on your travelog/trip.","url":"/trip/18"}	2024-01-25 02:28:20.07-06	t	f	2023-12-25 02:28:20.07-06	2023-12-26 23:22:11.799-06
714	20	123	\N	travelog-like	{"likerUsername":"johnnyboy","text":" has liked your travelog.","likerUrl":"/public_profile/johnnyboy","entityUrl":"/trav_det/64"}	2024-01-23 00:34:45.859-06	f	f	2023-12-23 00:34:45.859-06	2023-12-23 00:34:45.859-06
715	20	123	\N	travelog-like	{"likerUsername":"johnnyboy","text":" has liked your travelog.","likerUrl":"/public_profile/johnnyboy","entityUrl":"/trav_det/64"}	2024-01-23 00:34:46.203-06	f	f	2023-12-23 00:34:46.203-06	2023-12-23 00:34:46.203-06
716	20	25	\N	trip	{"likerUsername":"johnnyboy","text":" has liked your writing.","likerUrl":"/public_profile/johnnyboy","entityUrl":"/trip_det/50"}	2024-01-23 00:50:00.813-06	t	f	2023-12-23 00:50:00.814-06	2023-12-23 00:51:17.211-06
704	25	122	\N	travelog-like	{"likerUsername":"kebab","text":" has liked your travelog.","likerUrl":"/public_profile/kebab","entityUrl":"/trav_det/68"}	2024-01-23 00:33:54.292-06	t	f	2023-12-23 00:33:54.292-06	2023-12-23 01:01:09.402-06
705	25	122	\N	travelog-like	{"likerUsername":"kebab","text":" has liked your travelog.","likerUrl":"/public_profile/kebab","entityUrl":"/trav_det/68"}	2024-01-23 00:33:54.672-06	t	f	2023-12-23 00:33:54.672-06	2023-12-23 01:01:09.402-06
706	25	122	\N	travelog-like	{"likerUsername":"kebab","text":" has liked your travelog.","likerUrl":"/public_profile/kebab","entityUrl":"/trav_det/68"}	2024-01-23 00:33:55.048-06	t	f	2023-12-23 00:33:55.048-06	2023-12-23 01:01:09.402-06
710	20	122	\N	travelog-like	{"likerUsername":"johnnyboy","text":" has liked your travelog.","likerUrl":"/public_profile/johnnyboy","entityUrl":"/trav_det/68"}	2024-01-23 00:34:41.778-06	t	f	2023-12-23 00:34:41.778-06	2023-12-23 01:01:09.402-06
711	20	122	\N	travelog-like	{"likerUsername":"johnnyboy","text":" has liked your travelog.","likerUrl":"/public_profile/johnnyboy","entityUrl":"/trav_det/68"}	2024-01-23 00:34:42.305-06	t	f	2023-12-23 00:34:42.305-06	2023-12-23 01:01:09.402-06
712	20	122	\N	travelog-like	{"likerUsername":"johnnyboy","text":" has liked your travelog.","likerUrl":"/public_profile/johnnyboy","entityUrl":"/trav_det/68"}	2024-01-23 00:34:42.51-06	t	f	2023-12-23 00:34:42.51-06	2023-12-23 01:01:09.402-06
717	20	122	\N	travelog-like	{"likerUsername":"johnnyboy","text":" has liked your travelog.","likerUrl":"/public_profile/johnnyboy","entityUrl":"/trav_det/68"}	2024-01-23 01:01:54.241-06	t	f	2023-12-23 01:01:54.242-06	2023-12-23 01:36:11.445-06
737	4	123	\N	travelog-like	{"likerUsername":"jay","text":" has liked your travelog.","likerUrl":"/public_profile/jay","entityUrl":"/trav_det/64"}	2024-01-24 00:25:25.132-06	f	f	2023-12-24 00:25:25.132-06	2023-12-24 00:25:25.133-06
738	4	123	\N	travelog-like	{"likerUsername":"jay","text":" has liked your travelog.","likerUrl":"/public_profile/jay","entityUrl":"/trav_det/64"}	2024-01-24 00:25:25.481-06	f	f	2023-12-24 00:25:25.481-06	2023-12-24 00:25:25.481-06
739	4	123	\N	travelog-like	{"likerUsername":"jay","text":" has liked your travelog.","likerUrl":"/public_profile/jay","entityUrl":"/trav_det/64"}	2024-01-24 00:25:25.819-06	f	f	2023-12-24 00:25:25.819-06	2023-12-24 00:25:25.819-06
563	10	4	\N	new-follow	{"username":"tom","text":"has followed you.","url":"/public_profile/tom"}	2024-01-11 12:51:36.018-06	t	f	2023-12-11 12:51:36.018-06	2023-12-24 00:55:20.628-06
743	10	4	\N	travelog-like	{"likerUsername":"tom","text":" has liked your travelog.","likerUrl":"/public_profile/tom","entityUrl":"/trav_det/94"}	2024-01-24 00:38:42.962-06	t	f	2023-12-24 00:38:42.963-06	2023-12-24 00:55:20.628-06
744	10	4	\N	travelog-like	{"likerUsername":"tom","text":" has liked your travelog.","likerUrl":"/public_profile/tom","entityUrl":"/trav_det/94"}	2024-01-24 00:38:43.252-06	t	f	2023-12-24 00:38:43.253-06	2023-12-24 00:55:20.628-06
745	10	4	\N	travelog-like	{"likerUsername":"tom","text":" has liked your travelog.","likerUrl":"/public_profile/tom","entityUrl":"/trav_det/94"}	2024-01-24 00:38:43.483-06	t	f	2023-12-24 00:38:43.483-06	2023-12-24 00:55:20.628-06
749	120	4	\N	travelog-like	{"likerUsername":"inky","text":" has liked your travelog.","likerUrl":"/public_profile/inky","entityUrl":"/trav_det/94"}	2024-01-24 00:40:00.658-06	t	f	2023-12-24 00:40:00.658-06	2023-12-24 00:55:20.628-06
750	120	4	\N	travelog-like	{"likerUsername":"inky","text":" has liked your travelog.","likerUrl":"/public_profile/inky","entityUrl":"/trav_det/94"}	2024-01-24 00:40:00.994-06	t	f	2023-12-24 00:40:00.994-06	2023-12-24 00:55:20.628-06
751	120	4	\N	travelog-like	{"likerUsername":"inky","text":" has liked your travelog.","likerUrl":"/public_profile/inky","entityUrl":"/trav_det/94"}	2024-01-24 00:40:01.435-06	t	f	2023-12-24 00:40:01.435-06	2023-12-24 00:55:20.628-06
638	25	17	\N	image-like	{"likerUsername":"kebab","text":" has liked your image.","likerUrl":"/public_profile/kebab","entityUrl":"/trav_det/72?image=101"}	2024-01-13 10:29:33.961-06	t	f	2023-12-13 10:29:33.961-06	2023-12-25 02:14:28.787-06
768	4	20	60	comment-like	{"likerUsername":"jay","text":" has liked your comment.","likerUrl":"/public_profile/jay","entityUrl":"/trip_det/49?comment=60"}	2024-01-25 03:06:38.823-06	f	f	2023-12-25 03:06:38.823-06	2023-12-25 03:06:38.824-06
772	4	19	37	comment-like	{"likerUsername":"jay","text":" has liked your comment.","likerUrl":"/public_profile/jay","entityUrl":"/trip_det/15?comment=37"}	2024-01-25 03:20:18.389-06	f	f	2023-12-25 03:20:18.389-06	2023-12-25 03:20:18.39-06
746	120	10	\N	travelog-like	{"likerUsername":"inky","text":" has liked your travelog.","likerUrl":"/public_profile/inky","entityUrl":"/trav_det/78"}	2024-01-24 00:39:25.236-06	t	f	2023-12-24 00:39:25.236-06	2023-12-26 23:22:11.799-06
769	4	25	\N	trip	{"likerUsername":"jay","text":" has liked your trip.","likerUrl":"/public_profile/jay","entityUrl":"/trip_det/50"}	2024-01-25 03:16:24.221-06	t	f	2023-12-25 03:16:24.222-06	2024-01-04 20:54:23.401-06
770	4	25	\N	trip	{"likerUsername":"jay","text":" has liked your writing.","likerUrl":"/public_profile/jay","entityUrl":"/trip_det/50"}	2024-01-25 03:16:24.571-06	t	f	2023-12-25 03:16:24.571-06	2024-01-04 20:54:23.401-06
771	4	25	\N	trip	{"likerUsername":"jay","text":" has liked your trip as educational.","likerUrl":"/public_profile/jay","entityUrl":"/trip_det/50"}	2024-01-25 03:16:24.84-06	t	f	2023-12-25 03:16:24.84-06	2024-01-04 20:54:23.401-06
740	4	122	\N	travelog-like	{"likerUsername":"jay","text":" has liked your travelog.","likerUrl":"/public_profile/jay","entityUrl":"/trav_det/68"}	2024-01-24 00:25:45.804-06	t	f	2023-12-24 00:25:45.804-06	2024-01-08 23:12:48.009-06
741	4	122	\N	travelog-like	{"likerUsername":"jay","text":" has liked your travelog.","likerUrl":"/public_profile/jay","entityUrl":"/trav_det/68"}	2024-01-24 00:25:46.104-06	t	f	2023-12-24 00:25:46.104-06	2024-01-08 23:12:48.009-06
742	4	122	\N	travelog-like	{"likerUsername":"jay","text":" has liked your travelog.","likerUrl":"/public_profile/jay","entityUrl":"/trav_det/68"}	2024-01-24 00:25:46.372-06	t	f	2023-12-24 00:25:46.372-06	2024-01-08 23:12:48.009-06
762	4	122	54	comment-like	{"likerUsername":"jay","text":" has liked your comment.","likerUrl":"/public_profile/jay","entityUrl":"/trip_det/18?comment=54"}	2024-01-25 03:03:12.102-06	t	f	2023-12-25 03:03:12.103-06	2024-01-08 23:12:48.009-06
764	4	122	53	comment-like	{"likerUsername":"jay","text":" has liked your comment.","likerUrl":"/public_profile/jay","entityUrl":"/trip_det/18?comment=53"}	2024-01-25 03:03:18.028-06	t	f	2023-12-25 03:03:18.028-06	2024-01-08 23:12:48.009-06
774	4	122	55	comment-like	{"likerUsername":"jay","text":" has liked your comment.","likerUrl":"/public_profile/jay","entityUrl":"/trip_det/18?comment=55"}	2024-01-25 03:20:44.346-06	t	f	2023-12-25 03:20:44.347-06	2024-01-08 23:12:48.009-06
758	4	10	\N	comment	{"username":"jay","text":"commented on your travelog/trip.","url":"/travelog/38"}	2024-01-25 02:44:43.707-06	t	f	2023-12-25 02:44:43.707-06	2023-12-26 23:22:11.799-06
775	17	4	\N	comment	{"username":"eva","text":"commented on your travelog/trip.","url":"/trip/42"}	2024-01-25 03:21:52.896-06	t	f	2023-12-25 03:21:52.896-06	2024-01-10 14:32:54.507-06
698	25	10	\N	travelog-like	{"likerUsername":"kebab","text":" has liked your travelog.","likerUrl":"/public_profile/kebab","entityUrl":"/trav_det/39"}	2024-01-22 23:25:52.363-06	t	f	2023-12-22 23:25:52.364-06	2023-12-26 23:22:11.799-06
699	25	10	\N	travelog-like	{"likerUsername":"kebab","text":" has liked your travelog.","likerUrl":"/public_profile/kebab","entityUrl":"/trav_det/39"}	2024-01-23 00:02:48.251-06	t	f	2023-12-23 00:02:48.251-06	2023-12-26 23:22:11.799-06
700	25	10	\N	travelog-like	{"likerUsername":"kebab","text":" has liked your travelog.","likerUrl":"/public_profile/kebab","entityUrl":"/trav_det/39"}	2024-01-23 00:03:05.138-06	t	f	2023-12-23 00:03:05.139-06	2023-12-26 23:22:11.799-06
718	120	10	\N	profile-like	{"likerUsername":"inky","text":" has liked your profile for great writing.","likerUrl":"/public_profile/inky","entityUrl":"/public_profile/tom"}	2024-01-23 01:08:03.308-06	t	f	2023-12-23 01:08:03.308-06	2023-12-26 23:22:11.799-06
719	122	10	\N	travelog-like	{"likerUsername":"Michael","text":" has liked your travelog.","likerUrl":"/public_profile/Michael","entityUrl":"/trav_det/77"}	2024-01-24 00:00:45.077-06	t	f	2023-12-24 00:00:45.078-06	2023-12-26 23:22:11.799-06
720	122	10	\N	travelog-like	{"likerUsername":"Michael","text":" has liked your travelog.","likerUrl":"/public_profile/Michael","entityUrl":"/trav_det/77"}	2024-01-24 00:00:45.472-06	t	f	2023-12-24 00:00:45.472-06	2023-12-26 23:22:11.799-06
721	122	10	\N	travelog-like	{"likerUsername":"Michael","text":" has liked your travelog.","likerUrl":"/public_profile/Michael","entityUrl":"/trav_det/77"}	2024-01-24 00:00:45.859-06	t	f	2023-12-24 00:00:45.859-06	2023-12-26 23:22:11.799-06
722	122	10	\N	travelog-like	{"likerUsername":"Michael","text":" has liked your travelog.","likerUrl":"/public_profile/Michael","entityUrl":"/trav_det/78"}	2024-01-24 00:01:13.201-06	t	f	2023-12-24 00:01:13.201-06	2023-12-26 23:22:11.799-06
723	122	10	\N	travelog-like	{"likerUsername":"Michael","text":" has liked your travelog.","likerUrl":"/public_profile/Michael","entityUrl":"/trav_det/78"}	2024-01-24 00:01:13.527-06	t	f	2023-12-24 00:01:13.528-06	2023-12-26 23:22:11.799-06
724	122	10	\N	travelog-like	{"likerUsername":"Michael","text":" has liked your travelog.","likerUrl":"/public_profile/Michael","entityUrl":"/trav_det/78"}	2024-01-24 00:01:13.783-06	t	f	2023-12-24 00:01:13.784-06	2023-12-26 23:22:11.799-06
725	25	10	\N	travelog-like	{"likerUsername":"kebab","text":" has liked your travelog.","likerUrl":"/public_profile/kebab","entityUrl":"/trav_det/78"}	2024-01-24 00:05:26.826-06	t	f	2023-12-24 00:05:26.827-06	2023-12-26 23:22:11.799-06
726	25	10	\N	travelog-like	{"likerUsername":"kebab","text":" has liked your travelog.","likerUrl":"/public_profile/kebab","entityUrl":"/trav_det/78"}	2024-01-24 00:05:27.216-06	t	f	2023-12-24 00:05:27.216-06	2023-12-26 23:22:11.799-06
727	25	10	\N	travelog-like	{"likerUsername":"kebab","text":" has liked your travelog.","likerUrl":"/public_profile/kebab","entityUrl":"/trav_det/78"}	2024-01-24 00:05:27.611-06	t	f	2023-12-24 00:05:27.613-06	2023-12-26 23:22:11.799-06
728	25	10	\N	travelog-like	{"likerUsername":"kebab","text":" has liked your travelog.","likerUrl":"/public_profile/kebab","entityUrl":"/trav_det/93"}	2024-01-24 00:08:04.715-06	t	f	2023-12-24 00:08:04.716-06	2023-12-26 23:22:11.799-06
729	25	10	\N	travelog-like	{"likerUsername":"kebab","text":" has liked your travelog.","likerUrl":"/public_profile/kebab","entityUrl":"/trav_det/93"}	2024-01-24 00:08:05.507-06	t	f	2023-12-24 00:08:05.507-06	2023-12-26 23:22:11.799-06
730	25	10	\N	travelog-like	{"likerUsername":"kebab","text":" has liked your travelog.","likerUrl":"/public_profile/kebab","entityUrl":"/trav_det/93"}	2024-01-24 00:08:06.179-06	t	f	2023-12-24 00:08:06.18-06	2023-12-26 23:22:11.799-06
731	120	10	\N	travelog-like	{"likerUsername":"inky","text":" has liked your travelog.","likerUrl":"/public_profile/inky","entityUrl":"/trav_det/93"}	2024-01-24 00:08:16.812-06	t	f	2023-12-24 00:08:16.812-06	2023-12-26 23:22:11.799-06
732	120	10	\N	travelog-like	{"likerUsername":"inky","text":" has liked your travelog.","likerUrl":"/public_profile/inky","entityUrl":"/trav_det/93"}	2024-01-24 00:08:18.942-06	t	f	2023-12-24 00:08:18.943-06	2023-12-26 23:22:11.799-06
733	120	10	\N	travelog-like	{"likerUsername":"inky","text":" has liked your travelog.","likerUrl":"/public_profile/inky","entityUrl":"/trav_det/93"}	2024-01-24 00:08:19.237-06	t	f	2023-12-24 00:08:19.237-06	2023-12-26 23:22:11.799-06
734	4	10	\N	travelog-like	{"likerUsername":"jay","text":" has liked your travelog.","likerUrl":"/public_profile/jay","entityUrl":"/trav_det/93"}	2024-01-24 00:08:29.293-06	t	f	2023-12-24 00:08:29.293-06	2023-12-26 23:22:11.799-06
735	4	10	\N	travelog-like	{"likerUsername":"jay","text":" has liked your travelog.","likerUrl":"/public_profile/jay","entityUrl":"/trav_det/93"}	2024-01-24 00:08:29.665-06	t	f	2023-12-24 00:08:29.665-06	2023-12-26 23:22:11.799-06
736	4	10	\N	travelog-like	{"likerUsername":"jay","text":" has liked your travelog.","likerUrl":"/public_profile/jay","entityUrl":"/trav_det/93"}	2024-01-24 00:08:29.986-06	t	f	2023-12-24 00:08:29.986-06	2023-12-26 23:22:11.799-06
747	120	10	\N	travelog-like	{"likerUsername":"inky","text":" has liked your travelog.","likerUrl":"/public_profile/inky","entityUrl":"/trav_det/78"}	2024-01-24 00:39:25.549-06	t	f	2023-12-24 00:39:25.549-06	2023-12-26 23:22:11.799-06
748	120	10	\N	travelog-like	{"likerUsername":"inky","text":" has liked your travelog.","likerUrl":"/public_profile/inky","entityUrl":"/trav_det/78"}	2024-01-24 00:39:25.832-06	t	f	2023-12-24 00:39:25.832-06	2023-12-26 23:22:11.799-06
753	4	10	\N	travelog-like	{"likerUsername":"jay","text":" has liked your travelog.","likerUrl":"/public_profile/jay","entityUrl":"/trav_det/88"}	2024-01-24 00:54:38.407-06	t	f	2023-12-24 00:54:38.407-06	2023-12-26 23:22:11.799-06
787	25	10	\N	image-like	{"likerUsername":"kebab","text":" has liked your image.","likerUrl":"/public_profile/kebab","entityUrl":"/trav_det/40?image=40"}	2024-01-25 03:43:26.599-06	t	f	2023-12-25 03:43:26.599-06	2023-12-26 23:22:11.799-06
786	4	25	57	comment-like	{"likerUsername":"jay","text":" has liked your comment.","likerUrl":"/public_profile/jay","entityUrl":"/trav_det/38?comment=57"}	2024-01-25 03:36:24.015-06	t	f	2023-12-25 03:36:24.016-06	2024-01-04 20:54:23.401-06
755	4	10	\N	travelog-like	{"likerUsername":"jay","text":" has liked your travelog.","likerUrl":"/public_profile/jay","entityUrl":"/trav_det/51"}	2024-01-24 00:56:00.462-06	t	f	2023-12-24 00:56:00.462-06	2023-12-26 23:22:11.799-06
756	4	10	\N	comment	{"username":"jay","text":"commented on your travelog/trip.","url":"/trip/18"}	2024-01-25 02:28:11.848-06	t	f	2023-12-25 02:28:11.848-06	2023-12-26 23:22:11.799-06
783	25	17	73	comment-like	{"likerUsername":"kebab","text":" has liked your comment.","likerUrl":"/public_profile/kebab","entityUrl":"/trip_det/42?comment=73"}	2024-01-25 03:32:39.828-06	t	f	2023-12-25 03:32:39.828-06	2024-01-10 02:22:46.93-06
784	122	17	73	comment-like	{"likerUsername":"Michael","text":" has liked your comment.","likerUrl":"/public_profile/Michael","entityUrl":"/trip_det/42?comment=73"}	2024-01-25 03:33:17.881-06	t	f	2023-12-25 03:33:17.881-06	2024-01-10 02:22:46.93-06
780	25	4	71	comment-like	{"likerUsername":"kebab","text":" has liked your comment.","likerUrl":"/public_profile/kebab","entityUrl":"/trip_det/18?comment=71"}	2024-01-25 03:30:38.601-06	t	f	2023-12-25 03:30:38.601-06	2024-01-10 14:32:54.507-06
781	25	4	67	comment-like	{"likerUsername":"kebab","text":" has liked your comment.","likerUrl":"/public_profile/kebab","entityUrl":"/trip_det/18?comment=67"}	2024-01-25 03:30:39.497-06	t	f	2023-12-25 03:30:39.498-06	2024-01-10 14:32:54.507-06
759	4	10	\N	comment	{"username":"jay","text":"commented on your travelog/trip.","url":"/travelog/38"}	2024-01-25 02:44:48.044-06	t	f	2023-12-25 02:44:48.044-06	2023-12-26 23:22:11.799-06
760	4	10	\N	comment	{"username":"jay","text":"commented on your travelog/trip.","url":"/trip/18"}	2024-01-25 02:51:39.519-06	t	f	2023-12-25 02:51:39.519-06	2023-12-26 23:22:11.799-06
761	4	10	\N	comment	{"username":"jay","text":"commented on your travelog/trip.","url":"/travelog/54"}	2024-01-25 02:54:36.498-06	t	f	2023-12-25 02:54:36.498-06	2023-12-26 23:22:11.799-06
767	4	10	61	comment-like	{"likerUsername":"jay","text":" has liked your comment.","likerUrl":"/public_profile/jay","entityUrl":"/trip_det/49?comment=61"}	2024-01-25 03:06:38.366-06	t	f	2023-12-25 03:06:38.366-06	2023-12-26 23:22:11.799-06
773	4	10	52	comment-like	{"likerUsername":"jay","text":" has liked your comment.","likerUrl":"/public_profile/jay","entityUrl":"/trip_det/18?comment=52"}	2024-01-25 03:20:42.67-06	t	f	2023-12-25 03:20:42.67-06	2023-12-26 23:22:11.799-06
790	10	25	\N	trip-access-granted	{"text":" has given you access to their trip.","username":"tom","entityUrl":"http://localhost:3000/trip_det/53","url":"/public_profile/tom"}	2024-02-04 20:54:09.11-06	t	f	2024-01-04 20:54:09.11-06	2024-01-04 20:54:23.401-06
791	10	25	\N	travelog-access-granted	{"text":" has given you access to their travelog.","username":"tom","entityUrl":"http://localhost:3000/trav_det/50","url":"/public_profile/tom"}	2024-02-04 20:56:29.94-06	t	f	2024-01-04 20:56:29.94-06	2024-01-04 20:57:20.174-06
788	10	122	\N	comment	{"username":"tom","text":"commented on your travelog/trip.","url":"/travelog/67"}	2024-02-04 14:24:10.301-06	t	f	2024-01-04 14:24:10.301-06	2024-01-08 23:12:48.009-06
789	10	122	\N	comment	{"username":"tom","text":"commented on your travelog/trip.","url":"/travelog/67"}	2024-02-04 14:24:18.164-06	t	f	2024-01-04 14:24:18.164-06	2024-01-08 23:12:48.009-06
797	10	122	\N	comment	{"username":"tom","text":"commented on your travelog/trip.","url":"/travelog/92"}	2024-02-08 23:14:34.36-06	f	f	2024-01-08 23:14:34.36-06	2024-01-08 23:14:34.36-06
798	121	10	\N	travelog-like	{"likerUsername":"Henry","text":" has liked your travelog.","likerUrl":"/public_profile/Henry","entityUrl":"/trav_det/93"}	2024-02-10 01:49:35.589-06	t	f	2024-01-10 01:49:35.589-06	2024-01-10 02:22:36.341-06
799	121	10	\N	travelog-like	{"likerUsername":"Henry","text":" has liked your travelog.","likerUrl":"/public_profile/Henry","entityUrl":"/trav_det/93"}	2024-02-10 01:51:13.651-06	t	f	2024-01-10 01:51:13.651-06	2024-01-10 02:22:36.341-06
800	121	10	\N	image-like	{"likerUsername":"Henry","text":" has liked your image.","likerUrl":"/public_profile/Henry","entityUrl":"/trav_det/93?image=124"}	2024-02-10 01:59:11.841-06	t	f	2024-01-10 01:59:11.841-06	2024-01-10 02:22:36.341-06
801	121	10	\N	travelog-like	{"likerUsername":"Henry","text":" has liked your travelog.","likerUrl":"/public_profile/Henry","entityUrl":"/trav_det/93"}	2024-02-10 02:06:39.481-06	t	f	2024-01-10 02:06:39.481-06	2024-01-10 02:22:36.341-06
802	121	10	\N	travelog-like	{"likerUsername":"Henry","text":" has liked your travelog.","likerUrl":"/public_profile/Henry","entityUrl":"/trav_det/93"}	2024-02-10 02:07:35.811-06	t	f	2024-01-10 02:07:35.811-06	2024-01-10 02:22:36.341-06
804	4	10	\N	trip	{"likerUsername":"jay","text":" has liked your writing.","likerUrl":"/public_profile/jay","entityUrl":"/trip_det/52"}	2024-02-10 02:11:26.83-06	t	f	2024-01-10 02:11:26.83-06	2024-01-10 02:22:36.341-06
805	4	10	\N	trip	{"likerUsername":"jay","text":" has liked your trip as educational.","likerUrl":"/public_profile/jay","entityUrl":"/trip_det/52"}	2024-02-10 02:11:27.121-06	t	f	2024-01-10 02:11:27.121-06	2024-01-10 02:22:36.341-06
806	4	10	\N	trip	{"likerUsername":"jay","text":" has liked your trip.","likerUrl":"/public_profile/jay","entityUrl":"/trip_det/52"}	2024-02-10 02:16:19.032-06	t	f	2024-01-10 02:16:19.032-06	2024-01-10 02:22:36.341-06
807	4	10	\N	trip	{"likerUsername":"jay","text":" has liked your writing.","likerUrl":"/public_profile/jay","entityUrl":"/trip_det/52"}	2024-02-10 02:16:19.356-06	t	f	2024-01-10 02:16:19.356-06	2024-01-10 02:22:36.341-06
808	4	10	\N	trip	{"likerUsername":"jay","text":" has liked your trip as educational.","likerUrl":"/public_profile/jay","entityUrl":"/trip_det/52"}	2024-02-10 02:16:19.627-06	t	f	2024-01-10 02:16:19.627-06	2024-01-10 02:22:36.341-06
809	4	10	\N	image-like	{"likerUsername":"jay","text":" has liked your image.","likerUrl":"/public_profile/jay","entityUrl":"/trav_det/86?image=117"}	2024-02-10 02:19:56.76-06	t	f	2024-01-10 02:19:56.76-06	2024-01-10 02:22:36.341-06
810	10	10	\N	comment	{"username":"tom","text":"commented on your travelog/trip.","url":"/travelog/86"}	2024-02-10 02:20:19.312-06	t	f	2024-01-10 02:20:19.312-06	2024-01-10 02:22:36.341-06
813	4	10	77	comment-like	{"likerUsername":"jay","text":" has liked your comment.","likerUrl":"/public_profile/jay","entityUrl":"/trav_det/86?comment=77"}	2024-02-10 02:21:49.812-06	t	f	2024-01-10 02:21:49.812-06	2024-01-10 02:22:36.341-06
776	4	17	73	comment-like	{"likerUsername":"jay","text":" has liked your comment.","likerUrl":"/public_profile/jay","entityUrl":"/trip_det/42?comment=73"}	2024-01-25 03:22:01.967-06	t	f	2023-12-25 03:22:01.967-06	2024-01-10 02:22:46.93-06
777	120	17	73	comment-like	{"likerUsername":"inky","text":" has liked your comment.","likerUrl":"/public_profile/inky","entityUrl":"/trip_det/42?comment=73"}	2024-01-25 03:23:25.532-06	t	f	2023-12-25 03:23:25.532-06	2024-01-10 02:22:46.93-06
821	10	122	\N	travelog-like	{"likerUsername":"tom","text":" has liked your travelog.","likerUrl":"/public_profile/tom","entityUrl":"/trav_det/70"}	2024-02-10 13:34:00.688-06	f	f	2024-01-10 13:34:00.688-06	2024-01-10 13:34:00.688-06
822	10	122	\N	travelog-like	{"likerUsername":"tom","text":" has liked your travelog.","likerUrl":"/public_profile/tom","entityUrl":"/trav_det/70"}	2024-02-10 13:34:00.996-06	f	f	2024-01-10 13:34:00.996-06	2024-01-10 13:34:00.997-06
823	10	122	\N	travelog-like	{"likerUsername":"tom","text":" has liked your travelog.","likerUrl":"/public_profile/tom","entityUrl":"/trav_det/70"}	2024-02-10 13:34:01.369-06	f	f	2024-01-10 13:34:01.369-06	2024-01-10 13:34:01.369-06
824	10	122	\N	travelog-like	{"likerUsername":"tom","text":" has liked your travelog.","likerUrl":"/public_profile/tom","entityUrl":"/trav_det/70"}	2024-02-10 13:34:01.669-06	f	f	2024-01-10 13:34:01.669-06	2024-01-10 13:34:01.669-06
825	10	122	\N	travelog-like	{"likerUsername":"tom","text":" has liked your travelog.","likerUrl":"/public_profile/tom","entityUrl":"/trav_det/70"}	2024-02-10 13:34:01.992-06	f	f	2024-01-10 13:34:01.993-06	2024-01-10 13:34:01.993-06
782	25	4	68	comment-like	{"likerUsername":"kebab","text":" has liked your comment.","likerUrl":"/public_profile/kebab","entityUrl":"/trip_det/18?comment=68"}	2024-01-25 03:30:40.665-06	t	f	2023-12-25 03:30:40.673-06	2024-01-10 14:32:54.507-06
826	4	10	\N	comment	{"username":"jay","text":"commented on your travelog/trip.","url":"/travelog/98"}	2024-02-10 14:28:46.597-06	t	f	2024-01-10 14:28:46.597-06	2024-01-10 14:39:02.313-06
827	4	10	\N	comment	{"username":"jay","text":"commented on your travelog/trip.","url":"/travelog/98"}	2024-02-10 14:28:54.755-06	t	f	2024-01-10 14:28:54.755-06	2024-01-10 14:39:02.313-06
828	4	10	\N	comment	{"username":"jay","text":"commented on your travelog/trip.","url":"/travelog/98"}	2024-02-10 14:29:02.13-06	t	f	2024-01-10 14:29:02.13-06	2024-01-10 14:39:02.313-06
829	122	10	\N	image-like	{"likerUsername":"Michael","text":" has liked your image.","likerUrl":"/public_profile/Michael","entityUrl":"/trav_det/93?image=135"}	2024-02-11 01:45:30.225-06	t	f	2024-01-11 01:45:30.226-06	2024-01-11 14:31:04.858-06
830	122	10	\N	image-like	{"likerUsername":"Michael","text":" has liked your image.","likerUrl":"/public_profile/Michael","entityUrl":"/trav_det/93?image=140"}	2024-02-11 01:52:37.009-06	t	f	2024-01-11 01:52:37.009-06	2024-01-11 14:31:04.858-06
831	122	10	\N	image-like	{"likerUsername":"Michael","text":" has liked your image.","likerUrl":"/public_profile/Michael","entityUrl":"/trav_det/93?image=141"}	2024-02-11 01:52:37.542-06	t	f	2024-01-11 01:52:37.542-06	2024-01-11 14:31:04.858-06
832	122	10	\N	image-like	{"likerUsername":"Michael","text":" has liked your image.","likerUrl":"/public_profile/Michael","entityUrl":"/trav_det/93?image=143"}	2024-02-11 04:13:38.327-06	t	f	2024-01-11 04:13:38.327-06	2024-01-11 14:31:04.858-06
814	4	17	\N	profile-like	{"likerUsername":"jay","text":" has liked your profile for great photography.","likerUrl":"/public_profile/jay","entityUrl":"/public_profile/eva"}	2024-02-10 02:24:34.668-06	t	f	2024-01-10 02:24:34.668-06	2024-01-11 14:40:16.268-06
815	4	17	\N	profile-like	{"likerUsername":"jay","text":" has liked your profile for great writing.","likerUrl":"/public_profile/jay","entityUrl":"/public_profile/eva"}	2024-02-10 02:24:34.942-06	t	f	2024-01-10 02:24:34.942-06	2024-01-11 14:40:16.268-06
833	10	10	\N	comment	{"username":"tom","text":"commented on your travelog/trip.","url":"/travelog/100"}	2024-02-11 22:53:24.582-06	t	f	2024-01-11 22:53:24.582-06	2024-01-12 00:09:16.026-06
834	10	10	\N	comment	{"username":"tom","text":"commented on your travelog/trip.","url":"/travelog/100"}	2024-02-11 22:53:31.39-06	t	f	2024-01-11 22:53:31.39-06	2024-01-12 00:09:16.026-06
835	4	10	\N	travelog-like	{"likerUsername":"jay","text":" has liked your travelog.","likerUrl":"/public_profile/jay","entityUrl":"/trav_det/100"}	2024-02-11 22:58:18.479-06	t	f	2024-01-11 22:58:18.479-06	2024-01-12 00:09:16.026-06
836	4	10	\N	image-like	{"likerUsername":"jay","text":" has liked your image.","likerUrl":"/public_profile/jay","entityUrl":"/trav_det/100?image=154"}	2024-02-11 22:58:27.433-06	t	f	2024-01-11 22:58:27.433-06	2024-01-12 00:09:16.026-06
837	4	10	\N	travelog-like	{"likerUsername":"jay","text":" has liked your travelog.","likerUrl":"/public_profile/jay","entityUrl":"/trav_det/100"}	2024-02-11 23:09:15.192-06	t	f	2024-01-11 23:09:15.192-06	2024-01-12 00:09:16.026-06
840	17	122	\N	comment	{"username":"eva","text":"commented on your travelog/trip.","url":"/trip/54"}	2024-02-12 00:33:08.523-06	f	f	2024-01-12 00:33:08.523-06	2024-01-12 00:33:08.524-06
841	10	122	\N	comment	{"username":"tom","text":"commented on your travelog/trip.","url":"/trip/54"}	2024-02-12 00:33:24.756-06	f	f	2024-01-12 00:33:24.756-06	2024-01-12 00:33:24.756-06
842	4	18	\N	profile-like	{"likerUsername":"jay","text":" has liked your profile for great writing.","likerUrl":"/public_profile/jay","entityUrl":"/public_profile/henry"}	2024-02-12 23:08:04.076-06	f	f	2024-01-12 23:08:04.076-06	2024-01-12 23:08:04.077-06
843	4	18	\N	profile-like	{"likerUsername":"jay","text":" has liked your profile for great photography.","likerUrl":"/public_profile/jay","entityUrl":"/public_profile/henry"}	2024-02-12 23:08:04.449-06	f	f	2024-01-12 23:08:04.45-06	2024-01-12 23:08:04.45-06
838	17	121	\N	comment	{"username":"eva","text":"commented on your travelog/trip.","url":"/travelog/97"}	2024-02-12 00:29:01.847-06	t	f	2024-01-12 00:29:01.847-06	2024-01-12 23:17:23.552-06
839	10	121	\N	comment	{"username":"tom","text":"commented on your travelog/trip.","url":"/travelog/97"}	2024-02-12 00:29:32.076-06	t	f	2024-01-12 00:29:32.076-06	2024-01-12 23:17:23.552-06
846	4	121	\N	profile-like	{"likerUsername":"jay","text":" has liked your profile for great photography.","likerUrl":"/public_profile/jay","entityUrl":"/public_profile/Henry"}	2024-02-12 23:13:57.021-06	t	f	2024-01-12 23:13:57.021-06	2024-01-12 23:17:23.552-06
847	4	121	\N	profile-like	{"likerUsername":"jay","text":" has liked your profile for great writing.","likerUrl":"/public_profile/jay","entityUrl":"/public_profile/Henry"}	2024-02-12 23:13:58.147-06	t	f	2024-01-12 23:13:58.147-06	2024-01-12 23:17:23.552-06
848	121	121	\N	comment	{"username":"Henry","text":"commented on your travelog/trip.","url":"/travelog/96"}	2024-02-12 23:23:38.212-06	t	f	2024-01-12 23:23:38.212-06	2024-01-12 23:44:55.39-06
849	4	121	\N	comment	{"username":"jay","text":"commented on your travelog/trip.","url":"/travelog/96"}	2024-02-12 23:23:54.802-06	t	f	2024-01-12 23:23:54.802-06	2024-01-12 23:44:55.39-06
850	121	121	\N	comment	{"username":"Henry","text":"commented on your travelog/trip.","url":"/travelog/96"}	2024-02-12 23:26:20.617-06	t	f	2024-01-12 23:26:20.617-06	2024-01-12 23:44:55.39-06
851	4	121	\N	comment	{"username":"jay","text":"commented on your travelog/trip.","url":"/travelog/96"}	2024-02-12 23:26:27.554-06	t	f	2024-01-12 23:26:27.554-06	2024-01-12 23:44:55.39-06
852	121	121	\N	comment	{"username":"Henry","text":"commented on your travelog/trip.","url":"/travelog/96"}	2024-02-12 23:28:18.635-06	t	f	2024-01-12 23:28:18.635-06	2024-01-12 23:44:55.39-06
853	4	121	\N	comment	{"username":"jay","text":"commented on your travelog/trip.","url":"/travelog/96"}	2024-02-12 23:28:35.682-06	t	f	2024-01-12 23:28:35.682-06	2024-01-12 23:44:55.39-06
854	4	121	\N	comment	{"username":"jay","text":"commented on your travelog/trip.","url":"/travelog/96"}	2024-02-12 23:28:46.301-06	t	f	2024-01-12 23:28:46.301-06	2024-01-12 23:44:55.39-06
855	121	121	\N	comment	{"username":"Henry","text":"commented on your travelog/trip.","url":"/travelog/96"}	2024-02-12 23:35:18.32-06	t	f	2024-01-12 23:35:18.32-06	2024-01-12 23:44:55.39-06
856	121	121	\N	comment	{"username":"Henry","text":"commented on your travelog/trip.","url":"/travelog/96"}	2024-02-12 23:36:33.944-06	t	f	2024-01-12 23:36:33.944-06	2024-01-12 23:44:55.39-06
857	121	121	\N	comment	{"username":"Henry","text":"commented on your travelog/trip.","url":"/travelog/96"}	2024-02-12 23:37:41.353-06	t	f	2024-01-12 23:37:41.353-06	2024-01-12 23:44:55.39-06
858	121	121	\N	comment	{"username":"Henry","text":"commented on your travelog/trip.","url":"/travelog/96"}	2024-02-12 23:37:48.546-06	t	f	2024-01-12 23:37:48.546-06	2024-01-12 23:44:55.39-06
859	121	121	\N	comment	{"username":"Henry","text":"commented on your travelog/trip.","url":"/travelog/96"}	2024-02-12 23:37:56.25-06	t	f	2024-01-12 23:37:56.25-06	2024-01-12 23:44:55.39-06
860	4	121	\N	comment	{"username":"jay","text":"commented on your travelog/trip.","url":"/travelog/96"}	2024-02-12 23:38:24.395-06	t	f	2024-01-12 23:38:24.395-06	2024-01-12 23:44:55.39-06
861	121	121	\N	comment	{"username":"Henry","text":"commented on your travelog/trip.","url":"/travelog/96"}	2024-02-12 23:39:19.506-06	t	f	2024-01-12 23:39:19.506-06	2024-01-12 23:44:55.39-06
862	121	121	\N	comment	{"username":"Henry","text":"commented on your travelog/trip.","url":"/travelog/96"}	2024-02-12 23:39:25.417-06	t	f	2024-01-12 23:39:25.417-06	2024-01-12 23:44:55.39-06
863	4	121	\N	image-like	{"likerUsername":"jay","text":" has liked your image.","likerUrl":"/public_profile/jay","entityUrl":"/trav_det/97?image=128"}	2024-02-13 00:20:13.896-06	t	f	2024-01-13 00:20:13.896-06	2024-01-13 00:20:33.007-06
864	4	121	\N	image-like	{"likerUsername":"jay","text":" has liked your image.","likerUrl":"/public_profile/jay","entityUrl":"/trav_det/97?image=128"}	2024-02-13 00:21:20.481-06	t	f	2024-01-13 00:21:20.481-06	2024-01-13 00:49:01.148-06
865	4	121	\N	image-like	{"likerUsername":"jay","text":" has liked your image.","likerUrl":"/public_profile/jay","entityUrl":"/trav_det/97?image=128"}	2024-02-13 00:21:50.715-06	t	f	2024-01-13 00:21:50.715-06	2024-01-13 00:49:01.148-06
866	4	121	\N	image-like	{"likerUsername":"jay","text":" has liked your image.","likerUrl":"/public_profile/jay","entityUrl":"/trav_det/97?image=128"}	2024-02-13 00:28:37.244-06	t	f	2024-01-13 00:28:37.244-06	2024-01-13 00:49:01.148-06
\.


--
-- Data for Name: permissions; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.permissions (permission_id, granter_id, grantee_id, trip_id, travelog_id, created_at, updated_at) FROM stdin;
23	10	25	15	\N	2023-12-06 01:09:51.803-06	2023-12-06 01:09:51.803-06
24	10	4	\N	54	2023-12-06 01:10:09.027-06	2023-12-06 01:10:09.027-06
26	10	120	\N	52	2023-12-13 04:03:00.179-06	2023-12-13 04:03:00.179-06
27	10	120	\N	52	2023-12-13 04:03:08.897-06	2023-12-13 04:03:08.897-06
28	10	25	53	\N	2024-01-04 20:54:08.997-06	2024-01-04 20:54:08.997-06
29	10	25	\N	50	2024-01-04 20:56:29.849-06	2024-01-04 20:56:29.849-06
\.


--
-- Data for Name: profile_likes; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.profile_likes (like_id, user_id, liker_id, liketype, created_at, updated_at) FROM stdin;
133	4	123	photography	2023-12-07 06:18:32.368-06	2023-12-07 06:18:32.368-06
134	4	123	writing	2023-12-07 06:18:32.864-06	2023-12-07 06:18:32.864-06
135	20	123	photography	2023-12-07 06:19:30.795-06	2023-12-07 06:19:30.795-06
136	20	123	writing	2023-12-07 06:19:31.034-06	2023-12-07 06:19:31.034-06
139	10	19	photography	2023-12-07 15:04:39.473-06	2023-12-07 15:04:39.473-06
142	10	19	writing	2023-12-07 15:15:03.871-06	2023-12-07 15:15:03.871-06
143	10	25	writing	2023-12-07 15:20:31.345-06	2023-12-07 15:20:31.345-06
146	4	10	photography	2023-12-08 23:22:18.723-06	2023-12-08 23:22:18.723-06
147	4	10	writing	2023-12-08 23:22:19.531-06	2023-12-08 23:22:19.531-06
148	120	10	photography	2023-12-12 20:38:58.503-06	2023-12-12 20:38:58.503-06
149	120	10	writing	2023-12-12 20:38:59.074-06	2023-12-12 20:38:59.074-06
150	120	4	photography	2023-12-13 04:42:22.818-06	2023-12-13 04:42:22.818-06
151	120	4	writing	2023-12-13 04:42:23.19-06	2023-12-13 04:42:23.19-06
154	10	4	photography	2023-12-13 10:14:02.713-06	2023-12-13 10:14:02.713-06
155	10	4	writing	2023-12-13 10:14:03.19-06	2023-12-13 10:14:03.19-06
156	10	122	photography	2023-12-13 10:14:51.911-06	2023-12-13 10:14:51.911-06
157	10	122	writing	2023-12-13 10:14:52.327-06	2023-12-13 10:14:52.327-06
158	120	122	photography	2023-12-13 10:16:40.261-06	2023-12-13 10:16:40.261-06
159	120	122	writing	2023-12-13 10:16:40.65-06	2023-12-13 10:16:40.65-06
161	120	25	photography	2023-12-13 10:20:27.196-06	2023-12-13 10:20:27.196-06
162	120	25	writing	2023-12-13 10:20:27.527-06	2023-12-13 10:20:27.527-06
163	10	20	photography	2023-12-13 10:47:29.52-06	2023-12-13 10:47:29.52-06
164	10	20	writing	2023-12-13 10:47:29.774-06	2023-12-13 10:47:29.774-06
165	122	20	photography	2023-12-13 10:48:00.214-06	2023-12-13 10:48:00.214-06
166	122	20	writing	2023-12-13 10:48:00.503-06	2023-12-13 10:48:00.503-06
167	25	122	photography	2023-12-13 11:15:44.823-06	2023-12-13 11:15:44.823-06
168	25	122	writing	2023-12-13 11:15:45.122-06	2023-12-13 11:15:45.122-06
173	25	120	photography	2023-12-13 12:28:12.688-06	2023-12-13 12:28:12.688-06
174	25	120	writing	2023-12-13 12:28:12.993-06	2023-12-13 12:28:12.993-06
175	10	120	writing	2023-12-23 01:08:03.291-06	2023-12-23 01:08:03.291-06
176	17	4	photography	2024-01-10 02:24:34.66-06	2024-01-10 02:24:34.66-06
177	17	4	writing	2024-01-10 02:24:34.935-06	2024-01-10 02:24:34.935-06
178	18	4	writing	2024-01-12 23:08:04.068-06	2024-01-12 23:08:04.068-06
179	18	4	photography	2024-01-12 23:08:04.444-06	2024-01-12 23:08:04.444-06
182	121	4	photography	2024-01-12 23:13:57.004-06	2024-01-12 23:13:57.004-06
183	121	4	writing	2024-01-12 23:13:58.141-06	2024-01-12 23:13:58.141-06
\.


--
-- Data for Name: ratings; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.ratings (rating_id, user_id, travelog_id, rating_color, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: suspensions; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.suspensions (id, user_email, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: tip_tap_contents; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.tip_tap_contents (id, content, created_at, updated_at) FROM stdin;
1	"<p><strong>Bold</strong><br><em>Italic</em><br><u>Underline</u><br><span style=\\"font-size: 21px\\">Size</span><br><a target=\\"_blank\\" rel=\\"noopener noreferrer nofollow\\" href=\\"http://Disney.com\\"><span style=\\"font-size: 21px\\">Link</span></a><br>Emoji: 😀</p>"	2023-11-17 04:41:01.329-06	2023-11-17 04:41:01.329-06
2	"<p>Hoohah</p>"	2023-11-17 04:53:13.567-06	2023-11-17 04:53:13.567-06
3	"<p><strong>ASDFASDFADSF</strong></p>"	2023-11-17 20:58:55.559-06	2023-11-17 20:58:55.559-06
4	"<p>asdfadsf</p>"	2023-11-17 23:22:37.167-06	2023-11-17 23:22:37.167-06
\.


--
-- Data for Name: trav_likes; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.trav_likes (like_id, user_id, liker_id, liketype, travelog_id, created_at, updated_at) FROM stdin;
99	10	25	traveled	38	2023-12-03 02:12:53.461-06	2023-12-03 02:12:53.461-06
100	10	25	retraveled	38	2023-12-03 02:12:53.859-06	2023-12-03 02:12:53.859-06
101	10	25	informative	38	2023-12-03 02:12:54.154-06	2023-12-03 02:12:54.154-06
102	4	123	want-to-travel	60	2023-12-07 06:18:47.431-06	2023-12-07 06:18:47.431-06
103	4	123	traveled	60	2023-12-07 06:18:47.863-06	2023-12-07 06:18:47.863-06
104	4	123	retraveled	60	2023-12-07 06:18:48.317-06	2023-12-07 06:18:48.317-06
105	4	123	informative	60	2023-12-07 06:18:48.662-06	2023-12-07 06:18:48.662-06
111	10	19	want-to-travel	54	2023-12-07 14:35:34.382-06	2023-12-07 14:35:34.382-06
112	10	19	traveled	54	2023-12-07 14:35:34.398-06	2023-12-07 14:35:34.398-06
113	10	19	retraveled	54	2023-12-07 14:35:34.439-06	2023-12-07 14:35:34.439-06
114	10	19	informative	54	2023-12-07 14:35:34.449-06	2023-12-07 14:35:34.449-06
115	17	19	want-to-travel	73	2023-12-07 14:44:08.71-06	2023-12-07 14:44:08.71-06
116	17	19	traveled	73	2023-12-07 14:44:08.715-06	2023-12-07 14:44:08.715-06
117	17	19	retraveled	73	2023-12-07 14:44:08.763-06	2023-12-07 14:44:08.763-06
118	17	19	informative	73	2023-12-07 14:44:08.765-06	2023-12-07 14:44:08.765-06
123	10	19	want-to-travel	38	2023-12-07 15:19:45.391-06	2023-12-07 15:19:45.391-06
124	10	19	traveled	38	2023-12-07 15:19:45.759-06	2023-12-07 15:19:45.759-06
125	10	19	retraveled	38	2023-12-07 15:19:46.124-06	2023-12-07 15:19:46.124-06
126	10	19	informative	38	2023-12-07 15:19:46.567-06	2023-12-07 15:19:46.567-06
128	122	10	want-to-travel	68	2023-12-08 11:08:04.098-06	2023-12-08 11:08:04.098-06
129	122	10	traveled	68	2023-12-08 11:08:04.48-06	2023-12-08 11:08:04.48-06
130	122	10	retraveled	68	2023-12-08 11:08:04.992-06	2023-12-08 11:08:04.992-06
131	122	10	informative	68	2023-12-08 11:08:05.476-06	2023-12-08 11:08:05.476-06
133	122	10	writing	68	2023-12-08 11:14:54.747-06	2023-12-08 11:14:54.747-06
134	122	123	writing	68	2023-12-08 11:18:55.608-06	2023-12-08 11:18:55.608-06
135	122	123	want-to-travel	68	2023-12-08 11:27:10.685-06	2023-12-08 11:27:10.685-06
136	122	123	traveled	68	2023-12-08 11:27:10.991-06	2023-12-08 11:27:10.991-06
137	122	123	retraveled	68	2023-12-08 11:27:11.37-06	2023-12-08 11:27:11.37-06
138	122	123	informative	68	2023-12-08 11:27:11.804-06	2023-12-08 11:27:11.804-06
139	4	10	want-to-travel	60	2023-12-08 23:22:27.883-06	2023-12-08 23:22:27.883-06
140	4	10	traveled	60	2023-12-08 23:22:28.241-06	2023-12-08 23:22:28.241-06
141	4	10	retraveled	60	2023-12-08 23:22:28.706-06	2023-12-08 23:22:28.706-06
142	4	10	writing	60	2023-12-08 23:22:29.123-06	2023-12-08 23:22:29.123-06
143	4	10	informative	60	2023-12-08 23:22:29.52-06	2023-12-08 23:22:29.52-06
144	35	10	want-to-travel	42	2023-12-12 20:43:18.629-06	2023-12-12 20:43:18.629-06
145	35	10	traveled	42	2023-12-12 20:43:19.395-06	2023-12-12 20:43:19.395-06
146	35	10	retraveled	42	2023-12-12 20:43:20.199-06	2023-12-12 20:43:20.199-06
147	35	10	writing	42	2023-12-12 20:43:21.006-06	2023-12-12 20:43:21.006-06
148	35	10	informative	42	2023-12-12 20:43:21.857-06	2023-12-12 20:43:21.857-06
154	10	25	want-to-travel	38	2023-12-12 21:17:47.17-06	2023-12-12 21:17:47.17-06
155	25	122	want-to-travel	90	2023-12-13 11:17:27.297-06	2023-12-13 11:17:27.297-06
156	25	122	traveled	90	2023-12-13 11:17:27.765-06	2023-12-13 11:17:27.765-06
157	25	122	retraveled	90	2023-12-13 11:17:28.152-06	2023-12-13 11:17:28.152-06
158	25	122	writing	90	2023-12-13 11:17:28.617-06	2023-12-13 11:17:28.617-06
159	25	122	informative	90	2023-12-13 11:17:28.974-06	2023-12-13 11:17:28.974-06
160	10	25	want-to-travel	88	2023-12-13 23:13:48.176-06	2023-12-13 23:13:48.176-06
161	10	25	retraveled	88	2023-12-13 23:13:48.815-06	2023-12-13 23:13:48.815-06
162	10	25	informative	88	2023-12-13 23:13:49.582-06	2023-12-13 23:13:49.582-06
163	10	42	traveled	88	2023-12-13 23:14:01.074-06	2023-12-13 23:14:01.074-06
164	10	42	writing	88	2023-12-13 23:14:01.8-06	2023-12-13 23:14:01.8-06
165	10	42	want-to-travel	88	2023-12-13 23:14:02.524-06	2023-12-13 23:14:02.524-06
166	10	120	retraveled	88	2023-12-13 23:14:17.49-06	2023-12-13 23:14:17.49-06
167	10	120	informative	88	2023-12-13 23:14:18.259-06	2023-12-13 23:14:18.259-06
168	10	120	traveled	88	2023-12-13 23:14:19.122-06	2023-12-13 23:14:19.122-06
169	10	121	want-to-travel	88	2023-12-13 23:14:34.601-06	2023-12-13 23:14:34.601-06
170	10	121	traveled	88	2023-12-13 23:14:35.041-06	2023-12-13 23:14:35.041-06
171	10	121	retraveled	88	2023-12-13 23:14:35.52-06	2023-12-13 23:14:35.52-06
172	10	121	writing	88	2023-12-13 23:14:35.899-06	2023-12-13 23:14:35.899-06
173	10	121	informative	88	2023-12-13 23:14:36.284-06	2023-12-13 23:14:36.284-06
174	10	25	traveled	39	2023-12-22 23:25:52.349-06	2023-12-22 23:25:52.349-06
175	10	25	want-to-travel	39	2023-12-23 00:02:48.236-06	2023-12-23 00:02:48.236-06
176	10	25	retraveled	39	2023-12-23 00:03:05.125-06	2023-12-23 00:03:05.125-06
177	20	25	want-to-travel	89	2023-12-23 00:26:26.728-06	2023-12-23 00:26:26.728-06
178	20	25	traveled	89	2023-12-23 00:26:27.012-06	2023-12-23 00:26:27.012-06
179	20	25	retraveled	89	2023-12-23 00:26:27.443-06	2023-12-23 00:26:27.443-06
180	122	25	want-to-travel	68	2023-12-23 00:33:54.276-06	2023-12-23 00:33:54.276-06
181	122	25	traveled	68	2023-12-23 00:33:54.656-06	2023-12-23 00:33:54.656-06
182	122	25	retraveled	68	2023-12-23 00:33:55.036-06	2023-12-23 00:33:55.036-06
183	123	25	want-to-travel	64	2023-12-23 00:33:58.158-06	2023-12-23 00:33:58.158-06
184	123	25	traveled	64	2023-12-23 00:33:58.595-06	2023-12-23 00:33:58.595-06
185	123	25	retraveled	64	2023-12-23 00:33:58.956-06	2023-12-23 00:33:58.956-06
186	122	20	want-to-travel	68	2023-12-23 00:34:41.765-06	2023-12-23 00:34:41.765-06
187	122	20	traveled	68	2023-12-23 00:34:42.282-06	2023-12-23 00:34:42.282-06
188	122	20	retraveled	68	2023-12-23 00:34:42.493-06	2023-12-23 00:34:42.493-06
189	123	20	want-to-travel	64	2023-12-23 00:34:45.46-06	2023-12-23 00:34:45.46-06
190	123	20	traveled	64	2023-12-23 00:34:45.841-06	2023-12-23 00:34:45.841-06
191	123	20	retraveled	64	2023-12-23 00:34:46.191-06	2023-12-23 00:34:46.191-06
192	122	20	writing	68	2023-12-23 01:01:54.22-06	2023-12-23 01:01:54.22-06
193	10	122	want-to-travel	77	2023-12-24 00:00:45.067-06	2023-12-24 00:00:45.067-06
194	10	122	traveled	77	2023-12-24 00:00:45.462-06	2023-12-24 00:00:45.462-06
195	10	122	retraveled	77	2023-12-24 00:00:45.836-06	2023-12-24 00:00:45.836-06
196	10	122	want-to-travel	78	2023-12-24 00:01:13.194-06	2023-12-24 00:01:13.194-06
197	10	122	traveled	78	2023-12-24 00:01:13.513-06	2023-12-24 00:01:13.513-06
198	10	122	retraveled	78	2023-12-24 00:01:13.774-06	2023-12-24 00:01:13.774-06
199	10	25	want-to-travel	78	2023-12-24 00:05:26.816-06	2023-12-24 00:05:26.816-06
200	10	25	traveled	78	2023-12-24 00:05:27.208-06	2023-12-24 00:05:27.208-06
201	10	25	retraveled	78	2023-12-24 00:05:27.604-06	2023-12-24 00:05:27.604-06
202	10	25	want-to-travel	93	2023-12-24 00:08:04.703-06	2023-12-24 00:08:04.703-06
203	10	25	retraveled	93	2023-12-24 00:08:05.499-06	2023-12-24 00:08:05.499-06
204	10	25	traveled	93	2023-12-24 00:08:06.168-06	2023-12-24 00:08:06.168-06
205	10	120	want-to-travel	93	2023-12-24 00:08:16.798-06	2023-12-24 00:08:16.798-06
206	10	120	traveled	93	2023-12-24 00:08:18.931-06	2023-12-24 00:08:18.931-06
207	10	120	retraveled	93	2023-12-24 00:08:19.231-06	2023-12-24 00:08:19.231-06
208	10	4	want-to-travel	93	2023-12-24 00:08:29.284-06	2023-12-24 00:08:29.284-06
209	10	4	traveled	93	2023-12-24 00:08:29.657-06	2023-12-24 00:08:29.657-06
210	10	4	retraveled	93	2023-12-24 00:08:29.98-06	2023-12-24 00:08:29.98-06
211	123	4	want-to-travel	64	2023-12-24 00:25:25.122-06	2023-12-24 00:25:25.122-06
212	123	4	traveled	64	2023-12-24 00:25:25.474-06	2023-12-24 00:25:25.474-06
213	123	4	retraveled	64	2023-12-24 00:25:25.81-06	2023-12-24 00:25:25.81-06
214	122	4	want-to-travel	68	2023-12-24 00:25:45.794-06	2023-12-24 00:25:45.794-06
215	122	4	traveled	68	2023-12-24 00:25:46.097-06	2023-12-24 00:25:46.097-06
216	122	4	retraveled	68	2023-12-24 00:25:46.363-06	2023-12-24 00:25:46.363-06
217	4	10	want-to-travel	94	2023-12-24 00:38:42.923-06	2023-12-24 00:38:42.923-06
218	4	10	traveled	94	2023-12-24 00:38:43.216-06	2023-12-24 00:38:43.216-06
219	4	10	retraveled	94	2023-12-24 00:38:43.47-06	2023-12-24 00:38:43.47-06
220	10	120	want-to-travel	78	2023-12-24 00:39:25.227-06	2023-12-24 00:39:25.227-06
221	10	120	traveled	78	2023-12-24 00:39:25.542-06	2023-12-24 00:39:25.542-06
222	10	120	retraveled	78	2023-12-24 00:39:25.825-06	2023-12-24 00:39:25.825-06
223	4	120	traveled	94	2023-12-24 00:40:00.646-06	2023-12-24 00:40:00.646-06
224	4	120	retraveled	94	2023-12-24 00:40:00.978-06	2023-12-24 00:40:00.978-06
225	4	120	want-to-travel	94	2023-12-24 00:40:01.426-06	2023-12-24 00:40:01.426-06
226	10	4	informative	88	2023-12-24 00:54:38.398-06	2023-12-24 00:54:38.398-06
227	10	4	informative	51	2023-12-24 00:56:00.456-06	2023-12-24 00:56:00.456-06
242	122	10	want-to-travel	70	2024-01-10 13:34:00.681-06	2024-01-10 13:34:00.681-06
243	122	10	traveled	70	2024-01-10 13:34:00.99-06	2024-01-10 13:34:00.99-06
244	122	10	retraveled	70	2024-01-10 13:34:01.362-06	2024-01-10 13:34:01.362-06
245	122	10	writing	70	2024-01-10 13:34:01.661-06	2024-01-10 13:34:01.661-06
246	122	10	informative	70	2024-01-10 13:34:01.986-06	2024-01-10 13:34:01.986-06
247	10	4	want-to-travel	100	2024-01-11 22:58:18.47-06	2024-01-11 22:58:18.47-06
248	10	4	writing	100	2024-01-11 23:09:15.186-06	2024-01-11 23:09:15.186-06
\.


--
-- Data for Name: trip_likes; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.trip_likes (like_id, user_id, liker_id, liketype, trip_id, created_at, updated_at) FROM stdin;
35	10	25	trip	17	2023-11-29 23:23:39.446-06	2023-11-29 23:23:39.446-06
41	17	19	trip	43	2023-12-07 14:45:09.989-06	2023-12-07 14:45:09.989-06
42	10	19	trip	15	2023-12-07 15:14:48.64-06	2023-12-07 15:14:48.64-06
44	10	19	trip	19	2023-12-07 15:16:20.344-06	2023-12-07 15:16:20.344-06
48	10	25	trip	39	2023-12-08 03:50:28.692-06	2023-12-08 03:50:28.692-06
49	10	25	educational-trip	39	2023-12-08 03:50:29.122-06	2023-12-08 03:50:29.122-06
70	122	123	trip	45	2023-12-08 12:19:23.826-06	2023-12-08 12:19:23.826-06
71	122	123	writing	45	2023-12-08 12:19:24.122-06	2023-12-08 12:19:24.122-06
72	122	123	educational-trip	45	2023-12-08 12:19:24.508-06	2023-12-08 12:19:24.508-06
73	123	10	trip	44	2023-12-12 20:43:01.111-06	2023-12-12 20:43:01.111-06
74	123	10	writing	44	2023-12-12 20:43:02.145-06	2023-12-12 20:43:02.145-06
75	123	10	educational-trip	44	2023-12-12 20:43:02.928-06	2023-12-12 20:43:02.928-06
76	10	122	trip	49	2023-12-13 04:43:40.414-06	2023-12-13 04:43:40.414-06
77	10	122	writing	49	2023-12-13 04:43:40.778-06	2023-12-13 04:43:40.778-06
78	10	122	educational-trip	49	2023-12-13 04:43:42.024-06	2023-12-13 04:43:42.024-06
79	25	122	trip	50	2023-12-13 11:17:14.017-06	2023-12-13 11:17:14.017-06
80	25	122	writing	50	2023-12-13 11:17:14.396-06	2023-12-13 11:17:14.396-06
81	25	122	educational-trip	50	2023-12-13 11:17:14.856-06	2023-12-13 11:17:14.856-06
82	25	20	writing	50	2023-12-23 00:50:00.79-06	2023-12-23 00:50:00.79-06
83	10	4	educational-trip	39	2023-12-24 00:54:14.296-06	2023-12-24 00:54:14.296-06
84	10	4	educational-trip	32	2023-12-24 00:55:49.174-06	2023-12-24 00:55:49.174-06
85	25	4	trip	50	2023-12-25 03:16:24.205-06	2023-12-25 03:16:24.205-06
86	25	4	writing	50	2023-12-25 03:16:24.557-06	2023-12-25 03:16:24.557-06
87	25	4	educational-trip	50	2023-12-25 03:16:24.824-06	2023-12-25 03:16:24.824-06
91	10	4	trip	52	2024-01-10 02:16:19.025-06	2024-01-10 02:16:19.025-06
92	10	4	writing	52	2024-01-10 02:16:19.349-06	2024-01-10 02:16:19.349-06
93	10	4	educational-trip	52	2024-01-10 02:16:19.62-06	2024-01-10 02:16:19.62-06
\.


--
-- Name: banned_emails_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.banned_emails_id_seq', 24, true);


--
-- Name: blocks_block_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.blocks_block_id_seq', 18, true);


--
-- Name: comment_likes_like_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.comment_likes_like_id_seq', 99, true);


--
-- Name: comments_comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.comments_comment_id_seq', 101, true);


--
-- Name: email_verifications_verification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.email_verifications_verification_id_seq', 1, false);


--
-- Name: feedback_reports_report_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.feedback_reports_report_id_seq', 112, true);


--
-- Name: follows_follow_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.follows_follow_id_seq', 28, true);


--
-- Name: forbidden_words_word_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.forbidden_words_word_id_seq', 1, false);


--
-- Name: friendships_friendship_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.friendships_friendship_id_seq', 29, true);


--
-- Name: image_likes_like_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.image_likes_like_id_seq', 30, true);


--
-- Name: images_image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.images_image_id_seq', 155, true);


--
-- Name: indicators_indicator_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.indicators_indicator_id_seq', 28, true);


--
-- Name: interactions_interaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.interactions_interaction_id_seq', 1, false);


--
-- Name: maintenance_histories_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.maintenance_histories_history_id_seq', 28, true);


--
-- Name: maintenances_maintenance_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.maintenances_maintenance_id_seq', 41, true);


--
-- Name: messages_message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.messages_message_id_seq', 572, true);


--
-- Name: notifications_notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.notifications_notification_id_seq', 866, true);


--
-- Name: permissions_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.permissions_permission_id_seq', 29, true);


--
-- Name: profile_likes_like_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.profile_likes_like_id_seq', 183, true);


--
-- Name: ratings_rating_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.ratings_rating_id_seq', 1, false);


--
-- Name: suspensions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.suspensions_id_seq', 60, true);


--
-- Name: tip_tap_contents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.tip_tap_contents_id_seq', 4, true);


--
-- Name: trav_likes_like_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.trav_likes_like_id_seq', 248, true);


--
-- Name: travelogs_travelog_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.travelogs_travelog_id_seq', 101, true);


--
-- Name: trip_likes_like_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.trip_likes_like_id_seq', 93, true);


--
-- Name: trips_trip_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.trips_trip_id_seq', 55, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.users_user_id_seq', 129, true);


--
-- PostgreSQL database dump complete
--

