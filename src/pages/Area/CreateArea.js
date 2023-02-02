import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import AreaNewEditForm from '../../sections/@dashboard/area/AreaNewEditForm';

// ----------------------------------------------------------------------

export default function AreaCreatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Area</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={
            <Typography variant='h4' color='primary'>Crear nueva área</Typography>
          }
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Área',
              href: PATH_DASHBOARD.area.list,
            },
            { name: 'Nueva área' },
          ]}
        />
        <AreaNewEditForm />
      </Container>
    </>
  );
}
