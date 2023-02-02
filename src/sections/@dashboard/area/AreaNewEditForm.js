import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack} from '@mui/material';
// utils
// import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// assets
import { countries } from '../../../assets/data';
// components
// import Label from '../../../components/label';
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, {
  RHFSelect,
  RHFTextField,
} from '../../../components/hook-form';

// ----------------------------------------------------------------------

AreaNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentArea: PropTypes.object,
};

export default function AreaNewEditForm({ isEdit = false, currentArea }) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewAreaSchema = Yup.object().shape({
    areaName: Yup.string().required('Ingrese nombre del área'),
    companyName: Yup.string().required('Ingrese nombre la empresa'),
    rol: Yup.string().required('Seleccione empleado'),

  });

  const defaultValues = useMemo(
    () => ({
      areaName: currentArea?.areaName || '',
      companyName: currentArea?.companyName || '',
      rol: currentArea?. RFC || '',

    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentArea]
  );

  const methods = useForm({
    resolver: yupResolver(NewAreaSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // const values = watch();

  useEffect(() => {
    if (isEdit && currentArea) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentArea]);

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? '¡Su area fue creada!' : '¡Sus cambios fueron actualizados!');
      navigate(PATH_DASHBOARD.area.list);
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={3}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(3, 1fr)',
              }}
            >
              <RHFTextField name="areaName" label="Nombre del área" />
              <RHFTextField name="companyName" label="Empresa" />
              <RHFSelect native name="rol" label="Empleado" placeholder="Empleado">
                <option value="" />
                {countries.map((country) => (
                  <option key={country.code} value={country.label}>
                    {country.label}
                  </option>
                ))}
              </RHFSelect>
             </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Crear Area' : 'Guardar Cambios'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
