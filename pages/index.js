import Head from 'next/head'
import Link from 'next/link'
import clsx from 'clsx'

import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
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
        Download CV
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
              Welcome to my Web Development Portofolio!
              </h1>
              <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
                <p>
                  I'm Bilguun Batnasan, a passionate Software Engineer with over 6 Years of Experience based in USA. Here, you'll find a space that  of my journey in the world of web development, where creativity meets functionality.
                </p>
                <div className="mt-6 flex gap-6">
                  <SocialIcon
                    href="https://twitter.com"
                    aria-label="Follow on Twitter"
                    icon={TwitterIcon}
                  />
                  <SocialIcon
                    href="https://instagram.com"
                    aria-label="Follow on Instagram"
                    icon={InstagramIcon}
                  />
                  <SocialIcon
                    href="https://github.com"
                    aria-label="Follow on GitHub"
                    icon={GitHubIcon}
                  />
                  <SocialIcon
                    href="https://linkedin.com"
                    aria-label="Follow on LinkedIn"
                    icon={LinkedInIcon}
                  />
                </div>
                <div className="lg:pl-20">
                  <ul role="list">
                    <SocialLink href="#" icon={InstagramIcon} className="mt-4">
                      Follow on Instagram
                    </SocialLink>
                    <SocialLink href="#" icon={GitHubIcon} className="mt-4">
                      Follow on GitHub
                    </SocialLink>
                    <SocialLink href="#" icon={LinkedInIcon} className="mt-4">
                      Follow on LinkedIn
                    </SocialLink>
                    <SocialLink
                      href="mailto:spencer@planetaria.tech"
                      icon={MailIcon}
                      className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
                    >
                      spencer@planetaria.tech
                    </SocialLink>
                  </ul>
                </div>
                <p>
                  I’ve loved making things for as long as I can remember, and
                  wrote my first program when I was 6 years old, just two weeks
                  after my mom brought home the brand new Macintosh LC 550 that I
                  taught myself to type on.
                </p>
                <p>
                  The only thing I loved more than computers as a kid was space.
                  When I was 8, I climbed the 40-foot oak tree at the back of our
                  yard while wearing my older sister’s motorcycle helmet, counted
                  down from three, and jumped — hoping the tree was tall enough
                  that with just a bit of momentum I’d be able to get to orbit.
                </p>
                <p>
                  I spent the next few summers indoors working on a rocket design,
                  while I recovered from the multiple surgeries it took to fix my
                  badly broken legs. It took nine iterations, but when I was 15 I
                  sent my dad’s Blackberry into orbit and was able to transmit a
                  photo back down to our family computer from space.
                </p>
                <p>
                  Today, I’m the founder of Planetaria, where we’re working on
                  civilian space suits and manned shuttle kits you can assemble at
                  home so that the next generation of kids really <em>can</em>{' '}
                  make it to orbit — from the comfort of their own backyards.
                </p>
              </div>
            </div>
            <div className="lg:pl-20">
              <ul role="list">
                <SocialLink href="#" icon={TwitterIcon}>
                  Follow on Twitter
                </SocialLink>
                <SocialLink href="#" icon={InstagramIcon} className="mt-4">
                  Follow on Instagram
                </SocialLink>
                <SocialLink href="#" icon={GitHubIcon} className="mt-4">
                  Follow on GitHub
                </SocialLink>
                <SocialLink href="#" icon={LinkedInIcon} className="mt-4">
                  Follow on LinkedIn
                </SocialLink>
                <SocialLink
                  href="mailto:spencer@planetaria.tech"
                  icon={MailIcon}
                  className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
                >
                  spencer@planetaria.tech
                </SocialLink>
              </ul>
              <Resume />
              <div className="space-y-10 lg:pl-16 xl:pl-24">
                {/* <Newsletter /> */}
                <Resume />
              </div>
            </div>
          </div>
        </Container>
        <Footer />
      </div>
    </>
  )
}