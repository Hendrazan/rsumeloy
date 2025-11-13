"use client";

import React from 'react';
import { Button } from '../../../components/ui/Button';
import { WhatsAppIcon, Calendar } from '../../../components/icons';

interface RegistrationButtonsProps {
    whatsappNumber: string;
}

export function WhatsAppButton({ whatsappNumber }: RegistrationButtonsProps) {
    return (
        <Button 
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            onClick={() => window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Halo%20RSU%20Meloy%2C%20saya%20ingin%20mendaftar%20sebagai%20pasien%20baru`, '_blank')}
        >
            <WhatsAppIcon className="h-5 w-5 mr-2" />
            Daftar via WhatsApp
        </Button>
    );
}

export function ApamButton() {
    return (
        <Button 
            className="w-full"
            onClick={() => window.open('https://apam.rsumeloy.co.id', '_blank')}
        >
            <Calendar className="h-5 w-5 mr-2" />
            Buka APAM
        </Button>
    );
}
