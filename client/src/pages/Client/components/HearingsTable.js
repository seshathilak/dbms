import React, { useState, useEffect } from "react";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useSelector } from "react-redux";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Grid from "@material-ui/core/Grid";
import AboutLawyer from "../../AboutLawyer";
import AboutCourt from "../../AboutCourt";

export default function CustomizedTables() {
  const classes = useStyles();
  const C_id = useSelector((state) => state.Reducer.clientId);
  const [rows, setrows] = useState([]);

  const [lawyermodalopen, setlawyermodal] = useState(false);
  const [courtmodalopen, setcourtmodal] = useState(false);
  const [lawyerid, setlawyerid] = useState("");
  const [courtid, setCourtid] = useState("");

  const CourtModalHandler = () => {
    setcourtmodal((state) => !state);
  };
  const LawyerModalHandler = () => {
    setlawyermodal((state) => !state);
  };

  useEffect(() => {
    console.log("FUNCTION");
    const Hearinglist = () => {
      axios.post("/client/hearing", { client_id: C_id }).then((response) => {
        // console.log(response.data);
        setrows(response.data);
      });
    };
    Hearinglist();
    return () => console.log("INFO UNMOUNTED");
  }, []);
  return (
    <div>
      <Paper className={classes.paper}>
        <Box align="center">
          <h1>HEARINGS</h1>
        </Box>
      </Paper>
      <TableContainer component={Paper}>
        {rows.length ? (
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">CASE ID </StyledTableCell>

                <StyledTableCell align="center">CASE TITLE </StyledTableCell>
                <StyledTableCell align="center">
                  CASE DESCRIPTION
                </StyledTableCell>
                <StyledTableCell align="center">ABOUT LAWYER</StyledTableCell>
                <StyledTableCell align="center">ABOUT COURT </StyledTableCell>
                <StyledTableCell align="center"> MERIT STATUS</StyledTableCell>
                <StyledTableCell align="center"> </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.case_id}>
                  <StyledTableCell align="center">
                    {row.case_id}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.case_title}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.case_desc}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        setlawyerid(row.lawyer_id);

                        setlawyermodal(true);
                      }}
                    >
                      Lawyer Details{" "}
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        setCourtid(row.court_id);

                        setcourtmodal(true);
                      }}
                    >
                      Court Details{" "}
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <div>
                      {row.merit_status ? <p>GIVEN</p> : <p>PENDING</p>}
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <div>
                      {!row.def_fees_status && row.merit_status ? (
                        <p>DEFENDENT NOT READY </p>
                      ) : (
                        <p> </p>
                      )}
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div>
            <h2>NO HEARINGS</h2>
          </div>
        )}
      </TableContainer>
      <br></br>
      <br></br>

      <br></br>
      <br></br>

      {courtmodalopen && (
        <AboutCourt
          Handler={CourtModalHandler}
          courtmodalopen
          courtid={courtid}
        />
      )}
      {lawyermodalopen && (
        <AboutLawyer
          Handler={LawyerModalHandler}
          lawyermodalopen
          lawyerid={lawyerid}
        />
      )}
    </div>
  );
}
const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  image: {
    width: 500,
    height: 500,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
});
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
