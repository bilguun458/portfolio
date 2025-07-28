import Link from 'next/link'

import { Container } from '../components/Container'
import {
  InstagramIcon,
  LinkedInIcon,
  MetaIcon,
} from '../components/SocialIcons'

function SocialIcon({ icon: Icon, ...props }) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}

export function Footer() {
  return (
    <footer className="mt-32">
      <Container.Outer>
        <div className="border-t border-zinc-100 pt-10 pb-16 dark:border-zinc-700/40">
          <Container.Inner>
            <div className="flex flex-row items-center">
              <div className="text-sm text-zinc-600 dark:text-zinc-300">
                &copy; {new Date().getFullYear()} Bilguun Batnasan's Portfolio
                </div>
                <div className="text-zinc-700 dark:text-zinc-200 flex">
                  <div className="ml-4 inline-flex self-center gap-6 ">
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
              </div>
            </div>
          </Container.Inner>
        </div>
      </Container.Outer>
    </footer>
  )
}
