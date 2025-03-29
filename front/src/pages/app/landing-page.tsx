import { JobApplicationCard } from '@/components/job-application-card'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import phoneImage from '../../../assets/phone-landing-page.png'
import guyResume from '../../../assets/guy-holding-his-resume.png'
import githubIcon from '../../../assets/github-icon.png'
import { NavLink } from 'react-router-dom'

export function LandingPage() {
  return (
    <div className="w-full h-screen font-dmsans">
      <nav className="w-full bg-[#3c2075] py-2 flex flex-row justify-around text-white font-bold border-b-4 border-white md:text-lg">
        <NavLink to={'/sign-in'}>
          <h1 className="hover:bg-white transition-all duration-300 rounded-lg hover:text-[#3c2075] py-1 px-2">
            Login
          </h1>
        </NavLink>
        <NavLink to={'/sign-up'}>
          <h1 className="hover:bg-white transition-all duration-300 rounded-lg hover:text-[#3c2075] py-1 px-2">
            Register
          </h1>
        </NavLink>
      </nav>

      <div className="bg-[#7550C1] flex flex-col md:flex-row md:justify-around md:py-14 text-white px-10 pb-10">
        <div className="flex flex-col text-center pt-5 pb-10 gap-5 md:gap-16">
          <h1 className="text-5xl font-semibold">
            Resume Management Made Simple
          </h1>
          <p className="md:text-lg">
            An easy way to store information about your current job
            applications.
          </p>
          <NavLink to={'/sign-in'}>
            <Button className="md:p-5 md:text-md font-semibold hover:scale-105 transition-transform duration-300 ease-in-out bg-[#4d2799] hover:bg-[#3c2075] cursor-pointer ">
              Get started
            </Button>
          </NavLink>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Job Applications</CardTitle>
            <CardDescription>Your most recent job applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <JobApplicationCard
                enterpriseName="Acme Inc"
                description="Front-end developer position in e-commerce team"
              />
              <JobApplicationCard
                enterpriseName="Globex Corporation"
                description="Had a initial phone call with the recruiter"
              />
              <JobApplicationCard
                enterpriseName="Umbrella Group"
                description="Submitted the application last week"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="w-full bg-white flex flex-col md:justify-around md:flex-row-reverse px-10 md:pb-0 py-10 gap-6">
        <div className="flex flex-col gap-6 md:justify-center md:gap-16">
          <h1 className="text-[#4849E8] text-5xl font-semibold text-center">
            Track Your Job Applications
          </h1>
          <p className="text-[#656F75] text-center">
            Keep track of your active job applications with this easy-to-use
            tool.
          </p>
        </div>

        <img src={phoneImage} alt="phone running cv manager" />
      </div>

      <div className="w-full bg-[#7550C1] py-6 text-white flex flex-col md:hidden text-center gap-6 px-10">
        <h1 className="text-5xl font-semibold">Why use CV Manager?</h1>
        <div>
          <img
            src={guyResume}
            alt="guy holding his resume"
            className="rounded-2xl"
          />
        </div>
        <p>
          You probably won&apos;t remember all the job applications you&apos;ve
          submitted. That&apos;s why keeping track of your data is essential—and
          that&apos;s where CV Manager helps you stay organized.
        </p>
      </div>

      <div className="hidden md:flex w-full  bg-[#7550C1] py-6 text-white mitems-center flex-row justify-around items-center text-center gap-6 px-10">
        <div className="flex flex-col max-w-1/3 gap-16">
          <h1 className="text-5xl font-semibold">Why use CV Manager?</h1>

          <p className="w-max-3/4">
            You probably won&apos;t remember all the job applications
            you&apos;ve submitted. That&apos;s why keeping track of your data is
            essential—and that&apos;s where CV Manager helps you stay organized.
          </p>
        </div>

        <div className="h-[32rem]">
          <img
            src={guyResume}
            alt="guy holding his resume"
            className="rounded-2xl h-full"
          />
        </div>
      </div>

      <footer className="w-full bg-[#3c2075] text-white flex flex-col text-center items-center gap-2 py-2 px-2">
        <h3 className="text-sm font-extralight">
          Desenvolvido por Thales Oliveira, Gustavo Bañares e Luam Ramlow
        </h3>
        <a
          href="https://github.com/ProgramadoresSemPatria/Time-5"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={githubIcon} alt="github icon" className="h-6" />
        </a>
      </footer>
    </div>
  )
}
