import {
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead
} from '@mui/material';
import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModal } from '@ebay/nice-modal-react';
import BreadCrumbs from '../../components/BreadCrumbs';
import Cell from '../../components/Table/Cell';
import Row from '../../components/Table/Row';
import Filters from './components/Filters';
import ButtonDelete from '../../components/ButtonsAction/ActionDelete';
import ButtonEdit from '../../components/ButtonsAction/ActionEdit';
import ButtonView from '../../components/ButtonsAction/ActionView';
import EmpresasServices from '../../services/EmpresasServices';
import ModalDelete from '../../components/ModalDelete';

function EmpresasList() {
  const [empresas, setEmpresas] = useState(null);
  const modalDelete = useModal(ModalDelete);
  const navigate = useNavigate();
  const [info, setInfo] = useState(null);
  async function fechDataEmpresas(page = 1) {
    try {
      const response = await EmpresasServices.get(page);
      if (response.status === 200) {
        setEmpresas(response.data);
      }
    } catch (error) {
      setInfo({
        type: 'error',
        message: 'se ha producido un error, por favor intentelo más tarde.'
      });
    }
  }
  const breadCrumbs = useMemo(
    () => [
      { title: 'Gestión', url: '/' },
      { title: 'Empresas', url: '/gestion/empresas' }
    ],
    []
  );
  const handleDeleteEmpresas = useCallback((id) => {
    modalDelete.show();
  });
  useEffect(() => {
    fechDataEmpresas();
  }, []);
  return (
    <Stack sx={{ margin: '0px 60px' }}>
      <BreadCrumbs items={breadCrumbs} />
      <Filters />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <Row>
              <Cell>Nit</Cell>
              <Cell>Nombre</Cell>
              <Cell>Correo</Cell>
              <Cell>Fecha convenio</Cell>
              <Cell>Municipio</Cell>
              <Cell>Acciones</Cell>
            </Row>
          </TableHead>
          <TableBody>
            {empresas &&
              empresas.data.map((empresa) => (
                <Row
                  key={empresa.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <Cell>{empresa.nit}</Cell>
                  <Cell>{empresa.nombre}</Cell>
                  <Cell>{empresa.email}</Cell>
                  <Cell>{empresa.fecha_convenio}</Cell>
                  <Cell>{empresa.term.parent.name}</Cell>
                  <Cell>
                    <ButtonView onClick={() => {}} />
                    <ButtonEdit
                      onClick={() => {
                        navigate(`/gestion/empresas/editar/${empresa.id}`);
                      }}
                    />
                    <ButtonDelete
                      onClick={() => {
                        handleDeleteEmpresas(empresa.id);
                      }}
                    />
                  </Cell>
                </Row>
              ))}
          </TableBody>
        </Table>
        {empresas && empresas.total > 1 && (
          <Pagination
            count={empresas.total}
            color="primary"
            page={empresas.current_page}
            onChange={(event, page) => {
              fechDataEmpresas(page);
            }}
          />
        )}
      </TableContainer>
    </Stack>
  );
}

export default EmpresasList;
