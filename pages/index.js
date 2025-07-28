import Head from 'next/head'
import Link from 'next/link'
import clsx from 'clsx'

import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import {
  InstagramIcon,
  LinkedInIcon,
  MetaIcon,
  PhoneIcon
} from '../components/SocialIcons'

function SocialLink({ className, href, children, icon: Icon }) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function SocialIcon({ icon: Icon, ...props }) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

function BriefcaseIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function ArrowDownIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// import logoThermofisher from '/portfolio/images//thermofisher.png'
// import logoUnimedia from '/portfolio/images//unimedia.png'
function Resume() {
  let resume = [
    {
      company: 'Thermo Fisher Scientific Inc',
      title: 'Software Engineer',
      // logo: logoThermofisher,
      icon: '/portfolio/images//thermofisher.png',
      start: '2022-04',
      end: '2025-04',
    },
    {
      company: 'Unimedia Solutions LLC',
      title: 'Software Developer',
      // logo: logoUnimedia,
      icon: '/portfolio/images//unimedia.png',
      start: '2018-07',
      end: '2021-07',
    },
  ]

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work experience</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <li key={roleIndex} className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <img src={role.icon} alt="" className="h-7 w-7" unoptimized />
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">Company</dt>
              <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {role.company}
              </dd>
              <dt className="sr-only">Role</dt>
              <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                {role.title}
              </dd>
              <dt className="sr-only">Date</dt>
              <dd
                className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
                aria-label={`${role.start.label ?? role.start} until ${
                  role.end.label ?? role.end
                }`}
              >
                <time dateTime={role.start.dateTime ?? role.start}>
                  {role.start.label ?? role.start}
                </time>{' '}
                <span aria-hidden="true">—</span>{' '}
                <time dateTime={role.end.dateTime ?? role.end}>
                  {role.end.label ?? role.end}
                </time>
              </dd>
            </dl>
          </li>
        ))}
      </ol>
      <Button href="#" variant="secondary" className="group mt-6 w-full">
        Resume
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  )
}

export default function About() {
  return (
    <>
      <Head>
        <title>Bilguun Batnasan - Portfolio</title>
        <meta
          name="description"
          content="I’m Spencer Sharp. I live in New York City, where I design the future."
        />
      </Head>
      <div className="relative">
        <Header />
        <Container className="mt-16 sm:mt-32">
          <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
            <div className="lg:pl-20">
              <div className="max-w-xs px-2.5 lg:max-w-none">
                <img
                  src="/portfolio/images/profile.jpg"
                  alt=""
                  className="aspect-square rotate-0 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
                />
              </div>
            </div>
            <div className="lg:order-first lg:row-span-2">
              <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              Welcome to my Portofolio
              </h1>
              <div className="mt-6 space-y-7 text-base text-zinc-800 dark:text-zinc-200">
                <p>
                  Hi, I’m Bilguun Batnasan, a passionate Software Engineer based in the USA with over 6 years of experience in designing, building, and optimizing Web/Mobile applications and distributed systems.
                </p>
                <p>
                Here, you'll find a space that reflects both my professional journey and a bit of my personal life where code, creativity and curiosity go hand in hand.
                </p>
                <div className="flex gap-6">
                  <SocialIcon
                    href="https://www.linkedin.com/in/bbatnasan29/"
                    aria-label="Follow on LinkedIn"
                    icon={LinkedInIcon}
                  />
                  <SocialIcon
                    href="https://www.facebook.com/bilguun1020/"
                    aria-label="Follow on Facebook"
                    icon={MetaIcon}
                  />
                  <SocialIcon
                    href="https://instagram.com/bilguun1020/"
                    aria-label="Follow on Instagram"
                    icon={InstagramIcon}
                  />
                </div>
                
                <div>
                I am an innovative and results-driven software engineer with a strong foundation in:
                <ul className='p-4'>
                  <li className="flex">🏗️  Scalable architecture design</li>
                  <li className="flex mt-2">🚀  Full-stack development</li>
                  <li className="flex mt-2">📱  Mobile development</li>
                  <li className="flex mt-2">⚡  Performance optimization</li>
                  <li className="flex mt-2">🎯  User-centered design</li>
                </ul>
                My work spans across e-commerce, media streaming, and enterprise platforms, where I’ve led initiatives to improve system performance, elevate user experience, and enhance engineering productivity through clean, maintainable code and cross-functional teamwork.
                </div>
                <div>
                When I’m not coding, I’m most at home in nature. I’m a nature lover at heart and find deep fulfillment in being outdoors. Whether it's hiking through scenic trails, or just enjoying time surrounded by trees and mountains.

                I also have a strong passion for soft extreme sports, including:
                <ul className='p-4'>
                  <li className="flex">🚵  Mountain Biking</li>
                  <li className="flex mt-2">🎿  Skiing</li>
                  <li className="flex mt-2">🏂  Snowboarding</li>
                </ul>
                These activities fuel my creativity, sharpen my focus, and give me fresh perspective that I bring into my work.
                </div>
              </div>
            </div>
            <div className="lg:pl-20">
              <Resume />
              <div className="pl-12 pr-12">
                <SocialLink
                  href="mailto:batnasanbilguun29@gmail.com"
                  icon={MailIcon}
                  className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
                >
                  Contact me by Email
                </SocialLink>
                <SocialLink href="tel:+16418191619" icon={PhoneIcon} className="mt-4">
                  Contact me by Phone
                </SocialLink>
              </div>
            </div>
          </div>
        </Container>
        <Footer />
      </div>
    </>
  )
}