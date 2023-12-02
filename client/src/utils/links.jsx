import React from 'react'

//who
import { IoBarChartSharp } from 'react-icons/io5'
import { MdQueryStats, MdOutlineEventNote } from 'react-icons/md'
import { FaWpforms } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'
import { MdAdminPanelSettings } from 'react-icons/md'
//what

//we
import { FcAbout } from 'react-icons/fc'
import { RiNewspaperLine } from 'react-icons/ri'
import { IoIosHelpCircleOutline } from 'react-icons/io'
import { GoCodeOfConduct } from 'react-icons/go'
import { LiaCookieBiteSolid } from 'react-icons/lia'

export const links = [
  { text: 'add Achievement', path: '.', icon: <FaWpforms /> },
  {
    text: 'all Achievements',
    path: 'all-achievements',
    icon: <MdQueryStats />,
  },
  { text: 'stats', path: 'stats', icon: <IoBarChartSharp /> },
  { text: 'profile', path: 'profile', icon: <ImProfile /> },
  { text: 'admin', path: 'admin', icon: <MdAdminPanelSettings /> },
]

export const whatlinks = [
  { id: 1, path: '.', text: 'home', icon: <IoBarChartSharp /> },
  { id: 2, path: 'about', text: 'about', icon: <IoBarChartSharp /> },
  { id: 3, path: 'all-signs', text: 'signs', icon: <IoBarChartSharp /> },
  { id: 4, path: 'cart', text: 'cart', icon: <IoBarChartSharp /> },
  { id: 5, path: 'checkout', text: 'checkout', icon: <IoBarChartSharp /> },
  { id: 6, path: 'orders', text: 'orders', icon: <IoBarChartSharp /> },
]

export const footerLinks = [
  { id: 1, path: 'about-us', text: 'about', icon: <FcAbout /> },
  { id: 2, path: 'events', text: 'events', icon: <MdOutlineEventNote /> },
  { id: 3, path: 'news', text: 'news', icon: <RiNewspaperLine /> },
  { id: 4, path: 'help', text: 'help', icon: <IoIosHelpCircleOutline /> },
  {
    id: 5,
    path: 'terms-and-conditions',
    text: 'terms and conditions',
    icon: <GoCodeOfConduct />,
  },
  {
    id: 6,
    path: 'cookie-setting',
    text: 'cookie setting',
    icon: <LiaCookieBiteSolid />,
  },
]
