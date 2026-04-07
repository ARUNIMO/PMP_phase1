import { useState, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, MapPin, Search, Filter, Star, X, Info, ArrowRight, Check, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingCalendar from '@/components/BookingCalendar';

// Import turfs data from JSON file
import turfsData from '@/data/turfs.json';

const cities = ['Chennai', 'Coimbatore', 'Madurai', 'Trichy', 'Salem', 'Hyderabad'];

// Haversine formula to calculate distance between two lat/long points in km
const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const TurfCardComponent = ({ name, location, rating, imageUrl, price, sportTypes, id, ownerContact }) => {
  const isRatingBlank = rating === undefined || rating === null || rating === 0;

  return (
    <div className="relative glass-card rounded-xl overflow-hidden transition-all duration-300 w-full min-h-[350px] flex flex-col group hover:bg-white/5 hover:border-pitch-teal/30 hover:shadow-[0_0_20px_rgba(45,212,191,0.15)]">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pitch-navy via-transparent to-transparent opacity-80" />
        <div className="absolute top-4 right-4 bg-pitch-navy/70 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
          <Star size={14} className="text-pitch-orange fill-pitch-orange" />
          <span className={`font-semibold text-sm ${isRatingBlank ? 'text-gray-400' : 'text-white'}`}>
            {rating ?? 'N/A'}
          </span>
        </div>
      </div>
      <div className="p-5 flex-col flex-grow relative z-20 -mt-4">
        <h3 className="font-bold text-xl mb-1 text-white drop-shadow-md">{name}</h3>
        <p className="text-gray-400 text-sm mb-3">{location}</p>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <div className="flex flex-wrap gap-2">
            {sportTypes.map((sport, index) => (
              <span key={index} className="text-[10px] font-semibold tracking-wide uppercase bg-pitch-teal/10 border border-pitch-teal/20 text-pitch-teal px-2 py-1 rounded-full">
                {sport}
              </span>
            ))}
          </div>
          <div className="flex items-center text-gray-400 bg-pitch-navy/50 px-2 py-1 rounded-md border border-white/5">
            <Phone size={12} className="mr-1.5 text-pitch-teal" />
            <span className="text-xs font-medium">{ownerContact ?? 'N/A'}</span>
          </div>
        </div>
        <div className="mt-auto border-t border-white/10 pt-4 flex justify-between items-center">
          <div className="bg-pitch-navy/80 px-3 py-1.5 rounded-lg border border-white/5 shadow-inner">
             <p className="text-pitch-teal font-bold text-lg leading-none">₹{price}</p>
             <p className="text-gray-400 text-[10px] uppercase tracking-wider mt-1">per hour</p>
          </div>
          <Button className="rounded-full bg-pitch-teal hover:bg-pitch-teal/90 text-pitch-navy font-bold shadow-[0_0_15px_rgba(45,212,191,0.2)] hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] transition-all duration-300" size="sm" asChild>
            <Link to={`/book-turf/${id}`}>Book Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

const BookTurf = () => {
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState('all');
  const [sortBy, setSortBy] = useState('none');
  const [selectedCity, setSelectedCity] = useState('all');
  const [displayedTurfs, setDisplayedTurfs] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('grid');
  const [userLocation, setUserLocation] = useState(null); // { lat, lon, city }
  const [locationError, setLocationError] = useState(false); // Flag for location error message
  const turfsPerPage = 30;

  // Memoize allTurfs to prevent recreation on every render
  const allTurfs = useMemo(() => 
    turfsData.flatMap(region => 
      region.turfs.map(turf => ({ ...turf, city: region.region }))
    ), 
  []);

  const selectedTurf = allTurfs.find((turf) => turf.id === id);

  // Request user location on component mount
  useEffect(() => {
    if (navigator.geolocation && !userLocation) {
      // Check for secure context
      const isSecureContext = window.location.protocol === 'https:' || 
        ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname);
      
      if (!isSecureContext) {
        console.warn('Geolocation requires a secure context (HTTPS or localhost). See: https://developer.chrome.com/blog/geolocation-on-https/');
        setLocationError(true);
        setUserLocation(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
          )
            .then((res) => res.json())
            .then((data) => {
              const city = data.address?.city || data.address?.town || data.address?.municipality || data.address?.county || 'Unknown';
              setUserLocation({ lat: latitude, lon: longitude, city });
              setLocationError(false);
            })
            .catch((error) => {
              console.error('Reverse geocoding error:', error);
              setUserLocation({ lat: latitude, lon: longitude, city: 'Unknown' });
              setLocationError(false);
            });
        },
        (error) => {
          console.log('Geolocation access denied or error:', error);
          setLocationError(true);
          setUserLocation(null);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 600000 }
      );
    }
  }, [userLocation]);

  useEffect(() => {
    // Only scroll to top on initial load or when id changes (for single turf view)
    if (!id) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    document.title = id 
      ? `Book ${selectedTurf?.name || 'Turf'} - Sportify Turf` 
      : 'Book a Turf - Sportify Turf';
    
    // Prepare initial turfs based on user location
    let initialTurfs;
    if (userLocation && userLocation.city !== 'Unknown') {
      const sameCityTurfs = allTurfs.filter((turf) => turf.city === userLocation.city);
      const otherTurfs = allTurfs.filter((turf) => turf.city !== userLocation.city);
      otherTurfs.sort((a, b) => {
        const distA = haversineDistance(userLocation.lat, userLocation.lon, a.latitude, a.longitude);
        const distB = haversineDistance(userLocation.lat, userLocation.lon, b.latitude, b.longitude);
        return distA - distB;
      });
      initialTurfs = [...sameCityTurfs, ...otherTurfs];
    } else {
      // Default: sort alphabetically by name
      initialTurfs = [...allTurfs].sort((a, b) => a.name.localeCompare(b.name));
    }

    let filtered = initialTurfs;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (turf) => 
          turf.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          turf.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply sport filter
    if (selectedSport && selectedSport !== 'all') {
      filtered = filtered.filter(
        (turf) => turf.sportTypes.includes(selectedSport)
      );
    }
    
    // Apply city filter when a city is selected
    if (selectedCity !== 'all') {
      filtered = filtered.filter(
        (turf) => turf.city === selectedCity
      );
    }
    
    // Apply sorting
    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    }
    
    setDisplayedTurfs(filtered);
    setCurrentPage(1); // Reset to page 1 when filters change
  }, [id, searchQuery, selectedSport, sortBy, selectedCity, userLocation, allTurfs]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSportChange = (value) => {
    setSelectedSport(value);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handleCityChange = (value) => {
    setSelectedCity(value);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSport('all');
    setSortBy('none');
    setSelectedCity('all');
    setCurrentPage(1);
  };

  // Pagination logic
  const totalPages = Math.ceil(displayedTurfs.length / turfsPerPage);
  const startIndex = (currentPage - 1) * turfsPerPage;
  const endIndex = startIndex + turfsPerPage;
  const currentTurfs = displayedTurfs.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on page change
  };

  if (id && selectedTurf) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar overrideTextColor="text-blue-500" />
        
        <main className="flex-1 pt-20">
          <div className="container py-8">
            <Link to="/book-turf" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mb-6 group">
              <ChevronLeft size={18} className="mr-1 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to all turfs
            </Link>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-2">
                <div className="glass-card rounded-xl overflow-hidden border border-white/5 shadow-2xl">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={selectedTurf.imageUrl} 
                      alt={selectedTurf.name} 
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-pitch-navy via-transparent to-transparent opacity-80" />
                    <div className="absolute top-4 right-4 bg-pitch-navy/70 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full flex items-center shadow-lg">
                      <Star size={16} className="text-pitch-orange fill-pitch-orange mr-1.5" />
                      <span className="font-semibold text-white">{selectedTurf.rating ?? 'N/A'}</span>
                    </div>
                  </div>
                  
                  <div className="p-6 relative z-10 -mt-6">
                    <h1 className="text-3xl font-bold mb-2 text-white drop-shadow-md">{selectedTurf.name}</h1>
                    <div className="flex items-center text-gray-400 mb-6">
                      <MapPin size={16} className="mr-1.5 text-pitch-teal" />
                      <span className="text-sm">{selectedTurf.location}</span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                      <div className="flex flex-wrap gap-2">
                        {selectedTurf.sportTypes.map((sport, index) => (
                          <span 
                            key={index} 
                            className="bg-pitch-teal/10 border border-pitch-teal/20 text-pitch-teal px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase"
                          >
                            {sport}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center text-gray-400 bg-pitch-navy/50 px-3 py-1.5 rounded-md border border-white/5">
                        <Phone size={16} className="mr-2 text-pitch-teal" />
                        <span className="text-sm font-medium">{selectedTurf.ownerContact ?? 'N/A'}</span>
                      </div>
                    </div>
                    
                    <div className="border-t border-white/10 pt-6">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Price per hour</p>
                          <p className="text-3xl font-bold text-pitch-teal">₹{selectedTurf.price}</p>
                        </div>
                        <div className="bg-pitch-teal/10 border border-pitch-teal/20 text-pitch-teal px-4 py-2 rounded-lg flex items-center font-medium">
                          <Check size={18} className="mr-2" />
                          Available
                        </div>
                      </div>
                      
                      <div className="bg-pitch-navy/50 border border-pitch-teal/20 text-gray-300 p-4 rounded-lg flex items-start">
                        <Info size={18} className="mr-3 mt-0.5 text-pitch-teal flex-shrink-0" />
                        <p className="text-sm leading-relaxed">Bookings can be made up to 30 days in advance. Cancellations within <span className="text-white font-medium">24 hours</span> will incur a fee.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-3">
                <BookingCalendar selectedTurf={selectedTurf} />
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar overrideTextColor="text-blue-500" />
      
      <main className="flex-1 pt-20 pb-16">
        <div className="bg-gradient-to-b from-pitch-navy to-[#121826] border-b border-white/5 py-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pitch-teal/20 via-pitch-navy/10 to-transparent"></div>
          <div className="container relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-[0_0_15px_rgba(45,212,191,0.3)]">Find and Book <span className="text-pitch-teal">Sports Turfs</span></h1>
            <p className="max-w-2xl text-gray-300 text-lg">
              Browse through our collection of premium sports turfs and book your slot 
              for football, cricket, tennis, and more.
            </p>
          </div>
        </div>
        
        <div className="container py-8">
          <div className="mb-6 flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pitch-teal" size={18} />
              <Input 
                placeholder="Search by name or location..." 
                className="pl-10 bg-pitch-navy/50 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-pitch-teal/50 h-11"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 bg-pitch-navy/50 border-white/10 text-white hover:bg-white/10 hover:text-pitch-teal h-11"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter size={16} />
                Filter
              </Button>
              
              <Select value={selectedSport} onValueChange={handleSportChange}>
                <SelectTrigger className="w-full sm:w-[150px] md:w-[180px] bg-pitch-navy/50 border-white/10 text-white h-11 focus:ring-pitch-teal/50">
                  <SelectValue placeholder="Sport Type" />
                </SelectTrigger>
                <SelectContent className="bg-pitch-navy border-white/10 text-white">
                  <SelectItem value="all">All Sports</SelectItem>
                  <SelectItem value="Football">Football</SelectItem>
                  <SelectItem value="Cricket">Cricket</SelectItem>
                  <SelectItem value="Tennis">Tennis</SelectItem>
                  <SelectItem value="Basketball">Basketball</SelectItem>
                  <SelectItem value="Badminton">Badminton</SelectItem>
                  <SelectItem value="Volleyball">Volleyball</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedCity} onValueChange={handleCityChange}>
                <SelectTrigger className="w-full sm:w-[140px] md:w-[150px] bg-pitch-navy/50 border-white/10 text-white h-11 focus:ring-pitch-teal/50">
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent className="bg-pitch-navy border-white/10 text-white">
                  <SelectItem value="all">All Cities</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-full sm:w-[150px] md:w-[180px] bg-pitch-navy/50 border-white/10 text-white h-11 focus:ring-pitch-teal/50">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent className="bg-pitch-navy border-white/10 text-white">
                  <SelectItem value="none">Sort By</SelectItem>
                  <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                  <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {(searchQuery || selectedSport !== 'all' || sortBy !== 'none' || selectedCity !== 'all') && (
            <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-pitch-navy/30 border border-white/5 rounded-lg">
              <span className="text-sm font-medium text-gray-400">Active filters:</span>
              {searchQuery && (
                <div className="bg-pitch-teal/10 border border-pitch-teal/20 text-pitch-teal text-sm px-3 py-1 rounded-full flex items-center">
                  <span className="mr-2">"{searchQuery}"</span>
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="hover:text-white transition-colors"
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
              {selectedSport !== 'all' && (
                <div className="bg-pitch-teal/10 border border-pitch-teal/20 text-pitch-teal text-sm px-3 py-1 rounded-full flex items-center">
                  <span className="mr-2">Sport: {selectedSport}</span>
                  <button 
                    onClick={() => setSelectedSport('all')}
                    className="hover:text-white transition-colors"
                    aria-label="Clear sport filter"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
              {sortBy !== 'none' && (
                <div className="bg-pitch-teal/10 border border-pitch-teal/20 text-pitch-teal text-sm px-3 py-1 rounded-full flex items-center">
                  <span className="mr-2">
                    Sort: {sortBy === 'price-asc' ? 'Price (Low - High)' : 'Price (High - Low)'}
                  </span>
                  <button 
                    onClick={() => setSortBy('none')}
                    className="hover:text-white transition-colors"
                    aria-label="Clear sort"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
              {selectedCity !== 'all' && (
                <div className="bg-pitch-teal/10 border border-pitch-teal/20 text-pitch-teal text-sm px-3 py-1 rounded-full flex items-center">
                  <span className="mr-2">City: {selectedCity}</span>
                  <button 
                    onClick={() => setSelectedCity('all')}
                    className="hover:text-white transition-colors"
                    aria-label="Clear city filter"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
              <button 
                onClick={clearFilters}
                className="text-sm font-medium text-pitch-orange hover:text-white transition-colors ml-auto"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Location error message */}
          {locationError && (
            <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Location access unavailable. Please use HTTPS or localhost for nearby recommendations, or select a city manually.
              </p>
            </div>
          )}

          {/* Location-based message */}
          {userLocation && userLocation.city !== 'Unknown' && (
            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Showing turfs near you in <strong>{userLocation.city}</strong>
              </p>
            </div>
          )}
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 dark:text-gray-400">
                {displayedTurfs.length} {displayedTurfs.length === 1 ? 'result' : 'results'} found
              </span>
              <TabsList className="bg-gray-100 dark:bg-dark-theme">
                <TabsTrigger value="grid" className="data-[state=active]:bg-white dark:data-[state=active]:bg-dark-theme-lightest">Grid</TabsTrigger>
                <TabsTrigger value="list" className="data-[state=active]:bg-white dark:data-[state=active]:bg-dark-theme-lightest">List</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="grid" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" key={`grid-${displayedTurfs.length}-${currentPage}`}>
                {currentTurfs.map((turf) => (
                  <TurfCardComponent key={turf.id} {...turf} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="list" className="mt-6">
              <div className="space-y-4" key={`list-${displayedTurfs.length}-${currentPage}`}>
                {currentTurfs.map((turf) => {
                  const isRatingBlank = turf.rating === undefined || turf.rating === null || turf.rating === 0;
                  return (
                    <div key={turf.id} className="relative overflow-hidden flex flex-col sm:flex-row min-h-[200px] transition-all duration-300 hover:scale-[1.02] group glass-card rounded-xl">
                      <div className="relative h-56 sm:h-auto sm:w-1/3 sm:min-w-[250px] overflow-hidden">
                        <img 
                          src={turf.imageUrl} 
                          alt={turf.name} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-pitch-navy via-transparent to-transparent opacity-80" />
                        <div className="absolute top-4 right-4 bg-pitch-navy/70 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                          <Star size={14} className="text-pitch-orange fill-pitch-orange" />
                          <span className={`font-semibold text-sm ${isRatingBlank ? 'text-gray-400' : 'text-white'}`}>
                            {turf.rating ?? 'N/A'}
                          </span>
                        </div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col relative z-20 bg-pitch-navy/40 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none">
                        <div className="flex-grow">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-bold text-2xl truncate text-white drop-shadow-md">{turf.name}</h3>
                              <div className="flex items-center text-sm text-gray-400 mt-1">
                                <MapPin size={14} className="mr-1 text-pitch-teal" />
                                <span>{turf.location}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 gap-3">
                            <div className="flex flex-wrap gap-2">
                              {turf.sportTypes.map((sport, index) => (
                                <span 
                                  key={index} 
                                  className="text-[10px] font-semibold tracking-wide uppercase bg-pitch-teal/10 border border-pitch-teal/20 text-pitch-teal px-2 py-1 rounded-full"
                                >
                                  {sport}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center text-gray-400 bg-pitch-navy/50 px-2 py-1 rounded-md border border-white/5 w-fit">
                              <Phone size={14} className="mr-1.5 text-pitch-teal" />
                              <span className="text-xs font-medium">{turf.ownerContact ?? 'N/A'}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
                          <div className="bg-pitch-navy/80 px-4 py-2 rounded-lg border border-white/5 shadow-inner">
                            <p className="text-pitch-teal font-bold text-xl leading-none">₹{turf.price}</p>
                            <p className="text-gray-400 text-[10px] uppercase tracking-wider mt-1">per hour</p>
                          </div>
                          <Button 
                            className="rounded-full bg-pitch-teal hover:bg-pitch-teal/90 text-pitch-navy font-bold shadow-[0_0_15px_rgba(45,212,191,0.2)] hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] transition-all duration-300" 
                            asChild
                          >
                            <Link to={`/book-turf/${turf.id}`}>
                              Book Turf
                              <ArrowRight size={16} className="ml-2" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
          
          {displayedTurfs.length === 0 && (
            <div className="text-center py-12 bg-gray-50 dark:bg-dark-theme rounded-lg">
              <Search size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">No turfs found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">Try adjusting your search or filter criteria.</p>
              <Button onClick={clearFilters} className="bg-turf-600 dark:bg-turf-700 hover:bg-turf-700 dark:hover:bg-turf-600 text-white">Clear Filters</Button>
            </div>
          )}
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200"
                aria-label="Previous page"
              >
                Previous
              </Button>
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <Button
                    key={page}
                    variant={page === currentPage ? "default" : "outline"}
                    onClick={() => handlePageChange(page)}
                    className={
                      page === currentPage
                        ? "bg-turf-600 dark:bg-turf-700 text-white dark:text-white hover:bg-turf-700 dark:hover:bg-turf-600"
                        : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }
                    aria-label={`Go to page ${page}`}
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200"
                aria-label="Next page"
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookTurf;