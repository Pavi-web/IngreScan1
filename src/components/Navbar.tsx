
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProfile } from '@/contexts/ProfileContext';
import { 
  User, Search, ShoppingBag, Menu, X, Heart, Calendar, Settings, LogOut, Home
} from 'lucide-react';

import ProfileCard from '@/components/ProfileCard';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const Navbar = () => {
  const { profile } = useProfile();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 glass backdrop-blur-lg border-b border-slate-200/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-bold">IS</span>
            </div>
            <span className="font-display font-bold text-xl">IngreScan</span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/ingredients" className="nav-link">Ingredients</Link>
            <Link to="/products" className="nav-link">Products</Link>
            <Link to="/consult" className="nav-link">Consultation</Link>
          </nav>

          {/* Profile and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/search" className="p-2 rounded-full hover:bg-accent animate-hover">
                  <Search className="h-5 w-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>Search</TooltipContent>
            </Tooltip>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt={profile.name} />
                    <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-1 glass">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsOpen(true)}>
                  <span>Profile Setup</span>
                </DropdownMenuItem>
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <div />
                  </SheetTrigger>
                  <SheetContent>
                    <ProfileCard/>
                  </SheetContent>
                </Sheet>
                <DropdownMenuItem>
                  <Heart className="mr-2 h-4 w-4" />
                  <span>Favorites</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  <span>My Products</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Consultations</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" className="p-2">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] glass-dark">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-6">
                      <Link to="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                          <span className="text-white font-bold">IS</span>
                        </div>
                        <span className="font-display font-bold text-xl">IngreScan</span>
                      </Link>
                    </div>
                    <nav className="flex flex-col space-y-6">
                      <Link to="/" className="flex items-center space-x-3 text-lg">
                        <Home className="h-5 w-5" />
                        <span>Home</span>
                      </Link>
                      <Link to="/ingredients" className="flex items-center space-x-3 text-lg">
                        <Search className="h-5 w-5" />
                        <span>Ingredients</span>
                      </Link>
                      <Link to="/products" className="flex items-center space-x-3 text-lg">
                        <ShoppingBag className="h-5 w-5" />
                        <span>Products</span>
                      </Link>
                      <Link to="/consult" className="flex items-center space-x-3 text-lg">
                        <Calendar className="h-5 w-5" />
                        <span>Consultation</span>
                      </Link>
                    </nav>
                    <div className="mt-auto">
                      <div className="flex items-center space-x-3 py-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{profile.name}</div>
                          <div className="text-sm text-muted-foreground">{profile.email}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
