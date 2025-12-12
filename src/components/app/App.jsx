
import { store } from "../../redux/store"
import { Provider } from "react-redux"
import { ConfigProvider } from 'antd'
import { BrowserRouter, Routes, Route } from "react-router";
import { NotFoundPage } from "../../pages/notFoundPage"
import { MainLayout } from "../layout/Layout";
import { IndexPage } from "../../pages/indexPage";
import { CatalogPage } from "../../pages/catalogPage";
import { ContactsPage } from "../../pages/contactsPage";
import { ProductPage } from "../../pages/productPage";
import './reset.css'
import './main_styles.css'

export const App = () => {
  return (
    <ConfigProvider>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<MainLayout />} >
              <Route index element={<IndexPage />} />
              <Route path="/catalog" >
                <Route index element={<CatalogPage />} />
                <Route path=":productSlug" element={<ProductPage />} />
              </Route>
              <Route path="/contacts" element={<ContactsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Provider>
      </BrowserRouter>
    </ConfigProvider>
  )
}
