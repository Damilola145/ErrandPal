import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getErrands, errandCategories } from "@/services/mockData";
import { Errand } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue } from
"@/components/ui/select";

const BrowseErrandsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [errands, setErrands] = useState<Errand[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [maxDistance, setMaxDistance] = useState(10); // miles
  const [minPrice, setMinPrice] = useState(0);
  const [urgency, setUrgency] = useState<string>("any");

  useEffect(() => {
    const loadErrands = async () => {
      setIsLoading(true);
      try {
        // In a real app, we would pass filter parameters to the API
        const allErrands = await getErrands({ status: "open" });
        setErrands(allErrands);
      } catch (error) {
        console.error("Failed to load errands:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadErrands();
  }, []);

  // Apply filters client-side (in a real app, this would be done server-side)
  const filteredErrands = errands.filter((errand) => {
    // Title or description contains search query
    if (searchQuery &&
    !errand.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !errand.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Category filter
    if (selectedCategory !== 'all' && errand.category !== selectedCategory) {
      return false;
    }

    // Price filter
    if (errand.payment < minPrice) {
      return false;
    }

    // Urgency filter
    if (urgency !== 'any' && errand.urgency !== urgency) {
      return false;
    }

    // Pass all filters
    return true;
  });

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setMaxDistance(10);
    setMinPrice(0);
    setUrgency("any");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50" data-id="6rcrftzrj" data-path="src/pages/BrowseErrandsPage.tsx">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8" data-id="0mvfbyhrq" data-path="src/pages/BrowseErrandsPage.tsx">
        <div className="flex justify-between items-center mb-6" data-id="1ck486spk" data-path="src/pages/BrowseErrandsPage.tsx">
          <h1 className="text-3xl font-bold" data-id="ad0a38cgx" data-path="src/pages/BrowseErrandsPage.tsx">Find Errands</h1>
           {(user.role === 'requester' || user.role === 'both') &&
          <Button
            onClick={() => navigate("/post-errand")}
            className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600">

              Post Your Errand
            </Button>
            }
          
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6" data-id="p1w1b264p" data-path="src/pages/BrowseErrandsPage.tsx">
          {/* Filters Sidebar */}
          <div className="md:col-span-1" data-id="lugzb8h4r" data-path="src/pages/BrowseErrandsPage.tsx">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6" data-id="gtor7p2vp" data-path="src/pages/BrowseErrandsPage.tsx">
                  <div data-id="2k9dgifq8" data-path="src/pages/BrowseErrandsPage.tsx">
                    <h3 className="font-medium mb-2" data-id="5ybqy686r" data-path="src/pages/BrowseErrandsPage.tsx">Search</h3>
                    <Input
                      placeholder="Search errands..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)} />

                  </div>
                  
                  <div data-id="eh8w71f3s" data-path="src/pages/BrowseErrandsPage.tsx">
                    <h3 className="font-medium mb-2" data-id="igyocw4vx" data-path="src/pages/BrowseErrandsPage.tsx">Category</h3>
                    <Select
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}>

                      <SelectTrigger>
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {errandCategories.map((category) =>
                        <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div data-id="06xbav9d2" data-path="src/pages/BrowseErrandsPage.tsx">
                    <h3 className="font-medium mb-2" data-id="bphe99pie" data-path="src/pages/BrowseErrandsPage.tsx">Distance (miles)</h3>
                    <div className="flex items-center justify-between mb-2" data-id="smc7zvh3o" data-path="src/pages/BrowseErrandsPage.tsx">
                      <span className="text-sm text-gray-500" data-id="11sw6jqxn" data-path="src/pages/BrowseErrandsPage.tsx">Max: {maxDistance} miles</span>
                    </div>
                    <Slider
                      defaultValue={[maxDistance]}
                      max={50}
                      step={1}
                      onValueChange={(value) => setMaxDistance(value[0])} />

                  </div>
                  
                  <div data-id="2voxqmp5v" data-path="src/pages/BrowseErrandsPage.tsx">
                    <h3 className="font-medium mb-2" data-id="hx8wglgdk" data-path="src/pages/BrowseErrandsPage.tsx">Minimum Payment</h3>
                    <div className="flex items-center justify-between mb-2" data-id="werdlib8u" data-path="src/pages/BrowseErrandsPage.tsx">
                      <span className="text-sm text-gray-500" data-id="lssm5ph22" data-path="src/pages/BrowseErrandsPage.tsx">${minPrice}+</span>
                    </div>
                    <Slider
                      defaultValue={[minPrice]}
                      max={100}
                      step={5}
                      onValueChange={(value) => setMinPrice(value[0])} />

                  </div>
                  
                  <div data-id="t7o978kks" data-path="src/pages/BrowseErrandsPage.tsx">
                    <h3 className="font-medium mb-2" data-id="8nrfe5sfd" data-path="src/pages/BrowseErrandsPage.tsx">Urgency</h3>
                    <Select
                      value={urgency}
                      onValueChange={setUrgency}>

                      <SelectTrigger>
                        <SelectValue placeholder="Any Urgency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Urgency</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={resetFilters}>

                    Reset Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Errands List */}
          <div className="md:col-span-3" data-id="z5okw2jhx" data-path="src/pages/BrowseErrandsPage.tsx">
            {isLoading ?
            <div className="text-center py-12" data-id="runxtpddz" data-path="src/pages/BrowseErrandsPage.tsx">
                <p data-id="tomufuoed" data-path="src/pages/BrowseErrandsPage.tsx">Loading errands...</p>
              </div> :
            filteredErrands.length > 0 ?
            <div className="space-y-4" data-id="rxt5sb9ak" data-path="src/pages/BrowseErrandsPage.tsx">
                {filteredErrands.map((errand) =>
              <Card
                key={errand.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/errand/${errand.id}`)}>

                    <CardContent className="p-6">
                      <div className="flex justify-between items-start" data-id="c2d6diok3" data-path="src/pages/BrowseErrandsPage.tsx">
                        <div data-id="ddw1yafpc" data-path="src/pages/BrowseErrandsPage.tsx">
                          <h2 className="text-xl font-semibold mb-2" data-id="fwimd0jt2" data-path="src/pages/BrowseErrandsPage.tsx">{errand.title}</h2>
                          <p className="text-gray-600 mb-3 line-clamp-2" data-id="7gr39ip8n" data-path="src/pages/BrowseErrandsPage.tsx">
                            {errand.description}
                          </p>
                          <div className="flex items-center gap-2 mb-3" data-id="vciubd64f" data-path="src/pages/BrowseErrandsPage.tsx">
                            <Badge variant="outline">{errand.category}</Badge>
                            <Badge
                          className={
                          errand.urgency === "high" ?
                          "bg-red-100 text-red-800 hover:bg-red-100" :
                          errand.urgency === "medium" ?
                          "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" :
                          "bg-green-100 text-green-800 hover:bg-green-100"
                          }>

                              {errand.urgency.charAt(0).toUpperCase() + errand.urgency.slice(1)} Priority
                            </Badge>
                          </div>
                        </div>
                        <div className="text-lg font-bold" data-id="yxtglqw27" data-path="src/pages/BrowseErrandsPage.tsx">${errand.payment.toFixed(2)}</div>
                      </div>
                      
                      <div className="flex justify-between items-center text-sm text-gray-500" data-id="5dewiox4t" data-path="src/pages/BrowseErrandsPage.tsx">
                        <div className="flex items-center gap-2" data-id="cruyhs4zl" data-path="src/pages/BrowseErrandsPage.tsx">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-id="h1fgo6rf7" data-path="src/pages/BrowseErrandsPage.tsx">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" data-id="4yweaxhwh" data-path="src/pages/BrowseErrandsPage.tsx" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" data-id="2qgh6bfor" data-path="src/pages/BrowseErrandsPage.tsx" />
                          </svg>
                          <span data-id="o2yxzw6op" data-path="src/pages/BrowseErrandsPage.tsx">{errand.location.address}</span>
                        </div>
                        <div className="flex items-center gap-2" data-id="nvy4mh9xh" data-path="src/pages/BrowseErrandsPage.tsx">
                          <span data-id="9tnl7bveh" data-path="src/pages/BrowseErrandsPage.tsx">Posted: {new Date(errand.createdAt).toLocaleDateString()}</span>
                          {errand.deadline &&
                      <>
                              <span data-id="cgwzc1ooc" data-path="src/pages/BrowseErrandsPage.tsx">•</span>
                              <span data-id="l625mtkiv" data-path="src/pages/BrowseErrandsPage.tsx">Due: {new Date(errand.deadline).toLocaleDateString()}</span>
                            </>
                      }
                        </div>
                      </div>
                      
                      <div className="flex items-center mt-4 pt-3 border-t" data-id="6jzbbd1dk" data-path="src/pages/BrowseErrandsPage.tsx">
                        <div className="flex items-center" data-id="aasx7a3z3" data-path="src/pages/BrowseErrandsPage.tsx">
                          <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden mr-2" data-id="muhztqh5n" data-path="src/pages/BrowseErrandsPage.tsx">
                            {errand.requester.avatar ?
                        <img
                          src={errand.requester.avatar}
                          alt={errand.requester.name}
                          className="w-full h-full object-cover" data-id="k6tl3ez9y" data-path="src/pages/BrowseErrandsPage.tsx" /> :


                        <div className="flex items-center justify-center h-full bg-blue-600 text-white font-semibold" data-id="ad625dawc" data-path="src/pages/BrowseErrandsPage.tsx">
                                {errand.requester.name.charAt(0)}
                              </div>
                        }
                          </div>
                          <div data-id="02tkvo3xo" data-path="src/pages/BrowseErrandsPage.tsx">
                            <span className="text-sm" data-id="i5n1ef0ao" data-path="src/pages/BrowseErrandsPage.tsx">{errand.requester.name}</span>
                            <div className="flex items-center text-yellow-500" data-id="7pppaa3a9" data-path="src/pages/BrowseErrandsPage.tsx">
                              {Array.from({ length: 5 }).map((_, index) =>
                          <svg
                            key={index}
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3"
                            viewBox="0 0 20 20"
                            fill={index < Math.round(errand.requester.rating) ? "currentColor" : "none"} data-id="avq9sqook" data-path="src/pages/BrowseErrandsPage.tsx">

                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" data-id="zbh61yg1q" data-path="src/pages/BrowseErrandsPage.tsx" />
                                </svg>
                          )}
                              <span className="text-xs ml-1 text-gray-600" data-id="jdqsynoqj" data-path="src/pages/BrowseErrandsPage.tsx">
                                ({errand.requester.rating.toFixed(1)})
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
              )}
              </div> :

            <div className="text-center py-12 bg-white rounded-lg shadow" data-id="vo5xbr18g" data-path="src/pages/BrowseErrandsPage.tsx">
                <h2 className="text-2xl font-semibold mb-2" data-id="aksk8svx1" data-path="src/pages/BrowseErrandsPage.tsx">No errands found</h2>
                <p className="text-gray-600 mb-6" data-id="4m5sl9gk9" data-path="src/pages/BrowseErrandsPage.tsx">
                  Try adjusting your filters or check back later for new errands.
                </p>
                <Button
                variant="outline"
                onClick={resetFilters}>

                  Reset Filters
                </Button>
              </div>
            }
          </div>
        </div>
      </main>
      
      <Footer />
    </div>);

};

export default BrowseErrandsPage;