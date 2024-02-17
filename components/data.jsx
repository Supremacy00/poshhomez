import { TiSocialFacebook } from "react-icons/ti";
import { TiSocialTwitter } from "react-icons/ti";
import { LiaInstagram } from "react-icons/lia";
import { TiSocialLinkedin } from "react-icons/ti";
import { PiStarFill } from "react-icons/pi";


export const navData = [
  {
    title: "Home",
    link: "/"
  },
  {
    title: "Listings",
    link: "/listings"
  },
  {
    title: "About",
    link: "/about"
  },
  {
    title: "Contact",
    link: "/contact"
  },
  {
    title: "Blog",
    link: "/blog"
  },
]

export const footerData = {
    header1: "Contact",
    tele: "+1 670 936 9368",
    email: "hello@poshhomez.com",
    header2: "Office",
    address1: "Nigeria - ",
    address2: "419 Icreatedthispage Street,",
    address3: "Frontend Developer AGG 3289",
    header3: "Opening Hours",
    weekdays1: "Monday - Thursday: 09:00AM - 09:00PM",
    weekdays2: "Friday: 09:00AM - 01:00PM",
    weekdays3: "Saturday: 09:00AM - 07:00PM",
    weekdays4: "Sunday: Closed",
    offers1: "Keep in touch",
    offerPara: "Get latest updates and offers.",
    rights: "2024 - PoshHomez. All Rights Reserved.",
  };
  export const footerIcons= [
    {
      icon: <TiSocialFacebook />,
      id: 1,
    },
    {
      icon: <TiSocialTwitter />,
      id: 2,
    },
    {
      icon: <LiaInstagram />,
      id: 3,
    },
    {
      icon: <TiSocialLinkedin />,
      id: 4,
    },
  ]; 
  
  export const testimonialData = [
    {
      title: "Good Job",
      comment: "“Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn’t on our original designs.”",
      ratings: [
        <PiStarFill key="star1" />,
        <PiStarFill key="star2" />,
        <PiStarFill key="star3" />,
        <PiStarFill key="star4" />,
        <PiStarFill key="star5" />,
      ],
      image: "/assets/agents/agent1.jpg",
      name: "Abbas Alkasim",
      company: "UI/UX Design",
      id: 1
    },
    {
      title: "Awesome Job",
      comment: "“Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn’t on our original designs.”",
      ratings: [
        <PiStarFill key="star1" />,
        <PiStarFill key="star2" />,
        <PiStarFill key="star3" />,
        <PiStarFill key="star4" />,
        <PiStarFill key="star5" />,
      ],
      image: "/assets/agents/agent4.jpg",
      name: "Jesse Onyeachu",
      company: "Data Analyst",
      id: 2
    },
    {
      title: "Great Work",
      comment: "“Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn’t on our original designs.”",
      ratings: [
        <PiStarFill key="star1" />,
        <PiStarFill key="star2" />,
        <PiStarFill key="star3" />,
        <PiStarFill key="star4" />,
        <PiStarFill key="star5" />,
      ],
      image: "/assets/agents/agent3.jpeg",
      name: "Habiba Abdulrazaq",
      company: "Treatsy Foods",
      id: 3
    },
  ];

  export const profileMenuData = [
    
  ]