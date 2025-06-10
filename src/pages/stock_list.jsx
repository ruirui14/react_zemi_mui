import React from "react";
import { Button, Chip } from "@mui/material";
import AppBar from "@mui/material/AppBar"; //ヘッダーの土台になる MUI の「AppBar（アプリバー）」
import Box from "@mui/material/Box"; //レイアウト用コンポーネント CSS の div に sx スタイルつけて使えるような感じ
import Toolbar from "@mui/material/Toolbar"; //中身を横並びにするコンポーネント
import Typography from "@mui/material/Typography"; //見出し・文字用。<h1> や <p> の代わりに使える
import IconButton from "@mui/material/IconButton"; //アイコン付きボタンを作るコンポーネント MenuIconを入れて使える
import MenuIcon from "@mui/icons-material/Menu"; //ハンバーガーメニューのアイコン
import Drawer from "@mui/material/Drawer";      //サイドナビゲーション
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import CssBaseline from "@mui/material/CssBaseline";

export default function StockList() {

    const drawerWidth = 240;
    const DrawerList = (
      //リスト全体の親要素(ここに複数のリストアイテムが入る)
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          //リストの一行分 disablePadding=余白をなくす
          <ListItem key={text} disablePadding>
            {/*リスト行全体がボタンクリックできるようにするラッパー*/}
            <ListItemButton>
              {/*アイコン部分を置くコンポーネント*/}
              <ListItemIcon>
                {/*indexが偶数ならInboxIcon、奇数ならMailIconを表示(交互に表示してる)*/}
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    );
    

  return (
    <>
      {/* <Box sx={{ flexGrow: 1 }}>
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
              在庫管理
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box> */}

        <Box sx={{ display: "flex" }}>
        <CssBaseline />

        {/* 常に開いたDrawer */}
        <Drawer
            variant="permanent"
            sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: "border-box",
            },
            }}
        >
            <Box sx={{ overflow: "auto" }}>{DrawerList}</Box>
        </Drawer>
        </Box>
    </>
  );
};

