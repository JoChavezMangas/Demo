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
// import { countries } from '../../../assets/data';
// components
// import Label from '../../../components/label';
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, {
  RHFCheckbox,
  RHFTextField,
} from '../../../components/hook-form';

// ----------------------------------------------------------------------

BancoNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentBanco: PropTypes.object,
};

export default function BancoNewEditForm({ isEdit = false, currentBanco }) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewBancoSchema = Yup.object().shape({
    bankName: Yup.string().required('Ingrese nombre del banco'),
    digit: Yup.string().required('Ingrese dígitos'),
    idSap: Yup.string().required('Ingrese id de banco'),
    // orders: Yup.string().required('Ingrese correo electrónico'),
    // businessParthner: Yup.string().required('Ingresé número de teléfono'),
  });

  const defaultValues = useMemo(
    () => ({
      bankName: currentBanco?.bankName || '',
      digit: currentBanco?.digit || '',
      idSap: currentBanco?.idSap || '',
      orders: currentBanco?.orders || '',
      businessParthner: currentBanco?.businessParthner || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentBanco]
  );

  const methods = useForm({
    resolver: yupResolver(NewBancoSchema),
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
    if (isEdit && currentBanco) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentBanco]);

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? '¡Su banco fue registrado!' : '¡Sus cambios fueron actualizados!');
      navigate(PATH_DASHBOARD.banco.list);
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
              <RHFTextField name="bankName" label="Nombre del banco" />
              <RHFTextField name="digit" label="Dígitos" />
              <RHFTextField name="idSap" label="Id banco SAP" />
              <RHFCheckbox name="orders" label="Visible para pedidos" sx={{ mt: 3 }} />
              <RHFCheckbox name="businessParthner" label="¿Es socio de negocios?" sx={{ mt: 3 }} />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Registrar Banco' : 'Guardar Cambios'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
