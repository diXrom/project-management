import { Provider } from 'react-redux';
import { store } from 'shared/store';

import ErrorBoundary from 'widgets/Error';
import Routes from 'app/ui/Routes';

const App = () => (
  <Provider store={store}>
    <ErrorBoundary>
      <Routes />
    </ErrorBoundary>
  </Provider>
);

export default App;
