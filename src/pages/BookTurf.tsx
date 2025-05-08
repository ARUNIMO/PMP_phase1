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

const allTurfs = [
  {
    id: '1',
    name: 'Foot Work',
    location: 'Kallimadai, Coimbatore',
    rating: 4.8,
    imageUrl: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4npFDLq_ymnmxbwTpTSgxmmk3vokbpjmfGCDicIWv4DV3FaIp_ds57eVCJjnH8kPwNB9bEackwj7TgmolKkoOzMjpgf2httzmFCFpOKsy4KWCSSLSUpX5Qz4AZeeWz_VBCWMfQCABQ=s0',
    price: 1500,
    sportTypes: ['Football'],
  },
  {
    id: '2',
    name: 'Sports Training & Fitness Unit',
    location: 'Koundampalayam, Coimbatore',
    rating: 4.6,
    imageUrl: 'https://lh3.googleusercontent.com/p/AF1QipM0tpJkCZj8tusXgafhjxaqPcxoBGJoJI55X3-1',
    price: 1400,
    sportTypes: ['Football', 'Basketball', 'Frisbee', 'Crossfit'],
  },
  {
    id: '3',
    name: 'Tiki Taka',
    location: 'T.Nagar, Chennai',
    rating: 4.7,
    imageUrl: 'https://lh3.googleusercontent.com/p/AF1QipP9ITtkorTsrLbWsHt6BUxS2GeguxK5n-S1jdjZ',
    price: 1500,
    sportTypes: ['Cricket', 'Football'],
  },
  {
    id: '4',
    name: 'Game On Sports Arena',
    location: 'Egmore, Chennai',
    rating: 4.8,
    imageUrl: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqVVijXJ2gXawJVrgpeXRKCSnI3rF-xUPRSd1X17X94VJ-gzO4xLqQBmA13fFNaSJNsFM2kBTAW7tE-Q2qVriYzCuiiB7oNeDHxHhQNSvsUbSv06A-1bee1roou1oBinNrQ3iw1',
    price: 1500,
    sportTypes: ['Cricket', 'Football'],
  },
];

