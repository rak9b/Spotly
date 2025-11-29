import React from 'react';
import { MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <MapPin className="h-6 w-6 text-indigo-500" />
              <span className="text-xl font-bold">LocalGuide.ai</span>
            </div>
            <p className="text-sm text-gray-400">
              Connecting travelers with local experts for unforgettable experiences. Powered by AI.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-white"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-white"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-white"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Explore Events</a></li>
              <li><a href="#" className="hover:text-white">Find Guides</a></li>
              <li><a href="#" className="hover:text-white">How it Works</a></li>
              <li><a href="#" className="hover:text-white">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Safety Center</a></li>
              <li><a href="#" className="hover:text-white">Community Guidelines</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} LocalGuide.ai. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
