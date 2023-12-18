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
import { GiMaterialsScience, GiFamilyTree } from 'react-icons/gi'
import { GiHumanPyramid, GiMisdirection, GiEvilMinion } from 'react-icons/gi'

import { nanoid } from 'nanoid'

import { LuBoxes, LuBox, LuPersonStanding, LuReplaceAll } from 'react-icons/lu'
import { FaSitemap } from 'react-icons/fa'
import { ImShocked } from 'react-icons/im'
import { TfiHandStop } from 'react-icons/tfi'
import { TbMoneybag } from 'react-icons/tb'
import { SiCodeproject, SiTestinglibrary } from 'react-icons/si'
import { MdSwitchAccessShortcut } from 'react-icons/md'

export const links = [
  { text: 'add Achievement', path: 'add-achievement', icon: <FaWpforms /> },
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
  { id: nanoid(), path: '.', text: 'home', icon: <TbHome /> },
  { id: nanoid(), path: 'about', text: 'about', icon: <FaRegQuestionCircle /> },
  { id: nanoid(), path: 'all-signs', text: 'signs', icon: <FaHands /> },
  { id: nanoid(), path: 'cart', text: 'cart', icon: <PiHandbagBold /> },
  {
    id: nanoid(),
    path: 'checkout',
    text: 'checkout',
    icon: <FaHandsHoldingCircle />,
  },
  { id: nanoid(), path: 'orders', text: 'orders', icon: <FaHandshakeSimple /> },
]

export const footerLinks = [
  { id: nanoid(), path: 'about', text: 'about', icon: <FaRegQuestionCircle /> },
  {
    id: nanoid(),
    path: 'events',
    text: 'events',
    icon: <MdOutlineEventNote />,
  },
  { id: nanoid(), path: 'news', text: 'news', icon: <RiNewspaperLine /> },
  {
    id: nanoid(),
    path: 'help',
    text: 'help',
    icon: <IoIosHelpCircleOutline />,
  },
  {
    id: nanoid(),
    path: 'terms-and-conditions',
    text: 'terms and conditions',
    icon: <GoCodeOfConduct />,
  },
  {
    id: nanoid(),
    path: 'cookie-setting',
    text: 'cookie setting',
    icon: <LiaCookieBiteSolid />,
  },
]

export const partLinks = [
  {
    id: nanoid(),
    path: 'references',
    text: 'references',
    icon: <VscReferences />,
  },
  { id: nanoid(), path: 'word', text: 'word', icon: <SiSemanticweb /> },
  {
    id: nanoid(),
    path: 'orientation',
    text: 'orientation',
    icon: <FaHandPointer />,
  },
  {
    id: nanoid(),
    path: 'hand-status',
    text: 'hand status',
    icon: <PiHandEye />,
  },
  {
    id: nanoid(),
    path: 'prefix',
    text: 'prefix',
    icon: <GoCodeOfConduct />,
  },
]

export const curriculumLinks = [
  {
    id: nanoid(),
    fragmentId: nanoid(),
    path: 'no',
    text: 'no',
    icon: <GiMaterialsScience />,
    activeIcon: <LuBoxes />,
  },
  {
    id: nanoid(),
    fragmentId: nanoid(),
    path: 'so',
    text: 'so',
    icon: <GiHumanPyramid />,
    activeIcon: <LuPersonStanding />,
  },
]

export const noLinks = [
  { id: nanoid(), path: 'crud', text: 'crud', icon: <LuBox /> },
  { id: nanoid(), path: 'domain', text: 'domain', icon: <FaSitemap /> },
  { id: nanoid(), path: 'tuple', text: 'tuple', icon: <GiMisdirection /> },
  { id: nanoid(), path: 'place', text: 'place', icon: <LuReplaceAll /> },
  { id: nanoid(), path: 'item', text: 'item', icon: <GiFamilyTree /> },
]

export const soLinks = [
  { id: nanoid(), path: 'shock', text: 'shock', icon: <ImShocked /> },
  { id: nanoid(), path: 'denial', text: 'denial', icon: <TfiHandStop /> },

  { id: nanoid(), path: 'anger', text: 'anger', icon: <GiEvilMinion /> },

  { id: nanoid(), path: 'bargain', text: 'bargain', icon: <TbMoneybag /> },

  {
    id: nanoid(),
    path: 'depression',
    text: 'depression',
    icon: <SiCodeproject />,
  },

  {
    id: nanoid(),
    path: 'testing',
    text: 'testing',
    icon: <SiTestinglibrary />,
  },
  {
    id: nanoid(),
    path: 'acceptance',
    text: 'acceptance',
    icon: <MdSwitchAccessShortcut />,
  },
]
