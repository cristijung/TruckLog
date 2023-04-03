import { useEffect, useState } from 'react';
import { Button } from '../../../shared/components/Button';
import {
  CreateTruckModal,
  EditTruckModal,
  DeleteTruckModal,
} from '../../../shared/components/User/Modals';
import { CaminhoesContainer } from './styles';
import { useGetTruckQuery } from '../../../redux/features/truck/truckSlice';
import loadingGif from '../../../assets/TruckGif.gif';

export const Caminhoes = () => {
  const [truckId, setTruckId] = useState(0);
  const [truckName, setTruckName] = useState('');
  const [licensePlate, setlicensePlate] = useState('');
  const [searchTruck, setSearchTruck] = useState('');
  const [loading, setLoading] = useState(true);

  const [isCreateTruckModalOpen, setIsCreateTruckModalOpen] = useState(false);
  const [isEditTruckModalOpen, setIsEditTruckModalOpen] = useState(false);
  const [isDeleteTruckModalOpen, setIsDeleteTruckModalOpen] = useState(false);

  const handleDeleteTruck = (truckId: number, truckLicensePlate: string) => {
    setIsDeleteTruckModalOpen(true);
    setTruckId(truckId);
    setlicensePlate(truckLicensePlate);
  };

  useEffect(() => {
    document.title = 'Caminhões | TruckLog';

    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, []);
  const { data } = useGetTruckQuery();

  return (
    <CaminhoesContainer>
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
              <a className="selected">Caminhões</a>
            </div>

            <h2 className="title-page">Caminhões</h2>
            <Button
              onClick={() => setIsCreateTruckModalOpen(true)}
              className="create-button"
            >
              Cadastrar Caminhão <i className="ph ph-plus"></i>
            </Button>
            <input
              value={searchTruck}
              onChange={(e) => setSearchTruck(e.target.value)}
              type="text"
              placeholder="Procurar caminhões"
            />

            <div className="trucks-header">
              <p>
                Modelo <i className="ph ph-arrow-down"></i>
              </p>
              <p>Placa</p>
              <p>Combustível</p>
              <p>Situação</p>
              <p>Status</p>
            </div>

            <div className="trucks-body">
              {data ? (
                data
                  .slice()
                  .sort((item) => {
                    return item.statusCaminhao === 'ESTACIONADO' ? 1 : -1;
                  })
                  .sort((item) => {
                    return item.status === 'ATIVO' ? -1 : 1;
                  })

                  .filter((truck) =>
                    truck.modelo
                      .toLowerCase()
                      .includes(searchTruck.toLowerCase())
                  )
                  .map((truck) => (
                    <div
                      className={`truck truck-${truck.status.toLowerCase()}`}
                      key={truck.placa}
                    >
                      <p>{truck.modelo}</p>
                      <p>{truck.placa}</p>
                      <p
                        className={
                          truck.nivelCombustivel <= 20
                            ? 'error'
                            : truck.nivelCombustivel <= 60
                            ? 'warning'
                            : 'success'
                        }
                      >
                        {truck.nivelCombustivel}%
                      </p>
                      <p
                        className={
                          truck.statusCaminhao === 'EM_VIAGEM'
                            ? 'warning'
                            : 'success'
                        }
                      >
                        {truck.statusCaminhao.replace('_', ' ')}
                      </p>
                      <div
                        className={
                          truck.status === 'INATIVO' ? 'error' : 'success'
                        }
                      >
                        {truck.status}
                        <div className="btn-container">
                          <button
                            onClick={() => {
                              setTruckId(truck.idCaminhao);
                              setTruckName(truck.modelo);
                              return setIsEditTruckModalOpen(true);
                            }}
                            disabled={truck.status === 'ATIVO' ? false : true}
                          >
                            <i title="Abastecer" className="ph ph-gas-pump"></i>
                          </button>

                          <button
                            onClick={() =>
                              handleDeleteTruck(truck.idCaminhao, truck.placa)
                            }
                            disabled={truck.status === 'ATIVO' ? false : true}
                          >
                            <i
                              title="Deletar"
                              className="ph ph-trash delete-icon"
                            ></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <p>Estamos carregando a página</p>
              )}
            </div>
          </main>
          <CreateTruckModal
            isOpen={isCreateTruckModalOpen}
            onRequestClose={() => setIsCreateTruckModalOpen(false)}
          />
          <EditTruckModal
            isOpen={isEditTruckModalOpen}
            onRequestClose={() => setIsEditTruckModalOpen(false)}
            truckId={truckId}
            truckName={truckName}
          />
          <DeleteTruckModal
            isOpen={isDeleteTruckModalOpen}
            onRequestClose={() => setIsDeleteTruckModalOpen(false)}
            idCaminhao={truckId}
            placaCaminhao={licensePlate}
          />
        </>
      )}
    </CaminhoesContainer>
  );
};
