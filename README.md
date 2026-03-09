# Portfolio

My personal portfolio website where I showcase the projects I have built during university and on my own time.

Live at: [albinlofgren.se](https://albinlofgren.se)

## About

The site is self-hosted on a Raspberry Pi in my home network. Traffic is routed through Cloudflare for DNS, CDN and security, while Caddy handles HTTPS certificates automatically via Let's Encrypt. I also configured port forwarding and dynamic DNS to keep the domain pointing to my home server.

## Tech Stack

- **React** with TypeScript
- **Vite** for bundling and dev server
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components

## Infrastructure

| Component | Tool |
|---|---|
| Hosting | Raspberry Pi (home server) |
| Web server | Caddy |
| TLS certificates | Let's Encrypt (via Caddy) |
| DNS / CDN / Security | Cloudflare |
| Domain routing | Port forwarding + Dynamic DNS |
