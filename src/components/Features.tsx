import { Calendar, Clock, CreditCard, MapPin, Shield, Star, MessageCircle, Zap } from 'lucide-react';

const Features = () => {
  const featuresList = [
    {
      icon: <Calendar className="h-8 w-8 text-pitch-teal" />,
      title: 'Easy Booking',
      description: 'Book your favorite turf in just a few clicks, anytime, anywhere in Tamil Nadu.',
    },
    {
      icon: <Clock className="h-8 w-8 text-pitch-teal" />,
      title: 'Real-time Availability',
      description: 'See available slots in real-time and secure your spot instantly.',
    },
    {
      icon: <CreditCard className="h-8 w-8 text-pitch-teal" />,
      title: 'Secure Payments',
      description: 'Multiple payment options with secure and transparent transactions.',
    },
    {
      icon: <MapPin className="h-8 w-8 text-pitch-teal" />,
      title: 'Location-based Search',
      description: 'Find turfs near you with our smart location-based search across Tamil Nadu.',
    },
    {
      icon: <Shield className="h-8 w-8 text-pitch-teal" />,
      title: 'Verified Venues',
      description: 'All our turfs are verified for quality and amenities.',
    },
    {
      icon: <Star className="h-8 w-8 text-pitch-teal" />,
      title: 'Ratings & Reviews',
      description: 'Make informed decisions based on genuine user feedback.',
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-pitch-teal" />,
      title: 'Instant Confirmation',
      description: 'Get booking confirmations and updates instantly.',
    },
    {
      icon: <Zap className="h-8 w-8 text-pitch-teal" />,
      title: 'Special Offers',
      description: 'Enjoy exclusive discounts and offers on regular bookings.',
    },
  ];

  return (
    <section id="features" className="py-20 bg-pitch-navy relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pitch-teal/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-pitch-teal to-pitch-orange">PickMyPitch?</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            We offer a seamless booking experience with premium features 
            designed to make your sporting experience exceptional.
          </p>
        </div>

        {/* Grid layout for desktop, horizontal scroll for mobile */}
        <div className="flex overflow-x-auto pb-8 -mx-4 px-4 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:pb-0 md:px-0 md:mx-0 gap-6 custom-scrollbar">
          {featuresList.map((feature, index) => (
            <div 
              key={index}
              className="snap-center shrink-0 w-[280px] md:w-auto glass-card p-8 rounded-2xl flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-pitch-teal/0 to-pitch-teal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="mb-6 p-4 bg-pitch-navy rounded-2xl border border-white/5 group-hover:border-pitch-teal/30 transition-colors shadow-lg">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;