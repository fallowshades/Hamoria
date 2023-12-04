import React from 'react'

//who
import { IoBarChartSharp } from 'react-icons/io5'
import { MdQueryStats, MdOutlineEventNote } from 'react-icons/md'
import { FaWpforms, FaRegQuestionCircle } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'
import { MdAdminPanelSettings } from 'react-icons/md'
//what
import { TbHome } from 'react-icons/tb'
import {
  FaHands,
  FaHandsHoldingCircle,
  FaHandshakeSimple,
} from 'react-icons/fa6'
import { PiHandbagBold } from 'react-icons/pi'
//we

import { RiNewspaperLine } from 'react-icons/ri'
import { IoIosHelpCircleOutline } from 'react-icons/io'
import { GoCodeOfConduct } from 'react-icons/go'
import { LiaCookieBiteSolid } from 'react-icons/lia'

//parts
import { SiSemanticweb } from 'react-icons/si'
import { VscReferences } from 'react-icons/vsc'
import { PiHandEye } from 'react-icons/pi'
import { FaHandPointer } from 'react-icons/fa'

//courses
import { GiMaterialsScience } from 'react-icons/gi'
import { GiHumanPyramid } from 'react-icons/gi'
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
  { id: 1, path: '.', text: 'home', icon: <TbHome /> },
  { id: 2, path: 'about', text: 'about', icon: <FaRegQuestionCircle /> },
  { id: 3, path: 'all-signs', text: 'signs', icon: <FaHands /> },
  { id: 4, path: 'cart', text: 'cart', icon: <PiHandbagBold /> },
  { id: 5, path: 'checkout', text: 'checkout', icon: <FaHandsHoldingCircle /> },
  { id: 6, path: 'orders', text: 'orders', icon: <FaHandshakeSimple /> },
]

export const footerLinks = [
  { id: 1, path: 'about', text: 'about', icon: <FaRegQuestionCircle /> },
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

export const partLinks = [
  { id: 1, path: 'reference', text: 'reference', icon: <VscReferences /> },
  { id: 2, path: 'word', text: 'word', icon: <SiSemanticweb /> },
  { id: 3, path: 'orientation', text: 'orientation', icon: <FaHandPointer /> },
  {
    id: 4,
    path: 'hand-status',
    text: 'hand status',
    icon: <PiHandEye />,
  },
  {
    id: 5,
    path: 'prefix',
    text: 'prefix',
    icon: <GoCodeOfConduct />,
  },
]

export const curriculumLinks = [
  { id: 1, path: 'no', text: 'no', icon: <GiMaterialsScience /> },
  { id: 2, path: 'so', text: 'so', icon: <GiHumanPyramid /> },
]

export const noLinks = [
  { id: 1, path: 'crud', text: 'crud', icon: <GiMaterialsScience /> },
  { id: 2, path: 'domain', text: 'domain', icon: <GiHumanPyramid /> },
  { id: 2, path: 'tuple', text: 'tuple', icon: <GiHumanPyramid /> },
  { id: 2, path: 'place', text: 'place', icon: <GiHumanPyramid /> },
  { id: 2, path: 'item', text: 'item', icon: <GiHumanPyramid /> },
]

export const soLinks = [
  { id: 1, path: 'shock', text: 'shock', icon: <GiMaterialsScience /> },
  { id: 2, path: 'denial', text: 'denial', icon: <GiHumanPyramid /> },

  { id: 2, path: 'anger', text: 'anger', icon: <GiHumanPyramid /> },

  { id: 2, path: 'bargain', text: 'bargain', icon: <GiHumanPyramid /> },

  { id: 2, path: 'depression', text: 'depression', icon: <GiHumanPyramid /> },

  { id: 2, path: 'testing', text: 'testing', icon: <GiHumanPyramid /> },
  { id: 2, path: 'acceptance', text: 'acceptance', icon: <GiHumanPyramid /> },
]
