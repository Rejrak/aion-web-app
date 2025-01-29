import { extendTheme } from '@mui/material/styles';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import FeaturedPlayListOutlinedIcon from '@mui/icons-material/FeaturedPlayListOutlined';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider, Navigation, Router, Session } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import ExerciseTypeList from '../components/ExerciseList/exerciseTypeList';
import { useUser } from '../context/userContext';
import TrainingPlanList from '../components/TrainingList/TrainingPlanList';


var NAVIGATION: Navigation = [
  // {
  //   kind: 'header',
  //   title: 'Main ',
  // },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'exerciseTypeList',
    title: 'Lista Esercizi',
    icon: <FeaturedPlayListOutlinedIcon />,
  },
  {
    segment: 'trainingPlanList',
    title: 'Piani di Allenamento',
    icon: <FitnessCenterIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'sales',
        title: 'Sales',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'traffic',
        title: 'Traffic',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: 'integrations',
    title: 'Integrations',
    icon: <LayersIcon />,
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath: string): Router {
  const [pathname, setPathname] = useState(initialPath);

  const router = useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path: string | URL) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

function DashboardLayoutBasic() {
  const navigate = useNavigate();
  const router = useDemoRouter('/dashboard');
  const { user, logoutUserContext } = useUser();
  var userSession: Session | null = null
  const [session, setSession] = useState<Session | null>(userSession);
  
  useEffect(()=>{
    if(!user){
      navigate("/auth")
      return
    }
    setSession({
      user:{
        email: user!.userId,
        id: user!.userId,
        name: user!.name
      }
    })
  },[user])
  

  const authentication = useMemo(() => {
    return {
      signIn: () => {
        navigate('/auth');
      },
      signOut: () => {
        logoutUserContext();
        setSession(null);
      },
    };
  }, []);
  
  
  

  return (
    <AppProvider
      branding={{ title: 'Aion Lab', logo: '' }}
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      authentication={authentication}
      session={session}
    >
      <DashboardLayout disableCollapsibleSidebar >
        <PageContainer title={""} breadcrumbs={[]} >
          {router.pathname === '/exerciseTypeList' && <ExerciseTypeList />}
          {router.pathname === '/trainingPlanList' && <TrainingPlanList />}
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}

export default DashboardLayoutBasic