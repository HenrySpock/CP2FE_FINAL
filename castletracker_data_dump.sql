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
1	jay	jay	jay	jay@jay.com	$2a$10$JpbAnt6Tb1V9eMzKcZlKRuBcnxAl6PtAo6Pl8aHCoXP5ooPKgwAEm	What is the name of your first pet?	precious	t	2023-10-25 10:28:06.031-05	2023-10-25 10:28:06.032-05	https://live.staticflickr.com/65535/49410415121_264a218d6f_z.jpg	Just trying to make this work.
2	bleh	bleh	bleh	bleh@bleh.com	$2a$10$s3oMoNV7UdzYgmrZZzlSHuMtEK7QFPoJs3mBCLPcBTchTq871KR9K	What is the name of your first pet?	Sumo	f	2023-10-25 10:29:43.564-05	2023-10-25 10:29:43.564-05	https://live.staticflickr.com/3557/3449041959_1bd9b05ac8_c.jpg	Not an admin.
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
1	1	Gone to Malahide	Malahide Castle	Ireland	D	Malahide	Malahide, Co. Dublin Republic of Ireland	+353 1 816 9538	53.445382	-6.164513	A very nice trip.	2023-10-25 10:28:47.655-05	2014-12-11 18:00:00-06	f	f	2023-10-25 10:28:47.656-05
2	2	Honeymoon	Château de Chambord	France	41	Chambord	41250 Chambord France	+33 2 54 50 40 00	47.616145099948	1.51704118720249	great tip	2023-10-25 10:30:20.75-05	2015-12-14 18:00:00-06	f	f	2023-10-25 10:30:20.75-05
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.comments (comment_id, travelog_id, user_id, parent_id, content, created_at, updated_at) FROM stdin;
38	1	2	\N	Hiya	2023-10-26 00:40:44.284-05	2023-10-26 00:40:44.284-05
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
1	2	1	t	f	f	2023-10-26 00:50:15.467-05	2023-10-26 00:50:22.393-05
\.


--
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.images (image_id, travelog_id, image_url, created_at, updated_at) FROM stdin;
1	1	https://s3-media2.fl.yelpcdn.com/bphoto/QcITWVT0tNBxBhptt7pBZg/o.jpg	2023-10-25 10:28:47.675-05	2023-10-25 10:28:47.675-05
2	2	https://s3-media3.fl.yelpcdn.com/bphoto/XoHey5_DbLEaplymP89bNQ/o.jpg	2023-10-25 10:30:20.768-05	2023-10-25 10:30:20.768-05
\.


--
-- Data for Name: interactions; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.interactions (interaction_id, user_id, travelog_id, status, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.messages (message_id, content, created_at, updated_at, caller_del, receiver_del, caller_id, receiver_id) FROM stdin;
13	wert	2023-10-26 05:32:40.702-05	2023-10-26 05:32:40.703-05	f	f	\N	\N
14	awefwefwe	2023-10-26 05:34:09.583-05	2023-10-26 05:34:09.585-05	f	f	\N	\N
15	qwefqwef	2023-10-26 05:37:28.475-05	2023-10-26 05:37:28.477-05	f	f	\N	\N
16	awef	2023-10-26 05:38:44.986-05	2023-10-26 05:38:44.987-05	f	f	\N	\N
17	awef	2023-10-26 05:42:25.418-05	2023-10-26 05:42:25.418-05	f	f	\N	\N
18	qwettt	2023-10-26 05:45:29.807-05	2023-10-26 05:45:29.808-05	f	f	\N	\N
19	awef	2023-10-26 05:50:02.945-05	2023-10-26 05:50:02.947-05	f	f	\N	\N
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.notifications (notification_id, sender_id, recipient_id, comment_id, type, content, expiry_date, dismissed, created_at, updated_at) FROM stdin;
38	2	1	\N	comment	{"username":"bleh","text":"commented on your post.","url":"/travelog/1"}	2023-11-26 00:40:44.296-06	f	2023-10-26 00:40:44.296-05	2023-10-26 00:40:44.296-05
39	2	1	\N	friend-request	{"text":"has sent you a friend request","username":"bleh","url":"/public_profile/bleh"}	2023-11-26 00:50:15.482-06	t	2023-10-26 00:50:15.482-05	2023-10-26 00:50:22.397-05
40	1	2	\N	friend-request-accepted	{"username":"jay","text":"has accepted your friend request.","url":"/public_profile/jay"}	2023-11-26 00:50:22.4-06	f	2023-10-26 00:50:22.4-05	2023-10-26 00:50:22.4-05
\.


--
-- Data for Name: ratings; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.ratings (rating_id, user_id, travelog_id, rating_color, created_at, updated_at) FROM stdin;
\.


--
-- Name: blocks_block_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.blocks_block_id_seq', 1, false);


--
-- Name: comments_comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.comments_comment_id_seq', 38, true);


--
-- Name: feedback_reports_report_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.feedback_reports_report_id_seq', 1, false);


--
-- Name: follows_follow_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.follows_follow_id_seq', 1, false);


--
-- Name: forbidden_words_word_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.forbidden_words_word_id_seq', 1, false);


--
-- Name: friendships_friendship_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.friendships_friendship_id_seq', 1, true);


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

SELECT pg_catalog.setval('public.messages_message_id_seq', 19, true);


--
-- Name: notifications_notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.notifications_notification_id_seq', 40, true);


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

SELECT pg_catalog.setval('public.users_user_id_seq', 2, true);


--
-- PostgreSQL database dump complete
--

