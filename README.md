# new_iteration1_within

## Layer 1

###

#### setup tailwind

- add tailwind

```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

- rename to tailwind.config.cjs
- add following content

tailwind.config.cjs

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

- Add the Tailwind directives to your CSS

index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Tailwind directives are instructions that decide how Tailwind CSS creates the styles for your website. They control the global styles, component styles, and utility classes.

#### Setup DaisyUI

[DaisyUI](https://daisyui.com/)

```sh
npm i  -D daisyui@latest @tailwindcss/typography
```

tailwind.config.js

```js
{
 plugins: [require('@tailwindcss/typography'), require('daisyui')],
}
```

#### Install Libraries

```sh
npm i dayjs@1.11.9 @reduxjs/toolkit@1.9.5  react-icons@4.10.1 react-redux@8.1.2

```

#### get assets

4 webp for hifi prototyping

## Layer 2

### pages

#### create extra pages

pages/index.js

```js
export { default as HomeLayout } from './HomeLayout'
export { default as FeatureHome } from './FeatureHome'
export { default as SingleSign } from './SingleSign'
export { default as Signs } from './Signs'
export { default as SignList } from './SignList'
export { default as About } from './About'
export { default as Login } from './Login'
export { default as Register } from './Register'
export { default as Checkout } from './Checkout'
export { default as Orders } from './Orders'
```

App.jsx

```js
import {
  HomeLayout,
  FeatureHome,
  Signs,
  SingleSign,
  SignList,
  About,
  RegisterInterior,
  LoginInterior,
  Checkout,
  Orders,
} from './pages'
```

### in box pages

App.jsx

```js

path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <FeatureHome />,
      },
      {
        path: 'signs',
        element: <Signs />,
      },
      {
        path: 'signs/:id',
        element: <SingleSign />,
      },
      {
        path: 'sigtn-list',
        element: <SignList />,
      },
      { path: 'about', element: <About /> },
      {
        path: 'checkout',
        element: <Checkout />,
      },
      {
        path: 'orders',
        element: <Orders />,
      },
        {
    path: '/loginInterior',
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: '/registerInterior',
    element: <Register />,
    errorElement: <Error />,
  },
    ],
  },

])
```

### interior auth

#### input field component

components/index.js

```js
export { default as FormInput } from './FormInput'
```

FormInput.jsx

```js
const FormInput = ({ label, name, type, defaultValue }) => {
  return (
    <div className="form-control ">
      <label className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        className="input input-bordered "
      />
    </div>
  )
}
export default FormInput
```

#### login page

Login_interior.jsx

```js
import { FormInput, SubmitBtn } from '../components'
import { Form, Link } from 'react-router-dom'

const Login_interior = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="post"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput type="email" label="email" name="identifier" />
        <FormInput type="password" label="password" name="password" />
        <div className="mt-4">
          <SubmitBtn text="login" />
        </div>
        <button type="button" className="btn btn-secondary btn-block">
          guest user
        </button>
        <p className="text-center">
          Not a member yet?
          <Link
            to="/register"
            className="ml-2 link link-hover link-primary capitalize"
          >
            register
          </Link>
        </p>
      </Form>
    </section>
  )
}
export default Login
```

SubmitBtn.jsx

```js
import { useNavigation } from 'react-router-dom'
const SubmitBtn = ({ text }) => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  return (
    <button
      type="submit"
      className="btn btn-primary btn-block"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <span className="loading loading-spinner"></span>
          sending...
        </>
      ) : (
        text || 'submit'
      )}
    </button>
  )
}
export default SubmitBtn
```

#### Register page

```js
import { FormInput, SubmitBtn } from '../components'
import { Form, Link } from 'react-router-dom'

const Register = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Register</h4>
        <FormInput type="text" label="username" name="username" />
        <FormInput type="email" label="email" name="email" />
        <FormInput type="password" label="password" name="password" />
        <div className="mt-4">
          <SubmitBtn text="register" />
        </div>

        <p className="text-center">
          Already a member?
          <Link
            to="/login"
            className="ml-2 link link-hover link-primary capitalize"
          >
            login
          </Link>
        </p>
      </Form>
    </section>
  )
}
export default Register

