import React, { useEffect, useState } from 'react';
import { Grid, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ButtonCommon from '../../../components/ButtonCommon';
import SelectCommon from '../../../components/SelectCommon';
import DepartamentosServices from '../../../services/DepartamentosServices';
import MunicipiosServices from '../../../services/MunicipiosServices';

function Filters() {
  const validate = useNavigate();
  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);
  async function fechDataDepartamentos() {
    try {
      setLoading(true);
      const response = await DepartamentosServices.get();
      if (response.status === 200) {
        setDepartamentos(
          response.data.map((item) => ({ label: item.name, value: item.id }))
        );
        setLoading(false);
      }
    } catch (error) {
      setInfo({
        type: 'error',
        message: 'se ha producido un error, por favor intentelo más tarde.'
      });
    } finally {
      setLoading(null);
    }
  }
  async function fechDataMunicipios(id) {
    try {
      const response = await MunicipiosServices.get(id);
      if (response.status === 200) {
        setMunicipios(
          response.data.map((item) => ({ label: item.name, value: item.id }))
        );
      }
    } catch (error) {
      setInfo({
        type: 'error',
        message: 'se ha producido un error, por favor intentelo más tarde.'
      });
    } finally {
      setLoading(null);
    }
  }
  useEffect(() => {
    fechDataDepartamentos();
  }, []);
  return (
    <Grid container direction="row" spacing={2} marginTop={1} marginBottom={2}>
      <Grid item lg={5}>
        <SelectCommon
          label="Departamento"
          options={departamentos}
          onChange={(departamento) => {
            fechDataMunicipios(departamento.value);
          }}
        />
      </Grid>
      <Grid item lg={4}>
        <SelectCommon label="Municipio" options={municipios} />
      </Grid>
      <Grid item lg={3}>
        <Stack direction="row">
          <ButtonCommon
            variant="outlined"
            sx={{ marginTop: '20px', marginRight: '5px' }}
          >
            BUSCAR
          </ButtonCommon>
          <ButtonCommon
            sx={{ marginTop: '20px' }}
            onClick={() => {
              validate('/gestion/empresas/crear');
            }}
          >
            AGREGAR
          </ButtonCommon>
        </Stack>
      </Grid>
    </Grid>
  );
}
export default Filters;
