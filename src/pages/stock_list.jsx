import React from "react";
import { Button, Chip } from "@mui/material";
import AppBar from "@mui/material/AppBar"; //ヘッダーの土台になる MUI の「AppBar（アプリバー）」
import Box from "@mui/material/Box"; //レイアウト用コンポーネント CSS の div に sx スタイルつけて使えるような感じ
import Toolbar from "@mui/material/Toolbar"; //中身を横並びにするコンポーネント
import Typography from "@mui/material/Typography"; //見出し・文字用。<h1> や <p> の代わりに使える
import IconButton from "@mui/material/IconButton"; //アイコン付きボタンを作るコンポーネント MenuIconを入れて使える
import MenuIcon from "@mui/icons-material/Menu"; //ハンバーガーメニューのアイコン
import Drawer from "@mui/material/Drawer"; //サイドナビゲーション
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import CssBaseline from "@mui/material/CssBaseline";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { LineChart } from "@mui/x-charts/LineChart";

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
      <Box
        sx={{
          display: "flex",
          height: "100%",
          m: 5,
          backgroundColor: "#EEF2F6",
        }}
      >
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

        <Box
          component="main"
          sx={{
            flexGrow: 1, // ← 親の横幅を広げる
            width: "350px",
            height: "350px",
            display: "flex",
            bgcolor: "background.default",
            flexWrap: "wrap",
            gap: 3,
            p: 3,
            backgroundColor: "#EEF2F6",
          }}
        >
          <Button sx={{ height: "280px", width: "30%" }}>
            <Card sx={{ height: "280px", width: "100%", borderRadius: "12px" }}>
              <CardContent>
                <Typography
                  gutterBottom
                  sx={{ color: "text.secondary", fontSize: 30 }}
                >
                  在庫一覧
                </Typography>
              </CardContent>
            </Card>
          </Button>

          <Button sx={{ height: "280px", width: "30%" }}>
            <Card sx={{ height: "280px", width: "100%", borderRadius: "12px" }}>
              <CardContent>
                <Typography
                  gutterBottom
                  sx={{ color: "text.secondary", fontSize: 30 }}
                >
                  在庫登録
                </Typography>
              </CardContent>
            </Card>
          </Button>

          <Button sx={{ height: "280px", width: "30%" }}>
            <Card sx={{ height: "280px", width: "100%", borderRadius: "12px" }}>
              <CardContent>
                <Typography
                  gutterBottom
                  sx={{ color: "text.secondary", fontSize: 30 }}
                >
                  在庫一覧
                </Typography>
              </CardContent>
            </Card>
          </Button>

          {/*チャート*/}
          <Card
            sx={{
              height: "280px",
              width: "660px",
              marginLeft: "10px",
              borderRadius: "12px",
              marginTop: "15px",
            }}
          >
            <CardContent>
              <Typography
                gutterBottom
                sx={{ color: "text.secondary", fontSize: 30, textAlign: "center" }}
              >
                在庫推移
              </Typography>
              <LineChart
                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                series={[
                  {
                    data: [2, 5.5, 2, 8.5, 1.5, 5],
                  },
                ]}
                margin={{right:75}}
                height={200}
              />
            </CardContent>
          </Card>

          <Button
            sx={{
              height: "280px",
              width: "30%",
              marginLeft: "10px",
              marginTop: "15px",
            }}
          >
            <Card sx={{ height: "280px", width: "100%", borderRadius: "12px" }}>
              <CardContent>
                <Typography
                  gutterBottom
                  sx={{ color: "text.secondary", fontSize: 30 }}
                >
                  ここどうしよう
                </Typography>
              </CardContent>
            </Card>
          </Button>
        </Box>
      </Box>
    </>
  );
}
