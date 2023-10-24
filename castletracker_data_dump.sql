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
16	ava	ava	ava	ava@ava.com	$2a$10$6udN48adiw/JFVyvLxdmnuFiMt5c8fEIlHpyERBJ3erc8/DMfJWFm	What is the name of your first pet?	ava	f	2023-10-19 05:03:10.16-05	2023-10-19 05:03:10.161-05	https://live.staticflickr.com/3557/3449041959_1bd9b05ac8_c.jpg	
18	avatar	avatar	avatar	avatar@avatar.com	$2a$10$bhxVRHn/EXJ6CtToZHmd/OAsrdM5QdrNs3nSjryuXWSedObxDPr9.	What is the name of your first pet?	avatar	f	2023-10-19 05:14:48.425-05	2023-10-19 06:29:56.476-05	https://www.medievalists.net/wp-content/uploads/2014/07/manuscript-images-medieval-castles.jpg	lOsl8wy8oFIwo29iUOtXZLdPEWPK1BtiIhGObsWRO8c7YFuYZKAP6hkDbLEy8S7AYxOzsTXcP08xjY79hDA66VX9v2k36ZpLvx7RAVWeCkkfG350Se1D1macegVE0Gq31UrwN4UktmkbF7OzXRajotyBV042LhnrHLVULzttkY2ew3ou79BY20eh1aYx76zWuBlVM3tjeXQIYLgrHnDy47dEA9LcBz6AsdOvmywuCEn8kQr0xxthmqQANo5X55BOk7Brrw6nCHz1AnzsSUy7IEIWZPK9dQ3o4ghLHzQDZzKWQPxDVqEYcS2nQsurOUOa327U5ywbIc8PIigjvGzCdFWrwdGXH55FHIB9bFB4wp6UmQuugeYZ3ewJIdrmXPVkMqF5KzCbIwU98PEQ8ydXNbsEZatdGPp5wQpnvrMRWSeR29rV2xH5sKg39CH05UT1VM5SMriYarjOPKUWmfLku7VJw1ySMmU9Qrk4W6bnRnZ2lJOuqwhQkhFVpMGDJkmLgjtM9UeedL2tGvuksGmDZaxXsBhuCxl204G5LVIt4Yo8k980oRUac9J3OiRsg55kAWiwstopQSG7g0lR8Vt9qsqQUeKnXsv2TLQ53hv8EBPnwXiP7UmVxxZnHpEGHwXhW30Z9KqKh6KzGPC0pFyokd9sHIM33O4zeG47ceKY89iMrvaCUpGbS5fYMFxGk9aGLUOOJbhpWCLRZqcdjnBVKhaSmNOs49GrWQTNcmee6NXOOAZpsN7TWiKRPuwhIu3mabKX3xxvFPEYAaOwqX0ZsrUTB62VDtYGjjhfOb1cGx0NytZZjiQkfHewpYzQWp8VpgAQ2xkivT76yJc0VNwscUssMnNSgSFR8ljoLBqoTdIaiC2eN2gt00XYdchQHl0bVXwgmAfVCO3lCmwldi7txAbCxxU4zkt6SsxQV1VpTkAHRNWbkRF2UIdNOlhsFr8R1FZT2EAXP1ukEVIoulToMrTCI4VL7I9ErjEa9Npk
20	eva	eva	eva	eva@eva.com	$2a$10$HHz0SN1k3Aiwu.kzI9vuFOOABQux9RhOqhCoN7Q0qLs56WV0WMhn2	What is the name of your first pet?	eva	f	2023-10-23 23:46:18.276-05	2023-10-23 23:46:18.276-05	https://live.staticflickr.com/7555/16004308162_4538eac376_b.jpg	hey
15	kerry	kerry	kerry2	kerry@kerry.com	$2a$10$peQSHbCf8gmhAcvytw2k6.1ReiLUtv0c0f9FJyb/TuE9Yma0.YV6O	What is the name of your first pet?	kerry	f	2023-10-19 00:27:24.888-05	2023-10-24 00:03:02.019-05	https://live.staticflickr.com/3557/3449041959_1bd9b05ac8_c.jpg	\N
\.


