import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './App.css';
import RQSuperherosPage from './components/RQSuperHeros.page';
import HomePage from './components/Home.page';
import SuperHerosPage from './components/SuperHeros.page';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RQSuperHeroPage } from './components/RQSuperHero.page';
import { ParallelQueriesPage } from './components/ParallelQueries.page';
import { DynamicParallelPage } from './components/DynamicParallel.page';

function App() {

  // Make an Instance of queryClient and pass queryclientprovoder as a props..
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
         <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/super-heros">Traditional Super Heroes</Link>
            </li>
            <li>
              <Link to="/rq-super-heros">RQ Super Heroes</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/super-heros" element={<SuperHerosPage />} />
          <Route path="/rq-super-heros" element={<RQSuperherosPage />} />
          <Route path="/rq-super-heros/:heroId" element={<RQSuperHeroPage />} />
          <Route path="/rq-parallel" element={<ParallelQueriesPage />} />
          <Route path="/rq-dynamic-parallel" element={<DynamicParallelPage heroIds={[1, 3]} />} />
        </Routes>
      </div>
    </Router>
    <ReactQueryDevtools initialIsOpen={false} position='bottom-right' /> 
    </QueryClientProvider>
  );
}

export default App;
