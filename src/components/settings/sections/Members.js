import React, { useState } from 'react'
import { Box, Divider, Stack, Typography, Pagination, Paper, Table, TableCell, TableBody, TableContainer, TableHead, TableRow, Grid, TextField } from '@mui/material'
import { StyledTableCell, StyledChip, StyledTableRow, useStyles, getInvoiceStatus, } from '@/helper/theme';
import Link from 'next/link';
import CommonButton from '@/components/common/Button';
import Image from 'next/image';
import { Edit, Profileimage } from '@/helper/constant';
import AddIcon from '@mui/icons-material/Add';
import CommonModal from '@/components/common/Modal';
const Members = () => {
  const classes = useStyles();
  const [isModalOpen, setIsModalOpen] = useState({
    open: false,
    currentComponent: "",
  });
  return (
    <Box>
      <Typography fontSize={'30px'} fontWeight={'600'} lineHeight={'30px'} marginBottom={2} marginLeft={3}>Members</Typography>
      <Divider />
      <Box>
        <Stack marginBottom={1} marginTop={3} marginX={4} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography fontSize={'22px'} fontWeight={'700'} lineHeight={'30px'}>Apple Inc</Typography>
          <Stack flexDirection={'row'} alignItems={'center'} gap={2}>
            <TextField hiddenLabel className='search_field' placeholder='Search' sx={{ width: { xs: '100%', sm: 'unset' } }} />
            <CommonButton buttonName='Add User' muiIcon={<AddIcon sx={{ width: '20px', height: '20px' }} />} style={{ borderRadius: '5px' }}
              onClick={() =>
                setIsModalOpen({
                  open: true,
                  currentComponent: "inviteMember",
                })}
            />
          </Stack>
        </Stack>
        <Box marginY={2} marginX={3}>
          <Divider/>
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table stickyHeader aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>
                    Name
                  </StyledTableCell>
                  <StyledTableCell>
                    Email Address
                  </StyledTableCell>
                  <StyledTableCell>
                    Usage
                  </StyledTableCell>
                  <StyledTableCell>
                    Actions
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[1].map(() => {
                  return (
                    <StyledTableRow
                      sx={{  cursor: 'pointer' }}>
                      <TableCell component="th" scope="row">
                        <Stack flexDirection={'row'} gap={1} alignItems={'center'}>
                          <Image src={Profileimage} style={{ width: '40px', height: '40px', borderRadius: '5px' }}></Image>
                          <Stack>
                            <Typography fontSize={'18px'} fontWeight={600} lineHeight={'25px'}>Roshini Sharma</Typography>
                            <Typography fontSize={'14px'} lineHeight={'15px'}>Product Manager</Typography>
                          </Stack>
                        </Stack>

                      </TableCell>
                      <TableCell component="th" scope="row"
                        onClick={(e) => { e.stopPropagation() }}
                      >
                        <Stack alignItems={'center'}>
                          <Typography fontSize={'14px'} lineHeight={'25px'} color={'#5d5d5b'} sx={{ textDecoration: 'underline' }}>roshini.sharma@apple.com</Typography>
                          <Typography fontSize={'13px'} lineHeight={'20px'} color={'#7a52f4'} fontWeight={500}>PENDING INVITE</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        2300 Analysed
                      </TableCell>
                      <TableCell component="th" scope="row"
                        onClick={(e) => { e.stopPropagation() }}
                      >
                        <Stack flexDirection={'row'} gap={1} justifyContent={'center'}>
                          <CommonButton icon={Edit} iconWidth='20' variant="text" style={{ borderRadius: '5px', minWidth: '22px' }} />
                          <CommonButton buttonName='Remove' style={{ borderRadius: '5px', padding: '7px 15px' }} />
                        </Stack>
                      </TableCell>
                    </StyledTableRow>
                  )
                })}
                {/* <TableRow>
              <TableCell
                sx={{
                  color: "silver",
                  textAlign: "center",
                  paddingTop: "90px",
                  borderBottom: "none",
                  fontSize: "30px",
                }}
                colSpan="6"
              >
                No records to display
              </TableCell>
            </TableRow> */}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <CommonModal
        modalOpen={isModalOpen}
        handleClose={() =>
          setIsModalOpen({ open: false, currentComponent: "" })
        } />
    </Box>
  )
}

export default Members