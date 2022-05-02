//HOOKS
import {useClient} from '../clientsContext/ClientProvider';
import {useEffect} from 'react';
import {useParams} from 'react-router-dom';

//COMPONENTS
import { SectionBanner } from "../components";


export const ClientProfile = () => {

const {currentClient, getClient} = useClient();
const {id} = useParams();

useEffect(() => {
    getClient(id ? parseInt(id) : 0);
}, [])

  return (
    <>
        <SectionBanner sectionName="Perfil de Cliente"></SectionBanner>
        {currentClient && <h1>{currentClient.nombre}</h1>}
    </>
  )
}
