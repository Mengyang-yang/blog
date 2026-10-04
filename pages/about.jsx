import Head from 'next/head'
import {
  BriefcaseBusiness,
  Code2,
  GitBranch,
  Mail,
  MapPin,
  Music2,
  PenLine,
  Sparkles,
  UserRound,
} from 'lucide-react'
import Container from '../components/Layout/Container'
import Layout from '../components/Layout/Layout'
import { BLOG_NAME } from '../lib/constants'
import PageHeading from '../components/PageHeading'

const profileHighlights = [
  { icon: UserRound, label: 'Name', value: 'Mengyang Yang' },
  { icon: BriefcaseBusiness, label: 'Role', value: 'Student, software learner' },
  { icon: MapPin, label: 'Location', value: 'China' },
  { icon: Sparkles, label: 'Started', value: '2024' },
]

const skillGroups = [
  {
    icon: Code2,
    title: 'Programming Languages',
    items: ['C', 'C++', 'Swift'],
  },
  {
    icon: PenLine,
    title: 'Web & Native UI',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'SwiftUI'],
  },
  {
    icon: Sparkles,
    title: 'Tools',
    items: ['Git', 'VS Code'],
  },
]

const interests = [
  { icon: Music2, label: 'Music' },
  { icon: Code2, label: 'Coding' },
  { icon: PenLine, label: 'Writing' },
]

export default function About() {
  return (
    <Layout>
      <Head>
        <title>{`About | ${BLOG_NAME}`}</title>
      </Head>
      <Container>
        <PageHeading>Nice to meet you.</PageHeading>

        <section className="max-w-5xl py-8 md:pt-8 md:pb-36">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {profileHighlights.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium uppercase tracking-[0.08em] text-slate-500">
                  {label}
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                  <UserRound className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold text-slate-900">About Me</h2>
              </div>
              <div className="space-y-4 text-base leading-7 text-slate-700">
                <p>
                  I&apos;m Mengyang Yang, a student majoring in electronic information
                  engineering based in China. I started learning programming in 2024 and
                  have been growing by building projects, exploring modern tools, and
                  documenting my learning journey along the way.
                </p>
                <p>
                  I enjoy turning ideas into practical experiences and value clean,
                  user-friendly solutions. My interests include software development,
                  web technology, product thinking, and writing about the things I learn.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold text-slate-900">Interests</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {interests.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700"
                  >
                    <Icon className="h-4 w-4 text-sky-600" />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {skillGroups.map(({ icon: Icon, title, items }) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
                </div>
                <ul className="space-y-2 text-sm text-slate-700">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100 text-pink-700">
                <Mail className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="https://github.com/Mengyang-yang"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
              >
                <GitBranch className="h-4 w-4" />
                GitHub: Mengyang-yang
              </a>
              <a
                href="mailto:giffgaffuk78459@icloud.com"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
              >
                <Mail className="h-4 w-4" />
                giffgaffuk78459@icloud.com
              </a>
            </div>
          </div>
        </section>
      </Container>
    </Layout>
  )
}
