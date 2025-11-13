'use client';
import PageHeader from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { MapPin, Phone, Clock, Award } from '@/components/icons';
import { useLanguage } from '@/hooks/useContextHooks';
import hospitalInfo from '@/data/hospitalInfo.json';

export default function LayananSangattaPage() {
  const { language } = useLanguage();

  const pageContent = {
    id: {
      title: "Layanan Kesehatan di Sangatta",
      description: "RSU Meloy menyediakan layanan kesehatan komprehensif untuk masyarakat Sangatta dan sekitarnya",
      contacts: "Kontak",
      address: "Alamat",
      operatingHours: "Jam Operasional",
      facilities: "Fasilitas dan Layanan",
      specialists: "Dokter Spesialis",
      insurance: "Kerjasama Asuransi",
      certifications: "Sertifikasi & Akreditasi",
      testimonials: "Testimoni Pasien",
      location: "Lokasi Kami",
      phone: "Telepon",
      email: "Email",
      whatsapp: "WhatsApp"
    },
    en: {
      title: "Healthcare Services in Sangatta",
      description: "RSU Meloy provides comprehensive healthcare services for the Sangatta community",
      contacts: "Contact",
      address: "Address",
      operatingHours: "Operating Hours",
      facilities: "Facilities and Services",
      specialists: "Specialist Doctors",
      insurance: "Insurance Partners",
      certifications: "Certifications & Accreditation",
      testimonials: "Patient Testimonials",
      location: "Our Location",
      phone: "Phone",
      email: "Email",
      whatsapp: "WhatsApp"
    }
  };

  const content = pageContent[language] || pageContent.id;

  // Add LocalBusiness schema for Sangatta location
  // NOTE: Structured data for locations should be emitted server-side via
  // `StructuredData` in the page component. This client component previously
  // injected a JSON-LD <script> into the head; remove that to avoid duplicate
  // JSON-LD when server-side StructuredData is present.

  return (
    <div className="min-h-screen">
      <PageHeader 
        title={content.title}
        description={content.description}
        imagePublicId="kontakrsmeloy_cv12fh"
      />

      <div className="container mx-auto px-4 py-12">
        {/* Location Info */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">{content.location}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-primary">{content.address}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {hospitalInfo.address.street}<br />
                    {hospitalInfo.address.district}, {hospitalInfo.address.city}<br />
                    {hospitalInfo.address.province} {hospitalInfo.address.postalCode}
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-primary">{content.contacts}</h3>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-medium">{content.phone}:</span> {hospitalInfo.contact.phone}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">{content.email}:</span> {hospitalInfo.contact.email}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">{content.whatsapp}:</span> {hospitalInfo.contact.whatsapp}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Business Hours */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">{content.operatingHours}</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {hospitalInfo.businessHours.map((schedule, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-primary/5">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-primary/50 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2 text-primary">{schedule.note}</h3>
                    <p className="text-gray-700 font-medium">{schedule.days}</p>
                    <p className="text-2xl font-bold text-primary mt-1">{schedule.hours}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Facilities */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">{content.facilities}</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {hospitalInfo.facilities.map((facility, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden rounded-lg border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-4 transition-all hover:shadow-lg hover:scale-105 hover:border-primary/40"
              >
                <div className="flex items-center justify-center h-full">
                  <p className="text-center font-medium text-sm group-hover:text-primary transition-colors">
                    {facility}
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </section>

        {/* Specialist Doctors */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">{content.specialists}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hospitalInfo.specialists.map((specialist, index) => (
              <Card 
                key={index} 
                className="p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-primary/50 hover:border-l-primary"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold text-lg">
                      {specialist.split(' ')[specialist.split(' ').length - 1].charAt(0)}
                    </span>
                  </div>
                  <p className="font-medium text-sm">{specialist}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Insurance */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">{content.insurance}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {hospitalInfo.insurance.map((insurance, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-200 rounded-lg p-4 text-center font-medium text-sm hover:border-primary hover:shadow-md transition-all duration-300 hover:scale-105"
              >
                {insurance}
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">{content.certifications}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {hospitalInfo.certifications.map((cert, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg">{cert}</h3>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">{content.testimonials}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {hospitalInfo.testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-primary/5">
                <div className="space-y-4">
                  <div className="flex mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 italic leading-relaxed">"{testimonial.review}"</p>
                  <div className="flex items-center space-x-3 pt-4 border-t">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/40 to-primary/60 flex items-center justify-center">
                      <span className="text-white font-bold">{testimonial.name.charAt(0)}</span>
                    </div>
                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Map */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">{content.location}</h2>
          <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl border-4 border-primary/20">
            <iframe
              src={hospitalInfo.googleMaps.embedUrl}
              width="100%"
              height="100%"
              className="border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi RSU Meloy di Google Maps"
            />
          </div>
        </section>
      </div>
    </div>
  );
}