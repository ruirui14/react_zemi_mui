import React from "react";
import { Button, Chip } from "@mui/material";
import AppBar from "@mui/material/AppBar"; //ヘッダーの土台になる MUI の「AppBar（アプリバー）」
import Box from "@mui/material/Box"; //レイアウト用コンポーネント CSS の div に sx スタイルつけて使えるような感じ
import Toolbar from "@mui/material/Toolbar"; //中身を横並びにするコンポーネント
import Typography from "@mui/material/Typography"; //見出し・文字用。<h1> や <p> の代わりに使える
import IconButton from "@mui/material/IconButton"; //アイコン付きボタンを作るコンポーネント MenuIconを入れて使える
import MenuIcon from "@mui/icons-material/Menu"; //ハンバーガーメニューのアイコン


export default function StockList() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>

      
    </>
  );
};

