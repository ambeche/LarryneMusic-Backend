import { React } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import UploadFiles from './UploadFiles';
import { PRODUCTS } from '../../requests/queries';
import ProgressBar from '../../ui-utils/ProgressBar';
import UnPublished from './UnPublished';
import Published from './Published';
import useStyles from '../../ui-utils/globalStyles';
import StoreItems from './StoreItems';



const AdminPanel = ({ user, token, setNotice, setProducts }) => {
  const unPublishedProducts = useQuery(PRODUCTS, {
    variables: { filter: { key: 'published', value: false } }
  });

  const publishedProducts = useQuery(PRODUCTS, {
    variables: { filter: { key: 'published', value: true } }
  });

  const storeItems = useQuery(PRODUCTS, {
    variables: {tag: 'store' }
  });

  const classes = useStyles();
  console.log('published', publishedProducts);
  console.log('unpublished', unPublishedProducts);

  if ((user || token) && user?.role === user?.roleValue) {
    if (publishedProducts.loading || unPublishedProducts.loading) return <ProgressBar />;
    return (
      <div>
        <div className={classes.upload}>
          <UploadFiles setNotice={setNotice} setProducts={setProducts} />
        </div>
        <div className={classes.subnav}>
          <Link className={classes.subnavlinks} to="/admin/unpublished-items">
            Unpublished
          </Link>
          <Link className={classes.subnavlinks} to="/admin/published-items">
            Published
          </Link>
          <Link className={classes.subnavlinks} to="/admin/store-items">
            Store Items
          </Link>
        </div>

        <Switch>
          <Route path="/admin/unpublished-items">
          <UnPublished unPublishedProducts={unPublishedProducts?.data?.products} />
         
          </Route>
          <Route path="/admin/published-items">
           <Published publishedProducts={publishedProducts?.data?.products} />
          </Route>
          <Route path="/admin/store-items">
           <StoreItems storeItems={storeItems?.data?.products} />
          </Route>
        </Switch>
      </div>
    );
  }

  return null;
};

export default AdminPanel;
