import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { IMicrophone } from '../../model/microphone.interface'
import { GetStaticProps, NextPageContext, GetStaticPropsContext } from 'next';
import Link from 'next/link';
import { openDB } from '../open-db.helper';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

export interface IIndexProps {
  microphones: IMicrophone[];
}

export default function Home(props: IIndexProps) {
  const { microphones } = props;


  return (
    <Grid container spacing={3} >
      {microphones.map(microphone => {
        const title = `${microphone.brand} ${microphone.model}`;
        return (
          <Grid key={microphone.id} container item xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="300"
                  alt={title}
                  image={microphone.imageUrl}
                  title={title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    <Link href="microphones/[microphone_id]" as={`/microphones/${microphone.id}`}>
                      <a>{title}</a>
                    </Link>
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                    across all continents except Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        )
      })}
    </Grid>
  );
}

/**
 * Only runs at build time
 *
 * @param ctx
 */
export const getStaticProps: GetStaticProps<IIndexProps> = async (ctx: GetStaticPropsContext) => {
  const currentPage = ctx.params?.currentPage;
  const currentPageNumber = Number(currentPage || 0);

  const min = currentPageNumber * 5;
  const max = (currentPageNumber + 1) * 5;

  const db = await openDB();
  const microphones: IMicrophone[] = await db.all(
    `SELECT * FROM Microphone WHERE id > ? AND id <= ?`
  , [min, max]);

  return {
    props: {
      microphones,
    }
  };
}
