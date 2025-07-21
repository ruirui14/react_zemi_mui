import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {Box} from "@mui/material";
import Button from "@mui/material/Button";
import FormDialog from "../components/FormDialog"; 
import { useState } from "react";

//import { createDateFormatter } from "@mui/x-charts/internals";


//カテゴリ別の絞り込み
const options = [
  { label: "備品", id: 1 },
  { label: "服飾", id: 2 },
  { label: "食べ物", id: 3 },
];

//テーブル列名（設計図てきな）だよ
const columns = [
  { id: "id", label: "商品ID", minWidth: 170 },
  { id: "name", label: "商品名", minWidth: 170 },
  { id: "category", label: "カテゴリー", minWidth: 170 },
  {
    id: "number",
    label: "在庫数",
    minWidth: 170,
    format: (value) => value.toLocaleString(), //カンマで区切ってくれる
  },
  {
    id: "unitPrice",
    label: "単価",
    minWidth: 170,
    format: (value) => `¥${value.toLocaleString()}`, //カンマで区切ってくれる ＋ ￥マーク
  },
];

//ここまでしたよ

function createData(id, name, category, number, unitPrice) {
  return { id, name, category, number, unitPrice };
}

const rows = [
  createData("0001", "りんご", "食べ物", 1000, 50),
  createData("0002", "ばなな", "食べ物", 2000, 100000),
  createData("0003", "りんご", "食べ物", 100, 77777),
  createData("0004", "りんご", "食べ物", 100, 1574),
  createData("0005", "りんご", "食べ物", 100, 50),
  createData("0006", "りんご", "食べ物", 100, 50),
  createData("0007", "りんご", "食べ物", 100, 50),
  createData("0008", "りんご", "食べ物", 100, 50),
  createData("0009", "りんご", "食べ物", 100, 50),
  createData("0010", "りんご", "食べ物", 100, 50),
  createData("0011", "りんご", "食べ物", 100, 50),
];

export default function StockTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  //ダイアログ
  const [dialog, setDialog] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  

  return (
    <>
      <Box display="flex" gap="830px" sx={{ ml: "108px", mt: 8 }}>
        <Autocomplete
          disablePortal
          options={options}
          sx={{ width: 300 }}
          //paramsの中身は実際の<input>に必要な設定など
          //MUIの<Autocomplete />が自動で用意してくれている入力欄のパラメーターのまとまりのこと
          renderInput={(params) => <TextField {...params} label="カテゴリー" />}
        />

        <Button
          variant="contained"
          size="large"
          onClick={() => setDialog(true)}
        >
          新規登録
        </Button>
      </Box>

      <Paper
        sx={{
          width: "85%",
          margin: "0 auto",
          marginTop: "30px",
          overflow: "hidden",
        }}
      >
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <FormDialog open={dialog} onClose={() => setDialog(false)}>
        <div style={{ padding: 20 }}>ここに自由な内容を書く</div>
      </FormDialog>
    </>
  );
}
