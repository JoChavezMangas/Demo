import { Helmet } from 'react-helmet-async';
// import { paramCase } from 'change-case';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import {
    Card,
    Button,
    // Divider,
    Container,
    IconButton,
    TableContainer,
    Typography,
    MenuItem
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
// routes
import { paramCase } from 'change-case';
import { PATH_DASHBOARD } from '../../routes/paths';
import { _employeeList } from '../../_mock/arrays';
// components
import Iconify from '../../components/iconify';
import ConfirmDialog from '../../components/confirm-dialog';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import GenericDataGridCustom from '../../sections/_examples/mui/data-grid/GenericDataGridCostom';
import Label from '../../components/label';
import { CustomAvatar } from '../../components/custom-avatar';
import MenuPopover from '../../components/menu-popover';





export default function BandejaEmpleado() {

    const [openConfirm, setOpenConfirm] = useState(false);
    const [openPopover, setOpenPopover] = useState(null);
    const [tableData, setTableData] = useState(_employeeList);
    const [IdAUX, setIdAUX] = useState('');
    const navigate = useNavigate();
    const handleOpenConfirm = () => {
        setOpenConfirm(true);
    };
    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };
    const handleOpenPopover = (e, Id) => {
        setIdAUX(Id)
        setOpenPopover(e.currentTarget);
    };
    const handleClosePopover = () => {
        setOpenPopover(null);
    };
    const handleEditRow = (id) => {
        console.log(id)
        navigate(PATH_DASHBOARD.empleado.edit(paramCase(id)));
    };
    const JustAfterClicDelete = () => {
        handleDeleteRow(IdAUX);
        onDelete(IdAUX);
    }
    const handleDeleteRow = (id) => {
        const deleteRow = tableData.filter((row) => row.id !== id);
        setTableData(deleteRow);
        setOpenConfirm(false);
    };

    const { enqueueSnackbar } = useSnackbar();
    const onDelete = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            enqueueSnackbar('Listo, el empleado fue borrado');
        } catch (error) {
            console.error(error);
        }
    };



    const columns = [
        {
            field: 'avatar',
            headerName: '',
            align: 'center',
            headerAlign: 'center',
            width: 64,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => <CustomAvatar name={params.row.name} sx={{ width: 36, height: 36 }} />,
        },
        {
            field: 'name',
            headerName: 'Colaborador',
            width: 220,
            editable: false,
        },
        {
            field: 'empresa',
            headerName: 'Empresa',
            width:150,
            editable: false,
        },
        {
            field: 'areaName',
            headerName: 'Area y Departamento',
            width: 300,
            editable: false,
            disableExtendRowFullWidth:true,

            renderCell: (params) => RenderEmpresaAreaDepto(params.row.empresa, params.row.areaName, params.row.dpto),
        },
        {
            field: 'Puesto',
            headerName: 'Puesto',
            width: 220,
            editable: false,
            renderCell: (params) => (
                <Typography variant="body2" noWrap>
                    {params.row.Puesto}
                </Typography>
            ),
        },
        {
            field: 'email',
            width: 250,
            headerName: 'Email',
            editable: false,
            renderCell: (params) => (
                <Typography variant="body2" sx={{ textDecoration: 'underline' }} noWrap>
                    {params.row.email}
                </Typography>
            ),
        },
        {
            field: 'status',
            type: 'singleSelect',
            headerName: 'Estatus',
            valueOptions: ['Activo', 'Inactivo', 'Bloqueado','Proceso'],
            align: 'center',
            headerAlign: 'center',
            width: 120,
            renderCell: (params) => RenderStatus(params.row.status),
        },
        {
            field: 'action',
            headerName: 'Acciones',
            align: 'center',
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
                <IconButton color={openPopover ? 'inherit' : 'default'} onClick={(e) => handleOpenPopover(e, params.row.id)}>
                    <Iconify icon="eva:more-vertical-fill" />
                </IconButton>
            ),
        },
    ];

    return (
        <>
            <Helmet>
                <title> Empelado </title>
            </Helmet>

            <Container>

                <CustomBreadcrumbs
                    heading={
                        <Typography variant='h4' color='primary'>Empleado</Typography>
                    }
                    links={[{ name: '' },]}
                    action={<Button component={RouterLink}
                        to={PATH_DASHBOARD.empleado.new}
                        variant="contained"
                        startIcon={<Iconify icon="eva:plus-fill" />}
                    >
                        Crear nuevo Empleado
                    </Button>} />



                <Card>
                    <TableContainer sx={{marginTop:'0px', position: 'relative', overflow: 'unset', }}
                    style={{ width: '100%' }}>
                            <GenericDataGridCustom data={tableData} columns={columns} />
                    </TableContainer>
                </Card>
            </Container>



            <MenuPopover
                open={openPopover}
                onClose={handleClosePopover}
                arrow="right-top"
                sx={{ width: 140 }}
            >
                <MenuItem
                    onClick={() => {
                        handleOpenConfirm();
                        handleClosePopover();
                    }}
                    sx={{ color: 'error.main' }}
                >
                    <Iconify icon="eva:trash-2-outline" />
                    Borrar
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        handleEditRow(IdAUX);
                        handleClosePopover();
                    }}
                >
                    <Iconify icon="eva:edit-fill" />
                    Editar
                </MenuItem>
            </MenuPopover>


            <ConfirmDialog
                open={openConfirm}
                onClose={handleCloseConfirm}
                title="Borrar"
                content="Deseas borrar este empleado?"
                action={
                    <Button variant="contained" color="error" onClick={JustAfterClicDelete}>
                        Borrar
                    </Button>
                }
            />

        </>
    );
}


function RenderStatus(getStatus) {
    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';
    return (
        <Label
            variant={isLight ? 'soft' : 'filled'}
            color={(getStatus === 'Bloqueado' && 'error') || (getStatus === 'Inactivo' && 'warning') || (getStatus === 'Proceso' && 'warning') || 'success'}
            sx={{ mx: 'auto' }}
        >
            {getStatus}
        </Label>
    );
}


function RenderEmpresaAreaDepto(empresa, area,dpto) {
    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';
    let result;


    if (dpto === '') {
        result= (
            <a>
                <Label
                    variant={isLight ? 'soft' : 'filled'}
                    color='secondary'
                    sx={{ mx: 'auto' }}
                >
                    {area}
                </Label>
            </a>
        );
    } else {
        result=(
            <a>
                <Label
                    variant={isLight ? 'soft' : 'filled'}
                    color='secondary'
                    sx={{ mx: 'auto' }}
                >
                    {area}
                </Label>
                <Label
                    variant={isLight ? 'soft' : 'filled'}
                    color='success'
                    sx={{ mx: 'auto' }}
                >
                    {dpto}
                </Label>
            </a>
        );
    }

    return (
        <>
            {result}
        </>
        )
}


