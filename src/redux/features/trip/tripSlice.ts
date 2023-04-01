import { apiSlice } from '../../rootReducer';
import { api } from '../../../utils/api';
import { ITrip } from '../../../utils/interfaces/ITripAPI';

const token = localStorage.getItem('token');

export const tripSlice = apiSlice.injectEndpoints({
	endpoints: build => ({
		getTrips: build.query<ITrip, void>({
			query: () => ({
				url: `http://vemser-dbc.dbccompany.com.br:39000/lluuccaass88/vemser-trabalho-final/viagem`,
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		}),
	}),
});

export const { useGetTripsQuery } = tripSlice;
