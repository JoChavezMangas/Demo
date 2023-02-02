import {
    Stack,
    InputAdornment,
    TextField,
    TableRow,
    TableCell,
    Typography,
    Checkbox,
    IconButton,
    Button,
    MenuItem
} from "@mui/material";
import { func, string, number, bool, object, array } from "prop-types";
import { useState } from "react";
import ConfirmDialog from "../../../components/confirm-dialog";
import Iconify from "../../../components/iconify";
import MenuPopover from "../../../components/menu-popover";

RowEmpresaBandeja.propTypes = {
    row: object,
    selected: bool,
    onEditRow: func,
    onDeleteRow: func,
    onSelectRow: func,
};

function RowEmpresaBandeja({
    row,
    selected,
    onEditRow,
    onSelectRow,
    onDeleteRow
}) {

    const [openPopover, setOpenPopover] = useState(null);
    const [openConfirm, setOpenConfirm] = useState(false);
    const handleOpenPopover = (event) => {
        setOpenPopover(event.currentTarget);
    };
    const handleClosePopover = () => {
        setOpenPopover(null);
    };
    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };
    const handleOpenConfirm = () => {
        setOpenConfirm(true);
    };

    return (
        <>
            <TableRow hover selected={selected}>
                <TableCell padding="checkbox">
                    <Checkbox checked={selected} onClick={onSelectRow} />
                </TableCell>

                <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1}>

                        <Typography variant="subtitle2" noWrap>
                            {row.name}
                        </Typography>
                    </Stack>
                </TableCell>

                <TableCell align="left">{row.phoneNumber}</TableCell>
                <TableCell align="left">{row.email}</TableCell>

                <TableCell align="center">
                    <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
                        <Iconify icon="eva:more-vertical-fill" />
                    </IconButton>
                </TableCell>
            </TableRow>

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
                        onEditRow();
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
                content="Deseas borrar esta empresa?"
                action={
                    <Button variant="contained" color="error" onClick={onDeleteRow}>
                        Borrar
                    </Button>
                }
            />
        </>
    )
}

FiltroBandeja.propTypes = {
    isFiltered: bool,
    filterName: string,
    onFilterName: func,
    onResetFilter: func
};

function FiltroBandeja({
    isFiltered,
    filterName,
    onFilterName,
    onResetFilter
}) {

    return (
        <>
            <Stack
                spacing={2}
                alignItems="center"
                direction={{
                    xs: 'column',
                    sm: 'row',
                }}
                sx={{ px: 2.5, py: 3 }}
            >
                <TextField
                    fullWidth
                    placeholder="Buscar..."
                    value={filterName}
                    onChange={onFilterName}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                            </InputAdornment>
                        ),
                    }}
                />

                {isFiltered && (
                    <Button
                        color="error"
                        sx={{ flexShrink: 0 }}
                        onClick={onResetFilter}
                        startIcon={<Iconify icon="eva:trash-2-outline" />}
                    >
                        Clear
                    </Button>
                )}



            </Stack>
        </>
    )
}

export { FiltroBandeja, RowEmpresaBandeja }


