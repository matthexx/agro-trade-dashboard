import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Users, ShoppingCart, TrendingUp } from "lucide-react";
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

export default function Home() {
  const [data, setData] = useState<TradeData[]>([]);
  const [stats, setStats] = useState({
    buyers: 0,
    sellers: 0,
    aggregators: 0,
    exporters: 0,
  });

  useEffect(() => {
    fetch("/agro_data.json")
      .then((res) => res.json())
      .then((tradeData: TradeData[]) => {
        setData(tradeData);

        // Calculate statistics
        const buyerTypes = ["Retailer", "Processor"];
        const sellerTypes = ["Farmer", "Aggregator"];
        const exporterTypes = ["Exporter"];

        const buyers = tradeData.filter((d) => buyerTypes.includes(d.type)).length;
        const sellers = tradeData.filter((d) => sellerTypes.includes(d.type)).length;
        const aggregators = tradeData.filter((d) => d.type === "Aggregator").length;
        const exporters = tradeData.filter((d) => exporterTypes.includes(d.type)).length;

        setStats({
          buyers,
          sellers,
          aggregators,
          exporters,
        });
      });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="font-display text-xl font-bold text-primary">AgroTradeMatch</span>
          </div>
          <div className="flex gap-4">
            <Link href="/buyers">
              <Button variant="ghost" size="sm">
                Buyers
              </Button>
            </Link>
            <Link href="/sellers">
              <Button variant="ghost" size="sm">
                Sellers
              </Button>
            </Link>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSel2rmXbtzlJNlVIHEvkp9xavIeMiRTrITf_4Re7rFCnW_PhA/viewform" target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Join Now
              </Button>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
        <div className="container">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Connect Agro Buyers & Sellers
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              A community platform fostering direct business transactions between agricultural producers, processors, and distributors across West Africa.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/buyers">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Browse Buyers
                </Button>
              </Link>
              <Link href="/sellers">
                <Button size="lg" variant="outline">
                  Browse Sellers
                </Button>
              </Link>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSel2rmXbtzlJNlVIHEvkp9xavIeMiRTrITf_4Re7rFCnW_PhA/viewform" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline">
                  Register to Join
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Overview */}
      <section className="border-b border-border py-12 md:py-16">
        <div className="container">
          <h2 className="mb-12 text-3xl font-bold tracking-tight">Community Overview</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Buyers Card */}
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ShoppingCart className="h-5 w-5 text-accent" />
                  Buyers & Retailers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{stats.buyers}</div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Looking for quality produce
                </p>
                <Link href="/buyers">
                  <Button variant="ghost" size="sm" className="mt-4 w-full justify-start">
                    View Buyers →
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Sellers Card */}
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  Farmers & Producers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{stats.sellers}</div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Supplying agricultural products
                </p>
                <Link href="/sellers">
                  <Button variant="ghost" size="sm" className="mt-4 w-full justify-start">
                    View Sellers →
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Aggregators Card */}
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5 text-accent" />
                  Aggregators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{stats.aggregators}</div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Bulk buyers & consolidators
                </p>
              </CardContent>
            </Card>

            {/* Exporters Card */}
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Leaf className="h-5 w-5 text-accent" />
                  Exporters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{stats.exporters}</div>
                <p className="mt-2 text-sm text-muted-foreground">
                  International trade partners
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-b border-border py-12 md:py-16">
        <div className="container">
          <h2 className="mb-12 text-3xl font-bold tracking-tight">How It Works</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <span className="font-display text-xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold">Browse Directory</h3>
              <p className="text-muted-foreground">
                Explore our comprehensive directory of buyers and sellers. Filter by product type, location, and business type.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <span className="font-display text-xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold">View Details</h3>
              <p className="text-muted-foreground">
                Access complete contact information, product details, capacity, and business requirements for each trader.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <span className="font-display text-xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold">Connect & Trade</h3>
              <p className="text-muted-foreground">
                Contact traders directly via email or phone to negotiate terms and execute transactions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-8">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="h-5 w-5 text-primary" />
                <span className="font-display font-bold text-primary">AgroTradeMatch</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Connecting agricultural communities for sustainable trade and growth.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/buyers">
                    <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                      Browse Buyers
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/sellers">
                    <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                      Browse Sellers
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">About</h4>
              <p className="text-sm text-muted-foreground">
                This platform facilitates direct connections between agricultural traders to foster business growth and community development.
              </p>
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 AgroTradeMatch. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
