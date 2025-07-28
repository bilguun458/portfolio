import { Fragment, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { ChatbotModal } from '../components/ChatbotModal'

import { Container } from '../components/Container'

function SunIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M8 12.25A4.25 4.25 0 0 1 12.25 8v0a4.25 4.25 0 0 1 4.25 4.25v0a4.25 4.25 0 0 1-4.25 4.25v0A4.25 4.25 0 0 1 8 12.25v0Z" />
      <path
        d="M12.25 3v1.5M21.5 12.25H20M18.791 18.791l-1.06-1.06M18.791 5.709l-1.06 1.06M12.25 20v1.5M4.5 12.25H3M6.77 6.77 5.709 5.709M6.77 17.73l-1.061 1.061"
        fill="none"
      />
    </svg>
  )
}

function MoonIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M17.25 16.22a6.937 6.937 0 0 1-9.47-9.47 7.451 7.451 0 1 0 9.47 9.47ZM12.75 7C17 7 17 2.75 17 2.75S17 7 21.25 7C17 7 17 11.25 17 11.25S17 7 12.75 7Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function AIIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50"  {...props}>
      <path d="M 38.988281 2 A 1.0001 1.0001 0 0 0 38.072266 2.6269531 L 36.720703 5.9921875 C 36.221194 7.2355579 35.235557 8.221194 33.992188 8.7207031 L 30.626953 10.072266 A 1.0001 1.0001 0 0 0 30.626953 11.927734 L 33.992188 13.279297 C 35.235557 13.778806 36.221194 14.764442 36.720703 16.007812 L 38.072266 19.373047 A 1.0001 1.0001 0 0 0 39.927734 19.373047 L 41.279297 16.007812 C 41.778806 14.764442 42.764443 13.778806 44.007812 13.279297 L 47.373047 11.927734 A 1.0001 1.0001 0 0 0 47.373047 10.072266 L 44.007812 8.7207031 C 42.764443 8.221194 41.778806 7.2355579 41.279297 5.9921875 L 39.927734 2.6269531 A 1.0001 1.0001 0 0 0 38.988281 2 z M 39 5.6835938 L 39.423828 6.7382812 C 40.126319 8.4869109 41.513089 9.8736809 43.261719 10.576172 L 44.316406 11 L 43.261719 11.423828 C 41.513089 12.126319 40.126319 13.513089 39.423828 15.261719 L 39 16.316406 L 38.576172 15.261719 C 37.873681 13.513089 36.486911 12.126319 34.738281 11.423828 L 33.683594 11 L 34.738281 10.576172 C 36.486911 9.8736809 37.873681 8.4869109 38.576172 6.7382812 L 39 5.6835938 z M 21 10.076172 C 20.287853 10.076432 19.530349 10.524462 19.236328 11.287109 L 16.529297 18.308594 C 15.426681 21.168619 13.168619 23.428634 10.308594 24.53125 L 3.2851562 27.238281 C 2.5221924 27.531806 2.0761719 28.288086 2.0761719 29 C 2.0761719 29.711914 2.5227006 30.469338 3.2851562 30.763672 L 10.308594 33.46875 C 13.168619 34.571366 15.428634 36.831381 16.53125 39.691406 L 19.238281 46.712891 C 19.531806 47.475855 20.288086 47.923828 21 47.923828 C 21.711914 47.923828 22.469338 47.477299 22.763672 46.714844 A 1.0001 1.0001 0 0 0 22.763672 46.712891 L 25.470703 39.691406 C 26.573319 36.831381 28.831381 34.571366 31.691406 33.46875 L 38.714844 30.761719 C 39.477808 30.468241 39.923828 29.711914 39.923828 29 C 39.923828 28.288086 39.477299 27.530662 38.714844 27.236328 L 31.691406 24.529297 C 28.831381 23.426681 26.573319 21.168619 25.470703 18.308594 L 22.763672 11.285156 C 22.469338 10.522701 21.712147 10.075911 21 10.076172 z M 21 12.273438 L 23.603516 19.027344 C 24.908899 22.413319 27.586681 25.091101 30.972656 26.396484 L 37.726562 29 L 30.972656 31.603516 C 27.586681 32.908899 24.908899 35.584728 23.603516 38.970703 L 21 45.724609 L 18.396484 38.970703 C 17.091101 35.584728 14.415272 32.908899 11.029297 31.603516 L 4.2734375 29 L 11.027344 26.396484 C 14.413319 25.091101 17.091101 22.415272 18.396484 19.029297 L 21 12.273438 z"></path>
      </svg>
  )
}


