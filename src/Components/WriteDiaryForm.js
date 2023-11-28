import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import dayjs from "dayjs";

export default function WriteDiaryForm() {
  let DIARY_DATE = new Date().toISOString();

  console.log('KKKK => ' + DIARY_DATE);
  const REF_TITLE = React.useRef(null);
  const REF_CONTENT = React.useRef(null);

  function SAVE_DIARY() {
    const SAVE_DATA = {
      DATE: DIARY_DATE,
      TITLE: REF_TITLE.current.value,
      CONTENT: REF_CONTENT.current.value,
    };
    console.log('SAVE_DATA => ' +  JSON.stringify(SAVE_DATA));

    fetch(
      window.location.protocol +
        "//" +
        window.location.hostname +
        `:8055/Diary`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(SAVE_DATA),
      }
    ).then((RES) => {
      if (RES.ok) {
        alert("새로운 일기를 추가했습니다.");
        window.location.replace("/");
      }
    });
  }

  function GO_BACK() {
    window.location.replace("/");
  }

  function DATE_CHANGED(value, e) {
    DIARY_DATE = value.format();
    console.log(DIARY_DATE); // this will be a moment date object
  }

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "100%" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <div style={{
          width: '25%',
          float: 'left'
        }}>
        <LocalizationProvider dateAdapter={AdapterDayjs} >
          <DatePicker 
            defaultValue={dayjs()} format={'YYYY-MM-DD'}
            onChange={(value, e) => DATE_CHANGED(value, e)}
          />
        </LocalizationProvider>

        </div>
        <div style={{
          width: '75%',
          float: 'left'
        }}>
        <TextField
          inputRef={REF_TITLE}
          required
          id="DiaryTitle"
          label="제목"
          placeholder="내용을 입력해 주세요"
        />

        </div>
      </div>

      <div>
        <TextField
          inputRef={REF_CONTENT}
          required
          multiline
          rows={15}
          size="big"
          id="DiaryWriting"
          label="내용"
          placeholder="내용을 입력해 주세요"
        />
      </div>
      <Button
        variant="contained"
        style={{
          position: "absolute",
          right: 0,
          marginRight: "16px",
        }}
        onClick={SAVE_DIARY}
      >
        저장
      </Button>

      <Button
        variant="contained"
        style={{
          position: "absolute",
          left: 0,
          marginLeft: "32px",
        }}
        onClick={GO_BACK}
      >
        이전
      </Button>
    </Box>
  );
}