## Layer 3
```

## layer 3

#### Solution (10) - Header Component in dashboard

```js
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className=" bg-neutral py-2 text-neutral-content ">
      <div className="align-element flex justify-center sm:justify-end ">
        {/* USER */}
        {/* LINKS */}
        <div className="flex gap-x-6 justify-center items-center">
          <Link to="/login" className="link link-hover text-xs sm:text-sm">
            Sign in / Guest
          </Link>
          <Link to="/register" className="link link-hover text-xs sm:text-sm">
            Create an Account
          </Link>
        </div>
      </div>
    </header>
  )
}
export default Header
```

#### right sidebar

```js
import { BsCart3, BsMoonFill, BsSunFill } from 'react-icons/bs'
import { FaBarsStaggered } from 'react-icons/fa6'
import { NavLink } from 'react-router-dom'

const WhatSidebar = () => {
  return (
    <nav className="bg-base-200">
      <div className="navbar align-element ">
        <div className="navbar-start">
          {/* Title */}
          <NavLink
            to="/"
            className="hidden lg:flex btn btn-primary text-3xl items-center "
          >
            C
          </NavLink>
          {/* DROPDOWN */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FaBarsStaggered className="h-6 w-6" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
            >
              nav links
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal ">nav links</ul>
        </div>
        <div className="navbar-end">
          {/* THEME ICONS */}
          {/* CART LINK*/}
          <NavLink to="cart" className="btn btn-ghost btn-circle btn-md ml-4">
            <div className="indicator">
              <BsCart3 className="h-6 w-6" />
              <span className="badge badge-sm badge-primary indicator-item">
                8
              </span>
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  )
}
export default whatSidebar
```

#### NavLinks

NavLinks.jsx

```js
const links = [
  { id: 1, url: '/', text: 'home' },
  { id: 2, url: 'about', text: 'about' },
  { id: 3, url: 'products', text: 'products' },
  { id: 4, url: 'cart', text: 'cart' },
  { id: 5, url: 'checkout', text: 'checkout' },
  { id: 6, url: 'orders', text: 'orders' },
]
import { NavLink } from 'react-router-dom'

const NavLinks = () => {
  return (
    <>
      {links.map((link) => {
        const { id, url, text } = link
        return (
          <li key={id}>
            <NavLink className="capitalize" to={url}>
              {text}
            </NavLink>
          </li>
        )
      })}
    </>
  )
}
export default NavLinks
```

#### About page

```js
const About = () => {
  return (
    <>
      <div className="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center">
        <h1 className="text-4xl font-bold leading-none tracking-tight sm:text-6xl ">
          We love
        </h1>
        <div className="stats bg-primary shadow">
          <div className="stat">
            <div className="stat-title text-primary-content text-4xl font-bold tracking-widest">
              comfy
            </div>
          </div>
        </div>
      </div>
      <p className="mt-6 text-lg leading-8 max-w-2xl mx-auto">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic veniam
        odit, officiis eos mollitia alias, doloremque, aspernatur ratione
        asperiores voluptas labore minus dolores reprehenderit corporis quos.
        Assumenda molestias harum dignissimos?
      </p>
    </>
  )
}
export default About
```

#### Hero component

Hero.jsx

```js
import { Link } from 'react-router-dom'

import hero1 from '../assets/hero1.webp'
import hero2 from '../assets/hero2.webp'
import hero3 from '../assets/hero3.webp'
import hero4 from '../assets/hero4.webp'

const carouselImages = [hero1, hero2, hero3, hero4]
const Hero = () => {
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
      <div>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight  sm:text-6xl ">
          We’re changing the way people shop.
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-8">
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
          cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat
          aliqua. Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
          qui lorem cupidatat commodo.
        </p>
        <div className="mt-10 ">
          <Link to="products" className="btn btn-primary ">
            Our Products
          </Link>
        </div>
      </div>
      <div className="hidden  h-[28rem] lg:carousel carousel-center   p-4 space-x-4 bg-neutral rounded-box">
        {carouselImages.map((image, index) => {
          return (
            <div key={image} className="carousel-item">
              <img
                src={image}
                className="rounded-box h-full w-80  object-cover"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default Hero
```
