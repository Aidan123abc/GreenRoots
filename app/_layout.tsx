import GlobalProvider from '@/context/GlobalProvider';
import NavigationLogic from '@/components/NavigationLogic';

const MainLayout = () => {

  return (
    <GlobalProvider>
      <NavigationLogic />
    </GlobalProvider>
  );
};

export default MainLayout;
