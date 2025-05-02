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
import TurfCard from '@/components/TurfCard';
import BookingCalendar from '@/components/BookingCalendar';

const allTurfs = [
  {
    id: '1',
    name: 'Green Valley Stadium',
    location: 'Downtown, Athletic City',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&q=80',
    price: 45,
    sportTypes: ['Football', 'Rugby'],
  },
  {
    id: '2',
    name: 'Urban Sports Arena',
    location: 'Westside, Athletic City',
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80',
    price: 50,
    sportTypes: ['Football', 'Basketball'],
  },
  {
    id: '3',
    name: 'Central Cricket Ground',
    location: 'Midtown, Athletic City',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80',
    price: 55,
    sportTypes: ['Cricket'],
  },
  {
    id: '4',
    name: 'Tennis Paradise',
    location: 'Northside, Athletic City',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1622279457486-28f993f78ade?w=800&q=80',
    price: 35,
    sportTypes: ['Tennis', 'Badminton'],
  },
  {
    id: '5',
    name: 'Riverside Basketball Court',
    location: 'Riverside, Athletic City',
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1505666287802-931dc83a5dc1?w=800&q=80',
    price: 40,
    sportTypes: ['Basketball'],
  },
  {
    id: '6',
    name: 'Eagle Golf Club',
    location: 'Hillside, Athletic City',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&q=80',
    price: 80,
    sportTypes: ['Golf'],
  },
];

const BookTurf = () => {
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState<string>('all');
  const [displayedTurfs, setDisplayedTurfs] = useState(allTurfs);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const selectedTurf = allTurfs.find((turf) => turf.id === id);

  useEffect(() => {
    document.title = id 
      ? `Book ${selectedTurf?.name || 'Turf'} - Sportify Turf` 
      : 'Book a Turf - Sportify Turf';
      
    // Filter turfs based on search query and selected sport
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSportChange = (value: string) => {
    setSelectedSport(value);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSport('all');
  };

  // If there's an ID, show the booking page for that specific turf
  if (id && selectedTurf) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-20">
          <div className="container py-8">
            <Link to="/book-turf" className="flex items-center text-gray-600 hover:text-gray-900 mb-6 group">
              <ChevronLeft size={18} className="mr-1 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to all turfs
            </Link>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Turf Details */}
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
                          <p className="text-2xl font-bold text-turf-700">${selectedTurf.price}</p>
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
              
              {/* Booking Calendar */}
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

  // Otherwise, show the turf listing page
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
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
          {/* Search and Filter */}
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
          
          {/* Active Filters */}
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
          
          {/* Turf Listing */}
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
                {displayedTurfs.map((turf, index) => (
                  <TurfCard key={turf.id} {...turf} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="list" className="mt-6">
              <div className="space-y-4">
                {displayedTurfs.map((turf) => (
                  <Card key={turf.id} className="overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-1/3 h-48 sm:h-auto">
                        <img 
                          src={turf.imageUrl} 
                          alt={turf.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 sm:p-6 flex-1 flex flex-col">
                        <div>
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-xl">{turf.name}</h3>
                              <div className="flex items-center text-gray-500 mt-1">
                                <MapPin size={14} className="mr-1" />
                                <span className="text-sm">{turf.location}</span>
                              </div>
                            </div>
                            <div className="flex items-center bg-white shadow-sm px-2 py-1 rounded-full">
                              <Star size={14} className="text-yellow-500 fill-yellow-500 mr-1" />
                              <span className="text-sm font-medium">{turf.rating}</span>
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
                        
                        <div className="flex items-center justify-between mt-auto pt-4">
                          <div>
                            <p className="text-turf-700 font-bold text-xl">${turf.price}</p>
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
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          {/* No Results Message */}
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
