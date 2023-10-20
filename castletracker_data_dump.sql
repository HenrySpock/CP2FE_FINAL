--
-- PostgreSQL database dump
--

-- Dumped from database version 14.9 (Ubuntu 14.9-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.9 (Ubuntu 14.9-0ubuntu0.22.04.1)

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
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.users (user_id, first_name, last_name, username, email, password, security_question, answer, is_admin, created_at, updated_at, avatar, bio) FROM stdin;
5	bleh	bleh	bleh	bleh@bleh.com	$2a$10$igGcPiN1GttukCu99MR57..XqYLVvqtpDLqh6Nu0qKVWChQGx/h.W	What is the name of your first pet?	bleh	f	2023-10-19 00:14:32.432-05	2023-10-19 00:14:32.432-05	https://live.staticflickr.com/3557/3449041959_1bd9b05ac8_c.jpg	\N
7	jay	jay	jay	jay@jay.com	$2a$10$.koC/cHySl9WAFYCR/qQj..qZesktasZLyjNI/kDw.xwDkQ1tQP9.	What is the name of your first pet?	jay	t	2023-10-19 00:17:31.091-05	2023-10-19 00:17:31.091-05	https://live.staticflickr.com/3557/3449041959_1bd9b05ac8_c.jpg	\N
10	jay2	jay2	jay2	jay@jay.com	$2a$10$Poyx5357.0l/opsZ3K1R0u1VtFahcCfYd9FbcaAuVMWhMB3TOegTe	What is the name of your first pet?	jay	f	2023-10-19 00:22:16.39-05	2023-10-19 00:22:16.391-05	https://live.staticflickr.com/3557/3449041959_1bd9b05ac8_c.jpg	\N
12	jay	jay	jay3	jay@jay.com	$2a$10$PiJp/qCbqFLUkmgIU1zfw.7SrvOf4e/AEIcz1cVK7ckRyPv9uo2PS	What is the name of your first pet?	jay	f	2023-10-19 00:22:46.35-05	2023-10-19 00:22:46.35-05	https://live.staticflickr.com/3557/3449041959_1bd9b05ac8_c.jpg	\N
13	kerry	kerry	kerry	kerry@kerry.com	$2a$10$xQwvGhjFObKWAuJqe8HpTOlaL0I9Ks6pcvHoVIQjOsinrcQhRtO3C	What is the name of your first pet?	kerry	t	2023-10-19 00:27:02.095-05	2023-10-19 00:27:02.096-05	https://live.staticflickr.com/3557/3449041959_1bd9b05ac8_c.jpg	\N
15	kerry	kerry	kerry2	kerry@kerry.com	$2a$10$ydXyfRD41b5VbILjGSYeIO3jqlC8Cwzb8RGQDc2lkUakPfc14rRqu	What is the name of your first pet?	kerry	f	2023-10-19 00:27:24.888-05	2023-10-19 00:27:24.889-05	https://live.staticflickr.com/3557/3449041959_1bd9b05ac8_c.jpg	\N
16	ava	ava	ava	ava@ava.com	$2a$10$6udN48adiw/JFVyvLxdmnuFiMt5c8fEIlHpyERBJ3erc8/DMfJWFm	What is the name of your first pet?	ava	f	2023-10-19 05:03:10.16-05	2023-10-19 05:03:10.161-05	https://live.staticflickr.com/3557/3449041959_1bd9b05ac8_c.jpg	
17	eva	eva	eva	eva@eva.com	$2a$10$O4Isci8l7kfKaTyyDWLeg.egOkqROODgIKHq.bM4MrqL1hrAr869.	What is the name of your first pet?	eva	f	2023-10-19 05:06:01.278-05	2023-10-19 05:06:01.278-05	https://live.staticflickr.com/3557/3449041959_1bd9b05ac8_c.jpg	
18	avatar	avatar	avatar	avatar@avatar.com	$2a$10$bhxVRHn/EXJ6CtToZHmd/OAsrdM5QdrNs3nSjryuXWSedObxDPr9.	What is the name of your first pet?	avatar	f	2023-10-19 05:14:48.425-05	2023-10-19 06:29:56.476-05	https://www.medievalists.net/wp-content/uploads/2014/07/manuscript-images-medieval-castles.jpg	lOsl8wy8oFIwo29iUOtXZLdPEWPK1BtiIhGObsWRO8c7YFuYZKAP6hkDbLEy8S7AYxOzsTXcP08xjY79hDA66VX9v2k36ZpLvx7RAVWeCkkfG350Se1D1macegVE0Gq31UrwN4UktmkbF7OzXRajotyBV042LhnrHLVULzttkY2ew3ou79BY20eh1aYx76zWuBlVM3tjeXQIYLgrHnDy47dEA9LcBz6AsdOvmywuCEn8kQr0xxthmqQANo5X55BOk7Brrw6nCHz1AnzsSUy7IEIWZPK9dQ3o4ghLHzQDZzKWQPxDVqEYcS2nQsurOUOa327U5ywbIc8PIigjvGzCdFWrwdGXH55FHIB9bFB4wp6UmQuugeYZ3ewJIdrmXPVkMqF5KzCbIwU98PEQ8ydXNbsEZatdGPp5wQpnvrMRWSeR29rV2xH5sKg39CH05UT1VM5SMriYarjOPKUWmfLku7VJw1ySMmU9Qrk4W6bnRnZ2lJOuqwhQkhFVpMGDJkmLgjtM9UeedL2tGvuksGmDZaxXsBhuCxl204G5LVIt4Yo8k980oRUac9J3OiRsg55kAWiwstopQSG7g0lR8Vt9qsqQUeKnXsv2TLQ53hv8EBPnwXiP7UmVxxZnHpEGHwXhW30Z9KqKh6KzGPC0pFyokd9sHIM33O4zeG47ceKY89iMrvaCUpGbS5fYMFxGk9aGLUOOJbhpWCLRZqcdjnBVKhaSmNOs49GrWQTNcmee6NXOOAZpsN7TWiKRPuwhIu3mabKX3xxvFPEYAaOwqX0ZsrUTB62VDtYGjjhfOb1cGx0NytZZjiQkfHewpYzQWp8VpgAQ2xkivT76yJc0VNwscUssMnNSgSFR8ljoLBqoTdIaiC2eN2gt00XYdchQHl0bVXwgmAfVCO3lCmwldi7txAbCxxU4zkt6SsxQV1VpTkAHRNWbkRF2UIdNOlhsFr8R1FZT2EAXP1ukEVIoulToMrTCI4VL7I9ErjEa9Npk
\.


--
-- Data for Name: travelogs; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.travelogs (travelog_id, user_id, title, site, country, state, city, address, phone_number, latitude, longitude, text_body, created_at, date_visited, is_private, reported, updated_at) FROM stdin;
1	7	test	Malahide Castle	Ireland	D	Malahide	Malahide, Co. Dublin Republic of Ireland	+353 1 816 9538	53.445382	-6.164513	marker	2023-10-19 00:18:18.039-05	1212-12-11 18:09:24-05:50:36	f	t	2023-10-19 00:28:29.112-05
2	18	Hey	Malahide Castle	Ireland	D	Malahide	Malahide, Co. Dublin Republic of Ireland	+353 1 816 9538	53.445382	-6.164513	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	2023-10-19 05:20:58.352-05	1212-12-11 18:09:24-05:50:36	f	f	2023-10-19 05:20:58.352-05
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.comments (comment_id, travelog_id, user_id, content, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: feedback_reports; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.feedback_reports (report_id, user_id, travelog_id, content, created_at, updated_at, name, email) FROM stdin;
\.


--
-- Data for Name: forbidden_words; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.forbidden_words (word_id, word, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: friendships; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.friendships (friendship_id, user1, user2, accepted, denied, created_at, updated_at) FROM stdin;
16	5	18	f	f	2023-10-20 06:13:08.064-05	2023-10-20 06:13:08.064-05
\.


--
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.images (image_id, travelog_id, image_url, created_at, updated_at) FROM stdin;
1	1	https://s3-media2.fl.yelpcdn.com/bphoto/QcITWVT0tNBxBhptt7pBZg/o.jpg	2023-10-19 00:18:18.056-05	2023-10-19 00:18:18.056-05
2	2	https://s3-media2.fl.yelpcdn.com/bphoto/QcITWVT0tNBxBhptt7pBZg/o.jpg	2023-10-19 05:20:58.374-05	2023-10-19 05:20:58.374-05
\.


--
-- Data for Name: interactions; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.interactions (interaction_id, user_id, travelog_id, status, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.messages (message_id, sender_id, recipient_id, content, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.notifications (notification_id, sender_id, recipient_id, type, content, expiry_date, dismissed, created_at, updated_at, user_id) FROM stdin;
14	5	18	friend-request	bleh has sent you a friend request	\N	f	2023-10-20 06:12:16.519-05	2023-10-20 06:12:16.519-05	\N
15	5	18	friend-request	bleh has sent you a friend request	2023-11-20 06:13:08.075-06	f	2023-10-20 06:13:08.076-05	2023-10-20 06:13:08.076-05	\N
\.


--
-- Data for Name: ratings; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.ratings (rating_id, user_id, travelog_id, rating_color, created_at, updated_at) FROM stdin;
\.


--
-- Name: comments_comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.comments_comment_id_seq', 1, false);


--
-- Name: feedback_reports_report_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.feedback_reports_report_id_seq', 1, false);


--
-- Name: forbidden_words_word_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.forbidden_words_word_id_seq', 1, false);


--
-- Name: friendships_friendship_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.friendships_friendship_id_seq', 16, true);


--
-- Name: images_image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.images_image_id_seq', 2, true);


--
-- Name: interactions_interaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.interactions_interaction_id_seq', 1, false);


--
-- Name: messages_message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.messages_message_id_seq', 1, false);


--
-- Name: notifications_notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.notifications_notification_id_seq', 15, true);


--
-- Name: ratings_rating_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.ratings_rating_id_seq', 1, false);


--
-- Name: travelogs_travelog_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.travelogs_travelog_id_seq', 2, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.users_user_id_seq', 19, true);


--
-- PostgreSQL database dump complete
--

