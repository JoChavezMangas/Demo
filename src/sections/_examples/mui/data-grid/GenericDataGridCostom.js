import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
// import { useTheme } from '@mui/material/styles';
import { Box, Rating, } from '@mui/material';
import {
    DataGrid,
    // GridToolbar,
    getGridNumericOperators,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    // GridToolbarExport,
    // GridToolbarDensitySelector,
} from '@mui/x-data-grid';

// components
// import Label from '../../../../components/label';
// import Iconify from '../../../../components/iconify';
// import { CustomAvatar } from '../../../../components/custom-avatar';

// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

function CustomToolbar() {
    return (
        <GridToolbarContainer
        sx={{
            backgroundColor: 'rgb(249, 250, 251)',
            height:45,
            paddingTop:1,
            paddingBottom:4,
            color:'rgb(196, 205, 213)',
        }}
        >
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            {/* <GridToolbarDensitySelector /> */}
            {/* <GridToolbarExport /> */}
        </GridToolbarContainer>
    );
}


GenericDataGridCustom.propTypes = {
    data: PropTypes.array,
    columns: PropTypes.array,
};

export default function GenericDataGridCustom({ data, columns }) {
    const [selectionModel, setSelectionModel] = useState([]);

    if (columns.length > 0) {
        const ratingColumn = columns.find((column) => column.field === 'rating');
        const ratingColIndex = columns.findIndex((col) => col.field === 'rating');

        const ratingFilterOperators = getGridNumericOperators().map((operator) => ({
            ...operator,
            InputComponent: RatingInputValue,
        }));

        columns[ratingColIndex] = {
            ...ratingColumn,
            filterOperators: ratingFilterOperators,
        };

    }

    const [pageSize, setPageSize] = useState(10);

    const selected = data.filter((row) => selectionModel.includes(row.id));

    console.log('SELECTED', selected);

    return (
        <DataGrid
            autoHeight
            sx={{
                '.MuiDataGrid-columnSeparator': {
                    display: 'none',
                  },
                '& .MuiDataGrid-columnHeaders':{
                    backgroundColor: 'rgba(0, 171, 85, 0.08)',
                    borderRadius: '0px',
                },
                '& .MuiDataGrid-row':{
                    color: 'rgb(69, 79, 91)',
                }
            }}
            // checkboxSelection
            disableSelectionOnClick
            header
            rows={data}
            columns={columns}
            rowsPerPageOptions={[10]}
            pageSize={10}
            pagination
            onSelectionModelChange={(newSelectionModel) => {
                setSelectionModel(newSelectionModel);
            }}
            localeText={{
                toolbarColumns: 'Columnas',
                toolbarFilters: 'Filtros',
                columnsPanelTextFieldPlaceholder: 'Columna',
                columnsPanelTextFieldLabel: 'Búsqueda',
                columnsPanelShowAllButton:'Mostrar',
                columnsPanelHideAllButton:'Ocultar',
                filterPanelOperators:'Tipo de filtro',
                filterPanelOperatorAnd:'y',
                filterPanelOperatorOr:'o',
                filterOperatorIs: 'es',
                filterOperatorNot: 'no es',
                filterPanelColumns: 'Columna',
                filterPanelInputLabel: 'Valor',
                filterPanelInputPlaceholder: 'Valor',
                filterOperatorContains: 'Contiene el valor',
                filterOperatorEquals: 'Es igual a',
                filterOperatorStartsWith: 'Comienza con',
                filterOperatorEndsWith: 'Termina con',
                filterOperatorIsEmpty: 'No tiene valor',
                filterOperatorIsNotEmpty: 'Tiene valor',
                filterOperatorIsAnyOf: 'Tiene el valor',
                columnMenuUnsort: 'Sin orden',
                columnMenuSortAsc: 'Orden ascendente',
                columnMenuSortDesc: 'Orden descendete',
                columnMenuShowColumns:'Mostrar columna',
                columnMenuFilter: 'Filtros',
                columnMenuHideColumn: 'Ocultar columna'

            }}
            components={{
                Toolbar: CustomToolbar,
            }}

            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[10, 25, 50]}
            pagination

        />
    );
}

// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

RatingInputValue.propTypes = {
    item: PropTypes.object,
    applyValue: PropTypes.func,
};

function RatingInputValue({ item, applyValue }) {
    return (
        <Box sx={{ p: 1, height: 1, alignItems: 'flex-end', display: 'flex' }}>
            <Rating
                size="small"
                precision={0.5}
                placeholder="Buscar"
                value={Number(item.value)}
                onChange={(event, newValue) => {
                    applyValue({ ...item, value: newValue });
                }}
            />
        </Box>
    );
}
