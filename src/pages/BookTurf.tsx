import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, MapPin, Search, Filter, Star, X, Info, ArrowRight, Check } from 'lucide-react';
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

const cities = ['Chennai', 'Coimbatore', 'Madurai', 'Trichy', 'Salem', 'Vellore'];

// TurfCard Component
const TurfCardComponent = ({ name, location, rating, imageUrl, price, sportTypes, id }) => {
  const isRatingBlank = rating === undefined || rating === null || rating === 0;

  return (
    <Card className="overflow-hidden h-full flex flex-col min-h-[350px] transition-transform duration-1000 hover:scale-105 group bg-white dark:bg-dark-theme-lightest border-gray-100 dark:border-gray-600">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-1000 delay-1000 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-white dark:bg-dark-theme-lightest px-2 py-1 rounded-full flex items-center">
          <Star size={14} className="text-yellow-500 fill-yellow-500 mr-1" />
          <span className={`text-xs font-medium ${isRatingBlank ? 'text-black dark:text-white' : 'text-gray-700 dark:text-gray-200'}`}>
            {rating ?? 'N/A'}
          </span>
        </div>
      </div>
      <CardContent className="p-3 flex flex-col flex-grow">
        <h3 className="text-base font-semibold mb-1 text-gray-900 dark:text-white">{name}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-xs mb-1">{location}</p>
        <div className="flex flex-wrap gap-1 mb-2">
          {sportTypes.map((sport, index) => (
            <span key={index} className="bg-turf-50 dark:bg-turf-700 text-turf-700 dark:text-turf-300 px-2 py-0.5 rounded-full text-[10px]">
              {sport}
            </span>
          ))}
        </div>
        <div className="mt-auto flex justify-between items-center">
          <p className="text-turf-700 dark:text-turf-300 font-bold text-sm">₹{price}/hr</p>
          <Button variant="outline" size="sm" className="text-xs border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200" asChild>
            <Link to={`/book-turf/${id}`}>Book Now</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const BookTurf = () => {
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState('all');
  const [sortBy, setSortBy] = useState('none');
  const [selectedCity, setSelectedCity] = useState('all');
  const [displayedTurfs, setDisplayedTurfs] = useState(turfsData);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const selectedTurf = turfsData.find((turf) => turf.id === id);

  useEffect(() => {
    document.title = id 
      ? `Book ${selectedTurf?.name || 'Turf'} - Sportify Turf` 
      : 'Book a Turf - Sportify Turf';
      
    let filtered = [...turfsData];
    
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
        (turf) => turf.location.includes(selectedCity)
      );
    }
    
    // Apply sorting
    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    }
    
    setDisplayedTurfs(filtered);
  }, [id, searchQuery, selectedSport, sortBy, selectedCity, selectedTurf?.name]);

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
                <Card className="overflow-hidden bg-white dark:bg-dark-theme-lightest border-gray-100 dark:border-gray-600">
                  <div className="relative h-56">
                    <img 
                      src={selectedTurf.imageUrl} 
                      alt={selectedTurf.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-white dark:bg-dark-theme-lightest px-2 py-1 rounded-full flex items-center">
                      <Star size={16} className="text-yellow-500 fill-yellow-500 mr-1" />
                      <span className="font-medium text-gray-700 dark:text-gray-200">{selectedTurf.rating}</span>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{selectedTurf.name}</h1>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 mb-4">
                      <MapPin size={16} className="mr-1" />
                      <span>{selectedTurf.location}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedTurf.sportTypes.map((sport, index) => (
                        <span 
                          key={index} 
                          className="bg-turf-50 dark:bg-turf-700 text-turf-700 dark:text-turf-300 px-3 py-1 rounded-full text-sm"
                        >
                          {sport}
                        </span>
                      ))}
                    </div>
                    
                    <div className="border-t border-gray-100 dark:border-gray-600 pt-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Price per hour</p>
                          <p className="text-2xl font-bold text-turf-700 dark:text-turf-300">₹{selectedTurf.price}</p>
                        </div>
                        <div className="bg-green-50 dark:bg-green-700 text-green-700 dark:text-green-300 px-3 py-1 rounded-full flex items-center">
                          <Check size={16} className="mr-1" />
                          Available
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 dark:bg-blue-700 text-blue-700 dark:text-blue-300 p-3 rounded-lg flex items-start mb-4">
                        <Info size={16} className="mr-2 mt-0.5" />
                        <p className="text-sm">Bookings can be made up to 30 days in advance. Cancellations within 24 hours will incur a fee.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-3">
                <BookingCalendar />
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
        <div className="bg-gradient-to-r from-turf-700/90 to-sport-700/90 py-8 text-white">
          <div className="container">
            <h1 className="text-3xl font-bold mb-4">Find and Book Sports Turfs</h1>
            <p className="max-w-2xl">
              Browse through our collection of premium sports turfs and book your slot 
              for football, cricket, tennis, and more.
            </p>
          </div>
        </div>
        
        <div className="container py-8">
          <div className="mb-6 flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
              <Input 
                placeholder="Search by name or location..." 
                className="pl-10 bg-white dark:bg-dark-theme-lightest border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            
            <div className="flex gap-2 w-full md:w-auto">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 bg-white dark:bg-dark-theme-lightest border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter size={16} />
                Filter
              </Button>
              
              <Select value={selectedSport} onValueChange={handleSportChange}>
                <SelectTrigger className="w-[180px] bg-white dark:bg-dark-theme-lightest border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200">
                  <SelectValue placeholder="Sport Type" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-dark-theme-lightest border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200">
                  <SelectItem value="all">All Sports</SelectItem>
                  <SelectItem value="Football">Football</SelectItem>
                  <SelectItem value="Cricket">Cricket</SelectItem>
                  <SelectItem value="Tennis">Tennis</SelectItem>
                  <SelectItem value="Basketball">Basketball</SelectItem>
                  <SelectItem value="Badminton">Badminton</SelectItem>
                  <SelectItem value="Golf">Golf</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedCity} onValueChange={handleCityChange}>
                <SelectTrigger className="w-[180px] bg-white dark:bg-dark-theme-lightest border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200">
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-dark-theme-lightest border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200">
                  <SelectItem value="all">All Cities</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[180px] bg-white dark:bg-dark-theme-lightest border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-dark-theme-lightest border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200">
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                  <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {(searchQuery || selectedSport !== 'all' || sortBy !== 'none' || selectedCity !== 'all') && (
            <div className="flex items-center gap-2 mb-6">
              <span className="text-sm text-gray-500 dark:text-gray-400">Active filters:</span>
              {searchQuery && (
                <div className="bg-gray-100 dark:bg-dark-theme text-gray-800 dark:text-gray-200 text-sm px-3 py-1 rounded-full flex items-center">
                  <span className="mr-1">"{searchQuery}"</span>
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="ml-1"
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
              {selectedSport !== 'all' && (
                <div className="bg-gray-100 dark:bg-dark-theme text-gray-800 dark:text-gray-200 text-sm px-3 py-1 rounded-full flex items-center">
                  <span>Sport: {selectedSport}</span>
                  <button 
                    onClick={() => setSelectedSport('all')}
                    className="ml-1"
                    aria-label="Clear sport filter"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
              {sortBy !== 'none' && (
                <div className="bg-gray-100 dark:bg-dark-theme text-gray-800 dark:text-gray-200 text-sm px-3 py-1 rounded-full flex items-center">
                  <span>
                    Sort: {sortBy === 'price-asc' ? 'Price (Low to High)' : 'Price (High to Low)'}
                  </span>
                  <button 
                    onClick={() => setSortBy('none')}
                    className="ml-1"
                    aria-label="Clear sort"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
              {selectedCity !== 'all' && (
                <div className="bg-gray-100 dark:bg-dark-theme text-gray-800 dark:text-gray-200 text-sm px-3 py-1 rounded-full flex items-center">
                  <span>City: {selectedCity}</span>
                  <button 
                    onClick={() => setSelectedCity('all')}
                    className="ml-1"
                    aria-label="Clear city filter"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
              <button 
                onClick={clearFilters}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Clear all
              </button>
            </div>
          )}
          
          <Tabs defaultValue="grid" className="mb-6">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedTurfs.map((turf) => (
                  <TurfCardComponent key={turf.id} {...turf} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="list" className="mt-6">
              <div className="space-y-4">
                {displayedTurfs.map((turf) => {
                  const isRatingBlank = turf.rating === undefined || turf.rating === null || turf.rating === 0;
                  return (
                    <Card key={turf.id} className="overflow-hidden h-full flex flex-col sm:flex-row min-h-[300px] transition-transform duration-300 hover:scale-100 group bg-white dark:bg-dark-theme-lightest border-gray-100 dark:border-gray-600">
                      <div className="relative h-56 sm:h-auto sm:w-1/3 overflow-hidden">
                        <img 
                          src={turf.imageUrl} 
                          alt={turf.name} 
                          className="w-full h-full object-cover transition-transform duration-300 delay-300 group-hover:scale-100"
                        />
                        <div className="absolute top-2 right-2 bg-white dark:bg-dark-theme-lightest px-2 py-1 rounded-full flex items-center">
                          <Star size={14} className="text-yellow-500 fill-yellow-500 mr-1" />
                          <span className={`text-xs font-medium ${isRatingBlank ? 'text-black dark:text-white' : 'text-gray-700 dark:text-gray-200'}`}>
                            {turf.rating ?? 'N/A'}
                          </span>
                        </div>
                      </div>
                      <div className="p-3 sm:p-4 flex-1 flex flex-col">
                        <div className="flex-grow">
                          <div className="flex justify-between items-start mb-1">
                            <div>
                              <h3 className="font-semibold text-lg truncate text-gray-900 dark:text-white">{turf.name}</h3>
                              <div className="flex items-center text-gray-500 dark:text-gray-400 mt-0.5">
                                <MapPin size={14} className="mr-1" />
                                <span className="text-xs">{turf.location}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {turf.sportTypes.map((sport, index) => (
                              <span 
                                key={index} 
                                className="text-[10px] bg-turf-50 dark:bg-turf-700 text-turf-700 dark:text-turf-300 px-2 py-0.5 rounded-full"
                              >
                                {sport}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div>
                            <p className="text-turf-700 dark:text-turf-300 font-bold text-lg">₹{turf.price}</p>
                            <p className="text-gray-500 dark:text-gray-400 text-xs">per hour</p>
                          </div>
                          <Button className="flex items-center gap-1 text-xs bg-turf-600 dark:bg-turf-700 hover:bg-turf-700 dark:hover:bg-turf-600 text-white" asChild>  
                            <Link to={`/book-turf/${turf.id}`}>
                              Book Now
                              <ArrowRight size={14} className="ml-1" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </Card>
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
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookTurf;