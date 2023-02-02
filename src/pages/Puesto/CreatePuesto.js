import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import PuestoNewEditForm from '../../sections/@dashboard/puesto/PuestoNewEditForm';

// ----------------------------------------------------------------------

export default function PuestoCreatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Puesto</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={
            <Typography variant='h4' color='primary'>Registrar puesto</Typography>
          }
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Puesto',
              href: PATH_DASHBOARD.puesto.list,
            },
            { name: 'Registrar puesto' },
          ]}
        />
        <PuestoNewEditForm />
      </Container>
    </>
  );
}
