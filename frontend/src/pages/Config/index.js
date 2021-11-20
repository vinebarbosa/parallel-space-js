import React, { useEffect, useState } from 'react';
import { FiLogOut } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import tituloPequenoImg from '../../assets/img/titulo-pequeno.svg';
import cometaImg from '../../assets/img/cometa.svg';
import solImg from '../../assets/img/sol.svg';
import fogueteImg from '../../assets/img/foguete.svg';
import jupterImg from '../../assets/img/jupter.svg';

import { Pads, PadsContainer } from './styles';
import Pad from '../../components/Pad';
import { Form } from '../../components/Form';

export default function Config() {
  const name = localStorage.getItem('name');
  const token = localStorage.getItem('token');

  api.defaults.headers.common.Authorization = token

  const [selectedPad, setSelectedPad] = useState({})
  const [pads, setPads] = useState([])

  useEffect(() => {
    async function getPadsData() {
      const response = await api.get('/buttons')
      setPads(response.data)
    }
    getPadsData()
  }, [])

  return (
    <>
      <div className="parte1-div">
        <div className="cabeca">
          <img className="titulo-pequeno" src={tituloPequenoImg} alt="titulo" />
          <div className="cabeca1">
            <p>Bem Vindo(a), {name}!</p>

            <FiLogOut size={24} />
          </div>
        </div>

        <PadsContainer>
          <Pads>
            {pads && (
              pads.map((pad) =>
                <Pad
                  key={pad.id}
                  data={pad}
                  changeSelectedPad={setSelectedPad}
                  selectedPad={selectedPad}
                />
              )
            )}
          </Pads>
        </PadsContainer>

        <img className="cometa" src={cometaImg} alt="cometa" />
        <img className="sol" src={solImg} alt="sol" />
        <img className="foguete-img" src={fogueteImg} alt="foguete" />
        <img className="jupter-img" src={jupterImg} alt="jupter" />
      </div>

      <div className="parte2-div">
        {
          !!selectedPad.id
          ? <Form/> : <p>Clique em um pad para configurar sua função</p>
        }
      </div>
    </>
  );
}
