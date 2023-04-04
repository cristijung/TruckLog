import { useEffect, useState } from 'react';
import { Button } from '../../../shared/components/Button';
import { useGetTripsQuery } from '../../../redux/features/trip/tripSlice';
import {
  CreateTripModal,
  EditTripModal,
  DeleteTripModal,
} from '../../../shared/components/User/Modals';

import { ViagensContainer } from './styles';
import { ITrip } from '../../../utils/interfaces/ITripAPI';
import loadingGif from '../../../assets/TruckGif.gif';

export const Viagens = () => {
  const [searchTrip, setSearchTrip] = useState('');

  const [isCreateTripModalOpen, setIsCreateTripModalOpen] = useState(false);
  const [isEditTripModalOpen, setIsEditTripModalOpen] = useState(false);
  const [isDeleteTripModalOpen, setIsDeleteTripModalOpen] = useState(false);

  const [idViagem, setIdViagem] = useState(0);
  const [idMotorista, setMotorista] = useState(0);
  const [idUsuario, setIdUsuario] = useState(0);
  const [loading, setLoading] = useState(true);

  const [tripName, setTripName] = useState('');

  const handleEditTrip = (
    idViagem: number,
    idMotorista: number,
    tripName: string
  ) => {
    setIsEditTripModalOpen(true);
    setIdViagem(idViagem);
    setMotorista(idMotorista);
    setTripName(tripName);
  };
  useEffect(() => {
    document.title = 'Viagens | TruckLog';

    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, []);
  const handleDeleteTrip = (idUsuario: number, idViagem: number) => {
    setIsDeleteTripModalOpen(true);
    setIdUsuario(idUsuario);
    setIdViagem(idViagem);
    setTripName(tripName);
  };
  const { data } = useGetTripsQuery();
  const tripsData = data as unknown as ITrip[];

  const regex = /^(\d{4})-(\d{2})-(\d{2})$/;

  return (
    <ViagensContainer>
      {loading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <img src={loadingGif} alt="Loading..." />
        </div>
      ) : (
        <>
          <main className="content">
            <div className="user-trail">
              <span>Meu Painel</span>
              <span>{' > '}</span>
              <a className="selected">Viagens</a>
            </div>

            <h2 className="title-page">Viagens</h2>
            <Button
              onClick={() => setIsCreateTripModalOpen(true)}
              className="create-button"
            >
              Criar Viagem <i className="ph ph-plus"></i>
            </Button>
            <input
              value={searchTrip}
              onChange={(e) => setSearchTrip(e.target.value)}
              type="text"
              placeholder="Procurar viagens"
            />

            <div className="trips-header">
              <p>
                Descrição <i className="ph ph-arrow-down"></i>
              </p>
              <p>Ínicio</p>
              <p>Fim</p>
              <p>Status</p>
            </div>

            <div className="trips-body">
              {tripsData ? (
                tripsData
                  .slice()
                  .sort((item) => {
                    return item.statusViagem === 'EM_ANDAMENTO' ? -1 : 1;
                  })
                  .filter((trip) =>
                    trip.descricao
                      .toLowerCase()
                      .includes(searchTrip.toLowerCase())
                  )
                  .map((trip) => (
                    <div
                      className={
                        trip.statusViagem === 'EM_ANDAMENTO'
                          ? 'trip ativo'
                          : 'trip inativo'
                      }
                      key={trip.idViagem}
                    >
                      <p className="status-desc">{trip.descricao}</p>
                      <p>
                        <span className="date-desc">Inicio</span>
                        {trip.dataInicio.replace(
                          /^(\d{4})-(\d{2})-(\d{2})$/,
                          '$3/$2/$1'
                        )}
                      </p>
                      <p>
                        <span className="date-desc">Fim</span>
                        {trip.dataFim.replace(
                          /^(\d{4})-(\d{2})-(\d{2})$/,
                          '$3/$2/$1'
                        )}
                      </p>
                      <p
                        className={
                          trip.statusViagem === 'FINALIZADA'
                            ? 'finished'
                            : 'progress'
                        }
                      >
                        {trip.statusViagem.replace(/_/g, ' ')}
                      </p>

                      <div className="btn-container">
                        <button
                          onClick={() => {
                            handleEditTrip(
                              trip.idViagem,
                              trip.idUsuario,
                              trip.descricao
                            );
                          }}
                          disabled={
                            trip.statusViagem === 'EM_ANDAMENTO' ? false : true
                          }
                        >
                          <i className="ph ph-pencil"></i>
                        </button>
                        <button
                          onClick={() => {
                            handleDeleteTrip(trip.idUsuario, trip.idViagem);
                          }}
                          disabled={
                            trip.statusViagem === 'EM_ANDAMENTO' ? false : true
                          }
                        >
                          <i className="ph ph-check check-icon"></i>
                        </button>
                      </div>
                    </div>
                  ))
              ) : (
                <p>Carregando página</p>
              )}
            </div>
          </main>
          <CreateTripModal
            isOpen={isCreateTripModalOpen}
            onRequestClose={() => setIsCreateTripModalOpen(false)}
          />
          <EditTripModal
            isOpen={isEditTripModalOpen}
            onRequestClose={() => setIsEditTripModalOpen(false)}
            idViagem={idViagem}
            idMotorista={idMotorista}
            tripName={tripName}
          />
          <DeleteTripModal
            isOpen={isDeleteTripModalOpen}
            onRequestClose={() => setIsDeleteTripModalOpen(false)}
            idMotorista={idUsuario}
            idViagem={idViagem}
            tripName={tripName}
          />
        </>
      )}
    </ViagensContainer>
  );
};
