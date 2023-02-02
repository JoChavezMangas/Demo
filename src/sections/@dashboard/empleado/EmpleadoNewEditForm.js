import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, TextField, Typography} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

// // utils
import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// // assets
// import { countries } from '../../../assets/data';
// // components
import Label from '../../../components/label';
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, {
  RHFSelect,
  RHFTextField,
  RHFRadioGroup,
  RHFUploadPhoto,

} from '../../../components/hook-form';

// ----------------------------------------------------------------------

EmpleadoNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentEmpleado: PropTypes.object,
};


export default function EmpleadoNewEditForm({ isEdit = false, currentEmpleado }) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewEmpleadoSchema = Yup.object().shape({
    Name: Yup.string().required('Ingrese nomre'),
    SecondName: Yup.string().required('Ingrese apellido'),
    SecondLastName: Yup.string().required('Ingrese segundo apellido'),
    date: Yup.string().required('Seleccione fecha de nacimiento'),
    rfc: Yup.string().required('Ingrese RFC'),
    curp: Yup.string().required('Ingrese CURP'),
    address: Yup.string().required('Ingrese dirección'),
  });

  const defaultValues = useMemo(
    () => ({
      Name: currentEmpleado?.Name || '',
      FirstName: currentEmpleado?.FirstName || '',
      SecondName: currentEmpleado?.SecondName || '',
      SecondLastName: currentEmpleado?.SecondLastName || '',
      date: currentEmpleado?.date || '',
      rfc: currentEmpleado?.rfc || '',
      curp: currentEmpleado?.curp || '',
      sexo: currentEmpleado?.sexo || '',
      company: currentEmpleado?.company || '',
      area: currentEmpleado?.area || '',
      position: currentEmpleado?.position || '',
      salary: currentEmpleado?.salary || '',
      integratedSalary: currentEmpleado?.integratedSalary || '',
      dateAdmission: currentEmpleado?.dateAdmission || '',
      address: currentEmpleado?.address || '',
      zipCode: currentEmpleado?.zipCode || '',

    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentEmpleado]
  );

  const methods = useForm({
    resolver: yupResolver(NewEmpleadoSchema),
    defaultValues,
  });

  const {
    control,
    watch,
    setValue,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentEmpleado) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentEmpleado]);

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? '¡Su empleado fue creado!' : '¡Sus cambios fueron actualizados!');
      navigate(PATH_DASHBOARD.empleado.list);
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('avatarUrl', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {isEdit && (
              <Label
                color={values.status === 'active' ? 'success' : 'error'}
                sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
              >
                {values.status}
              </Label>
            )}

            <Box sx={{ mb: 5 }}>
              <RHFUploadPhoto
                name="avatarUrl"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    Formatos *.jpeg, *.jpg, *.png, *.gif
                    <br /> Tamaño máximo {fData(3145728)}
                  </Typography>
                }
              />
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={9}>
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
              <RHFTextField name="Name" label="Nombre" />
              <RHFTextField name="FisrtName" label="Segundo nombre" />
              <RHFTextField name="SecondName" label="Apellido paterno" />
              <RHFTextField name="SecondLastName" label="Apellido paterno" />
              <Controller
                  name="date"
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      {...field}
                      label="Fecha de nacimiento"
                      inputFormat="dd/MM/yyyy"
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          {...params}
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                    />
                  )}
                />
              <RHFTextField name="rfc" label="RFC" />
              <RHFTextField name="curp" label="CURP" />
              <RHFRadioGroup
                row
                name="sexo"
                label="Sexo"
                options={[
                  { label: 'Hombre', value: 'Hombre' },
                  { label: 'Mujer', value: 'Mujer' },
                ]}
              />
              <RHFSelect native name="company" label="Empresa" placeholder="Empresa">
                <option value="" />
              </RHFSelect>
              <RHFSelect native name="area" label="Área" placeholder="Área">
                <option value="" />
              </RHFSelect>
              <RHFSelect native name="position" label="Puesto" placeholder="Puesto">
                <option value="" />
              </RHFSelect>
              <RHFTextField name="salary" label="Salario diario" />              
              <RHFTextField name="integratedSalary" label="Salario integrado" />              
              <Controller
                  name="dateAdmission"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      {...field}
                      label="Fecha de ingreso"
                      inputFormat="dd/MM/yyyy"
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          {...params}
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                    />
                  )}
                />
              <RHFTextField name="address" label="Domicilio" />
              <RHFTextField name="zipCode" label="Código postal" />              
              <RHFTextField name="state" label="Estado" />              
              <RHFTextField name="delegacion" label="Delegación" />              
              <RHFTextField name="phone" label="Teléfono fijo" />              
              <RHFTextField name="phoneSecond" label="Teléfono de recados" />              
              <RHFTextField name="movilPhone" label="Teléfono móvil" />   
              <RHFSelect native name="bank" label="Banco" placeholder="Banco">
                <option value="" />
              </RHFSelect>           
              <RHFTextField name="bankAccount" label="Cuenta de banco" />              
              <RHFTextField name="clabe" label="Clabe interbancaria" />              
              <RHFSelect native name="typeContract" label="Tipo de contrato" placeholder="Tipo de contratación">
                <option value="" />
              </RHFSelect>  
              <Controller
                  name="dateAdmission"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      {...field}
                      label="Terminación del período de prueba"
                      inputFormat="dd/MM/yyyy"
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          {...params}
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                    />
                  )}
                />
                <RHFTextField name="NSS" label="NSS" />              
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Crear Empleado' : 'Guardar Cambios'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
