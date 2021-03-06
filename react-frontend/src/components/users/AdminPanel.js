import React, { useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import UploadFiles from './UploadFiles';
import { PRODUCTS } from '../../requests/queries';
import ProgressBar from '../../ui-utils/ProgressBar';
import UnPublished from './UnPublished';
import Published from './Published';
import { Button } from '@material-ui/core';
import styles from '../../ui-utils/globalStyles';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => styles);

const AdminPanel = ({ user, token, setNotice, setProducts }) => {
  const unPublishedProducts = useQuery(PRODUCTS, {
    variables: { filter: { key: 'published', value: false }, sortyby: '-updatedAt' }
  });

  const publishedProducts = useQuery(PRODUCTS, {
    variables: { filter: { key: 'published', value: true } }
  });

  const classes = useStyles();

  console.log('published', publishedProducts);
  console.log('unpublished', unPublishedProducts);

  if ((user || token) && user?.role === user?.roleValue) {
    if (publishedProducts.loading || unPublishedProducts.loading)
      return <ProgressBar />;

    return (
      <div>
        <div className={classes.upload}>
          <UploadFiles setNotice={setNotice} setProducts={setProducts} />
        </div>
        <div className={classes.subnav}>
          <Link className={classes.subnavlinks} to="/admin/unpublished-items">
            <Button className={classes.subnavBtn}>Unpublished Items</Button>
          </Link>
          <Link className={classes.subnavlinks} to="/admin/published-items">
            <Button className={classes.subnavBtn}>published Items</Button>
          </Link>
        </div>

        <Switch>
          <Route path="/admin/unpublished-items">
            <UnPublished
              unPublishedProducts={unPublishedProducts?.data?.products}
              refetch={unPublishedProducts?.refetch}
              setNotice={setNotice}
              user={user}
            />
          </Route>
          <Route path="/admin/published-items">
            <Published
              publishedProducts={publishedProducts?.data?.products}
              refetch={publishedProducts?.refetch}
              setNotice={setNotice}
              user={user}
            />
          </Route>
        </Switch>
      </div>
    );
  }

  return null;
};

export default AdminPanel;