// TurfCard Component
const TurfCardComponent = ({ name, location, rating, imageUrl, price, sportTypes, id }) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col min-h-[400px] transition-transform duration-1000 hover:scale-105 group">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-1000 delay-1000 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full flex items-center">
          <Star size={16} className="text-yellow-500 fill-yellow-500 mr-1" />
          <span className="font-medium dark:text-blue-500">{rating}</span>
        </div>
      </div>
      <CardContent className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-1">{name}</h3>
        <p className="text-gray-500 text-sm mb-2">{location}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {sportTypes.map((sport, index) => (
            <span key={index} className="bg-turf-50 text-turf-700 px-2 py-1 rounded-full text-xs">
              {sport}
            </span>
          ))}
        </div>
        <div className="mt-auto flex justify-between items-center">
          <p className="text-turf-700 font-bold">₹{price}/hr</p>
          <Button variant="outline" size="sm" asChild>
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
  const [displayedTurfs, setDisplayedTurfs] = useState(allTurfs);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const selectedTurf = allTurfs.find((turf) => turf.id === id);

  useEffect(() => {
    document.title = id 
      ? `Book ${selectedTurf?.name || 'Turf'} - Sportify Turf` 
      : 'Book a Turf - Sportify Turf';
      
    let filtered = [...allTurfs];
    
    if (searchQuery) {
      filtered = filtered.filter(
        (turf) => 
          turf.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          turf.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedSport && selectedSport !== 'all') {
      filtered = filtered.filter(
        (turf) => turf.sportTypes.includes(selectedSport)
      );
    }
    
    setDisplayedTurfs(filtered);
  }, [id, searchQuery, selectedSport, selectedTurf?.name]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSportChange = (value) => {
    setSelectedSport(value);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSport('all');
  };

  if (id && selectedTurf) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar overrideTextColor="text-blue-500" />
        
        <main className="flex-1 pt-20">
          <div className="container py-8">
            <Link to="/book-turf" className="flex items-center text-gray-600 hover:text-gray-900 mb-6 group">
              <ChevronLeft size={18} className="mr-1 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to all turfs
            </Link>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-2">
                <Card className="overflow-hidden">
                  <div className="relative h-64">
                    <img 
                      src={selectedTurf.imageUrl} 
                      alt={selectedTurf.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full flex items-center">
                      <Star size={16} className="text-yellow-500 fill-yellow-500 mr-1" />
                      <span className="font-medium">{selectedTurf.rating}</span>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h1 className="text-2xl font-bold mb-2">{selectedTurf.name}</h1>
                    <div className="flex items-center text-gray-500 mb-4">
                      <MapPin size={16} className="mr-1" />
                      <span>{selectedTurf.location}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedTurf.sportTypes.map((sport, index) => (
                        <span 
                          key={index} 
                          className="bg-turf-50 text-turf-700 px-3 py-1 rounded-full text-sm"
                        >
                          {sport}
                        </span>
                      ))}
                    </div>
                    
                    <div className="border-t border-gray-100 pt-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-gray-500">Price per hour</p>
                          <p className="text-2xl font-bold text-turf-700">₹{selectedTurf.price}</p>
                        </div>
                        <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full flex items-center">
                          <Check size={16} className="mr-1" />
                          Available
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 text-blue-700 p-3 rounded-lg flex items-start mb-4">
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                placeholder="Search by name or location..." 
                className="pl-10"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            
            <div className="flex gap-2 w-full md:w-auto">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter size={16} />
                Filter
              </Button>
              
              <Select value={selectedSport} onValueChange={handleSportChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sport Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sports</SelectItem>
                  <SelectItem value="Football">Football</SelectItem>
                  <SelectItem value="Cricket">Cricket</SelectItem>
                  <SelectItem value="Tennis">Tennis</SelectItem>
                  <SelectItem value="Basketball">Basketball</SelectItem>
                  <SelectItem value="Badminton">Badminton</SelectItem>
                  <SelectItem value="Golf">Golf</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {(searchQuery || selectedSport !== 'all') && (
            <div className="flex items-center gap-2 mb-6">
              <span className="text-sm text-gray-500">Active filters:</span>
              {searchQuery && (
                <div className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full flex items-center">
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
                <div className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full flex items-center">
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
              <button 
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:underline"
              >
                Clear all
              </button>
            </div>
          )}
          
          <Tabs defaultValue="grid" className="mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">
                {displayedTurfs.length} {displayedTurfs.length === 1 ? 'result' : 'results'} found
              </span>
              <TabsList>
                <TabsTrigger value="grid">Grid</TabsTrigger>
                <TabsTrigger value="list">List</TabsTrigger>
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
                {displayedTurfs.map((turf) => (
                  <Card key={turf.id} className="overflow-hidden h-full flex flex-col sm:flex-row min-h-[400px] transition-transform duration-300 hover:scale-100 group">
                    <div className="relative h-64 sm:h-auto sm:w-1/3 overflow-hidden">
                      <img 
                        src={turf.imageUrl} 
                        alt={turf.name} 
                        className="w-full h-full object-cover transition-transform duration-300 delay-300 group-hover:scale-100"
                      />
                      <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full flex items-center">
                        <Star size={14} className="text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="text-sm font-medium dark:text-blue-500">{turf.rating}</span>
                      </div>
                    </div>
                    <div className="p-4 sm:p-6 flex-1 flex flex-col">
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-xl truncate">{turf.name}</h3>
                            <div className="flex items-center text-gray-500 mt-1">
                              <MapPin size={14} className="mr-1" />
                              <span className="text-sm">{turf.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {turf.sportTypes.map((sport, index) => (
                            <span 
                              key={index} 
                              className="text-xs bg-turf-50 text-turf-700 px-2 py-1 rounded-full"
                            >
                              {sport}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div>
                          <p className="text-turf-700 font-bold text-xl">₹{turf.price}</p>
                          <p className="text-gray-500 text-sm">per hour</p>
                        </div>
                        <Button className="flex items-center gap-1" asChild>  
                          <Link to={`/book-turf/${turf.id}`}>
                            Book Now
                            <ArrowRight size={16} className="ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          {displayedTurfs.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Search size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No turfs found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria.</p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookTurf;