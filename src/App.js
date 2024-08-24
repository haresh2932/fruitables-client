import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserRoutes from './routes/UserRoutes';
import AdminRoutes from './routes/AdminRoutes';
import PrivateRoutes from './routes/PrivateRoutes';
import { Provider } from 'react-redux';
import { configStore } from './redux/store'
import Counter from './user/container/Counter/Counter';
import { PersistGate } from 'redux-persist/integration/react'
import { SnackbarProvider, useSnackbar } from 'notistack';
import Alert from './user/component/Alert/Alert';


function App() {
  const { store, persistor } = configStore()
  return (
    <SnackbarProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Alert/>
          <Routes>
            <Route exact path='/*' element={<UserRoutes />} />
            <Route element={<PrivateRoutes />}>
              <Route exact path='/admin*' element={<AdminRoutes />} />
            </Route>
          </Routes>
        </PersistGate>
        {/* <Counter/> */}
      </Provider>
    </SnackbarProvider>
  );
}

export default App;
