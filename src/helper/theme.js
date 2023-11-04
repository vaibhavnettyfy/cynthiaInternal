import { createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { styled } from "@mui/material/styles";
import { Chip, TableCell, TableRow } from '@mui/material';

export const useStyles = makeStyles(({ theme }) => ({
  cardContainer: {
    borderRadius: '10px !important',
    background: '#ffffff',
    boxShadow: '0px 1px 10px rgba(3,3,3,0.1) !important',
  },
  tableContainer: {
    borderRadius: '10px !important',
    background: '#ffffff',
    boxShadow: 'unset !important',
  },
  sticky: {
    position: "sticky",
    left: 0,
    zIndex: 9,
    background: "white",
    boxShadow: "2px 2px 2px #a4a4a4",
    // borderRight: "1px solid black"
  },
}));

export const theme = createTheme({
  palette: {
    primary: {
      main: '#7a52f4',
      light: '#eeeeee',
      hover: 'rgba(105,6,235,0.2)'
    },
    white: {
      main: '#fff',
    },
    black: {
      main: '#000',
      head: '#333333',
      para: '#7f7f7f',
    },
  },
  components: {
    // input ------------
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            border: "1px solid #eeeeee",
            borderRadius: '6px !important',
            input: {
              padding: '10px 70px 10px 10px',
              fontFamily: "Inter",
              fontWeight: '500',
              fontSize: '12px',
              color: ' #c2c2c2',
              borderBottom: '1px solid #fff',
              '&:-webkit-autofill': {
                WebkitBoxShadow: '0 0 0 1000px white inset', // Change the background color when autofilled
              },
              '&:-webkit-autofill:focus': {
                WebkitBoxShadow: '0 0 0 1000px white inset', // Change the background color when autofilled and focused
              },
            },

          },
          '& .MuiInputBase-input:focus': {
            borderRadius: '6px 6px 6px 0px  !important',
            border: "1px solid #fff !important",
            borderBottom: '1px solid #860a96 !important',
            boxShadow: '0px 2px 6px rgba(0,0,0,0.16)',
          },

          '& .MuiInputBase-input::placeholder': {
            color: ' #5d5d5b',
            fontSize: '12px',
            fontWeight: '600',
          },
        },
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& fieldset': {
            borderColor: 'transparent !important',
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          border: "unset !important",
          '& .Mui-focused': {
            border: "unset !important",
            outline: "unset !important",
          },
        },
      },
    },
    // input ------------
    MuiSelect: {
      styleOverrides: {
        select: {
          padding: '8px 10px',
          border: "1.5px solid #eeeeee",
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: '400',
        },
      },
    },
    // searchbar ------------
    MuiStack: {
      styleOverrides: {
        root: {
          '& .search_field': {
            '& .MuiInputBase-root': {
              background: '#f1f1f1',
              boxShadow: 'unset !important',
              // border: "1px solid #fff",
              borderRadius: '6px',
              input: {
                border: "1px solid #fff",
                padding: '8px 15px',
                borderRadius: '6px',
              }
            },
            '& .Mui-focused': {
              border: "1px solid #fff",
              outline: "1px solid #f1f1f1",
            },
          },
        },
      }
    },
    // searchbar ------------
    // button -----------
    MuiButton: {
      styleOverrides: {
        contained: {
          borderRadius: '25px',
          padding: '8px 20px',
          textTransform: 'capitalize',
          fontSize: { xs: '14px', sm: '14px !important' },
          lineHeight: '1.55'
        },
        outlined: {
          borderRadius: '25px',
          padding: '8px 20px',
          textTransform: 'capitalize',
          fontSize: { xs: '14px', sm: '14px !important' },
          lineHeight: '1.55'
        },
      },
    },
    // button -----------
    // table -----------
    MuiTable: {
      styleOverrides: {
        root: {
          '& .device_table_img': {
            background: '#f1f1f1',
            padding: '13px',
            borderRadius: '50%',
          }
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-root': {
            padding: '10px 15px',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          whiteSpace: 'nowrap',
          textAlign: 'center',
          padding: '10px 16px',
          '&:first-child': {
            textAlign: 'start',
          },
        },
      },
    },
    // table -----------

    MuiGrid: {
      styleOverrides: {
        item: {
          padding: '0 !important',
        },
      },
    },
  },
});

// table -----------
export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: "#e5e5e500",
  },
  "&:nth-of-type(odd)": {
    backgroundColor: "#e5e5e500",
  },
  // hide last border
  // "&:last-child td, &:last-child th": {
  //   border: 0,
  // },
}));
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: "#000",
  fontWeight: '700',
  textTransform: 'uppercase'
}));

export const StyledChip = styled(Chip)(() => ({
  borderRadius: "10px",
  fontSize: "14px",
}));

export const getStatus = (value) => {
  const status = {
    false: {
      title: "Pending",
      styles: {
        backgroundColor: "rgb(235 193 14 / 24%)",
        color: "orange",
      },
    },
    true: {
      title: "Active",
      styles: {
        backgroundColor: "rgba(18, 183, 106, 0.05)",
        color: "#12B76A",
      },
    },

  };
  return status[value];
};

export const getInvoiceStatus = (value) => {
  const status = {
    false: {
      title: "Open",
      styles: {
        backgroundColor: "#aad3ff",
        color: "#007aff",
      },
    },
    true: {
      title: "Paid",
      styles: {
        backgroundColor: "#c3f2cb",
        color: "#46a759",
      },
    },

  };
  return status[value];
};
// table -----------