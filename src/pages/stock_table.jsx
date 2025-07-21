// React & Hooks
import { useState, useEffect } from "react";

// MUI - Core Components
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Paper,
  Chip,
} from "@mui/material";

// MUI - Form & Input
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

// MUI - Table Components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

// Custom Components
import FormDialog from "../components/FormDialog";

export default function StockTable() {
  // モーダルの各入力フィールドの state を追加
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  //ダイアログ
  const [dialog, setDialog] = useState(false);

  const [filterCategory, setFilterCategory] = useState(1);

  const [formCategory, setFormCategory] = useState(1);

  const [rows, setRows] = useState(() => {
    const saved = localStorage.getItem("rows");
    return saved
      ? JSON.parse(saved)
      : [
          createData("0006", "りんご", "食品", 100, 50),
          createData("0007", "りんご", "食品", 100, 50),
          createData("0008", "りんご", "食品", 100, 50),
          createData("0009", "りんご", "資材", 100, 50),
          createData("0010", "りんご", "資材", 100, 50),
          createData("0011", "りんご", "資材", 100, 50),
        ];
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    localStorage.setItem("rows", JSON.stringify(rows));
  }, [rows]);

  const categoryMap = {
    1: "すべて",
    2: "食品",
    3: "資材",
  };

  // フィルタリングされたデータ
  const filteredRows =
    filterCategory === 1
      ? rows
      : rows.filter((row) => row.category === categoryMap[filterCategory]);

  //カテゴリ別の絞り込み
  const options = [
    { label: "すべて", id: 1 },
    { label: "食品", id: 2 },
    { label: "資材", id: 3 },
  ];

  //テーブル列名（設計図てきな）だよ
  const columns = [
    { id: "id", label: "商品ID", minWidth: 100 },
    { id: "name", label: "商品名", minWidth: 250 },
    { id: "category", label: "カテゴリー", minWidth: 120 },
    {
      id: "number",
      label: "在庫数",
      minWidth: 110,
      format: (value) => value.toLocaleString(), //カンマで区切ってくれる
    },
    {
      id: "unitPrice",
      label: "単価",
      minWidth: 110,
      format: (value) => `¥${value.toLocaleString()}`, //カンマで区切ってくれる ＋ ￥マーク
    },
    {
      id: "status",
      label: "ステータス",
      minWidth: 150,
    },
    {
      id: "actions",
      label: "編集/削除",
      minWidth: 170,
    },
  ];

  function createData(id, name, category, number, unitPrice) {
    return { id, name, category, number, unitPrice };
  }

  //idランダム生成
  const generateRandomId = () => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  };

  //モーダルが開いた時にランダム生成する
  useEffect(() => {
    if (dialog && !isEditing) {
      setProductId(generateRandomId());
    }
  }, [dialog, isEditing]);

  // モーダルの「登録」処理（例：ボタン追加）
  const handleAddProduct = () => {
    const categoryLabel =
      options.find((opt) => opt.id === formCategory)?.label || "未分類";

    const newRow = createData(
      productId,
      productName,
      categoryLabel,
      Number(productStock),
      Number(productPrice)
    );

    if (isEditing) {
      setRows(rows.map((row) => (row.id === productId ? newRow : row)));
    } else {
      setRows([...rows, newRow]);
    }

    // 入力リセット（お好みで）
    setDialog(false);
    setProductId("");
    setProductName("");
    setProductStock("");
    setProductPrice("");
    // setSelectCategory("");
    setIsEditing(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = (id) => {
    if (window.confirm("本当に削除しますか？")) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const handleEdit = (row) => {
    setProductId(row.id);
    setProductName(row.name);
    setProductStock(row.number.toString());
    setProductPrice(row.unitPrice.toString());

    const catId = options.find((opt) => opt.label === row.category)?.id || 1;
    setFormCategory(catId);
    setDialog(true);
    setIsEditing(true); // 新しいstate（後述）
  };

  return (
    <>
      {/* ヘッダー */}
      <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            MUI（在庫一覧）
          </Typography>
        </Toolbar>
      </AppBar>

      <Box display="flex" gap="830px" sx={{ ml: "108px", mt: 3 }}>
        <Autocomplete
          disablePortal
          options={options}
          sx={{ width: 300 }}
          value={options.find((o) => o.id === filterCategory) || options[0]}
          //paramsの中身は実際の<input>に必要な設定など
          //MUIの<Autocomplete />が自動で用意してくれている入力欄のパラメーターのまとまりのこと
          onChange={(event, newValue) => {
            if (newValue) {
              setFilterCategory(newValue.id); // 選択したidをセット
              setPage(0); // ページをリセットしたいなら
            }
          }}
          getOptionLabel={(option) => option.label} // labelを表示
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
          marginTop: "20px",
          overflow: "hidden",
        }}
      >
        <TableContainer sx={{ maxHeight: 800 }}>
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
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id} hover role="checkbox" tabIndex={-1}>
                    {columns.map((column) => {
                      if (column.id === "status") {
                        // ステータス用の Chip 表示
                        let chipLabel = "";
                        let chipColor = "default";

                        if (row.number === 0) {
                          chipLabel = "在庫なし";
                          chipColor = "error";
                        } else if (row.number <= 10) {
                          chipLabel = "残りわずか";
                          chipColor = "warning";
                        } else {
                          chipLabel = "在庫あり";
                          chipColor = "success";
                        }

                        return (
                          <TableCell key={column.id} align={column.align}>
                            <Chip label={chipLabel} color={chipColor} />
                          </TableCell>
                        );
                      } else if (column.id === "actions") {
                        return (
                          <TableCell key={column.id}>
                            <Button
                              variant="outlined"
                              color="primary"
                              size="small"
                              sx={{ mr: 1 }}
                              onClick={() => handleEdit(row)}
                            >
                              編集
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              onClick={() => handleDelete(row.id)}
                            >
                              削除
                            </Button>
                          </TableCell>
                        );
                      }

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
                ))}
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "24px",
            minWidth: "300px", // 幅を整える
            gap: "16px",
          }}
        >
          {/*商品ID*/}
          <TextField
            id="outlined-basic"
            label="商品ID"
            variant="outlined"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            sx={{ width: "500px", height: "40px", mt: 2 }}
          />

          {/*商品名*/}
          <TextField
            id="outlined-basic"
            label="商品名"
            variant="outlined"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            sx={{ width: "500px", height: "40px", mt: 2 }}
          />

          {/*カテゴリー*/}
          <FormControl sx={{ width: "500px", mt: 2 }}>
            <InputLabel id="demo-simple-select-label">カテゴリー</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formCategory}
              label="category"
              onChange={(e) => setFormCategory(e.target.value)}
            >
              <MenuItem value={1}>すべて</MenuItem>
              <MenuItem value={2}>食品</MenuItem>
              <MenuItem value={3}>資材</MenuItem>
            </Select>
          </FormControl>

          {/*在庫数*/}
          <TextField
            id="outlined-basic"
            label="在庫数"
            variant="outlined"
            value={productStock}
            onChange={(e) => setProductStock(e.target.value)}
            sx={{ width: "500px", height: "40px" }}
          />

          {/*単価*/}
          <TextField
            id="outlined-basic"
            label="単価"
            variant="outlined"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            sx={{ width: "500px", height: "40px", mt: 2, pb: 2 }}
          />

          <Button
            variant="contained"
            onClick={handleAddProduct}
            sx={{ mt: 2, width: "150px", alignSelf: "flex-end" }}
          >
            登録
          </Button>
        </div>
      </FormDialog>
    </>
  );
}
