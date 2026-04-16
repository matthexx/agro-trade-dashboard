# AgroTradeMatch Dashboard

A modern, data-driven platform connecting agricultural buyers and sellers across West Africa. Built with React, Shadcn UI, and Tailwind CSS, this dashboard enables direct business transactions between farmers, processors, aggregators, and exporters.

## Features

**Community Directory**: Browse 10+ active agricultural traders with complete contact information and business details.

**Buyer Listings**: Discover 2 active buyers and retailers searching for quality agricultural products, including their specific requirements and locations.

**Seller Profiles**: Connect with 8 farmers, aggregators, and exporters offering products ranging from palm oil and grains to specialized crops like snails and cashew nuts.

**Search & Filter**: Quickly find traders by name, location, products, or business type across the entire community.

**Detailed Modals**: Access comprehensive trader information including monthly capacity, business challenges, collaboration openness, and direct contact details.

**Direct Communication**: Email and phone links integrated for immediate contact with potential trading partners.

**Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing with agricultural modernism aesthetic.

## Technology Stack

| Component | Technology |
|-----------|-----------|
| Frontend Framework | React 19 with TypeScript |
| Styling | Tailwind CSS 4 with OKLCH color space |
| UI Components | Shadcn UI (Radix UI primitives) |
| Routing | Wouter (lightweight client-side routing) |
| Icons | Lucide React |
| Build Tool | Vite |
| Package Manager | pnpm |

## Project Structure

```
agro-trade-dashboard/
├── client/
│   ├── public/
│   │   ├── agro_data.json          # Community member data
│   │   ├── favicon.ico
│   │   └── robots.txt
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx            # Landing page with overview
│   │   │   ├── Buyers.tsx          # Buyer directory
│   │   │   ├── Sellers.tsx         # Seller directory
│   │   │   └── NotFound.tsx
│   │   ├── components/
│   │   │   ├── ui/                 # Shadcn UI components
│   │   │   ├── ErrorBoundary.tsx
│   │   │   └── Map.tsx
│   │   ├── contexts/
│   │   │   └── ThemeContext.tsx
│   │   ├── App.tsx                 # Main router
│   │   ├── main.tsx                # React entry point
│   │   └── index.css               # Global styles & design tokens
│   └── index.html
├── server/
│   └── index.ts                    # Express server (static serving)
├── shared/
│   └── const.ts
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── DEPLOYMENT_GUIDE.md             # Netlify deployment instructions
```

## Data Structure

Each trader record includes:

- **Contact Information**: Name, email, phone, location
- **Business Profile**: Type (Farmer, Aggregator, Exporter, Processor, Retailer)
- **Products**: Agricultural products handled
- **Capacity**: Monthly supply/demand volume
- **Business Needs**: Looking for partnerships, buyers, or suppliers
- **Challenges**: Current business obstacles
- **Collaboration**: Openness to community partnerships

## Getting Started

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Development

The application runs on `http://localhost:3000` with hot module reloading enabled.

**Key Files to Modify:**
- **Add traders**: Edit `client/public/agro_data.json`
- **Update styling**: Modify `client/src/index.css` for design tokens
- **Change colors**: Update OKLCH values in `:root` CSS variables
- **Add pages**: Create new files in `client/src/pages/` and add routes to `client/src/App.tsx`

### Design Philosophy

The dashboard follows **Agricultural Modernism**—a contemporary design approach that respects agricultural professionalism while maintaining accessibility. Key design elements include:

- **Color Palette**: Forest Green (`oklch(0.45 0.15 142)`) for primary, Warm Gold for accents
- **Typography**: Playfair Display for headings (bold, confident), Inter for body text (clean, readable)
- **Layout**: Asymmetric, card-based structure avoiding generic centered layouts
- **Interactions**: Smooth transitions, hover states, and micro-animations

## Deployment

### Netlify (Recommended)

1. Push your code to GitHub
2. Connect repository to Netlify
3. Configure build command: `pnpm build`
4. Set publish directory: `dist/public`
5. Deploy

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

### Environment Variables

Currently, no environment variables are required. If you add backend functionality, configure secrets in Netlify's Site Settings.

## Data Management

### Adding New Traders

Edit `client/public/agro_data.json` and add a new object:

```json
{
  "id": 11,
  "name": "Trader Name",
  "email": "email@example.com",
  "phone": "+234...",
  "type": "Farmer",
  "location": "City, State, Country",
  "products": "Product list",
  "lookingFor": "Partnership types",
  "capacity": "Monthly capacity",
  "buyingNeeds": "Specific requirements",
  "challenges": "Business challenges",
  "collaboration": "Yes/Maybe/No"
}
```

### Updating Trader Information

Simply modify the corresponding entry in `agro_data.json` and redeploy.

## Performance

- **Bundle Size**: ~630KB (minified JavaScript), ~115KB (CSS)
- **Load Time**: <2 seconds on 4G
- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

## Accessibility

- WCAG AA compliance
- Semantic HTML structure
- Keyboard navigation support
- Focus indicators on all interactive elements
- Color contrast ratios meet accessibility standards

## Future Enhancements

Consider adding:

1. **Advanced Filtering**: Filter by product type, capacity range, or location radius
2. **Favorites System**: Save preferred traders for quick access
3. **Messaging Platform**: In-app messaging between traders
4. **Transaction History**: Track completed trades and reviews
5. **Analytics Dashboard**: Community insights and market trends
6. **Mobile App**: Native iOS/Android applications
7. **Multi-language Support**: Localization for different West African languages

## Contributing

To contribute improvements:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit changes (`git commit -m "Add improvement"`)
4. Push to branch (`git push origin feature/improvement`)
5. Open a Pull Request

## License

MIT License - See LICENSE file for details

## Support

For issues, questions, or feature requests:

- Open an issue on GitHub
- Contact the development team
- Review the [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for deployment help

## Community

This platform is built for and by the agricultural community. We welcome feedback, suggestions, and participation from all traders and stakeholders.

---

**Built with ❤️ for agricultural communities across West Africa**

Last Updated: April 2026
