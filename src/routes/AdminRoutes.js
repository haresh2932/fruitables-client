import React from 'react';
// import Products from '../admin/container/Products/Products';
import { Route, Routes } from 'react-router-dom';
import Layout from '../admin/component/Layout/Layout';
// import Fruites from '../admin/container/Fruites/Fruites';
import Vegitables from '../admin/container/Vegitables/Vegitables';
import Category from '../admin/container/Category/Category';
import Facilities from '../admin/container/Facilities/Facilities';
import Product from '../admin/container/Product/Product';
import Coupan from '../admin/container/Coupan/Coupan';
import Subcategory from '../admin/container/Subcategory/Subcategory';
import Variants from '../admin/container/Variants/Variants';
import Salespeople from '../admin/container/Salespeople/Salespeople';

function AdminRoutes(props) {
    return (
        <Layout>
            <Routes>
                <Route exact path='/subcategory' element={<Subcategory/>} />
                <Route exact path='/products' element={<Product />} />
                <Route exact path='/category' element={<Category />} />
                <Route exact path='/facilities' element={<Facilities />} />
                {/* <Route exact path='/products' element={<Product />} />    */}
                <Route exact path='/coupan' element={<Coupan />} /> 
                <Route exact path='/variants' element={<Variants />} />
                <Route exact path='/salespeople' element={<Salespeople />} />               


            </Routes>
        </Layout>
    );
}

export default AdminRoutes;