import React from "react";
import { useNavigate } from "react-router-dom";

// MUI 基本UIコンポーネント
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Card,
  CardActions,
  CardContent,
  Button,
} from "@mui/material";

// MUI アイコン
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

// MUI チャート
import { LineChart } from "@mui/x-charts/LineChart";

export default function StockList() {
  const navigate = useNavigate();

  const gotoStockTable = () => {
    navigate("/stock_table");
  };
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
            {/*ListItemTextはアイコンの右に表示されるテキスト*/}
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
      <Divider /> {/*リストのセクションをわけるために線が入る*/}
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
      <Box sx={{ display: "flex" }}>
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

        {/* ヘッダー＋メイン */}
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          {/* ヘッダー */}
          <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
            <Toolbar>
              <Typography variant="h6" noWrap>
                MUI
              </Typography>
            </Toolbar>
          </AppBar>

          <Box
            component="main"
            sx={{
              flexGrow: 1,
              backgroundColor: "#EEF2F6",
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              p: 3,
              minHeight: "calc(100vh - 64px)",
              alignContent: "flex-start",
              marginTop: "20px"
            }}
          >
            <Button onClick={gotoStockTable} sx={{ width: "30%" }}>
              <Card sx={{ width: "100%", height: 280, borderRadius: 2 }}>
                <CardContent>
                  <Typography sx={{ fontSize: 20, color: "text.secondary" }}>
                    在庫一覧
                  </Typography>
                </CardContent>
              </Card>
            </Button>

            <Button sx={{ width: "30%" }}>
              <Card sx={{ width: "100%", height: 280, borderRadius: 2 }}>
                <CardContent>
                  <Typography sx={{ fontSize: 20, color: "text.secondary" }}>
                    在庫登録
                  </Typography>
                </CardContent>
              </Card>
            </Button>

            <Button sx={{ width: "30%" }}>
              <Card sx={{ width: "100%", height: 280, borderRadius: 2 }}>
                <CardContent>
                  <Typography sx={{ fontSize: 20, color: "text.secondary" }}>
                    在庫変更履歴
                  </Typography>
                </CardContent>
              </Card>
            </Button>

            {/*チャート*/}
            <Card sx={{ width: "60.5%", height: 280, borderRadius: 2, marginLeft: "10px" }}>
              <CardContent>
                <Typography
                  sx={{
                    fontSize: 20,
                    textAlign: "center",
                    color: "text.secondary",
                  }}
                >
                  在庫推移
                </Typography>
                <LineChart
                  xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                  series={[{ data: [2, 5.5, 2, 8.5, 1.5, 5] }]}
                  height={200}
                  margin={{ right: 75 }}
                />
              </CardContent>
            </Card>

            <Button sx={{ width: "30%", marginLeft: "10px", marginTop: "-5px" }}>
              <Card sx={{ width: "100%", height: 280, borderRadius: 2 }}>
                <CardContent>
                  <Typography sx={{ fontSize: 20, color: "text.secondary" }}>
                    アカウント設定
                  </Typography>
                </CardContent>
              </Card>
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
