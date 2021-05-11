import { React } from 'react';
import {
  Grid} from '@material-ui/core';
import Photo from './Photo';
import {PRODUCTS} from '../../requests/queries';
import {useQuery} from '@apollo/client';
import ProgressBar from '../../ui-utils/ProgressBar';
import styles from '../../ui-utils/globalStyles';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => styles);

const PhotoAlbum = ({ setNotice, user }) => {
  const {data, loading, refetch} = useQuery(PRODUCTS, {
    variables: { tag: 'photo', sortby: '-image.height'}
  });

  const classes = useStyles();

  if(loading) return <ProgressBar />

  return (
    <div className={classes.photosRoot}>
      <Grid
        container
        spacing={1}
        justify="space-evenly"
        alignItems="center"
        alignContent="center"
      >
        {data?.products?.map((photo) => (
          <Photo key={photo.id} photo={photo} setNotice={setNotice} user={user} refetch={refetch}/>
        ))}
      </Grid>
    </div>
  );
};

export default PhotoAlbum;