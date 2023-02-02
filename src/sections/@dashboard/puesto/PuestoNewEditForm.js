import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
// utils
// import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// assets
import { roleType } from '../../../assets/data/index';

// components
// import Label from '../../../components/label';
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, {
  RHFSelect,
  RHFTextField,
} from '../../../components/hook-form';

// ----------------------------------------------------------------------

PuestoNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentPuesto: PropTypes.object,
};

export default function PuestoNewEditForm({ isEdit = false, currentPuesto }) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewPuestoSchema = Yup.object().shape({
    rolName: Yup.string().required('Ingrese nombre del puesto'),
    rolType: Yup.string().required('Seleccione el tipo de puesto'),
    area: Yup.string().required('Seleccione el área del puesto'),
  });

  const defaultValues = useMemo(
    () => ({
      roleName: currentPuesto?.rolName || '',
      rolType: currentPuesto?.rolType || '',
      area: currentPuesto?. area || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentPuesto]
  );

  const methods = useForm({
    resolver: yupResolver(NewPuestoSchema),
    defaultValues,
  });

  const {
    reset,
    // watch,
    // setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // const values = watch();

  useEffect(() => {
    if (isEdit && currentPuesto) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentPuesto]);

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? '¡Su puesto fue registrado!' : '¡Sus cambios fueron actualizados!');
      navigate(PATH_DASHBOARD.puesto.list);
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };

  // const handleDrop = useCallback(
  //   (acceptedFiles) => {
  //     const file = acceptedFiles[0];

  //     const newFile = Object.assign(file, {
  //       preview: URL.createObjectURL(file),
  //     });

  //     if (file) {
  //       setValue('avatarUrl', newFile, { shouldValidate: true });
  //     }
  //   },
  //   [setValue]
  // );

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
              <RHFTextField name="rolName" label="Nombre del puesto" />
              <RHFSelect native name="rolType" label="Tipo de puesto" placeholder="Tipo de puesto">
                <option value="" />
                {roleType.map((rolType) => (
                  <option key={rolType.code} value={rolType.label}>
                    {rolType.label}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect native name="area" label="Área" placeholder="Área">
                <option value="" />
                {roleType.map((area) => (
                  <option key={area.code} value={area.label}>
                    {area.label}
                  </option>
                ))}
              </RHFSelect>
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Registrar Puesto' : 'Guardar Cambios'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
