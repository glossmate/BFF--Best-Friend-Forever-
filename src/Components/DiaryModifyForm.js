import * as React from "react";
import { useParams } from "react-router"
import { Box, Button, TextField } from "@mui/material";
import useFetch from "./useFetch";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import dayjs from "dayjs";

export default function DiaryModifyForm() {
  let DIARY_DATE = new Date().toISOString();

    const REF_TITLE = React.useRef(null);
    const REF_CONTENT = React.useRef(null);

    const {id} = useParams();
    const OneDiary = useFetch(window.location.protocol  + '//' + window.location.hostname + `:8055/Diary/${id}`);
    console.log(OneDiary);

    if (OneDiary.TITLE === undefined) {
      console.log('useFetch 에서 정보를 가져오기 이전 입니다.');
      console.log('이때는 null 을 응답해서 에러가 나지 않도록 합니다.');
        return null;
    }

    function DATE_CHANGED(value, e) {
      DIARY_DATE = value.format();
      console.log(DIARY_DATE); // this will be a moment date object
    }
  
    function SAVE_DIARY() {
        const SAVE_DATA = {
          ...OneDiary,
          DATE: DIARY_DATE,
          TITLE: REF_TITLE.current.value,
          CONTENT: REF_CONTENT.current.value,
        };
        console.log(SAVE_DATA);
    
        fetch(
          window.location.protocol +
            "//" +
            window.location.hostname +
            `:8055/Diary/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(SAVE_DATA),
          }
        ).then((RES) => {
          if (RES.ok) {
            alert("수정된 일기를 저장했습니다.");
            window.location.replace("/");
          }
        });
      }
    
      function GO_BACK() {
        window.location.replace("/");
      }
    
    return     <Box
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
          defaultValue={OneDiary.TITLE}
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
        defaultValue={OneDiary.CONTENT}
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

}