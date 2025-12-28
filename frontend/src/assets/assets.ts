import bgImage from './icons/bgImage.svg';
import code from './icons/code.svg';
import gallery_icon from './icons/gallery_icon.svg';
import logo_big from './icons/logo_big.svg';
import logo_icon from './icons/logo_icon.svg';
import send_button from './icons/send_button.svg';
import arrow_icon from './images/arrow_icon.png';
import avatar_icon from './images/avatar_icon.png';
import help_icon from './images/help_icon.png';
import img1 from './images/img1.jpg';
import img2 from './images/img2.jpg';
import logo from './images/logo.png';
import menu_icon from './images/menu_icon.png';
import pic1 from './images/pic1.png';
import pic2 from './images/pic2.png';
import pic3 from './images/pic3.png';
import pic4 from './images/pic4.png';
import profile_alison from './images/profile_alison.png';
import profile_enrique from './images/profile_enrique.png';
import profile_marco from './images/profile_marco.png';
import profile_martin from './images/profile_martin.png';
import profile_richard from './images/profile_richard.png';
import search_icon from './images/search_icon.png';
// import { LogIn } from 'lucide-react';

const assets = {
  avatar_icon,
  gallery_icon,
  help_icon,
  logo_big,
  logo_icon,
  logo,
  search_icon,
  send_button,
  menu_icon,
  arrow_icon,
  code,
  bgImage,
  profile_martin,
};

export default assets;

export const imagesDummyData = [pic1, pic2, pic3, pic4, pic1, pic2];

export const userDummyData = [
  {
    _id: '680f510af10f3cd28382ed01',
    email: 'test3@greatstack.dev',
    fullName: 'Enrique Martinez',
    profilePic: profile_enrique,
    bio: 'Hi Everyone, I am Using QuickChat',
  },
  {
    _id: '680f510af10f3cd28382ed02',
    email: 'test1@greatstack.dev',
    fullName: 'Alison Martin',
    profilePic: profile_alison,
    bio: 'Hi Everyone, I am Using QuickChat',
  },
  {
    _id: '680f50e4f10f3cd28382ecf9',
    email: 'test2@greatstack.dev',
    fullName: 'Martin Johnson',
    profilePic: profile_martin,
    bio: 'Hi Everyone, I am Using QuickChat',
  },

  {
    _id: '680f5137f10f3cd28382ed10',
    email: 'test4@greatstack.dev',
    fullName: 'Marco Jones',
    profilePic: profile_marco,
    bio: 'Hi Everyone, I am Using QuickChat',
  },
  {
    _id: '680f516cf10f3cd28382ed11',
    email: 'test5@greatstack.dev',
    fullName: 'Richard Smith',
    profilePic: profile_richard,
    bio: 'Hi Everyone, I am Using QuickChat',
  },
  {
    _id: '680f5180f10f3cd28382ed12',
    email: 'test6@greatstack.dev',
    fullName: 'Martin Smith',
    profilePic: profile_martin,
    bio: 'Hi Everyone, I am Using QuickChat',
  },
  {
    _id: '680f5189f10f3cd28382ed13',
    email: 'test7@greatstack.dev',
    fullName: 'Martin Smith',
    profilePic: profile_martin,
    bio: 'Hi Everyone, I am Using QuickChat',
  },
  {
    _id: '680f518cf10f3cd28382ed14',
    email: 'test8@greatstack.dev',
    fullName: 'Martin Smith',
    profilePic: profile_martin,
    bio: 'Hi Everyone, I am Using QuickChat',
  },
  {
    _id: '680f518ff10f3cd28382ed15',
    email: 'test9@greatstack.dev',
    fullName: 'Martin Smith',
    profilePic: profile_martin,
    bio: 'Hi Everyone, I am Using QuickChat',
  },
  {
    _id: '680f5192f10f3cd28382ed16',
    email: 'test10@greatstack.dev',
    fullName: 'Martin Smith',
    profilePic: profile_martin,
    bio: 'Hi Everyone, I am Using QuickChat',
  },
];

export const onlineUsersDummyData = [
  '680f510af10f3cd28382ed01',
  '680f510af10f3cd28382ed02',
  '680f5189f10f3cd28382ed13',
  '680f5192f10f3cd28382ed16',
  '680f5180f10f3cd28382ed12',
];

export const messagesDummyData = [
  {
    _id: '680f571ff10f3cd28382f094',
    senderId: '680f510af10f3cd28382ed02',
    receiverId: '680f50e4f10f3cd28382ecf9',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    seen: true,
    createdAt: '2025-04-28T10:23:27.844Z',
  },
  {
    _id: '680f5726f10f3cd28382f0b1',
    senderId: '680f50e4f10f3cd28382ecf9',
    receiverId: '680f510af10f3cd28382ed02',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    seen: true,
    createdAt: '2025-04-28T10:23:34.520Z',
  },
  {
    _id: '680f5729f10f3cd28382f0b6',
    senderId: '680f510af10f3cd28382ed02',
    receiverId: '680f50e4f10f3cd28382ecf9',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    seen: true,
    createdAt: '2025-04-28T10:23:37.301Z',
  },
  {
    _id: '680f572cf10f3cd28382f0bb',
    senderId: '680f50e4f10f3cd28382ecf9',
    receiverId: '680f510af10f3cd28382ed02',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    seen: true,
    createdAt: '2025-04-28T10:23:40.334Z',
  },
  {
    _id: '680f573cf10f3cd28382f0c0',
    senderId: '680f50e4f10f3cd28382ecf9',
    receiverId: '680f510af10f3cd28382ed02',
    image: img1,
    seen: true,
    createdAt: '2025-04-28T10:23:56.265Z',
  },
  {
    _id: '680f5745f10f3cd28382f0c5',
    senderId: '680f510af10f3cd28382ed02',
    receiverId: '680f50e4f10f3cd28382ecf9',
    image: img2,
    seen: true,
    createdAt: '2025-04-28T10:24:05.164Z',
  },
  {
    _id: '680f5748f10f3cd28382f0ca',
    senderId: '680f510af10f3cd28382ed02',
    receiverId: '680f50e4f10f3cd28382ecf9',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    seen: true,
    createdAt: '2025-04-28T10:24:08.523Z',
  },
];

// export const NavigationLinks = [
//   { to: '/login', icon: <LogIn/> , label: 'login', auth: false },
//   { to: '/signup', icon: <BookPlus />, label: 'signup', auth: false },
//   { to: '/chats', icon: <MessageCircle />, label: 'chats', auth: true },
//   { to: '/profile', icon: <UserCheck2 />, label: 'profile', auth: true },
// ];
