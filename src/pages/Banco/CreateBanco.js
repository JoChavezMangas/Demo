import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import BancoNewEditForm from '../../sections/@dashboard/banco/BancoNewEditForm';

// ----------------------------------------------------------------------

export default function BancoCreatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title>Banco</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={
            <Typography variant='h4' color='primary'>Registrar banco</Typography>
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
            { name: 'Registrar Banco' },
          ]}
        />
        <BancoNewEditForm />
      </Container>
    </>
  );
}
