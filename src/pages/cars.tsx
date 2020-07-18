  
import { Grid } from '@material-ui/core';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import {  stringify } from 'querystring';
import Search from '.';
import { CarModel } from '../../api/Car';
import { getMakes, Make } from '../database/getMakes';
import { getModels, Model } from '../database/getModels';
import { getPaginatedCars } from '../database/getCars';
import { getAsString } from '../getAsString';
import useSWR from 'swr';
import { useState } from 'react';
import deepEqual from 'fast-deep-equal';
import { CarPagination } from '../components/CarPagination';
import { CarCard } from '../components/CarCard';



interface CarsListProps {
    makes: Make[];
    models: Model[];
    cars: CarModel[];
    totalPages: number;
}

export  default function CarsList({makes, models, cars, totalPages}: CarsListProps) {
    const {query} = useRouter();
    const [serverQuery] = useState(query);
    const {data} = useSWR('api/cars?' + stringify(query), {
      dedupingInterval: 15000,
      initialData: deepEqual(query, serverQuery) ? {cars, totalPages} : undefined
    });
  
    return (
    <Grid container spacing={3}>
        <Grid item xs={12} md={3} lg={2} sm={5}>
            <Search singleColumn makes={makes} models={models} />
        </Grid>
        <Grid container item xs={12} md={9} lg={10} sm={7} spacing={3}>
          <Grid xs={12} item>
            <CarPagination totalPages={data?.totalPages}/>
          </Grid>
          {(data?.cars || []).map(car => (     
            <Grid xs={12} sm={6} item key={car.id}>
            <CarCard car={car} />
            </Grid>
          ))}
          <Grid xs={12} item>
            <CarPagination totalPages={data?.totalPages}/>
          </Grid>
        </Grid>
    </Grid>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const make = getAsString(context.query.make);
  
    const [makes, models, pagination] = await Promise.all([getMakes(), getModels(make), getPaginatedCars(context.query)]);
  
    return { props: { makes, models, cars: pagination.cars, totalPages: pagination.totalPages } };
  };

