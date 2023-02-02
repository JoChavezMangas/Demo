import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { Link as RouterLink, useParams } from 'react-router-dom';
// @mui
import { Button, Container, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// _mock_
import { _userList } from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import BancoNewEditForm from '../../sections/@dashboard/banco/BancoNewEditForm';
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

export default function BancoEditPage() {
  const { themeStretch } = useSettingsContext();

  const { name } = useParams();

  const currentBanco = _userList.find((banco) => paramCase(banco.name) === name);

  return (
    <>
      <Helmet>
        <title>Banco</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={
            <Typography variant='h4' color='primary'>Editar banco</Typography>
          }
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Banco',
              href: PATH_DASHBOARD.banco.list,
            },
            { name: currentBanco?.name },
          ]}
          action={<Button component={RouterLink}
            to={PATH_DASHBOARD.banco.list}
            variant="contained"
            startIcon={<Iconify icon="ic:round-arrow-back" />}
          >

            Regresar
          </Button>}
        />

        <BancoNewEditForm isEdit currentBanco={currentBanco} />
      </Container>
    </>
  );
}
