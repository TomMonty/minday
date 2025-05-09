
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout/Layout';
import SplashScreen from './pages/SplashScreen/SplashScreen';
import Home from './pages/Home/Home';
import Library from './pages/Library/Library';
import ListPage from './pages/Library/ListPage';
import DetailPage from './pages/Library/DetailPage';
import Challenges from './pages/Challenges/Challenges';
import ChallengeLobby from './pages/Challenges/ChallengeLobby';
import ChallengeGame from './pages/Challenges/ChallengeGame';
import Profile from './pages/Profile/Profile';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SplashScreen />} />
              <Route path="/home" element={<Layout><Home /></Layout>} />
              <Route path="/library" element={<Layout><Library /></Layout>} />
              <Route path="/library/:cat" element={<Layout><ListPage /></Layout>} />
              <Route path="/library/:cat/:id" element={<Layout><DetailPage /></Layout>} />
              <Route path="/challenges" element={<Layout><Challenges /></Layout>} />
              <Route path="/challenges/lobby" element={<Layout><ChallengeLobby /></Layout>} />
              <Route path="/challenges/:roomId" element={<Layout><ChallengeGame /></Layout>} />
              <Route path="/profile" element={<Layout><Profile /></Layout>} />
            </Routes>
          </BrowserRouter>
          <Toaster />
          <Sonner />
        </AppProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
