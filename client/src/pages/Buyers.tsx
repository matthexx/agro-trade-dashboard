import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Leaf, Mail, Phone, MapPin, Package, Users, ArrowLeft } from "lucide-react";
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

export default function Buyers() {
  const [data, setData] = useState<TradeData[]>([]);
  const [filteredData, setFilteredData] = useState<TradeData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBuyer, setSelectedBuyer] = useState<TradeData | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const buyerTypes = ["Retailer", "Processor"];

  useEffect(() => {
    fetch("/agro_data.json")
      .then((res) => res.json())
      .then((tradeData: TradeData[]) => {
        const buyers = tradeData.filter((d) => buyerTypes.includes(d.type));
        setData(buyers);
        setFilteredData(buyers);
      });
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = data.filter(
      (buyer) =>
        buyer.name.toLowerCase().includes(term.toLowerCase()) ||
        buyer.location.toLowerCase().includes(term.toLowerCase()) ||
        buyer.products.toLowerCase().includes(term.toLowerCase()) ||
        buyer.buyingNeeds.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const openDetails = (buyer: TradeData) => {
    setSelectedBuyer(buyer);
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
          <div className="w-20" /> {/* Spacer for alignment */}
        </div>
      </nav>

      {/* Header */}
      <section className="border-b border-border bg-gradient-to-b from-primary/5 to-background py-12">
        <div className="container">
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Buyers & Retailers
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Connect with {data.length} active buyers and retailers looking for quality agricultural products.
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
            Found {filteredData.length} buyer{filteredData.length !== 1 ? "s" : ""}
          </p>
        </div>
      </section>

      {/* Buyers Grid */}
      <section className="py-12">
        <div className="container">
          {filteredData.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredData.map((buyer) => (
                <Card
                  key={buyer.id}
                  className="border-border hover:shadow-lg transition-all cursor-pointer group"
                  onClick={() => openDetails(buyer)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {buyer.name}
                        </CardTitle>
                        <CardDescription className="mt-1 flex items-center gap-1 text-xs">
                          <MapPin className="h-3 w-3" />
                          {buyer.location}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className="whitespace-nowrap">
                        {buyer.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Products Looking For */}
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-2">
                        LOOKING FOR
                      </p>
                      <p className="text-sm line-clamp-2 text-foreground">
                        {buyer.buyingNeeds || buyer.products}
                      </p>
                    </div>

                    {/* Contact Info Preview */}
                    <div className="space-y-2 pt-2 border-t border-border">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        <span className="truncate">{buyer.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        <span className="truncate">{buyer.phone}</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        openDetails(buyer);
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
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No buyers found</h3>
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
          {selectedBuyer && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedBuyer.name}</DialogTitle>
                <DialogDescription className="flex items-center gap-2 mt-2">
                  <MapPin className="h-4 w-4" />
                  {selectedBuyer.location}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                {/* Business Type */}
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                    BUSINESS TYPE
                  </h4>
                  <Badge variant="secondary">{selectedBuyer.type}</Badge>
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
                          href={`mailto:${selectedBuyer.email}`}
                          className="text-sm font-medium text-primary hover:underline break-all"
                        >
                          {selectedBuyer.email}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Phone</p>
                        <a
                          href={`tel:${selectedBuyer.phone}`}
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          {selectedBuyer.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Buying Needs */}
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                    BUYING REQUIREMENTS
                  </h4>
                  <p className="text-sm text-foreground whitespace-pre-wrap">
                    {selectedBuyer.buyingNeeds || "Not specified"}
                  </p>
                </div>

                {/* Products Interested In */}
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                    PRODUCTS HANDLED
                  </h4>
                  <p className="text-sm text-foreground">{selectedBuyer.products}</p>
                </div>

                {/* Business Challenges */}
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                    CURRENT CHALLENGES
                  </h4>
                  <p className="text-sm text-foreground">{selectedBuyer.challenges}</p>
                </div>

                {/* Collaboration */}
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                    OPEN TO COLLABORATION
                  </h4>
                  <Badge
                    variant={
                      selectedBuyer.collaboration === "Yes"
                        ? "default"
                        : selectedBuyer.collaboration === "Maybe"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {selectedBuyer.collaboration}
                  </Badge>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    asChild
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    <a href={`mailto:${selectedBuyer.email}`}>
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="flex-1"
                  >
                    <a href={`tel:${selectedBuyer.phone}`}>
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
