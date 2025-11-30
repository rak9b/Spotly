import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Download, Calendar, MapPin, User } from 'lucide-react';
import { Button } from '../ui/Button';
import { Event } from '../../types';
import { motion } from 'framer-motion';
import { ThreeDCard } from '../ui/ThreeDCard';

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
  bookingId: string;
  date: string;
  guests: number;
}

export const TicketModal = ({ isOpen, onClose, event, bookingId, date, guests }: TicketModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-sm perspective-1000"
      >
        <ThreeDCard className="overflow-hidden rounded-3xl bg-white shadow-2xl" depth={20}>
            {/* Header Pattern */}
            <div className="h-32 bg-indigo-600 p-6 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold relative z-10">Your Ticket</h2>
                <p className="text-indigo-100 text-sm relative z-10">Scan this at the meeting point</p>
                <button onClick={onClose} className="absolute top-4 right-4 rounded-full bg-white/20 p-1 hover:bg-white/30 text-white z-20">
                    <X className="h-5 w-5" />
                </button>
            </div>

            {/* Ticket Body */}
            <div className="p-6 bg-white">
                <div className="mb-6 text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{event.title}</h3>
                    <p className="text-sm text-gray-500">{event.city}</p>
                </div>

                <div className="mb-8 flex justify-center">
                    <div className="rounded-xl border-2 border-dashed border-gray-200 p-4 bg-white shadow-inner">
                        <QRCodeSVG value={`booking:${bookingId}`} size={160} />
                    </div>
                </div>

                <div className="space-y-4 border-t border-gray-100 pt-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                            <Calendar className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Date & Time</p>
                            <p className="text-sm font-bold text-gray-900">{date}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                            <MapPin className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Meeting Point</p>
                            <p className="text-sm font-bold text-gray-900">{event.city}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                            <User className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Guests</p>
                            <p className="text-sm font-bold text-gray-900">{guests} Person{guests > 1 ? 's' : ''}</p>
                        </div>
                    </div>
                </div>

                <Button className="mt-8 w-full gap-2" variant="outline">
                    <Download className="h-4 w-4" /> Save to Gallery
                </Button>
            </div>
        </ThreeDCard>
      </motion.div>
    </div>
  );
};
