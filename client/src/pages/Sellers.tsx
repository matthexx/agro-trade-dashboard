import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Leaf, Mail, Phone, MapPin, Package, TrendingUp, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

interface TradeData {
  id: number;
  name: string;
  email: string;
  phone: string;
  type: string;
  location: string;
  products: string;
  lookingFor: string;
  capacity: string;
  buyingNeeds: string;
  challenges: string;
  collaboration: string;
}

export default function Sellers() {
  const [data, setData] = useState<TradeData[]>([]);
  const [filteredData, setFilteredData] = useState<TradeData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSeller, setSelectedSeller] = useState<TradeData | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const sellerTypes = ["Farmer", "Aggregator", "Exporter", "Processor", "Aspiring Agribusiness Owner"];

  useEffect(() => {
    fetch("/agro_data.json")
      .then((res) => res.json())
      .then((tradeData: TradeData[]) => {
        const sellers = tradeData.filter((d) => sellerTypes.includes(d.type));
        setData(sellers);
        setFilteredData(sellers);
      });
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = data.filter(
      (seller) =>
        seller.name.toLowerCase().includes(term.toLowerCase()) ||
        seller.location.toLowerCase().includes(term.toLowerCase()) ||
        seller.products.toLowerCase().includes(term.toLowerCase()) ||
        seller.capacity.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const openDetails = (seller: TradeData) => {
    setSelectedSeller(seller);
    setIsOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="font-display text-xl font-bold text-primary">AgroTradeMatch</span>
          </div>
          <div className="w-20" />
        </div>
      </nav>

      {/* Header */}
      <section className="border-b border-border bg-gradient-to-b from-primary/5 to-background py-12">
        <div className="container">
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Sellers & Producers
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Connect with {data.length} active farmers, aggregators, and exporters supplying quality agricultural products.
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="border-b border-border py-8">
        <div className="container">
          <div className="max-w-md">
            <Input
              placeholder="Search by name, location, or products..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="h-10"
            />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Found {filteredData.length} seller{filteredData.length !== 1 ? "s" : ""}
          </p>
        </div>
      </section>

      {/* Sellers Grid */}
      <section className="py-12">
        <div className="container">
          {filteredData.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredData.map((seller) => (
                <Card
                  key={seller.id}
                  className="border-border hover:shadow-lg transition-all cursor-pointer group"
                  onClick={() => openDetails(seller)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {seller.name}
                        </CardTitle>
                        <CardDescription className="mt-1 flex items-center gap-1 text-xs">
                          <MapPin className="h-3 w-3" />
                          {seller.location}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className="whitespace-nowrap">
                        {seller.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Products Supplied */}
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-2">
                        PRODUCTS
                      </p>
                      <p className="text-sm line-clamp-2 text-foreground">
                        {seller.products}
                      </p>
                    </div>

                    {/* Capacity */}
                    {seller.capacity && (
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-2">
                          MONTHLY CAPACITY
                        </p>
                        <p className="text-sm line-clamp-1 text-foreground font-medium text-accent">
                          {seller.capacity}
                        </p>
                      </div>
                    )}

                    {/* Contact Info Preview */}
                    <div className="space-y-2 pt-2 border-t border-border">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        <span className="truncate">{seller.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        <span className="truncate">{seller.phone}</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        openDetails(seller);
                      }}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No sellers found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or browse all available traders.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Detail Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedSeller && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedSeller.name}</DialogTitle>
                <DialogDescription className="flex items-center gap-2 mt-2">
                  <MapPin className="h-4 w-4" />
                  {selectedSeller.location}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                {/* Business Type */}
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                    BUSINESS TYPE
                  </h4>
                  <Badge variant="secondary">{selectedSeller.type}</Badge>
                </div>

                {/* Contact Information */}
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-3">
                    CONTACT INFORMATION
                  </h4>
                  <div className="space-y-3 bg-muted/30 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Email</p>
                        <a
                          href={`mailto:${selectedSeller.email}`}
                          className="text-sm font-medium text-primary hover:underline break-all"
                        >
                          {selectedSeller.email}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Phone</p>
                        <a
                          href={`tel:${selectedSeller.phone}`}
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          {selectedSeller.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Products Supplied */}
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                    PRODUCTS SUPPLIED
                  </h4>
                  <p className="text-sm text-foreground">{selectedSeller.products}</p>
                </div>

                {/* Monthly Capacity */}
                {selectedSeller.capacity && (
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                      MONTHLY CAPACITY
                    </h4>
                    <p className="text-sm text-foreground font-medium text-accent">
                      {selectedSeller.capacity}
                    </p>
                  </div>
                )}

                {/* Looking For */}
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                    LOOKING FOR / PARTNERSHIPS
                  </h4>
                  <p className="text-sm text-foreground">{selectedSeller.lookingFor}</p>
                </div>

                {/* Business Challenges */}
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                    CURRENT CHALLENGES
                  </h4>
                  <p className="text-sm text-foreground">{selectedSeller.challenges}</p>
                </div>

                {/* Collaboration */}
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                    OPEN TO COLLABORATION
                  </h4>
                  <Badge
                    variant={
                      selectedSeller.collaboration === "Yes"
                        ? "default"
                        : selectedSeller.collaboration === "Maybe"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {selectedSeller.collaboration}
                  </Badge>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    asChild
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    <a href={`mailto:${selectedSeller.email}`}>
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="flex-1"
                  >
                    <a href={`tel:${selectedSeller.phone}`}>
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </a>
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-8 mt-12">
        <div className="container text-center text-sm text-muted-foreground">
          <p>&copy; 2026 AgroTradeMatch. Connecting agricultural communities.</p>
        </div>
      </footer>
    </div>
  );
}