--
-- Data for Name: blocks; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.blocks (block_id, blocker_id, blocked_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: travelogs; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.travelogs (travelog_id, user_id, title, site, country, state, city, address, phone_number, latitude, longitude, text_body, created_at, date_visited, is_private, reported, updated_at) FROM stdin;
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
-- Data for Name: follows; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.follows (follow_id, follower_id, followee_id, created_at, updated_at) FROM stdin;
3	7	5	2023-10-23 13:54:11.337-05	2023-10-23 13:54:11.337-05
4	5	7	2023-10-23 13:54:15.69-05	2023-10-23 13:54:15.69-05
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
77	5	18	t	f	2023-10-22 22:17:59.263-05	2023-10-22 22:21:48.974-05
103	16	7	t	f	2023-10-23 05:24:53.15-05	2023-10-23 05:25:01.425-05
106	7	13	t	f	2023-10-23 23:26:05.993-05	2023-10-23 23:26:57.913-05
115	5	16	t	f	2023-10-24 00:00:56.687-05	2023-10-24 00:01:04.539-05
116	15	18	t	f	2023-10-24 00:03:27.4-05	2023-10-24 00:20:44.806-05
\.


--
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.images (image_id, travelog_id, image_url, created_at, updated_at) FROM stdin;
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

COPY public.notifications (notification_id, sender_id, recipient_id, type, content, expiry_date, dismissed, created_at, updated_at) FROM stdin;
152	16	7	friend-request	{"text":"has sent you a friend request","username":"ava","url":"/public_profile/ava"}	2023-11-23 05:24:53.195-06	t	2023-10-23 05:24:53.195-05	2023-10-23 05:25:01.428-05
153	7	16	friend-request-accepted	{"username":"jay","text":"has accepted your friend request.","url":"/public_profile/jay"}	2023-11-23 05:25:01.431-06	f	2023-10-23 05:25:01.431-05	2023-10-23 05:25:01.431-05
154	7	5	new-follow	{"username":"jay","text":"has followed you.","url":"/public_profile/jay"}	2023-11-23 13:54:11.349-06	f	2023-10-23 13:54:11.349-05	2023-10-23 13:54:11.349-05
155	5	7	new-follow	{"username":"bleh","text":"has followed you.","url":"/public_profile/bleh"}	2023-11-23 13:54:15.696-06	f	2023-10-23 13:54:15.696-05	2023-10-23 13:54:15.696-05
157	7	7	friend-request	{"text":"has sent you a friend request","username":"jay","url":"/public_profile/jay"}	2023-11-23 23:23:58.208-06	t	2023-10-23 23:23:58.208-05	2023-10-23 23:24:09.982-05
158	7	7	friend-request-accepted	{"username":"jay","text":"has accepted your friend request.","url":"/public_profile/jay"}	2023-11-23 23:24:09.983-06	f	2023-10-23 23:24:09.983-05	2023-10-23 23:24:09.983-05
159	7	13	friend-request	{"text":"has sent you a friend request","username":"jay","url":"/public_profile/jay"}	2023-11-23 23:26:05.998-06	t	2023-10-23 23:26:05.998-05	2023-10-23 23:26:57.921-05
160	13	7	friend-request-accepted	{"username":"kerry","text":"has accepted your friend request.","url":"/public_profile/kerry"}	2023-11-23 23:26:57.922-06	f	2023-10-23 23:26:57.923-05	2023-10-23 23:26:57.924-05
168	20	7	friend-request	{"text":"has sent you a friend request","username":"eva","url":"/public_profile/eva"}	2023-11-23 23:46:31.077-06	t	2023-10-23 23:46:31.077-05	2023-10-23 23:46:46.628-05
169	7	18	friend-request	{"text":"has sent you a friend request","username":"jay","url":"/public_profile/jay"}	2023-11-23 23:47:57.431-06	t	2023-10-23 23:47:57.431-05	2023-10-23 23:48:11.919-05
170	7	5	friend-request	{"text":"has sent you a friend request","username":"jay","url":"/public_profile/jay"}	2023-11-23 23:50:00.585-06	t	2023-10-23 23:50:00.585-05	2023-10-23 23:50:16.333-05
171	5	16	friend-request	{"text":"has sent you a friend request","username":"bleh","url":"/public_profile/bleh"}	2023-11-24 00:00:56.697-06	t	2023-10-24 00:00:56.698-05	2023-10-24 00:01:04.542-05
172	16	5	friend-request-accepted	{"username":"ava","text":"has accepted your friend request.","url":"/public_profile/ava"}	2023-11-24 00:01:04.544-06	f	2023-10-24 00:01:04.544-05	2023-10-24 00:01:04.544-05
173	15	18	friend-request	{"text":"has sent you a friend request","username":"kerry2","url":"/public_profile/kerry2"}	2023-11-24 00:03:27.406-06	t	2023-10-24 00:03:27.406-05	2023-10-24 00:03:39.04-05
174	18	15	friend-request-accepted	{"username":"avatar","text":"has accepted your friend request.","url":"/public_profile/avatar"}	2023-11-24 00:20:44.815-06	f	2023-10-24 00:20:44.815-05	2023-10-24 00:20:44.816-05
\.


--
-- Data for Name: ratings; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.ratings (rating_id, user_id, travelog_id, rating_color, created_at, updated_at) FROM stdin;
\.


--
-- Name: blocks_block_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.blocks_block_id_seq', 1, true);


--
-- Name: comments_comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.comments_comment_id_seq', 1, false);


--
-- Name: feedback_reports_report_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.feedback_reports_report_id_seq', 1, false);


--
-- Name: follows_follow_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.follows_follow_id_seq', 4, true);


--
-- Name: forbidden_words_word_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.forbidden_words_word_id_seq', 1, false);


--
-- Name: friendships_friendship_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.friendships_friendship_id_seq', 116, true);


--
-- Name: images_image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.images_image_id_seq', 6, true);


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

SELECT pg_catalog.setval('public.notifications_notification_id_seq', 174, true);


--
-- Name: ratings_rating_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.ratings_rating_id_seq', 1, false);


--
-- Name: travelogs_travelog_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.travelogs_travelog_id_seq', 6, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.users_user_id_seq', 20, true);


--
-- PostgreSQL database dump complete
--

