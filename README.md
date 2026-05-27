# TradeVault

A modern, full-featured trading dashboard and journal application built with Next.js and React. TradeVault provides traders with intuitive tools to manage their portfolio, track performance, maintain trading plans, and journal their trades for continuous improvement.

## Features

- **Dashboard Overview** - Real-time portfolio allocation and performance metrics
- **Trading Journal** - Comprehensive trade logging and analysis
- **Trading Plans** - Create and manage trading strategies
- **Account Management** - Track multiple trading accounts
- **Portfolio Analytics** - Visual charts and performance indicators
- **Dark/Light Theme Support** - Professional UI with theme switching
- **Responsive Design** - Works seamlessly on desktop and tablet

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org) with App Router
- **UI Components**: [Radix UI](https://radix-ui.com)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Charts**: [Recharts](https://recharts.org)
- **Animations**: [Framer Motion](https://www.framer.com/motion)
- **Language**: TypeScript

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

### Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Project Structure

```
components/     - Reusable React components
├── dashboard/  - Dashboard components
├── dialogs/    - Modal dialogs
├── charts/     - Chart visualizations
└── ui/         - Base UI components
app/            - Next.js app routes
hooks/          - Custom React hooks
lib/            - Utilities and helpers
types/          - TypeScript type definitions
```

## Deployment

### Netlify (Recommended)
Connect your GitHub repository to [Netlify](https://netlify.com) for automatic deployments on every push.

### Vercel
Deploy with [Vercel](https://vercel.com) for optimized Next.js hosting.

### GitHub Pages
Use static export by setting `output: "export"` in `next.config.ts`.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve TradeVault.
