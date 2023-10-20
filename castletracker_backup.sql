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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: kodai
--

CREATE TABLE public.comments (
    comment_id integer NOT NULL,
    travelog_id integer,
    user_id integer,
    content text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.comments OWNER TO kodai;

--
-- Name: comments_comment_id_seq; Type: SEQUENCE; Schema: public; Owner: kodai
--

CREATE SEQUENCE public.comments_comment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_comment_id_seq OWNER TO kodai;

--
-- Name: comments_comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kodai
--

ALTER SEQUENCE public.comments_comment_id_seq OWNED BY public.comments.comment_id;


--
-- Name: feedback_reports; Type: TABLE; Schema: public; Owner: kodai
--

CREATE TABLE public.feedback_reports (
    report_id integer NOT NULL,
    user_id integer,
    travelog_id integer,
    content text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL
);


ALTER TABLE public.feedback_reports OWNER TO kodai;

--
-- Name: feedback_reports_report_id_seq; Type: SEQUENCE; Schema: public; Owner: kodai
--

CREATE SEQUENCE public.feedback_reports_report_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.feedback_reports_report_id_seq OWNER TO kodai;

--
-- Name: feedback_reports_report_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kodai
--

ALTER SEQUENCE public.feedback_reports_report_id_seq OWNED BY public.feedback_reports.report_id;


--
-- Name: forbidden_words; Type: TABLE; Schema: public; Owner: kodai
--

CREATE TABLE public.forbidden_words (
    word_id integer NOT NULL,
    word character varying(255),
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.forbidden_words OWNER TO kodai;

--
-- Name: forbidden_words_word_id_seq; Type: SEQUENCE; Schema: public; Owner: kodai
--

CREATE SEQUENCE public.forbidden_words_word_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.forbidden_words_word_id_seq OWNER TO kodai;

--
-- Name: forbidden_words_word_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kodai
--

ALTER SEQUENCE public.forbidden_words_word_id_seq OWNED BY public.forbidden_words.word_id;


--
-- Name: images; Type: TABLE; Schema: public; Owner: kodai
--

CREATE TABLE public.images (
    image_id integer NOT NULL,
    travelog_id integer,
    image_url character varying(255),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.images OWNER TO kodai;

--
-- Name: images_image_id_seq; Type: SEQUENCE; Schema: public; Owner: kodai
--

CREATE SEQUENCE public.images_image_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.images_image_id_seq OWNER TO kodai;

--
-- Name: images_image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kodai
--

ALTER SEQUENCE public.images_image_id_seq OWNED BY public.images.image_id;


--
-- Name: interactions; Type: TABLE; Schema: public; Owner: kodai
--

CREATE TABLE public.interactions (
    interaction_id integer NOT NULL,
    user_id integer,
    travelog_id integer,
    status character varying(255),
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.interactions OWNER TO kodai;

--
-- Name: interactions_interaction_id_seq; Type: SEQUENCE; Schema: public; Owner: kodai
--

CREATE SEQUENCE public.interactions_interaction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.interactions_interaction_id_seq OWNER TO kodai;

--
-- Name: interactions_interaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kodai
--

ALTER SEQUENCE public.interactions_interaction_id_seq OWNED BY public.interactions.interaction_id;


--
-- Name: messages; Type: TABLE; Schema: public; Owner: kodai
--

CREATE TABLE public.messages (
    message_id integer NOT NULL,
    sender_id integer,
    recipient_id integer,
    content text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.messages OWNER TO kodai;

--
-- Name: messages_message_id_seq; Type: SEQUENCE; Schema: public; Owner: kodai
--

CREATE SEQUENCE public.messages_message_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.messages_message_id_seq OWNER TO kodai;

--
-- Name: messages_message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kodai
--

ALTER SEQUENCE public.messages_message_id_seq OWNED BY public.messages.message_id;


--
-- Name: notifications; Type: TABLE; Schema: public; Owner: kodai
--

CREATE TABLE public.notifications (
    notification_id integer NOT NULL,
    user_id integer,
    content text,
    expiry_date timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.notifications OWNER TO kodai;

--
-- Name: notifications_notification_id_seq; Type: SEQUENCE; Schema: public; Owner: kodai
--

CREATE SEQUENCE public.notifications_notification_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.notifications_notification_id_seq OWNER TO kodai;

--
-- Name: notifications_notification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kodai
--

ALTER SEQUENCE public.notifications_notification_id_seq OWNED BY public.notifications.notification_id;


--
-- Name: ratings; Type: TABLE; Schema: public; Owner: kodai
--

CREATE TABLE public.ratings (
    rating_id integer NOT NULL,
    user_id integer,
    travelog_id integer,
    rating_color character varying(255),
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.ratings OWNER TO kodai;

--
-- Name: ratings_rating_id_seq; Type: SEQUENCE; Schema: public; Owner: kodai
--

CREATE SEQUENCE public.ratings_rating_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ratings_rating_id_seq OWNER TO kodai;

--
-- Name: ratings_rating_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kodai
--

ALTER SEQUENCE public.ratings_rating_id_seq OWNED BY public.ratings.rating_id;


--
-- Name: travelogs; Type: TABLE; Schema: public; Owner: kodai
--

CREATE TABLE public.travelogs (
    travelog_id integer NOT NULL,
    user_id integer,
    title character varying(200) NOT NULL,
    site character varying(200),
    country character varying(60),
    state character varying(100),
    city character varying(100),
    address character varying(200),
    phone_number character varying(30),
    latitude double precision,
    longitude double precision,
    text_body text,
    created_at timestamp with time zone,
    date_visited timestamp with time zone,
    updated_at timestamp with time zone NOT NULL,
    reported boolean DEFAULT false
);


ALTER TABLE public.travelogs OWNER TO kodai;

--
-- Name: travelogs_travelog_id_seq; Type: SEQUENCE; Schema: public; Owner: kodai
--

CREATE SEQUENCE public.travelogs_travelog_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.travelogs_travelog_id_seq OWNER TO kodai;

--
-- Name: travelogs_travelog_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kodai
--

ALTER SEQUENCE public.travelogs_travelog_id_seq OWNED BY public.travelogs.travelog_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: kodai
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    first_name character varying(255),
    last_name character varying(255),
    username character varying(255),
    email character varying(255),
    password character varying(255),
    security_question character varying(255),
    answer character varying(255),
    is_admin boolean DEFAULT false,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.users OWNER TO kodai;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: kodai
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO kodai;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kodai
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: comments comment_id; Type: DEFAULT; Schema: public; Owner: kodai
--

ALTER TABLE ONLY public.comments ALTER COLUMN comment_id SET DEFAULT nextval('public.comments_comment_id_seq'::regclass);


--
-- Name: feedback_reports report_id; Type: DEFAULT; Schema: public; Owner: kodai
--

ALTER TABLE ONLY public.feedback_reports ALTER COLUMN report_id SET DEFAULT nextval('public.feedback_reports_report_id_seq'::regclass);


--
-- Name: forbidden_words word_id; Type: DEFAULT; Schema: public; Owner: kodai
--

ALTER TABLE ONLY public.forbidden_words ALTER COLUMN word_id SET DEFAULT nextval('public.forbidden_words_word_id_seq'::regclass);


--
-- Name: images image_id; Type: DEFAULT; Schema: public; Owner: kodai
--

ALTER TABLE ONLY public.images ALTER COLUMN image_id SET DEFAULT nextval('public.images_image_id_seq'::regclass);


--
-- Name: interactions interaction_id; Type: DEFAULT; Schema: public; Owner: kodai
--

ALTER TABLE ONLY public.interactions ALTER COLUMN interaction_id SET DEFAULT nextval('public.interactions_interaction_id_seq'::regclass);


--
-- Name: messages message_id; Type: DEFAULT; Schema: public; Owner: kodai
--

ALTER TABLE ONLY public.messages ALTER COLUMN message_id SET DEFAULT nextval('public.messages_message_id_seq'::regclass);


--
-- Name: notifications notification_id; Type: DEFAULT; Schema: public; Owner: kodai
--

ALTER TABLE ONLY public.notifications ALTER COLUMN notification_id SET DEFAULT nextval('public.notifications_notification_id_seq'::regclass);


--
-- Name: ratings rating_id; Type: DEFAULT; Schema: public; Owner: kodai
--

ALTER TABLE ONLY public.ratings ALTER COLUMN rating_id SET DEFAULT nextval('public.ratings_rating_id_seq'::regclass);


--
-- Name: travelogs travelog_id; Type: DEFAULT; Schema: public; Owner: kodai
--

ALTER TABLE ONLY public.travelogs ALTER COLUMN travelog_id SET DEFAULT nextval('public.travelogs_travelog_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: kodai
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


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
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.images (image_id, travelog_id, image_url, created_at, updated_at) FROM stdin;
1	1	https://s3-media2.fl.yelpcdn.com/bphoto/QcITWVT0tNBxBhptt7pBZg/o.jpg	2023-10-14 03:12:16.526-05	2023-10-14 03:12:16.526-05
2	2	https://s3-media2.fl.yelpcdn.com/bphoto/QcITWVT0tNBxBhptt7pBZg/o.jpg	2023-10-14 03:52:39.066-05	2023-10-14 03:52:39.066-05
3	3	https://s3-media2.fl.yelpcdn.com/bphoto/QcITWVT0tNBxBhptt7pBZg/o.jpg	2023-10-14 04:05:47.678-05	2023-10-14 04:05:47.678-05
4	4	https://s3-media2.fl.yelpcdn.com/bphoto/QcITWVT0tNBxBhptt7pBZg/o.jpg	2023-10-16 13:31:30.113-05	2023-10-16 13:31:30.113-05
5	5	https://s3-media3.fl.yelpcdn.com/bphoto/XoHey5_DbLEaplymP89bNQ/o.jpg	2023-10-16 14:14:54.595-05	2023-10-16 14:14:54.595-05
6	6	https://s3-media3.fl.yelpcdn.com/bphoto/p-_BjzdhFRBvlDw9kbe0dg/o.jpg	2023-10-16 14:15:32.932-05	2023-10-16 14:15:32.932-05
7	7	https://s3-media2.fl.yelpcdn.com/bphoto/USZL8MxiUe1R21O470ChUg/o.jpg	2023-10-16 14:16:24.611-05	2023-10-16 14:16:24.611-05
8	8	https://s3-media2.fl.yelpcdn.com/bphoto/hzonAVC_PKUFERgWp2C-kQ/o.jpg	2023-10-16 14:18:34.123-05	2023-10-16 14:18:34.123-05
9	9	https://s3-media4.fl.yelpcdn.com/bphoto/_PriGl-9Ozfi3FP4JcMEeQ/o.jpg	2023-10-16 14:33:52.166-05	2023-10-16 14:33:52.166-05
10	10	https://s3-media2.fl.yelpcdn.com/bphoto/S14qO7y_QyobiwpPcU7kmw/o.jpg	2023-10-16 20:10:26.172-05	2023-10-16 20:10:26.172-05
11	11	https://s3-media2.fl.yelpcdn.com/bphoto/HNNpwI40rOfxkSKqDui5HA/o.jpg	2023-10-16 23:02:43.931-05	2023-10-16 23:02:43.931-05
12	12	https://s3-media2.fl.yelpcdn.com/bphoto/USZL8MxiUe1R21O470ChUg/o.jpg	2023-10-16 23:51:17.148-05	2023-10-16 23:51:17.148-05
13	12	https://live.staticflickr.com/4088/4963256392_58f671b3a5_b.jpg	2023-10-16 23:51:17.148-05	2023-10-16 23:51:17.148-05
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

COPY public.notifications (notification_id, user_id, content, expiry_date, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: ratings; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.ratings (rating_id, user_id, travelog_id, rating_color, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: travelogs; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.travelogs (travelog_id, user_id, title, site, country, state, city, address, phone_number, latitude, longitude, text_body, created_at, date_visited, updated_at, reported) FROM stdin;
4	1	ick	Malahide Castle	Ireland	D	Malahide	Malahide, Co. Dublin Republic of Ireland	+353 1 816 9538	53.445382	-6.164513		2023-10-16 13:31:30.084-05	1212-12-11 18:09:24-05:50:36	2023-10-16 13:31:30.086-05	f
1	1	Becoming a World Traveler	Malahide Castle	Ireland	D	Malahide	Malahide, Co. Dublin Republic of Ireland	+353 1 816 9538	53.445382	-6.164513	Oh yeah	2023-10-14 03:12:16.506-05	2016-06-06 19:00:00-05	2023-10-14 03:12:16.506-05	f
2	1	prox test	Malahide Castle	Ireland	D	Malahide	Malahide, Co. Dublin Republic of Ireland	+353 1 816 9538	53.445382	-6.164513		2023-10-14 03:52:39.047-05	1987-12-11 18:00:00-06	2023-10-14 03:52:39.048-05	f
3	1	Heyo	Malahide Castle	Ireland	D	Malahide	Malahide, Co. Dublin Republic of Ireland	+353 1 816 9538	53.445382	-6.164513		2023-10-14 04:05:47.66-05	1988-06-06 19:00:00-05	2023-10-14 04:05:47.66-05	f
5	1	France	Château de Chambord	France	41	Chambord	41250 Chambord France	+33 2 54 50 40 00	47.616145099948	1.51704118720249		2023-10-16 14:14:54.58-05	1212-12-11 18:09:24-05:50:36	2023-10-16 14:14:54.58-05	f
6	1	Westminster	Westminster Abbey	United Kingdom	XGL	London	20 Dean's Yard London SW1P 3PA United Kingdom	+44 20 7222 5152	51.4993203344498	-0.127374497474177		2023-10-16 14:15:32.885-05	1212-12-11 18:09:24-05:50:36	2023-10-16 14:15:32.885-05	f
7	1	Spain	Catedral de Santiago de Compostela	Spain	C	Santiago de Compostela	Praza do Obradoiro, s/n 15704 Santiago de Compostela Spain	+34 981 58 35 48	42.882	-8.544626		2023-10-16 14:16:24.595-05	1212-12-11 18:09:24-05:50:36	2023-10-16 14:16:24.595-05	f
8	1	Dome	Berlin Cathedral	Germany	BE	Berlin	Am Lustgarten 10178 Berlin Germany	+49 30 20269136	52.519149145301	13.4011079662007		2023-10-16 14:18:34.108-05	1212-12-11 18:09:24-05:50:36	2023-10-16 14:18:34.108-05	t
9	1	Segovia	Alcázar De Segovia	Spain	SG	Segovia	Plaza de la Reina Victoria Eugenia, s/n 40003 Segovia Spain	+34 921 46 07 59	40.9523808	-4.1302943		2023-10-16 14:33:52.151-05	1212-12-11 18:09:24-05:50:36	2023-10-16 14:33:52.151-05	t
10	1	Edinburgh Castle	Edinburgh Castle	United Kingdom	EDH	Edinburgh	Castle Hill Edinburgh EH1 2HG United Kingdom	+44 131 225 9846	55.949101	-3.195602	Ach	2023-10-16 20:10:26.069-05	1212-12-11 18:09:24-05:50:36	2023-10-16 20:10:26.071-05	f
11	2	Honeymoon	Château de Chenonceau	France	41	Chenonceau	Château de Chenonceau 41500 Chenonceau France	+33 820 20 90 90	47.324874	1.070299	Honeymoon :)	2023-10-16 23:02:43.911-05	1212-12-11 18:09:24-05:50:36	2023-10-16 23:02:43.911-05	f
12	2	two pics	Catedral de Santiago de Compostela	Spain	C	Santiago de Compostela	Praza do Obradoiro, s/n 15704 Santiago de Compostela Spain	+34 981 58 35 48	42.882	-8.544626		2023-10-16 23:51:17.114-05	1212-12-11 18:09:24-05:50:36	2023-10-16 23:51:17.116-05	f
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: kodai
--

COPY public.users (user_id, first_name, last_name, username, email, password, security_question, answer, is_admin, created_at, updated_at) FROM stdin;
1	bleh	bleh	bleh	bleh@bleh.com	$2a$10$30Gj4HTsgZtdeF7NC2drAO1vFBcfe1/REAkZ4voWObN6140jvinX.	What is the name of your first pet?	precious	t	2023-10-14 02:57:58.011-05	2023-10-14 02:57:58.012-05
2	jay	jay	jay	jay@jay.com	$2a$10$FCZLm3Qqg1K.oDOo2LJ0A.rNWak3fxSwCxxkynUPK6NPD0tnWqPRm	What is the name of your first pet?	dog	f	2023-10-16 23:01:38.084-05	2023-10-16 23:01:38.085-05
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
-- Name: images_image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.images_image_id_seq', 13, true);


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

SELECT pg_catalog.setval('public.notifications_notification_id_seq', 1, false);


--
-- Name: ratings_rating_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.ratings_rating_id_seq', 1, false);


--
-- Name: travelogs_travelog_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.travelogs_travelog_id_seq', 12, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kodai
--

SELECT pg_catalog.setval('public.users_user_id_seq', 2, true);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: kodai
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (comment_id);


--
-- Name: feedback_reports feedback_reports_pkey; Type: CONSTRAINT; Schema: public; Owner: kodai
--

ALTER TABLE ONLY public.feedback_reports
    ADD CONSTRAINT feedback_reports_pkey PRIMARY KEY (report_id);


--
-- Name: forbidden_words forbidden_words_pkey; Type: CONSTRAINT; Schema: public; Owner: kodai
--

ALTER TABLE ONLY public.forbidden_words
    ADD CONSTRAINT forbidden_words_pkey PRIMARY KEY (word_id);


--
-- Name: images images_pkey; Type: CONSTRAINT; Schema: public; Owner: kodai
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pkey PRIMARY KEY (image_id);


--
-- Name: interactions interactions_pkey; Type: CONSTRAINT; Schema: public; Owner: kodai
--

ALTER TABLE ONLY public.interactions
    ADD CONSTRAINT interactions_pkey PRIMARY KEY (interaction_id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: kodai
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (message_id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: kodai
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (notification_id);


--
-- Name: ratings ratings_pkey; Type: CONSTRAINT; Schema: public; Owner: kodai
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_pkey PRIMARY KEY (rating_id);


--
-- Name: travelogs travelogs_pkey; Type: CONSTRAINT; Schema: public; Owner: kodai
--

ALTER TABLE ONLY public.travelogs
    ADD CONSTRAINT travelogs_pkey PRIMARY KEY (travelog_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: kodai
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: comments comments_travelog_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kodai
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_travelog_id_fkey FOREIGN KEY (travelog_id) REFERENCES public.travelogs(travelog_id);


--
-- Name: comments comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kodai
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: feedback_reports feedback_reports_travelog_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kodai
--

ALTER TABLE ONLY public.feedback_reports
    ADD CONSTRAINT feedback_reports_travelog_id_fkey FOREIGN KEY (travelog_id) REFERENCES public.travelogs(travelog_id);


--
-- Name: feedback_reports feedback_reports_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kodai
--

ALTER TABLE ONLY public.feedback_reports
    ADD CONSTRAINT feedback_reports_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: images images_travelog_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kodai
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_travelog_id_fkey FOREIGN KEY (travelog_id) REFERENCES public.travelogs(travelog_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: interactions interactions_travelog_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kodai
--

ALTER TABLE ONLY public.interactions
    ADD CONSTRAINT interactions_travelog_id_fkey FOREIGN KEY (travelog_id) REFERENCES public.travelogs(travelog_id);


--
-- Name: interactions interactions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kodai
--

ALTER TABLE ONLY public.interactions
    ADD CONSTRAINT interactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: messages messages_recipient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kodai
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_recipient_id_fkey FOREIGN KEY (recipient_id) REFERENCES public.users(user_id);


--
-- Name: messages messages_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kodai
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.users(user_id);


--
-- Name: notifications notifications_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kodai
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: ratings ratings_travelog_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kodai
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_travelog_id_fkey FOREIGN KEY (travelog_id) REFERENCES public.travelogs(travelog_id);


--
-- Name: ratings ratings_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kodai
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: travelogs travelogs_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kodai
--

ALTER TABLE ONLY public.travelogs
    ADD CONSTRAINT travelogs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

