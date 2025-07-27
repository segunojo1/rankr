# Rankr - Social Ranking Platform

Rankr is a modern, interactive web application that allows users to create and participate in head-to-head ranking competitions. Built with Next.js, TypeScript, and Tailwind CSS, Rankr provides a seamless experience for creating, sharing, and voting on ranking challenges.

## 🌟 Features

### 🎯 Create Rankings
- Intuitive 4-step creation process
- Add custom titles and descriptions
- Upload images for each option
- Set visibility (public/private)
- Configure duration for voting periods

### 🗳️ Vote & Engage
- Simple one-click voting
- Real-time vote tracking
- Anonymous commenting system
- Share rankings via unique links
- View detailed voting statistics

### 🏆 Leaderboards
- Live results tracking
- Visual vote representation
- Winner highlights
- Comment section for discussion
- Report inappropriate content

## 🚀 Getting Started

### Prerequisites
- Node.js 16.8 or later
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/rankr.git
   cd rankr
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add:
   ```
   NEXT_PUBLIC_RANKR_URL=your_backend_api_url
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## 🛠️ Tech Stack

- **Frontend**: Next.js 15+ with App Router
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **UI Components**: Shadcn/UI
- **Backend API**: Custom RESTful API service
- **Deployment**: Vercel (recommended)

## 📱 Responsive Design

Rankr is fully responsive and works on:
- Desktop browsers (Chrome, Firefox, Safari, Edge)
- Tablets
- Mobile devices

## 🔒 Security

- Client-side form validation
- Secure API request handling
- Content reporting system
- Rate limiting on API endpoints
- Secure cookie handling

## 📈 Performance

- Code splitting and lazy loading
- Optimized image handling
- Efficient state management
- Server-side rendering where beneficial

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- The Rankr team
- All contributors and testers
- Open source community
