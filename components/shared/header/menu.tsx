import React from 'react'
import ModeToggle from './mode-toggle'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { EllipsisVertical, ShoppingCartIcon } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { UserButton } from './user-button'

export default function MenuHeader() {
  return (
    <div className='flex justify-end gap-3'>
        <nav className='hidden md:flex max-w-xs gap-1 items-center'>
                <ModeToggle />
                <Button asChild variant={'ghost'}>
                        <Link href={'/cart'}>
                           <ShoppingCartIcon/> Cart
                        </Link>
                    </Button>
                <UserButton />
        </nav>
        <nav className='md:hidden'>
            <Sheet>
                <SheetTrigger className='align-middle'><EllipsisVertical />
                    <SheetContent className='flex flex-col items-start p-4 max-w-xs'>
                        <SheetTitle>Menu</SheetTitle>
                         <ModeToggle />
                <Button asChild variant={'ghost'}>
                        <Link href={'/cart'}>
                           <ShoppingCartIcon/> Cart
                        </Link>
                    </Button>
                    <UserButton />
                    <SheetDescription></SheetDescription>
                    </SheetContent>
                </SheetTrigger>
            </Sheet>
               
        </nav>
            </div>
  )
}