function ModeToggle() {
  function disableTransitionsTemporarily() {
    document.documentElement.classList.add('[&_*]:!transition-none')
    window.setTimeout(() => {
      document.documentElement.classList.remove('[&_*]:!transition-none')
    }, 0)
  }

  function toggleMode() {
    disableTransitionsTemporarily()

    let darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    let isSystemDarkMode = darkModeMediaQuery.matches
    let isDarkMode = document.documentElement.classList.toggle('dark')

    if (isDarkMode === isSystemDarkMode) {
      delete window.localStorage.isDarkMode
    } else {
      window.localStorage.isDarkMode = isDarkMode
    }
  }

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      className="group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
      onClick={toggleMode}
    >
      <SunIcon className="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-teal-50 [@media(prefers-color-scheme:dark)]:stroke-teal-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-teal-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-teal-600" />
      <MoonIcon className="hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400 [@media_not_(prefers-color-scheme:dark)]:fill-teal-400/10 [@media_not_(prefers-color-scheme:dark)]:stroke-teal-500" />
    </button>
  )
}

function clamp(number, a, b) {
  let min = Math.min(a, b)
  let max = Math.max(a, b)
  return Math.min(Math.max(number, min), max)
}

function AvatarContainer({ className, ...props }) {
  return (
    <div
      className={clsx(
        className,
        'h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10'
      )}
      {...props}
    />
  )
}

function Avatar({ large = false, className, ...props }) {
  return (
    <Link
      href="/"
      aria-label="Home"
      className={clsx(className, 'pointer-events-auto')}
      {...props}
    >
      <img
        src={'/portfolio/images/profile.jpg'}
        alt=""
        className={clsx(
          'rounded-full bg-zinc-100 object-cover dark:bg-zinc-800',
          large ? 'h-16 w-16' : 'h-9 w-9'
        )}
      />
    </Link>
  )
}

export function Header() {

  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  

  return (
    <>
      <header
        className="relative z-50 flex flex-col"
        style={{
          height: 'var(--header-height)',
          marginBottom: 'var(--header-mb)',
        }}
      >
        <ChatbotModal 
          isOpen={isChatbotOpen} 
          onClose={() => setIsChatbotOpen(false)} 
        />
        <div
          className="top-0 z-10 h-16 pt-6"
          style={{ position: 'var(--header-position)' }}
        >
          <Container
            className="top-[var(--header-top,theme(spacing.6))] w-full"
            style={{ position: 'var(--header-inner-position)' }}
          >
            <div className="relative flex gap-4">
              <div className="flex flex-1">
                <div className="pointer-events-auto">
              
                  <button
                    type="button"
                    aria-label="Toggle dark mode"
                    className="floating-button group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
                    onClick={() => setIsChatbotOpen(true)}
                  >
                    <AIIcon className="h-6 w-6 fill-zinc-100 stroke-zinc-900 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-teal-50 [@media(prefers-color-scheme:dark)]:stroke-teal-200 [@media(prefers-color-scheme:dark)]:group-hover:fill-teal-500 [@media(prefers-color-scheme:dark)]:group-hover:stroke-teal-200" />
                    <AIIcon className="hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400 [@media_not_(prefers-color-scheme:dark)]:fill-teal-400/10 [@media_not_(prefers-color-scheme:dark)]:stroke-teal-500" />
                  </button>
                </div>
              </div>
              <div className="flex justify-end md:flex-1">
                <div className="pointer-events-auto">
                  <ModeToggle />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>
      <div style={{ height: 'var(--content-offset)' }} />
    </>
  )
}
