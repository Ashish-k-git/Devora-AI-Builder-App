import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { ArrowRight, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import PricingModal from './PricingModal'
import { checkUser } from '@/lib/checkUser'
import { PLANS } from '@/lib/constants'
import { Plan } from '@/types/plans'

const Header = async() => {
  const user = await checkUser();
  return (
    <header className='w-full fixed top-0 left-0 z-50 h-16 border-white/6 bg-zinc-900 backdrop-blur-md'
    
    >
        <nav className='mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6'>
            
            <Link href='/'>
                <Image
                    src={'/longlogo.png'}
                    alt='devora logo'
                    width={400}
                    height={400}
                    className='h-15 w-auto rounded-md'
                />
            </Link>

            <div className="flex items-center gap-5">
                <Show when="signed-in">
                    <Link
                        href={"/projects"}
                        className='text-[18px] font-medium text-white/40 transition-colors hover:text-white/80'
                        >Projects
                    </Link>

                    {user && (
                    <PricingModal>
                        <span className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 text-xs text-white/70">
                        <Zap className="h-3 w-3 fill-white/70" />
                        {user.credits}credits
                        </span>
                    </PricingModal>
                    )}

                    <UserButton />
                </Show>

                <Show when="signed-out">
                    <SignInButton mode='modal'>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-[13px] font-medium text-white/50 hover:text-white/90 hover:bg-transparent"
                        >
                            Sign in
                        </Button>
                    </SignInButton>
                    <SignUpButton mode='modal'>
                        <Button
                            size={'sm'}
                            className='bg-purple-700 text-white rounded-full h-9 font-medium  active:scale-95 px-4 sm:px-5 sm:h-11 cursor-pointer hover:bg-purple-400'
                        >
                            Get Started
                            <ArrowRight className='h-3 w-3 opacity-60'/>
                        </Button>
                    </SignUpButton>
                </Show>
                

            </div>

        </nav>
    </header>
  )
}

export default Header
