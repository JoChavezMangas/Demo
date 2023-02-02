import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
// import { useParams } from 'react-router-dom';
import { Link as RouterLink, useParams } from 'react-router-dom';
// @mui
import { Container, Button, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// _mock_
import { _dataList } from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import EmpresaNewEditForm from '../../sections/@dashboard/empresa/EmpresaNewEditForm';
// import Button from '../../sections/_examples/extra/animate/other/Button';
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

export default function EmpresaEditPage() {
  const { themeStretch } = useSettingsContext();

  const { name } = useParams();

  const currentEmpresa = _dataList.find((empresa) => paramCase(empresa.id) === name);

  return (
    <>
      <Helmet>
        <title> User: Edit user | Minimal UI</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={
            <Typography variant='h4' color='primary'>Editar empresa</Typography>
          }

          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Empresa',
              href: PATH_DASHBOARD.empresa.list,
            },
            { name: currentEmpresa?.name },
          ]}

          action={<Button component={RouterLink}
            to={PATH_DASHBOARD.empresa.list}
            variant="contained"
            startIcon={<Iconify icon="ic:round-arrow-back" />}
          >

            Regresar
          </Button>}

        />





        <EmpresaNewEditForm isEdit currentEmpresa={currentEmpresa} />
      </Container>
    </>
  );
}
